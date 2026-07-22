/* ============================================================
   developer-tools.js — JSON Formatter, Base64, URL Encoder,
   Password Generator, Color Converter
   ============================================================ */
import { $, copyToClipboard } from '../utils.js';

export const developerTools = {};

/* ---- 7. JSON Formatter ---- */
developerTools['json-formatter'] = {
  html:`
    <div class="field"><label>Paste JSON</label><textarea id="jsonInput" placeholder='{"name":"Nova","tools":20}'></textarea></div>
    <div class="btn-row">
      <button class="btn" id="jsonFormat">Format</button>
      <button class="btn secondary" id="jsonMinify">Minify</button>
    </div>
    <div class="output-box" id="jsonOutput">Output will appear here…</div>
    <div class="btn-row"><button class="btn secondary" id="jsonCopy">Copy result</button></div>`,
  init(){
    function run(minify){
      try{
        const parsed = JSON.parse($('#jsonInput').value);
        $('#jsonOutput').textContent = minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2);
        $('#jsonOutput').style.color = 'var(--good)';
        $('#jsonOutput').style.color = '';
      }catch(err){
        $('#jsonOutput').textContent = '⚠ Invalid JSON: ' + err.message;
      }
    }
    $('#jsonFormat').addEventListener('click', ()=>run(false));
    $('#jsonMinify').addEventListener('click', ()=>run(true));
    $('#jsonCopy').addEventListener('click', e=>copyToClipboard($('#jsonOutput').textContent, e.target));
  }
};

/* ---- 8. Base64 ---- */
developerTools['base64'] = {
  html:`
    <div class="field"><label>Input</label><textarea id="b64Input" placeholder="Type text or Base64…"></textarea></div>
    <div class="btn-row">
      <button class="btn" id="b64Encode">Encode</button>
      <button class="btn secondary" id="b64Decode">Decode</button>
    </div>
    <div class="output-box" id="b64Output">Output will appear here…</div>
    <div class="btn-row"><button class="btn secondary" id="b64Copy">Copy result</button></div>`,
  init(){
    $('#b64Encode').addEventListener('click', ()=>{
      try{ $('#b64Output').textContent = btoa(unescape(encodeURIComponent($('#b64Input').value))); }
      catch(e){ $('#b64Output').textContent = '⚠ Could not encode input.'; }
    });
    $('#b64Decode').addEventListener('click', ()=>{
      try{ $('#b64Output').textContent = decodeURIComponent(escape(atob($('#b64Input').value.trim()))); }
      catch(e){ $('#b64Output').textContent = '⚠ Invalid Base64 string.'; }
    });
    $('#b64Copy').addEventListener('click', e=>copyToClipboard($('#b64Output').textContent, e.target));
  }
};

/* ---- 9. URL Encoder/Decoder ---- */
developerTools['url-encode'] = {
  html:`
    <div class="field"><label>Input</label><textarea id="urlInput" placeholder="https://example.com/?q=hello world"></textarea></div>
    <div class="btn-row">
      <button class="btn" id="urlEncode">Encode</button>
      <button class="btn secondary" id="urlDecode">Decode</button>
    </div>
    <div class="output-box" id="urlOutput">Output will appear here…</div>
    <div class="btn-row"><button class="btn secondary" id="urlCopy">Copy result</button></div>`,
  init(){
    $('#urlEncode').addEventListener('click', ()=>{ $('#urlOutput').textContent = encodeURIComponent($('#urlInput').value); });
    $('#urlDecode').addEventListener('click', ()=>{
      try{ $('#urlOutput').textContent = decodeURIComponent($('#urlInput').value); }
      catch(e){ $('#urlOutput').textContent = '⚠ Could not decode input.'; }
    });
    $('#urlCopy').addEventListener('click', e=>copyToClipboard($('#urlOutput').textContent, e.target));
  }
};

