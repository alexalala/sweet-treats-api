import handler from "./libs/handler-lib";
import * as uuid from "uuid";

import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
 // Request body is passed in as a JSON encoded string in 'event.body'
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableName,
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            productId: uuid.v1(),
            name: data.name,
            price: data.price,
            description: data.description,
            attachment: data.attachment,
            createdAt: Date.now()
        }
    };
    await dynamoDb.put(params);

    return params.Item;
});