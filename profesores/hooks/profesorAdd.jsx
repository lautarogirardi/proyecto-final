import React, { useState } from "react";

const ProfesorAdd = ({ onAdd }) => {
const [nombre, setNombre] = useState("");
const [apellido, setApellido] = useState("");
const [email, setEmail] = useState("");
const [telefono, setTelefono] = useState("");
const [materias, setMaterias] = useState("");

const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoProfesor = { nombre, apellido, email, telefono, Materias };
    onAdd(nuevoProfesor);
    setNombre("");
    setApellido("");
    setEmail("");
    setTelefono("");
    setMaterias("");
};

return (
    <form onSubmit={handleSubmit}>
    <div>
        <label>Nombre:</label>
        <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
        />
    </div>
    <div>
        <label>Apellido:</label>
        <input
        type="text"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
        required
        />
    </div>
    <div>
        <label>Email:</label>
        <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        />
    </div>
    <div>
        <label>Teléfono:</label>
        <input
        type="text"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        required
        />
    </div>
    <div>
        <label>Materias:</label>
        <input
        type="text"
        value={Materias}
        onChange={(e) => setMaterias(e.target.value)}
        required
        />
    </div>
    <button type="submit">Agregar Profesor</button>
    </form>
);
};

export default ProfesorAdd;
