import React from "react";
import CitasDisponibles from "./Components/CitasDisponibles";
import { Navbar } from './Components/Navbar'

export const CitasDispo = () => {
  return (
    <>
     <Navbar/>
      <div className="position-relative d-flex p-0 center-block">
        <div className="container shadow-lg p-3 mb-5 bg-body rounded">
          <div className=" p-2">
            <CitasDisponibles />
          </div>
        </div>
      </div>
    </>
  );
};
