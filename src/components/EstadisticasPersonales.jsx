import React, { useEffect, useState } from "react";
import { obtenerJuegos, obtenerResenasPorJuego } from "../services/api";

/**
 * EstadisticasPersonales
 * - Calcula: total juegos, completados, horas totales (sum reseñas), promedio puntuación.
 * - Muestra también un top 3 de juegos por horas (si hay suficientes datos).
 *
 * Props:
 *  - onClose: función para cerrar el modal
 */
export default function EstadisticasPersonales({ onClose }) {
  const [cargando, setCargando] = useState(true);
  const [stats, setStats] = useState({
    totalJuegos: 0,
    completados: 0,
    horasTotales: 0,
    promedioPuntuacion: 0,
    topPorHoras: []
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      setCargando(true);
      try {
        const juegos = await obtenerJuegos();

        // estadísticas básicas
        const totalJuegos = juegos.length;
        const completados = juegos.filter(j => j.completado).length;

        // Para horas y promedio de puntuación: recorrer reseñas por cada juego
        let horasTotales = 0;
        let sumaPuntuaciones = 0;
        let contadorPuntuaciones = 0;
        const horasPorJuego = [];

        // Obtener reseñas por juego en serie (mejor hacerlo en paralelo, pero cuidado con demasiadas peticiones)
        const promesas = juegos.map(j => obtenerResenasPorJuego(j._id).then(resenas => ({ juego: j, resenas })));
        const resultados = await Promise.all(promesas);

        for (const r of resultados) {
          const resenas = Array.isArray(r.resenas) ? r.resenas : r.resenas || [];
          // sumar horas
          const horasJuego = resenas.reduce((acc, re) => acc + (Number(re.horasJugadas) || 0), 0);
          horasTotales += horasJuego;
          horasPorJuego.push({ titulo: r.juego.titulo, horas: horasJuego });

          // puntuaciones:
          for (const re of resenas) {
            if (typeof re.puntuacion === "number") {
              sumaPuntuaciones += re.puntuacion;
              contadorPuntuaciones += 1;
            }
          }
        }

        const promedioPuntuacion = contadorPuntuaciones ? (sumaPuntuaciones / contadorPuntuaciones) : 0;

        // top 3 juegos por horas jugadas
        horasPorJuego.sort((a, b) => b.horas - a.horas);
        const topPorHoras = horasPorJuego.slice(0, 3);

        setStats({
          totalJuegos,
          completados,
          horasTotales,
          promedioPuntuacion: Number(promedioPuntuacion.toFixed(2)),
          topPorHoras
        });
        setCargando(false);
      } catch (err) {
        console.error("Error cargando estadísticas:", err);
        setError("No se pudieron cargar las estadísticas. Revisa la consola del navegador.");
        setCargando(false);
      }
    };

    cargar();
  }, []);

  if (cargando) return <div style={{ padding: 20 }}>Cargando estadísticas...</div>;
  if (error) return <div style={{ padding: 20, color: "red" }}>{error}</div>;

  return (
    <div style={{ maxWidth: 700 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Mis estadísticas</h2>
        <div>
          <button onClick={onClose} style={{ marginLeft: 8 }}>Cerrar</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 12, marginTop: 12 }}>
        <div style={{ padding: 12, border: "1px solid #e0e0e0", borderRadius: 8 }}>
          <h3>{stats.totalJuegos}</h3>
          <p>Total de juegos</p>
        </div>

        <div style={{ padding: 12, border: "1px solid #e0e0e0", borderRadius: 8 }}>
          <h3>{stats.completados}</h3>
          <p>Completados</p>
        </div>

        <div style={{ padding: 12, border: "1px solid #e0e0e0", borderRadius: 8 }}>
          <h3>{stats.horasTotales}</h3>
          <p>Horas jugadas (sumadas desde reseñas)</p>
        </div>

        <div style={{ padding: 12, border: "1px solid #e0e0e0", borderRadius: 8 }}>
          <h3>{stats.promedioPuntuacion}</h3>
          <p>Promedio de puntuación (reseñas)</p>
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        <h3>Top juegos por horas jugadas</h3>
        {stats.topPorHoras.length === 0 ? (
          <p>No hay datos de horas aún.</p>
        ) : (
          <ol>
            {stats.topPorHoras.map((t, i) => (
              <li key={i}>{t.titulo} — {t.horas} horas</li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
