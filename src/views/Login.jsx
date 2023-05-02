import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [userRef, setUserRef] = useState("");

  return (
    <>
      <div className="container container-form-login rounded-md mt-10 px-5 py-10">
        <div className="flex justify-center mb-10">
          <img
            src="/img/paciente.png"
            alt="imagen paciente"
            className=" w-44"
            title="Imagen de https://www.flaticon.es/iconos-gratis iconos creados por kerismaker - Flaticon"
          />
        </div>
        <form>
          <div className="container-form">
            {/* h1 solo para codigo github */}
            <h1 className="text-red-500 uppercase font-bold text-center pb-4">
              Ingresa Cualquier numero de prueba
            </h1>
            <div className="mb-3">
              <label htmlFor="user" className="form-label text-3xl">
                Usuario:
              </label>
              <input
                type="text"
                className="form-control placeholder-gray-300"
                id="user"
                placeholder="Ingresa tu usuario"
                value={userRef}
                onChange={(e) => setUserRef(e.target.value)}
                required
              />
            </div>{" "}
            <div className="flex justify-center">
              <Link
                to={`/?user=${userRef}`}
                type="submit"
                value="INICIAR  SESION"
                className="button-login flex items-center justify-center text-3xl text-center text-white mt-4 font-bold cursor-pointer"
              >
                INICIAR SESIÓN
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
