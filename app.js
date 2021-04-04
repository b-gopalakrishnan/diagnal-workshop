const serverless = require('serverless-http');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const dynamoDb = new AWS.DynamoDB.DocumentClient();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// insert new mobile data
app.post('/mobile', function (req, res) {
  const idGen = uuidv4();
  const imgWidh = Math.floor(Math.random() * 200) + 1;
  const params = {
    TableName: 'ELECTRONICS',
    Item: {
      Id: idGen,
      Title: 'IPhone',
      Description: 'IPhone - ' + idGen,
      Image: 'https://via.placeholder.com/' + imgWidh,
      Estatus: 1
    },
  }

  dynamoDb.put(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ 'message': 'Could not added electronic details', err: error });
    } else {
      console.log(result);
      res.json({ 'message': 'Success! Electronics Added'});
    }
  });
});

// get all list of mobile data
app.get('/mobile', function (req, res) {
  const params = {
    TableName: 'ELECTRONICS',
    FilterExpression: "#Estatus = :estatus_val",
    ExpressionAttributeNames: {
        "#Estatus": "Estatus",
    },
    ExpressionAttributeValues: { ":estatus_val": 1 }
  }

  dynamoDb.scan(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ message: 'Could not get mobile details', err: error });
    } else {
      res.json({ message: 'Success! Mobile List', result: result });
    }
  });
});

// get single mobile details
app.get('/mobile/:id', function (req, res) {
    var params = {
      TableName: 'ELECTRONICS',
      KeyConditionExpression : 'Id = :id', 
      FilterExpression : '#Estatus= :Estatus',
      ExpressionAttributeNames : {
          '#Estatus' : 'Estatus'
      },
      ExpressionAttributeValues : {
          ':id': req.params.id,
          ':Estatus': 1
      }
    };

    dynamoDb.query(params, (error, result) => {
      if (error) {
        console.log(error);
        res.status(400).json({ error: 'Could not get mobile details', err: error });
      } else if (result.Items) {
          res.json({ message: 'Success! Mobile Details', result: result });
      } else {
        res.status(201).json({ message: "Mobile details not found", result: '' });
      }
    });
  });

  // just to check API works
app.get('/api/info', (req, res) => {
  res.send({ application: 'workshop-app', version: '1' });
});
// app.listen(3000, () => console.log(`Listening on: 3000`));
module.exports.handler = serverless(app);