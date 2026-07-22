/* ============================================================
   search.js — Category chips, search box, and tool grid rendering
   ============================================================ */
import { svg } from './utils.js';
import { CATS, TOOLS } from './tools.js';
import { openTool } from './modal.js';

let activeCat = 'all';
let searchTerm = '';

export function initSearch(){
  const chipRow = document.getElementById('chipRow');
  const footerCats = document.getElementById('footerCats');
  const toolsContainer = document.getElementById('toolsContainer');
  const searchInput = document.getElementById('searchInput');
  const searchCount = document.getElementById('searchCount');

  function buildChips(){
    let html = `<button class="chip active" data-cat="all"><span class="dot" style="background:var(--flare)"></span>All tools</button>`;
    for(const key in CATS){
      html += `<button class="chip" data-cat="${key}"><span class="dot" style="background:${CATS[key].color}"></span>${CATS[key].label}</button>`;
    }
    chipRow.innerHTML = html;
    footerCats.innerHTML = Object.keys(CATS).map(k=>`<li><a href="#" data-cat-link="${k}">${CATS[k].label}</a></li>`).join('');

    chipRow.querySelectorAll('.chip').forEach(chip=>{
      chip.addEventListener('click', ()=>{
        activeCat = chip.dataset.cat;
        chipRow.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
        chip.classList.add('active');
        renderGrid();
      });
    });
    footerCats.querySelectorAll('[data-cat-link]').forEach(a=>{
      a.addEventListener('click', e=>{
        e.preventDefault();
        const key = a.dataset.catLink;
        activeCat = key;
        chipRow.querySelectorAll('.chip').forEach(c=>c.classList.toggle('active', c.dataset.cat===key));
        window.scrollTo({top:0, behavior:'smooth'});
        renderGrid();
      });
    });
  }

  function renderGrid(){
    const term = searchTerm.trim().toLowerCase();
    const filtered = TOOLS.filter(t=>{
      const matchesCat = activeCat==='all' || t.cat===activeCat;
      const matchesSearch = !term || t.name.toLowerCase().includes(term) || t.desc.toLowerCase().includes(term) || CATS[t.cat].label.toLowerCase().includes(term);
      return matchesCat && matchesSearch;
    });

    searchCount.textContent = term ? `${filtered.length} result${filtered.length!==1?'s':''}` : '';

    if(filtered.length===0){
      toolsContainer.innerHTML = `<div class="empty-state"><h3>No tools match "${searchTerm}"</h3><p>Try a different keyword or clear your search.</p></div>`;
      return;
    }

    let html = '';
    const grouped = {};
    filtered.forEach(t=>{ (grouped[t.cat] = grouped[t.cat]||[]).push(t); });

    Object.keys(CATS).forEach(catKey=>{
      if(!grouped[catKey]) return;
      const cat = CATS[catKey];
      html += `<section class="category-block" id="cat-${catKey}">
        <div class="category-head"><span class="dot" style="background:${cat.color}"></span><h2>${cat.label}</h2><span class="count">${grouped[catKey].length} tool${grouped[catKey].length!==1?'s':''}</span></div>
        <div class="grid">`;
      grouped[catKey].forEach(t=>{
        html += `<button class="card" style="--accent:${cat.color}" data-tool="${t.id}">
          <div class="icon-wrap">${svg(t.icon)}</div>
          <h3>${t.name}</h3>
          <p>${t.desc}</p>
          <span class="launch">Open tool ${svg('link','style="width:12px;height:12px"')}</span>
        </button>`;
      });
      html += `</div></section>`;
    });

    toolsContainer.innerHTML = html;
    toolsContainer.querySelectorAll('.card').forEach(card=>{
      card.addEventListener('click', ()=>openTool(card.dataset.tool));
    });
  }

  searchInput.addEventListener('input', e=>{ searchTerm = e.target.value; renderGrid(); });

  buildChips();
  renderGrid();
}
