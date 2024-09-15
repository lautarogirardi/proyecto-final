import "./formulario.css";
import { useState } from "react";

export function formulario() {
  const [nombre, setNombre] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedNombre = nombre.trim();
    const trimmedContraseña = contraseña.trim();
    if (trimmedNombre === "" || trimmedContraseña === "") {
      setError(true);
      return;
    }
    setError(false);
  };

  return (
    <section>
      <h1>login</h1>
      <form className="formulario" onSubmit={handleSubmit}>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="password"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
        />
        <button>iniciar sesion</button>
      </form>
      {error && <p key="error-message">todos los campos obligatorios</p>}
    </section>
  );
}