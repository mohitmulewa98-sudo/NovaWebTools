/* ============================================================
   modal.js — Modal open/close plumbing
   ============================================================ */
import { svg, state } from './utils.js';
import { CATS, TOOLS, TOOL_RENDER } from './tools.js';

const modalOverlay = document.getElementById('modalOverlay');
const modalHead = document.getElementById('modalHead');
const modalIconWrap = document.getElementById('modalIconWrap');
const modalCatLabel = document.getElementById('modalCatLabel');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');

export function closeModal(){
  modalOverlay.classList.remove('open');
  if(state.activeInterval){ clearInterval(state.activeInterval); state.activeInterval = null; }
  modalBody.innerHTML = '';
}

export function openTool(id){
  const tool = TOOLS.find(t=>t.id===id);
  if(!tool) return;
  const cat = CATS[tool.cat];
  modalHead.style.setProperty('--accent', cat.color);
  modalIconWrap.style.setProperty('--accent', cat.color);
  modalIconWrap.innerHTML = svg(tool.icon);
  modalCatLabel.textContent = cat.label;
  modalTitle.textContent = tool.name;
  const def = TOOL_RENDER[id];
  modalBody.innerHTML = def.html;
  modalOverlay.classList.add('open');
  if(def.init) def.init();
}

export function initModal(){
  document.getElementById('modalClose').addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', e=>{ if(e.target===modalOverlay) closeModal(); });
  document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeModal(); });
}
