/* AUTO-GENERATED from components/ — kit-local copy so the UI kit renders
   without the turn-gated _ds_bundle.js. Do not edit by hand. */
const { useState, useRef, useEffect, useId } = React;

// ---- components/core/Button.jsx ----
/**
 * Converge Button — primary action control.
 * Icons are Lucide names (rendered when the Lucide UMD script is present).
 */
function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  children,
  className = '',
  ...rest
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (window.lucide && ref.current) window.lucide.createIcons({ nameAttr: 'data-lucide', root: ref.current });
  });
  const cls = ['cvg-btn', `cvg-btn--${variant}`, `cvg-btn--${size}`, className].filter(Boolean).join(' ');
  return (
    <button ref={ref} className={cls} {...rest}>
      {icon && <span className="cvg-btn__icon"><i data-lucide={icon}></i></span>}
      {children && <span>{children}</span>}
      {iconRight && <span className="cvg-btn__icon"><i data-lucide={iconRight}></i></span>}
    </button>
  );
}

// ---- components/core/IconButton.jsx ----
/** Icon-only button. Used heavily in the transport bar and toolbars. */
function IconButton({
  icon,
  variant = 'default',
  size = 'md',
  active = false,
  label,
  className = '',
  ...rest
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (window.lucide && ref.current) window.lucide.createIcons({ nameAttr: 'data-lucide', root: ref.current });
  });
  const cls = [
    'cvg-iconbtn',
    variant !== 'default' && `cvg-iconbtn--${variant}`,
    active && 'cvg-iconbtn--active',
    `cvg-iconbtn--${size}`,
    className,
  ].filter(Boolean).join(' ');
  return (
    <button ref={ref} className={cls} aria-label={label} aria-pressed={active || undefined} {...rest}>
      <i data-lucide={icon}></i>
    </button>
  );
}

// ---- components/core/Badge.jsx ----
/** Compact status/label chip. */
function Badge({ color = 'neutral', solid = false, mono = false, dot = false, children, className = '' }) {
  const cls = [
    'cvg-badge',
    `cvg-badge--${color}`,
    solid && 'cvg-badge--solid',
    mono && 'cvg-badge--mono',
    className,
  ].filter(Boolean).join(' ');
  return (
    <span className={cls}>
      {dot && <span className="cvg-badge__dot"></span>}
      {children}
    </span>
  );
}

// ---- components/core/Card.jsx ----
/** Surface container. `glass` for floating-over-canvas panels, `canvas` for the hero plot frame. */
function Card({ variant = 'solid', title, actions, children, bodyClassName = '', className = '' }) {
  const cls = [
    'cvg-card',
    variant === 'glass' && 'cvg-card--glass',
    variant === 'canvas' && 'cvg-card--canvas',
    className,
  ].filter(Boolean).join(' ');
  return (
    <div className={cls}>
      {(title || actions) && (
        <div className="cvg-card__header">
          {title && <div className="cvg-card__title">{title}</div>}
          {actions && <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>{actions}</div>}
        </div>
      )}
      <div className={`cvg-card__body ${bodyClassName}`}>{children}</div>
    </div>
  );
}

// ---- components/forms/Input.jsx ----
/** Text input field. The function input (f(x)) is the canonical use — monospace by default. */
function Input({
  label,
  hint,
  error,
  prefix,
  suffix,
  monoLabel = false,
  className = '',
  id,
  required,
  ...rest
}) {
  const fid = id || React.useId();
  const cls = ['cvg-field', error && 'cvg-field--error', monoLabel && 'cvg-field--mono-label', className].filter(Boolean).join(' ');
  return (
    <div className={cls}>
      {label && (
        <label className="cvg-field__label" htmlFor={fid}>
          <span>{label}{required && <span className="req"> *</span>}</span>
        </label>
      )}
      <div className="cvg-field__control">
        {prefix && <span className="cvg-field__prefix">{prefix}</span>}
        <input id={fid} className="cvg-field__input" {...rest} />
        {suffix && <span className="cvg-field__suffix">{suffix}</span>}
      </div>
      {(hint || error) && <span className="cvg-field__hint">{error || hint}</span>}
    </div>
  );
}

