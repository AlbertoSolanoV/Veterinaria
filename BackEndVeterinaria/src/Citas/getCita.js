const AWS = require("aws-sdk");

const getCita = async (event) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const { idCita } = event.pathParameters;
    
        const result = await dynamodb
          .get({
            TableName: "CitasTable",
            Key: {
              idCita,
            },
          })
          .promise();
    
        const cita = result.Item;
        console.log(cita);
    
        return {
          status: 200,
          body: cita,
        };
      } catch (error) {
        console.log(error);
        return {
            status: 300,
          };
      }
};

module.exports = {
    getCita,
};
