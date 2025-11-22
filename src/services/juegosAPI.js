const API_URL = 'http://localhost:5000/api/juegos';

export async function obtenerJuegos() {
  try {
    const res = await fetch(API_URL);
    return await res.json();
  } catch (error) {
    console.error("Error obteniendo juegos", error);
    return [];
  }
}

export async function crearJuego(data) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (error) {
    console.error("Error creando juego", error);
  }
}
