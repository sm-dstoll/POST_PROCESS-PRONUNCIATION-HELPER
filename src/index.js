const functions = require('@google-cloud/functions-framework');

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

functions.http('smPronounce', async (request, response, next) => {
    const executeRequest = request.body;
    const executeResponse = await executeHandler(executeRequest);
    response.setHeader('Content-Type', 'application/json');
    response.send(executeResponse);
});