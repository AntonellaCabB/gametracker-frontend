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
