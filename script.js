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
const TOTAL_TIME   = 120;   // 카운트다운 초
const GRID_SIZE    = 9;     // 27장 모드 3×3
const TARGET_SETS  = 20;    // 20 SET 타임어택 목표
const COUNTS       = [1, 2, 3];   // 정시 모드 4번째 속성
const OFFICIAL_GRID = 12;  // 81장 모드 4×3

// ──────────────────────────────────────────────
// 2. 게임 상태
// ──────────────────────────────────────────────
let gameMode    = 'countdown';  // 'countdown' | 'deckExhaust' | 'official'
let deck        = [];   // (현재 미사용, 향후 확장용)
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
// 로고 색상 랜덤 무작위 지정 (#e71f19, #167c3b, #702071 3색을 1:1 대응)
// ──────────────────────────────────────────────
function randomizeLogoColors() {
  const colors = ['#e71f19', '#167c3b', '#702071'];
  // Fisher-Yates 셔플
  for (let i = colors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [colors[i], colors[j]] = [colors[j], colors[i]];
  }
  const s = document.getElementById('logoS');
  const e = document.getElementById('logoE');
  const t = document.getElementById('logoT');
  if (s && e && t) {
    s.style.color = colors[0];
    e.style.color = colors[1];
    t.style.color = colors[2];
  }
}
document.addEventListener('DOMContentLoaded', randomizeLogoColors);
randomizeLogoColors();

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
  for (const shape of SHAPES)
    for (const color of COLORS)
      for (const fill of FILLS)
        cards.push({ shape, color, fill });
  return cards;
}

