// Import required AWS SDK clients and commands for Node.js
const {
    DynamoDBClient,
    CreateTableCommand
  } = require("@aws-sdk/client-dynamodb");
  
  // Set the AWS Region
  const REGION = "us-east-1";
  
  // Set the parameters
  const params = {
    AttributeDefinitions: [
      {
        AttributeName: "Id",
        AttributeType: "S",
      },
      {
        AttributeName: "Title",
        AttributeType: "S",
      },
    ],
    KeySchema: [
      {
        AttributeName: "Id",
        KeyType: "HASH",
      },
      {
        AttributeName: "Title",
        KeyType: "RANGE",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    TableName: "ELECTRONICS",
    StreamSpecification: {
      StreamEnabled: false,
    },
  };
  
  // Create DynamoDB service object
  const dbclient = new DynamoDBClient({ region: REGION });
  
  const run = async () => {
    try {
      const data = await dbclient.send(new CreateTableCommand(params));
      console.log("Table Created", data);
    } catch (err) {
      console.log("Error", err);
    }
  };
  run();
  