/* @ds-bundle: {"format":3,"namespace":"ConvergeDesignSystem_67e366","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"IterationTable","sourcePath":"components/data/IterationTable.jsx"},{"name":"StatPill","sourcePath":"components/data/StatPill.jsx"},{"name":"Alert","sourcePath":"components/feedback/Alert.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"NumberField","sourcePath":"components/forms/NumberField.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Slider","sourcePath":"components/forms/Slider.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/forms/Tabs.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"b594ce6dffe2","components/core/Button.jsx":"fd4fc67b6aac","components/core/Card.jsx":"e4d7a4c0d022","components/core/IconButton.jsx":"0788f6ee5bc2","components/data/IterationTable.jsx":"071145952988","components/data/StatPill.jsx":"efae15339b4c","components/feedback/Alert.jsx":"c2170401e0eb","components/feedback/Tooltip.jsx":"e4f176f8a2ac","components/forms/Input.jsx":"9c0e932c6b4e","components/forms/NumberField.jsx":"d362185d41ce","components/forms/Select.jsx":"15af597f12d9","components/forms/Slider.jsx":"9a4f6cad143b","components/forms/Switch.jsx":"556bce205151","components/forms/Tabs.jsx":"1381d27ab26e","ui_kits/converge-app/App.jsx":"4fa1e13599d8","ui_kits/converge-app/Plot.jsx":"0f31f73f40a7","ui_kits/converge-app/engine.js":"37da85966d93"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ConvergeDesignSystem_67e366 = window.ConvergeDesignSystem_67e366 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
/** Compact status/label chip. */
function Badge({
  color = 'neutral',
  solid = false,
  mono = false,
  dot = false,
  children,
  className = ''
}) {
  const cls = ['cvg-badge', `cvg-badge--${color}`, solid && 'cvg-badge--solid', mono && 'cvg-badge--mono', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", {
    className: cls
  }, dot && /*#__PURE__*/React.createElement("span", {
    className: "cvg-badge__dot"
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
    if (window.lucide && ref.current) window.lucide.createIcons({
      nameAttr: 'data-lucide',
      root: ref.current
    });
  });
  const cls = ['cvg-btn', `cvg-btn--${variant}`, `cvg-btn--${size}`, className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    ref: ref,
    className: cls
  }, rest), icon && /*#__PURE__*/React.createElement("span", {
    className: "cvg-btn__icon"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon
  })), children && /*#__PURE__*/React.createElement("span", null, children), iconRight && /*#__PURE__*/React.createElement("span", {
    className: "cvg-btn__icon"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": iconRight
  })));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
/** Surface container. `glass` for floating-over-canvas panels, `canvas` for the hero plot frame. */
function Card({
  variant = 'solid',
  title,
  actions,
  children,
  bodyClassName = '',
  className = ''
}) {
  const cls = ['cvg-card', variant === 'glass' && 'cvg-card--glass', variant === 'canvas' && 'cvg-card--canvas', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", {
    className: cls
  }, (title || actions) && /*#__PURE__*/React.createElement("div", {
    className: "cvg-card__header"
  }, title && /*#__PURE__*/React.createElement("div", {
    className: "cvg-card__title"
  }, title), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-2)',
      alignItems: 'center'
    }
  }, actions)), /*#__PURE__*/React.createElement("div", {
    className: `cvg-card__body ${bodyClassName}`
  }, children));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
    if (window.lucide && ref.current) window.lucide.createIcons({
      nameAttr: 'data-lucide',
      root: ref.current
    });
  });
  const cls = ['cvg-iconbtn', variant !== 'default' && `cvg-iconbtn--${variant}`, active && 'cvg-iconbtn--active', `cvg-iconbtn--${size}`, className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    ref: ref,
    className: cls,
    "aria-label": label,
    "aria-pressed": active || undefined
  }, rest), /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/data/IterationTable.jsx
