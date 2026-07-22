/* ============================================================
   calculator-tools.js — Calculator, BMI, Age, Percentage
   ============================================================ */
import { $, $all } from './utils.js';

export const calculatorTools = {};

/* ---- 12. Calculator ---- */
calculatorTools['calculator'] = {
  html:`
    <div class="output-box" id="calcDisplay" style="font-size:1.6rem; text-align:right; min-height:36px;">0</div>
    <div class="grid" style="grid-template-columns:repeat(4,1fr); margin-top:14px;">
      ${['7','8','9','÷','4','5','6','×','1','2','3','−','0','.','=','+'].map(k=>`<button class="btn ${['÷','×','−','+','='].includes(k)?'':'secondary'}" data-key="${k}" style="padding:16px; font-size:1.1rem;">${k}</button>`).join('')}
      <button class="btn ghost" data-key="C" style="grid-column:span 2;">Clear</button>
      <button class="btn ghost" data-key="⌫" style="grid-column:span 2;">Backspace</button>
    </div>`,
  init(){
    let expr = '';
    const display = $('#calcDisplay');
    function render(){ display.textContent = expr || '0'; }
    $all('[data-key]').forEach(b=>{
      b.addEventListener('click', ()=>{
        const k = b.dataset.key;
        if(k==='C'){ expr=''; }
        else if(k==='⌫'){ expr = expr.slice(0,-1); }
        else if(k==='='){
          try{
            const safe = expr.replace(/×/g,'*').replace(/÷/g,'/').replace(/−/g,'-');
            if(!/^[0-9+\-*/.()\s]+$/.test(safe)) throw new Error('bad');
            expr = String(Function('"use strict";return ('+safe+')')());
          }catch(e){ expr = 'Error'; }
        } else { expr = (expr==='Error'?'':expr) + k; }
        render();
      });
    });
    render();
  }
};

/* ---- 13. BMI Calculator ---- */
calculatorTools['bmi'] = {
  html:`
    <div class="row">
      <div class="field"><label>Height (cm)</label><input type="number" id="bmiHeight" placeholder="170"></div>
      <div class="field"><label>Weight (kg)</label><input type="number" id="bmiWeight" placeholder="65"></div>
    </div>
    <div class="btn-row"><button class="btn" id="bmiGo">Calculate BMI</button></div>
    <div class="stat-grid">
      <div class="stat"><div class="num" id="bmiValue">—</div><div class="lab">BMI</div></div>
      <div class="stat"><div class="num" id="bmiCat" style="font-size:1rem;">—</div><div class="lab">Category</div></div>
    </div>`,
  init(){
    $('#bmiGo').addEventListener('click', ()=>{
      const h = parseFloat($('#bmiHeight').value)/100;
      const w = parseFloat($('#bmiWeight').value);
      if(!h || !w || h<=0 || w<=0){ $('#bmiValue').textContent='—'; $('#bmiCat').textContent='Enter valid values'; return; }
      const bmi = w/(h*h);
      $('#bmiValue').textContent = bmi.toFixed(1);
      let cat = 'Obese';
      if(bmi<18.5) cat='Underweight';
      else if(bmi<25) cat='Healthy range';
      else if(bmi<30) cat='Overweight';
      $('#bmiCat').textContent = cat;
    });
  }
};

/* ---- 14. Age Calculator ---- */
calculatorTools['age-calc'] = {
  html:`
    <div class="field"><label>Date of birth</label><input type="date" id="ageInput"></div>
    <div class="btn-row"><button class="btn" id="ageGo">Calculate age</button></div>
    <div class="stat-grid">
      <div class="stat"><div class="num" id="ageYears">—</div><div class="lab">Years</div></div>
      <div class="stat"><div class="num" id="ageMonths">—</div><div class="lab">Months</div></div>
      <div class="stat"><div class="num" id="ageDays">—</div><div class="lab">Days</div></div>
    </div>`,
  init(){
    $('#ageGo').addEventListener('click', ()=>{
      const val = $('#ageInput').value;
      if(!val) return;
      const dob = new Date(val);
      const now = new Date();
      if(dob > now){ $('#ageYears').textContent='—'; $('#ageMonths').textContent='—'; $('#ageDays').textContent='Future date'; return; }
      let years = now.getFullYear()-dob.getFullYear();
      let months = now.getMonth()-dob.getMonth();
      let days = now.getDate()-dob.getDate();
      if(days<0){ months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
      if(months<0){ years--; months += 12; }
      $('#ageYears').textContent = years;
      $('#ageMonths').textContent = months;
      $('#ageDays').textContent = days;
    });
  }
};

/* ---- 15. Percentage Calculator ---- */
calculatorTools['percentage'] = {
  html:`
    <div class="field"><label>Mode</label>
      <select id="pctMode">
        <option value="of">X% of Y</option>
        <option value="what">X is what % of Y</option>
        <option value="change">% change from X to Y</option>
      </select>
    </div>
    <div class="row">
      <div class="field"><label id="pctLabelX">X</label><input type="number" id="pctX" placeholder="0"></div>
      <div class="field"><label id="pctLabelY">Y</label><input type="number" id="pctY" placeholder="0"></div>
    </div>
    <div class="btn-row"><button class="btn" id="pctGo">Calculate</button></div>
    <div class="output-box" id="pctOutput">Result will appear here…</div>`,
  init(){
    $('#pctGo').addEventListener('click', ()=>{
      const mode = $('#pctMode').value;
      const x = parseFloat($('#pctX').value), y = parseFloat($('#pctY').value);
      if(isNaN(x)||isNaN(y)){ $('#pctOutput').textContent = 'Enter both values.'; return; }
      let out = '';
      if(mode==='of') out = `${x}% of ${y} = ${(x/100*y).toFixed(2)}`;
      else if(mode==='what') out = `${x} is ${((x/y)*100).toFixed(2)}% of ${y}`;
      else out = `Change from ${x} to ${y} = ${(((y-x)/x)*100).toFixed(2)}%`;
      $('#pctOutput').textContent = out;
    });
  }
};
