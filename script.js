/* ============================================================
   SET 게임 — script.js
   ============================================================ */

'use strict';

// ──────────────────────────────────────────────
// 1. 상수 및 설정
// ──────────────────────────────────────────────
const IMAGE_BASE   = 'image01/';
const SHAPES       = ['diamond', 'oval', 'squiggle'];
const COLORS       = ['green',   'purple', 'red'];
const FILLS        = ['outline', 'striped', 'solid'];
const TOTAL_TIME   = 120;   // 초
const GRID_SIZE    = 9;     // 3×3

// ──────────────────────────────────────────────
// 2. 게임 상태
// ──────────────────────────────────────────────
let gameMode    = 'countdown';  // 'countdown' | 'deckExhaust'
let deck        = [];   // 덱 소진 모드에서만 사용
let board       = [];   // 현재 화면에 있는 카드 (9장, null 포함)
let selected    = [];   // 선택된 카드 인덱스(board 기준)
let score       = 0;
let timeLeft    = TOTAL_TIME;
let elapsedTime = 0;    // 덱 소진 모드 진행 시간(초)
let timerID     = null;
let gameOver    = false;
let animLock    = false; // 애니메이션 중 입력 방지

// ──────────────────────────────────────────────
// 3. DOM 레퍼런스
// ──────────────────────────────────────────────
const cardGrid      = document.getElementById('cardGrid');
const timerDisplay  = document.getElementById('timerDisplay');
const scoreDisplay  = document.getElementById('scoreDisplay');
const hintText      = document.getElementById('hintText');
const statTimer     = document.getElementById('statTimer');
const statTimerLabel = statTimer.querySelector('.stat-label');
const statTimerUnit  = statTimer.querySelector('.stat-unit');
const selectionBar  = document.getElementById('selectionBar');
const selectionText = document.getElementById('selectionText');
const gameOverlay   = document.getElementById('gameOverlay');
const overlayEmoji  = document.getElementById('overlayEmoji');
const overlayTitle  = document.getElementById('overlayTitle');
const overlayDesc   = document.getElementById('overlayDesc');
const btnRestart    = document.getElementById('btnRestart');
const bgParticles   = document.getElementById('bgParticles');
const modeScreen    = document.getElementById('modeScreen');

// ──────────────────────────────────────────────
// 4. 파티클 배경 생성
// ──────────────────────────────────────────────
function createParticles() {
  // 파티클 배경 비활성화
  bgParticles.style.display = 'none';
}

// ──────────────────────────────────────────────
// 5. 카드 생성 유틸리티
// ──────────────────────────────────────────────

/** 27장 전체 덱을 생성 */
function buildFullDeck() {
  const cards = [];
  for (const shape of SHAPES) {
    for (const color of COLORS) {
      for (const fill of FILLS) {
        cards.push({ shape, color, fill });
      }
    }
  }
  return cards;
}

/** Fisher-Yates 셔플 (in-place) */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** 카드의 이미지 경로 반환 */
function imgPath(card) {
  return `${IMAGE_BASE}${card.shape}_${card.color}_${card.fill}.png`;
}

// ──────────────────────────────────────────────
// 6. SET 판별 로직
// ──────────────────────────────────────────────

/** 세 카드가 유효한 SET인지 판별 */
function isSet(a, b, c) {
  const props = ['shape', 'color', 'fill'];
  for (const prop of props) {
    const vals = new Set([a[prop], b[prop], c[prop]]);
    // 3개가 모두 같거나(size=1) 모두 달라야(size=3) 함
    if (vals.size === 2) return false;
  }
  return true;
}

/** 배열에서 SET가 존재하는지 여부 반환 */
function hasAnySet(cards) {
  for (let i = 0; i < cards.length - 2; i++) {
    for (let j = i + 1; j < cards.length - 1; j++) {
      for (let k = j + 1; k < cards.length; k++) {
        if (isSet(cards[i], cards[j], cards[k])) return true;
      }
    }
  }
  return false;
}

/** 배열에서 유효한 SET 개수 반환 */
function countSets(cards) {
  let count = 0;
  for (let i = 0; i < cards.length - 2; i++) {
    for (let j = i + 1; j < cards.length - 1; j++) {
      for (let k = j + 1; k < cards.length; k++) {
        if (isSet(cards[i], cards[j], cards[k])) count++;
      }
    }
  }
  return count;
}

