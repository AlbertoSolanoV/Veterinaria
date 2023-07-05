import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_alert } from "../Functions/showAlert";

const FormularioCita = () => {
  const url = "https://n4vd03p5e8.execute-api.us-east-1.amazonaws.com/getCitas";
  const [citas, setCitas] = useState([]);
  const [tipo, setTipo] = useState("");
  const [estado, setEstado] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [id, setid] = useState("");
  const [titulo, setTitulo] = useState("");
  const [operation, setOperation] = useState("");

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

      setCitas(data.body.citas);
    } catch (error) {
      show_alert("Hubo un error en la petición:" + error, "warning");
    }
  };

  const openModal = (op, id, tipo, fecha, hora ) => {
    console.log("eNTRO " + op);
    setTipo("");
    setEstado("");
    setid("");
    setFecha("");
    setHora("");
    setOperation(op);

    if (op === 1) {
      setTitulo("Agregar nueva cita");
    } else {
      setTitulo("Editar cita");     
       setTipo(tipo);
      setFecha(fecha);
      setHora(hora);
      setid(id);

      console.log("eNTRO "  + tipo + fecha + hora + id);
    }
  };

  const ValidarDatos = () => {
    var parametros;
    var metodo;
    var url;
    if (fecha.trim() === "") {
      show_alert("Selecciona una fecha para la cita", "warning");
    } else if (hora.trim() === "") {
      show_alert("Selecciona una hora para la cita", "warning");
    } else if (tipo.trim() === "") {
      show_alert("Selecciona un tipo para la cita", "warning");
    } else {
      parametros = {
        tipo: tipo.trim(),
        fecha: fecha.trim(),
        hora: hora.trim(),
      };
      if (operation === 1) {
        metodo = "POST";
        url = "https://n4vd03p5e8.execute-api.us-east-1.amazonaws.com/addCita";
      } else {
        metodo = "PUT";
        url =
          "https://n4vd03p5e8.execute-api.us-east-1.amazonaws.com/updateCita/" +
          id;
      }

      enviarSolicitud(parametros, metodo, url);
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

  const eliminarCita = (id) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Seguro de eliminar la cita?",
      icon: "question",
      text: "No se podra recuperar",
      showCancelButton: true,
      confirmButtonText: "Si, cancelar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setid(id);
        var url =
          "https://n4vd03p5e8.execute-api.us-east-1.amazonaws.com/deleteCita/" +
          id;
        enviarSolicitud({}, "DELETE", url);
      } else {
        show_alert("La cita no fue eliminada", "info");
      }
    });
  };

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row mt-3">
        <h1 className="h2 mx-auto" >Administracion de citas</h1>
          <div className="col-md-4 offset-4">
            
            <div className="d-grid mx-auto">
              <button
                onClick={() => openModal(1)}
                className="btn btn-dark"
                data-bs-toggle="modal"
                data-bs-target="#modalCita"
              >
                <i className="fa-solid fa-circle-plus"></i> Agregar
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
                    <th>Cliente</th>

                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {citas.map((cita, i) => (
                    <tr key={cita.idCita}>
                      <td>{i + 1}</td>
                      <td>{cita.tipo}</td>
                      <td>{cita.fecha + " / " + cita.hora}</td>
                      <td>{cita.cliente}</td>
                      <td>{cita.estadoD}</td>
                      
                      <td>
                        <button
                          onClick={() =>
                            openModal(
                              2,
                              cita.idCita,
                              cita.tipo,
                              cita.fecha,
                              cita.hora
                            )
                          }
                          className="btn btn-info"
                          data-bs-toggle="modal"
                          data-bs-target="#modalCita"
                        >
                          <i className="fa-solid fa-edit">Editar</i>
                        </button>
                        &nbsp;
                        <button
                          onClick={() => cancelarCita(cita.idCita)}
                          className="btn btn-danger"
                        >
                          <i className="fa-solid fa-trash">Cancelar</i>
                        </button>
                        &nbsp;
                        <button
                          onClick={() => eliminarCita(cita.idCita)}
                          className="btn btn-warning"
                        >
                          <i className="fa-solid fa-trash">Eliminar</i>
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

export default FormularioCita;
