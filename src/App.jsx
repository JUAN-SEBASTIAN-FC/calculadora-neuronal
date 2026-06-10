/* Convergencia — composición principal. */
import React, { useState, useEffect, useRef } from 'react';
import { createIcons, icons } from 'lucide';
import Plot from './Plot';
import { Button, IconButton, Badge, Input, NumberField, Tabs, Switch, Slider, Tooltip, IterationTable, Alert } from './components';
import { compilarFuncion, biseccion, newton } from './math/index.js';

/* ---------- Fondo decorativo: órbitas, lunas, líneas, partículas ---------- */
function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <div className="bd-aura bd-aura--1"></div>
      <div className="bd-aura bd-aura--2"></div>
      <div className="bd-aura bd-aura--3"></div>
      <div className="bd-grid"></div>
      <svg className="bd-orbits" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="bd-orbit-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2D7FF9" />
            <stop offset="0.5" stopColor="#6D5BFF" />
            <stop offset="1" stopColor="#12A6D6" />
          </linearGradient>
        </defs>
        <g className="bd-orbit bd-orbit--a">
          <circle cx="1180" cy="180" r="150" />
          <circle cx="1180" cy="180" r="250" />
          <circle className="bd-orbit-dot" cx="1330" cy="180" r="6" />
        </g>
        <g className="bd-orbit bd-orbit--b">
          <ellipse cx="190" cy="720" rx="300" ry="150" />
          <circle className="bd-orbit-dot bd-orbit-dot--cyan" cx="490" cy="720" r="5" />
        </g>
      </svg>
      <div className="bd-moon bd-moon--1"></div>
      <div className="bd-moon bd-moon--2"></div>
      <div className="bd-moon bd-moon--3"></div>
      <div className="bd-spark bd-spark--1"></div>
      <div className="bd-spark bd-spark--2"></div>
      <div className="bd-spark bd-spark--3"></div>
      <div className="bd-spark bd-spark--4"></div>
      <div className="bd-spark bd-spark--5"></div>
    </div>
  );
}

/*
 * App
 * ----------------------------------------------------------------------------
 * FLUJO DE DATOS (de principio a fin):
 *
 *   1. El usuario escribe la función f(x) y los parámetros (a, b, x0,
 *      tolerancia, iteraciones) en el panel de la izquierda. Eso vive en
 *      "estados" de React (useState) — cada caja de texto guarda su valor.
 *
 *   2. Al pulsar "Calcular" se ejecuta calcular():
 *        - compilarFuncion(texto)  convierte el texto en una f(x) real.
 *        - biseccion(...) o newton(...) ejecutan el método y devuelven una
 *          lista de "pasos" (cada iteración con su x, f(x) y errores).
 *
 *   3. Esa lista de pasos se guarda en el estado "resultado". Con ella:
 *        - La TABLA de la derecha muestra todas las iteraciones.
 *        - El TRANSPORTE (botones ◀ ▶) deja avanzar/retroceder de paso en
 *          paso; "pasoActual" recuerda en cuál estamos.
 *        - La GRÁFICA recibe la función, los pasos y el paso actual para
 *          dibujarse y moverse según la iteración seleccionada.
 *
 *   En resumen:  texto -> f(x) -> método -> pasos -> tabla + transporte + gráfica.
 * ----------------------------------------------------------------------------
 */
