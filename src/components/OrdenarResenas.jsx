import React from "react";
import "./OrdenarResenas.css";

export default function OrdenarResenas({ orden, onChange }) {
  return (
    <div className="ordenar-resenas-container">
      <label>Ordenar reseñas por:</label>

      <select value={orden} onChange={(e) => onChange(e.target.value)}>
        <option value="">Sin orden</option>
        <option value="recientes">Más recientes</option>
        <option value="antiguas">Más antiguas</option>
        <option value="puntuacionAlta">Puntuación más alta</option>
        <option value="puntuacionBaja">Puntuación más baja</option>
        <option value="horasMas">Más horas jugadas</option>
        <option value="horasMenos">Menos horas jugadas</option>
      </select>
    </div>
  );
}
