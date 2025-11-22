import React from "react";
import "./TarjetaJuego.css";

export default function TarjetaJuego({ juego, onEditar, onEliminar }) {
  return (
    <div className="tarjeta">

      <img src={juego.imagenPortada} alt={juego.titulo} />

      <h3>{juego.titulo}</h3>

      <p><strong>Género:</strong> {juego.genero}</p>
      <p><strong>Plataforma:</strong> {juego.plataforma}</p>
      <p><strong>Año:</strong> {juego.añoLanzamiento}</p>

      <p>
        <strong>Estado:</strong>{" "}
        {juego.completado ? "Completado ✔" : "Pendiente ⏳"}
      </p>

      <div className="botones">
        <button onClick={onEditar}>Editar</button>
        <button onClick={onEliminar} className="eliminar">Eliminar</button>
      </div>
    </div>
  );
}
