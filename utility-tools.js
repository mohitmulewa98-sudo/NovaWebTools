/* ============================================================
   utility-tools.js — Random Number Generator, Stopwatch, To-Do List
   ============================================================ */
import { $, state } from './utils.js';

export const utilityTools = {};

/* ---- 18. Random Number Generator ---- */
utilityTools['random-number'] = {
  html:`
    <div class="row">
      <div class="field"><label>Min</label><input type="number" id="randMin" value="1"></div>
      <div class="field"><label>Max</label><input type="number" id="randMax" value="100"></div>
      <div class="field"><label>Count</label><input type="number" id="randCount" value="1" min="1" max="50"></div>
    </div>
    <div class="switch-row"><input type="checkbox" id="randUnique"> <label style="margin:0;">Unique values only</label></div>
    <div class="btn-row"><button class="btn" id="randGo">Generate</button></div>
    <div class="output-box" id="randOutput">Click generate…</div>`,
  init(){
    $('#randGo').addEventListener('click', ()=>{
      const min = parseInt($('#randMin').value), max = parseInt($('#randMax').value);
      const count = Math.max(1, Math.min(50, parseInt($('#randCount').value)||1));
      const unique = $('#randUnique').checked;
      if(isNaN(min)||isNaN(max)||min>=max){ $('#randOutput').textContent = 'Set a valid min < max.'; return; }
      if(unique && (max-min+1) < count){ $('#randOutput').textContent = 'Range too small for unique count.'; return; }
      let results = [];
      if(unique){
        const pool = [];
        for(let i=min;i<=max;i++) pool.push(i);
        for(let i=pool.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [pool[i],pool[j]]=[pool[j],pool[i]]; }
        results = pool.slice(0,count);
      } else {
        for(let i=0;i<count;i++) results.push(Math.floor(Math.random()*(max-min+1))+min);
      }
      $('#randOutput').textContent = results.join(', ');
    });
  }
};

/* ---- 19. Stopwatch ---- */
utilityTools['stopwatch'] = {
  html:`
    <div class="stopwatch-display" id="swDisplay">00:00.0</div>
    <div class="btn-row" style="justify-content:center;">
      <button class="btn" id="swStart">Start</button>
      <button class="btn secondary" id="swLap">Lap</button>
      <button class="btn ghost" id="swReset">Reset</button>
    </div>
    <div class="lap-list" id="swLaps"></div>`,
  init(){
    let elapsed = 0, running = false, laps = [];
    const display = $('#swDisplay');
    function format(ms){
      const m = Math.floor(ms/60000);
      const s = Math.floor((ms%60000)/1000);
      const t = Math.floor((ms%1000)/100);
      return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}.${t}`;
    }
    let startTs = 0;
    $('#swStart').addEventListener('click', ()=>{
      if(!running){
        running = true; startTs = Date.now()-elapsed;
        $('#swStart').textContent = 'Pause';
        state.activeInterval = setInterval(()=>{ elapsed = Date.now()-startTs; display.textContent = format(elapsed); }, 100);
      } else {
        running = false; $('#swStart').textContent = 'Start';
        clearInterval(state.activeInterval); state.activeInterval = null;
      }
    });
    $('#swLap').addEventListener('click', ()=>{
      if(!running) return;
      laps.unshift(format(elapsed));
      $('#swLaps').innerHTML = laps.map((l,i)=>`<div><span>Lap ${laps.length-i}</span><span>${l}</span></div>`).join('');
    });
    $('#swReset').addEventListener('click', ()=>{
      running = false; elapsed = 0; laps = [];
      clearInterval(state.activeInterval); state.activeInterval = null;
      display.textContent = format(0);
      $('#swStart').textContent = 'Start';
      $('#swLaps').innerHTML = '';
    });
  }
};

/* ---- 20. To-Do List ---- */
let todoItems = []; // session-only, resets on page reload
utilityTools['todo'] = {
  html:`
    <div class="row">
      <input type="text" id="todoInput" placeholder="Add a task…" style="flex:3;">
      <button class="btn" id="todoAdd" style="flex:1;">Add</button>
    </div>
    <div id="todoList" style="margin-top:14px;"></div>
    <p class="small-note">Tasks are kept for this browser session only.</p>`,
  init(){
    const list = $('#todoList');
    function render(){
      list.innerHTML = todoItems.map((item,i)=>`
        <div class="todo-item ${item.done?'done':''}">
          <input type="checkbox" data-i="${i}" class="todoCheck" ${item.done?'checked':''}>
          <span>${item.text}</span>
          <button data-i="${i}" class="todoDel">Remove</button>
        </div>`).join('') || '<p class="small-note">No tasks yet — add one above.</p>';
      list.querySelectorAll('.todoCheck').forEach(cb=>cb.addEventListener('change', ()=>{ todoItems[cb.dataset.i].done = cb.checked; render(); }));
      list.querySelectorAll('.todoDel').forEach(btn=>btn.addEventListener('click', ()=>{ todoItems.splice(btn.dataset.i,1); render(); }));
    }
    function add(){
      const input = $('#todoInput');
      const val = input.value.trim();
      if(!val) return;
      todoItems.push({text:val, done:false});
      input.value = '';
      render();
    }
    $('#todoAdd').addEventListener('click', add);
    $('#todoInput').addEventListener('keydown', e=>{ if(e.key==='Enter') add(); });
    render();
  }
};
