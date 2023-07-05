const AWS = require("aws-sdk");

const getUsuario = async (event) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const { correo, contrasena } = JSON.parse(event.body);

        const result = await dynamodb
            .scan({
                TableName: "UsuariosTable",
                FilterExpression: "correo = :correo and contrasena = :contrasena",
                ExpressionAttributeValues: {
                    ":correo": correo, 
                    ":contrasena": contrasena,
                },
            })
            .promise();

        const usuario = result.Items;
        console.log(usuario);
        return {
            status: 200,
            body: usuario,
        };
    } catch (error) {
        console.log(error);
        return {
            status: 300,
            body: usuario,
        };
    }
};
module.exports = {
    getUsuario,
};