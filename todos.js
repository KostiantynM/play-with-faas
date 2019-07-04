const AWS = require('aws-sdk');
const uuid = require('uuid/v4')

const client = new AWS.DynamoDB.DocumentClient();

const createTodo = async (event) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "todos",
    Item: {
      id: uuid(),
      text: data.text,
      checked: false
    }
  };

  client.put(params).promise();
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};

const getTodo = async (event) => {
  const params = {
    TableName: "todos",
    Key: {
      id: event.pathParameters.id
    }
  };

  const result = await client.get(params).promise();

  if(result.Item) {
    return {
      statusCode: 200,
      body: JSON.stringify(result.Item)
    }
  }
  return {
    statusCode: 404,
    body: JSON.stringify({
      message: "Couldn't find the todo item"
    })
  };
}

module.exports = {
  createTodo,
  getTodo
};
