import "./formulario.css"
import { useState } from "react"
export function formulario(){
    const [nombre, setnombre]=useState("");
    const [contraseña, setcontraseña]=useState("");
    
    return (
    <section>
        <h1>login</h1>

        <form className="formulario">
            <input type="text" />
            <input type="password"/>
            <button> iniciar sesion </button>
        </form>
    </section>
    )
}