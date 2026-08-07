const pracAttrMap = {
  shape: { diamond: '마름모', squiggle: '물결', oval: '타원' },
  color: { red: '빨강', green: '초록', purple: '보라' },
  fill: { empty: '빈 것', striped: '줄무늬', solid: '가득 참' }
};

let pracIsFull = false;
// 0: normal(3선지, A/B), 1: hard(4선지, A/B), 2: hardest(6선지, A/B/C)
let pracHardLevel = 0;
let pracCurrentDiff = 0;

// 사이클 관리
let pracPhase = 'A';        // 'A', 'B', or 'C'
let pracPhaseRemaining = 0;

// A 유형: 카드 2장 주어짐 → 1장 선택
let pracGivenCards = [];
let pracCorrectCard = null;
let pracOptions = [];

// B 유형: 카드 1장 주어짐 → 2장 선택
let pracGivenCardB = null;
let pracCorrectCardsB = [];
let pracOptionsB = [];
let pracBSelected = [];

// C 유형: 주어진 카드 없음 → 3장 선택 (hardest only)
let pracCorrectCardsC = [];
let pracOptionsC = [];
let pracCSelected = [];

let pracHintStep = 0;
let pracWaitNext = false;

// 통계
let pracSolvedCount = 0;
let pracTotalAttempts = 0;
let pracQuestionStartTime = 0;
let pracTotalTimeMs = 0;

// 레벨별 기본 단축키
const PRAC_KEY_DEFAULTS = [
  ['1','2','3','4','5','6'],      // level 0 (3선지)
  ['1','2','3','4','5','6'],      // level 1 (4선지)
  ['4','5','6','1','2','3']       // level 2 (6선지)
];

let pracKeys = [...PRAC_KEY_DEFAULTS[0]];

function loadPracKeys() {
  const storageKey = `setGamePracKeys_${pracHardLevel}`;
  pracKeys = [...PRAC_KEY_DEFAULTS[pracHardLevel]];
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const loaded = JSON.parse(saved);
      for (let i = 0; i < 6; i++) if (loaded[i]) pracKeys[i] = loaded[i];
    }
  } catch(e) {}
}

function savePracKeys() {
  localStorage.setItem(`setGamePracKeys_${pracHardLevel}`, JSON.stringify(pracKeys));
}

let pracActiveKeyIdx = -1;

// ==========================================
// 헬퍼
// ==========================================
function isHardestMode() { return pracHardLevel === 2; }

function optionCount(type) {
  const counts = {
    0: { A: 3, B: 3, C: 6 },
    1: { A: 4, B: 4, C: 6 },
    2: { A: 6, B: 6, C: 6 }
  };
  return (counts[pracHardLevel] || counts[0])[type];
}

function initPracticeMode(isFull, hardLevel) {
  pracIsFull = isFull;
  pracHardLevel = hardLevel || 0;
  loadPracKeys();  // 레벨별 단축키 로드
  pracCurrentDiff = 0;
  pracWaitNext = false;
  pracSolvedCount = 0;
  pracTotalAttempts = 0;
  pracTotalTimeMs = 0;
  pracPhase = 'A';
  pracPhaseRemaining = Math.floor(Math.random() * 3) + 2;
  pracBSelected = [];
  pracCSelected = [];

  document.getElementById('pracSolvedCount').textContent = '0';
  document.getElementById('pracAccuracy').textContent = '0%';
  document.getElementById('pracAvgTime').textContent = '0.0초';

  document.getElementById('modeScreen').hidden = true;
  const ps = document.getElementById('practiceScreen');
  ps.hidden = false;
  if (pracIsFull) ps.classList.add('official');
  else ps.classList.remove('official');

  // hardest 모드에서도 설정 버튼 표시 (6선지 단축키 지원)
  const settingsBtn = document.getElementById('pracSettingsBtn');
  if (settingsBtn) settingsBtn.style.display = '';

  const gameHeader = document.querySelector('.game-header');
  if (gameHeader) gameHeader.style.display = 'none';
  const floatMenu = document.getElementById('floatingMenu');
  if (floatMenu) floatMenu.style.display = 'none';
  const selBar = document.getElementById('selectionBar');
  if (selBar) selBar.style.display = 'none';

  generatePracticeQ();
}

