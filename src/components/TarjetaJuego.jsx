export default function TarjetaJuego({ juego }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 10, width: 220 }}>
      <img
        src={juego.imagen || "https://via.placeholder.com/200"}
        style={{ width: "100%" }}
      />
      <h3>{juego.titulo}</h3>
      <p>Género: {juego.genero}</p>
      <p>Rating: {juego.rating}</p>
    </div>
  );
}