/* ---- 10. Password Generator ---- */
developerTools['password-gen'] = {
  html:`
    <div class="field"><label>Length: <span id="pwLenLabel">16</span></label><input type="range" id="pwLen" min="6" max="48" value="16" style="width:100%;"></div>
    <div class="switch-row"><input type="checkbox" id="pwUpper" checked> <label style="margin:0;">Uppercase (A–Z)</label></div>
    <div class="switch-row"><input type="checkbox" id="pwLower" checked> <label style="margin:0;">Lowercase (a–z)</label></div>
    <div class="switch-row"><input type="checkbox" id="pwDigits" checked> <label style="margin:0;">Digits (0–9)</label></div>
    <div class="switch-row"><input type="checkbox" id="pwSymbols"> <label style="margin:0;">Symbols (!@#$…)</label></div>
    <div class="btn-row"><button class="btn" id="pwGen">Generate password</button></div>
    <div class="output-box" id="pwOutput" style="font-size:1.05rem; text-align:center;">Click generate…</div>
    <div class="btn-row"><button class="btn secondary" id="pwCopy">Copy password</button></div>`,
  init(){
    const lenInput = $('#pwLen');
    lenInput.addEventListener('input', ()=>{ $('#pwLenLabel').textContent = lenInput.value; });
    $('#pwGen').addEventListener('click', ()=>{
      const U='ABCDEFGHIJKLMNOPQRSTUVWXYZ', L='abcdefghijklmnopqrstuvwxyz', D='0123456789', S='!@#$%^&*()_+-=[]{}';
      let pool = '';
      if($('#pwUpper').checked) pool+=U;
      if($('#pwLower').checked) pool+=L;
      if($('#pwDigits').checked) pool+=D;
      if($('#pwSymbols').checked) pool+=S;
      if(!pool){ $('#pwOutput').textContent = 'Select at least one character type.'; return; }
      const len = parseInt(lenInput.value);
      let pass = '';
      const rand = new Uint32Array(len);
      crypto.getRandomValues(rand);
      for(let i=0;i<len;i++) pass += pool[rand[i]%pool.length];
      $('#pwOutput').textContent = pass;
    });
    $('#pwCopy').addEventListener('click', e=>copyToClipboard($('#pwOutput').textContent, e.target));
  }
};

/* ---- 11. Color Converter ---- */
developerTools['color-converter'] = {
  html:`
    <div class="row">
      <div class="field"><label>Pick a color</label><input type="color" id="colorPick" value="#ffb347" style="height:44px; padding:4px;"></div>
      <div class="field"><label>Hex</label><input type="text" id="colorHex" value="#ffb347"></div>
    </div>
    <div class="swatch" id="colorSwatch" style="background:#ffb347;"></div>
    <div class="stat-grid">
      <div class="stat"><div class="num" id="colorRgb" style="font-size:.95rem;">—</div><div class="lab">RGB</div></div>
      <div class="stat"><div class="num" id="colorHsl" style="font-size:.95rem;">—</div><div class="lab">HSL</div></div>
    </div>`,
  init(){
    function hexToRgb(hex){
      const m = hex.replace('#','').match(/.{1,2}/g);
      if(!m || m.length<3) return null;
      return m.slice(0,3).map(x=>parseInt(x,16));
    }
    function rgbToHsl(r,g,b){
      r/=255; g/=255; b/=255;
      const max=Math.max(r,g,b), min=Math.min(r,g,b);
      let h,s,l=(max+min)/2;
      if(max===min){ h=s=0; }
      else{
        const d=max-min;
        s = l>0.5 ? d/(2-max-min) : d/(max+min);
        switch(max){
          case r: h=(g-b)/d+(g<b?6:0); break;
          case g: h=(b-r)/d+2; break;
          case b: h=(r-g)/d+4; break;
        }
        h/=6;
      }
      return [Math.round(h*360), Math.round(s*100), Math.round(l*100)];
    }
    function update(hex){
      if(!/^#([0-9a-f]{6})$/i.test(hex)) return;
      const rgb = hexToRgb(hex);
      if(!rgb) return;
      const hsl = rgbToHsl(...rgb);
      $('#colorSwatch').style.background = hex;
      $('#colorRgb').textContent = `rgb(${rgb.join(', ')})`;
      $('#colorHsl').textContent = `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
    }
    $('#colorPick').addEventListener('input', e=>{ $('#colorHex').value = e.target.value; update(e.target.value); });
    $('#colorHex').addEventListener('input', e=>{
      let v = e.target.value.trim();
      if(!v.startsWith('#')) v = '#'+v;
      if(/^#([0-9a-f]{6})$/i.test(v)){ $('#colorPick').value = v; update(v); }
    });
    update('#ffb347');
  }
};
