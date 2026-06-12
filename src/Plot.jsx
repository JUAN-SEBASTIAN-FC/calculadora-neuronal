/*
 * Plot.jsx
 * ----------------------------------------------------------------------------
 * Dibuja la gráfica de la función y el paso a paso del método elegido.
 *
 * ¿Cómo se dibuja una función en pantalla?
 *   - El SVG tiene un sistema de coordenadas interno (un "viewBox").
 *   - El plano matemático tiene un rango [xMin, xMax] y [yMin, yMax].
 *   - Para dibujar pasamos de "coordenadas matemáticas" a "coordenadas del
 *     dibujo" con dos funciones:
 *         px(x)  ->  posición horizontal
 *         py(y)  ->  posición vertical  (se invierte porque en pantalla el eje
 *                    Y crece hacia ABAJO)
 *   - Para trazar la curva evaluamos f(x) en muchos puntos seguidos y los
 *     unimos con líneas. Con suficientes puntos parece una curva suave.
 *
 * ZOOM Y DESPLAZAMIENTO (solo diseño, no toca la matemática):
 *   - Guardamos un "zoom" y un "centro" de la vista en el estado.
 *   - Acercar/alejar multiplica el zoom; arrastrar mueve el centro.
 *   - Eso solo cambia QUÉ parte del plano se ve, nunca los cálculos.
 *
 * ANIMACIÓN:
 *   - La curva se "dibuja" sola (efecto de trazo) al cambiar de función.
 *   - Al pasar de una iteración a otra, los elementos del paso (tangente,
 *     intervalo, puntos) aparecen con una pequeña transición, no de golpe.
 * ----------------------------------------------------------------------------
 */
import React, {
  useState, useEffect, useMemo, useRef,
  forwardRef, useImperativeHandle, useCallback,
} from 'react';

const ANCHO = 760;
const ALTO = 460;
const MARGEN = 40; // margen interior para que la curva no toque el borde

/* Escena decorativa original (estado "en espera", sin función todavía). */
function PlotVacio({ on }) {
  const axisY = 286;
  const rootX = 540;
  const dots = [
    { x: 232, r: 5.0, o: 0.22 }, { x: 330, r: 5.4, o: 0.34 },
    { x: 410, r: 5.8, o: 0.50 }, { x: 472, r: 6.2, o: 0.70 },
    { x: 512, r: 6.6, o: 0.88 },
  ];
  return (
    <div className={'plot-scene' + (on ? ' is-on' : '')} aria-hidden="true">
      <svg viewBox="0 0 760 460" preserveAspectRatio="xMidYMid meet" className="plot-svg">
        <defs>
          <linearGradient id="pl-curve-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4D90FF" /><stop offset="0.55" stopColor="#6D5BFF" /><stop offset="1" stopColor="#2BC4EE" />
          </linearGradient>
          <radialGradient id="pl-root-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#8DE6FF" stopOpacity="0.85" /><stop offset="1" stopColor="#2BC4EE" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g className="pl-orbits">
          <circle className="pl-ring" cx={rootX} cy={axisY} r="120" />
          <circle className="pl-ring pl-ring--2" cx={rootX} cy={axisY} r="186" />
          <ellipse className="pl-ring pl-ring--tilt" cx={rootX} cy={axisY} rx="232" ry="96" />
        </g>
        <line className="pl-axis" x1="40" y1={axisY} x2="724" y2={axisY} />
        <line className="pl-axis pl-axis--y" x1="150" y1="56" x2="150" y2="408" />
        <path className="pl-curve" d="M 64 96 C 196 188, 236 392, 348 396 C 432 399, 468 352, 512 300 C 566 236, 632 162, 712 122" />
        <line className="pl-guide" x1={rootX} y1="92" x2={rootX} y2={axisY} />
        <g className="pl-dots">
          {dots.map((d, i) => (
            <circle key={i} className="pl-dot" cx={d.x} cy={axisY} r={d.r} style={{ opacity: d.o, transitionDelay: (220 + i * 90) + 'ms' }} />
          ))}
        </g>
        <circle className="pl-root-halo" cx={rootX} cy={axisY} r="26" fill="url(#pl-root-glow)" />
        <circle className="pl-root" cx={rootX} cy={axisY} r="7.5" />
      </svg>
      <div className="plot-watermark">
        <span className="pw-eyebrow">Lienzo</span>
        <span className="pw-title">Visualiza la convergencia</span>
        <span className="pw-sub">Introduce una función y un método para trazar f(x) paso a paso.</span>
      </div>
    </div>
  );
}

