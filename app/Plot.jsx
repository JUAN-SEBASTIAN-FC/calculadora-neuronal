/* Convergencia — Plot decorativo (limpio, no funcional).
   Reemplaza el antiguo render con canvas. Dibuja una escena vectorial bonita:
   una curva f(x) que cruza el eje, una fila de puntos de iteración que se
   desvanecen acercándose a una raíz que brilla, anillos de órbita y guías.
   Se re-tematiza solo vía variables CSS (clases .pl-*). Babel JSX → window.Plot. */

function Plot({ theme }) {
  // gentle staggered draw-in once mounted
  const [on, setOn] = React.useState(false);
  React.useEffect(() => { const id = requestAnimationFrame(() => setOn(true)); return () => cancelAnimationFrame(id); }, []);

  // convergence dots marching toward the glowing root at (markX) on the axis
  const axisY = 286;
  const rootX = 540;
  const dots = [
    { x: 232, r: 5.0, o: 0.22 },
    { x: 330, r: 5.4, o: 0.34 },
    { x: 410, r: 5.8, o: 0.50 },
    { x: 472, r: 6.2, o: 0.70 },
    { x: 512, r: 6.6, o: 0.88 },
  ];

  return (
    <div className={'plot-scene' + (on ? ' is-on' : '')} aria-hidden="true">
      <svg viewBox="0 0 760 460" preserveAspectRatio="xMidYMid meet" className="plot-svg">
        <defs>
          <linearGradient id="pl-curve-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4D90FF" />
            <stop offset="0.55" stopColor="#6D5BFF" />
            <stop offset="1" stopColor="#2BC4EE" />
          </linearGradient>
          <radialGradient id="pl-root-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#8DE6FF" stopOpacity="0.85" />
            <stop offset="1" stopColor="#2BC4EE" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* faint orbit rings — the brand motif, slowly drifting */}
        <g className="pl-orbits">
          <circle className="pl-ring" cx={rootX} cy={axisY} r="120" />
          <circle className="pl-ring pl-ring--2" cx={rootX} cy={axisY} r="186" />
          <ellipse className="pl-ring pl-ring--tilt" cx={rootX} cy={axisY} rx="232" ry="96" />
        </g>

        {/* axes */}
        <line className="pl-axis" x1="40" y1={axisY} x2="724" y2={axisY} />
        <line className="pl-axis pl-axis--y" x1="150" y1="56" x2="150" y2="408" />

        {/* the curve f(x), crossing the axis at the root */}
        <path
          className="pl-curve"
          d="M 64 96 C 196 188, 236 392, 348 396 C 432 399, 468 352, 512 300 C 566 236, 632 162, 712 122"
        />

        {/* vertical guide to the root */}
        <line className="pl-guide" x1={rootX} y1="92" x2={rootX} y2={axisY} />

        {/* fading iteration dots approaching the root */}
        <g className="pl-dots">
          {dots.map((d, i) => (
            <circle key={i} className="pl-dot" cx={d.x} cy={axisY} r={d.r} style={{ opacity: d.o, transitionDelay: (220 + i * 90) + 'ms' }} />
          ))}
        </g>

        {/* the converged root, glowing */}
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

window.Plot = Plot;
