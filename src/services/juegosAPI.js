import { API_URL } from "./api";

export async function obtenerJuegos() {
  try {
    const res = await fetch(`${API_URL}/juegos`);
    return await res.json();
  } catch (error) {
    console.error("Error obteniendo juegos", error);
    return [];
  }
}
export async function crearJuego(data) {
  try {
    const res = await fetch(`${API_URL}/juegos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    console.error("Error creando juego", error);
  }
}
