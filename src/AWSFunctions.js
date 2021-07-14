import * as AWS from 'aws-sdk';

const docClient = new AWS.DynamoDB.DocumentClient()

export const fetchData = (tableName) => {
    let params = {
        TableName: tableName
    }
    docClient.scan(params, function (err, data) {
        console.log('data', data);
        if (!err) {
            console.log(err)
        }
    })
}

export const putData = (tableName, data) => {
    let params = {
        TableName: tableName,
        Item: data
    }

    docClient.put(params, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            console.log('Success', data);
        }
    })
}