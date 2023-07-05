const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const crearUsuario = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const { nombre, apellidos, correo, contrasena, role } = JSON.parse(event.body);
    const idUsuario = v4();

    const newUser = {
      idUsuario,
      nombre,
      apellidos,
      correo,
      contrasena,
      role
    };

    console.log(newUser);
    await dynamodb
      .put({
        TableName: "UsuariosTable",
        Item: newUser,
      })
      .promise();

    return {
      status: 200,
      statusText: "Usuario registrado correctamente",
      body: JSON.stringify(newUser),
    };
  } catch (error) {
    console.log(error);
    return {
      status: 300,
      statusText: "Error al registrar usuario",
    };
  }
};

module.exports = {
  crearUsuario,
};