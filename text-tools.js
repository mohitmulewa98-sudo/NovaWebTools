/* ============================================================
   text-tools.js — Word Counter, Character Counter, Case Converter,
   Text Reverser, Lorem Ipsum Generator, Duplicate Line Remover
   ============================================================ */
import { $, $all, copyToClipboard } from '../utils.js';

export const textTools = {};

/* ---- 1. Word Counter ---- */
textTools['word-counter'] = {
  html:`
    <div class="field"><label>Paste or type your text</label><textarea id="wcInput" placeholder="Start typing..."></textarea></div>
    <div class="stat-grid">
      <div class="stat"><div class="num" id="wcWords">0</div><div class="lab">Words</div></div>
      <div class="stat"><div class="num" id="wcSentences">0</div><div class="lab">Sentences</div></div>
      <div class="stat"><div class="num" id="wcParas">0</div><div class="lab">Paragraphs</div></div>
      <div class="stat"><div class="num" id="wcTime">0s</div><div class="lab">Reading time</div></div>
    </div>`,
  init(){
    const input = $('#wcInput');
    input.addEventListener('input', ()=>{
      const text = input.value;
      const words = (text.match(/\S+/g)||[]).length;
      const sentences = (text.match(/[.!?]+(\s|$)/g)||[]).length;
      const paras = text.split(/\n+/).filter(p=>p.trim().length>0).length;
      const minutes = words/200;
      const timeLabel = minutes < 1 ? Math.round(minutes*60)+'s' : minutes.toFixed(1)+'m';
      $('#wcWords').textContent = words;
      $('#wcSentences').textContent = sentences;
      $('#wcParas').textContent = paras;
      $('#wcTime').textContent = words? timeLabel : '0s';
    });
  }
};

/* ---- 2. Character Counter ---- */
textTools['char-counter'] = {
  html:`
    <div class="field"><label>Text</label><textarea id="ccInput" placeholder="Start typing..."></textarea></div>
    <div class="stat-grid">
      <div class="stat"><div class="num" id="ccWith">0</div><div class="lab">With spaces</div></div>
      <div class="stat"><div class="num" id="ccWithout">0</div><div class="lab">Without spaces</div></div>
      <div class="stat"><div class="num" id="ccBytes">0</div><div class="lab">Bytes (UTF-8)</div></div>
    </div>`,
  init(){
    const input = $('#ccInput');
    input.addEventListener('input', ()=>{
      const text = input.value;
      $('#ccWith').textContent = text.length;
      $('#ccWithout').textContent = text.replace(/\s/g,'').length;
      $('#ccBytes').textContent = new Blob([text]).size;
    });
  }
};

/* ---- 3. Case Converter ---- */
textTools['case-converter'] = {
  html:`
    <div class="field"><label>Text</label><textarea id="caseInput" placeholder="Start typing..."></textarea></div>
    <div class="btn-row">
      <button class="btn secondary" data-mode="upper">UPPERCASE</button>
      <button class="btn secondary" data-mode="lower">lowercase</button>
      <button class="btn secondary" data-mode="title">Title Case</button>
      <button class="btn secondary" data-mode="sentence">Sentence case</button>
      <button class="btn secondary" data-mode="camel">camelCase</button>
      <button class="btn secondary" data-mode="snake">snake_case</button>
    </div>
    <div class="output-box" id="caseOutput">Output will appear here…</div>
    <div class="btn-row"><button class="btn" id="caseCopy">Copy result</button></div>`,
  init(){
    const input = $('#caseInput');
    const out = $('#caseOutput');
    $all('[data-mode]').forEach(b=>{
      b.addEventListener('click', ()=>{
        const t = input.value;
        let r = t;
        if(b.dataset.mode==='upper') r = t.toUpperCase();
        else if(b.dataset.mode==='lower') r = t.toLowerCase();
        else if(b.dataset.mode==='title') r = t.replace(/\w\S*/g, w=>w[0].toUpperCase()+w.slice(1).toLowerCase());
        else if(b.dataset.mode==='sentence') r = t.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c=>c.toUpperCase());
        else if(b.dataset.mode==='camel') r = t.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m,c)=>c.toUpperCase());
        else if(b.dataset.mode==='snake') r = t.toLowerCase().trim().replace(/[^a-z0-9]+/g,'_').replace(/^_+|_+$/g,'');
        out.textContent = r || '—';
      });
    });
    $('#caseCopy').addEventListener('click', e=>copyToClipboard(out.textContent, e.target));
  }
};

