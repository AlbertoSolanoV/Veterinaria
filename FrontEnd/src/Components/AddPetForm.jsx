import React, { useState } from "react";
import { useForm } from "../hooks/useForm";
import Swal from "sweetalert2";

export const AddPetForm = () => {
  const initialState = {
    nombre: "",
    raza: "",
    edad: "",
    peso: "",
    altura: "",
    color: "",
    sexo: "",
  };
  var idCliente = sessionStorage.getItem("idCliente");

  const [formData, setFormData] = useState(initialState);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
  
    Swal.fire({
      title: "Seguro?",
      text: "Registrar mascota.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si!",
      cancelButtonText: "No, cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const url = "https://n4vd03p5e8.execute-api.us-east-1.amazonaws.com/mascota/"+idCliente; 
        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
      
          if (!response.ok) {
            throw new Error("Error in API response.");
          }
          const data = await response.json();
          console.log(data);
      
          // Show a SweetAlert after successful insertion
          Swal.fire("Exito!", "Se ha insertado una nueva mascota.", "success");
      
          // Clear the form after successful submission
          setFormData(initialState);
        } catch (error) {
          console.log(error);
          Swal.fire("Error", ":(", "error");
        }
      }
    });
  };


  return (
    <>
      <form className="form-group needs-validation" onSubmit={submitForm}>
        <div class="m-3">
          <input
            name="nombre"
            placeholder="Nombre"
            type="text"
            className="form-control"
            onChange={onInputChange}
            required
          />
        </div>
        <div class="m-3">
          <input
            name="raza"
            placeholder="Raza"
            type="text"
            className="form-control"
            onChange={onInputChange}
            required
          />
        </div>
        <div class="m-3">
          <input
            name="edad"
            placeholder="Edad"
            type="Number"
            className="form-control"
            onChange={onInputChange}
            required
          />
        </div>
        <div class="m-3">
          <input
            name="peso"
            placeholder="Peso"
            type="Number"
            className="form-control"
            onChange={onInputChange}
            required
          />
        </div>
        <div class="m-3">
          <input
            name="altura"
            placeholder="Altura"
            type="Number"
            className="form-control"
            onChange={onInputChange}
            required
          />
        </div>
        <div class="m-3">
          <input
            name="color"
            placeholder="Color"
            type="text"
            className="form-control"
            onChange={onInputChange}
            required
          />
        </div>
        <div class="m-3">
          <input
            name="sexo"
            placeholder="Sexo"
            type="text"
            className="form-control"
            onChange={onInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Añadir
        </button>
      </form>
    </>
  );
};
