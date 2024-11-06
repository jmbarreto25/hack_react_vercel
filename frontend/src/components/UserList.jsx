import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom'

export function UserList() {
    const [usuarios, setUsuarios] = useState([]);

    const fetchUsuarios = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/usuarios/');
            setUsuarios(response.data);
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
        }
    };

    const handleDelete = async (id) =>{
        await axios.delete(`http://localhost:5000/api/usuarios/${id}`);
        fetchUsuarios();
    }


    useEffect(() => {
        fetchUsuarios();
    }, []);

    return (
        <div>
            <h1>Lista de Usuarios</h1>
            <ul>
                {usuarios.map(usuario => (
                    <li key={usuario.id}>
                        {usuario.nombre} - {usuario.correo} - {usuario.edad} años
                        <Link to={`/editar/${usuario.id}`} className="btn btn-primary"> Editar</Link>
                        <button onClick={() => handleDelete(usuario.id)} className="btn btn-primary">Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