// ──────────────────────────────────────────────
// 7. 덱 및 보드 초기화
// ──────────────────────────────────────────────

/**
 * SET가 최소 1개 이상 보장된 9장을 보드에 설정.
 * 모드에 따라 deck 사용 여부 분기.
 */
function initBoard() {
  const MAX_TRIES = 500;
  if (gameMode === 'deckExhaust') {
    // 유한 27장 덱: 9장 보드 + 18장 덱
    for (let attempt = 0; attempt < MAX_TRIES; attempt++) {
      const full = shuffle(buildFullDeck());
      const candidate = full.slice(0, GRID_SIZE);
      if (hasAnySet(candidate)) {
        board = candidate;
        deck  = full.slice(GRID_SIZE);
        return;
      }
    }
    const all = shuffle(buildFullDeck());
    board = forcedSetBoard(all);
    deck  = all.filter(c => !board.includes(c));
  } else {
    // 카운트다운 모드: 덱 없이 매번 27장 전체에서 9장 추출
    for (let attempt = 0; attempt < MAX_TRIES; attempt++) {
      const full = shuffle(buildFullDeck());
      const candidate = full.slice(0, GRID_SIZE);
      if (hasAnySet(candidate)) {
        board = candidate;
        return;
      }
    }
    const all = shuffle(buildFullDeck());
    board = forcedSetBoard(all);
  }
}

/**
 * 화면에 놓인 9장을 제외한 나머지 18장의 풀(Pool)을 반환
 * 매번 보충 시에 계산하므로 제거된 카드가 자동으로 풀에 돌아옴
 */
function getPool() {
  const onBoard = board.filter(Boolean);
  const all = buildFullDeck();
  // card는 단순 객체이므로 속성값으로 비교
  return all.filter(c =>
    !onBoard.some(b => b.shape === c.shape && b.color === c.color && b.fill === c.fill)
  );
}

/**
 * 안전망: SET가 없는 경우 강제로 SET 포함 9장 구성
 */
function forcedSetBoard(shuffled) {
  const a = shuffled[0];
  const b = shuffled[1];
  const third = findThirdCard(a, b);
  const base = [a, b, third];
  const rest  = shuffled.filter(c => !base.includes(c)).slice(0, 6);
  return shuffle([...base, ...rest]);
}

/**
 * 두 카드 a, b가 주어졌을 때 SET를 완성하는 세 번째 카드 속성을 계산
 */
function findThirdCard(a, b) {
  const props = ['shape', 'color', 'fill'];
  const sets  = { shape: SHAPES, color: COLORS, fill: FILLS };
  const result = {};
  for (const prop of props) {
    if (a[prop] === b[prop]) {
      result[prop] = a[prop];
    } else {
      // 나머지 하나의 값
      result[prop] = SHAPES.concat(COLORS).concat(FILLS)
        .filter(v => [a[prop], b[prop]].every(x => x !== v) &&
          (prop === 'shape' ? SHAPES.includes(v)
         : prop === 'color' ? COLORS.includes(v)
         : FILLS.includes(v)))[0];
    }
  }
  return result;
}

// ──────────────────────────────────────────────
// 8. SET 제거 후 카드 보충 로직
// ──────────────────────────────────────────────

/**
 * 카드 배열을 SET들로 완전 소진 가능한지 백트래킹으로 검사.
 * 덱 소진 모드에서 "막힘" 방지의 핵심 함수.
 */
function canExhaustAll(cards) {
  if (cards.length === 0) return true;
  for (let i = 0; i < cards.length - 2; i++) {
    for (let j = i + 1; j < cards.length - 1; j++) {
      for (let k = j + 1; k < cards.length; k++) {
        if (isSet(cards[i], cards[j], cards[k])) {
          const rest = cards.filter((_, x) => x !== i && x !== j && x !== k);
          if (canExhaustAll(rest)) return true;
        }
      }
    }
  }
  return false;
}

/** arr에서 k개 뽑는 모든 조합 반환 */
function getCombinations(arr, k) {
  const result = [];
  (function pick(start, cur) {
    if (cur.length === k) { result.push([...cur]); return; }
    for (let i = start; i < arr.length; i++) {
      cur.push(arr[i]);
      pick(i + 1, cur);
      cur.pop();
    }
  })(0, []);
  return result;
}