function exitPracticeMode() {
  document.getElementById('practiceScreen').hidden = true;
  document.getElementById('modeScreen').hidden = false;

  const settingsBtn = document.getElementById('pracSettingsBtn');
  if (settingsBtn) settingsBtn.style.display = '';

  const gameHeader = document.querySelector('.game-header');
  if (gameHeader) gameHeader.style.display = '';
  const floatMenu = document.getElementById('floatingMenu');
  if (floatMenu) floatMenu.style.display = '';
  const selBar = document.getElementById('selectionBar');
  if (selBar) selBar.style.display = '';
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
  pracCSelected = [];

  const fb = document.getElementById('pracFeedbackArea');
  if (fb) fb.innerHTML = '';

  if (pracPhaseRemaining <= 0) {
    if (isHardestMode()) {
      // A → B → C → A 사이클
      if (pracPhase === 'A')      { pracPhase = 'B'; pracPhaseRemaining = Math.floor(Math.random() * 2) + 1; }
      else if (pracPhase === 'B') { pracPhase = 'C'; pracPhaseRemaining = Math.floor(Math.random() * 2) + 1; }
      else                        { pracPhase = 'A'; pracPhaseRemaining = Math.floor(Math.random() * 3) + 2; }
    } else {
      // A → B → A 사이클
      if (pracPhase === 'A') { pracPhase = 'B'; pracPhaseRemaining = Math.floor(Math.random() * 2) + 1; }
      else                   { pracPhase = 'A'; pracPhaseRemaining = Math.floor(Math.random() * 3) + 2; }
    }
  }
  pracPhaseRemaining--;

  if (pracPhase === 'A')      generateTypeA();
  else if (pracPhase === 'B') generateTypeB();
  else                        generateTypeC();
}

// ==========================================
// A 유형: 카드 2장 주어짐 → 1장 선택
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

  const wrongCount = optionCount('A') - 1;
  if (wrongCandidates.length < wrongCount) wrongCandidates = shuffle(availableForWrong);
  else wrongCandidates = shuffle(wrongCandidates);

  pracOptions = shuffle([pracCorrectCard, ...wrongCandidates.slice(0, wrongCount)]);

  if (pracIsFull) pracCurrentDiff = (pracCurrentDiff + 1) % 3;
  else pracCurrentDiff = (pracCurrentDiff + 1) % 2;

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

  renderOptionsArea(pracOptions, 'A');
  pracQuestionStartTime = Date.now();
}

