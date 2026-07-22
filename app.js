/* ============================================================
   app.js — Application entry point
   Loaded as a module (deferred by default), so the DOM is
   already parsed by the time this file executes.
   ============================================================ */
import { initTheme } from './theme.js';
import { initModal } from './modal.js';
import { initSearch } from './search.js';

document.getElementById('year').textContent = new Date().getFullYear();

initTheme();
initModal();
initSearch();
