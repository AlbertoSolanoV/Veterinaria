const AWS = require("aws-sdk");

const scheduleCita = async (event) => {
    try {
      console.log('Entro al coso');
      const dynamodb = new AWS.DynamoDB.DocumentClient();
      const { idCita } = event.pathParameters;
  
      const { idCliente } = JSON.parse(event.body);
      const estado = true;

      await dynamodb.update({
          TableName: 'CitasTable',
          Key:{idCita},
          UpdateExpression: 'set estado = :estado, idCliente = :idCliente',
          ExpressionAttributeValues:{
              ":estado": estado,
              ":idCliente": idCliente,
          },
          ReturnValues: 'ALL_NEW'
      }).promise();
  
      return {
        status: 200,
        statusText:'Cita agendada correctamente',
        body: JSON.stringify({
          message: "Task updated sucessfully",
        }),
      };
    } catch (error) {
      console.log(error);
    }
  };
  
  const cancelCita = async (event) => {
    try {
      const dynamodb = new AWS.DynamoDB.DocumentClient();
      const { idCita } = event.pathParameters;
  
        const estado = false;
        const idCliente = 0;
  
      await dynamodb.update({
          TableName: 'CitasTable',
          Key:{idCita},
          UpdateExpression: 'set estado = :estado, idCliente = :idCliente',
          ExpressionAttributeValues:{
              ":estado": estado,
              ":idCliente": idCliente,
          },
          ReturnValues: 'ALL_NEW'
      }).promise();
  
      return {
        status: 200,
        statusText:'Cancelacion correctamente',
        body: JSON.stringify({
          message: "Task updated sucessfully",
        }),
      };
    } catch (error) {
      console.log(error);
    }
  };

  const updateCita = async (event) => {
    try {
      const dynamodb = new AWS.DynamoDB.DocumentClient();
      const { idCita } = event.pathParameters;
  
        const { fecha, hora, tipo } = JSON.parse(event.body);
  
      await dynamodb.update({
          TableName: 'CitasTable',
          Key:{idCita},
          UpdateExpression: 'set fecha = :fecha, hora = :hora, tipo = :tipo',
          ExpressionAttributeValues:{
              ":fecha": fecha,
              ":hora": hora,
              ":tipo": tipo
          },
          ReturnValues: 'ALL_NEW'
      }).promise();
  
      return {
        status: 200,
        statusText:'Actualizacion correctamente',
        body: JSON.stringify({
          message: "Task updated sucessfully",
        }),
      };
    } catch (error) {
      console.log(error);
    }
  };


  module.exports = {
    scheduleCita,cancelCita,updateCita
  };
  
