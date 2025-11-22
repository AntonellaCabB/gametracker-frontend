import React from "react";
import "./FiltrosJuegos.css";

export default function FiltrosJuegos({
  filtros,
  onChange,
  generosDisponibles,
  plataformasDisponibles
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...filtros, [name]: value });
  };

  return (
    <div className="filtros-container">

      {/* BUSCADOR */}
      <div>
        <label>Buscar</label>
        <input
          type="text"
          name="busqueda"
          placeholder="Título o desarrollador"
          value={filtros.busqueda}
          onChange={handleChange}
        />
      </div>

      {/* GÉNERO */}
      <div>
        <label>Género</label>
        <select name="genero" value={filtros.genero} onChange={handleChange}>
          <option value="">Todos</option>
          {generosDisponibles.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      {/* PLATAFORMA */}
      <div>
        <label>Plataforma</label>
        <select name="plataforma" value={filtros.plataforma} onChange={handleChange}>
          <option value="">Todas</option>
          {plataformasDisponibles.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* ESTADO */}
      <div>
        <label>Estado</label>
        <select name="estado" value={filtros.estado} onChange={handleChange}>
          <option value="">Todos</option>
          <option value="completado">Completados</option>
          <option value="pendiente">Pendientes</option>
        </select>
      </div>

    </div>
  );
}