// ---- components/forms/NumberField.jsx ----
/** Numeric field with up/down steppers — iterations, x0, interval bounds. */
function NumberField({ label, hint, error, value, onChange, step = 1, min, max, suffix, className = '', id, ...rest }) {
  const fid = id || React.useId();
  const num = (v) => (v === '' || v == null ? 0 : parseFloat(v));
  const clamp = (v) => {
    if (min != null) v = Math.max(min, v);
    if (max != null) v = Math.min(max, v);
    return v;
  };
  const bump = (dir) => {
    const next = clamp(+(num(value) + dir * step).toFixed(10));
    onChange && onChange({ target: { value: String(next) } });
  };
  const cls = ['cvg-field', error && 'cvg-field--error', className].filter(Boolean).join(' ');
  return (
    <div className={cls}>
      {label && <label className="cvg-field__label" htmlFor={fid}><span>{label}</span></label>}
      <div className="cvg-field__control">
        <input id={fid} className="cvg-field__input" inputMode="decimal" value={value} onChange={onChange} {...rest} />
        {suffix && <span className="cvg-field__suffix">{suffix}</span>}
        <span className="cvg-stepper">
          <button type="button" tabIndex={-1} aria-label="Increment" onClick={() => bump(1)}><i data-lucide="chevron-up"></i></button>
          <button type="button" tabIndex={-1} aria-label="Decrement" onClick={() => bump(-1)}><i data-lucide="chevron-down"></i></button>
        </span>
      </div>
      {(hint || error) && <span className="cvg-field__hint">{error || hint}</span>}
    </div>
  );
}

// ---- components/forms/Select.jsx ----
/** Native select, restyled. */
function Select({ label, hint, options = [], value, onChange, className = '', id, children, ...rest }) {
  const fid = id || React.useId();
  const ref = React.useRef(null);
  React.useEffect(() => { if (window.lucide && ref.current) window.lucide.createIcons({ nameAttr: 'data-lucide', root: ref.current }); });
  return (
    <div className={['cvg-field', className].filter(Boolean).join(' ')}>
      {label && <label className="cvg-field__label" htmlFor={fid}><span>{label}</span></label>}
      <div className="cvg-select" ref={ref}>
        <select id={fid} value={value} onChange={onChange} {...rest}>
          {children || options.map((o) => {
            const opt = typeof o === 'string' ? { value: o, label: o } : o;
            return <option key={opt.value} value={opt.value}>{opt.label}</option>;
          })}
        </select>
        <span className="cvg-select__chevron"><i data-lucide="chevrons-up-down"></i></span>
      </div>
      {hint && <span className="cvg-field__hint">{hint}</span>}
    </div>
  );
}

