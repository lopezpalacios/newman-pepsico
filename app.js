/* GEPP × Newman — calculadora PPA + chart 20a + data room + reveals.
   Vanilla JS, sin dependencias. La calculadora es una aproximación indicativa;
   el modelo determinista completo vive en el Excel del data room. */
'use strict';

/* ---- Constantes ancladas al modelo (caso semilla reproduce las cifras base) ---- */
const M = {
  GEN: 13.06e6,      // kWh/año generación solar portafolio
  AVOID: 2.126,      // MXN/kWh — costo CFE evitado (blend), calibra base
  BESS0: 16.0e6,     // MXN/año — bolsa de ahorro BESS año 1
  OPEX: 7.67e6,      // MXN/año — O&M + admin (financiador)
  CAPEX: 134.7e6,    // MXN — inversión total (financiador en PPA)
  BUY0: 36.8e6,      // MXN/año — beneficio compra año 1 (referencia)
  PPA_ESC: 0.05,     // escalación PPA / ingreso financiador
  OPEX_ESC: 0.03
};
const PRESETS = { cliente: 1.45, base: 1.59, financiador: 1.78 };

const $ = id => document.getElementById(id);
const mxnM = n => '$' + (n / 1e6).toFixed(1) + 'M';
const mxnB = n => n >= 1e9 ? '$' + (n / 1e9).toFixed(2) + ' Bn' : mxnM(n);

