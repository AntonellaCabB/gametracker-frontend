const API_URL = 'http://localhost:5000/api/resenas';

export async function obtenerResenas() {
  try {
    const res = await fetch(API_URL);
    return await res.json();
  } catch (error) {
    console.error("Error obteniendo reseñas", error);
  }
}
