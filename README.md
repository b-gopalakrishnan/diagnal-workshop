# DIAGNAL WORKSHOP
Deploy from Local Machine to AWS using serverless framework
Clone the Workshop project in to local
```
npm i
```
Open cmd and check the AWS Configuration, update the config
```
aws configure
```
In AWS create IAM user with full access of DynamoDBFullAccess and region is `us-east-1`.

Set AWS Access Key ID, AWS Secret Access Key from IAM user crendentials

Create DynamoDB table by run this command from local
```
node ddb_createTables.js
```
This will create a table in DynamoDB "ELECTRONICS"

To Deploy to Lambda
```
serverless deploy
```
Once deployed success you will get Service Informtion like follow
```
Service Information
service: workshop
stage: dev
region: us-east-1
stack: workshop-dev
resources: 14
api keys:
  None
endpoints:
  ANY - https://abc.execute-api.us-east-1.amazonaws.com/dev/
  ANY - https://abc.execute-api.us-east-1.amazonaws.com/dev/{proxy+}
functions:
  app: workshop-dev-app
layers:
  None
```

## API

Use endpoints `https://abc.execute-api.us-east-1.amazonaws.com/dev/` to access API


### To Add Item to DB table use API(each request it will add an item from backend)

`https://abc.execute-api.us-east-1.amazonaws.com/dev/mobile` and method **POST**


### To Get all list of Item from DB table use API

`https://abc.execute-api.us-east-1.amazonaws.com/dev/mobile` and method **GET**


### To Get specific Item from DB table use API(get Id from above API)

`https://abc.execute-api.us-east-1.amazonaws.com/dev/mobile/{ID}` and method **GET**
