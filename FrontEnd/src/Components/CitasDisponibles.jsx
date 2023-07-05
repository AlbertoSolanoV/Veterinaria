import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_alert } from "../Functions/showAlert";

const CitasDisponibles = () => {
  const url = "https://n4vd03p5e8.execute-api.us-east-1.amazonaws.com/getCitas";
  const [citas, setCitas] = useState([]);
  const [tipo, setTipo] = useState("");
  const [estado, setEstado] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [id, setid] = useState("");
  const [titulo, setTitulo] = useState("");
  const [operation, setOperation] = useState("");
  const [esCitaSeleccionada, setEsCitaSeleccionada] = useState(false);

  const cambiarEstadoCita = () => {
    setEsCitaSeleccionada(!esCitaSeleccionada);
  };


  useEffect(() => {
    getCitas();
  }, []);

  const getCitas = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error en la respuesta de la petición.");
      }
      const data = await response.json();
      console.log(data.body.citas);

      var citasFiltradas = data.body.citas.filter(function (task) {
        return !task.estado;
        });

        console.log(citasFiltradas);

      setCitas(citasFiltradas);
    } catch (error) {
      show_alert("Hubo un error en la petición:" + error, "warning");
    }
  };

  const enviarSolicitud = async (parametros, metodo, url) => {
    try {
      console.log(parametros);
      const response = await fetch(url, {
        method: metodo,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parametros),
      });
      if (!response.ok) {
        throw new Error("Error en la respuesta de la petición.");
      }
      const data = await response.json();
      console.log(data);
      const tipo = data.status;
      const msg = data.statusText;
      show_alert(msg, "success");
      if (tipo === 200) {
        document.getElementById("btnCerrar").click();
        getCitas();
      }
    } catch (error) {
      show_alert("Error en la solicitud", "error");
      console.log(error);
    }
  };

  const agendarCita = (id) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Seguro de agendar la cita?",
      icon: "question",
      text: "No se podra cancelar",
      showCancelButton: true,
      confirmButtonText: "Si, agendar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setid(id);
        var idCliente = sessionStorage.getItem("idCliente");
        console.log(id +" idCliente "+ idCliente);
        var url =
          "https://n4vd03p5e8.execute-api.us-east-1.amazonaws.com/scheduleCita/" +
          id;
        enviarSolicitud({idCliente: idCliente}, "PUT", url);
      } else {
        show_alert("La cita no fue cancelada", "info");
      }
    });
  };
  const citasCliente=()=>{
    var tituloPag = document.getElementById("titulo");
    var txtBtn = document.getElementById("txtBtn");

    cambiarEstadoCita();
    if(tituloPag.innerHTML === 'Citas disponibles'){
      tituloPag.innerHTML = 'Mis citas';
      txtBtn.innerHTML = 'Ver citas disponibles';
      getCitasCliente();
    }else{
      tituloPag.innerHTML = 'Citas disponibles';
      txtBtn.innerHTML = 'Mis citas';

      getCitas();
    }
    console.log(tituloPag);
  }
  const cancelarCita = (id) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Seguro de cancelar la cita?",
      icon: "question",
      text: "No se podra recuperar",
      showCancelButton: true,
      confirmButtonText: "Si, cancelar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setid(id);
        var url =
          "https://n4vd03p5e8.execute-api.us-east-1.amazonaws.com/cancelCita/" +
          id;
        enviarSolicitud({}, "PUT", url);
      } else {
        show_alert("La cita no fue cancelada", "info");
      }
    });
  };
  const CambioCitas=(id)=>{
    var tituloPag = document.getElementById("titulo");

    if(tituloPag.innerHTML === 'Citas disponibles'){
        agendarCita(id)
    }else{
        cancelarCita(id);
    }
  }

  const getCitasCliente = async () => {
    var idCliente = sessionStorage.getItem("idCliente");
    console.log(idCliente);
      var urlCliente = "https://n4vd03p5e8.execute-api.us-east-1.amazonaws.com/getCitasCliente/"+ idCliente;
      console.log(urlCliente);

      const response = await fetch(urlCliente);
      if (!response.ok) {
        throw new Error("Error en la respuesta de la petición.");
      }
      const data = await response.json();
      console.log(data);

      console.log(data.body.citas);
      setCitas(data.body.citas);

  };

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row mt-3">
        <h1 className="h2 mx-auto" id="titulo">Citas disponibles</h1>
        <div className="col-md-4 offset-4">
            
            <div className="d-grid mx-auto">
              <button
                onClick={() => citasCliente()}
                className="btn btn-dark"
              >
                <i className="fa-solid fa-circle-plus" id="txtBtn">Mis citas</i> 
              </button>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 col-lg-8 offset-0 offset-lg-12">
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>id</th>
                    <th>Tipo</th>
                    <th>Horario</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {citas.map((cita, i) => (
                    <tr key={cita.idCita}>
                      <td>{i + 1}</td>
                      <td>{cita.tipo}</td>
                      <td>{cita.fecha + " / " + cita.hora}</td>
                      <td>
                        <button
                          onClick={() => CambioCitas(cita.idCita)}
                          className="btn btn-success"
                          id="btnCita"
                        >
                          <i className="fa-solid fa-trash">{esCitaSeleccionada ? 'Cancelar' : 'Seleccionar cita'}</i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div id="modalCita" className="modal fade" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <label className="h5">{titulo}</label>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input type="hidden" id="id"></input>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <p className="">Fecha de la cita</p>
                </span>
                <input
                  type="date"
                  id="fecha"
                  className="form-control"
                  placeholder="Fecha"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <p className="">Hora de la cita</p>
                </span>
                <input
                  type="time"
                  id="hora"
                  className="form-control"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                ></input>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <p className="">Tipo de cita</p>
                </span>
                <select
                  id="tipo"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                >
                  <option>Seleccione uno</option>
                  <option value="Vacunacion">Vacunacion</option>
                  <option value="Desparacitacion">Desparacitacion</option>
                  <option value="TratamientoC">Tratamiento Completo</option>
                  <option value="Operacion">Operacion</option>
                  <option value="Inyecciones">Inyecciones</option>
                </select>
              </div>
              <div className="d-grid col-6 mx-auto">
                <button
                  className="btn btn-success"
                  onClick={() => ValidarDatos()}
                >
                  <i className="fa-solid fa-floppy-disk"></i> Guardar
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                id="btnCerrar"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitasDisponibles;