/** 81장 전체 덱을 생성 (4속성: 모양·색상·솨치기·개수) */
function buildOfficialDeck() {
  const cards = [];
  for (const shape of SHAPES)
    for (const color of COLORS)
      for (const fill of FILLS)
        for (const count of COUNTS)
          cards.push({ shape, color, fill, count });
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

/** 27장 모드: 3속성 SET 판별 */
function isSet(a, b, c) {
  const props = ['shape', 'color', 'fill'];
  for (const prop of props) {
    const vals = new Set([a[prop], b[prop], c[prop]]);
    if (vals.size === 2) return false;
  }
  return true;
}

/** 81장 정시 모드: 4속성 SET 판별 */
function isSetOfficial(a, b, c) {
  const props = ['shape', 'color', 'fill', 'count'];
  for (const prop of props) {
    const vals = new Set([a[prop], b[prop], c[prop]]);
    if (vals.size === 2) return false;
  }
  return true;
}

/** 현재 모드에 맞는 isSet 함수 반환 */
function getIsSet() {
  return (gameMode === 'official' || gameMode === 'officialDeckExhaust') ? isSetOfficial : isSet;
}

/** 배열에서 SET가 존재하는지 여부 반환 */
function hasAnySet(cards) {
  const fn = getIsSet();
  for (let i = 0; i < cards.length - 2; i++)
    for (let j = i + 1; j < cards.length - 1; j++)
      for (let k = j + 1; k < cards.length; k++)
        if (fn(cards[i], cards[j], cards[k])) return true;
  return false;
}

/** 배열에서 유효한 SET 개수 반환 */
function countSets(cards) {
  const fn = getIsSet();
  let count = 0;
  for (let i = 0; i < cards.length - 2; i++)
    for (let j = i + 1; j < cards.length - 1; j++)
      for (let k = j + 1; k < cards.length; k++)
        if (fn(cards[i], cards[j], cards[k])) count++;
  return count;
}

// ──────────────────────────────────────────────
// 7. 덱 및 보드 초기화
// ──────────────────────────────────────────────

/**
 * SET가 최소 1개 이상 보장된 9장을 보드에 설정.
 * 정시 모드는 initOfficialBoard() 로 분기.
 */
function initBoard() {
  if (gameMode === 'official' || gameMode === 'officialDeckExhaust') { initOfficialBoard(); return; }
  const MAX_TRIES = 500;
  for (let attempt = 0; attempt < MAX_TRIES; attempt++) {
    const full = shuffle(buildFullDeck());
    const candidate = full.slice(0, GRID_SIZE);
    if (hasAnySet(candidate)) {
      board = candidate;
      deck  = [];
      return;
    }
  }
  const all = shuffle(buildFullDeck());
  board = forcedSetBoard(all);
  deck  = [];
}

/** 81장 정시 모드 보드 초기화 (12장 + 69장 덱) */
function initOfficialBoard() {
  const MAX_TRIES = 1000;
  for (let attempt = 0; attempt < MAX_TRIES; attempt++) {
    const full = shuffle(buildOfficialDeck());
    const candidate = full.slice(0, OFFICIAL_GRID);
    if (hasAnySet(candidate)) {
      board = candidate;
      deck  = full.slice(OFFICIAL_GRID);
      return;
    }
  }
  // 안전망: 조건 미충족 시 강제 배치
  const all = shuffle(buildOfficialDeck());
  board = all.slice(0, OFFICIAL_GRID);
  deck  = all.slice(OFFICIAL_GRID);
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

/** cards 안의 모든 SET 인덱스 삼중쌍 반환 */
function getAllSets(cards) {
  const sets = [];
  for (let i = 0; i < cards.length - 2; i++)
    for (let j = i + 1; j < cards.length - 1; j++)
      for (let k = j + 1; k < cards.length; k++)
        if (isSet(cards[i], cards[j], cards[k])) sets.push([i, j, k]);
  return sets;
}

/**
 * [약한] 어떤 경로 하나라도 완전 소진 가능하면 true.
 */
function canExhaustAll(cards) {
  if (cards.length === 0) return true;
  for (let i = 0; i < cards.length - 2; i++)
    for (let j = i + 1; j < cards.length - 1; j++)
      for (let k = j + 1; k < cards.length; k++)
        if (isSet(cards[i], cards[j], cards[k])) {
          const rest = cards.filter((_, x) => x !== i && x !== j && x !== k);
          if (canExhaustAll(rest)) return true;
        }
  return false;
}

/**
 * [강한] 사용자가 어떤 SET를 선택해도 완전 소진 가능하면 true.
 * 모든 SET 선택이 재귀적으로 강하게 소진 가능해야 함.
 */
function stronglyExhaustible(cards) {
  if (cards.length === 0) return true;
  const sets = getAllSets(cards);
  if (sets.length === 0) return false;
  return sets.every(([i, j, k]) => {
    const rest = cards.filter((_, x) => x !== i && x !== j && x !== k);
    return stronglyExhaustible(rest);
  });
}

/**
 * nine(9장)에서 사용자가 어떤 SET를 선택해도,
 * 남은 6장 + deck3(마지막 덱 3장)이 stronglyExhaustible이면 true.
 * deck=6일 때 5번째 보충에서 6번째(최종) 보충 결과를 미리 보장.
 */
function allSETsLeadToStrongly(nine, deck3) {
  const sets = getAllSets(nine);
  if (sets.length === 0) return false;
  return sets.every(([i, j, k]) => {
    const rest = nine.filter((_, x) => x !== i && x !== j && x !== k);
    return stronglyExhaustible([...rest, ...deck3]);
  });
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
 * SET로 확인된 3장을 영구 제거하고 보충.
 * deckExhaust: 3단계 기준으로 소진 실패 원천 차단
 *   1순위: stronglyExhaustible (사용자의 모든 선택이 안전)
 *   2순위: canExhaustAll (어떤 경로 하나라도 소진 가능)
 *   3순위: hasAnySet (최소한 SET 존재)
 */
function replaceCards(boardIndices) {
  if (gameMode === 'official' || gameMode === 'officialDeckExhaust') { replaceOfficialCards(boardIndices); return; }

  // 27장 븴로: 두 모드 모두 무한 풀 방식으로 통일
  for (const idx of boardIndices) { board[idx] = null; }
  const MAX_TRIES = 500;
  for (let t = 0; t < MAX_TRIES; t++) {
    const pool = getPool(); shuffle(pool);
    const newCards = pool.slice(0, 3);

    // 신규 조건: 보충 3장 자체가 SET이면 건너뜀
    if (isSet(newCards[0], newCards[1], newCards[2])) continue;

    const tempBoard = [...board];
    for (let i = 0; i < 3; i++) tempBoard[boardIndices[i]] = newCards[i];

    // 기존 조건: 전체 9장 안에 SET 1개 이상 존재
    if (hasAnySet(tempBoard.filter(Boolean))) {
      for (let i = 0; i < 3; i++) board[boardIndices[i]] = newCards[i];
      return;
    }
  }
  // 안전망: 신규 조건(3장 자체 SET 금지)만 유지
  const pool = getPool(); shuffle(pool);
  for (let i = 0; i + 2 < pool.length; i++) {
    const a = pool[i], b = pool[i + 1], c = pool[i + 2];
    if (!isSet(a, b, c)) {
      board[boardIndices[0]] = a;
      board[boardIndices[1]] = b;
      board[boardIndices[2]] = c;
      return;
    }
  }
  // 최후: 조건 포기하고 그냥 채움
  for (let i = 0; i < 3; i++) board[boardIndices[i]] = pool[i];
}

/** 81장 정식 모드 카드 보충 (덱 소진 시 재셔플) */
function replaceOfficialCards(boardIndices) {
  for (const idx of boardIndices) board[idx] = null;

  // 덱이 3장 미만이면 재셔플 (보드에 없는 카드로 새 덱 구성)
  if (deck.length < 3) {
    const onBoard = board.filter(Boolean);
    const newDeck = shuffle(buildOfficialDeck()).filter(c => {
      return !onBoard.some(b =>
        b.shape === c.shape && b.color === c.color &&
        b.fill === c.fill && b.count === c.count
      );
    });
    deck = newDeck;
  }

  const MAX_TRIES = 500;
  for (let t = 0; t < MAX_TRIES; t++) {
    const shuffledDeck = [...deck];
    shuffle(shuffledDeck);
    const newCards = shuffledDeck.slice(0, 3);

    if (isSetOfficial(newCards[0], newCards[1], newCards[2])) continue;

    const tempBoard = [...board];
    for (let i = 0; i < 3; i++) tempBoard[boardIndices[i]] = newCards[i];
    if (hasAnySet(tempBoard.filter(Boolean))) {
      const key = c => `${c.shape}_${c.color}_${c.fill}_${c.count}`;
      const usedKeys = new Set(newCards.map(key));
      for (let i = 0; i < 3; i++) board[boardIndices[i]] = newCards[i];
      deck = deck.filter(c => !usedKeys.has(key(c)));
      return;
    }
  }
  // 안전망: 덱 앞에서 3장 그냥 배치
  for (let i = 0; i < 3; i++) board[boardIndices[i]] = deck.shift();
}



// ──────────────────────────────────────────────
// 9. UI 렌더링
// ──────────────────────────────────────────────

/** 카드 그리드 전체 렌더링 */
function renderBoard() {
  cardGrid.innerHTML = '';
  // 정식 모드일 때 4행 그리드 적용
  if (gameMode === 'official' || gameMode === 'officialDeckExhaust') {
    cardGrid.classList.add('official');
  } else {
    cardGrid.classList.remove('official');
  }
  let cols = 3;
  if ((gameMode === 'official' || gameMode === 'officialDeckExhaust') && officialLayout === '3x4') cols = 4;
  
  board.forEach((card, idx) => {
    if (!card) return;
    const el = createCardElement(card, idx);
    const col = (idx % cols) + 1;
    const row = Math.floor(idx / cols) + 1;
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

  if (card.count !== undefined) {
    // 81장 정시 모드: count만큼 이미지 반복
    const inner = document.createElement('div');
    inner.className = `card-symbols count-${card.count}`;
    for (let i = 0; i < card.count; i++) {
      const img = document.createElement('img');
      img.src = imgPath(card);
      img.alt = `${card.shape} ${card.color} ${card.fill} ${card.count}`;
      img.className = 'card-symbol';
      img.draggable = false;
      inner.appendChild(img);
    }
    el.appendChild(inner);
  } else {
    // 27장 모드: 단일 이미지
    const img = document.createElement('img');
    img.src = imgPath(card);
    img.alt = `${card.shape} ${card.color} ${card.fill}`;
    img.draggable = false;
    el.appendChild(img);
  }

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
  let cols = 3;
  if ((gameMode === 'official' || gameMode === 'officialDeckExhaust') && officialLayout === '3x4') cols = 4;
  
  const col = (idx % cols) + 1;
  const row = Math.floor(idx / cols) + 1;
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

  // 3장 완성 → 선택 모션이 보이도록 아주 짧은 딜레이 후 SET 판별
  updateSelectionBar('active', '3장 선택됨');
  setTimeout(() => evaluateSelection(), 50);
}

// ──────────────────────────────────────────────
// 13. SET 판별 및 처리
// ──────────────────────────────────────────────
function evaluateSelection() {
  animLock = true;

  const [i, j, k] = selected;
  const a = board[i], b = board[j], c = board[k];
  const valid = (gameMode === 'official' || gameMode === 'officialDeckExhaust') ? isSetOfficial(a, b, c) : isSet(a, b, c);

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

    // 20 SET 타임어택: 목표 달성 시 종료
    if ((gameMode === 'deckExhaust' || gameMode === 'officialDeckExhaust') && score >= TARGET_SETS) {
      animLock = false;
      setTimeout(() => endGame(), 300);
      return;
    }

    // 정식 모드: 종료 조건 없음 (무한 카드, 타이머가 끝날 때만 종료)
    // 종료는 타이머 0이 되면 endGame()이 자동 호출됨

    updateSelectionBar('success', '정답입니다.');
    setTimeout(() => {
      updateSelectionBar(null, '카드를 3장 선택하세요');
    }, 400);
    animLock = false;

  } else {
    elems.forEach(el => el.classList.remove('selected'));
    selected = [];
    updateSelectionBar('fail', 'SET가 아닙니다.');
    setTimeout(() => {
      updateSelectionBar(null, '카드를 3장 선택하세요');
    }, 400);
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

  if (gameMode === 'countdown' || gameMode === 'official') {
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

  if (gameMode === 'countdown' || gameMode === 'official') {
    overlayEmoji.textContent = score >= 5 ? '🏆' : score >= 3 ? '🎉' : '😅';
    overlayTitle.textContent = '시간 종료!';
    overlayDesc.innerHTML =
      `총 <strong style="color:#f5c842">${score}</strong>개의 SET를 찾았어요!<br>` +
      (score >= 5 ? '훌륭한 실력입니다! 👏' :
       score >= 3 ? '좋은 성적이에요! 계속 도전해보세요.' :
                   '연습하면 분명 더 잘할 수 있어요! 💪');
  } else if (gameMode === 'deckExhaust' || gameMode === 'officialDeckExhaust') {
    overlayEmoji.textContent = '🏅';
    overlayTitle.textContent = `${TARGET_SETS} SET 달성!`;
    overlayDesc.innerHTML =
      `20개의 SET를 모두 찾았습니다!<br>` +
      `기록: <strong style="color:#f5c842">${formatTime(elapsedTime)}</strong>`;
  } else {
    // 81장 정식 모드 종료 (타이머 종료)
    overlayEmoji.textContent = '⏱';
    overlayTitle.textContent = '시간 종료!';
    overlayDesc.innerHTML =
      `총 <strong style="color:#f5c842">${score}</strong>개의 SET를 찾았어요!<br>` +
      (score >= 10 ? '👏 대단한 실력입니다!' : score >= 5 ? '좋은 성적이에요!' : '다음엔 더 잘 할 수 있어요! 💪');
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

  document.getElementById('floatingMenu').hidden = false;

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

// 대문으로 돌아가기 공통 함수
function returnToHome() {
  clearInterval(timerID);
  gameOverlay.hidden = true;
  document.getElementById('floatingMenu').hidden = true;
  randomizeLogoColors();
  modeScreen.hidden = false;
}

// 오버레이 다시 시작 → 모드 선택 화면으로
btnRestart.addEventListener('click', returnToHome);

// 플로팅 액션 버튼
document.getElementById('btnFloatRestart').addEventListener('click', () => {
  if (!gameOver) clearInterval(timerID);
  startGame();
});
document.getElementById('btnFloatHome').addEventListener('click', returnToHome);

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
document.getElementById('btnModeOfficial').addEventListener('click', () => {
  gameMode = 'official';
  modeScreen.hidden = true;
  buildKeyMap();
  applyLayout();
  startGame();
});
document.getElementById('btnModeOfficialDeck').addEventListener('click', () => {
  gameMode = 'officialDeckExhaust';
  modeScreen.hidden = true;
  buildKeyMap();
  applyLayout();
  startGame();
});

// ──────────────────────────────────────────────
// 19. 단축키 시스템 (사용자 설정 가능)
// ──────────────────────────────────────────────

// 기본 키 (4행 3열 - Preset 1)
const DEFAULT_KEYS_4X3_PRESET1 = [
  'Digit1','Digit2','Digit3',
  'KeyQ',  'KeyW',  'KeyE',
  'KeyA',  'KeyS',  'KeyD',
  'KeyZ',  'KeyX',  'KeyC',
];
// 기본 키 (3행 4열 - Preset 1)
const DEFAULT_KEYS_3X4_PRESET1 = [
  'Digit1','Digit2','Digit3','Digit4',
  'KeyQ',  'KeyW',  'KeyE',  'KeyR',
  'KeyA',  'KeyS',  'KeyD',  'KeyF',
];

// 프리셋 2 (QWE~ 4행 3열)
const PRESET2_4X3 = [
  'KeyQ',  'KeyW',  'KeyE',
  'KeyA',  'KeyS',  'KeyD',
  'KeyZ',  'KeyX',  'KeyC',
  '',      '',      '',
];
// 프리셋 2 (QWE~ 3행 4열)
const PRESET2_3X4 = [
  'KeyQ',  'KeyW',  'KeyE',  'KeyR',
  'KeyA',  'KeyS',  'KeyD',  'KeyF',
  'KeyZ',  'KeyX',  'KeyC',  'KeyV',
];
const DEFAULT_KEYS_3X4 = [
  'Digit1','Digit2','Digit3','Digit4',
  'KeyQ',  'KeyW',  'KeyE',  'KeyR',
  'KeyA',  'KeyS',  'KeyD',  'KeyF',
];

let officialLayout = localStorage.getItem('setGameLayout') === '3x4' ? '3x4' : '4x3';

function getDefaultKeys(preset = 1) {
  if ((gameMode === 'official' || gameMode === 'officialDeckExhaust') && officialLayout === '3x4') {
    return preset === 2 ? PRESET2_3X4 : DEFAULT_KEYS_3X4_PRESET1;
  }
  return preset === 2 ? PRESET2_4X3 : DEFAULT_KEYS_4X3_PRESET1;
}

// 넘패드: 항상 보조 활성화 (설정 불가, 고정)
const NUMPAD_MAP = {
  'Numpad7': 0, 'Numpad8': 1, 'Numpad9': 2,
  'Numpad4': 3, 'Numpad5': 4, 'Numpad6': 5,
  'Numpad1': 6, 'Numpad2': 7, 'Numpad3': 8,
};

// 로컬스토리지에서 불러오기 (배열에 따라 별도 저장 권장하나 단순화를 위해 일단 하나의 키 배열 사용 시엔 기본값으로 덮어씀, 여기서는 각각 저장)
let userKeys4x3 = (() => {
  try {
    const saved = JSON.parse(localStorage.getItem('setGameKeys4x3') || localStorage.getItem('setGameKeys'));
    if (Array.isArray(saved) && saved.length === 12) return saved;
  } catch(_) {}
  return [...DEFAULT_KEYS_4X3_PRESET1];
})();
let userKeys3x4 = (() => {
  try {
    const saved = JSON.parse(localStorage.getItem('setGameKeys3x4'));
    if (Array.isArray(saved) && saved.length === 12) return saved;
  } catch(_) {}
  return [...DEFAULT_KEYS_3X4_PRESET1];
})();

function getCurrentUserKeys() {
  if ((gameMode === 'official' || gameMode === 'officialDeckExhaust') && officialLayout === '3x4') return userKeys3x4;
  return userKeys4x3;
}

// 동적 KEY_MAP 빌드
let KEY_MAP = {};
function buildKeyMap() {
  KEY_MAP = { ...NUMPAD_MAP };
  getCurrentUserKeys().forEach((code, cardIdx) => {
    if (code) KEY_MAP[code] = cardIdx;
  });
}
buildKeyMap();

// e.code → 표시용 라벨
function keyLabel(code) {
  if (!code) return '—';
  if (code.startsWith('Digit')) return code.slice(5);
  if (code.startsWith('Key'))   return code.slice(3);
  if (code.startsWith('Numpad')) return 'N' + code.slice(6);
  if (code === 'Space') return 'SPC';
  if (code === 'Enter') return '↵';
  if (code === 'Backspace') return '⌫';
  if (code === 'ArrowUp')    return '↑';
  if (code === 'ArrowDown')  return '↓';
  if (code === 'ArrowLeft')  return '←';
  if (code === 'ArrowRight') return '→';
  return code.replace(/^(Key|Digit|Arrow)/, '');
}

// 카드 위치 라벨 (행, 열)
function posLabel(idx) {
  let cols = 3;
  if ((gameMode === 'official' || gameMode === 'officialDeckExhaust') && officialLayout === '3x4') cols = 4;
  const row = Math.floor(idx / cols) + 1;
  const col = (idx % cols) + 1;
  return `${row}행 ${col}열`;
}

// ── 설정 모달 로직 ──
const settingsOverlay = document.getElementById('settingsOverlay');
const settingsGrid    = document.getElementById('settingsGrid');
let   listeningIdx    = -1;   // 현재 키 입력 대기 중인 칸 인덱스
let   tempKeys        = [];   // 모달 내 임시 편집 상태

function buildSettingsGrid() {
  const count = (gameMode === 'official' || gameMode === 'officialDeckExhaust') ? 12 : 9;
  settingsGrid.innerHTML = '';
  const cols = ((gameMode === 'official' || gameMode === 'officialDeckExhaust') && officialLayout === '3x4') ? 4 : 3;
  settingsGrid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  for (let i = 0; i < count; i++) {
    const cell = document.createElement('div');
    cell.className = 'key-cell';
    cell.dataset.idx = i;
    cell.innerHTML = `
      <span class="key-cell-pos">${posLabel(i)}</span>
      <span class="key-cell-badge" id="keybadge-${i}">${keyLabel(tempKeys[i])}</span>
    `;
    cell.addEventListener('click', () => startListening(i));
    settingsGrid.appendChild(cell);
  }
}

function startListening(idx) {
  // 이전 리스닝 해제
  if (listeningIdx >= 0) {
    const prev = settingsGrid.querySelector(`[data-idx="${listeningIdx}"]`);
    if (prev) { prev.classList.remove('listening'); prev.querySelector('.key-cell-badge').textContent = keyLabel(tempKeys[listeningIdx]); }
  }
  listeningIdx = idx;
  const cell  = settingsGrid.querySelector(`[data-idx="${idx}"]`);
  const badge = cell.querySelector('.key-cell-badge');
  cell.classList.add('listening');
  badge.textContent = '…';
}

function stopListening() {
  if (listeningIdx < 0) return;
  const cell = settingsGrid.querySelector(`[data-idx="${listeningIdx}"]`);
  if (cell) cell.classList.remove('listening');
  listeningIdx = -1;
}

// 회전 설정 로드
let cardRotated = localStorage.getItem('setGameRotate') === '1';
function applyRotation() {
  cardGrid.classList.toggle('rotated', cardRotated);
}
applyRotation();

function applyLayout() {
  cardGrid.classList.toggle('official-3x4', officialLayout === '3x4');
  if (board.length > 0) renderBoard(); // 이미 게임 중이면 재렌더링하여 인라인 스타일 갱신
}
applyLayout();

function openSettings() {
  tempKeys = [...getCurrentUserKeys()];
  
  document.getElementById('chkRotate').checked = cardRotated;
  
  const chkLayout = document.getElementById('chkLayout');
  const layoutContainer = document.getElementById('layoutSettingContainer');
  if (gameMode === 'official' || gameMode === 'officialDeckExhaust') {
    layoutContainer.style.display = 'block';
    const is3x4 = (officialLayout === '3x4');
    chkLayout.checked = is3x4;
    chkLayout.nextElementSibling.textContent = is3x4 ? '4행 3열로 보기' : '3행 4열로 보기';
  } else {
    layoutContainer.style.display = 'none';
  }
  
  buildSettingsGrid();
  settingsOverlay.hidden = false;
}
function closeSettings() {
  stopListening();
  settingsOverlay.hidden = true;
}

// 토글 실시간 적용 및 자동 저장
document.getElementById('chkRotate').addEventListener('change', (e) => {
  cardRotated = e.target.checked;
  localStorage.setItem('setGameRotate', cardRotated ? '1' : '0');
  applyRotation();
});
document.getElementById('chkLayout').addEventListener('change', (e) => {
  if (gameMode === 'official' || gameMode === 'officialDeckExhaust') {
    const is3x4 = e.target.checked;
    officialLayout = is3x4 ? '3x4' : '4x3';
    e.target.nextElementSibling.textContent = is3x4 ? '4행 3열로 보기' : '3행 4열로 보기';
    localStorage.setItem('setGameLayout', officialLayout);
    applyLayout();
    
    // 배열이 바뀌면 단축키 배열 데이터도 교체 후 UI 재생성
    tempKeys = [...getCurrentUserKeys()];
    buildSettingsGrid();
    buildKeyMap();
  }
});

document.getElementById('btnSettings').addEventListener('click', openSettings);
document.getElementById('btnSettingsClose').addEventListener('click', closeSettings);
settingsOverlay.addEventListener('click', (e) => { if (e.target === settingsOverlay) closeSettings(); });

function applyPreset(presetNum) {
  tempKeys = [...getDefaultKeys(presetNum)];
  if ((gameMode === 'official' || gameMode === 'officialDeckExhaust') && officialLayout === '3x4') {
    userKeys3x4 = [...tempKeys];
    localStorage.setItem('setGameKeys3x4', JSON.stringify(userKeys3x4));
  } else {
    userKeys4x3 = [...tempKeys];
    localStorage.setItem('setGameKeys4x3', JSON.stringify(userKeys4x3));
  }
  buildKeyMap();
  buildSettingsGrid();
  stopListening();
}

document.getElementById('btnPreset1').addEventListener('click', () => applyPreset(1));
document.getElementById('btnPreset2').addEventListener('click', () => applyPreset(2));

// 설정 모달 키 캡처
document.addEventListener('keydown', (e) => {
  // ── 설정 모달이 열려 있을 때 ──
  if (!settingsOverlay.hidden) {
    if (listeningIdx < 0) return;
    e.preventDefault();
    if (e.code === 'Escape') { stopListening(); return; }

    // 이미 다른 칸에 할당된 키이면 교환
    const conflict = tempKeys.indexOf(e.code);
    if (conflict >= 0 && conflict !== listeningIdx) {
      tempKeys[conflict] = '';
      const badge = document.getElementById(`keybadge-${conflict}`);
      if (badge) badge.textContent = '—';
    }
  // 키 바인딩 시 즉시 저장
  if (tempKeys[listeningIdx] !== e.code) {
    tempKeys[listeningIdx] = e.code;
    
    // 자동 저장 로직
    if ((gameMode === 'official' || gameMode === 'officialDeckExhaust') && officialLayout === '3x4') {
      userKeys3x4 = [...tempKeys];
      localStorage.setItem('setGameKeys3x4', JSON.stringify(userKeys3x4));
    } else {
      userKeys4x3 = [...tempKeys];
      localStorage.setItem('setGameKeys4x3', JSON.stringify(userKeys4x3));
    }
    buildKeyMap();
  }
  
  const cell  = settingsGrid.querySelector(`[data-idx="${listeningIdx}"]`);
  const badge = cell.querySelector('.key-cell-badge');
  badge.textContent = keyLabel(e.code);
  cell.classList.remove('listening');
  listeningIdx = -1;
    return;
  }

  // ── 게임 중 단축키 ──
  if (gameOver || animLock) return;
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  const idx = KEY_MAP[e.code];
  if (idx !== undefined) {
    e.preventDefault();
    onCardClick(idx);
  }
});

// ══════════════════════════════════════════════
// TUTORIAL MODULE — Junior SET (27종 카드)
// ══════════════════════════════════════════════

// 설명용 고정 카드
const TUT_CARDS_INTRO = [
  { shape: 'oval',     color: 'green',  fill: 'outline' },
  { shape: 'diamond',  color: 'purple', fill: 'striped' },
  { shape: 'squiggle', color: 'red',    fill: 'solid'   },
];
const TUT_CARDS_SHAPE = [
  { shape: 'oval',     color: 'green', fill: 'outline' },
  { shape: 'diamond',  color: 'green', fill: 'outline' },
  { shape: 'squiggle', color: 'green', fill: 'outline' },
];
const TUT_CARDS_COLOR = [
  { shape: 'oval', color: 'green',  fill: 'outline' },
  { shape: 'oval', color: 'purple', fill: 'outline' },
  { shape: 'oval', color: 'red',    fill: 'outline' },
];
const TUT_CARDS_FILL = [
  { shape: 'oval', color: 'green', fill: 'outline' },
  { shape: 'oval', color: 'green', fill: 'striped' },
  { shape: 'oval', color: 'green', fill: 'solid'   },
];
// 색이 모두 야은 예시 (attrquiz 색 스텝용)
const TUT_CARDS_COLOR_SAME = [
  { shape: 'oval',     color: 'green', fill: 'outline' },
  { shape: 'diamond',  color: 'green', fill: 'striped' },
  { shape: 'squiggle', color: 'green', fill: 'solid'   },
];
// Challenge 1: 6장 — 유일한 SET는 인덱스 0,1,2 (수학적으로 검증 완료)
const TUT_C1_BASE = [
  { shape: 'oval',     color: 'green',  fill: 'outline' }, // 정답 A
  { shape: 'diamond',  color: 'purple', fill: 'striped' }, // 정답 B
  { shape: 'squiggle', color: 'red',    fill: 'solid'   }, // 정답 C
  { shape: 'diamond',  color: 'green',  fill: 'outline' }, // 오답
  { shape: 'oval',     color: 'red',    fill: 'striped' }, // 오답
  { shape: 'squiggle', color: 'purple', fill: 'outline' }, // 오답
];

// 퀴즈용 고정 카드
const TUT_CARDS_QUIZ_YES = [
  { shape: 'oval',     color: 'green',  fill: 'outline' },
  { shape: 'diamond',  color: 'purple', fill: 'striped' },
  { shape: 'squiggle', color: 'red',    fill: 'solid'   },
]; // 세 속성 모두 달라 → SET ✓
const TUT_CARDS_QUIZ_NO = [
  { shape: 'oval',     color: 'green',  fill: 'outline' },
  { shape: 'oval',     color: 'purple', fill: 'striped' },
  { shape: 'squiggle', color: 'red',    fill: 'solid'   },
]; // 모양: 타원·타원·물결 (2개 같음) → NOT SET ✗

// 예시 2 (새로운 두 번째 예시): 모두 초록색이지만 모양 oval/oval/squiggle (2개만 같음 규칙 위반)
const TUT_SEQ_B2_CARDS = [
  { shape: 'oval',     color: 'green', fill: 'outline' },
  { shape: 'oval',     color: 'green', fill: 'striped' },
  { shape: 'squiggle', color: 'green', fill: 'solid'   },
];
const TUT_CARDPICK_GIVEN_B2 = [
  { shape: 'oval',  color: 'green', fill: 'outline' },
  { shape: 'oval',  color: 'green', fill: 'striped' },
];
const TUT_CARDPICK_CHOICES_RAW_B2 = [
  { isCorrect: true,  card: { shape: 'oval',     color: 'green', fill: 'solid'   } }, // 정답
  { isCorrect: false, card: { shape: 'squiggle', color: 'green', fill: 'solid'   } }, // 오답
  { isCorrect: false, card: { shape: 'oval',     color: 'purple',fill: 'solid'   } }, // 오답
  { isCorrect: false, card: { shape: 'oval',     color: 'green', fill: 'striped' } }, // 오답
];

// 예시 3 (세 번째 예시): 모두 다른 카드들 (기존 예시 1 카드)
const TUT_CARDPICK_GIVEN_A = [
  { shape: 'oval',    color: 'green',  fill: 'outline' },
  { shape: 'diamond', color: 'purple', fill: 'striped' },
];
const TUT_CARDPICK_CHOICES_RAW_A = [
  { isCorrect: true,  card: { shape: 'squiggle', color: 'red',    fill: 'solid'   } },
  { isCorrect: false, card: { shape: 'oval',     color: 'red',    fill: 'solid'   } },
  { isCorrect: false, card: { shape: 'squiggle', color: 'green',  fill: 'solid'   } },
  { isCorrect: false, card: { shape: 'squiggle', color: 'red',    fill: 'outline' } },
];

const JUNIOR_TUT_STEPS = [
  {
    id: 'intro', title: 'SET 게임이 뭐예요?',
    text: 'SET는 카드 세 장을 골라서 만드는 게임이에요! 🌟<br><br>카드마다 <strong>세 가지 특징</strong>이 있어요.<br><strong>모양</strong> (타원 · 마름모 · 물결)<br><strong>색깔</strong> (초록 · 보라 · 빨강)<br><strong>채움</strong> (빈 것 · 줄무늬 · 가득참)<br><br>세 장 각각의 특징이<br><em>모두 같거나</em> <em>모두 달라야</em> SET예요!',
    cards: null, interactive: false,
  },
  {
    id: 'seq_a', type: 'sequence',
    title: '세 카드를 살펴봐요! — 예시 ①',
    cards: TUT_CARDS_INTRO,
    questions: [
      {
        q: '<strong>모양</strong>을 비교합시다!',
        attrLabel: '모양이', logLabel: '모양',
        type: 'attr', correctAnswer: 'different',
        praise: '🎉 굿굿!<br><br>타원 · 마름모 · 물결<br>— 세 모양이 <strong>모두 달라요</strong>! ✔️',
        wrong: '타원 · 마름모 · 물결<br>— 세 개가 서로 달라요! 😊',
      },
      {
        q: '<strong>색깔</strong>을 비교합시다!',
        attrLabel: '색깔이', logLabel: '색깔',
        type: 'attr', correctAnswer: 'different',
        praise: '🎉 굿굿!<br><br>초록 · 보라 · 빨강<br>— 세 색깔이 <strong>모두 달라요</strong>! ✔️',
        wrong: '초록 · 보라 · 빨강<br>— 세 개가 다 다른 색깔이에요! 😊',
      },
      {
        q: '<strong>채움</strong>을 비교합시다!',
        attrLabel: '채움이', logLabel: '채움',
        type: 'attr', correctAnswer: 'different',
        praise: '🎉 굿굿!<br><br>빈 것 · 줄무늬 · 가득 참<br>— 채움도 <strong>모두 달라요</strong>! ✔️',
        wrong: '빈 것 · 줄무늬 · 가득 참<br>— 세 개가 다 다른 채움이에요! 😊',
      },
      {
        q: '세 장의 카드는 <strong>SET</strong>일까요?',
        type: 'set', correctAnswer: 'yes',
        praise: '🎉 굿굿!<br><br>세 가지 특징이 모두 규칙에 맞아요!<br>이게 바로 <strong>SET</strong>예요! 🌟',
        wrong: '💡 다시 생각해봐요!<br>모양·색깔·채움이 모두<br>"다 달라요" 규칙에 맞았어요!<br>→ 이럴 때도 SET가 돼요! 🎉',
      },
    ],
  },
  {
    id: 'seq_b', type: 'sequence',
    title: '세 카드를 살펴봐요! — 예시 ②',
    cards: TUT_CARDS_FILL,
    questions: [
      {
        q: '<strong>모양</strong>을 비교합시다!',
        attrLabel: '모양이', logLabel: '모양',
        type: 'attr', correctAnswer: 'same',
        praise: '🎉 굿굿!<br><br>타원 · 타원 · 타원<br>— 세 장 모두 타원! <strong>다 같아요</strong>! ✔️',
        wrong: '세 장 모두 타원 모양이에요!<br>— 다 같지 않나요? 😊',
      },
      {
        q: '<strong>색깔</strong>을 비교합시다!',
        attrLabel: '색깔이', logLabel: '색깔',
        type: 'attr', correctAnswer: 'same',
        praise: '🎉 굿굿!<br><br>초록 · 초록 · 초록<br>— 세 장 모두 초록! <strong>다 같아요</strong>! ✔️',
        wrong: '세 장 모두 초록색이에요!<br>— 다 같지 않나요? 😊',
      },
      {
        q: '<strong>채움</strong>을 비교합시다!',
        attrLabel: '채움이', logLabel: '채움',
        type: 'attr', correctAnswer: 'different',
        praise: '🎉 굿굿!<br><br>빈 것 · 줄무늬 · 가득 참<br>— 채움만 <strong>다 달라요</strong>! ✔️',
        wrong: '빈 것 · 줄무늬 · 가득 참<br>— 세 개가 다 다른 채움이에요! 😊',
      },
      {
        q: '세 장의 카드는 <strong>SET</strong>일까요?',
        type: 'set', correctAnswer: 'yes',
        praise: '🎉 굿굿!<br><br>모양·색깔은 다 같고, 채움만 다 달라요!<br>이게 바로 <strong>SET</strong>예요! 🌟',
        wrong: '💡 다시 생각해봐요!<br>모양·색깔·채움이 모두<br>각 특징이 규칙에 맞으면 SET가 돼요! 🎉',
      },
    ],
  },
  {
    id: 'seq_c', type: 'sequence',
    title: '이건 왜 SET가 아닐까요? — 예시 ③',
    cards: TUT_SEQ_C_CARDS,
    questions: [
      {
        q: '<strong>모양</strong>을 비교합시다!',
        attrLabel: '모양이',
        type: 'attr3', correctAnswer: 'neither', logLabel: '모양',
        praise: '🎉 굿굿!<br><br>타원 · 타원 · 물결<br>— 타원이 두 개, 물결이 한 개예요.<br>⚠️ <strong>2개만 같아요</strong> — 이건 규칙 위반이에요!',
        wrong_same: '타원 · 타원 · 물결<br>— 마지막이 물결이에요!<br>모두 같지는 않아요. 😊',
        wrong_diff: '타원 · 타원 · 물결<br>— 타원이 두 개나 있어요!<br>모두 다른 것도 아니에요. 😊',
      },
      {
        q: '<strong>색깔</strong>을 비교합시다!',
        attrLabel: '색깔이',
        type: 'attr', correctAnswer: 'different', logLabel: '색깔',
        praise: '🎉 굿굿!<br><br>초록 · 보라 · 빨강<br>— 색깔은 <strong>다 달라요</strong>! ✔️',
        wrong: '초록 · 보라 · 빨강<br>— 세 가지 다 다른 색깔이에요! 😊',
      },
      {
        q: '<strong>채움</strong>을 비교합시다!',
        attrLabel: '채움이',
        type: 'attr', correctAnswer: 'different', logLabel: '채움',
        praise: '🎉 굿굿!<br><br>빈 것 · 줄무늬 · 가득 참<br>— 채움도 <strong>다 달라요</strong>! ✔️',
        wrong: '빈 것 · 줄무늬 · 가득 참<br>— 세 개가 다 다른 채움이에요! 😊',
      },
      {
        q: '세 장의 카드는 <strong>SET</strong>일까요?',
        type: 'set', correctAnswer: 'no', logLabel: null,
        praise: '🎉 굿굿!<br><br>모양에서 규칙을 어겼으니까<br>이 세 장은 <strong>SET가 아니에요</strong>! 🙌',
        wrong: '💡 다시 생각해봐요!<br>모양에서 실패했어요 (타원이 두 개).<br>한 가지라도 규칙을 어기면<br>SET가 안 돼요!',
      },
    ],
  },
  {
    id: 'cardpick', type: 'cardpick',
    title: '빠진 카드를 찾아봐요! 🔍',
    text: '아래 두 장으로 SET를 만들려면<br>나머지 한 장은 어떤 카드일까요?<br>A, B, C, D 중에서 골라봐요!',
    givenCards: TUT_CARDPICK_GIVEN,
  },
  {
    id: 'challenge1', title: '직접 찾아봐요! 💪',
    text: '6장 중에서 <strong>SET가 되는 세 장</strong>을 골라봐요!<br>힌트 버튼을 눌러 도움을 받을 수 있어요.',
    cards: null, interactive: true, hasHint: true,
  },
  {
    id: 'challenge2', title: '이제 실전이에요!',
    text: '9장 중에서 <strong>SET를 찾아보세요.</strong><br>이번엔 힌트가 없어요!',
    cards: null, interactive: true, hasHint: false,
  },
];

// Tutorial 상태
let tutStepIdx  = 0;
let tutSubQIdx  = 0;
let tutSelected = [];
let tutCards    = [];
let tutAnswer   = [];
let tutHintCard = -1;
let tutDone     = false;
let tutSubQNext = false; // 다음 질문 진행용 플래그

// Tutorial 누적 답변
let tutAnswerItems = [];

// DOM 참조
const tutorialScreen  = document.getElementById('tutorialScreen');
const tutProgressFill = document.getElementById('tutProgressFill');
const tutStepLabel    = document.getElementById('tutStepLabel');
const tutTitleEl      = document.getElementById('tutTitle');
const tutBubbleEl     = document.getElementById('tutBubble');
const tutCardArea     = document.getElementById('tutCardArea');
const tutFeedbackEl   = document.getElementById('tutFeedback');
const tutNextBtn      = document.getElementById('tutNextBtn');
const tutHintBtn      = document.getElementById('tutHintBtn');
const tutContextBubble = document.getElementById('tutContextBubble');
const tutAnswerLog     = document.getElementById('tutAnswerLog');

const TUT_INTRO_TEXT = '세 가지를 하나씩 확인해요!<br>모양 · 색깔 · 채움<br><em>모두 같거나</em> <em>모두 달라야</em> SET예요!';

function startTutorial() {
  tutStepIdx = 0;
  modeScreen.hidden     = true;
  tutorialScreen.hidden = false;
  renderTutStep();
}

function renderTutStep() {
  const step  = JUNIOR_TUT_STEPS[tutStepIdx];
  const total = JUNIOR_TUT_STEPS.length;

  document.getElementById('tutQuizBtns')?.remove();
  tutProgressFill.style.width = `${(tutStepIdx / total) * 100}%`;
  tutStepLabel.textContent    = `${tutStepIdx + 1} / ${total}`;
  tutTitleEl.textContent      = step.title;
  tutFeedbackEl.textContent   = '';
  tutFeedbackEl.className     = 'tut-feedback';
  tutSelected = [];
  tutDone     = false;

  tutHintBtn.hidden      = !step.interactive || !step.hasHint;
  tutHintBtn.disabled    = false;
  tutHintBtn.textContent = '💡 힌트';

  if (step.type === 'sequence') {
    tutSubQIdx         = 0;
    tutAnswerItems     = [];
    tutCards           = step.cards;
    tutBubbleEl.innerHTML = '';
    tutContextBubble.innerHTML = TUT_INTRO_TEXT;
    tutContextBubble.hidden    = false;
    tutAnswerLog.hidden        = true;
    tutAnswerLog.innerHTML     = '<div class="tut-log-title">📋 판단 결과</div>';
    renderTutCards(false);
    renderTutSubQ();
  } else if (step.type === 'cardpick') {
    tutBubbleEl.innerHTML   = step.text;
    tutContextBubble.hidden = true;
    tutAnswerLog.hidden     = true;
    renderCardPickStep();
    tutNextBtn.hidden = true;
  } else if (step.id === 'intro') {
    tutBubbleEl.innerHTML      = step.text;
    tutContextBubble.hidden    = true;
    tutAnswerLog.hidden        = true;
    tutCardArea.innerHTML      = '';
    tutNextBtn.hidden          = false;
    tutNextBtn.textContent     = '다음 →';
  } else {
    tutBubbleEl.innerHTML      = step.text;
    tutContextBubble.hidden    = true;
    tutAnswerLog.hidden        = true;
    if (step.id === 'challenge1' || step.id === 'challenge1_2') setupTutC1();
    else if (step.id === 'challenge2') setupTutC2();
    else tutCards = step.cards;
    renderTutCards(step.interactive);
    const isLast = tutStepIdx === total - 1;
    tutNextBtn.hidden      = step.interactive;
    tutNextBtn.textContent = isLast ? '완료! 🎓' : '다음 →';
  }
}

function setupTutC1() {
  const indexed = TUT_C1_BASE.map((card, i) => ({ card, ans: i < 3 }));
  shuffle(indexed);
  tutCards    = indexed.map(x => x.card);
  tutAnswer   = indexed.reduce((acc, x, i) => { if (x.ans) acc.push(i); return acc; }, []);
  tutHintCard = tutAnswer[0];
}

function setupTutC2() {
  for (let t = 0; t < 400; t++) {
    const pool = shuffle(buildFullDeck());
    const nine = pool.slice(0, 9);
    if (!hasAnySet(nine)) continue;
    tutCards = nine;
    for (let i = 0; i < 7; i++)
      for (let j = i + 1; j < 8; j++)
        for (let k = j + 1; k < 9; k++)
          if (isSet(nine[i], nine[j], nine[k])) {
            tutAnswer = [i, j, k]; tutHintCard = -1; return;
          }
  }
}

function renderTutCards(interactive) {
  tutCardArea.innerHTML = '';
  if (!tutCards || tutCards.length === 0) return;
  tutCards.forEach((card, idx) => {
    const el        = document.createElement('div');
    el.className    = 'card tut-card';
    el.dataset.tidx = idx;
    el.id           = `tut-card-${idx}`;
    const img       = document.createElement('img');
    img.src         = imgPath(card);
    img.alt         = `${card.shape} ${card.color} ${card.fill}`;
    img.draggable   = false;
    el.appendChild(img);
    if (interactive) el.addEventListener('click', () => onTutCardClick(idx));
    tutCardArea.appendChild(el);
  });
}

function onTutCardClick(idx) {
  if (tutDone) return;
  const el = document.getElementById(`tut-card-${idx}`);
  if (!el) return;
  if (tutSelected.includes(idx)) {
    tutSelected = tutSelected.filter(i => i !== idx);
    el.classList.remove('selected');
    return;
  }
  if (tutSelected.length >= 3) return;
  tutSelected.push(idx);
  el.classList.add('selected');
  if (tutSelected.length === 3) setTimeout(evalTutSel, 60);
}

function evalTutSel() {
  const [i, j, k] = tutSelected;
  const valid = isSet(tutCards[i], tutCards[j], tutCards[k]);
  if (valid) {
    tutDone = true;
    tutSelected.forEach(idx => {
      const el = document.getElementById(`tut-card-${idx}`);
      if (el) { el.classList.remove('selected'); el.classList.add('tut-correct'); }
    });
    const praises = [
      '🎉 완벽해요! 세 장이 SET를 이루고 있어요!',
      '🌟 훌륭해요! 정확하게 찾았어요!',
      '👏 대단해요! 세 속성이 모두 맞아요!',
    ];
    tutFeedbackEl.textContent = praises[Math.floor(Math.random() * praises.length)];
    tutFeedbackEl.className   = 'tut-feedback tut-success';
    tutHintBtn.hidden         = true;
    tutNextBtn.hidden         = false;
    tutNextBtn.textContent    = tutStepIdx >= JUNIOR_TUT_STEPS.length - 1 ? '완료! 🎓' : '다음 →';
  } else {
    tutSelected.forEach(idx => {
      const el = document.getElementById(`tut-card-${idx}`);
      if (el) el.classList.add('tut-wrong');
    });
    tutFeedbackEl.textContent = '❌ SET가 아니에요. 다시 살펴보세요!';
    tutFeedbackEl.className   = 'tut-feedback tut-fail';
    setTimeout(() => {
      tutSelected.forEach(idx => {
        const el = document.getElementById(`tut-card-${idx}`);
        if (el) el.classList.remove('selected', 'tut-wrong');
      });
      tutSelected = [];
      tutFeedbackEl.textContent = '';
      tutFeedbackEl.className   = 'tut-feedback';
    }, 900);
  }
}

function onTutHint() {
  if (tutHintCard < 0) return;
  const el = document.getElementById(`tut-card-${tutHintCard}`);
  if (el) el.classList.add('tut-hint-glow');
  tutHintBtn.disabled    = true;
  tutHintBtn.textContent = '💡 힌트 사용됨';
}

function renderTutSubQ() {
  const step  = JUNIOR_TUT_STEPS[tutStepIdx];
  const q     = step.questions[tutSubQIdx];
  const qNum  = tutSubQIdx + 1;
  const qTot  = step.questions.length;

  document.getElementById('tutQuizBtns')?.remove();
  const KO_ORD = ['첫','두','세','네','다섯','여섯','일곱','여덟','아홉','열'];
  const labelText = (qNum === qTot) ? '마지막 질문' : `${KO_ORD[qNum-1] ?? qNum} 번째 질문`;
  tutBubbleEl.innerHTML     = `<span class="tut-sub-label">${labelText}</span><br>${q.q}`;
  tutFeedbackEl.textContent = '';
  tutFeedbackEl.className   = 'tut-feedback';

  if (q.type === 'set') {
    tutFeedbackEl.insertAdjacentHTML('beforebegin', `
      <div class="tut-quiz-btns" id="tutQuizBtns">
        <button class="tut-quiz-yes" id="tutSeqYes">세 장의 카드는<br>SET입니다.</button>
        <button class="tut-quiz-no"  id="tutSeqNo">세 장의 카드는<br>SET가 아닙니다.</button>
      </div>`);
    document.getElementById('tutSeqYes').addEventListener('click', () => onTutSeqAnswer('yes'));
    document.getElementById('tutSeqNo' ).addEventListener('click', () => onTutSeqAnswer('no'));
  } else {
    const attrSubject = q.attrLabel || '';
    const prefix = attrSubject ? `${attrSubject}<br>` : '';
    tutFeedbackEl.insertAdjacentHTML('beforebegin', `
      <div class="tut-quiz-btns tut-quiz-btns-3" id="tutQuizBtns">
        <button class="tut-quiz-same"    id="tutSeqSame">${prefix}모두 같아요</button>
        <button class="tut-quiz-diff"    id="tutSeqDiff">${prefix}모두 달라요</button>
        <button class="tut-quiz-neither" id="tutSeqNeither">${prefix}2개만 같아요</button>
      </div>`);
    document.getElementById('tutSeqSame'   ).addEventListener('click', () => onTutSeqAnswer('same'));
    document.getElementById('tutSeqDiff'   ).addEventListener('click', () => onTutSeqAnswer('different'));
    document.getElementById('tutSeqNeither').addEventListener('click', () => onTutSeqAnswer('neither'));
  }
  tutNextBtn.hidden = true;
}

function onTutSeqAnswer(answer) {
  const step    = JUNIOR_TUT_STEPS[tutStepIdx];
  const q       = step.questions[tutSubQIdx];
  const correct = (answer === q.correctAnswer);

  const wrongMsg = q.type === 'attr3'
    ? (answer === 'same'      ? q.wrong_same
       : answer === 'different' ? q.wrong_diff
       : q.wrong || '')
    : (q.wrong || '');

  if (correct) {
    ['tutSeqYes','tutSeqNo','tutSeqSame','tutSeqDiff','tutSeqNeither'].forEach(id => {
      document.getElementById(id)?.setAttribute('disabled', '');
    });
    tutFeedbackEl.innerHTML = q.praise;
    tutFeedbackEl.className = 'tut-feedback tut-success';

    // 답변 로그 누적
    if (q.logLabel) {
      const ansText = answer === 'same'      ? '모두 같아요'
                    : answer === 'different'  ? '모두 달라요'
                    : '2개만 같아요';
      const cls    = answer === 'neither' ? 'log-err' : 'log-ok';
      tutAnswerItems.push({ label: q.logLabel, text: ansText, cls });
      renderAnswerLog();
    }

    const isLastQ = tutSubQIdx >= step.questions.length - 1;
    const isLastStep = tutStepIdx >= JUNIOR_TUT_STEPS.length - 1;
    tutSubQNext = !isLastQ; // 중간 질문이면 다음 질문 버튼
    tutNextBtn.hidden      = false;
    tutNextBtn.textContent = isLastQ
      ? (isLastStep ? '완료! 🎓' : '다음 →')
      : '다음 질문 →';
  } else {
    tutFeedbackEl.innerHTML = `❌<br><br>${wrongMsg}`;
    tutFeedbackEl.className = 'tut-feedback tut-fail';
    // 메시지는 그대로 유지, 버튼만 즉시 재활성화 → 정답 선택 시 칭찬으로 교체
    ['tutSeqYes','tutSeqNo','tutSeqSame','tutSeqDiff','tutSeqNeither'].forEach(id => {
      document.getElementById(id)?.removeAttribute('disabled');
    });
  }
}

function renderAnswerLog() {
  tutAnswerLog.innerHTML = '<div class="tut-log-title">판단 결과</div>'
    + tutAnswerItems.map(it =>
        `<div class="tut-log-item ${it.cls}">${it.label}: ${it.text}</div>`
      ).join('');
  tutAnswerLog.hidden = false;
}

function renderCardPickStep() {
  tutCardArea.innerHTML = '';
  tutCardArea.className = 'tut-card-area tut-cardpick-area';
  const step    = JUNIOR_TUT_STEPS[tutStepIdx];
  const rawChoices = step.choices || TUT_CARDPICK_CHOICES_RAW_A;
  const choices    = shuffle([...rawChoices]);
  const labels     = ['A', 'B', 'C', 'D'];
  const givenCards = step.givenCards || TUT_CARDPICK_GIVEN_A;
  const givenHTML  = givenCards
    .map(c => `<div class="tut-pick-given-card"><img src="${imgPath(c)}" alt="" draggable="false"></div>`)
    .join('');
  const choicesHTML = choices.map((ch, i) => `
    <button class="tut-pick-choice" id="tut-pick-${i}">
      <span class="tut-pick-label">${labels[i]}</span>
      <div class="tut-pick-card"><img src="${imgPath(ch.card)}" alt="" draggable="false"></div>
    </button>`).join('');

  tutCardArea.innerHTML = `
    <div class="tut-pick-given">
      ${givenHTML}
      <div class="tut-pick-unknown">?</div>
    </div>
    <div class="tut-pick-choices">${choicesHTML}</div>`;

  choices.forEach((ch, i) => {
    document.getElementById(`tut-pick-${i}`)?.addEventListener('click', () => onCardPickAnswer(ch.isCorrect, i, choices, step.explanation));
  });
}

function onCardPickAnswer(isCorrect, clickedIdx, choices, explanation) {
  choices.forEach((_, i) => document.getElementById(`tut-pick-${i}`)?.setAttribute('disabled', ''));
  if (isCorrect) {
    document.getElementById(`tut-pick-${clickedIdx}`)?.classList.add('tut-pick-correct');
    tutFeedbackEl.innerHTML = explanation || '🎉 정확해요! 규칙에 맞아서 <strong>SET</strong>예요!';
    tutFeedbackEl.className = 'tut-feedback tut-success';
    tutNextBtn.hidden      = false;
    tutNextBtn.textContent = tutStepIdx >= JUNIOR_TUT_STEPS.length - 1 ? '완료! 🎓' : '다음 →';
  } else {
    document.getElementById(`tut-pick-${clickedIdx}`)?.classList.add('tut-pick-wrong');
    tutFeedbackEl.innerHTML = '❌ 다시 확인해보세요! 각 속성을 하나씩 비교해보세요.';
    tutFeedbackEl.className = 'tut-feedback tut-fail';
    setTimeout(() => {
      document.getElementById(`tut-pick-${clickedIdx}`)?.classList.remove('tut-pick-wrong');
      choices.forEach((_, i) => document.getElementById(`tut-pick-${i}`)?.removeAttribute('disabled'));
      tutFeedbackEl.textContent = '';
      tutFeedbackEl.className   = 'tut-feedback';
    }, 2000);
  }
}

function onTutAttrQuiz(userAnswer) {

  const step = JUNIOR_TUT_STEPS[tutStepIdx];
  const correct = (userAnswer === step.correctAnswer);
  if (correct) {
    document.getElementById('tutQuizSame')?.setAttribute('disabled', '');
    document.getElementById('tutQuizDiff')?.setAttribute('disabled', '');
    tutFeedbackEl.innerHTML = step.praise;
    tutFeedbackEl.className = 'tut-feedback tut-success';
    tutCards.forEach((_, idx) => {
      const el = document.getElementById(`tut-card-${idx}`);
      if (el) el.classList.add('tut-correct');
    });
    tutNextBtn.hidden = false;
    tutNextBtn.textContent = tutStepIdx >= JUNIOR_TUT_STEPS.length - 1 ? '완료! 🎓' : '다음 →';
  } else {
    tutFeedbackEl.innerHTML = `⚠️ 다시 살펴보세요! ${step.hint}`;
    tutFeedbackEl.className = 'tut-feedback tut-fail';
    setTimeout(() => {
      tutFeedbackEl.textContent = '';
      tutFeedbackEl.className   = 'tut-feedback';
    }, 1800);
  }
}

function onTutQuiz(userAnswer) {
  const step = JUNIOR_TUT_STEPS[tutStepIdx];
  const correct = (userAnswer === step.isSet);
  // 버튼 비활성화
  document.getElementById('tutQuizYes')?.setAttribute('disabled', '');
  document.getElementById('tutQuizNo' )?.setAttribute('disabled', '');
  // 피드백
  tutFeedbackEl.innerHTML = step.explanation;
  tutFeedbackEl.className = 'tut-feedback ' + (correct ? 'tut-success' : 'tut-fail');
  // 카드에 정오 표시
  tutCards.forEach((_, idx) => {
    const el = document.getElementById(`tut-card-${idx}`);
    if (el) el.classList.add(correct ? 'tut-correct' : 'tut-wrong');
  });
  // 다음 버튼 표시
  tutNextBtn.hidden      = false;
  tutNextBtn.textContent = tutStepIdx >= JUNIOR_TUT_STEPS.length - 1 ? '완료! 🎓' : '다음 →';
}

function tutAdvance() {
  // 시퀀스 내 서브퀴즈 이동
  if (tutSubQNext) {
    tutSubQNext = false;
    tutSubQIdx++;
    renderTutSubQ();
    return;
  }
  tutCardArea.className = 'tut-card-area'; // cardpick 클래스 초기화
  document.getElementById('tutQuizBtns')?.remove();
  tutStepIdx++;
  if (tutStepIdx >= JUNIOR_TUT_STEPS.length) { showTutComplete(); return; }
  renderTutStep();
}

function showTutComplete() {
  tutProgressFill.style.width = '100%';
  tutStepLabel.textContent    = '완료! 🎓';
  tutTitleEl.textContent      = '🏅 튜토리얼 완료!';
  tutBubbleEl.innerHTML       = 'Junior SET 규칙을 모두 익혔어요!<br>이제 모드 선택 화면으로 돌아가 도전해보세요.';
  document.getElementById('tutQuizBtns')?.remove();
  tutCardArea.innerHTML = `
    <div class="tut-complete-home">
      <button class="tut-home-big-btn" id="tutGoHomeComplete">
        <svg viewBox="0 0 24 24" width="56" height="56" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        <span>대문으로</span>
      </button>
    </div>`;
  tutFeedbackEl.textContent = '';
  tutHintBtn.hidden  = true;
  tutNextBtn.hidden  = true;
  document.getElementById('tutGoHomeComplete').addEventListener('click', () => {
    tutorialScreen.hidden = true; returnToHome();
  });
}

tutNextBtn.addEventListener('click', tutAdvance);
tutHintBtn.addEventListener('click', onTutHint);
document.getElementById('tutHomeBtn').addEventListener('click', () => {
  tutorialScreen.hidden = true; returnToHome();
});
document.getElementById('btnModeTutorial').addEventListener('click', startTutorial);

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



