/* ============================================================
   tools.js — Category definitions, tool registry (metadata used
   for cards/search), and the merged TOOL_RENDER lookup table
   ============================================================ */
import { textTools } from './text-tools.js';
import { developerTools } from './developer-tools.js';
import { calculatorTools } from './calculator-tools.js';
import { converterTools } from './converter-tools.js';
import { utilityTools } from './utility-tools.js';

/* ============ CATEGORY DEFINITIONS ============ */
export const CATS = {
  text:      { label:'Text Tools',       color:'var(--ion)' },
  dev:       { label:'Developer Tools',  color:'var(--flare)' },
  calc:      { label:'Calculators',      color:'var(--violet)' },
  convert:   { label:'Converters',       color:'var(--pink)' },
  utility:   { label:'Utilities',        color:'var(--blue)' }
};

/* ============ TOOL REGISTRY ============ */
export const TOOLS = [
  { id:'word-counter', cat:'text', icon:'text', name:'Word Counter', desc:'Live word, sentence and reading-time counts as you type.' },
  { id:'char-counter', cat:'text', icon:'hash', name:'Character Counter', desc:'Count characters with and without spaces, plus byte size.' },
  { id:'case-converter', cat:'text', icon:'case', name:'Case Converter', desc:'Switch text between UPPER, lower, Title, camelCase and more.' },
  { id:'text-reverser', cat:'text', icon:'reverse', name:'Text Reverser', desc:'Reverse letters or word order in any block of text.' },
  { id:'lorem-ipsum', cat:'text', icon:'lorem', name:'Lorem Ipsum Generator', desc:'Generate placeholder paragraphs, sentences or words.' },
  { id:'dedupe-lines', cat:'text', icon:'dedupe', name:'Duplicate Line Remover', desc:'Clean up lists by removing duplicate or blank lines.' },

  { id:'json-formatter', cat:'dev', icon:'json', name:'JSON Formatter', desc:'Format, validate and minify JSON with clear error messages.' },
  { id:'base64', cat:'dev', icon:'base64', name:'Base64 Encoder / Decoder', desc:'Convert text to and from Base64 instantly.' },
  { id:'url-encode', cat:'dev', icon:'link', name:'URL Encoder / Decoder', desc:'Percent-encode or decode query strings and URLs.' },
  { id:'password-gen', cat:'dev', icon:'key', name:'Password Generator', desc:'Create strong random passwords with custom rules.' },
  { id:'color-converter', cat:'dev', icon:'palette', name:'Color Converter', desc:'Convert HEX, RGB and HSL with a live swatch preview.' },

  { id:'calculator', cat:'calc', icon:'calc', name:'Calculator', desc:'A quick everyday calculator for the four basic operations.' },
  { id:'bmi', cat:'calc', icon:'bmi', name:'BMI Calculator', desc:'Estimate body mass index from height and weight.' },
  { id:'age-calc', cat:'calc', icon:'age', name:'Age Calculator', desc:'Find exact age in years, months and days from a birth date.' },
  { id:'percentage', cat:'calc', icon:'percent', name:'Percentage Calculator', desc:'Solve percent-of, percent-change and ratio problems.' },

  { id:'length-convert', cat:'convert', icon:'ruler', name:'Length Converter', desc:'Convert between mm, cm, m, km, inches, feet, yards and miles.' },
  { id:'temp-convert', cat:'convert', icon:'temp', name:'Temperature Converter', desc:'Convert between Celsius, Fahrenheit and Kelvin.' },

  { id:'random-number', cat:'utility', icon:'dice', name:'Random Number Generator', desc:'Generate one or many random numbers in a custom range.' },
  { id:'stopwatch', cat:'utility', icon:'clock', name:'Stopwatch', desc:'A simple stopwatch with lap tracking.' },
  { id:'todo', cat:'utility', icon:'todo', name:'To-Do List', desc:'Jot down and check off quick tasks for this session.' }
];

/* ============ MERGED TOOL RENDER TABLE ============ */
/* Combines every category module into the single lookup table the   */
/* modal uses to render {html, init()} for a given tool id.          */
export const TOOL_RENDER = Object.assign(
  {},
  textTools,
  developerTools,
  calculatorTools,
  converterTools,
  utilityTools
);
