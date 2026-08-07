const pracAttrMap = {
  shape: { diamond: '마름모', squiggle: '물결', oval: '타원' },
  color: { red: '빨강', green: '초록', purple: '보라' },
  fill: { empty: '빈 것', striped: '줄무늬', solid: '가득 참' }
};

let pracIsFull = false;
let pracGivenCards = [];
let pracCorrectCard = null;
let pracOptions = [];
let pracHintStep = 0;
let pracWaitNext = false;
let pracCurrentDiff = 0; // 0: 쉬움, 1: 보통, 2: 어려움

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

function initPracticeMode(isFull) {
  pracIsFull = isFull;
  pracCurrentDiff = 0;
  pracWaitNext = false;
  pracSolvedCount = 0;
  pracTotalAttempts = 0;
  pracTotalTimeMs = 0;
  
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

function generatePracticeQ() {
  pracWaitNext = false;
  pracHintStep = 0;
  
  const deck = getDeck();
  
  // 1. 유효한 SET 하나 찾기
  let shuffled = shuffle([...deck]);
  let foundSet = null;
  
  for(let i=0; i<shuffled.length - 2; i++) {
    for(let j=i+1; j<shuffled.length - 1; j++) {
      for(let k=j+1; k<shuffled.length; k++) {
        let valid = pracIsFull ? isSetOfficial(shuffled[i], shuffled[j], shuffled[k]) : isSet(shuffled[i], shuffled[j], shuffled[k]);
        if(valid) {
          foundSet = [shuffled[i], shuffled[j], shuffled[k]];
          break;
        }
      }
      if(foundSet) break;
    }
    if(foundSet) break;
  }
  
  // 3장 중 2장은 주어진 카드, 1장은 정답 카드
  foundSet = shuffle(foundSet);
  pracGivenCards = [foundSet[0], foundSet[1]];
  pracCorrectCard = foundSet[2];
  
  // 2. 오답 카드 2장 고르기
  let availableForWrong = deck.filter(c => 
    !isSameCard(c, pracCorrectCard) && 
    !isSameCard(c, pracGivenCards[0]) && 
    !isSameCard(c, pracGivenCards[1])
  );
  
  // 난이도별 오답 필터링
  let wrongCandidates = availableForWrong.filter(c => {
    let match = countMatchingProperties(c, pracCorrectCard);
    if (pracCurrentDiff === 0) return match <= 1;
    if (pracCurrentDiff === 1) return match === 2;
    if (pracCurrentDiff === 2) return match === 3;
    return true;
  });
  
  if(wrongCandidates.length < 2) {
    wrongCandidates = shuffle(availableForWrong);
  } else {
    wrongCandidates = shuffle(wrongCandidates);
  }
  
  let wrongOptions = wrongCandidates.slice(0, 2);
  
  // 3. 선지 섞기
  pracOptions = shuffle([pracCorrectCard, ...wrongOptions]);
  
  // 4. 다음 문제 난이도 갱신
  if (pracIsFull) {
    pracCurrentDiff = (pracCurrentDiff + 1) % 3; // 0, 1, 2
  } else {
    pracCurrentDiff = (pracCurrentDiff + 1) % 2; // Junior는 0, 1
  }
  
  renderPracticeQ();
}

function countMatchingProperties(c1, c2) {
  let cnt = 0;
  if(c1.shape === c2.shape) cnt++;
  if(c1.color === c2.color) cnt++;
  if(c1.fill === c2.fill) cnt++;
  if(pracIsFull && c1.count === c2.count) cnt++;
  return cnt;
}

function isSameCard(c1, c2) {
  return c1.shape === c2.shape && c1.color === c2.color && c1.fill === c2.fill && (pracIsFull ? c1.count === c2.count : true);
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

function renderPracticeQ() {
  const qArea = document.getElementById('pracQuestionArea');
  qArea.innerHTML = '';
  
  // 주어진 카드 2장
  const c1El = createPracCardElement(pracGivenCards[0]);
  const c2El = createPracCardElement(pracGivenCards[1]);
  c1El.style.pointerEvents = 'none';
  c2El.style.pointerEvents = 'none';
  
  qArea.appendChild(c1El);
  qArea.appendChild(c2El);
  
  // 빈 칸
  const blank = document.createElement('div');
  blank.className = 'prac-blank-card';
  blank.textContent = '?';
  qArea.appendChild(blank);
  
  // 선지 4장
  const oArea = document.getElementById('pracOptionsArea');
  oArea.innerHTML = '';
  
  pracOptions.forEach((opt, idx) => {
    const container = document.createElement('div');
    container.className = 'prac-option-container';
    
    const label = document.createElement('div');
    label.className = 'prac-option-label';
    label.textContent = pracKeys[idx] ? pracKeys[idx].toUpperCase() : String.fromCharCode(65 + idx);
    
    const el = createPracCardElement(opt);
    // 식별자 임시 부여
    el.dataset.idx = idx;
    
    container.appendChild(label);
    container.appendChild(el);
    
    container.addEventListener('click', () => handlePracOptionClick(opt, container));
    oArea.appendChild(container);
  });
  
  pracQuestionStartTime = Date.now();
}

function handlePracOptionClick(selectedCard, el) {
  if (pracWaitNext) return;
  
  pracTotalAttempts++;
  
  if (isSameCard(selectedCard, pracCorrectCard)) {
    // 정답
    const timeTaken = Date.now() - pracQuestionStartTime;
    pracTotalTimeMs += timeTaken;
    pracSolvedCount++;
    el.classList.add('correct');
    
    updatePracStats();
    pracWaitNext = true;
    
    // burst 효과 (script.js에 있는 createBurst 재활용)
    if (typeof createBurst === 'function') {
      createBurst(el, 15);
    }
    
    setTimeout(() => {
      generatePracticeQ();
    }, 1500);
  } else {
    // 오답
    el.classList.remove('wrong');
    void el.offsetWidth; // trigger reflow
    el.classList.add('wrong');
    
    updatePracStats();
  }
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
    initPracticeMode(false);
  });
  document.getElementById('btnModePracticeFull').addEventListener('click', () => {
    initPracticeMode(true);
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
    
    // 중복 제거
    const dupIdx = pracKeys.indexOf(key);
    if (dupIdx !== -1 && dupIdx !== pracActiveKeyIdx) {
      pracKeys[dupIdx] = '';
    }
    
    pracKeys[pracActiveKeyIdx] = key;
    pracActiveKeyIdx = -1;
    localStorage.setItem('setGamePracKeys', JSON.stringify(pracKeys));
    renderPracSettingsGrid();
    return;
  }
  
  // 게임 플레이 중 단축키
  if (!document.getElementById('practiceScreen').hidden && document.getElementById('pracSettingsOverlay').hidden) {
    const key = e.key.toLowerCase();
    const idx = pracKeys.findIndex(k => k && k.toLowerCase() === key);
    if (idx !== -1 && !pracWaitNext) {
      const container = document.querySelector(`.prac-options-area .prac-option-container:nth-child(${idx+1})`);
      if (container) handlePracOptionClick(pracOptions[idx], container);
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
  // 라벨 업데이트
  if (!document.getElementById('practiceScreen').hidden) {
    const labels = document.querySelectorAll('.prac-option-label');
    labels.forEach((lbl, i) => {
      lbl.textContent = pracKeys[i] ? pracKeys[i].toUpperCase() : String.fromCharCode(65 + i);
    });
  }
}

if (btnPracSettingsClose) {
  btnPracSettingsClose.addEventListener('click', closePracSettings);
}

if (pracSettingsOverlay) {
  pracSettingsOverlay.addEventListener('click', (e) => {
    if (e.target === pracSettingsOverlay) {
      closePracSettings();
    }
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
