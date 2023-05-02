import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

export default function AppointmentsPanel() {
  //Variable para obtener la ruta actual y realizar validaciones en las vistas
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const user = searchParams.get("user");

  //state para guardar los datos de 'obtenerCita'
  const [appointments, setAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(false);

  //Funcion para obtener los datos de la API
  const obtenerCita = async () => {
    try {
      setLoadingAppointments(true);
      const { data } = await axios(
        `http://localhost:8000/api/appointment_information/patient/${id}`
      );
      setAppointments(data);
      setLoadingAppointments(false);
    } catch (error) {
      console.log(Object.values(error.response.data.errors));
    }
  };

  //useEffect para ejecutar al menos una vez las solicitudes a la API, cada vez que se visita la pagina
  useEffect(() => {
    obtenerCita();
  }, []);

  return (
    <div className=" bg-white rounded-2xl my-5 container-info-citas overflow-auto">
      <h1 className="text-center font-bold text-3xl text-indigo-700 pt-5">
        Mira el regitro de tus citas aqui:
      </h1>
      {loadingAppointments ? (
        <h1 className="text-center text-4xl font-bold p-20">Cargando...</h1>
      ) : (
        <div className="flex align-items-center p-5 bg-white rounded-2xl container info-container">
          <table className="table text-center align-middle">
            <thead>
              <tr>
                <th scope="col">Cita ID</th>
                <th scope="col">Doctor</th>
                <th scope="col">Especialidad</th>
                <th scope="col">Hospital</th>
                <th scope="col">Fecha</th>
                <th scope="col">Hora</th>
                <th scope="col">Estado</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {appointments.map((appointment, index) => (
                <tr key={index}>
                  <th scope="row">{appointment.id}</th>
                  <td>{`${appointment.doctor.name} ${appointment.doctor.last_name}`}</td>
                  <td>{appointment.speciality.speciality_name}</td>
                  <td>{appointment.hospital.hospital_name}</td>
                  <td>{appointment.appointment_date}</td>
                  <td>{appointment.appointment_hour}</td>
                  <td>{appointment.status.status_type_name}</td>
                  <td>
                    <Link
                      to={`/comments_panel?user=${user}&id=${appointment.id}`}
                      type="button"
                      className="btn text-white bg-amber-500 hover:bg-amber-600"
                    >
                      Comentario
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
