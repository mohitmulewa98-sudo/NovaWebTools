/* ============================================================
   converter-tools.js — Length Converter, Temperature Converter
   ============================================================ */
import { $ } from '../utils.js';

export const converterTools = {};

/* ---- 16. Length Converter ---- */
converterTools['length-convert'] = {
  html:`
    <div class="row">
      <div class="field"><label>Value</label><input type="number" id="lenValue" value="1"></div>
      <div class="field"><label>From</label><select id="lenFrom"></select></div>
      <div class="field"><label>To</label><select id="lenTo"></select></div>
    </div>
    <div class="output-box" id="lenOutput" style="text-align:center; font-size:1.1rem;">—</div>`,
  init(){
    const units = { mm:0.001, cm:0.01, m:1, km:1000, in:0.0254, ft:0.3048, yd:0.9144, mi:1609.34 };
    const fromSel = $('#lenFrom'), toSel = $('#lenTo');
    Object.keys(units).forEach(u=>{
      fromSel.innerHTML += `<option value="${u}">${u}</option>`;
      toSel.innerHTML += `<option value="${u}">${u}</option>`;
    });
    toSel.value = 'ft';
    function update(){
      const v = parseFloat($('#lenValue').value);
      if(isNaN(v)){ $('#lenOutput').textContent='—'; return; }
      const meters = v * units[fromSel.value];
      const result = meters / units[toSel.value];
      $('#lenOutput').textContent = `${v} ${fromSel.value} = ${result.toFixed(5).replace(/\.?0+$/,'')} ${toSel.value}`;
    }
    [$('#lenValue'), fromSel, toSel].forEach(el=>el.addEventListener('input', update));
    update();
  }
};

/* ---- 17. Temperature Converter ---- */
converterTools['temp-convert'] = {
  html:`
    <div class="row">
      <div class="field"><label>Value</label><input type="number" id="tempValue" value="0"></div>
      <div class="field"><label>From</label><select id="tempFrom"><option value="C">Celsius</option><option value="F">Fahrenheit</option><option value="K">Kelvin</option></select></div>
    </div>
    <div class="stat-grid">
      <div class="stat"><div class="num" id="tempC">—</div><div class="lab">Celsius</div></div>
      <div class="stat"><div class="num" id="tempF">—</div><div class="lab">Fahrenheit</div></div>
      <div class="stat"><div class="num" id="tempK">—</div><div class="lab">Kelvin</div></div>
    </div>`,
  init(){
    function update(){
      const v = parseFloat($('#tempValue').value);
      if(isNaN(v)){ return; }
      const from = $('#tempFrom').value;
      let c;
      if(from==='C') c = v;
      else if(from==='F') c = (v-32)*5/9;
      else c = v-273.15;
      $('#tempC').textContent = c.toFixed(1);
      $('#tempF').textContent = (c*9/5+32).toFixed(1);
      $('#tempK').textContent = (c+273.15).toFixed(1);
    }
    $('#tempValue').addEventListener('input', update);
    $('#tempFrom').addEventListener('input', update);
    update();
  }
};
