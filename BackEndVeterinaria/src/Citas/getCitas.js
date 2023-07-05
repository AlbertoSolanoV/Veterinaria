const AWS = require("aws-sdk");

const getCitas = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const result = await dynamodb
      .scan({
        TableName: "CitasTable",
      })
      .promise();

      const resultClientes = await dynamodb
      .scan({
        TableName: "UsuariosTable",
      })
      .promise();
    const clientes = resultClientes.Items;
    const citas = result.Items;
    console.log(citas);

    citas.forEach(cita => {
      if (cita.estado) {
        cita.estadoD = 'Activo';
        clientes.forEach(cliente => {
          console.log(cita.idCliente);
          console.log(cliente.idUsuario);

          if (cita.idCliente === cliente.idUsuario){
            console.log('Entro en la compara');
            cita.cliente = cliente.nombre + " " + cliente.apellidos
          }
        });
      } else {
        cita.estadoD = 'Inactivo';
      }

    });

    return {
      status: 200,
      body: {
        citas
    }
    };
  } catch (error) {
    console.log(error);
  }
};

const getCitasCliente = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const { idCliente } = event.pathParameters;

    const result = await dynamodb
      .scan({
        TableName: "CitasTable",
      })
      .promise();

    const citasC = result.Items;
    console.log(citasC);
    var citas = [];

    citasC.forEach(cita => {
      console.log(cita.idCliente);
      console.log(idCliente);

      if (cita.idCliente == idCliente) {
        citas.push(cita);
      } 
    });

    return {
      status: 200,
      body: {
        citas
    }
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
    getCitas,getCitasCliente
};