/* ---- 4. Text Reverser ---- */
textTools['text-reverser'] = {
  html:`
    <div class="field"><label>Text</label><textarea id="revInput" placeholder="Start typing..."></textarea></div>
    <div class="btn-row">
      <button class="btn secondary" id="revChars">Reverse characters</button>
      <button class="btn secondary" id="revWords">Reverse word order</button>
    </div>
    <div class="output-box" id="revOutput">Output will appear here…</div>
    <div class="btn-row"><button class="btn" id="revCopy">Copy result</button></div>`,
  init(){
    const input = $('#revInput'); const out = $('#revOutput');
    $('#revChars').addEventListener('click', ()=>{ out.textContent = input.value.split('').reverse().join('') || '—'; });
    $('#revWords').addEventListener('click', ()=>{ out.textContent = input.value.split(/\s+/).filter(Boolean).reverse().join(' ') || '—'; });
    $('#revCopy').addEventListener('click', e=>copyToClipboard(out.textContent, e.target));
  }
};

/* ---- 5. Lorem Ipsum Generator ---- */
textTools['lorem-ipsum'] = {
  html:`
    <div class="row">
      <div class="field"><label>Type</label>
        <select id="loremType"><option value="paragraphs">Paragraphs</option><option value="sentences">Sentences</option><option value="words">Words</option></select>
      </div>
      <div class="field"><label>Amount</label><input type="number" id="loremAmount" value="3" min="1" max="50"></div>
    </div>
    <div class="btn-row"><button class="btn" id="loremGen">Generate</button></div>
    <div class="output-box" id="loremOutput">Click generate…</div>
    <div class="btn-row"><button class="btn secondary" id="loremCopy">Copy result</button></div>`,
  init(){
    const WORDS = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(' ');
    function randWords(n){ let arr=[]; for(let i=0;i<n;i++) arr.push(WORDS[Math.floor(Math.random()*WORDS.length)]); return arr; }
    function sentence(){ const n = 6+Math.floor(Math.random()*8); const w = randWords(n); w[0] = w[0][0].toUpperCase()+w[0].slice(1); return w.join(' ')+'.'; }
    function paragraph(){ const n = 4+Math.floor(Math.random()*3); let s=[]; for(let i=0;i<n;i++) s.push(sentence()); return s.join(' '); }
    $('#loremGen').addEventListener('click', ()=>{
      const type = $('#loremType').value;
      const amt = Math.max(1, Math.min(50, parseInt($('#loremAmount').value)||1));
      let result = '';
      if(type==='paragraphs'){ let p=[]; for(let i=0;i<amt;i++) p.push(paragraph()); result = p.join('\n\n'); }
      else if(type==='sentences'){ let s=[]; for(let i=0;i<amt;i++) s.push(sentence()); result = s.join(' '); }
      else { result = randWords(amt).join(' '); }
      $('#loremOutput').textContent = result;
    });
    $('#loremCopy').addEventListener('click', e=>copyToClipboard($('#loremOutput').textContent, e.target));
  }
};

/* ---- 6. Duplicate Line Remover ---- */
textTools['dedupe-lines'] = {
  html:`
    <div class="field"><label>Lines (one item per line)</label><textarea id="dedupeInput" placeholder="apple&#10;banana&#10;apple&#10;cherry"></textarea></div>
    <div class="switch-row"><input type="checkbox" id="dedupeSort"> <label style="margin:0;">Also sort alphabetically</label></div>
    <div class="btn-row"><button class="btn" id="dedupeGo">Remove duplicates</button></div>
    <div class="output-box" id="dedupeOutput">Output will appear here…</div>
    <div class="btn-row"><button class="btn secondary" id="dedupeCopy">Copy result</button></div>`,
  init(){
    $('#dedupeGo').addEventListener('click', ()=>{
      let lines = $('#dedupeInput').value.split('\n').map(l=>l.trim()).filter(l=>l.length>0);
      lines = [...new Set(lines)];
      if($('#dedupeSort').checked) lines.sort((a,b)=>a.localeCompare(b));
      $('#dedupeOutput').textContent = lines.join('\n') || '—';
    });
    $('#dedupeCopy').addEventListener('click', e=>copyToClipboard($('#dedupeOutput').textContent, e.target));
  }
};
