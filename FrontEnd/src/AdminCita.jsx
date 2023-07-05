import React from "react";
import FormularioCita from "./Components/FormularioCita";
import { Navbar } from './Components/Navbar'

export const AdminCita = () => {
  return (
    <>
     <Navbar/>
      <div className="position-relative d-flex p-0 center-block">
        <div className="container shadow-lg p-3 mb-5 bg-body rounded">
          <div className=" p-2">
            <FormularioCita />
          </div>
        </div>
      </div>
    </>
  );
};
