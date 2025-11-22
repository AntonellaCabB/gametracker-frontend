import React from "react";
import "./OrdenarJuegos.css";

export default function OrdenarJuegos({ orden, onChange }) {
  return (
    <div className="ordenar-container">
      <label>Ordenar por:</label>

      <select value={orden} onChange={(e) => onChange(e.target.value)}>
        <option value="">Sin orden</option>
        <option value="az">Título A → Z</option>
        <option value="za">Título Z → A</option>
        <option value="nuevo">Más nuevos primero</option>
        <option value="viejo">Más antiguos primero</option>
      </select>
    </div>
  );
}
