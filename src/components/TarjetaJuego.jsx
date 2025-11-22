import React from "react";
import "./TarjetaJuego.css";

export default function TarjetaJuego({ juego, onEditar, onEliminar, onVerResenas }) {
  return (
    <div className="tarjeta-modern">

      <img
        className="tarjeta-imagen"
        src={juego.imagenPortada}
        alt={juego.titulo}
      />

      <h3 className="tarjeta-titulo">{juego.titulo}</h3>

      <p><strong>Género:</strong> {juego.genero}</p>
      <p><strong>Plataforma:</strong> {juego.plataforma}</p>
      <p><strong>Año:</strong> {juego.añoLanzamiento}</p>

      <p className="tarjeta-estado">
        <strong>Estado:</strong>{" "}
        {juego.completado ? "Completado ✔" : "Pendiente ⏳"}
      </p>

      <div className="tarjeta-botones">
        <button className="btn-secondary" onClick={onVerResenas}>Ver reseñas</button>
        <button className="btn-primary" onClick={onEditar}>Editar</button>
        <button className="btn-danger" onClick={onEliminar}>Eliminar</button>
      </div>

    </div>
  );
}
