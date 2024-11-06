import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { UserList } from './components/UserList';
import { UserForm } from './components/UserForm';
import { UserSearch } from './components/UserSearch';
import { UserCount } from './components/UserCount';


export function App() {
    return (
        <Router>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4" >
                    <div className="navbar-nav" >
                        <Link className="nav-link" to="/">Inicio</Link>
                        <Link className="nav-link" to="/crear">Crear Usuarios</Link>
                        <Link className="nav-link" to="/buscar">Buscar Usuario</Link>
                        <Link className="nav-link" to="/user-list">Mostrar Usuarios</Link>
                    </div>
                </nav>
                {/* <nav>
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/crear">Crear Usuario</Link></li>
                        <li><Link to="/buscar">Buscar Usuario</Link></li>
                        <li><Link to="/user-list">Mostrar Usuarios</Link></li>
                    </ul>
                </nav> */}
                <Routes>
                    <Route path="/" element={<UserCount />} />
                    <Route path="/crear" element={<UserForm />} />
                    <Route path="/editar/:id" element={<UserForm />} />
                    <Route path="/buscar" element={<UserSearch />} />
                    <Route path="/user-list" element={<UserList />} />
                </Routes>
            </div>
        </Router>
    );
}


