/* Convergencia — composición principal. */
import React, { useState, useEffect } from 'react';
import { createIcons, icons } from 'lucide';
import Plot from './Plot';
import { Button, IconButton, Badge, Input, NumberField, Tabs, Switch, Slider, Tooltip } from './components';

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

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('cvg-theme') || 'light');
  const [method, setMethod] = useState('bisection');
  const [fnInput, setFnInput] = useState('');
  const [showGrid, setShowGrid] = useState(true);
  const [fadePast, setFadePast] = useState(true);
  const [speed, setSpeed] = useState(1.5);

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
                  <NumberField label="a (extremo izquierdo)" placeholder="0" step={0.5} />
                  <NumberField label="b (extremo derecho)" placeholder="0" step={0.5} />
                  <NumberField label="Máx. iteraciones" placeholder="50" min={1} step={1} />
                  <Input label="Tolerancia" placeholder="1e-6" />
                </div>
              ) : (
                <div className="params-col" key="nw">
                  <NumberField label="Valor inicial (x₀)" placeholder="0" step={0.1} />
                  <NumberField label="Máx. iteraciones" placeholder="50" min={1} step={1} />
                  <Input label="Tolerancia" placeholder="1e-6" />
                </div>
              )}
            </div>
          </div>

          <div className="run-row">
            <Button variant="primary" icon="play">Calcular</Button>
            <Button variant="secondary" icon="rotate-ccw">Reiniciar</Button>
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
                <span className="ministat"><span className="ms-k">Iteración</span><span className="ms-v">—</span></span>
                <span className="ministat"><span className="ms-k">{isBi ? 'c' : 'xₙ'}</span><span className="ms-v">—</span></span>
                <span className="ministat"><span className="ms-k">f(x)</span><span className="ms-v">—</span></span>
                <span className="ministat"><span className="ms-k">error</span><span className="ms-v">—</span></span>
              </div>
              <div className="spacer"></div>
              <Badge color="cyan" dot>En espera</Badge>
            </div>

            <div className="plot-wrap" data-grid={showGrid ? 'on' : 'off'}>
              <Plot theme={theme} />
              <div className="plot-tools">
                <Tooltip content="Acercar"><IconButton icon="plus" label="Acercar" /></Tooltip>
                <Tooltip content="Alejar"><IconButton icon="minus" label="Alejar" /></Tooltip>
                <Tooltip content="Reencuadrar"><IconButton icon="maximize" label="Reencuadrar" /></Tooltip>
              </div>
              <span className="plot-hint"><b>arrastra</b> para mover · <b>rueda</b> para zoom</span>
            </div>
          </div>

          {/* Transport */}
          <div className="transport">
            <div className="group">
              <Tooltip content="Reiniciar" shortcut="Home"><IconButton icon="skip-back" variant="solid" label="Reiniciar" /></Tooltip>
              <Tooltip content="Paso anterior" shortcut="←"><IconButton icon="chevron-left" variant="solid" label="Anterior" /></Tooltip>
              <Tooltip content="Reproducir" shortcut="Espacio"><IconButton icon="play" variant="primary" size="lg" label="Reproducir" /></Tooltip>
              <Tooltip content="Avanzar paso" shortcut="→"><IconButton icon="chevron-right" variant="solid" label="Siguiente" /></Tooltip>
              <Tooltip content="Ir al final" shortcut="End"><IconButton icon="skip-forward" variant="solid" label="Final" /></Tooltip>
            </div>
            <div className="progress">
              <div className="progress-track"><div className="progress-fill" style={{ width: '0%' }}></div></div>
              <span className="count">0 / 0</span>
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
            <Badge color="neutral" mono>0 pasos</Badge>
          </div>
          <div className="tscroll scroll-thin">
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
          </div>
          <div className="tfoot">
            <div className="line"><span className="k">Raíz aproximada</span><span className="v">—</span></div>
            <div className="line"><span className="k">f(raíz)</span><span className="v">—</span></div>
            <div className="line"><span className="k">Estado</span><span className="v">En espera</span></div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default App;
