import './styles/Login.css';
import { Navbar } from './Components/Navbar'
import { AddPetForm } from './Components/AddPetForm';
import ListPets from './Components/ListPets.jsx';
import React, { useEffect } from 'react'

export const PetManagement = () => {
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const tab = queryParams.get('tab');
        if (tab === 'list') {
          const listTab = document.getElementById('nav-list-tab');
          listTab.click();
        }
      }, []);

    return (
        <>
            <Navbar/>
            <div className="container jumbotron">
                <h1>Administración de mascotas</h1>
                <hr />
                <nav>
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <button class="nav-link active" id="nav-annadir-tab" data-bs-toggle="tab" data-bs-target="#nav-annadir" type="button" role="tab" aria-controls="nav-annadir" aria-selected="true">Añadir</button>
                    <button class="nav-link" id="nav-list-tab" data-bs-toggle="tab" data-bs-target="#nav-list" type="button" role="tab" aria-controls="nav-list" aria-selected="false">Listar</button>
                </div>
                </nav>
                <div class="tab-content" id="nav-tabContent">
                    <div class="tab-pane fade show active" id="nav-annadir" role="tabpanel" aria-labelledby="nav-annadir-tab"><AddPetForm/></div>
                    <div class="tab-pane fade" id="nav-list" role="tabpanel" aria-labelledby="nav-list-tab"><ListPets/></div>
                </div>

            </div>
        </>
    )
}
