import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
// import { redirect } from "react-router-dom";

export default function Inicio() {
  //Variable para obtener la ruta actual y realizar validaciones en las vistas
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const user = searchParams.get("user");

  //States para guardar los datos de "obtenerPaciente"
  const [patient, setPatient] = useState({});
  const [error, setError] = useState(false);
  const [loadingPatient, setLoadingPatient] = useState(false);

  //Funcion para solicitar la info a la API
  const obtenerPaciente = async () => {
    try {
      setLoadingPatient(true);
      const { data } = await axios(
        `http://localhost:8000/api/patients/user/${user}`
      );
      setPatient(data);
      setLoadingPatient(false);
    } catch (error) {
      console.log(Object.values(error.response.data.errors));
      setError(true);
    }
  };

  //useEffect para ejecutar al menos una vez las solicitudes a la API, cada vez que se visita la pagina
  useEffect(() => {
    obtenerPaciente();
  }, []);

  return (
    <>
      {/* codigo para github */}
      {user === null || user === "" ? (
        <Navigate to="/auth/login" />
      ) : (
        <div className="text-center mt-10 bg-white rounded-lg container py-10">
          {loadingPatient ? (
            <h1 className="text-center text-4xl font-bold p-20">Cargando...</h1>
          ) : (
            <>
              <p className="font-bold text-6xl">Bienvenid@</p>
              <p className="text-5xl py-3 text-indigo-700">{`${patient.name} ${patient.last_name}`}</p>
            </>
          )}
        </div>
      )}

      {/* codigo para desarrolo o produccion real */}
      {/* {!user || error ? (
        <Navigate to="/auth/login" />
      ) : (
        <div className="text-center mt-10 bg-white rounded-lg container py-10">
          {loadingPatient ? (
            <h1 className="text-center text-4xl font-bold p-20">Cargando...</h1>
          ) : (
            <>
              <p className="font-bold text-6xl">Bienvenid@</p>
              <p className="text-5xl py-3 text-indigo-700">{`${patient.name} ${patient.last_name}`}</p>
            </>
          )}
        </div>
      )} */}
    </>
  );
}