/*
 * Plot usa forwardRef para que App pueda llamar a sus controles de zoom
 * (acercar / alejar / reencuadrar) desde los botones de afuera.
 */
const Plot = forwardRef(function Plot({ theme, method, fn, pasos, pasoActual, fadePast }, ref) {
  const [on, setOn] = useState(false);
  useEffect(() => { const id = requestAnimationFrame(() => setOn(true)); return () => cancelAnimationFrame(id); }, []);

  // --- Estado de la VISTA (solo diseño): cuánto zoom y dónde está el centro ---
  // zoom = 1 es el encuadre automático; >1 acerca, <1 aleja.
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 }); // desplazamiento en píxeles del dibujo
  const svgRef = useRef(null);
  const arrastreRef = useRef(null); // datos del arrastre en curso

  /*
   * Encuadre BASE (sin zoom ni desplazamiento): el rango matemático que se
   * calcula a partir de los pasos. Solo cambia cuando cambian fn/pasos.
   */
  const base = useMemo(() => {
    if (!fn || !pasos || !pasos.length) return null;

    // ----- Rango horizontal -----
    // Reunimos todas las x relevantes: extremos del intervalo, aproximaciones
    // de cada paso, y la raíz final. Así la gráfica siempre encuadra TODO el
    // recorrido del método, no solo una parte.
    let xs = [];
    for (const p of pasos) {
      if (p.a != null) xs.push(p.a);
      if (p.b != null) xs.push(p.b);
      if (p.x != null) xs.push(p.x);
      if (p.xNuevo != null) xs.push(p.xNuevo);
    }
    let xMin = Math.min(...xs);
    let xMax = Math.max(...xs);
    if (xMin === xMax) { xMin -= 2; xMax += 2; } // raíz en un punto: abrimos vista

    // Centro de la zona de interés (donde ocurre el método / la raíz).
    const centro = (xMin + xMax) / 2;

    // Ancho de la zona de interés + un margen lateral generoso.
    let ancho = (xMax - xMin) * (1 + 2 * 0.6); // 60% de margen a cada lado

    // Ancho MÍNIMO: si el método se mueve en una franja diminuta (típico en
    // Newton, donde las x apenas cambian), igual mostramos una ventana amplia
    // para que la curva atraviese el lienzo de lado a lado y no quede una
    // raya corta rodeada de espacio en blanco.
    const ANCHO_MIN = 8;
    if (ancho < ANCHO_MIN) ancho = ANCHO_MIN;

    xMin = centro - ancho / 2;
    xMax = centro + ancho / 2;

    // ----- Curva: evaluamos f(x) en muchos puntos -----
    const N = 400; // más puntos = curva más suave y picos mejor representados
    const puntos = [];
    const ysFinitos = []; // solo valores finitos, para estimar el rango Y robusto
    for (let i = 0; i <= N; i++) {
      const x = xMin + (xMax - xMin) * (i / N);
      const y = fn(x);
      puntos.push({ x, y });
      if (Number.isFinite(y)) ysFinitos.push(y);
    }

    // ----- Rango vertical ROBUSTO -----
    // Problema clásico: con x^2, ln(x), tan(x), 1/x... el min/max absoluto
    // se dispara (un solo valor enorme) y aplasta toda la curva contra el eje,
    // dejando la zona de la raíz invisible. Solución: recortamos los valores
    // extremos usando percentiles (descartamos el 4% más alto y más bajo) para
    // que el encuadre siga la MASA de la curva, no sus picos.
    let yMin, yMax;
    if (ysFinitos.length) {
      const ord = [...ysFinitos].sort((p, q) => p - q);
      const pct = (f) => ord[Math.min(ord.length - 1, Math.max(0, Math.floor(f * (ord.length - 1))))];
      // Recortamos solo un 2% por extremo: suficiente para domar asíntotas
      // (tan, 1/x), pero sin "cortar" curvas suaves que sí queremos ver enteras.
      yMin = pct(0.02);
      yMax = pct(0.98);
    } else {
      yMin = -1; yMax = 1;
    }

    // Garantizamos que el eje X (y = 0) y los f(x) de los pasos sean visibles:
    // ahí es donde está la raíz, lo más importante de la escena.
    yMin = Math.min(yMin, 0);
    yMax = Math.max(yMax, 0);
    for (const p of pasos) {
      if (p.fx != null && Number.isFinite(p.fx)) {
        yMin = Math.min(yMin, p.fx);
        yMax = Math.max(yMax, p.fx);
      }
    }

    if (!Number.isFinite(yMin) || !Number.isFinite(yMax) || yMin === yMax) {
      yMin = (Number.isFinite(yMin) ? yMin : 0) - 1;
      yMax = (Number.isFinite(yMax) ? yMax : 0) + 1;
    }
    const margenY = (yMax - yMin) * 0.12 + 1e-6;
    yMin -= margenY; yMax += margenY;

    // ----- Rellenar el lienzo SIN deformar la curva -----
    // El lienzo es más ancho que alto. Si la curva queda como una banda fina
    // (mucho espacio en blanco arriba/abajo, como pasaba en Newton) expandimos
    // el eje que va "sobrado", PERO con un límite: nunca estiramos tanto que la
    // curva se aplaste en una raya. Para funciones que crecen rápido (x^2, x^3)
    // el rango ya es grande y este ajuste casi no actúa, que es lo correcto.
    const aspectoLienzo = (ANCHO - 2 * MARGEN) / (ALTO - 2 * MARGEN);
    const EXPANSION_MAX = 2.2; // como mucho duplicamos un poco un eje
    const anchoX = xMax - xMin;
    const altoY = yMax - yMin;
    const aspectoDatos = anchoX / altoY;

    if (aspectoDatos > aspectoLienzo) {
      // Sobra alto: la curva es una banda horizontal. Expandimos Y (acotado).
      const factor = Math.min(aspectoDatos / aspectoLienzo, EXPANSION_MAX);
      const cy = (yMin + yMax) / 2;
      yMin = cy - (altoY * factor) / 2;
      yMax = cy + (altoY * factor) / 2;
    } else if (aspectoLienzo / aspectoDatos > 1) {
      // Sobra ancho: expandimos X (acotado) y recalculamos la curva.
      const factor = Math.min(aspectoLienzo / aspectoDatos, EXPANSION_MAX);
      const cx = (xMin + xMax) / 2;
      xMin = cx - (anchoX * factor) / 2;
      xMax = cx + (anchoX * factor) / 2;
      puntos.length = 0;
      for (let i = 0; i <= N; i++) {
        const x = xMin + (xMax - xMin) * (i / N);
        puntos.push({ x, y: fn(x) });
      }
    }

    return { xMin, xMax, yMin, yMax, puntos };
  }, [fn, pasos]);

  // Al cambiar de función reseteamos la vista (zoom y desplazamiento).
  useEffect(() => { setZoom(1); setPan({ x: 0, y: 0 }); }, [base]);

  /*
   * Controles de zoom expuestos a App (botones + / − / reencuadrar).
   * acercar/alejar cambian el zoom; reencuadrar vuelve al encuadre automático.
   */
  const acercar = useCallback(() => setZoom((z) => Math.min(z * 1.25, 12)), []);
  const alejar = useCallback(() => setZoom((z) => Math.max(z / 1.25, 0.25)), []);
  const reencuadrar = useCallback(() => { setZoom(1); setPan({ x: 0, y: 0 }); }, []);
  useImperativeHandle(ref, () => ({ acercar, alejar, reencuadrar }), [acercar, alejar, reencuadrar]);

  // Rueda del mouse para hacer zoom.
  function onWheel(e) {
    if (!base) return;
    e.preventDefault();
    if (e.deltaY < 0) acercar(); else alejar();
  }

  // Arrastrar para desplazar la vista (pan).
  function onPointerDown(e) {
    if (!base) return;
    arrastreRef.current = { startX: e.clientX, startY: e.clientY, pan: { ...pan } };
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function onPointerMove(e) {
    const a = arrastreRef.current;
    if (!a) return;
    // Convertimos el movimiento del mouse (píxeles de pantalla) al sistema
    // del dibujo, usando el ancho real del SVG en pantalla.
    const rect = svgRef.current.getBoundingClientRect();
    const escala = ANCHO / rect.width;
    setPan({
      x: a.pan.x + (e.clientX - a.startX) * escala,
      y: a.pan.y + (e.clientY - a.startY) * escala,
    });
  }
  function onPointerUp(e) {
    arrastreRef.current = null;
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch (_) {}
  }

  /*
   * A partir del encuadre base + zoom + desplazamiento calculamos las
   * funciones px/py finales y el path de la curva.
   */
  const escena = useMemo(() => {
    if (!base) return null;
    const { xMin, xMax, yMin, yMax, puntos } = base;

    // px/py base (zoom = 1, sin pan).
    const px0 = (x) => MARGEN + ((x - xMin) / (xMax - xMin)) * (ANCHO - 2 * MARGEN);
    const py0 = (y) => ALTO - MARGEN - ((y - yMin) / (yMax - yMin)) * (ALTO - 2 * MARGEN);

    // Aplicamos zoom respecto al centro del lienzo y luego el desplazamiento.
    const cx = ANCHO / 2, cy = ALTO / 2;
    const px = (x) => cx + (px0(x) - cx) * zoom + pan.x;
    const py = (y) => cy + (py0(y) - cy) * zoom + pan.y;

    // Path de la curva uniendo los puntos.
    // Cortamos el trazo en dos situaciones:
    //   1) f(x) no es finito (hueco del dominio, ej. ln de negativo).
    //   2) Hay un SALTO enorme entre dos puntos seguidos (asíntota vertical,
    //      como en tan(x) o 1/x). Sin esto se dibujaría una raya vertical falsa
    //      que cruza toda la pantalla. Si el brinco vertical en pantalla supera
    //      varias veces el alto del lienzo, levantamos el lápiz.
    const SALTO_MAX = ALTO * 3; // umbral de salto en píxeles del dibujo
    let d = '';
    let romper = true;
    let Yprev = null;
    for (const p of puntos) {
      if (!Number.isFinite(p.y)) { romper = true; Yprev = null; continue; }
      const X = px(p.x), Y = py(p.y);
      if (!romper && Yprev != null && Math.abs(Y - Yprev) > SALTO_MAX) {
        romper = true; // salto sospechoso (asíntota): cortamos aquí
      }
      d += (romper ? 'M' : 'L') + X.toFixed(1) + ' ' + Y.toFixed(1) + ' ';
      romper = false;
      Yprev = Y;
    }

    return { px, py, d };
  }, [base, zoom, pan]);

  // Sin datos -> escena decorativa.
  if (!escena) return <PlotVacio on={on} />;

  const { px, py, d } = escena;
  const paso = pasos[pasoActual];
  const isBi = method === 'bisection';
  const ejeY0 = py(0);
  const ejeX0 = px(0);

  return (
    <div className={'plot-scene is-on plot-scene--live'} aria-hidden="true">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${ANCHO} ${ALTO}`}
        preserveAspectRatio="xMidYMid meet"
        className="plot-svg plot-svg--interactive"
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <defs>
          <linearGradient id="pl-curve-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4D90FF" /><stop offset="0.55" stopColor="#6D5BFF" /><stop offset="1" stopColor="#2BC4EE" />
          </linearGradient>
          <radialGradient id="pl-root-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#8DE6FF" stopOpacity="0.85" /><stop offset="1" stopColor="#2BC4EE" stopOpacity="0" />
          </radialGradient>
          {/* recorta el dibujo para que nada se salga del lienzo al desplazar */}
          <clipPath id="pl-clip"><rect x="0" y="0" width={ANCHO} height={ALTO} /></clipPath>
        </defs>

        <g clipPath="url(#pl-clip)">
          {/* Ejes: la horizontal y=0 y la vertical x=0 (si caen dentro). */}
          <line className="pl-axis" x1={0} y1={ejeY0} x2={ANCHO} y2={ejeY0} />
          {ejeX0 >= 0 && ejeX0 <= ANCHO && (
            <line className="pl-axis pl-axis--y" x1={ejeX0} y1={0} x2={ejeX0} y2={ALTO} />
          )}

          {/* La curva f(x). 'key' fuerza la animación de trazado al cambiar de función. */}
          <path key={fn} className="pl-curve pl-curve--draw" d={d} />

          {/* Resaltado del paso. 'key={pasoActual}' reinicia la animación en cada paso. */}
          <g key={pasoActual} className="pl-step">
            {isBi
              ? <BiseccionOverlay paso={paso} px={px} py={py} ejeY0={ejeY0} />
              : <NewtonOverlay paso={paso} px={px} py={py} ejeY0={ejeY0} />}
          </g>
        </g>
      </svg>
    </div>
  );
});

/*
 * BiseccionOverlay
 * Dibuja el intervalo [a, b] actual sobre el eje y marca el punto medio c.
 */
function BiseccionOverlay({ paso, px, py, ejeY0 }) {
  const ax = px(paso.a);
  const bx = px(paso.b);
  const cx = px(paso.x);
  const cy = py(paso.fx);
  return (
    <g>
      <line className="pl-interval" x1={ax} y1={ejeY0} x2={bx} y2={ejeY0} />
      <line className="pl-tick" x1={ax} y1={ejeY0 - 10} x2={ax} y2={ejeY0 + 10} />
      <line className="pl-tick" x1={bx} y1={ejeY0 - 10} x2={bx} y2={ejeY0 + 10} />
      <line className="pl-drop" x1={cx} y1={ejeY0} x2={cx} y2={cy} />
      <circle className="pl-root-halo" cx={cx} cy={ejeY0} r="22" fill="url(#pl-root-glow)" />
      <circle className="pl-on-curve" cx={cx} cy={cy} r="5.5" />
      <circle className="pl-root pl-root--pop" cx={cx} cy={ejeY0} r="6.5" />
    </g>
  );
}

/*
 * NewtonOverlay
 * Dibuja el punto (xn, f(xn)) y la recta TANGENTE en ese punto. La tangente
 * cruza el eje x justo en la siguiente aproximación (xNuevo).
 */
function NewtonOverlay({ paso, px, py, ejeY0 }) {
  const xn = px(paso.x);
  const yn = py(paso.fx);
  const xnuevo = px(paso.xNuevo);
  return (
    <g>
      <line className="pl-tangent" x1={xn} y1={yn} x2={xnuevo} y2={ejeY0} />
      <line className="pl-drop" x1={xn} y1={ejeY0} x2={xn} y2={yn} />
      <circle className="pl-on-curve pl-on-curve--newton" cx={xn} cy={yn} r="5.5" />
      <circle className="pl-root-halo" cx={xnuevo} cy={ejeY0} r="22" fill="url(#pl-root-glow)" />
      <circle className="pl-root pl-root--pop" cx={xnuevo} cy={ejeY0} r="6.5" />
    </g>
  );
}

export default Plot;
