/* ============================================================
   theme.js — Dark / light theme toggle
   ============================================================ */

export function initTheme(){
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  let currentTheme = prefersLight ? 'light' : 'dark'; // session-only; no localStorage used inside the preview sandbox
  document.documentElement.setAttribute('data-theme', currentTheme);

  function paintThemeIcon(){
    themeIcon.innerHTML = currentTheme==='dark'
      ? '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'
      : '<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/>';
  }
  paintThemeIcon();

  themeToggle.addEventListener('click', ()=>{
    currentTheme = currentTheme==='dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    paintThemeIcon();
    // NOTE for self-hosting: browser storage APIs are disabled in this preview sandbox.
    // On your own domain you can persist the choice with:
    // localStorage.setItem('novaTheme', currentTheme);
  });
}
