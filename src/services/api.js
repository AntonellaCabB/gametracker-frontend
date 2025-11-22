const API_URL = "http://localhost:5000/api";

// JUEGOS
export async function obtenerJuegos() {
  const res = await fetch(`${API_URL}/juegos`);
  return res.json();
}

export async function crearJuego(datos) {
  const res = await fetch(`${API_URL}/juegos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  return res.json();
}

export async function actualizarJuego(id, datos) {
  const res = await fetch(`${API_URL}/juegos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  return res.json();
}

export async function eliminarJuego(id) {
  const res = await fetch(`${API_URL}/juegos/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
// --- RESEÑAS ---
export async function obtenerResenasPorJuego(juegoId) {
  try {
    const res = await fetch(`${API_URL}/resenas/juego/${juegoId}`);
    return await res.json();
  } catch (err) {
    console.error("Error obtenerResenasPorJuego:", err);
    return [];
  }
}

export async function crearResena(datos) {
  try {
    const res = await fetch(`${API_URL}/resenas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    return await res.json();
  } catch (err) {
    console.error("Error crearResena:", err);
    throw err;
  }
}

export async function actualizarResena(id, datos) {
  try {
    const res = await fetch(`${API_URL}/resenas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    return await res.json();
  } catch (err) {
    console.error("Error actualizarResena:", err);
    throw err;
  }
}

export async function eliminarResena(id) {
  try {
    const res = await fetch(`${API_URL}/resenas/${id}`, {
      method: "DELETE",
    });
    return await res.json();
  } catch (err) {
    console.error("Error eliminarResena:", err);
    throw err;
  }
}
