const AWS = require("aws-sdk");

const deleteMascota = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { idMascota } = event.pathParameters;

    await dynamodb.delete({
      TableName: 'MascotasTable',
      Key: { idMascota },
    }).promise();

    return {
      status: 200,
      statusText: 'Mascota eliminada correctamente',
      body: JSON.stringify({
        message: 'Mascota deleted successfully',
      }),
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  deleteMascota,
};