import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
export const main = handler(async (event, context) => {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableName,
        // 'Key' defines the partition key and sort key of the item to be updated
        // - 'userId': Identity Pool identity id of the authenticated user
        // - 'productId': path parameter
        Key: {
            userId:
            event.requestContext.identity.cognitoIdentityId,
            productId: event.pathParameters.id
        },
        // 'UpdateExpression' defines the attributes to be updated
        // 'ExpressionAttributeValues' defines the value in the update expression
        UpdateExpression: "SET name = :name, price = :price, description = :description, attachment = :attachment",
        ExpressionAttributeValues: {
            ":name": data.name || null,
            ":price": data.price || null,
            ":description": data.description || null,
            ":attachment": data.attachment || null
        },
        // 'ReturnValues' specifies if and how to return the item's attributes,
        // where ALL_NEW returns all attributes of the item after the update; you
        // can inspect 'result' below to see how it works with different settings
        ReturnValues: "ALL_NEW"
    };
    await dynamoDb.update(params);
    return { status: true };
});