function handleTypeAClick(selectedCard, el) {
  if (pracWaitNext) return;

  el.classList.add('selected');
  setTimeout(() => {
    el.classList.remove('selected');
    pracTotalAttempts++;

    const isValidSet = pracIsFull
      ? isSetOfficial(pracGivenCards[0], pracGivenCards[1], selectedCard)
      : isSet(pracGivenCards[0], pracGivenCards[1], selectedCard);

    if (isValidSet) {
      const timeTaken = Date.now() - pracQuestionStartTime;
      pracTotalTimeMs += timeTaken;
      pracSolvedCount++;
      el.classList.add('correct');

      const fb = document.getElementById('pracFeedbackArea');
      if (fb) fb.innerHTML = '<span class="prac-thumb-up">👍</span>';

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
// B 유형: 카드 1장 주어짐 → 2장 선택
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
  const wrongCount = optionCount('B') - 2;
  const wrongCards = shuffle(available).slice(0, wrongCount);
  pracOptionsB = shuffle([...pracCorrectCardsB, ...wrongCards]);
  pracBSelected = [];

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

  renderOptionsArea(pracOptionsB, 'B');
  pracQuestionStartTime = Date.now();
}

function handleTypeBClick(card, container) {
  if (pracWaitNext) return;

  const alreadyIdx = pracBSelected.findIndex(s => isSameCard(s.card, card));
  if (alreadyIdx >= 0) {
    pracBSelected.splice(alreadyIdx, 1);
    container.classList.remove('selected');
    return;
  }
  if (pracBSelected.length >= 2) return;

  pracBSelected.push({ card, container });
  container.classList.add('selected');

  if (pracBSelected.length === 2) {
    pracWaitNext = true;
    setTimeout(() => checkTypeBAnswer(), 100);
  }
}

function checkTypeBAnswer() {
  const sel = pracBSelected;
  pracTotalAttempts++;

  // 주어진 카드 + 선택한 2장이 유효한 SET이면 정답
  const isValidSet = pracIsFull
    ? isSetOfficial(pracGivenCardB, sel[0].card, sel[1].card)
    : isSet(pracGivenCardB, sel[0].card, sel[1].card);

  sel.forEach(s => s.container.classList.remove('selected'));

  if (isValidSet) {
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
// C 유형: 주어진 카드 없음 → 3장 선택
// ==========================================
function generateTypeC() {
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

  pracCorrectCardsC = shuffle(foundSet);

  let available = deck.filter(c =>
    !isSameCard(c, pracCorrectCardsC[0]) &&
    !isSameCard(c, pracCorrectCardsC[1]) &&
    !isSameCard(c, pracCorrectCardsC[2])
  );
  const wrongCards = shuffle(available).slice(0, 3);
  pracOptionsC = shuffle([...pracCorrectCardsC, ...wrongCards]);
  pracCSelected = [];

  const bubble = document.getElementById('pracBubble');
  if (bubble) bubble.textContent = 'SET가 되는 카드 3장을 고르세요!';

  const qArea = document.getElementById('pracQuestionArea');
  qArea.innerHTML = '';
  for (let i = 0; i < 3; i++) {
    const blank = document.createElement('div');
    blank.className = 'prac-blank-card';
    blank.textContent = '?';
    qArea.appendChild(blank);
  }

  renderOptionsArea(pracOptionsC, 'C');
  pracQuestionStartTime = Date.now();
}

function handleTypeCClick(card, container) {
  if (pracWaitNext) return;

  const alreadyIdx = pracCSelected.findIndex(s => isSameCard(s.card, card));
  if (alreadyIdx >= 0) {
    pracCSelected.splice(alreadyIdx, 1);
    container.classList.remove('selected');
    return;
  }
  if (pracCSelected.length >= 3) return;

  pracCSelected.push({ card, container });
  container.classList.add('selected');

  if (pracCSelected.length === 3) {
    pracWaitNext = true;
    setTimeout(() => checkTypeCAnswer(), 100);
  }
}

function checkTypeCAnswer() {
  const sel = pracCSelected;
  pracTotalAttempts++;

  // 선택한 3장이 SET이면 정답 (어떤 조합이든)
  const isValidSet = pracIsFull
    ? isSetOfficial(sel[0].card, sel[1].card, sel[2].card)
    : isSet(sel[0].card, sel[1].card, sel[2].card);

  sel.forEach(s => s.container.classList.remove('selected'));

  if (isValidSet) {
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
    pracCSelected = [];
    sel.forEach(s => {
      s.container.classList.remove('wrong');
      void s.container.offsetWidth;
      s.container.classList.add('wrong');
    });
    updatePracStats();
  }
}

// ==========================================
// 선지 영역 공통 렌더
// ==========================================
function renderOptionsArea(options, type) {
  const oArea = document.getElementById('pracOptionsArea');
  oArea.innerHTML = '';
  oArea.className = 'prac-options-area';

  const total = options.length;
  if (total >= 5) {
    oArea.classList.add('hardest-mode'); // 6선지: 2행 3열
  } else if (total === 4) {
    oArea.classList.add('hard-mode');    // 4선지: 1행
  } else if (type === 'B') {
    oArea.classList.add('type-b');       // 3선지 B유형
  }

  options.forEach((opt, idx) => {
    const container = document.createElement('div');
    container.className = 'prac-option-container';

    const label = document.createElement('div');
    label.className = 'prac-option-label';
    label.textContent = String.fromCharCode(65 + idx);

    const el = createPracCardElement(opt);
    el.dataset.idx = idx;

    container.appendChild(label);
    container.appendChild(el);

    if (type === 'A') container.addEventListener('click', () => handleTypeAClick(opt, container));
    else if (type === 'B') container.addEventListener('click', () => handleTypeBClick(opt, container));
    else container.addEventListener('click', () => handleTypeCClick(opt, container));

    oArea.appendChild(container);
  });
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

  document.getElementById('btnModePractice').addEventListener('click', () => initPracticeMode(false, 0));
  document.getElementById('btnModePracticeHard').addEventListener('click', () => initPracticeMode(false, 1));
  document.getElementById('btnModePractice3').addEventListener('click', () => initPracticeMode(false, 2));
  document.getElementById('btnModePracticeFull').addEventListener('click', () => initPracticeMode(true, 0));
  document.getElementById('btnModePracticeFullHard').addEventListener('click', () => initPracticeMode(true, 1));
  document.getElementById('btnModePracticeFull3').addEventListener('click', () => initPracticeMode(true, 2));
});

// ==========================================
// 단축키 및 설정 기능
// ==========================================
document.addEventListener('keydown', (e) => {
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
    savePracKeys();
    renderPracSettingsGrid();
    return;
  }

  // 키보드 단축키 — 모든 레벨 지원
  if (!document.getElementById('practiceScreen').hidden &&
      document.getElementById('pracSettingsOverlay').hidden) {
    const key = e.key.toLowerCase();
    const maxSlots = pracHardLevel === 2 ? 6 : (pracHardLevel === 1 ? 4 : 3);
    const idx = pracKeys.slice(0, maxSlots).findIndex(k => k && k.toLowerCase() === key);
    if (idx !== -1 && !pracWaitNext) {
      const container = document.querySelector(
        `.prac-options-area .prac-option-container:nth-child(${idx + 1})`
      );
      if (!container) return;
      if (pracPhase === 'A') handleTypeAClick(pracOptions[idx], container);
      else if (pracPhase === 'B') handleTypeBClick(pracOptionsB[idx], container);
      else handleTypeCClick(pracOptionsC[idx], container);
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
      lbl.textContent = String.fromCharCode(65 + i);
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

  const slotCount = pracHardLevel === 2 ? 6 : (pracHardLevel === 1 ? 4 : 3);
  const posLabels = ['선지 A', '선지 B', '선지 C', '선지 D', '선지 E', '선지 F'];

  const lbl = document.getElementById('pracSettingsLabel');
  if (lbl) {
    const labels = ['A, B, C', 'A, B, C, D', 'A, B, C, D, E, F'];
    lbl.textContent = labels[pracHardLevel] + ' 선지 단축키';
  }

  for (let i = 0; i < slotCount; i++) {
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

  // 프리셋 버튼
  const presetRow = document.createElement('div');
  presetRow.className = 'key-preset-row';
  const presetBtn = document.createElement('button');
  presetBtn.className = 'btn-preset';
  const slotCountForLabel = pracHardLevel === 2 ? 6 : (pracHardLevel === 1 ? 4 : 3);
  presetBtn.textContent = '프리셋: ' + PRAC_KEY_DEFAULTS[pracHardLevel].slice(0, slotCountForLabel).join(' ');
  presetBtn.addEventListener('click', () => {
    pracKeys = [...PRAC_KEY_DEFAULTS[pracHardLevel]];
    savePracKeys();
    pracActiveKeyIdx = -1;
    renderPracSettingsGrid();
  });
  presetRow.appendChild(presetBtn);
  grid.appendChild(presetRow);
}
