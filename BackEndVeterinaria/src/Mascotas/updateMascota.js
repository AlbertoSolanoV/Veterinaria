// mascotaFunctions.js
const AWS = require("aws-sdk");

const updateMascota = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { idMascota } = event.pathParameters;

    const { nombre, raza, edad, peso, altura, color, sexo } = JSON.parse(event.body);

    await dynamodb.update({
      TableName: 'MascotasTable',
      Key: { idMascota },
      UpdateExpression:
        'set nombre = :nombre, raza = :raza, edad = :edad, peso = :peso, altura = :altura, color = :color, sexo = :sexo',
      ExpressionAttributeValues: {
        ':nombre': nombre,
        ':raza': raza,
        ':edad': edad,
        ':peso': peso,
        ':altura': altura,
        ':color': color,
        ':sexo': sexo,
      },
      ReturnValues: 'ALL_NEW',
    }).promise();

    return {
      status: 200,
      statusText: 'Mascota actualizada correctamente',
      body: JSON.stringify({
        message: 'Mascota updated successfully',
      }),
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  updateMascota,
};
