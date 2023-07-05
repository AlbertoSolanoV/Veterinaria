const AWS = require("aws-sdk");

const getMascotas = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { idCliente } = event.pathParameters;
    const result = await dynamodb
      .scan({
        TableName: "MascotasTable",
      })
      .promise();

    const mascotasTo = result.Items;
    console.log(mascotas);

    var mascotas = [];

    mascotasTo.forEach(mascota => {
      console.log(mascota.idCliente);
      console.log(idCliente);

      if (mascota.idCliente == idCliente) {
        mascotas.push(mascota);
      } 
    });

    return {
      status: 200,
      body: {
        mascotas
    }
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
    getMascotas,
};
