
// 19. 다크/라이트 모드 토글
// ──────────────────────────────────────────────
function toggleAppTheme() {
  const isDark = document.body.classList.toggle('dark');
  const icon = isDark ? '☀️' : '🌙';
  const label = isDark ? '라이트 모드' : '다크 모드';
  const icon1 = document.getElementById('themeIcon');
  const lbl1 = document.getElementById('themeLabel');
  const icon2 = document.getElementById('themeIconPrac');
  const lbl2 = document.getElementById('themeLabelPrac');
  if (icon1) icon1.textContent = icon;
  if (lbl1) lbl1.textContent = label;
  if (icon2) icon2.textContent = icon;
  if (lbl2) lbl2.textContent = label;
}

const btnTheme = document.getElementById('btnTheme');
if (btnTheme) btnTheme.addEventListener('click', toggleAppTheme);
const btnThemePrac = document.getElementById('btnThemePrac');
if (btnThemePrac) btnThemePrac.addEventListener('click', toggleAppTheme);

// ──────────────────────────────────────────────
// 20. 초기화 — 모드 선택 화면 표시
// ──────────────────────────────────────────────
createParticles();
// 게임 자동 시작 없이 대문(모드 선택) 화면 표시
modeScreen.hidden = false;



