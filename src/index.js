const functions = require('@google-cloud/functions-framework');

async function executeHandler(req) {
  console.log('EXECUTE HANDLER');
  console.log({ req });
  const { text, memory, config } = req;
  console.log({ text });
  const pronounceList = config.pronounceList.split(' - ');
  console.log({ pronounceList })
  let newText = text;
  pronounceList.forEach((phrase) => {
    const [pre, post] = phrase.split(' : ');
    const regex = new RegExp(pre, "ig")
    newText = newText.replaceAll(regex, post)
    console.log({ newText });
  })
  const variables = {};

  const resp = {
    output: {
      text: newText,
      variables,
    },
    memory,
    endConversation: false,
    endRouting: false,
  }
  console.log({ resp })
  return resp;
}

functions.http('smPronounce', async (request, response, next) => {
    const executeRequest = request.body;
    const executeResponse = await executeHandler(executeRequest);
    response.setHeader('Content-Type', 'application/json');
    response.send(executeResponse);
});