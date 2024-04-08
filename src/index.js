// const functions = require('@google-cloud/functions-framework');
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, (req, res) => {
  console.log('listening')
})

async function executeHandler(req) {
  console.log('EXECUTE HANDLER');
  console.log({ req });
  const { text, memory, config } = req;
  if (!config || !config.replacementList) return buildResponse(text, memory);
  const replacementList = config.replacementList.split('\n');
  let newText = text;
  replacementList.forEach((phrase) => {
    const [pre, post] = phrase.split(' - ');
    const regex = new RegExp(`\\b${pre}\\b`, "ig");
    newText = newText.replaceAll(regex, post);
  })
  console.log({ newText });
  return buildResponse(newText, memory)
}

function buildResponse(text, memory) {
  return {
    output: {
      text,
    },
    memory,
    endConversation: false,
    endRouting: false,
  }
}

app.post('/', async (request, response, next) => {
    const executeRequest = request.body;
    console.log({ request });
    const executeResponse = await executeHandler(executeRequest);
    response.setHeader('Content-Type', 'application/json');
    response.send(executeResponse);
});
// functions.http('smPronounce', async (request, response, next) => {
//     const executeRequest = request.body;
//     const executeResponse = await executeHandler(executeRequest);
//     response.setHeader('Content-Type', 'application/json');
//     response.send(executeResponse);
// });

app.get('/', (req, res) => {
  res.send('get route working')
})