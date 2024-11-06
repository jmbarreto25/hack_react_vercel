import React, { useState } from 'react';
import axios from 'axios';

export function UserSearch() {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [edad, setEdad] = useState('');
    const [resultados, setResultados] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/usuarios/search', {
                params: { nombre, correo, edad }
            });
            setResultados(response.data.resultados);
        } catch (error) {
            console.error("Error al buscar usuarios:", error);
            if (error.response){
                console.error("Respuesta del servidor:", error.response.data);
            } else {
                console.error("Error en la solicitud:", error.message);
            }
            
        }
    };

    return (
        <div>
            <h1>Buscar Usuarios</h1>
            <input
                placeholder="Nombre"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
            />
            <input
                placeholder="Correo"
                value={correo}
                onChange={e => setCorreo(e.target.value)}
            />
            <input
                placeholder="Edad"
                type="number"
                value={edad}
                onChange={e => setEdad(e.target.value)}
            />
            <button onClick={handleSearch}>Buscar</button>

            <ul>
                {resultados.map(usuario => (
                    <li key={usuario.id}>{usuario.nombre} - {usuario.correo} - {usuario.edad} años</li>
                ))}
            </ul>
        </div>
    );
}
