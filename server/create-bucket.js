
//create-bucket.js and add the following expression at the top of the file:
// Load the AWS SDK for Node.js
const AWS = require("aws-sdk");

console.log("Region: ", AWS.config.region);

//Import the uuid package to create a unique S3 bucket name by adding the following code to create-bucket.js:
const { v4: uuidv4 } = require('uuid');


//add the following statement to configure the region: The region must be updated to 
//communicate with the web service.
// Set the region
AWS.config.update({ region: 'us-east-2' });



//Create the S3 service object by adding the following expression:
// Create S3 service object
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

/*
The preceding expression creates the s3 instance object with the designated API. By specifying 
the API version, we ensure that the API library we're using is compatible with the following commands.
*/



/*
Next, create the bucketParams object that assigns the metadata of the bucket (such as the bucket name) 
by adding the following code:
*/
// Create the parameters for calling createBucket
var bucketParams = {
  Bucket: 'user-images-' + uuidv4(),
};


/*
Now we'll call the s3 instance object to create an S3 bucket using the bucketParams—by 
adding the following code:
*/
// call S3 to create the bucket
s3.createBucket(bucketParams, (err, data) => {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('Success');
  }
});

/*
In the preceding statement, we used a callback function with the createBucket method and the bucketParams 
object to create an S3 bucket.
*/