import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function UserCount() {
    const [totalUsuarios, setTotalUsuarios] = useState(0);

    const fetchUserCount = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/usuarios/count');
            setTotalUsuarios(response.data.total_usuarios);
        } catch (error) {
            console.error("Error al obtener el total de usuarios:", error);
        }
    };

    useEffect(() => {
        fetchUserCount();
    }, []);

    return (
        <div>
            <h1>Total de Usuarios: {totalUsuarios}</h1>
        </div>
    );
}
