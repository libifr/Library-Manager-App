const AWS = require('aws-sdk');
const S3 = require('aws-sdk/clients/s3');
const config = require('./topsecret.js');
const {v1} = require('uuid');
// const fs = require('fs')


const getBooks = function (req, res) {
    AWS.config.update(config.aws_remote_config);

    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
        TableName: config.book_table
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


const addBook = async function (req, res) {
    AWS.config.update(config.aws_remote_config);
    const docClient = new AWS.DynamoDB.DocumentClient();
    const Item = { ...req.body };
    Item.bookId = v1();
    const params = {
        TableName: config.book_table,
        Item: Item
    };
    const s3 = new S3(config.aws_remote_config)
    const imagePath = req.files.img
    // const blob = fs.readFileSync(imagePath.data)
    const uploadedImage = await s3.upload({
        Bucket: 'library-manager-books-pictures',
        Key: imagePath.name,
        Body: imagePath.data,
        ContentType: 'image/jpeg',
    }).promise()
    params.Item.img = uploadedImage.Location
    // Call DynamoDB to add the item to the table
    docClient.put(params, function (err, data) {
        if (err) {
            res.render('books/addBook', {book:data});
        } else {
            res.redirect('/books');
        }
    });
}

module.exports = {
    getBooks,
    addBook,
}