try { (() => {
/**
 * Synchronized iteration table. Each row is one algorithm step; the active row
 * (matching the transport position) is highlighted. Clicking a row jumps there.
 */
function IterationTable({
  rows = [],
  activeIndex = 0,
  onSelect,
  decimals = 8
}) {
  const fmt = v => {
    if (v == null || Number.isNaN(v)) return '—';
    const s = v.toFixed(decimals);
    return v >= 0 ? `+${s}` : s;
  };
  return /*#__PURE__*/React.createElement("table", {
    className: "cvg-itertable"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "n"), /*#__PURE__*/React.createElement("th", null, "x\u2099"), /*#__PURE__*/React.createElement("th", null, "f(x\u2099)"), /*#__PURE__*/React.createElement("th", null, "err. abs."), /*#__PURE__*/React.createElement("th", null, "err. rel."))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => {
    const active = i === activeIndex;
    const root = active && r.converged;
    return /*#__PURE__*/React.createElement("tr", {
      key: i,
      "data-active": active || undefined,
      onClick: () => onSelect && onSelect(i)
    }, /*#__PURE__*/React.createElement("td", null, r.n ?? i + 1), /*#__PURE__*/React.createElement("td", {
      className: root ? 'num-root' : 'num-strong'
    }, r.x != null ? r.x.toFixed(decimals) : '—'), /*#__PURE__*/React.createElement("td", {
      className: r.fx < 0 ? 'num-neg' : ''
    }, fmt(r.fx)), /*#__PURE__*/React.createElement("td", null, r.absError != null ? r.absError.toExponential(2) : '—'), /*#__PURE__*/React.createElement("td", null, r.relError != null ? r.relError.toExponential(2) : '—'));
  })));
}
Object.assign(__ds_scope, { IterationTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/IterationTable.jsx", error: String((e && e.message) || e) }); }

// components/data/StatPill.jsx
try { (() => {
/** Status summary pill — label + monospace value. Used in the canvas header. */
function StatPill({
  label,
  value,
  status = 'default'
}) {
  const cls = ['cvg-statpill', status !== 'default' && `cvg-statpill--${status}`].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", {
    className: cls
  }, /*#__PURE__*/React.createElement("span", {
    className: "cvg-statpill__label"
  }, label), /*#__PURE__*/React.createElement("span", {
    className: "cvg-statpill__value"
  }, value));
}
Object.assign(__ds_scope, { StatPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatPill.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Alert.jsx
try { (() => {
const ICONS = {
  danger: 'alert-triangle',
  warning: 'alert-circle',
  info: 'info',
  success: 'check-circle-2'
};

/** Inline feedback banner. The invalid-function error state is the key use. */
function Alert({
  variant = 'info',
  title,
  children,
  icon,
  className = ''
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (window.lucide && ref.current) window.lucide.createIcons({
      nameAttr: 'data-lucide',
      root: ref.current
    });
  });
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: ['cvg-alert', `cvg-alert--${variant}`, className].filter(Boolean).join(' '),
    role: "alert"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cvg-alert__icon"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon || ICONS[variant]
  })), /*#__PURE__*/React.createElement("div", null, title && /*#__PURE__*/React.createElement("div", {
    className: "cvg-alert__title"
  }, title), children && /*#__PURE__*/React.createElement("div", {
    className: "cvg-alert__msg"
  }, children)));
}
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Alert.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
/** Lightweight hover tooltip. Wrap any trigger (typically an IconButton). */
function Tooltip({
  content,
  shortcut,
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "cvg-tooltip-wrap"
  }, children, /*#__PURE__*/React.createElement("span", {
    className: "cvg-tooltip",
    role: "tooltip"
  }, content, shortcut && /*#__PURE__*/React.createElement("kbd", null, shortcut)));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
  return /*#__PURE__*/React.createElement("div", {
    className: cls
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "cvg-field__label",
    htmlFor: fid
  }, /*#__PURE__*/React.createElement("span", null, label, required && /*#__PURE__*/React.createElement("span", {
    className: "req"
  }, " *"))), /*#__PURE__*/React.createElement("div", {
    className: "cvg-field__control"
  }, prefix && /*#__PURE__*/React.createElement("span", {
    className: "cvg-field__prefix"
  }, prefix), /*#__PURE__*/React.createElement("input", _extends({
    id: fid,
    className: "cvg-field__input"
  }, rest)), suffix && /*#__PURE__*/React.createElement("span", {
    className: "cvg-field__suffix"
  }, suffix)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    className: "cvg-field__hint"
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/NumberField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Numeric field with up/down steppers — iterations, x0, interval bounds. */
function NumberField({
  label,
  hint,
  error,
  value,
  onChange,
  step = 1,
  min,
  max,
  suffix,
  className = '',
  id,
  ...rest
}) {
  const fid = id || React.useId();
  const num = v => v === '' || v == null ? 0 : parseFloat(v);
  const clamp = v => {
    if (min != null) v = Math.max(min, v);
    if (max != null) v = Math.min(max, v);
    return v;
  };
  const bump = dir => {
    const next = clamp(+(num(value) + dir * step).toFixed(10));
    onChange && onChange({
      target: {
        value: String(next)
      }
    });
  };
  const cls = ['cvg-field', error && 'cvg-field--error', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", {
    className: cls
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "cvg-field__label",
    htmlFor: fid
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("div", {
    className: "cvg-field__control"
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: fid,
    className: "cvg-field__input",
    inputMode: "decimal",
    value: value,
    onChange: onChange
  }, rest)), suffix && /*#__PURE__*/React.createElement("span", {
    className: "cvg-field__suffix"
  }, suffix), /*#__PURE__*/React.createElement("span", {
    className: "cvg-stepper"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    tabIndex: -1,
    "aria-label": "Increment",
    onClick: () => bump(1)
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "chevron-up"
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    tabIndex: -1,
    "aria-label": "Decrement",
    onClick: () => bump(-1)
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "chevron-down"
  })))), (hint || error) && /*#__PURE__*/React.createElement("span", {
    className: "cvg-field__hint"
  }, error || hint));
}
Object.assign(__ds_scope, { NumberField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/NumberField.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Native select, restyled. */
function Select({
  label,
  hint,
  options = [],
  value,
  onChange,
  className = '',
  id,
  children,
  ...rest
}) {
  const fid = id || React.useId();
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (window.lucide && ref.current) window.lucide.createIcons({
      nameAttr: 'data-lucide',
      root: ref.current
    });
  });
  return /*#__PURE__*/React.createElement("div", {
    className: ['cvg-field', className].filter(Boolean).join(' ')
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "cvg-field__label",
    htmlFor: fid
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("div", {
    className: "cvg-select",
    ref: ref
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: fid,
    value: value,
    onChange: onChange
  }, rest), children || options.map(o => {
    const opt = typeof o === 'string' ? {
      value: o,
      label: o
    } : o;
    return /*#__PURE__*/React.createElement("option", {
      key: opt.value,
      value: opt.value
    }, opt.label);
  })), /*#__PURE__*/React.createElement("span", {
    className: "cvg-select__chevron"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "chevrons-up-down"
  }))), hint && /*#__PURE__*/React.createElement("span", {
    className: "cvg-field__hint"
  }, hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Slider.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Range slider — playback speed, zoom level. */
function Slider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  format,
  className = '',
  id,
  ...rest
}) {
  const fid = id || React.useId();
  const display = format ? format(value) : value;
  return /*#__PURE__*/React.createElement("div", {
    className: ['cvg-slider', className].filter(Boolean).join(' ')
  }, label != null && /*#__PURE__*/React.createElement("div", {
    className: "cvg-slider__top"
  }, /*#__PURE__*/React.createElement("label", {
    className: "cvg-slider__label",
    htmlFor: fid
  }, label), /*#__PURE__*/React.createElement("span", {
    className: "cvg-slider__value"
  }, display)), /*#__PURE__*/React.createElement("input", _extends({
    id: fid,
    type: "range",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: onChange
  }, rest)));
}
Object.assign(__ds_scope, { Slider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Slider.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Toggle switch. */
function Switch({
  checked,
  onChange,
  label,
  id,
  ...rest
}) {
  const fid = id || React.useId();
  return /*#__PURE__*/React.createElement("label", {
    className: "cvg-switch",
    htmlFor: fid
  }, /*#__PURE__*/React.createElement("input", _extends({
    id: fid,
    type: "checkbox",
    checked: checked,
    onChange: onChange
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "cvg-switch__track"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cvg-switch__thumb"
  })), label && /*#__PURE__*/React.createElement("span", {
    className: "cvg-switch__label"
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Tabs.jsx
try { (() => {
/** Segmented tabs. The signature use is the method switch (Bisección / Newton–Raphson). */
function Tabs({
  tabs = [],
  value,
  onChange,
  block = false,
  className = ''
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (window.lucide && ref.current) window.lucide.createIcons({
      nameAttr: 'data-lucide',
      root: ref.current
    });
  });
  const cls = ['cvg-tabs', block && 'cvg-tabs--block', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", {
    className: cls,
    role: "tablist",
    ref: ref
  }, tabs.map(t => {
    const tab = typeof t === 'string' ? {
      value: t,
      label: t
    } : t;
    const sel = tab.value === value;
    const tcls = ['cvg-tab', tab.accent && `cvg-tab--${tab.accent}`].filter(Boolean).join(' ');
    return /*#__PURE__*/React.createElement("button", {
      key: tab.value,
      role: "tab",
      "aria-selected": sel,
      className: tcls,
      onClick: () => onChange && onChange(tab.value)
    }, tab.icon && /*#__PURE__*/React.createElement("i", {
      "data-lucide": tab.icon
    }), tab.label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/converge-app/App.jsx
try { (() => {
/* Converge app — main composition. Babel JSX. Renders into #root. */
const {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo
} = React;
const {
  Button,
  IconButton,
  Badge,
  Card,
  Input,
  NumberField,
  Select,
  Tabs,
  Switch,
  Slider,
  IterationTable,
  StatPill,
  Tooltip,
  Alert
} = window;
const PRESETS = {
  bisection: {
    fn: 'x^3 - x - 2',
    a: 1,
    b: 2,
    maxIter: 50,
    tol: 0.000001
  },
  newton: {
    fn: 'x^3 - x - 2',
    x0: 1.5,
    maxIter: 50,
    tol: 0.000001
  }
};
function computeView(fn, rows, method, p) {
  // x-range: cover the action with margin
  let xs = [];
  if (method === 'bisection') xs = [p.a, p.b];else xs = rows.length ? rows.map(r => r.x).concat(rows.map(r => r.xNext)) : [p.x0 - 2, p.x0 + 2];
  let xmin = Math.min(...xs),
    xmax = Math.max(...xs);
  let pad = Math.max((xmax - xmin) * 0.6, 1.5);
  xmin -= pad;
  xmax += pad;
  // y-range: sample
  let ymin = Infinity,
    ymax = -Infinity;
  for (let i = 0; i <= 120; i++) {
    const x = xmin + (xmax - xmin) * i / 120;
    const y = fn(x);
    if (isFinite(y)) {
      ymin = Math.min(ymin, y);
      ymax = Math.max(ymax, y);
    }
  }
  if (!isFinite(ymin) || !isFinite(ymax)) {
    ymin = -5;
    ymax = 5;
  }
  const yp = Math.max((ymax - ymin) * 0.2, 1);
  ymin -= yp;
  ymax += yp;
  if (ymin > 0) ymin = -yp;
  if (ymax < 0) ymax = yp; // keep x-axis visible
  return {
    xmin,
    xmax,
    ymin,
    ymax
  };
}
function App() {
  const [method, setMethod] = useState('bisection');
  const [fnInput, setFnInput] = useState(PRESETS.bisection.fn);
  const [p, setP] = useState({
    a: '1',
    b: '2',
    x0: '1.5',
    maxIter: '50',
    tol: '0.000001'
  });
  const [run, setRun] = useState(null); // { rows, status, root, message }
  const [step, setStep] = useState(0);
  const [view, setView] = useState({
    xmin: -1,
    xmax: 3,
    ymin: -4,
    ymax: 6
  });
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1.5);
  const [showGrid, setShowGrid] = useState(true);
  const [fadePast, setFadePast] = useState(true);
  const compiled = useMemo(() => window.CVG.compile(fnInput), [fnInput]);
  const symD = useMemo(() => window.CVG.symbolicDeriv(fnInput), [fnInput]);
  const fnError = compiled.error;
  const doRun = useCallback(() => {
    if (fnError) return;
    const f = compiled.f;
    const tol = parseFloat(p.tol) || 1e-6,
      maxIter = parseInt(p.maxIter) || 50;
    let res;
    if (method === 'bisection') res = window.CVG.bisection(f, parseFloat(p.a), parseFloat(p.b), tol, maxIter);else res = window.CVG.newton(f, parseFloat(p.x0), tol, maxIter);
    setRun(res);
    setStep(0);
    setPlaying(false);
    if (res.rows.length) setView(computeView(f, res.rows, method, {
      a: parseFloat(p.a),
      b: parseFloat(p.b),
      x0: parseFloat(p.x0)
    }));
  }, [compiled, fnError, method, p]);

  // run on first mount + when method switches (with its preset)
  useEffect(() => {
    doRun(); /* eslint-disable-next-line */
  }, [method]);
  const rows = run ? run.rows : [];
  const last = rows.length - 1;
  const cur = rows[step];

  // transport
  const go = useCallback(i => setStep(s => Math.max(0, Math.min(last, i))), [last]);
  useEffect(() => {
    if (!playing) return;
    if (step >= last) {
      setPlaying(false);
      return;
    }
    const id = setTimeout(() => setStep(s => Math.min(last, s + 1)), 900 / speed);
    return () => clearTimeout(id);
  }, [playing, step, last, speed]);

  // keyboard
  useEffect(() => {
    const onKey = e => {
      if (e.target.tagName === 'INPUT') return;
      if (e.key === 'ArrowRight') go(step + 1);else if (e.key === 'ArrowLeft') go(step - 1);else if (e.key === ' ') {
        e.preventDefault();
        setPlaying(x => !x);
      } else if (e.key === 'Home') go(0);else if (e.key === 'End') go(last);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [step, last, go]);
  const setField = k => e => setP(v => ({
    ...v,
    [k]: e.target.value
  }));
  const noBracket = run && run.status === 'no-bracket';
  const converged = run && run.status === 'converged';
  const pct = last > 0 ? step / last * 100 : 0;
  return /*#__PURE__*/React.createElement("div", {
    className: "app"
  }, /*#__PURE__*/React.createElement("header", {
    className: "topbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-orbit-mark.png",
    alt: ""
  }), /*#__PURE__*/React.createElement("span", {
    className: "name"
  }, "Conver", /*#__PURE__*/React.createElement("b", null, "ge"))), /*#__PURE__*/React.createElement("span", {
    className: "eq"
  }, "f(x) = ", /*#__PURE__*/React.createElement("b", null, fnInput || '—')), /*#__PURE__*/React.createElement("div", {
    className: "spacer"
  }), /*#__PURE__*/React.createElement(Badge, {
    color: method === 'bisection' ? 'blue' : 'amber',
    dot: true
  }, method === 'bisection' ? 'Bisección' : 'Newton–Raphson'), /*#__PURE__*/React.createElement(Tooltip, {
    content: "Documentaci\xF3n"
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "book-open",
    label: "Docs"
  })), /*#__PURE__*/React.createElement(Tooltip, {
    content: "Compartir"
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "share-2",
    label: "Compartir"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "main"
  }, /*#__PURE__*/React.createElement("aside", {
    className: "rail scroll-thin"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "M\xE9todo"), /*#__PURE__*/React.createElement(Tabs, {
    block: true,
    value: method,
    onChange: m => {
      setMethod(m);
      setFnInput(PRESETS[m].fn);
      setP(v => ({
        ...v,
        ...presetParams(m)
      }));
    },
    tabs: [{
      value: 'bisection',
      label: 'Bisección',
      icon: 'git-fork',
      accent: 'bisection'
    }, {
      value: 'newton',
      label: 'Newton',
      icon: 'spline',
      accent: 'newton'
    }]
  })), /*#__PURE__*/React.createElement("div", {
    className: "section"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "Funci\xF3n"), /*#__PURE__*/React.createElement(Input, {
    monoLabel: true,
    label: "f(x)",
    prefix: "f(x) =",
    value: fnInput,
    onChange: e => setFnInput(e.target.value),
    error: fnError ? `Sintaxis inválida: ${fnError}` : null,
    hint: !fnError ? 'Usa x, +−*/^, sin, cos, exp, ln, sqrt…' : null
  })), method === 'newton' && !fnError && /*#__PURE__*/React.createElement("div", {
    className: "deriv"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lab"
  }, "f\u2032(x)"), " = ", symD.str || '—', cur && cur.deriv != null && /*#__PURE__*/React.createElement("span", {
    className: "val"
  }, "f\u2032(x", sub(step + 1), ") \u2248 ", cur.deriv.toFixed(6))), /*#__PURE__*/React.createElement("div", {
    className: "section"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "Par\xE1metros"), /*#__PURE__*/React.createElement("div", {
    className: "params-grid"
  }, method === 'bisection' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(NumberField, {
    label: "a",
    value: p.a,
    onChange: setField('a'),
    step: 0.5
  }), /*#__PURE__*/React.createElement(NumberField, {
    label: "b",
    value: p.b,
    onChange: setField('b'),
    step: 0.5
  })) : /*#__PURE__*/React.createElement(NumberField, {
    label: "x\u2080 (valor inicial)",
    className: "full",
    value: p.x0,
    onChange: setField('x0'),
    step: 0.1
  }), /*#__PURE__*/React.createElement(NumberField, {
    label: "M\xE1x. iteraciones",
    value: p.maxIter,
    onChange: setField('maxIter'),
    min: 1,
    step: 1
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Tolerancia",
    value: p.tol,
    onChange: setField('tol')
  }))), noBracket && /*#__PURE__*/React.createElement(Alert, {
    variant: "warning",
    title: "Sin cambio de signo"
  }, "f(a) y f(b) tienen el mismo signo en ", /*#__PURE__*/React.createElement("code", null, "[", p.a, ", ", p.b, "]"), ". Prueba otro intervalo."), /*#__PURE__*/React.createElement("div", {
    className: "run-row"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    icon: "play",
    onClick: doRun,
    disabled: !!fnError
  }, "Calcular"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: "rotate-ccw",
    onClick: () => {
      setFnInput(PRESETS[method].fn);
      setP(v => ({
        ...v,
        ...presetParams(method)
      }));
    }
  }, "Reiniciar")), /*#__PURE__*/React.createElement("div", {
    className: "section"
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow"
  }, "Visualizaci\xF3n"), /*#__PURE__*/React.createElement(Switch, {
    checked: showGrid,
    onChange: e => setShowGrid(e.target.checked),
    label: "Mostrar cuadr\xEDcula"
  }), /*#__PURE__*/React.createElement(Switch, {
    checked: fadePast,
    onChange: e => setFadePast(e.target.checked),
    label: "Atenuar pasos previos"
  }))), /*#__PURE__*/React.createElement("main", {
    className: "stage"
  }, /*#__PURE__*/React.createElement("div", {
    className: "canvas-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "canvas-head"
  }, /*#__PURE__*/React.createElement(StatPill, {
    label: "Iteraci\xF3n",
    value: rows.length ? `${step + 1} / ${rows.length}` : '—'
  }), cur && /*#__PURE__*/React.createElement(StatPill, {
    label: method === 'bisection' ? 'c' : 'xₙ',
    value: (method === 'bisection' ? cur.mid : cur.x).toFixed(6)
  }), cur && /*#__PURE__*/React.createElement(StatPill, {
    label: "f(x)",
    value: cur.fx.toExponential(2)
  }), cur && /*#__PURE__*/React.createElement(StatPill, {
    label: "error",
    value: cur.absError.toExponential(2),
    status: cur.converged ? 'success' : 'default'
  }), /*#__PURE__*/React.createElement("div", {
    className: "spacer"
  }), converged ? /*#__PURE__*/React.createElement(Badge, {
    color: "success",
    dot: true
  }, "Convergi\xF3 \xB7 ", rows.length, " iter") : run && run.status === 'max-iter' ? /*#__PURE__*/React.createElement(Badge, {
    color: "amber",
    dot: true
  }, "M\xE1x. iteraciones") : /*#__PURE__*/React.createElement(Badge, {
    color: "cyan",
    dot: true
  }, "Iterando")), /*#__PURE__*/React.createElement("div", {
    className: "plot-wrap"
  }, compiled.f && /*#__PURE__*/React.createElement(Plot, {
    fn: compiled.f,
    method: method,
    step: step,
    view: view,
    frame: run
  }), /*#__PURE__*/React.createElement("span", {
    className: "plot-hint"
  }, "arrastra para mover \xB7 rueda para zoom"))), /*#__PURE__*/React.createElement("div", {
    className: "transport"
  }, /*#__PURE__*/React.createElement("div", {
    className: "group"
  }, /*#__PURE__*/React.createElement(Tooltip, {
    content: "Reiniciar",
    shortcut: "Home"
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "skip-back",
    variant: "solid",
    label: "Reiniciar",
    onClick: () => go(0)
  })), /*#__PURE__*/React.createElement(Tooltip, {
    content: "Paso anterior",
    shortcut: "\u2190"
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "chevron-left",
    variant: "solid",
    label: "Anterior",
    onClick: () => go(step - 1)
  })), /*#__PURE__*/React.createElement(Tooltip, {
    content: playing ? 'Pausar' : 'Reproducir',
    shortcut: "Espacio"
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: playing ? 'pause' : 'play',
    variant: "primary",
    size: "lg",
    label: "Reproducir",
    onClick: () => setPlaying(x => !x)
  })), /*#__PURE__*/React.createElement(Tooltip, {
    content: "Avanzar paso",
    shortcut: "\u2192"
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "chevron-right",
    variant: "solid",
    label: "Siguiente",
    onClick: () => go(step + 1)
  })), /*#__PURE__*/React.createElement(Tooltip, {
    content: "Ir al final",
    shortcut: "End"
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "skip-forward",
    variant: "solid",
    label: "Final",
    onClick: () => go(last)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "progress"
  }, /*#__PURE__*/React.createElement("div", {
    className: "progress-track"
  }, /*#__PURE__*/React.createElement("div", {
    className: "progress-fill",
    style: {
      width: pct + '%'
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "count"
  }, rows.length ? `${step + 1}/${rows.length}` : '0/0')), /*#__PURE__*/React.createElement("div", {
    className: "speed"
  }, /*#__PURE__*/React.createElement(Slider, {
    label: "Velocidad",
    value: speed,
    min: 0.5,
    max: 4,
    step: 0.5,
    onChange: e => setSpeed(+e.target.value),
    format: v => `${v}×`
  })))), /*#__PURE__*/React.createElement("aside", {
    className: "tablecol"
  }, /*#__PURE__*/React.createElement("div", {
    className: "thead"
  }, /*#__PURE__*/React.createElement("h3", null, "Iteraciones"), /*#__PURE__*/React.createElement(Badge, {
    color: "neutral",
    mono: true
  }, rows.length, " pasos")), /*#__PURE__*/React.createElement("div", {
    className: "tscroll scroll-thin"
  }, rows.length ? /*#__PURE__*/React.createElement(IterationTable, {
    rows: rows.map(r => ({
      n: r.n,
      x: method === 'bisection' ? r.mid : r.x,
      fx: r.fx,
      absError: r.absError,
      relError: r.relError,
      converged: r.converged
    })),
    activeIndex: step,
    onSelect: i => {
      setPlaying(false);
      go(i);
    },
    decimals: 7
  }) : /*#__PURE__*/React.createElement("div", {
    className: "empty"
  }, "Pulsa ", /*#__PURE__*/React.createElement("b", null, "Calcular"), " para generar las iteraciones.")), run && /*#__PURE__*/React.createElement("div", {
    className: "tfoot"
  }, /*#__PURE__*/React.createElement("div", {
    className: "line"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "Ra\xEDz aproximada"), /*#__PURE__*/React.createElement("span", {
    className: 'v' + (converged ? ' root' : '')
  }, run.root != null ? run.root.toFixed(8) : '—')), /*#__PURE__*/React.createElement("div", {
    className: "line"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "f(ra\xEDz)"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, run.root != null && compiled.f ? compiled.f(run.root).toExponential(2) : '—')), /*#__PURE__*/React.createElement("div", {
    className: "line"
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, "Estado"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, run.message))))));
}
function presetParams(m) {
  return m === 'bisection' ? {
    a: '1',
    b: '2',
    maxIter: '50',
    tol: '0.000001'
  } : {
    x0: '1.5',
    maxIter: '50',
    tol: '0.000001'
  };
}
function sub(n) {
  return String(n).split('').map(c => '₀₁₂₃₄₅₆₇₈₉'[+c] || c).join('');
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
setTimeout(() => window.lucide && window.lucide.createIcons(), 60);
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/converge-app/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/converge-app/Plot.jsx
try { (() => {
/* Converge — Plot: canvas renderer for f(x) + per-iteration overlays.
   Babel JSX. Attaches Plot to window. Uses window.CVG engine. */
function Plot({
  fn,
  method,
  step,
  view,
  frame
}) {
  const ref = React.useRef(null);
  const wrapRef = React.useRef(null);
  const [size, setSize] = React.useState({
    w: 0,
    h: 0
  });
  React.useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => setSize({
      w: el.clientWidth,
      h: el.clientHeight
    });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  React.useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const W = size.w,
      H = size.h;
    if (W < 2 || H < 2) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = W * dpr;
    cv.height = H * dpr;
    cv.style.width = W + 'px';
    cv.style.height = H + 'px';
    const ctx = cv.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    const {
      xmin,
      xmax,
      ymin,
      ymax
    } = view;
    const X = x => (x - xmin) / (xmax - xmin) * W;
    const Y = y => H - (y - ymin) / (ymax - ymin) * H;
    const css = getComputedStyle(document.documentElement);
    const C = n => css.getPropertyValue(n).trim();

    // ---- grid ----
    ctx.lineWidth = 1;
    const stepX = niceStep((xmax - xmin) / 10),
      stepY = niceStep((ymax - ymin) / 8);
    ctx.strokeStyle = C('--viz-grid');
    ctx.fillStyle = C('--text-muted');
    ctx.font = "11px 'JetBrains Mono', monospace";
    for (let gx = Math.ceil(xmin / stepX) * stepX; gx <= xmax; gx += stepX) {
      const px = X(gx);
      ctx.beginPath();
      ctx.moveTo(px, 0);
      ctx.lineTo(px, H);
      ctx.stroke();
    }
    for (let gy = Math.ceil(ymin / stepY) * stepY; gy <= ymax; gy += stepY) {
      const py = Y(gy);
      ctx.beginPath();
      ctx.moveTo(0, py);
      ctx.lineTo(W, py);
      ctx.stroke();
    }
    // ---- axes ----
    ctx.strokeStyle = C('--viz-axis');
    ctx.lineWidth = 1.5;
    const y0 = Y(0),
      x0 = X(0);
    if (0 >= ymin && 0 <= ymax) {
      ctx.beginPath();
      ctx.moveTo(0, y0);
      ctx.lineTo(W, y0);
      ctx.stroke();
    }
    if (0 >= xmin && 0 <= xmax) {
      ctx.beginPath();
      ctx.moveTo(x0, 0);
      ctx.lineTo(x0, H);
      ctx.stroke();
    }
    // axis ticks labels
    ctx.fillStyle = C('--text-tertiary');
    for (let gx = Math.ceil(xmin / stepX) * stepX; gx <= xmax; gx += stepX) {
      if (Math.abs(gx) < 1e-9) continue;
      ctx.fillText(trim(gx), X(gx) + 3, (0 >= ymin && 0 <= ymax ? y0 : H) - 5);
    }
    if (!fn) return;

    // ---- function curve ----
    ctx.strokeStyle = C('--viz-curve');
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.shadowColor = 'rgba(220,230,242,0.25)';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    let pen = false;
    for (let px = 0; px <= W; px += 1.5) {
      const xv = xmin + px / W * (xmax - xmin);
      const yv = fn(xv);
      if (!isFinite(yv) || Number.isNaN(yv)) {
        pen = false;
        continue;
      }
      const py = Y(yv);
      if (py < -2000 || py > H + 2000) {
        pen = false;
        continue;
      }
      if (!pen) {
        ctx.moveTo(px, py);
        pen = true;
      } else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // ---- overlays per method ----
    const rows = frame && frame.rows || [];
    const cur = rows[step];
    if (!cur) return;
    if (method === 'bisection') drawBisection(ctx, rows, step, X, Y, H, C, fn);else drawNewton(ctx, rows, step, X, Y, W, H, C, fn);
  }, [fn, method, step, view, size, frame]);
  return /*#__PURE__*/React.createElement("div", {
    ref: wrapRef,
    style: {
      position: 'absolute',
      inset: 0
    }
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: ref,
    style: {
      display: 'block',
      width: '100%',
      height: '100%'
    }
  }));
}

// ---- helpers ----
function niceStep(raw) {
  const p = Math.pow(10, Math.floor(Math.log10(raw)));
  const f = raw / p;
  return (f < 1.5 ? 1 : f < 3 ? 2 : f < 7 ? 5 : 10) * p;
}
function trim(v) {
  return Math.abs(v) < 1e-9 ? '0' : (+v.toFixed(4)).toString();
}
function dot(ctx, x, y, r, fill, glow) {
  if (glow) {
    ctx.shadowColor = glow;
    ctx.shadowBlur = 16;
  }
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.shadowBlur = 0;
}
function drawBisection(ctx, rows, step, X, Y, H, C, fn) {
  // faded prior intervals
  for (let i = 0; i < step; i++) {
    const r = rows[i];
    ctx.globalAlpha = 0.16;
    ctx.fillStyle = C('--viz-interval');
    ctx.fillRect(X(r.a), 0, X(r.b) - X(r.a), H);
    ctx.globalAlpha = 1;
    dot(ctx, X(r.mid), Y(0), 2.5, C('--viz-ghost'));
  }
  const r = rows[step];
  // active interval shade
  ctx.fillStyle = C('--viz-interval');
  ctx.fillRect(X(r.a), 0, X(r.b) - X(r.a), H);
  // a, b verticals
  ctx.strokeStyle = C('--viz-interval-edge');
  ctx.lineWidth = 1.5;
  ctx.setLineDash([5, 4]);
  [r.a, r.b].forEach(v => {
    ctx.beginPath();
    ctx.moveTo(X(v), 0);
    ctx.lineTo(X(v), H);
    ctx.stroke();
  });
  ctx.setLineDash([]);
  // labels a,b
  ctx.fillStyle = C('--blue-600');
  ctx.font = "600 12px 'JetBrains Mono', monospace";
  ctx.fillText('a', X(r.a) + 4, 16);
  ctx.fillText('b', X(r.b) + 4, 16);
  // midpoint
  const my = fn(r.mid);
  ctx.strokeStyle = C('--viz-midpoint');
  ctx.lineWidth = 1.5;
  ctx.globalAlpha = 0.5;
  ctx.beginPath();
  ctx.moveTo(X(r.mid), Y(0));
  ctx.lineTo(X(r.mid), Y(my));
  ctx.stroke();
  ctx.globalAlpha = 1;
  dot(ctx, X(r.mid), Y(my), 4, C('--viz-point'));
  const isRoot = r.converged;
  dot(ctx, X(r.mid), Y(0), isRoot ? 7 : 5, C('--viz-root'), isRoot ? 'rgba(70,203,245,0.9)' : 'rgba(70,203,245,0.5)');
}
function drawNewton(ctx, rows, step, X, Y, W, H, C, fn) {
  for (let i = 0; i < step; i++) {
    const r = rows[i];
    ctx.globalAlpha = 0.18;
    ctx.strokeStyle = C('--viz-ghost');
    ctx.lineWidth = 1;
    const yA = r.fx,
      slope = r.deriv;
    line(ctx, r.x, X, Y, slope, yA, W);
    ctx.globalAlpha = 1;
    dot(ctx, X(r.xNext), Y(0), 2.5, C('--viz-ghost'));
  }
  const r = rows[step];
  // point on curve
  dot(ctx, X(r.x), Y(r.fx), 4.5, C('--viz-point'), 'rgba(77,144,255,0.6)');
  // drop line to x
  ctx.strokeStyle = C('--viz-point');
  ctx.globalAlpha = 0.4;
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(X(r.x), Y(r.fx));
  ctx.lineTo(X(r.x), Y(0));
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.globalAlpha = 1;
  // tangent line (amber)
  ctx.strokeStyle = C('--viz-tangent');
  ctx.lineWidth = 2;
  ctx.shadowColor = 'rgba(255,180,84,0.4)';
  ctx.shadowBlur = 8;
  line(ctx, r.x, X, Y, r.deriv, r.fx, W);
  ctx.shadowBlur = 0;
  // next x intercept
  const isRoot = r.converged;
  dot(ctx, X(r.xNext), Y(0), isRoot ? 7 : 5.5, C('--viz-root'), isRoot ? 'rgba(70,203,245,0.9)' : 'rgba(70,203,245,0.55)');
  ctx.fillStyle = C('--amber-500');
  ctx.font = "600 12px 'JetBrains Mono', monospace";
  ctx.fillText('xₙ', X(r.x) - 6, Y(0) + 18);
  ctx.fillText('xₙ₊₁', X(r.xNext) - 8, Y(0) - 10);
}
function line(ctx, x, X, Y, slope, yAtX, W) {
  // tangent: y = yAtX + slope*(t - x)
  const t0 = -1e6,
    t1 = 1e6; // draw across viewport
  ctx.beginPath();
  const yL = yAtX + slope * (X.inv ? 0 : 0); // placeholder
  // sample two screen-edge points by inverting X
  const leftX = invX(X, 0),
    rightX = invX(X, W);
  ctx.moveTo(0, Y(yAtX + slope * (leftX - x)));
  ctx.lineTo(W, Y(yAtX + slope * (rightX - x)));
  ctx.stroke();
}
function invX(X, px) {
  // X(x) maps domain->px linearly; invert by sampling
  const x0 = 0,
    x1 = 1,
    p0 = X(0),
    p1 = X(1);
  return x0 + (px - p0) * (x1 - x0) / (p1 - p0);
}
window.Plot = Plot;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/converge-app/Plot.jsx", error: String((e && e.message) || e) }); }

// ui_kits/converge-app/engine.js
try { (() => {
/* Converge — math engine: expression parser/evaluator + root-finding solvers.
   Plain JS, attaches to window.CVG. No deps. */
(function () {
  // ---- Tokenizer ----------------------------------------------------------
  function tokenize(s) {
    const t = [];
    let i = 0;
    const isD = c => /[0-9.]/.test(c),
      isA = c => /[a-zA-Z_]/.test(c);
    while (i < s.length) {
      const c = s[i];
      if (c === ' ' || c === '\t') {
        i++;
        continue;
      }
      if (isD(c)) {
        let n = '';
        while (i < s.length && isD(s[i])) n += s[i++];
        t.push({
          t: 'num',
          v: parseFloat(n)
        });
        continue;
      }
      if (isA(c)) {
        let n = '';
        while (i < s.length && (isA(s[i]) || /[0-9]/.test(s[i]))) n += s[i++];
        t.push({
          t: 'id',
          v: n
        });
        continue;
      }
      if ('+-*/^(),'.includes(c)) {
        t.push({
          t: 'op',
          v: c
        });
        i++;
        continue;
      }
      throw new Error("Carácter no válido: '" + c + "'");
    }
    return t;
  }
  // ---- Recursive-descent parser → AST ------------------------------------
  function parse(src) {
    const tk = tokenize(src);
    let p = 0;
    const peek = () => tk[p],
      eat = () => tk[p++];
    function prim() {
      const x = peek();
      if (!x) throw new Error('Expresión incompleta');
      if (x.t === 'num') {
        eat();
        return {
          k: 'num',
          v: x.v
        };
      }
      if (x.t === 'op' && x.v === '(') {
        eat();
        const e = expr();
        if (!peek() || peek().v !== ')') throw new Error("Falta ')'");
        eat();
        return e;
      }
      if (x.t === 'op' && (x.v === '-' || x.v === '+')) {
        eat();
        return {
          k: 'unary',
          op: x.v,
          a: prim()
        };
      }
      if (x.t === 'id') {
        eat();
        if (peek() && peek().v === '(') {
          eat();
          const args = [expr()];
          while (peek() && peek().v === ',') {
            eat();
            args.push(expr());
          }
          if (!peek() || peek().v !== ')') throw new Error("Falta ')'");
          eat();
          return {
            k: 'call',
            name: x.v,
            args
          };
        }
        return {
          k: 'var',
          name: x.v
        };
      }
      throw new Error('Token inesperado');
    }
    function pow() {
      let a = prim();
      if (peek() && peek().v === '^') {
        eat();
        const b = pow();
        return {
          k: 'bin',
          op: '^',
          a,
          b
        };
      }
      return a;
    }
    function term() {
      let a = pow();
      while (peek() && (peek().v === '*' || peek().v === '/')) {
        const op = eat().v;
        const b = pow();
        a = {
          k: 'bin',
          op,
          a,
          b
        };
      }
      return a;
    }
    function expr() {
      let a = term();
      while (peek() && (peek().v === '+' || peek().v === '-')) {
        const op = eat().v;
        const b = term();
        a = {
          k: 'bin',
          op,
          a,
          b
        };
      }
      return a;
    }
    const e = expr();
    if (p < tk.length) throw new Error('Sintaxis inválida');
    return e;
  }
  const FUNCS = {
    sin: Math.sin,
    cos: Math.cos,
    tan: Math.tan,
    asin: Math.asin,
    acos: Math.acos,
    atan: Math.atan,
    exp: Math.exp,
    ln: Math.log,
    log: x => Math.log10 ? Math.log10(x) : Math.log(x) / Math.LN10,
    sqrt: Math.sqrt,
    abs: Math.abs,
    sinh: Math.sinh,
    cosh: Math.cosh,
    tanh: Math.tanh,
    cbrt: Math.cbrt
  };
  const CONSTS = {
    pi: Math.PI,
    e: Math.E,
    PI: Math.PI
  };
  function ev(node, x) {
    switch (node.k) {
      case 'num':
        return node.v;
      case 'var':
        if (node.name === 'x') return x;
        if (node.name in CONSTS) return CONSTS[node.name];
        throw new Error("Variable desconocida: " + node.name);
      case 'unary':
        return node.op === '-' ? -ev(node.a, x) : ev(node.a, x);
      case 'bin':
        {
          const a = ev(node.a, x),
            b = ev(node.b, x);
          return node.op === '+' ? a + b : node.op === '-' ? a - b : node.op === '*' ? a * b : node.op === '/' ? a / b : Math.pow(a, b);
        }
      case 'call':
        {
          const f = FUNCS[node.name];
          if (!f) throw new Error("Función desconocida: " + node.name);
          return f(...node.args.map(a => ev(a, x)));
        }
    }
  }
  /** Compile an expression string into { f, error }. f(x) -> number. */
  function compile(src) {
    try {
      const ast = parse(src);
      const f = x => ev(ast, x);
      f(1);
      return {
        f,
        ast,
        error: null
      };
    } catch (e) {
      return {
        f: null,
        ast: null,
        error: e.message
      };
    }
  }
  const deriv = (f, x, h = 1e-6) => (f(x + h) - f(x - h)) / (2 * h);

  // ---- Symbolic differentiation (best-effort, for the f'(x) display) ------
  const N = v => ({
    k: 'num',
    v
  });
  const isN = (n, v) => n.k === 'num' && (v === undefined || n.v === v);
  function add(a, b) {
    if (isN(a, 0)) return b;
    if (isN(b, 0)) return a;
    if (a.k === 'num' && b.k === 'num') return N(a.v + b.v);
    return {
      k: 'bin',
      op: '+',
      a,
      b
    };
  }
  function sub(a, b) {
    if (isN(b, 0)) return a;
    if (a.k === 'num' && b.k === 'num') return N(a.v - b.v);
    return {
      k: 'bin',
      op: '-',
      a,
      b
    };
  }
  function mul(a, b) {
    if (isN(a, 0) || isN(b, 0)) return N(0);
    if (isN(a, 1)) return b;
    if (isN(b, 1)) return a;
    if (a.k === 'num' && b.k === 'num') return N(a.v * b.v);
    return {
      k: 'bin',
      op: '*',
      a,
      b
    };
  }
  function div(a, b) {
    if (isN(a, 0)) return N(0);
    if (isN(b, 1)) return a;
    return {
      k: 'bin',
      op: '/',
      a,
      b
    };
  }
  function pow(a, b) {
    return {
      k: 'bin',
      op: '^',
      a,
      b
    };
  }
  function call(name, a) {
    return {
      k: 'call',
      name,
      args: [a]
    };
  }
  function diff(n) {
    switch (n.k) {
      case 'num':
        return N(0);
      case 'var':
        return n.name === 'x' ? N(1) : N(0);
      case 'unary':
        return n.op === '-' ? {
          k: 'unary',
          op: '-',
          a: diff(n.a)
        } : diff(n.a);
      case 'bin':
        {
          const {
              op,
              a,
              b
            } = n,
            da = diff(a),
            db = diff(b);
          if (op === '+') return add(da, db);
          if (op === '-') return sub(da, db);
          if (op === '*') return add(mul(da, b), mul(a, db));
          if (op === '/') return div(sub(mul(da, b), mul(a, db)), pow(b, N(2)));
          if (op === '^') {
            if (b.k === 'num') return mul(mul(b, pow(a, N(b.v - 1))), da); // power rule
            // general: f^g, derivative = f^g (g' ln f + g f'/f)
            return mul(pow(a, b), add(mul(db, call('ln', a)), div(mul(b, da), a)));
          }
          return N(0);
        }
      case 'call':
        {
          const u = n.args[0],
            du = diff(u);
          switch (n.name) {
            case 'sin':
              return mul(call('cos', u), du);
            case 'cos':
              return mul({
                k: 'unary',
                op: '-',
                a: call('sin', u)
              }, du);
            case 'tan':
              return div(du, pow(call('cos', u), N(2)));
            case 'exp':
              return mul(call('exp', u), du);
            case 'ln':
              return div(du, u);
            case 'log':
              return div(du, mul(u, N(Math.LN10)));
            case 'sqrt':
              return div(du, mul(N(2), call('sqrt', u)));
            case 'sinh':
              return mul(call('cosh', u), du);
            case 'cosh':
              return mul(call('sinh', u), du);
            default:
              return N(0);
          }
        }
    }
    return N(0);
  }
  function stringify(n, parentPrec = 0) {
    const PREC = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2,
      '^': 3
    };
    let s,
      prec = 4;
    switch (n.k) {
      case 'num':
        s = (+n.v.toFixed(6)).toString();
        break;
      case 'var':
        s = n.name;
        break;
      case 'unary':
        s = '-' + stringify(n.a, 3);
        prec = 2;
        break;
      case 'call':
        s = n.name + '(' + stringify(n.args[0], 0) + ')';
        break;
      case 'bin':
        {
          prec = PREC[n.op];
          const ops = n.op === '*' ? '·' : n.op;
          s = stringify(n.a, prec) + ' ' + ops + ' ' + stringify(n.b, prec + (n.op === '-' || n.op === '/' ? 1 : 0));
          if (n.op === '^') s = stringify(n.a, 4) + '^' + stringify(n.b, 4);
          break;
        }
    }
    return prec < parentPrec ? '(' + s + ')' : s;
  }
  function symbolicDeriv(src) {
    try {
      const ast = parse(src);
      const d = diff(ast);
      return {
        str: stringify(d),
        error: null
      };
    } catch (e) {
      return {
        str: null,
        error: e.message
      };
    }
  }

  // ---- Solvers: return array of step rows --------------------------------
  function bisection(f, a, b, tol, maxIter) {
    const rows = [];
    let fa = f(a),
      fb = f(b);
    if (Number.isNaN(fa) || Number.isNaN(fb)) return {
      rows,
      status: 'error',
      message: 'f no definida en los extremos'
    };
    if (fa * fb > 0) return {
      rows,
      status: 'no-bracket',
      message: 'No hay cambio de signo en [a, b]'
    };
    let c = a,
      prev = a;
    for (let n = 1; n <= maxIter; n++) {
      c = (a + b) / 2;
      const fc = f(c);
      const absErr = Math.abs(b - a) / 2;
      const relErr = c !== 0 ? Math.abs(absErr / c) : absErr;
      const converged = absErr < tol || Math.abs(fc) < tol;
      rows.push({
        n,
        x: c,
        fx: fc,
        absError: absErr,
        relError: relErr,
        a,
        b,
        mid: c,
        converged
      });
      if (converged) return {
        rows,
        status: 'converged',
        root: c,
        message: 'Convergió'
      };
      if (fa * fc < 0) {
        b = c;
        fb = fc;
      } else {
        a = c;
        fa = fc;
      }
      prev = c;
    }
    return {
      rows,
      status: 'max-iter',
      root: c,
      message: 'Máx. iteraciones alcanzado'
    };
  }
  function newton(f, x0, tol, maxIter) {
    const rows = [];
    let x = x0;
    for (let n = 1; n <= maxIter; n++) {
      const fx = f(x),
        d = deriv(f, x);
      if (!isFinite(fx) || Number.isNaN(fx)) return {
        rows,
        status: 'error',
        message: 'f no definida en x'
      };
      if (Math.abs(d) < 1e-12) return {
        rows,
        status: 'flat',
        message: "f'(x) ≈ 0 — tangente horizontal",
        root: x
      };
      const xn = x - fx / d;
      const absErr = Math.abs(xn - x);
      const relErr = xn !== 0 ? Math.abs(absErr / xn) : absErr;
      const converged = absErr < tol || Math.abs(fx) < tol;
      rows.push({
        n,
        x,
        xNext: xn,
        fx,
        deriv: d,
        absError: absErr,
        relError: relErr,
        converged
      });
      if (converged) return {
        rows,
        status: 'converged',
        root: xn,
        message: 'Convergió'
      };
      x = xn;
    }
    return {
      rows,
      status: 'max-iter',
      root: x,
      message: 'Máx. iteraciones alcanzado'
    };
  }
  // Pretty-print derivative AST symbolically (best-effort; falls back to numeric note)
  window.CVG = Object.assign(window.CVG || {}, {
    compile,
    deriv,
    symbolicDeriv,
    bisection,
    newton
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/converge-app/engine.js", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.IterationTable = __ds_scope.IterationTable;

__ds_ns.StatPill = __ds_scope.StatPill;

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.NumberField = __ds_scope.NumberField;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Slider = __ds_scope.Slider;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
