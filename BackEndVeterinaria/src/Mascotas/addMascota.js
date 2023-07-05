const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const crearMascota = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { idCliente } = event.pathParameters;
    const { nombre, raza, edad, peso, altura, color, sexo } = JSON.parse(event.body);
    const idMascota = v4();

    const newPet = {
        idMascota,
        nombre, 
        raza,
        edad, 
        peso, 
        altura,
        color,
        sexo,
        idCliente
    };

    console.log(newPet);
    await dynamodb
      .put({
        TableName: "MascotasTable",
        Item: newPet,
      })
      .promise();

    return {
      status: 200,
      statusText: "Mascota registrada correctamente",
      body: JSON.stringify(newPet),
    };
  } catch (error) {
    console.log(error);
    return {
      status: 300,
      statusText: "Error al registrar mascota",
    };
  }
};

module.exports = {
    crearMascota,
};
