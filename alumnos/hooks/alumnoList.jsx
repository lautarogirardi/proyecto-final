import React, { useState } from "react";

const AlumnoList = ({ alumnos, onEdit, onDelete }) => {
const [editIndex, setEditIndex] = useState(null);
const [editAlumno, setEditAlumno] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
});

const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditAlumno({ ...editAlumno, [name]: value });
};

const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit(editIndex, editAlumno);
    setEditIndex(null);
};

return (
    <ul>
    {alumnos.map((alumno, index) => (
        <li key={index}>
        {editIndex === index ? (
            <form onSubmit={handleEditSubmit}>
            <input
                type="text"
                name="nombre"
                value={editAlumno.nombre}
                onChange={handleEditChange}
                required
            />
            <input
                type="text"
                name="apellido"
                value={editAlumno.apellido}
                onChange={handleEditChange}
                required
            />
            <input
                type="email"
                name="email"
                value={editAlumno.email}
                onChange={handleEditChange}
                required
            />
            <input
                type="text"
                name="telefono"
                value={editAlumno.telefono}
                onChange={handleEditChange}
                required
            />
            <button type="submit">Guardar</button>
            <button type="button" onClick={() => setEditIndex(null)}>
                Cancelar
            </button>
            </form>
        ) : (
            <div>
            {alumno.nombre} {alumno.apellido} - {alumno.email} -{" "}
            {alumno.telefono}
            <button
                onClick={() => {
                setEditIndex(index);
                setEditAlumno(alumno);
                }}
            >
                Editar
            </button>
            <button onClick={() => onDelete(index)}>Eliminar</button>
            </div>
        )}
        </li>
    ))}
    </ul>
);
};

export default AlumnoList
