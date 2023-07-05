import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/PetsTable.css';

const PetsList = () => {
  const [pets, setPets] = useState([]);
  var idCliente = sessionStorage.getItem("idCliente");

  useEffect(() => {
    fetch('https://n4vd03p5e8.execute-api.us-east-1.amazonaws.com/mascotas/'+idCliente)
      .then((response) => response.json())
      .then((data) => {
        setPets(data.body.mascotas);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h3>Lista de mascotas</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Raza</th>
            <th>Edad</th>
            <th>Sexo</th>
            <th>Peso</th>
            <th>Altura</th>
            <th>Color</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr key={pet.idMascota}>
              <td>{pet.nombre}</td>
              <td>{pet.raza}</td>
              <td>{pet.edad}</td>
              <td>{pet.sexo}</td>
              <td>{pet.peso}</td>
              <td>{pet.altura}</td>
              <td>{pet.color}</td>
              <td>
                <Link to={`/edit-pet?id=${pet.idMascota}`}>
                  <button>Editar</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PetsList;
