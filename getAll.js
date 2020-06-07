import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const list = handler(async (event, context, callback) => {
    const params = {
        TableName: process.env.tableName,
        ProjectionExpression: "productName, price, attachment"
    };

    const onScan = (err, data) => {
        if (err) {
            console.log('Scan failed to load data. Error JSON:', JSON.stringify(err, null, 2));
            callback(err);
        } else {
            console.log("Scan succeeded.");
            return callback(null, {
                statusCode: 200,
                body: JSON.stringify({
                    products: data.Items
                })
            });
        }
    };
    const result = await dynamoDb.scan(params, onScan);
    // Return the matching list of items in response body
    return result;
});