/* TIR por bisección sobre flujos [t0<0, t1..tn] */
function irr(cf) {
  const npv = r => cf.reduce((s, c, t) => s + c / Math.pow(1 + r, t), 0);
  let lo = -0.9, hi = 1.5;
  if (npv(lo) * npv(hi) > 0) return null;
  for (let i = 0; i < 90; i++) {
    const mid = (lo + hi) / 2;
    if (npv(mid) > 0) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}

function compute() {
  const ppa = +$('PPA').value, plazo = +$('T').value,
        irrTgt = +$('IRR').value, comm = +$('C').value / 100, esc = +$('E').value / 100;

  $('vPPA').textContent = ppa.toFixed(2);
  $('vT').textContent = plazo;
  $('vIRR').textContent = irrTgt + '%';
  $('vC').textContent = Math.round(comm * 100) + '%';
  $('vE').textContent = (esc * 100).toFixed(0) + '%';

  // Beneficio cliente año 1: spread sobre energía PV + parte de ahorro BESS
  const cliYr1 = M.GEN * (M.AVOID - ppa) + M.BESS0 * (1 - comm);

  // Acumulado cliente 20 años: durante el plazo capta el spread (escala con CFE);
  // tras el plazo el PV se transfiere → capta el valor evitado completo.
  let cum = 0;
  for (let t = 1; t <= 20; t++) {
    const g = Math.pow(1 + esc, t - 1);
    cum += (t <= plazo ? cliYr1 : (M.GEN * M.AVOID + M.BESS0 * (1 - comm))) * g;
  }

  // TIR financiador resultante: ingreso PPA + comisión BESS − OPEX, sobre CAPEX
  const revYr1 = M.GEN * ppa + M.BESS0 * comm;
  const cf = [-M.CAPEX];
  for (let t = 1; t <= plazo; t++)
    cf.push(revYr1 * Math.pow(1 + M.PPA_ESC, t - 1) - M.OPEX * Math.pow(1 + M.OPEX_ESC, t - 1));
  const finIrr = irr(cf);

  $('oCli').textContent = mxnM(cliYr1);
  $('oCum').textContent = mxnB(cum);
  $('oBuy').textContent = mxnM(M.BUY0);
  $('oIRR').textContent = finIrr ? (finIrr * 100).toFixed(1) + '%' : '—';

  const gap = finIrr ? (finIrr * 100 - irrTgt).toFixed(1) : '—';
  $('calcNote').textContent =
    `Tarifa PPA ${ppa.toFixed(2)} MXN/kWh · plazo ${plazo}a · comisión BESS ${Math.round(comm * 100)}%. ` +
    `TIR financiador resultante ${finIrr ? (finIrr * 100).toFixed(1) : '—'}% vs objetivo ${irrTgt}% (Δ ${gap} pp). ` +
    `Subir la tarifa o el plazo favorece al financiador; bajarlos transfiere valor a GEPP. ` +
    `Aproximación indicativa — el modelo completo está en el data room.`;
}

/* presets */
document.querySelectorAll('.presets button').forEach(b => {
  b.addEventListener('click', () => {
    document.querySelectorAll('.presets button').forEach(x => x.classList.remove('on'));
    b.classList.add('on');
    $('PPA').value = PRESETS[b.dataset.p];
    compute();
  });
});
['PPA', 'T', 'IRR', 'C', 'E'].forEach(id => $(id).addEventListener('input', () => {
  document.querySelectorAll('.presets button').forEach(x => x.classList.remove('on'));
  compute();
}));
compute();

/* ---- Modelo real (Excel → JSON): chart 20a + tablas data room ---- */
let MODEL = null;
const num = v => typeof v === 'number';

fetch('data/model.json').then(r => r.json()).then(d => {
  MODEL = d;
  buildChart(d.proyeccion);
  drRender('resumen');
}).catch(() => { /* sin servidor de archivos, degrada en silencio */ });

function buildChart(rows) {
  // localizar columnas "Acum. Compra" y "Acum. Cliente PPA" + filas año 1..20
  const data = rows.filter(r => num(r[0]) && r[0] >= 1 && r[0] <= 20);
  const buy = data.map(r => r[7]), ppa = data.map(r => r[8]);
  const max = Math.max(...buy);
  const host = $('chart');
  if (!host) return;
  host.innerHTML = data.map((r, i) => `
    <div class="col" title="Año ${r[0]} — Compra ${mxnB(buy[i])} · PPA ${mxnB(ppa[i])}">
      <div class="bar buy" style="height:${(buy[i] / max * 100).toFixed(1)}%"></div>
      <div class="bar ppa" style="height:${(ppa[i] / max * 100).toFixed(1)}%"></div>
      <span class="yr">${r[0]}</span>
    </div>`).join('');
}

function drRender(tab) {
  if (!MODEL || !MODEL[tab]) return;
  const rows = MODEL[tab];
  // fila de encabezado = primera con ≥3 celdas no vacías
  let hi = rows.findIndex(r => r.filter(c => c !== '' && c != null).length >= 3);
  if (hi < 0) hi = 0;
  const pre = rows.slice(0, hi).map(r => r.filter(c => c !== '').join(' ')).filter(Boolean);
  const head = rows[hi], body = rows.slice(hi + 1);
  const th = head.map(c => `<th class="${num(c) ? 'num' : ''}">${c}</th>`).join('');
  const tr = body.map(r => {
    const total = String(r[0]).toUpperCase().includes('PORTAFOLIO') || String(r[0]).toUpperCase().startsWith('ACUM');
    const tds = r.map(c => `<td class="${num(c) ? 'num' : ''}">${num(c) ? c.toLocaleString('es-MX') : (c ?? '')}</td>`).join('');
    return `<tr class="${total ? 'total' : ''}">${tds}</tr>`;
  }).join('');
  $('drTable').innerHTML =
    pre.map(p => `<p class="muted" style="font-size:.82rem;margin:.2em 0">${p}</p>`).join('') +
    `<table><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table>`;
}

document.querySelectorAll('#drTabs button').forEach(b => {
  b.addEventListener('click', () => {
    document.querySelectorAll('#drTabs button').forEach(x => x.classList.remove('on'));
    b.classList.add('on');
    drRender(b.dataset.t);
  });
});

/* contadores animados (sección NUMBERS, estilo newman.re) */
function animateCount(el) {
  const to = +el.dataset.to, pre = el.dataset.pre || '', suf = el.dataset.suf || '',
        plain = el.dataset.plain === '1', dec = !plain && to % 1 !== 0 ? 1 : 0;
  const t0 = performance.now(), dur = 1400;
  function tick(now) {
    const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3), v = to * e;
    el.textContent = plain ? pre + Math.round(v) + suf
      : pre + v.toLocaleString('es-MX', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf;
    if (k < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const cio = new IntersectionObserver(es => {
  es.forEach(e => { if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); } });
}, { threshold: 0.5 });
document.querySelectorAll('#numbers .n').forEach(el => cio.observe(el));

/* formulario de contacto → mailto */
function contactSubmit(f) {
  const g = n => encodeURIComponent(f[n].value || '');
  const body = `Nombre: ${f.nombre.value}%0AEmpresa: ${f.empresa.value}%0A%0A${g('mensaje')}`;
  window.location.href = `mailto:jesus@lopezpalacios.com?subject=${encodeURIComponent('GEPP × Newman — ' + (f.empresa.value || 'Contacto'))}&body=${body}`;
  return false;
}
window.contactSubmit = contactSubmit;

/* reveals */
const io = new IntersectionObserver(es => {
  es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
