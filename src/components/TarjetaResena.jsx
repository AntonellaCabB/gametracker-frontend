import React from "react";
import "./TarjetaResena.css";

export default function TarjetaResena({ resena, onEditar, onEliminar }) {
  return (
    <div className="tarjeta-resena">
      <div className="resena-header">
        <strong>{resena.puntuacion} ⭐</strong>
        <span className="resena-fecha">
          {new Date(resena.fechaCreacion).toLocaleDateString()}
        </span>
      </div>

      <p className="resena-texto">{resena.textoReseña}</p>

      <p className="resena-meta">
        <small>Horas: {resena.horasJugadas} · Dificultad: {resena.dificultad} · Recomendaria: {resena.recomendaria ? "Sí" : "No"}</small>
      </p>

      <div className="resena-acciones">
        <button onClick={() => onEditar(resena)}>Editar</button>
        <button onClick={() => onEliminar(resena._id)} className="rojo">Eliminar</button>
      </div>
    </div>
  );
}
