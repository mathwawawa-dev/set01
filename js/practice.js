const pracAttrMap = {
  shape: { diamond: '마름모', squiggle: '물결', oval: '타원' },
  color: { red: '빨강', green: '초록', purple: '보라' },
  fill: { empty: '빈 것', striped: '줄무늬', solid: '가득 참' }
};

let pracIsFull = false;
let pracIsHard = false;      // hard 모드 (4선지)
let pracCurrentDiff = 0; // 0: 쉬움, 1: 보통, 2: 어려움

// 사이클 관리
let pracPhase = 'A';         // 'A' or 'B'
let pracPhaseRemaining = 0;  // 현재 Phase에서 남은 문제 수

// A 유형 상태 (카드 2장 주어짐 → 1장 선택)
let pracGivenCards = [];
let pracCorrectCard = null;
let pracOptions = [];

// B 유형 상태 (카드 1장 주어짐 → 2장 선택)
let pracGivenCardB = null;
let pracCorrectCardsB = [];
let pracOptionsB = [];
let pracBSelected = []; // [{card, container}]

let pracHintStep = 0;
let pracWaitNext = false;

// 통계용
let pracSolvedCount = 0;
let pracTotalAttempts = 0;
let pracQuestionStartTime = 0;
let pracTotalTimeMs = 0;

let pracKeys = ['1', '2', '3'];
try {
  const saved = localStorage.getItem('setGamePracKeys');
  if (saved) pracKeys = JSON.parse(saved).slice(0, 3);
} catch(e) {}

let pracActiveKeyIdx = -1;

function initPracticeMode(isFull, isHard) {
  pracIsFull = isFull;
  pracCurrentDiff = 0;
  pracWaitNext = false;
  pracSolvedCount = 0;
  pracTotalAttempts = 0;
  pracTotalTimeMs = 0;
  pracPhase = 'A';
  pracPhaseRemaining = Math.floor(Math.random() * 3) + 2; // 2-4
  pracBSelected = [];
  pracIsHard = isHard || false;

  document.getElementById('pracSolvedCount').textContent = '0';
  document.getElementById('pracAccuracy').textContent = '0%';
  document.getElementById('pracAvgTime').textContent = '0.0초';

  document.getElementById('modeScreen').hidden = true;
  const ps = document.getElementById('practiceScreen');
  ps.hidden = false;
  if (pracIsFull) ps.classList.add('official');
  else ps.classList.remove('official');

  const gameHeader = document.querySelector('.game-header');
  if (gameHeader) gameHeader.style.display = 'none';
  const floatMenu = document.getElementById('floatingMenu');
  if (floatMenu) floatMenu.style.display = 'none';

  generatePracticeQ();
}

function exitPracticeMode() {
  document.getElementById('practiceScreen').hidden = true;
  document.getElementById('modeScreen').hidden = false;

  const gameHeader = document.querySelector('.game-header');
  if (gameHeader) gameHeader.style.display = '';
  const floatMenu = document.getElementById('floatingMenu');
  if (floatMenu) floatMenu.style.display = '';
}

function getDeck() {
  return pracIsFull ? buildOfficialDeck() : buildFullDeck();
}

// ==========================================
// 문제 생성 (사이클 관리)
// ==========================================
function generatePracticeQ() {
  pracWaitNext = false;
  pracHintStep = 0;
  pracBSelected = [];

  // 피드백 영역 초기화
  const fb = document.getElementById('pracFeedbackArea');
  if (fb) fb.innerHTML = '';

  // Phase 전환
  if (pracPhaseRemaining <= 0) {
    if (pracPhase === 'A') {
      pracPhase = 'B';
      pracPhaseRemaining = Math.floor(Math.random() * 2) + 1; // 1-2
    } else {
      pracPhase = 'A';
      pracPhaseRemaining = Math.floor(Math.random() * 3) + 2; // 2-4
    }
  }
  pracPhaseRemaining--;

  if (pracPhase === 'A') {
    generateTypeA();
  } else {
    generateTypeB();
  }
}

