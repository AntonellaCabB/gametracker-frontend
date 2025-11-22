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
import EstadisticasPersonales from "../components/EstadisticasPersonales";
import FiltrosJuegos from "../components/FiltrosJuegos";
import OrdenarJuegos from "../components/OrdenarJuegos";
import ListaResenas from "../components/ListaResenas";


export default function BibliotecaJuegos() {
  const [juegos, setJuegos] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modo, setModo] = useState("crear");
  const [juegoSeleccionado, setJuegoSeleccionado] = useState(null);
  const [modalStatsOpen, setModalStatsOpen] = useState(false);
  const [filtros, setFiltros] = useState({
  busqueda: "",
  genero: "",
  plataforma: "",
  estado: ""
});
  const [orden, setOrden] = useState("");

  // Cargar juegos de la API
  const cargarJuegos = async () => {
    const datos = await obtenerJuegos();
    setJuegos(datos);
  };

  useEffect(() => {
    cargarJuegos();
  }, []);
  const juegosFiltrados = juegos.filter((j) => {
  // FILTRO DE BÚSQUEDA
  const texto = filtros.busqueda.toLowerCase();
  const coincideBusqueda =
    j.titulo.toLowerCase().includes(texto) ||
    j.desarrollador.toLowerCase().includes(texto);

  // FILTRO GÉNERO
  const coincideGenero =
    filtros.genero === "" || j.genero === filtros.genero;

  // FILTRO PLATAFORMA
  const coincidePlataforma =
    filtros.plataforma === "" || j.plataforma === filtros.plataforma;

  // FILTRO ESTADO
  const coincideEstado =
    filtros.estado === "" ||
    (filtros.estado === "completado" && j.completado) ||
    (filtros.estado === "pendiente" && !j.completado);

  
  return (
    coincideBusqueda &&
    coincideGenero &&
    coincidePlataforma &&
    coincideEstado
  );
});
  let juegosOrdenados = [...juegosFiltrados];

if (orden === "az") {
  juegosOrdenados.sort((a, b) => a.titulo.localeCompare(b.titulo));
} else if (orden === "za") {
  juegosOrdenados.sort((a, b) => b.titulo.localeCompare(a.titulo));
} else if (orden === "nuevo") {
  juegosOrdenados.sort((a, b) => b.añoLanzamiento - a.añoLanzamiento);
} else if (orden === "viejo") {
  juegosOrdenados.sort((a, b) => a.añoLanzamiento - b.añoLanzamiento);
}


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
  const generosDisponibles = [...new Set(juegos.map(j => j.genero))];
  const plataformasDisponibles = [...new Set(juegos.map(j => j.plataforma))];

  const [modalResenasOpen, setModalResenasOpen] = useState(false);
  const [juegoParaResenas, setJuegoParaResenas] = useState(null);

  const abrirResenas = (juego) => {
  setJuegoParaResenas(juego);
  setModalResenasOpen(true);
};


  return (
    <div className="biblioteca">

      <h1>🎮 Mi Biblioteca de Juegos</h1>
      <button onClick={abrirCrear} className="btn-agregar">
        + Agregar Juego
      </button>

      <button
       onClick={() => setModalStatsOpen(true)}
       style={{ marginLeft: 8 }}
       className="btn-estadisticas"
 >
       📊 Ver estadísticas
      </button>

      <OrdenarJuegos orden={orden} onChange={setOrden} />
      {/* Listado de juegos */}
      <FiltrosJuegos
      filtros={filtros}
      onChange={setFiltros}
      generosDisponibles={generosDisponibles}
      plataformasDisponibles={plataformasDisponibles}
/>

      <div className="contenedor-biblioteca">
  {juegosOrdenados.map(j => (
    <TarjetaJuego
      key={j._id}
      juego={j}
      onEditar={() => abrirEditar(j)}
      onEliminar={() => manejarEliminar(j._id)}
      onVerResenas={() => abrirResenas(j)}
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
      <Modal isOpen={modalStatsOpen} onClose={() => setModalStatsOpen(false)}>
      <EstadisticasPersonales onClose={() => setModalStatsOpen(false)} />
      </Modal>

      <Modal
  isOpen={modalResenasOpen}
  onClose={() => setModalResenasOpen(false)}
>
  {juegoParaResenas && (
    <ListaResenas
      juego={juegoParaResenas}
      onClose={() => setModalResenasOpen(false)}
    />
  )}
</Modal>

    </div>
  );
}
