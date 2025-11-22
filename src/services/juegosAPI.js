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
git 