// ==========================================
// A 유형: 카드 2장 주어짐 → 1장 선택 (3선지)
// ==========================================
function generateTypeA() {
  const deck = getDeck();
  let shuffled = shuffle([...deck]);
  let foundSet = null;

  for (let i = 0; i < shuffled.length - 2; i++) {
    for (let j = i + 1; j < shuffled.length - 1; j++) {
      for (let k = j + 1; k < shuffled.length; k++) {
        const valid = pracIsFull
          ? isSetOfficial(shuffled[i], shuffled[j], shuffled[k])
          : isSet(shuffled[i], shuffled[j], shuffled[k]);
        if (valid) { foundSet = [shuffled[i], shuffled[j], shuffled[k]]; break; }
      }
      if (foundSet) break;
    }
    if (foundSet) break;
  }

  foundSet = shuffle(foundSet);
  pracGivenCards = [foundSet[0], foundSet[1]];
  pracCorrectCard = foundSet[2];

  let availableForWrong = deck.filter(c =>
    !isSameCard(c, pracCorrectCard) &&
    !isSameCard(c, pracGivenCards[0]) &&
    !isSameCard(c, pracGivenCards[1])
  );

  let wrongCandidates = availableForWrong.filter(c => {
    const match = countMatchingProperties(c, pracCorrectCard);
    if (pracCurrentDiff === 0) return match <= 1;
    if (pracCurrentDiff === 1) return match === 2;
    if (pracCurrentDiff === 2) return match === 3;
    return true;
  });

  if (wrongCandidates.length < 2) wrongCandidates = shuffle(availableForWrong);
  else wrongCandidates = shuffle(wrongCandidates);

  const wrongCount = pracIsHard ? 3 : 2;
  pracOptions = shuffle([pracCorrectCard, ...wrongCandidates.slice(0, wrongCount)]);

  if (pracIsFull) pracCurrentDiff = (pracCurrentDiff + 1) % 3;
  else pracCurrentDiff = (pracCurrentDiff + 1) % 2;

  renderTypeAQ();
}

function renderTypeAQ() {
  const bubble = document.getElementById('pracBubble');
  if (bubble) bubble.textContent = 'SET가 되기 위해 필요한 카드는?';

  const qArea = document.getElementById('pracQuestionArea');
  qArea.innerHTML = '';

  const c1El = createPracCardElement(pracGivenCards[0]);
  const c2El = createPracCardElement(pracGivenCards[1]);
  c1El.style.pointerEvents = 'none';
  c2El.style.pointerEvents = 'none';
  qArea.appendChild(c1El);
  qArea.appendChild(c2El);

  const blank = document.createElement('div');
  blank.className = 'prac-blank-card';
  blank.textContent = '?';
  qArea.appendChild(blank);

  const oArea = document.getElementById('pracOptionsArea');
  oArea.innerHTML = '';
  oArea.classList.remove('type-b');
  if (pracIsHard) oArea.classList.add('hard-mode'); else oArea.classList.remove('hard-mode');

  pracOptions.forEach((opt, idx) => {
    const container = document.createElement('div');
    container.className = 'prac-option-container';

    const label = document.createElement('div');
    label.className = 'prac-option-label';
    label.textContent = pracIsHard
      ? String.fromCharCode(65 + idx)
      : (pracKeys[idx] ? pracKeys[idx].toUpperCase() : String.fromCharCode(65 + idx));

    const el = createPracCardElement(opt);
    el.dataset.idx = idx;

    container.appendChild(label);
    container.appendChild(el);
    container.addEventListener('click', () => handleTypeAClick(opt, container));
    oArea.appendChild(container);
  });

  pracQuestionStartTime = Date.now();
}

