import React, { useEffect, useState } from "react";
import img1 from '../img/img1.png';
import img2 from '../img/img2.jpg';

export const CarouselComp = () => {

  return (
    <>
      <div className="app">
      <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img className="d-block w-100" src={img1} alt="First slide"/>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src={img2} alt="Second slide"/>
    </div>
  </div>
  <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Anterior</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Siguiente</span>
  </a>
</div>
      </div>
    </>
    
  );
};
