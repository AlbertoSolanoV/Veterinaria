const AWS = require("aws-sdk");

const deleteCita = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { idCita } = event.pathParameters;

    await dynamodb
      .delete({
        TableName: "CitasTable",
        Key: {
            idCita,
        },
      })
      .promise();

    return {
      status: 200,
      statusText:'Eliminado correctamente',
      body: {
        message: "Task deleted",
      },
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
    deleteCita,
};
