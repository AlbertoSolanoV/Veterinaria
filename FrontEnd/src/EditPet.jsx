import React, { useState, useEffect } from "react";
import "./styles/EditPet.css";
import Swal from "sweetalert2";
import { useParams, useNavigate } from 'react-router-dom';

const EditPet = () => {
  const [pet, setPet] = useState({});
  const queryParams = new URLSearchParams(location.search);
  const idMascota = queryParams.get("id");
  const navigate = useNavigate();

  const fetchPetData = async () => {
    try {
      const response = await fetch(
        `https://n4vd03p5e8.execute-api.us-east-1.amazonaws.com/mascota/${idMascota}`
      );
      const data = await response.json();
      console.log("Full response:", response);
      const petData = data.body;
      setPet(petData);
      console.log("Pet data fetched:", petData);
    } catch (error) {
      console.error("Error fetching pet data:", error);
    }
  };

  useEffect(() => {
    fetchPetData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPet({ ...pet, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se actualizará la información de la mascota.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, actualizar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `https://n4vd03p5e8.execute-api.us-east-1.amazonaws.com/mascota/${idMascota}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(pet),
            }
          );

          const data = await response.json();
          console.log(data);

          Swal.fire(
            "Actualizado",
            "La información de la mascota ha sido actualizada.",
            "success"
          ).then(() => {
            navigate('/Pets?tab=list');
          });
        } catch (error) {
          console.error("Error updating pet:", error);

          Swal.fire({
            title: "Error",
            text: "Ha ocurrido un error al actualizar la mascota.",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
      }
    });
  };

  const handleDelete = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se eliminará la mascota.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `https://n4vd03p5e8.execute-api.us-east-1.amazonaws.com/mascota/${idMascota}`,
            {
              method: "DELETE",
            }
          );

          const data = await response.json();
          console.log(data);

          Swal.fire(
            "Eliminado",
            "La mascota ha sido eliminada.",
            "success"
          ).then(() => {
            navigate('/Pets?tab=list');
          });
        } catch (error) {
          console.error("Error deleting pet:", error);

          Swal.fire({
            title: "Error",
            text: "Ha ocurrido un error al eliminar la mascota.",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
      }
    });
  };

  return (
    <div className="edit-pet-container">
      <h3>Editar Mascota</h3>
      <form onSubmit={handleSubmit} className="edit-pet-form">
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          name="nombre"
          id="nombre"
          value={pet.nombre || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="raza">Raza</label>
        <input
          type="text"
          name="raza"
          id="raza"
          value={pet.raza || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="edad">Edad</label>
        <input
          type="number"
          name="edad"
          id="edad"
          value={pet.edad || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="sexo">Sexo</label>
        <select
          name="sexo"
          id="sexo"
          value={pet.sexo || ""}
          onChange={handleInputChange}
        >
          <option value="M">Macho</option>
          <option value="F">Hembra</option>
        </select>

        <label htmlFor="peso">Peso (kg)</label>
        <input
          type="number"
          name="peso"
          id="peso"
          value={pet.peso || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="altura">Altura (cm)</label>
        <input
          type="number"
          name="altura"
          id="altura"
          value={pet.altura || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="color">Color</label>
        <input
          type="text"
          name="color"
          id="color"
          value={pet.color || ""}
          onChange={handleInputChange}
        />

        <button type="submit">Actualizar</button>
        <button type="button" onClick={handleDelete} style={{ backgroundColor: "red", color: "white", marginLeft: "10px" }}>Eliminar</button>
      </form>
    </div>
  );
};

export default EditPet;