function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('cvg-theme') || 'light');
  const [method, setMethod] = useState('bisection');
  const [fnInput, setFnInput] = useState('');
  const [showGrid, setShowGrid] = useState(true);
  const [fadePast, setFadePast] = useState(true);
  const [speed, setSpeed] = useState(1.5);

  // --- Parámetros que escribe el usuario (como texto, para validarlos luego) ---
  const [aVal, setAVal] = useState('');        // extremo izquierdo (bisección)
  const [bVal, setBVal] = useState('');        // extremo derecho (bisección)
  const [x0Val, setX0Val] = useState('');      // valor inicial (newton)
  const [maxIter, setMaxIter] = useState('50');
  const [tol, setTol] = useState('1e-6');

  // --- Resultado del cálculo y navegación entre iteraciones ---
  const [resultado, setResultado] = useState(null); // { pasos, raiz, convergio, mensaje, fn }
  const [pasoActual, setPasoActual] = useState(0);   // índice del paso visible
  const [error, setError] = useState('');            // mensaje de error de entrada
  const [reproduciendo, setReproduciendo] = useState(false);
  const plotRef = useRef(null);                      // controles de zoom de la gráfica

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('cvg-theme', theme);
  }, [theme]);

  useEffect(() => {
    createIcons({
      icons,
      nameAttr: 'data-lucide'
    });
  });

  const isBi = method === 'bisection';

  // Si cambia el método, limpiamos el resultado para no mezclar datos.
  useEffect(() => {
    setResultado(null);
    setPasoActual(0);
    setError('');
    setReproduciendo(false);
  }, [method]);

  /*
   * calcular()
   * Se llama al pulsar "Calcular". Valida la entrada, ejecuta el método
   * elegido y guarda los pasos. Cualquier error de entrada se muestra arriba.
   */
  function calcular() {
    setError('');
    setReproduciendo(false);

    // 1) Convertir el texto en una función real.
    let f;
    try {
      f = compilarFuncion(fnInput);
    } catch (e) {
      setError(e.message);
      setResultado(null);
      return;
    }

    // 2) Leer parámetros numéricos comunes.
    const tolNum = parseFloat(tol);
    const iterNum = parseInt(maxIter, 10);
    if (!(tolNum > 0)) { setError('La tolerancia debe ser un número positivo (ej. 1e-6).'); return; }
    if (!(iterNum >= 1)) { setError('El máximo de iteraciones debe ser al menos 1.'); return; }

    // 3) Ejecutar el método correspondiente.
    let res;
    if (isBi) {
      const a = parseFloat(aVal);
      const b = parseFloat(bVal);
      if (Number.isNaN(a) || Number.isNaN(b)) { setError('Escribe valores numéricos para a y b.'); return; }
      if (a >= b) { setError('El extremo a debe ser menor que b.'); return; }
      res = biseccion(f, a, b, tolNum, iterNum);
    } else {
      const x0 = parseFloat(x0Val);
      if (Number.isNaN(x0)) { setError('Escribe un valor numérico para x₀.'); return; }
      res = newton(f, x0, tolNum, iterNum);
    }

    // 4) Si el método no pudo arrancar (ej. sin cambio de signo), avisamos.
    if (!res.pasos.length) {
      setError(res.mensaje);
      setResultado(null);
      return;
    }

    // 5) Guardar resultado y posicionarnos en el primer paso.
    setResultado({ ...res, fn: f });
    setPasoActual(0);
  }

  /* reiniciar() — borra el resultado y vuelve al estado inicial. */
  function reiniciar() {
    setResultado(null);
    setPasoActual(0);
    setError('');
    setReproduciendo(false);
  }

  // --- Navegación entre iteraciones (transporte) ---
  const totalPasos = resultado ? resultado.pasos.length : 0;
  const irInicio = () => setPasoActual(0);
  const irFinal = () => setPasoActual(Math.max(0, totalPasos - 1));
  const anterior = () => setPasoActual((p) => Math.max(0, p - 1));
  const siguiente = () => setPasoActual((p) => Math.min(totalPasos - 1, p + 1));

  /*
   * Reproducción automática: avanza un paso cada cierto tiempo según la
   * velocidad elegida. Se detiene al llegar al final. Usamos setTimeout
   * encadenado (un paso, esperar, siguiente) para que sea fluido y respete
   * el tiempo entre pasos sin saltos.
   */
  useEffect(() => {
    if (!reproduciendo) return;
    // Si pulsamos play estando al final, reiniciamos desde el principio.
    if (pasoActual >= totalPasos - 1) { setPasoActual(0); return; }
    const espera = 900 / speed; // ms entre pasos (más velocidad = menos espera)
    const id = setTimeout(() => {
      setPasoActual((p) => {
        if (p >= totalPasos - 1) { setReproduciendo(false); return p; }
        return p + 1;
      });
    }, espera);
    return () => clearTimeout(id);
  }, [reproduciendo, speed, totalPasos, pasoActual]);

  // Navegación con teclado: ← → para moverse, espacio para reproducir.
  useEffect(() => {
    function onKey(e) {
      if (!resultado) return;
      if (e.key === 'ArrowLeft') anterior();
      else if (e.key === 'ArrowRight') siguiente();
      else if (e.key === ' ') { e.preventDefault(); setReproduciendo((r) => !r); }
      else if (e.key === 'Home') irInicio();
      else if (e.key === 'End') irFinal();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [resultado, totalPasos]);

  // Datos del paso visible (para las mini-estadísticas del lienzo).
  const paso = resultado ? resultado.pasos[pasoActual] : null;
  const progreso = totalPasos > 1 ? (pasoActual / (totalPasos - 1)) * 100 : 0;

  // Formato corto para mostrar números en las mini-estadísticas.
  const fmt = (v, d = 6) => (v == null || Number.isNaN(v)) ? '—' : v.toFixed(d);

  return (
    <div className="app">
      <Backdrop />

      <header className="topbar">
        <div className="brand">
          <span className="brand-logo">
            <img src={theme === 'dark' ? '/assets/logo-dark-theme.png' : '/assets/logo-light-theme.png'} alt="" />
          </span>
          <span className="name">Conver<b>ge</b></span>
          <span className="brand-tag">Métodos numéricos</span>
        </div>

        <span className="eq"><span className="eq-k">f(x)</span> = <b>{fnInput || '—'}</b></span>

        <div className="spacer"></div>

        <Badge className="badge-method" color={isBi ? 'blue' : 'amber'} dot>
          {isBi ? 'Bisección' : 'Newton–Raphson'}
        </Badge>
        <span className="vrule"></span>
        <button className="theme-toggle" data-on={theme} onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')} aria-label="Cambiar tema">
          <span className="t-knob"></span>
          <span className={'t-opt' + (theme === 'light' ? ' on' : '')}><i data-lucide="sun"></i></span>
          <span className={'t-opt' + (theme === 'dark' ? ' on' : '')}><i data-lucide="moon"></i></span>
        </button>
      </header>

      <div className="main">
        {/* ---- Config rail ---- */}
        <aside className="rail scroll-thin">
          <div className="section">
            <span className="eyebrow">Método</span>
            <Tabs block value={method} onChange={setMethod}
              tabs={[
                { value: 'bisection', label: 'Bisección', icon: 'git-fork', accent: 'bisection' },
                { value: 'newton', label: 'Newton', icon: 'spline', accent: 'newton' },
              ]} />
          </div>

          <div className="section">
            <span className="eyebrow">Función</span>
            <Input monoLabel label="f(x)" prefix="f(x) =" value={fnInput} placeholder="ej. x^3 - x - 2"
              onChange={(e) => setFnInput(e.target.value)}
              hint="Usa x, +−*/^, sin, cos, exp, ln, sqrt…" />
          </div>

          <div className="section">
            <span className="eyebrow">Parámetros</span>
            <div className="param-swap">
              {isBi ? (
                <div className="params-col" key="bi">
                  <NumberField label="a (extremo izquierdo)" placeholder="0" step={0.5} value={aVal} onChange={(e) => setAVal(e.target.value)} />
                  <NumberField label="b (extremo derecho)" placeholder="0" step={0.5} value={bVal} onChange={(e) => setBVal(e.target.value)} />
                  <NumberField label="Máx. iteraciones" placeholder="50" min={1} step={1} value={maxIter} onChange={(e) => setMaxIter(e.target.value)} />
                  <Input label="Tolerancia" placeholder="1e-6" value={tol} onChange={(e) => setTol(e.target.value)} />
                </div>
              ) : (
                <div className="params-col" key="nw">
                  <NumberField label="Valor inicial (x₀)" placeholder="0" step={0.1} value={x0Val} onChange={(e) => setX0Val(e.target.value)} />
                  <NumberField label="Máx. iteraciones" placeholder="50" min={1} step={1} value={maxIter} onChange={(e) => setMaxIter(e.target.value)} />
                  <Input label="Tolerancia" placeholder="1e-6" value={tol} onChange={(e) => setTol(e.target.value)} />
                </div>
              )}
            </div>
          </div>

          {error && (
            <Alert variant="danger" title="Revisa la entrada">{error}</Alert>
          )}

          <div className="run-row">
            <Button variant="primary" icon="play" onClick={calcular}>Calcular</Button>
            <Button variant="secondary" icon="rotate-ccw" onClick={reiniciar}>Reiniciar</Button>
          </div>

          <div className="section">
            <span className="eyebrow">Visualización</span>
            <Switch checked={showGrid} onChange={(e) => setShowGrid(e.target.checked)} label="Mostrar cuadrícula" />
            <Switch checked={fadePast} onChange={(e) => setFadePast(e.target.checked)} label="Atenuar pasos previos" />
          </div>
        </aside>

        {/* ---- Canvas stage ---- */}
        <main className="stage">
          <div className="canvas-card">
            <div className="canvas-head">
              <span className="ch-title"><i data-lucide="line-chart"></i> Lienzo</span>
              <div className="ch-stats">
                <span className="ministat"><span className="ms-k">Iteración</span><span className="ms-v">{paso ? paso.n : '—'}</span></span>
                <span className="ministat"><span className="ms-k">{isBi ? 'c' : 'xₙ'}</span><span className="ms-v">{paso ? fmt(paso.x) : '—'}</span></span>
                <span className="ministat"><span className="ms-k">f(x)</span><span className="ms-v">{paso ? fmt(paso.fx) : '—'}</span></span>
                <span className="ministat"><span className="ms-k">error</span><span className="ms-v">{paso && paso.relError != null ? paso.relError.toExponential(2) : '—'}</span></span>
              </div>
              <div className="spacer"></div>
              <Badge color={resultado ? (resultado.convergio ? 'blue' : 'amber') : 'cyan'} dot>
                {resultado ? (resultado.convergio ? 'Convergió' : 'Máx. iteraciones') : 'En espera'}
              </Badge>
            </div>

            <div className="plot-wrap" data-grid={showGrid ? 'on' : 'off'}>
              <Plot
                ref={plotRef}
                theme={theme}
                method={method}
                fn={resultado ? resultado.fn : null}
                pasos={resultado ? resultado.pasos : null}
                pasoActual={pasoActual}
                fadePast={fadePast}
              />
              <div className="plot-tools">
                <Tooltip content="Acercar"><IconButton icon="plus" label="Acercar" onClick={() => plotRef.current && plotRef.current.acercar()} disabled={!resultado} /></Tooltip>
                <Tooltip content="Alejar"><IconButton icon="minus" label="Alejar" onClick={() => plotRef.current && plotRef.current.alejar()} disabled={!resultado} /></Tooltip>
                <Tooltip content="Reencuadrar"><IconButton icon="maximize" label="Reencuadrar" onClick={() => plotRef.current && plotRef.current.reencuadrar()} disabled={!resultado} /></Tooltip>
              </div>
              <span className="plot-hint"><b>arrastra</b> para mover · <b>rueda</b> para zoom</span>
            </div>
          </div>

          {/* Transport */}
          <div className="transport">
            <div className="group">
              <Tooltip content="Reiniciar" shortcut="Home"><IconButton icon="skip-back" variant="solid" label="Reiniciar" onClick={irInicio} disabled={!resultado} /></Tooltip>
              <Tooltip content="Paso anterior" shortcut="←"><IconButton icon="chevron-left" variant="solid" label="Anterior" onClick={anterior} disabled={!resultado} /></Tooltip>
              <Tooltip content="Reproducir" shortcut="Espacio"><IconButton icon={reproduciendo ? 'pause' : 'play'} variant="primary" size="lg" label="Reproducir" onClick={() => setReproduciendo((r) => !r)} disabled={!resultado} /></Tooltip>
              <Tooltip content="Avanzar paso" shortcut="→"><IconButton icon="chevron-right" variant="solid" label="Siguiente" onClick={siguiente} disabled={!resultado} /></Tooltip>
              <Tooltip content="Ir al final" shortcut="End"><IconButton icon="skip-forward" variant="solid" label="Final" onClick={irFinal} disabled={!resultado} /></Tooltip>
            </div>
            <div className="progress">
              <div className="progress-track"><div className="progress-fill" style={{ width: progreso + '%' }}></div></div>
              <span className="count">{totalPasos ? (pasoActual + 1) : 0} / {totalPasos}</span>
            </div>
            <div className="speed">
              <Slider label="Velocidad" value={speed} min={0.5} max={4} step={0.5} onChange={(e) => setSpeed(+e.target.value)} format={(v) => `${v}×`} />
            </div>
          </div>
        </main>

        {/* ---- Iteration table ---- */}
        <aside className="tablecol">
          <div className="thead">
            <h3>Iteraciones</h3>
            <Badge color="neutral" mono>{totalPasos} pasos</Badge>
          </div>
          <div className="tscroll scroll-thin">
            {resultado ? (
              <IterationTable
                rows={resultado.pasos}
                activeIndex={pasoActual}
                onSelect={setPasoActual}
                decimals={8}
              />
            ) : (
              <>
                <table className="cvg-itertable cvg-itertable--ghost">
                  <thead>
                    <tr><th>n</th><th>xₙ</th><th>f(xₙ)</th><th>err. abs.</th><th>err. rel.</th></tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 7 }).map((_, i) => (
                      <tr key={i}><td>{i + 1}</td><td>—</td><td>—</td><td>—</td><td>—</td></tr>
                    ))}
                  </tbody>
                </table>
                <div className="empty">
                  <span className="empty-icon"><i data-lucide="table-2"></i></span>
                  <span className="empty-title">Aún no hay iteraciones</span>
                  <span className="empty-sub">Pulsa <b>Calcular</b> para generar la secuencia de pasos.</span>
                </div>
              </>
            )}
          </div>
          <div className="tfoot">
            <div className="line"><span className="k">Raíz aproximada</span><span className="v">{resultado && resultado.raiz != null ? fmt(resultado.raiz, 8) : '—'}</span></div>
            <div className="line"><span className="k">f(raíz)</span><span className="v">{resultado && resultado.raiz != null ? fmt(resultado.fn(resultado.raiz), 2) : '—'}</span></div>
            <div className="line"><span className="k">Estado</span><span className="v">{resultado ? (resultado.convergio ? 'Convergió' : 'Sin converger') : 'En espera'}</span></div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default App;
