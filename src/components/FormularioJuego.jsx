import React, { useState, useEffect } from "react";
import { uploadImage } from "../utils/uploadImage";

export default function FormularioJuego({ modo, juego, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    titulo: "",
    genero: "",
    plataforma: "",
    añoLanzamiento: "",
    desarrollador: "",
    imagenPortada: "",
    descripcion: "",
    completado: false,
  });

  const [error, setError] = useState("");

  // Cargar datos del juego si estamos editando
  useEffect(() => {
    if (modo === "editar" && juego) {
      setForm(juego);
    }
  }, [modo, juego]);

  // Manejar cambios del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica
    if (
      !form.titulo ||
      !form.genero ||
      !form.plataforma ||
      !form.añoLanzamiento ||
      !form.desarrollador ||
      !form.imagenPortada ||
      !form.descripcion
    ) {
      setError("Todos los campos obligatorios deben llenarse.");
      return;
    }
    console.log("Formulario enviado:", form);
   
    setError("");
    onSubmit(form);
  };

  return (
    <div>
      <h2>{modo === "crear" ? "Agregar Juego" : "Editar Juego"}</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} className="form-juego">

        <label>Título *</label>
        <input
          type="text"
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
        />

        <label>Género *</label>
        <input
          type="text"
          name="genero"
          value={form.genero}
          onChange={handleChange}
        />

        <label>Plataforma *</label>
        <input
          type="text"
          name="plataforma"
          value={form.plataforma}
          onChange={handleChange}
        />

        <label>Año de lanzamiento *</label>
        <input
          type="number"
          name="añoLanzamiento"
          value={form.añoLanzamiento}
          onChange={handleChange}
        />

        <label>Desarrollador *</label>
        <input
          type="text"
          name="desarrollador"
          value={form.desarrollador}
          onChange={handleChange}
        />

        <label>Imagen de portada *</label>
        <input
        type="file"
        accept="image/*"
         onChange={async (e) => {
         const file = e.target.files[0];
         if (!file) return;

         const url = await uploadImage(file);
         setForm({ ...form, imagenPortada: url });

         console.log("URL subida:", url);
       }}
/>

     



        <label>Descripción *</label>
        <textarea
          name="descripcion"
          rows="3"
          value={form.descripcion}
          onChange={handleChange}
        ></textarea>

        <label className="check">
          <input
            type="checkbox"
            name="completado"
            checked={form.completado}
            onChange={handleChange}
          />
          ¿Completado?
        </label>

        <button type="submit" className="btn-submit">
          {modo === "crear" ? "Agregar" : "Guardar Cambios"}
        </button>

        <button type="button" className="btn-cancel" onClick={onCancel}>
          Cancelar
        </button>

      </form>
    </div>
  );
}
