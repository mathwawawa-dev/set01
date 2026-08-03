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
  return gameMode === 'official' ? isSetOfficial : isSet;
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
  if (gameMode === 'official') { initOfficialBoard(); return; }
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
  if (gameMode === 'official') { replaceOfficialCards(boardIndices); return; }

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

/** 81장 정시 모드 컨드 보충 (덱에서 3장) */
function replaceOfficialCards(boardIndices) {
  for (const idx of boardIndices) board[idx] = null;

  if (deck.length < 3) return;  // 덱 소진 후 보충 불가

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
  // 정시 모드일 때 4행 그리드 적용
  if (gameMode === 'official') {
    cardGrid.classList.add('official');
  } else {
    cardGrid.classList.remove('official');
  }
  let cols = 3;
  if (gameMode === 'official' && officialLayout === '3x4') cols = 4;
  
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
  if (gameMode === 'official' && officialLayout === '3x4') cols = 4;
  
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
  const valid = (gameMode === 'official') ? isSetOfficial(a, b, c) : isSet(a, b, c);

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
    if (gameMode === 'deckExhaust' && score >= TARGET_SETS) {
      animLock = false;
      setTimeout(() => endGame(), 300);
      return;
    }

    // 정시 모드: 덱 소진 또는 보드 전체 클리어 시 종료
    if (gameMode === 'official') {
      const remaining = board.filter(Boolean);
      if (remaining.length === 0 || (deck.length === 0 && !hasAnySet(remaining))) {
        animLock = false;
        setTimeout(() => endGame(), 300);
        return;
      }
    }

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

  if (gameMode === 'countdown') {
    overlayEmoji.textContent = score >= 5 ? '🏆' : score >= 3 ? '🎉' : '😅';
    overlayTitle.textContent = '시간 종료!';
    overlayDesc.innerHTML =
      `총 <strong style="color:#f5c842">${score}</strong>개의 SET를 찾았어요!<br>` +
      (score >= 5 ? '훌륭한 실력입니다! 👏' :
       score >= 3 ? '좋은 성적이에요! 계속 도전해보세요.' :
                   '연습하면 분명 더 잘할 수 있어요! 💪');
  } else if (gameMode === 'deckExhaust') {
    // 20 SET 타임어택 클리어
    overlayEmoji.textContent = '🏅';
    overlayTitle.textContent = `${TARGET_SETS} SET 달성!`;
    overlayDesc.innerHTML =
      `20개의 SET를 모두 찾았습니다!<br>` +
      `기록: <strong style="color:#f5c842">${formatTime(elapsedTime)}</strong>`;
  } else {
    // 81장 정식 모드 종료
    const allCleared = board.filter(Boolean).length === 0 && deck.length === 0;
    const timeOver   = timeLeft <= 0;
    if (allCleared) {
      overlayEmoji.textContent = '🌟';
      overlayTitle.textContent = '완주 달성!';
      overlayDesc.innerHTML = `81장 완주! 모든 SET를 찾았습니다!<br>남은 시간: <strong style="color:#f5c842">${timeLeft}초</strong>`;
    } else {
      overlayEmoji.textContent = timeOver ? '⏰' : '🎉';
      overlayTitle.textContent = timeOver ? '시간 종료!' : '정식 SET 종료';
      overlayDesc.innerHTML =
        `어쨌든! 총 <strong style="color:#f5c842">${score}</strong>개의 SET를 찾았습니다.<br>` +
        (score >= 10 ? '👏 대단한 실력입니다!' : score >= 5 ? '좋은 성적이에요!' : '다음엔 더 잘 할 수 있어요! 💪');
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
  'Digit1','Digit2','Digit3',
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
  if (gameMode === 'official' && officialLayout === '3x4') {
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
  if (gameMode === 'official' && officialLayout === '3x4') return userKeys3x4;
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
  if (gameMode === 'official' && officialLayout === '3x4') cols = 4;
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
  const count = (gameMode === 'official') ? 12 : 9;
  settingsGrid.innerHTML = '';
  const cols = (gameMode === 'official' && officialLayout === '3x4') ? 4 : 3;
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
  if (gameMode === 'official') {
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
  if (gameMode === 'official') {
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
  if (gameMode === 'official' && officialLayout === '3x4') {
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
    if (gameMode === 'official' && officialLayout === '3x4') {
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
