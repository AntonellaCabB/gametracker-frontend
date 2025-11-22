import React, { useEffect, useState } from "react";
import { obtenerResenasPorJuego, crearResena, actualizarResena, eliminarResena } from "../services/api";
import TarjetaResena from "./TarjetaResena";
import FormularioResena from "./FormularioResena";
import OrdenarResenas from "./OrdenarResenas";

export default function ListaResenas({ juego, onClose }) {
  const [orden, setOrden] = useState("");
  const [resenas, setResenas] = useState([]);
  const [modoForm, setModoForm] = useState(null); // 'crear' | 'editar' | null
  const [resenaSeleccionada, setResenaSeleccionada] = useState(null);
  const [cargando, setCargando] = useState(false);

  const cargar = async () => {
    setCargando(true);
    const datos = await obtenerResenasPorJuego(juego._id);
    setResenas(datos || []);
    setCargando(false);
  };

  useEffect(() => {
    if (juego?._id) cargar();
  }, [juego?._id]);

  const abrirCrear = () => {
    setModoForm("crear");
    setResenaSeleccionada(null);
  };

  const abrirEditar = (r) => {
    setModoForm("editar");
    setResenaSeleccionada(r);
  };

  const handleCrear = async (payload) => {
    await crearResena(payload);
    setModoForm(null);
    await cargar();
  };

  const handleActualizar = async (payload) => {
    await actualizarResena(resenaSeleccionada._id, payload);
    setModoForm(null);
    await cargar();
  };

  const handleEliminar = async (id) => {
    if (!confirm("¿Eliminar reseña? Esta acción no se puede deshacer.")) return;
    await eliminarResena(id);
    await cargar();
  };

  // ---------------------------
  // ORDENAMIENTO
  // ---------------------------
  let resenasOrdenadas = [...resenas];

  if (orden === "recientes") {
    resenasOrdenadas.sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion));
  } else if (orden === "antiguas") {
    resenasOrdenadas.sort((a, b) => new Date(a.fechaCreacion) - new Date(b.fechaCreacion));
  } else if (orden === "puntuacionAlta") {
    resenasOrdenadas.sort((a, b) => b.puntuacion - a.puntuacion);
  } else if (orden === "puntuacionBaja") {
    resenasOrdenadas.sort((a, b) => a.puntuacion - b.puntuacion);
  } else if (orden === "horasMas") {
    resenasOrdenadas.sort((a, b) => b.horasJugadas - a.horasJugadas);
  } else if (orden === "horasMenos") {
    resenasOrdenadas.sort((a, b) => a.horasJugadas - b.horasJugadas);
  }

  // ---------------------------
  // RETURN PRINCIPAL
  // ---------------------------
  return (
    <div style={{ padding: 20 }}>
      <h2>Reseñas de {juego.titulo}</h2>

      <button onClick={abrirCrear} className="btn-primary" style={{ marginBottom: 12 }}>
        + Agregar reseña
      </button>

      <button onClick={onClose} className="btn-secondary" style={{ marginLeft: 10 }}>
        Cerrar
      </button>

      <OrdenarResenas orden={orden} onChange={setOrden} />

      {cargando && <p>Cargando reseñas...</p>}

      {/* FORMULARIO */}
      {modoForm && (
        <FormularioResena
          modo={modoForm}
          resena={resenaSeleccionada}
          juegoId={juego._id}
          onSubmit={modoForm === "crear" ? handleCrear : handleActualizar}
          onCancel={() => setModoForm(null)}
        />
      )}

      {/* LISTA DE RESEÑAS */}
      <div className="lista-resenas">
        {resenasOrdenadas.length === 0 ? (
          <p>No hay reseñas todavía.</p>
        ) : (
          resenasOrdenadas.map((r) => (
            <TarjetaResena
              key={r._id}
              resena={r}
              onEditar={() => abrirEditar(r)}
              onEliminar={() => handleEliminar(r._id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