/**
 * SET로 확인된 3장(boardIndices)을 제거하고 보충.
 * - countdown: 무한 풀 방식
 * - deckExhaust: canExhaustAll을 만족하는 3장 선택 → 덱 소진 실패 원천 차단
 */
function replaceCards(boardIndices) {
  if (gameMode === 'deckExhaust') {
    for (const idx of boardIndices) { board[idx] = null; }

    if (deck.length >= 3) {
      const remaining = board.filter(Boolean); // 6장

      // deck이 작을 때는 전수 탐색, 클 때는 랜덤 시도
      let combos;
      if (deck.length <= 9) {
        combos = getCombinations(deck, 3);
        shuffle(combos);
      } else {
        combos = [];
        for (let t = 0; t < 300; t++) {
          const d = [...deck]; shuffle(d);
          combos.push(d.slice(0, 3));
        }
      }

      for (const trio of combos) {
        // 새로 등장하는 3장 자체가 SET이면 건너뜀
        if (isSet(trio[0], trio[1], trio[2])) continue;
        if (canExhaustAll([...remaining, ...trio])) {
          for (let i = 0; i < 3; i++) board[boardIndices[i]] = trio[i];
          const key = c => `${c.shape}_${c.color}_${c.fill}`;
          const used = new Set(trio.map(key));
          deck = deck.filter(c => !used.has(key(c)));
          return;
        }
      }

      // 안전망: canExhaustAll 불가 시 hasAnySet 기준 (trio 자체 SET 제외)
      for (const trio of combos) {
        if (isSet(trio[0], trio[1], trio[2])) continue;
        const temp = [...board];
        for (let i = 0; i < 3; i++) temp[boardIndices[i]] = trio[i];
        if (hasAnySet(temp.filter(Boolean))) {
          for (let i = 0; i < 3; i++) board[boardIndices[i]] = trio[i];
          const key = c => `${c.shape}_${c.color}_${c.fill}`;
          const used = new Set(trio.map(key));
          deck = deck.filter(c => !used.has(key(c)));
          return;
        }
      }

      // 최후 안전망
      shuffle(deck);
      const nc = deck.splice(0, 3);
      for (let i = 0; i < 3; i++) board[boardIndices[i]] = nc[i];
    }
    return;
  }

  // countdown 모드: 무한 풀
  for (const idx of boardIndices) { board[idx] = null; }
  const MAX_TRIES = 500;
  for (let t = 0; t < MAX_TRIES; t++) {
    const pool = getPool(); shuffle(pool);
    const newCards = pool.slice(0, 3);
    const tempBoard = [...board];
    for (let i = 0; i < 3; i++) tempBoard[boardIndices[i]] = newCards[i];
    if (hasAnySet(tempBoard.filter(Boolean))) {
      for (let i = 0; i < 3; i++) board[boardIndices[i]] = newCards[i];
      return;
    }
  }
  const pool = getPool(); shuffle(pool);
  for (let i = 0; i < 3; i++) board[boardIndices[i]] = pool[i];
}


// ──────────────────────────────────────────────
// 9. UI 렌더링
// ──────────────────────────────────────────────

/** 카드 그리드 전체 렌더링 */
function renderBoard() {
  cardGrid.innerHTML = '';
  board.forEach((card, idx) => {
    if (!card) return;
    const el = createCardElement(card, idx);
    // 명시적 grid 위치 설정 (renderCardAt와 동일한 방식)
    const col = (idx % 3) + 1;
    const row = Math.floor(idx / 3) + 1;
    el.style.gridColumn = col;
    el.style.gridRow    = row;
    cardGrid.appendChild(el);
  });
  updateHint();
}

/** 카드 DOM 요소 생성 */
function createCardElement(card, idx) {
  const el = document.createElement('div');
  el.classList.add('card', 'entering');
  el.dataset.idx = idx;
  el.id = `card-${idx}`;

  const img = document.createElement('img');
  img.src = imgPath(card);
  img.alt = `${card.shape} ${card.color} ${card.fill}`;
  img.draggable = false;

  el.appendChild(img);
  el.addEventListener('click', () => onCardClick(idx));
  return el;
}

/** 특정 인덱스 카드만 교체 렌더링 */
function renderCardAt(idx) {
  const card = board[idx];
  const old  = document.getElementById(`card-${idx}`);
  if (old) old.remove();

  if (!card) return;

  const el = createCardElement(card, idx);
  // grid-area로 정확한 위치에 삽입
  const col = (idx % 3) + 1;
  const row = Math.floor(idx / 3) + 1;
  el.style.gridColumn = col;
  el.style.gridRow    = row;

  cardGrid.appendChild(el);
  updateHint();
}