// ---- components/forms/Tabs.jsx ----
/** Segmented tabs. The signature use is the method switch (Bisección / Newton–Raphson). */
function Tabs({ tabs = [], value, onChange, block = false, className = '' }) {
  const ref = React.useRef(null);
  React.useEffect(() => { if (window.lucide && ref.current) window.lucide.createIcons({ nameAttr: 'data-lucide', root: ref.current }); });
  const cls = ['cvg-tabs', block && 'cvg-tabs--block', className].filter(Boolean).join(' ');
  return (
    <div className={cls} role="tablist" ref={ref}>
      {tabs.map((t) => {
        const tab = typeof t === 'string' ? { value: t, label: t } : t;
        const sel = tab.value === value;
        const tcls = ['cvg-tab', tab.accent && `cvg-tab--${tab.accent}`].filter(Boolean).join(' ');
        return (
          <button key={tab.value} role="tab" aria-selected={sel} className={tcls} onClick={() => onChange && onChange(tab.value)}>
            {tab.icon && <i data-lucide={tab.icon}></i>}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

// ---- components/forms/Switch.jsx ----
/** Toggle switch. */
function Switch({ checked, onChange, label, id, ...rest }) {
  const fid = id || React.useId();
  return (
    <label className="cvg-switch" htmlFor={fid}>
      <input id={fid} type="checkbox" checked={checked} onChange={onChange} {...rest} />
      <span className="cvg-switch__track"><span className="cvg-switch__thumb"></span></span>
      {label && <span className="cvg-switch__label">{label}</span>}
    </label>
  );
}

// ---- components/forms/Slider.jsx ----
/** Range slider — playback speed, zoom level. */
function Slider({ label, value, min = 0, max = 100, step = 1, onChange, format, className = '', id, ...rest }) {
  const fid = id || React.useId();
  const display = format ? format(value) : value;
  return (
    <div className={['cvg-slider', className].filter(Boolean).join(' ')}>
      {(label != null) && (
        <div className="cvg-slider__top">
          <label className="cvg-slider__label" htmlFor={fid}>{label}</label>
          <span className="cvg-slider__value">{display}</span>
        </div>
      )}
      <input id={fid} type="range" value={value} min={min} max={max} step={step} onChange={onChange} {...rest} />
    </div>
  );
}

// ---- components/data/IterationTable.jsx ----
/**
 * Synchronized iteration table. Each row is one algorithm step; the active row
 * (matching the transport position) is highlighted. Clicking a row jumps there.
 */
function IterationTable({ rows = [], activeIndex = 0, onSelect, decimals = 8 }) {
  const fmt = (v) => {
    if (v == null || Number.isNaN(v)) return '—';
    const s = v.toFixed(decimals);
    return v >= 0 ? `+${s}` : s;
  };
  return (
    <table className="cvg-itertable">
      <thead>
        <tr>
          <th>n</th>
          <th>xₙ</th>
          <th>f(xₙ)</th>
          <th>err. abs.</th>
          <th>err. rel.</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => {
          const active = i === activeIndex;
          const root = active && r.converged;
          return (
            <tr key={i} data-active={active || undefined} onClick={() => onSelect && onSelect(i)}>
              <td>{r.n ?? i + 1}</td>
              <td className={root ? 'num-root' : 'num-strong'}>{r.x != null ? r.x.toFixed(decimals) : '—'}</td>
              <td className={r.fx < 0 ? 'num-neg' : ''}>{fmt(r.fx)}</td>
              <td>{r.absError != null ? r.absError.toExponential(2) : '—'}</td>
              <td>{r.relError != null ? r.relError.toExponential(2) : '—'}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

// ---- components/data/StatPill.jsx ----
/** Status summary pill — label + monospace value. Used in the canvas header. */
function StatPill({ label, value, status = 'default' }) {
  const cls = ['cvg-statpill', status !== 'default' && `cvg-statpill--${status}`].filter(Boolean).join(' ');
  return (
    <span className={cls}>
      <span className="cvg-statpill__label">{label}</span>
      <span className="cvg-statpill__value">{value}</span>
    </span>
  );
}

// ---- components/feedback/Tooltip.jsx ----
/** Lightweight hover tooltip. Wrap any trigger (typically an IconButton). */
function Tooltip({ content, shortcut, children }) {
  return (
    <span className="cvg-tooltip-wrap">
      {children}
      <span className="cvg-tooltip" role="tooltip">
        {content}
        {shortcut && <kbd>{shortcut}</kbd>}
      </span>
    </span>
  );
}

// ---- components/feedback/Alert.jsx ----
const ICONS = { danger: 'alert-triangle', warning: 'alert-circle', info: 'info', success: 'check-circle-2' };

/** Inline feedback banner. The invalid-function error state is the key use. */
function Alert({ variant = 'info', title, children, icon, className = '' }) {
  const ref = React.useRef(null);
  React.useEffect(() => { if (window.lucide && ref.current) window.lucide.createIcons({ nameAttr: 'data-lucide', root: ref.current }); });
  return (
    <div ref={ref} className={['cvg-alert', `cvg-alert--${variant}`, className].filter(Boolean).join(' ')} role="alert">
      <span className="cvg-alert__icon"><i data-lucide={icon || ICONS[variant]}></i></span>
      <div>
        {title && <div className="cvg-alert__title">{title}</div>}
        {children && <div className="cvg-alert__msg">{children}</div>}
      </div>
    </div>
  );
}

Object.assign(window, { Button, IconButton, Badge, Card, Input, NumberField, Select, Tabs, Switch, Slider, IterationTable, StatPill, Tooltip, Alert });
