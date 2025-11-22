import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import FormularioJuego from "../components/FormularioJuego";
import TarjetaJuego from "../components/TarjetaJuego";
import {
  obtenerJuegos,
  crearJuego,
  actualizarJuego,
  eliminarJuego
} from "../services/api";

export default function BibliotecaJuegos() {
  const [juegos, setJuegos] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modo, setModo] = useState("crear");
  const [juegoSeleccionado, setJuegoSeleccionado] = useState(null);

  // Cargar juegos de la API
  const cargarJuegos = async () => {
    const datos = await obtenerJuegos();
    setJuegos(datos);
  };

  useEffect(() => {
    cargarJuegos();
  }, []);

  // Abrir modal para crear
  const abrirCrear = () => {
    setModo("crear");
    setJuegoSeleccionado(null);
    setModalAbierto(true);
  };

  // Abrir modal para editar
  const abrirEditar = (juego) => {
    setModo("editar");
    setJuegoSeleccionado(juego);
    setModalAbierto(true);
  };

  // Enviar datos del formulario
  const manejarSubmit = async (formData) => {
    if (modo === "crear") {
      await crearJuego(formData);
    } else {
      await actualizarJuego(juegoSeleccionado._id, formData);
    }

    setModalAbierto(false);
    cargarJuegos();
  };

  // Eliminar juego
  const manejarEliminar = async (id) => {
    await eliminarJuego(id);
    cargarJuegos();
  };

  return (
    <div className="biblioteca">

      <h1>🎮 Mi Biblioteca de Juegos</h1>
      <button onClick={abrirCrear} className="btn-agregar">
        + Agregar Juego
      </button>

      {/* Listado de juegos */}
      <div className="lista-juegos">
        {juegos.map((j) => (
          <TarjetaJuego
            key={j._id}
            juego={j}
            onEditar={() => abrirEditar(j)}
            onEliminar={() => manejarEliminar(j._id)}
          />
        ))}
      </div>

      {/* Modal con formulario */}
      <Modal
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
      >
        <FormularioJuego
          modo={modo}
          juego={juegoSeleccionado}
          onSubmit={manejarSubmit}
          onCancel={() => setModalAbierto(false)}
        />
      </Modal>
    </div>
  );
}
