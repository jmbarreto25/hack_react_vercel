import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export function UserForm() {
    const [form, setForm] = useState({ nombre: '', correo: '', edad: '' });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            // Si hay un ID, se está editando un usuario existente
            axios.get(`http://localhost:5000/api/usuarios/${id}`)
                .then(response => {
                    const userData = response.data;
                    console.log("Datos del usuario:", response.data);
                    setForm({
                    nombre: userData.nombre.nombre || userData.nombre, // Ajuste aquí
                    correo: userData.correo,
                    edad: userData.edad
                    });
                                  }
                     )
                .catch(error => console.error("Error al obtener el usuario:", error));
        }
    }, [id]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            axios.put(`http://localhost:5000/api/usuarios/${id}`, form)
                .then(() => navigate('/'))
                .catch(error => console.error("Error al actualizar el usuario:", error));
        } else {
            axios.post('http://localhost:5000/api/usuarios/', form)
                .then(() => navigate('/'))
                .catch(error => console.error("Error al crear el usuario:", error));
        }
    };

    return (
        
        <form onSubmit={handleSubmit}>
            <h1> Crear usuario </h1>
            <input
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Nombre"
                required
            />
            <input
                name="correo"
                value={form.correo}
                onChange={handleChange}
                placeholder="Correo"
                required
            />
            <input
                name="edad"
                type="number"
                value={form.edad}
                onChange={handleChange}
                placeholder="Edad"
                required
            />
            <button type="submit">{id ? 'Actualizar' : 'Crear'} Usuario</button>
        </form>
    );
}