function handleTypeAClick(selectedCard, el) {
  if (pracWaitNext) return;

  el.classList.add('selected');

  setTimeout(() => {
    el.classList.remove('selected');
    pracTotalAttempts++;

    if (isSameCard(selectedCard, pracCorrectCard)) {
      const timeTaken = Date.now() - pracQuestionStartTime;
      pracTotalTimeMs += timeTaken;
      pracSolvedCount++;
      el.classList.add('correct');

      const feedbackArea = document.getElementById('pracFeedbackArea');
      if (feedbackArea) feedbackArea.innerHTML = '<span class="prac-thumb-up">👍</span>';

      updatePracStats();
      pracWaitNext = true;

      if (typeof createBurst === 'function') createBurst(el, 15);
      setTimeout(() => generatePracticeQ(), 500);
    } else {
      el.classList.remove('wrong');
      void el.offsetWidth;
      el.classList.add('wrong');
      updatePracStats();
    }
  }, 80);
}

// ==========================================
// B 유형: 카드 1장 주어짐 → 2장 선택 (4선지)
// ==========================================
function generateTypeB() {
  const deck = getDeck();
  let shuffled = shuffle([...deck]);
  let foundSet = null;

  for (let i = 0; i < shuffled.length - 2; i++) {
    for (let j = i + 1; j < shuffled.length - 1; j++) {
      for (let k = j + 1; k < shuffled.length; k++) {
        const valid = pracIsFull
          ? isSetOfficial(shuffled[i], shuffled[j], shuffled[k])
          : isSet(shuffled[i], shuffled[j], shuffled[k]);
        if (valid) { foundSet = [shuffled[i], shuffled[j], shuffled[k]]; break; }
      }
      if (foundSet) break;
    }
    if (foundSet) break;
  }

  foundSet = shuffle(foundSet);
  pracGivenCardB = foundSet[0];
  pracCorrectCardsB = [foundSet[1], foundSet[2]];

  let available = deck.filter(c =>
    !isSameCard(c, pracGivenCardB) &&
    !isSameCard(c, pracCorrectCardsB[0]) &&
    !isSameCard(c, pracCorrectCardsB[1])
  );
  const wrongCount = pracIsHard ? 2 : 1;
  const wrongCards = shuffle(available).slice(0, wrongCount); // hard: 오답 2장, normal: 1장

  pracOptionsB = shuffle([...pracCorrectCardsB, ...wrongCards]);
  pracBSelected = [];

  renderTypeBQ();
}

function renderTypeBQ() {
  const bubble = document.getElementById('pracBubble');
  if (bubble) bubble.textContent = 'SET가 되기 위해 필요한 카드 2장은?';

  const qArea = document.getElementById('pracQuestionArea');
  qArea.innerHTML = '';

  const givenEl = createPracCardElement(pracGivenCardB);
  givenEl.style.pointerEvents = 'none';
  qArea.appendChild(givenEl);

  for (let i = 0; i < 2; i++) {
    const blank = document.createElement('div');
    blank.className = 'prac-blank-card';
    blank.textContent = '?';
    qArea.appendChild(blank);
  }

  const oArea = document.getElementById('pracOptionsArea');
  oArea.innerHTML = '';
  oArea.classList.add('type-b');
  if (pracIsHard) oArea.classList.add('hard-mode'); else oArea.classList.remove('hard-mode');

  pracOptionsB.forEach((opt, idx) => {
    const container = document.createElement('div');
    container.className = 'prac-option-container';

    const label = document.createElement('div');
    label.className = 'prac-option-label';
    label.textContent = pracIsHard
      ? String.fromCharCode(65 + idx)
      : (pracKeys[idx] ? pracKeys[idx].toUpperCase() : String.fromCharCode(65 + idx));

    const el = createPracCardElement(opt);
    el.dataset.idx = idx;

    container.appendChild(label);
    container.appendChild(el);
    container.addEventListener('click', () => handleTypeBClick(opt, container));
    oArea.appendChild(container);
  });

  pracQuestionStartTime = Date.now();
}

