const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();
docClient.put({
    TableName: 'author',
    Item: {
// specify attributes as key value pairs
        user_id: 'first',
        //timestamp is the primary key
        timestamp: 3,
        title: 'The Secret',
        content: 'Book'
    }
}, (err, data)=>{
    if(err) {
        console.log(err);
    } else {
        console.log(data);
    }
});