// ──────────────────────────────────────────────
// 10. 힌트 (가능한 SET 수) 업데이트
// ──────────────────────────────────────────────
function updateHint() {
  const n = countSets(board.filter(Boolean));
  hintText.textContent = `${n}개의 SET가 있습니다.`;
}

// ──────────────────────────────────────────────
// 11. 선택 안내 바 업데이트
// ──────────────────────────────────────────────
function updateSelectionBar(state, text) {
  selectionBar.className  = 'selection-bar';
  selectionText.textContent = text;
  if (state) selectionBar.classList.add(state);
}

// ──────────────────────────────────────────────
// 12. 카드 클릭 처리
// ──────────────────────────────────────────────
function onCardClick(idx) {
  if (gameOver || animLock) return;
  if (!board[idx]) return;

  const el = document.getElementById(`card-${idx}`);
  if (!el) return;

  // 이미 선택된 카드 → 선택 해제
  if (selected.includes(idx)) {
    selected = selected.filter(i => i !== idx);
    el.classList.remove('selected');
    updateSelectionBar(selected.length ? 'active' : null,
      selected.length ? `${selected.length}장 선택됨` : '카드를 3장 선택하세요');
    return;
  }

  // 3장 이미 선택 중이면 무시
  if (selected.length >= 3) return;

  selected.push(idx);
  el.classList.add('selected');

  if (selected.length < 3) {
    updateSelectionBar('active', `${selected.length}장 선택됨`);
    return;
  }

  // 3장 완성 → 선택 모션이 보이도록 짧은 딜레이 후 SET 판별
  updateSelectionBar('active', '3장 선택됨');
  setTimeout(() => evaluateSelection(), 200);
}

// ──────────────────────────────────────────────
// 13. SET 판별 및 처리
// ──────────────────────────────────────────────
function evaluateSelection() {
  animLock = true;

  const [i, j, k] = selected;
  const a = board[i], b = board[j], c = board[k];
  const valid = isSet(a, b, c);

  const elems = selected.map(idx => document.getElementById(`card-${idx}`));

  if (valid) {
    elems.forEach(el => el.classList.remove('selected'));
    score++;
    scoreDisplay.textContent = score;

    const indices = [...selected];
    selected = [];
    replaceCards(indices);
    indices.forEach(idx => renderCardAt(idx));
    updateHint();

    // 덕 소진 모드: 종료 조건 체크
    if (gameMode === 'deckExhaust') {
      const remaining = board.filter(Boolean);
      if (remaining.length === 0 ||
          (deck.length === 0 && !hasAnySet(remaining))) {
        animLock = false;
        setTimeout(() => endGame(), 300);
        return;
      }
    }

    updateSelectionBar('success', '정답입니다.');
    setTimeout(() => {
      updateSelectionBar(null, '카드를 3장 선택하세요');
    }, 700);
    animLock = false;

  } else {
    elems.forEach(el => el.classList.remove('selected'));
    selected = [];
    updateSelectionBar('fail', 'SET가 아닙니다.');
    setTimeout(() => {
      updateSelectionBar(null, '카드를 3장 선택하세요');
    }, 700);
    animLock = false;
  }
}



// ──────────────────────────────────────────────
// 15. 타이머 (카운트다운 / 카운트업)
// ──────────────────────────────────────────────
function formatTime(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function startTimer() {
  clearInterval(timerID);
  statTimer.classList.remove('danger');

  if (gameMode === 'countdown') {
    timeLeft = TOTAL_TIME;
    timerDisplay.textContent = timeLeft;
    timerDisplay.style.minWidth = '2ch';
    statTimerLabel.textContent = '남은 시간';
    statTimerUnit.textContent = '초';
    timerID = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = timeLeft;
      if (timeLeft <= 20) statTimer.classList.add('danger');
      if (timeLeft <= 0) { clearInterval(timerID); endGame(); }
    }, 1000);
  } else {
    elapsedTime = 0;
    timerDisplay.textContent = '0:00:00';
    timerDisplay.style.minWidth = 'auto';
    statTimerLabel.textContent = '진행 시간';
    statTimerUnit.textContent = '';
    timerID = setInterval(() => {
      elapsedTime++;
      timerDisplay.textContent = formatTime(elapsedTime);
    }, 1000);
  }
}

