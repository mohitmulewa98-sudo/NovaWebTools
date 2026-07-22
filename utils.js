/* ============================================================
   utils.js — Shared helpers used across the app and all tools
   ============================================================ */

/* ============ ICONS (inline SVG paths, stroke style) ============ */
export const ICONS = {
  text:'<path d="M4 6h16M4 12h10M4 18h7"/>',
  hash:'<path d="M5 9h14M5 15h14M10 4L7 20M17 4l-3 16"/>',
  case:'<path d="M4 20l4-14 4 14M6 14h4M14 8h5a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-5v6h5a2 2 0 0 0 2-2"/>',
  reverse:'<path d="M17 3l4 4-4 4M21 7H9a4 4 0 0 0-4 4v0M7 21l-4-4 4-4M3 17h12a4 4 0 0 0 4-4v0"/>',
  lorem:'<path d="M4 5h16M4 9h16M4 13h10M4 17h13"/>',
  dedupe:'<path d="M4 4h10v10H4zM10 10h10v10H10z"/>',
  json:'<path d="M8 3a3 3 0 0 0-3 3v3a2 2 0 0 1-2 2 2 2 0 0 1 2 2v3a3 3 0 0 0 3 3M16 3a3 3 0 0 1 3 3v3a2 2 0 0 0 2 2 2 2 0 0 0-2 2v3a3 3 0 0 1-3 3"/>',
  base64:'<path d="M9 3H5a2 2 0 0 0-2 2v4M9 21H5a2 2 0 0 1-2-2v-4M15 3h4a2 2 0 0 1 2 2v4M15 21h4a2 2 0 0 0 2-2v-4"/><path d="M8 12h8"/>',
  link:'<path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07L11.5 4.5M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 0 0 7.07 7.07L12.5 19.5"/>',
  key:'<circle cx="8" cy="15" r="4"/><path d="M10.5 12.5L20 3M17 6l3 3M14 9l2 2"/>',
  palette:'<circle cx="12" cy="12" r="9"/><circle cx="8.5" cy="10" r="1.2" fill="currentColor" stroke="none"/><circle cx="12" cy="7.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="15.5" cy="10" r="1.2" fill="currentColor" stroke="none"/><circle cx="10" cy="14.5" r="1.2" fill="currentColor" stroke="none"/>',
  calc:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01"/>',
  bmi:'<path d="M12 2v4M12 18v4M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/><circle cx="12" cy="12" r="5"/>',
  age:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/>',
  percent:'<path d="M19 5L5 19"/><circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/>',
  ruler:'<path d="M3 16l5-5 12 12-5 5z"/><path d="M14.5 6.5l3 3M11 10l2 2M7.5 13.5l2 2"/>',
  temp:'<path d="M10 13.5V4a2 2 0 0 1 4 0v9.5a4 4 0 1 1-4 0z"/>',
  dice:'<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.3" fill="currentColor" stroke="none"/><circle cx="16" cy="8" r="1.3" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="8" cy="16" r="1.3" fill="currentColor" stroke="none"/><circle cx="16" cy="16" r="1.3" fill="currentColor" stroke="none"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>',
  todo:'<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 12l2.5 2.5L16 9"/>',
  copy:'<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  shuffle:'<path d="M2 5h4l6 14h6M2 19h4l3.5-8M14 5h6l0 0M17 2l3 3-3 3M17 16l3 3-3 3"/>'
};

export function svg(name, extra=''){
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${extra}>${ICONS[name]||''}</svg>`;
}

/* ============ DOM helpers scoped to the modal body ============ */
/* Every tool renders inside #modalBody, so these helpers query      */
/* within it — mirroring the original inline `$(sel)` behaviour.     */
export function $(sel){
  const modalBody = document.getElementById('modalBody');
  return modalBody ? modalBody.querySelector(sel) : null;
}
export function $all(sel){
  const modalBody = document.getElementById('modalBody');
  return modalBody ? modalBody.querySelectorAll(sel) : [];
}
export function modalBodyEl(){
  return document.getElementById('modalBody');
}

/* ============ Clipboard helper ============ */
export function copyToClipboard(text, btn){
  navigator.clipboard.writeText(text).then(()=>{
    if(btn){ const old = btn.textContent; btn.textContent = 'Copied!'; setTimeout(()=>btn.textContent=old, 1200); }
  }).catch(()=>{});
}

/* ============ Shared mutable app state ============ */
/* activeInterval is used by the Stopwatch tool and cleared by the   */
/* modal when it closes, so it lives in one shared place.            */
export const state = {
  activeInterval: null
};
