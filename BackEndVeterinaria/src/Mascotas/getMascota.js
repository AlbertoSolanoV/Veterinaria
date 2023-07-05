const AWS = require("aws-sdk");

const getMascota = async (event) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const { idMascota } = event.pathParameters;

        const result = await dynamodb
            .get({
                TableName: "MascotasTable",
                Key: {
                    idMascota
                },
            })
            .promise();
            
        const mascota = result.Item;
        console.log(mascota);
        return {
            status: 200,
            body: mascota,
        };
    } catch (error) {
        console.log(error);
        return {
            status: 300,
            body: mascota,
        };
    }
};
module.exports = {
    getMascota,
};