function handleTypeBClick(card, container) {
  if (pracWaitNext) return;

  // 이미 선택된 카드면 해제
  const alreadyIdx = pracBSelected.findIndex(s => isSameCard(s.card, card));
  if (alreadyIdx >= 0) {
    pracBSelected.splice(alreadyIdx, 1);
    container.classList.remove('selected');
    return;
  }

  // 이미 2장 선택됨 → 무시
  if (pracBSelected.length >= 2) return;

  pracBSelected.push({ card, container });
  container.classList.add('selected');

  // 2장 선택되면 자동 채점
  if (pracBSelected.length === 2) {
    pracWaitNext = true;
    setTimeout(() => checkTypeBAnswer(), 100);
  }
}

function checkTypeBAnswer() {
  const sel = pracBSelected;
  pracTotalAttempts++;

  const bothCorrect = pracCorrectCardsB.every(cc =>
    sel.some(s => isSameCard(s.card, cc))
  );

  sel.forEach(s => s.container.classList.remove('selected'));

  if (bothCorrect) {
    const timeTaken = Date.now() - pracQuestionStartTime;
    pracTotalTimeMs += timeTaken;
    pracSolvedCount++;

    sel.forEach(s => {
      s.container.classList.add('correct');
      if (typeof createBurst === 'function') createBurst(s.container, 10);
    });

    const fb = document.getElementById('pracFeedbackArea');
    if (fb) fb.innerHTML = '<span class="prac-thumb-up">👍</span>';

    updatePracStats();
    setTimeout(() => generatePracticeQ(), 500);
  } else {
    pracWaitNext = false;
    pracBSelected = [];
    sel.forEach(s => {
      s.container.classList.remove('wrong');
      void s.container.offsetWidth;
      s.container.classList.add('wrong');
    });
    updatePracStats();
  }
}

// ==========================================
// 공통 유틸
// ==========================================
function countMatchingProperties(c1, c2) {
  let cnt = 0;
  if (c1.shape === c2.shape) cnt++;
  if (c1.color === c2.color) cnt++;
  if (c1.fill === c2.fill) cnt++;
  if (pracIsFull && c1.count === c2.count) cnt++;
  return cnt;
}

function isSameCard(c1, c2) {
  return c1.shape === c2.shape && c1.color === c2.color && c1.fill === c2.fill &&
    (pracIsFull ? c1.count === c2.count : true);
}

function createPracCardElement(card) {
  const wrap = document.createElement('div');
  wrap.className = 'card-wrap';

  const el = document.createElement('div');
  el.className = 'card';

  if (pracIsFull && card.count !== undefined) {
    const inner = document.createElement('div');
    inner.className = `card-symbols count-${card.count}`;
    for (let i = 0; i < card.count; i++) {
      const img = document.createElement('img');
      img.src = imgPath(card);
      img.className = 'card-symbol';
      img.draggable = false;
      inner.appendChild(img);
    }
    el.appendChild(inner);
  } else {
    const img = document.createElement('img');
    img.src = imgPath(card);
    img.draggable = false;
    el.appendChild(img);
  }

  wrap.appendChild(el);
  return wrap;
}

function updatePracStats() {
  document.getElementById('pracSolvedCount').textContent = pracSolvedCount;
  const acc = pracTotalAttempts === 0 ? 0 : Math.round((pracSolvedCount / pracTotalAttempts) * 100);
  document.getElementById('pracAccuracy').textContent = acc + '%';

  const avg = pracSolvedCount === 0 ? 0 : (pracTotalTimeMs / pracSolvedCount) / 1000;
  document.getElementById('pracAvgTime').textContent = avg.toFixed(1) + '초';
}

function getAttrKorean(prop, val) {
  return pracAttrMap[prop][val] || val;
}


// 이벤트 리스너 연결
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('pracExitBtn').addEventListener('click', exitPracticeMode);

  document.getElementById('btnModePractice').addEventListener('click', () => {
    initPracticeMode(false, false);
  });
  document.getElementById('btnModePracticeHard').addEventListener('click', () => {
    initPracticeMode(false, true);
  });
  document.getElementById('btnModePracticeFull').addEventListener('click', () => {
    initPracticeMode(true, false);
  });
  document.getElementById('btnModePracticeFullHard').addEventListener('click', () => {
    initPracticeMode(true, true);
  });
});

