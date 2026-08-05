
// 19. 다크/라이트 모드 토글
// ──────────────────────────────────────────────
const btnTheme   = document.getElementById('btnTheme');
const themeIcon  = document.getElementById('themeIcon');
const themeLabel = document.getElementById('themeLabel');

btnTheme.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  themeIcon.textContent  = isDark ? '☀️' : '🌙';
  themeLabel.textContent = isDark ? '라이트 모드' : '다크 모드';
});

// ──────────────────────────────────────────────
// 20. 초기화 — 모드 선택 화면 표시
// ──────────────────────────────────────────────
createParticles();
// 게임 자동 시작 없이 대문(모드 선택) 화면 표시
modeScreen.hidden = false;



