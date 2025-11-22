import { useState } from "react";
import { crearJuego } from "../services/juegosAPI";

export default function FormularioJuego({ onAdd }) {
  const [titulo, setTitulo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevo = await crearJuego({ titulo });
    if (nuevo && onAdd) onAdd(nuevo);
    setTitulo("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Título del juego"
      />
      <button>Agregar</button>
    </form>
  );
}
