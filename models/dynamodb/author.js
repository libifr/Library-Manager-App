const AWS = require('aws-sdk');
const config = require('./topsecret.js');
const {v1} = require('uuid');

const getAuthors = function (req, res) {
    AWS.config.update(config.aws_remote_config);

    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
        TableName: config.author_table
    };

    return new Promise((res, err) => docClient.scan(params, function (err, data) {

        if (err) {
            console.log(err)
           err ({
                success: false,
                message: err
            });
        } else {
            const { Items } = data;
            res ({
                success: true,
                data: Items
            });
        }
    }));
}


const addAuthor = function (req, res) {
    AWS.config.update(config.aws_remote_config);
    const docClient = new AWS.DynamoDB.DocumentClient();
    const Item = { ...req.body };
    Item.author_id = v1();
    var params = {
        TableName: config.author_table,
        Item: Item
    };

    // Call DynamoDB to add the item to the table
    docClient.put(params, function (err, data) {
        if (err) {
            res.render('authors/addAuthor', {author: data});
        } else {
            res.redirect('/authors')
        }
    });
}

module.exports = {
    getAuthors,
    addAuthor
}