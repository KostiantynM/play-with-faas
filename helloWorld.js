const axios = require('axios');

const populate = (url, iterations) => {
  const results = [];
  while (iterations--) {
    const task = axios
      .get(url)
      .then((res) => res.data)
      .catch((e) => JSON.stringify(e));

    results.push(task);
  }
  return Promise.all(results);
};

const run = async (event, context, cb) => {
  const url =
    'https://bmaj9zxn30.execute-api.us-east-2.amazonaws.com/default/microserviceHttpArch';
  const results = await populate(url, 5);
  results.push('Hello World from FaaS!');
  const body = JSON.stringify(results);
  return {
    statusCode: 200,
    body
  };
};

module.exports = {
  run
};