// ──────────────────────────────────────────────
// 16. 게임 종료
// ──────────────────────────────────────────────
function endGame() {
  gameOver = true;
  animLock = true;
  clearInterval(timerID);

  document.querySelectorAll('.card').forEach(el => el.classList.add('disabled'));

  if (gameMode === 'countdown') {
    overlayEmoji.textContent = score >= 5 ? '🏆' : score >= 3 ? '🎉' : '😅';
    overlayTitle.textContent = '시간 종료!';
    overlayDesc.innerHTML =
      `총 <strong style="color:#f5c842">${score}</strong>개의 SET를 찾았어요!<br>` +
      (score >= 5 ? '훌륭한 실력입니다! 👏' :
       score >= 3 ? '좋은 성적이에요! 계속 도전해보세요.' :
                   '연습하면 분명 더 잘할 수 있어요! 💪');
  } else {
    const allCleared = board.filter(Boolean).length === 0;
    if (allCleared) {
      overlayEmoji.textContent = '🎉';
      overlayTitle.textContent = '축하합니다!';
      overlayDesc.innerHTML =
        `27장의 카드를 모두 소진했습니다!<br>` +
        `기록: <strong style="color:#f5c842">${formatTime(elapsedTime)}</strong>`;
    } else {
      overlayEmoji.textContent = '😔';
      overlayTitle.textContent = '덱 소진 실패';
      overlayDesc.innerHTML =
        `남은 카드로 SET를 만들 수 없습니다.<br>` +
        `${score}개의 SET를 찾았어요. 재도전해보세요!`;
    }
  }

  gameOverlay.hidden = false;
}

// ──────────────────────────────────────────────
// 17. 게임 시작
// ──────────────────────────────────────────────
function startGame() {
  gameOver    = false;
  animLock    = false;
  score       = 0;
  selected    = [];
  deck        = [];
  elapsedTime = 0;

  scoreDisplay.textContent = '0';
  hintText.textContent = '';
  statTimer.classList.remove('danger');
  gameOverlay.hidden = true;

  updateSelectionBar(null, '카드를 3장 선택하세요');
  initBoard();
  renderBoard();
  startTimer();
}

// ──────────────────────────────────────────────
// 18. 이벤트 바인딩
// ──────────────────────────────────────────────

// 다시 시작 → 모드 선택 화면으로
btnRestart.addEventListener('click', () => {
  gameOverlay.hidden = true;
  modeScreen.hidden = false;
});

// 모드 선택
document.getElementById('btnModeCountdown').addEventListener('click', () => {
  gameMode = 'countdown';
  modeScreen.hidden = true;
  startGame();
});
document.getElementById('btnModeDeck').addEventListener('click', () => {
  gameMode = 'deckExhaust';
  modeScreen.hidden = true;
  startGame();
});

// ──────────────────────────────────────────────
// 19. 키보드 단축키
// ──────────────────────────────────────────────
// 키맵:
//   Q(ㅂ) W(ㅈ) E(ㄷ) → card 0,1,2
//   A(ㅁ) S(ㄴ) D(ㅇ) → card 3,4,5
//   Z(ㅋ) X(ㅌ) C(ㅊ) → card 6,7,8
//   Numpad7  8  9     → card 0,1,2
//   Numpad4  5  6     → card 3,4,5
//   Numpad1  2  3     → card 6,7,8
const KEY_MAP = {
  'KeyQ': 0, 'KeyW': 1, 'KeyE': 2,
  'KeyA': 3, 'KeyS': 4, 'KeyD': 5,
  'KeyZ': 6, 'KeyX': 7, 'KeyC': 8,
  'Numpad7': 0, 'Numpad8': 1, 'Numpad9': 2,
  'Numpad4': 3, 'Numpad5': 4, 'Numpad6': 5,
  'Numpad1': 6, 'Numpad2': 7, 'Numpad3': 8,
};

document.addEventListener('keydown', (e) => {
  if (gameOver || animLock) return;
  // 입력줄에 포커스되어 있으면 무시
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  const idx = KEY_MAP[e.code];
  if (idx !== undefined) {
    e.preventDefault();
    onCardClick(idx);
  }
});

// ──────────────────────────────────────────────
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
