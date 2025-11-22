import { useEffect, useState } from "react";
import { obtenerJuegos } from "../services/juegosAPI";

export default function BibliotecaJuegos() {
  const [juegos, setJuegos] = useState([]);

  useEffect(() => {
    obtenerJuegos().then(setJuegos);
  }, []);

  return (
    <div>
      <h2>Mi Biblioteca</h2>
      <pre>{JSON.stringify(juegos, null, 2)}</pre>
    </div>
  );
}
import TarjetaJuego from "../components/TarjetaJuego";
// ...
return (
  <div>
    <h2>Mi Biblioteca</h2>
    <div style={{ display: "flex", gap: 15, flexWrap: "wrap" }}>
      {juegos.map(j => (
        <TarjetaJuego key={j._id} juego={j} />
      ))}
    </div>
  </div>
);
import FormularioJuego from "../components/FormularioJuego";

<FormularioJuego
  onAdd={(nuevo) => setJuegos([nuevo, ...juegos])}
/>
