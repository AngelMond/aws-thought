const AWS = require('aws-sdk');


/*
Then we'll modify the AWS config object that DynamoDB will use to connect to the local instance, as shown in the following example:
*/
AWS.config.update({
    region: 'us-east-2',
});


//Next, create the DynamoDB service object by adding the following expression:
const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });



//Next we'll create a params object that will hold the schema and metadata of the table, by adding the following code:

const params = {
    TableName: 'Thoughts',
    KeySchema: [
      { AttributeName: 'username', KeyType: 'HASH' }, // Partition key
      { AttributeName: 'createdAt', KeyType: 'RANGE' }, // Sort key
    ],
    AttributeDefinitions: [
      { AttributeName: 'username', AttributeType: 'S' },
      { AttributeName: 'createdAt', AttributeType: 'N' },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
  };


  dynamodb.createTable(params, (err, data) => {
    if (err) {
      console.error(
        'Unable to create table. Error JSON:',
        JSON.stringify(err, null, 2),
      );
    } else {
      console.log(
        'Created table. Table description JSON:',
        JSON.stringify(data, null, 2),
      );
    }
  });