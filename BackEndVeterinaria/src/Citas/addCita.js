const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const agregarCita = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { tipo, fecha, hora } = JSON.parse(event.body);
  const idCita = v4();

  const newCita = {
    idCita,
    fecha,
    hora,
    tipo,
    estado: false,
    idCliente: 0
  };

  await dynamodb
    .put({
      TableName: "CitasTable",
      Item: newCita,
    })
    .promise();

  return {
    status: 200,
    statusText:'Cita registrada correctamente',
    body: JSON.stringify(newCita),
  };
  } catch (error) {
    console.log(error);
    return {
        status: 300,
        statusText:'Error al registrar cita'
      };
    
  }
};

module.exports = {
    agregarCita,
};