// ==========================================
// 단축키 및 설정 기능
// ==========================================
document.addEventListener('keydown', (e) => {
  // 설정창이 열려있고 키 입력 대기 중일 때
  if (!document.getElementById('pracSettingsOverlay').hidden && pracActiveKeyIdx !== -1) {
    e.preventDefault();
    let key = e.key.toLowerCase();
    if (key === 'escape') {
      pracActiveKeyIdx = -1;
      renderPracSettingsGrid();
      return;
    }
    if (key === ' ' || key === 'spacebar') key = 'space';

    const dupIdx = pracKeys.indexOf(key);
    if (dupIdx !== -1 && dupIdx !== pracActiveKeyIdx) pracKeys[dupIdx] = '';

    pracKeys[pracActiveKeyIdx] = key;
    pracActiveKeyIdx = -1;
    localStorage.setItem('setGamePracKeys', JSON.stringify(pracKeys));
    renderPracSettingsGrid();
    return;
  }

  // 게임 플레이 중 단축키 — hard 모드는 마우스 전용
  if (!document.getElementById('practiceScreen').hidden &&
      document.getElementById('pracSettingsOverlay').hidden &&
      !pracIsHard) {
    const key = e.key.toLowerCase();
    const idx = pracKeys.findIndex(k => k && k.toLowerCase() === key);
    if (idx !== -1 && !pracWaitNext) {
      const container = document.querySelector(
        `.prac-options-area .prac-option-container:nth-child(${idx + 1})`
      );
      if (!container) return;
      if (pracPhase === 'A') handleTypeAClick(pracOptions[idx], container);
      else handleTypeBClick(pracOptionsB[idx], container);
    }
  }
});

const btnPracSettings = document.getElementById('pracSettingsBtn');
if (btnPracSettings) {
  btnPracSettings.addEventListener('click', () => {
    document.getElementById('pracSettingsOverlay').hidden = false;
    renderPracSettingsGrid();
  });
}

const btnPracSettingsClose = document.getElementById('btnPracSettingsClose');
const pracSettingsOverlay = document.getElementById('pracSettingsOverlay');

function closePracSettings() {
  pracSettingsOverlay.hidden = true;
  pracActiveKeyIdx = -1;
  if (!document.getElementById('practiceScreen').hidden) {
    const labels = document.querySelectorAll('.prac-option-label');
    labels.forEach((lbl, i) => {
      if (pracPhase === 'A') {
        lbl.textContent = pracKeys[i] ? pracKeys[i].toUpperCase() : String.fromCharCode(65 + i);
      } else {
        lbl.textContent = String.fromCharCode(65 + i);
      }
    });
  }
}

if (btnPracSettingsClose) btnPracSettingsClose.addEventListener('click', closePracSettings);

if (pracSettingsOverlay) {
  pracSettingsOverlay.addEventListener('click', (e) => {
    if (e.target === pracSettingsOverlay) closePracSettings();
  });
}

function renderPracSettingsGrid() {
  const grid = document.getElementById('pracSettingsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const posLabels = ['선지 A', '선지 B', '선지 C'];
  for (let i = 0; i < 3; i++) {
    const cell = document.createElement('div');
    const isListening = pracActiveKeyIdx === i;
    cell.className = 'key-cell' + (isListening ? ' listening' : '');
    cell.dataset.idx = i;
    cell.innerHTML = `
      <span class="key-cell-pos">${posLabels[i]}</span>
      <span class="key-cell-badge">${isListening ? '…' : (pracKeys[i] ? pracKeys[i].toUpperCase() : '—')}</span>
    `;
    cell.addEventListener('click', () => {
      pracActiveKeyIdx = i;
      renderPracSettingsGrid();
    });
    grid.appendChild(cell);
  }
}
