import React, { useState, useEffect } from "react";

const dificultadOpciones = ["Fácil", "Normal", "Difícil"];

export default function FormularioResena({ modo, resena, juegoId, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    puntuacion: 5,
    textoReseña: "",
    horasJugadas: 0,
    dificultad: "Normal",
    recomendaria: true,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (modo === "editar" && resena) {
      setForm({
        puntuacion: resena.puntuacion || 5,
        textoReseña: resena.textoReseña || "",
        horasJugadas: resena.horasJugadas || 0,
        dificultad: resena.dificultad || "Normal",
        recomendaria: !!resena.recomendaria,
      });
    } else if (modo === "crear") {
      setForm({
        puntuacion: 5,
        textoReseña: "",
        horasJugadas: 0,
        dificultad: "Normal",
        recomendaria: true,
      });
    }
  }, [modo, resena]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : (type === "number" ? Number(value) : value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones mínimas
    if (!form.textoReseña || form.puntuacion < 1 || form.puntuacion > 5) {
      setError("Revisa la puntuación (1-5) y que la reseña no esté vacía.");
      return;
    }

    setError("");
    const payload = {
      juegoId,
      puntuacion: form.puntuacion,
      textoReseña: form.textoReseña,
      horasJugadas: form.horasJugadas,
      dificultad: form.dificultad,
      recomendaria: form.recomendaria
    };

    onSubmit(payload);
  };

  return (
    <div>
      <h3>{modo === "crear" ? "Agregar reseña" : "Editar reseña"}</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} className="form-resena">
        <label>Puntuación (1-5)</label>
        <input type="number" name="puntuacion" min="1" max="5" value={form.puntuacion} onChange={handleChange} />

        <label>Texto de la reseña</label>
        <textarea name="textoReseña" rows="4" value={form.textoReseña} onChange={handleChange}></textarea>

        <label>Horas jugadas</label>
        <input type="number" name="horasJugadas" min="0" value={form.horasJugadas} onChange={handleChange} />

        <label>Dificultad</label>
        <select name="dificultad" value={form.dificultad} onChange={handleChange}>
          {dificultadOpciones.map(d => <option key={d} value={d}>{d}</option>)}
        </select>

        <label>
          <input type="checkbox" name="recomendaria" checked={form.recomendaria} onChange={handleChange} />
          Recomendaría este juego
        </label>

        <div style={{ display:"flex", gap:8, marginTop:10 }}>
          <button type="submit">{modo === "crear" ? "Agregar reseña" : "Guardar cambios"}</button>
          <button type="button" onClick={onCancel} style={{ background:"#e74c3c", color:"#fff" }}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
