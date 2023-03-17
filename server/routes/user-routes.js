const express = require('express');
const router = express.Router();


const AWS = require('aws-sdk');
const awsConfig = {
    region: 'us-east-2',
};


AWS.config.update(awsConfig);
const dynamodb = new AWS.DynamoDB.DocumentClient();
const table = 'Thoughts';


router.get('/users', (req, res) => {
    const params = {
        TableName: table,
    };
    // Scan return all items in the table
    dynamodb.scan(params, (err, data) => {
        if (err) {
            res.status(500).json(err); // an error occurred
        } else {
            res.json(data.Items);
        }
    });
});

// More to come
router.get('/users/:username', (req, res) => {
    console.log(`Querying for thought(s) from ${req.params.username}.`);

    const params = {
        TableName: table,
        KeyConditionExpression: '#un = :user',
        ExpressionAttributeNames: {
            '#un': 'username',
            '#ca': 'createdAt',
            '#th': 'thought',
        },
        ExpressionAttributeValues: {
            ':user': req.params.username,
        },
        ProjectionExpression: '#th, #ca',
        ScanIndexForward: false,
    };

    dynamodb.query(params, (err, data) => {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            res.status(500).json(err); // an error occurred
        } else {
            console.log("Query succeeded.");
            res.json(data.Items)
        }
    });
}); // closes the route for router.get(users/:username)

/*
Notice that the pattern is the same as before. We pass in the params object and a callback function to handle the response.
 The first conditional expression will return an internal request error with a status code of 500 if there's a problem with 
 the query request to the database. All other responses will be considered a successful operation. Again we send the data.
 Items object back to the client. The response data from the database is located in the Items property of the response.
*/


// Create new user at /api/users
router.post('/users', (req, res) => {

    const params = {
        TableName: table,
        Item: {
            username: req.body.username,
            createdAt: Date.now(),
            thought: req.body.thought,
        },
    };

    // database call
    dynamodb.put(params, (err, data) => {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            res.status(500).json(err); // an error occurred
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
            res.json({ "Added": JSON.stringify(data, null, 2) });
        }
    });
});  // ends the route for router.post('/users')


module.exports = router;