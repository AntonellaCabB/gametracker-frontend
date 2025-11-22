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
