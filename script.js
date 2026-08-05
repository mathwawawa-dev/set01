/* ============================================================
   SET 게임 ??script.js
   ============================================================ */

'use strict';

// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�
// 1. ?�수 �??�정
// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�
const IMAGE_BASE   = 'image01/';
const SHAPES       = ['diamond', 'oval', 'squiggle'];
const COLORS       = ['green',   'purple', 'red'];
const FILLS        = ['outline', 'striped', 'solid'];
const TOTAL_TIME   = 120;   // 카운?�다??�?
const GRID_SIZE    = 9;     // 27??모드 3×3
const TARGET_SETS  = 20;    // 20 SET ?�?�어??목표
const COUNTS       = [1, 2, 3];   // ?�시 모드 4번째 ?�성
const OFFICIAL_GRID = 12;  // 81??모드 4×3

// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�
// 2. 게임 ?�태
// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�
let gameMode    = 'countdown';  // 'countdown' | 'deckExhaust' | 'official'
let deck        = [];   // (?�재 미사?? ?�후 ?�장??
let board       = [];   // ?�재 ?�면???�는 카드 (9?? null ?�함)
let selected    = [];   // ?�택??카드 ?�덱??board 기�?)
let score       = 0;
let timeLeft    = TOTAL_TIME;
let elapsedTime = 0;    // ???�진 모드 진행 ?�간(�?
let timerID     = null;
let gameOver    = false;
let animLock    = false; // ?�니메이??�??�력 방�?

// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�
// 3. DOM ?�퍼?�스
// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�
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

// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�
// 로고 ?�상 ?�덤 무작??지??(#e71f19, #167c3b, #702071 3?�을 1:1 ?�??
// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�
function randomizeLogoColors() {
  const colors = ['#e71f19', '#167c3b', '#702071'];
  // Fisher-Yates ?�플
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

// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�
// 4. ?�티??배경 ?�성
// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�
function createParticles() {
  // ?�티??배경 비활?�화
  bgParticles.style.display = 'none';
}

// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�
// 5. 카드 ?�성 ?�틸리티
// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�

/** 27???�체 ?�을 ?�성 */
function buildFullDeck() {
  const cards = [];
  for (const shape of SHAPES)
    for (const color of COLORS)
      for (const fill of FILLS)
        cards.push({ shape, color, fill });
  return cards;
}

/** 81???�체 ?�을 ?�성 (4?�성: 모양·?�상·?�치기·개?? */
function buildOfficialDeck() {
  const cards = [];
  for (const shape of SHAPES)
    for (const color of COLORS)
      for (const fill of FILLS)
        for (const count of COUNTS)
          cards.push({ shape, color, fill, count });
  return cards;
}

/** Fisher-Yates ?�플 (in-place) */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** 카드???��?지 경로 반환 */
function imgPath(card) {
  return `${IMAGE_BASE}${card.shape}_${card.color}_${card.fill}.png`;
}

// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�
// 6. SET ?�별 로직
// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�

/** 27??모드: 3?�성 SET ?�별 */
function isSet(a, b, c) {
  const props = ['shape', 'color', 'fill'];
  for (const prop of props) {
    const vals = new Set([a[prop], b[prop], c[prop]]);
    if (vals.size === 2) return false;
  }
  return true;
}

/** 81???�시 모드: 4?�성 SET ?�별 */
function isSetOfficial(a, b, c) {
  const props = ['shape', 'color', 'fill', 'count'];
  for (const prop of props) {
    const vals = new Set([a[prop], b[prop], c[prop]]);
    if (vals.size === 2) return false;
  }
  return true;
}

/** ?�재 모드??맞는 isSet ?�수 반환 */
function getIsSet() {
  return (gameMode === 'official' || gameMode === 'officialDeckExhaust') ? isSetOfficial : isSet;
}

/** 배열?�서 SET가 존재?�는지 ?��? 반환 */
function hasAnySet(cards) {
  const fn = getIsSet();
  for (let i = 0; i < cards.length - 2; i++)
    for (let j = i + 1; j < cards.length - 1; j++)
      for (let k = j + 1; k < cards.length; k++)
        if (fn(cards[i], cards[j], cards[k])) return true;
  return false;
}

/** 배열?�서 ?�효??SET 개수 반환 */
function countSets(cards) {
  const fn = getIsSet();
  let count = 0;
  for (let i = 0; i < cards.length - 2; i++)
    for (let j = i + 1; j < cards.length - 1; j++)
      for (let k = j + 1; k < cards.length; k++)
        if (fn(cards[i], cards[j], cards[k])) count++;
  return count;
}

// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�
// 7. ??�?보드 초기??
// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�

/**
 * SET가 최소 1�??�상 보장??9?�을 보드???�정.
 * ?�시 모드??initOfficialBoard() �?분기.
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

/** 81???�시 모드 보드 초기??(12??+ 69???? */
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
  // ?�전�? 조건 미충�???강제 배치
  const all = shuffle(buildOfficialDeck());
  board = all.slice(0, OFFICIAL_GRID);
  deck  = all.slice(OFFICIAL_GRID);
}

/**
 * ?�면???�인 9?�을 ?�외???�머지 18?�의 ?�(Pool)??반환
 * 매번 보충 ?�에 계산?��?�??�거??카드가 ?�동?�로 ?�???�아??
 */
function getPool() {
  const onBoard = board.filter(Boolean);
  const all = buildFullDeck();
  // card???�순 객체?��?�??�성값으�?비교
  return all.filter(c =>
    !onBoard.some(b => b.shape === c.shape && b.color === c.color && b.fill === c.fill)
  );
}

/**
 * ?�전�? SET가 ?�는 경우 강제�?SET ?�함 9??구성
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
 * ??카드 a, b가 주어졌을 ??SET�??�성?�는 ??번째 카드 ?�성??계산
 */
function findThirdCard(a, b) {
  const props = ['shape', 'color', 'fill'];
  const sets  = { shape: SHAPES, color: COLORS, fill: FILLS };
  const result = {};
  for (const prop of props) {
    if (a[prop] === b[prop]) {
      result[prop] = a[prop];
    } else {
      // ?�머지 ?�나??�?
      result[prop] = SHAPES.concat(COLORS).concat(FILLS)
        .filter(v => [a[prop], b[prop]].every(x => x !== v) &&
          (prop === 'shape' ? SHAPES.includes(v)
         : prop === 'color' ? COLORS.includes(v)
         : FILLS.includes(v)))[0];
    }
  }
  return result;
}

// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�
// 8. SET ?�거 ??카드 보충 로직
// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�

/** cards ?�의 모든 SET ?�덱???�중??반환 */
function getAllSets(cards) {
  const sets = [];
  for (let i = 0; i < cards.length - 2; i++)
    for (let j = i + 1; j < cards.length - 1; j++)
      for (let k = j + 1; k < cards.length; k++)
        if (isSet(cards[i], cards[j], cards[k])) sets.push([i, j, k]);
  return sets;
}

/**
 * [?�한] ?�떤 경로 ?�나?�도 ?�전 ?�진 가?�하�?true.
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
 * [강한] ?�용?��? ?�떤 SET�??�택?�도 ?�전 ?�진 가?�하�?true.
 * 모든 SET ?�택???��??�으�?강하�??�진 가?�해????
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
 * nine(9???�서 ?�용?��? ?�떤 SET�??�택?�도,
 * ?��? 6??+ deck3(마�?�???3????stronglyExhaustible?�면 true.
 * deck=6????5번째 보충?�서 6번째(최종) 보충 결과�?미리 보장.
 */
function allSETsLeadToStrongly(nine, deck3) {
  const sets = getAllSets(nine);
  if (sets.length === 0) return false;
  return sets.every(([i, j, k]) => {
    const rest = nine.filter((_, x) => x !== i && x !== j && x !== k);
    return stronglyExhaustible([...rest, ...deck3]);
  });
}

/** arr?�서 k�?뽑는 모든 조합 반환 */
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
 * SET�??�인??3?�을 ?�구 ?�거?�고 보충.
 * deckExhaust: 3?�계 기�??�로 ?�진 ?�패 ?�천 차단
 *   1?�위: stronglyExhaustible (?�용?�의 모든 ?�택???�전)
 *   2?�위: canExhaustAll (?�떤 경로 ?�나?�도 ?�진 가??
 *   3?�위: hasAnySet (최소??SET 존재)
 */
function replaceCards(boardIndices) {
  if (gameMode === 'official' || gameMode === 'officialDeckExhaust') { replaceOfficialCards(boardIndices); return; }

  // 27??븴로: ??모드 모두 무한 ?� 방식?�로 ?�일
  for (const idx of boardIndices) { board[idx] = null; }
  const MAX_TRIES = 500;
  for (let t = 0; t < MAX_TRIES; t++) {
    const pool = getPool(); shuffle(pool);
    const newCards = pool.slice(0, 3);

    // ?�규 조건: 보충 3???�체가 SET?�면 건너?�
    if (isSet(newCards[0], newCards[1], newCards[2])) continue;

    const tempBoard = [...board];
    for (let i = 0; i < 3; i++) tempBoard[boardIndices[i]] = newCards[i];

    // 기존 조건: ?�체 9???�에 SET 1�??�상 존재
    if (hasAnySet(tempBoard.filter(Boolean))) {
      for (let i = 0; i < 3; i++) board[boardIndices[i]] = newCards[i];
      return;
    }
  }
  // ?�전�? ?�규 조건(3???�체 SET 금�?)�??��?
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
  // 최후: 조건 ?�기?�고 그냥 채�?
  for (let i = 0; i < 3; i++) board[boardIndices[i]] = pool[i];
}

/** 81???�식 모드 카드 보충 (???�진 ???�셔?? */
function replaceOfficialCards(boardIndices) {
  for (const idx of boardIndices) board[idx] = null;

  // ?�이 3??미만?�면 ?�셔??(보드???�는 카드�?????구성)
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
  // ?�전�? ???�에??3??그냥 배치
  for (let i = 0; i < 3; i++) board[boardIndices[i]] = deck.shift();
}



// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�
// 9. UI ?�더�?
// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�

/** 카드 그리???�체 ?�더�?*/
function renderBoard() {
  cardGrid.innerHTML = '';
  // ?�식 모드????4??그리???�용
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

/** 카드 DOM ?�소 ?�성 */
function createCardElement(card, idx) {
  const el = document.createElement('div');
  el.classList.add('card', 'entering');
  el.dataset.idx = idx;
  el.id = `card-${idx}`;

  if (card.count !== undefined) {
    // 81???�시 모드: count만큼 ?��?지 반복
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
    // 27??모드: ?�일 ?��?지
    const img = document.createElement('img');
    img.src = imgPath(card);
    img.alt = `${card.shape} ${card.color} ${card.fill}`;
    img.draggable = false;
    el.appendChild(img);
  }

  el.addEventListener('click', () => onCardClick(idx));
  return el;
}

/** ?�정 ?�덱??카드�?교체 ?�더�?*/
function renderCardAt(idx) {
  const card = board[idx];
  const old  = document.getElementById(`card-${idx}`);
  if (old) old.remove();

  if (!card) return;

  const el = createCardElement(card, idx);
  // grid-area�??�확???�치???�입
  let cols = 3;
  if ((gameMode === 'official' || gameMode === 'officialDeckExhaust') && officialLayout === '3x4') cols = 4;
  
  const col = (idx % cols) + 1;
  const row = Math.floor(idx / cols) + 1;
  el.style.gridColumn = col;
  el.style.gridRow    = row;

  cardGrid.appendChild(el);
  updateHint();
}

// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�
// 10. ?�트 (가?�한 SET ?? ?�데?�트
// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�
function updateHint() {
  const n = countSets(board.filter(Boolean));
  hintText.textContent = `${n}개의 SET가 ?�습?�다.`;
}

// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�
// 11. ?�택 ?�내 �??�데?�트
// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�
function updateSelectionBar(state, text) {
  selectionBar.className  = 'selection-bar';
  selectionText.textContent = text;
  if (state) selectionBar.classList.add(state);
}

// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�
// 12. 카드 ?�릭 처리
// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�
function onCardClick(idx) {
  if (gameOver || animLock) return;
  if (!board[idx]) return;

  const el = document.getElementById(`card-${idx}`);
  if (!el) return;

  // ?��? ?�택??카드 ???�택 ?�제
  if (selected.includes(idx)) {
    selected = selected.filter(i => i !== idx);
    el.classList.remove('selected');
    updateSelectionBar(selected.length ? 'active' : null,
      selected.length ? `${selected.length}???�택?? : '카드�?3???�택?�세??);
    return;
  }

  // 3???��? ?�택 중이�?무시
  if (selected.length >= 3) return;

  selected.push(idx);
  el.classList.add('selected');

  if (selected.length < 3) {
    updateSelectionBar('active', `${selected.length}???�택??);
    return;
  }

  // 3???�성 ???�택 모션??보이?�록 ?�주 짧�? ?�레????SET ?�별
  updateSelectionBar('active', '3???�택??);
  setTimeout(() => evaluateSelection(), 50);
}

// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�
// 13. SET ?�별 �?처리
// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�
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

    // 20 SET ?�?�어?? 목표 ?�성 ??종료
    if ((gameMode === 'deckExhaust' || gameMode === 'officialDeckExhaust') && score >= TARGET_SETS) {
      animLock = false;
      setTimeout(() => endGame(), 300);
      return;
    }

    // ?�식 모드: 종료 조건 ?�음 (무한 카드, ?�?�머가 ?�날 ?�만 종료)
    // 종료???�?�머 0???�면 endGame()???�동 ?�출??

    updateSelectionBar('success', '?�답?�니??');
    setTimeout(() => {
      updateSelectionBar(null, '카드�?3???�택?�세??);
    }, 400);
    animLock = false;

  } else {
    elems.forEach(el => el.classList.remove('selected'));
    selected = [];
    updateSelectionBar('fail', 'SET가 ?�닙?�다.');
    setTimeout(() => {
      updateSelectionBar(null, '카드�?3???�택?�세??);
    }, 400);
    animLock = false;
  }
}



// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�
// 15. ?�?�머 (카운?�다??/ 카운?�업)
// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�
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
    statTimerLabel.textContent = '?��? ?�간';
    statTimerUnit.textContent = '�?;
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
    statTimerLabel.textContent = '진행 ?�간';
    statTimerUnit.textContent = '';
    timerID = setInterval(() => {
      elapsedTime++;
      timerDisplay.textContent = formatTime(elapsedTime);
    }, 1000);
  }
}

// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�
// 16. 게임 종료
// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�
function endGame() {
  gameOver = true;
  animLock = true;
  clearInterval(timerID);

  document.querySelectorAll('.card').forEach(el => el.classList.add('disabled'));

  if (gameMode === 'countdown' || gameMode === 'official') {
    overlayEmoji.textContent = score >= 5 ? '?��' : score >= 3 ? '?��' : '?��';
    overlayTitle.textContent = '?�간 종료!';
    overlayDesc.innerHTML =
      `�?<strong style="color:#f5c842">${score}</strong>개의 SET�?찾았?�요!<br>` +
      (score >= 5 ? '?��????�력?�니?? ?��' :
       score >= 3 ? '좋�? ?�적?�에?? 계속 ?�전?�보?�요.' :
                   '?�습?�면 분명 ???�할 ???�어?? ?��');
  } else if (gameMode === 'deckExhaust' || gameMode === 'officialDeckExhaust') {
    overlayEmoji.textContent = '?��';
    overlayTitle.textContent = `${TARGET_SETS} SET ?�성!`;
    overlayDesc.innerHTML =
      `20개의 SET�?모두 찾았?�니??<br>` +
      `기록: <strong style="color:#f5c842">${formatTime(elapsedTime)}</strong>`;
  } else {
    // 81???�식 모드 종료 (?�?�머 종료)
    overlayEmoji.textContent = '??;
    overlayTitle.textContent = '?�간 종료!';
    overlayDesc.innerHTML =
      `�?<strong style="color:#f5c842">${score}</strong>개의 SET�?찾았?�요!<br>` +
      (score >= 10 ? '?�� ?�?�한 ?�력?�니??' : score >= 5 ? '좋�? ?�적?�에??' : '?�음???????????�어?? ?��');
  }

  gameOverlay.hidden = false;
}

// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�
// 17. 게임 ?�작
// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�
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

  updateSelectionBar(null, '카드�?3???�택?�세??);
  initBoard();
  renderBoard();
  startTimer();
}

// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�
// 18. ?�벤??바인??
// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�

// ?�문으�??�아가�?공통 ?�수
function returnToHome() {
  clearInterval(timerID);
  gameOverlay.hidden = true;
  document.getElementById('floatingMenu').hidden = true;
  randomizeLogoColors();
  modeScreen.hidden = false;
}

// ?�버?�이 ?�시 ?�작 ??모드 ?�택 ?�면?�로
btnRestart.addEventListener('click', returnToHome);

// ?�로???�션 버튼
document.getElementById('btnFloatRestart').addEventListener('click', () => {
  if (!gameOver) clearInterval(timerID);
  startGame();
});
document.getElementById('btnFloatHome').addEventListener('click', returnToHome);

// 모드 ?�택
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

// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�
// 19. ?�축???�스??(?�용???�정 가??
// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�

// 기본 ??(4??3??- Preset 1)
const DEFAULT_KEYS_4X3_PRESET1 = [
  'Digit1','Digit2','Digit3',
  'KeyQ',  'KeyW',  'KeyE',
  'KeyA',  'KeyS',  'KeyD',
  'KeyZ',  'KeyX',  'KeyC',
];
// 기본 ??(3??4??- Preset 1)
const DEFAULT_KEYS_3X4_PRESET1 = [
  'Digit1','Digit2','Digit3','Digit4',
  'KeyQ',  'KeyW',  'KeyE',  'KeyR',
  'KeyA',  'KeyS',  'KeyD',  'KeyF',
];

// ?�리??2 (QWE~ 4??3??
const PRESET2_4X3 = [
  'KeyQ',  'KeyW',  'KeyE',
  'KeyA',  'KeyS',  'KeyD',
  'KeyZ',  'KeyX',  'KeyC',
  '',      '',      '',
];
// ?�리??2 (QWE~ 3??4??
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

// ?�패?? ??�� 보조 ?�성??(?�정 불�?, 고정)
const NUMPAD_MAP = {
  'Numpad7': 0, 'Numpad8': 1, 'Numpad9': 2,
  'Numpad4': 3, 'Numpad5': 4, 'Numpad6': 5,
  'Numpad1': 6, 'Numpad2': 7, 'Numpad3': 8,
};

// 로컬?�토리�??�서 불러?�기 (배열???�라 별도 ?�??권장?�나 ?�순?��? ?�해 ?�단 ?�나????배열 ?�용 ?�엔 기본값으�???��?�, ?�기?�는 각각 ?�??
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

// ?�적 KEY_MAP 빌드
let KEY_MAP = {};
function buildKeyMap() {
  KEY_MAP = { ...NUMPAD_MAP };
  getCurrentUserKeys().forEach((code, cardIdx) => {
    if (code) KEY_MAP[code] = cardIdx;
  });
}
buildKeyMap();

// e.code ???�시???�벨
function keyLabel(code) {
  if (!code) return '??;
  if (code.startsWith('Digit')) return code.slice(5);
  if (code.startsWith('Key'))   return code.slice(3);
  if (code.startsWith('Numpad')) return 'N' + code.slice(6);
  if (code === 'Space') return 'SPC';
  if (code === 'Enter') return '??;
  if (code === 'Backspace') return '??;
  if (code === 'ArrowUp')    return '??;
  if (code === 'ArrowDown')  return '??;
  if (code === 'ArrowLeft')  return '??;
  if (code === 'ArrowRight') return '??;
  return code.replace(/^(Key|Digit|Arrow)/, '');
}

// 카드 ?�치 ?�벨 (?? ??
function posLabel(idx) {
  let cols = 3;
  if ((gameMode === 'official' || gameMode === 'officialDeckExhaust') && officialLayout === '3x4') cols = 4;
  const row = Math.floor(idx / cols) + 1;
  const col = (idx % cols) + 1;
  return `${row}??${col}??;
}

// ?�?� ?�정 모달 로직 ?�?�
const settingsOverlay = document.getElementById('settingsOverlay');
const settingsGrid    = document.getElementById('settingsGrid');
let   listeningIdx    = -1;   // ?�재 ???�력 ?��?중인 �??�덱??
let   tempKeys        = [];   // 모달 ???�시 ?�집 ?�태

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
  // ?�전 리스???�제
  if (listeningIdx >= 0) {
    const prev = settingsGrid.querySelector(`[data-idx="${listeningIdx}"]`);
    if (prev) { prev.classList.remove('listening'); prev.querySelector('.key-cell-badge').textContent = keyLabel(tempKeys[listeningIdx]); }
  }
  listeningIdx = idx;
  const cell  = settingsGrid.querySelector(`[data-idx="${idx}"]`);
  const badge = cell.querySelector('.key-cell-badge');
  cell.classList.add('listening');
  badge.textContent = '??;
}

function stopListening() {
  if (listeningIdx < 0) return;
  const cell = settingsGrid.querySelector(`[data-idx="${listeningIdx}"]`);
  if (cell) cell.classList.remove('listening');
  listeningIdx = -1;
}

// ?�전 ?�정 로드
let cardRotated = localStorage.getItem('setGameRotate') === '1';
function applyRotation() {
  cardGrid.classList.toggle('rotated', cardRotated);
}
applyRotation();

function applyLayout() {
  cardGrid.classList.toggle('official-3x4', officialLayout === '3x4');
  if (board.length > 0) renderBoard(); // ?��? 게임 중이�??�렌?�링?�여 ?�라???��???갱신
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
    chkLayout.nextElementSibling.textContent = is3x4 ? '4??3?�로 보기' : '3??4?�로 보기';
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

// ?��? ?�시�??�용 �??�동 ?�??
document.getElementById('chkRotate').addEventListener('change', (e) => {
  cardRotated = e.target.checked;
  localStorage.setItem('setGameRotate', cardRotated ? '1' : '0');
  applyRotation();
});
document.getElementById('chkLayout').addEventListener('change', (e) => {
  if (gameMode === 'official' || gameMode === 'officialDeckExhaust') {
    const is3x4 = e.target.checked;
    officialLayout = is3x4 ? '3x4' : '4x3';
    e.target.nextElementSibling.textContent = is3x4 ? '4??3?�로 보기' : '3??4?�로 보기';
    localStorage.setItem('setGameLayout', officialLayout);
    applyLayout();
    
    // 배열??바뀌면 ?�축??배열 ?�이?�도 교체 ??UI ?�생??
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

// ?�정 모달 ??캡처
document.addEventListener('keydown', (e) => {
  // ?�?� ?�정 모달???�려 ?�을 ???�?�
  if (!settingsOverlay.hidden) {
    if (listeningIdx < 0) return;
    e.preventDefault();
    if (e.code === 'Escape') { stopListening(); return; }

    // ?��? ?�른 칸에 ?�당???�이�?교환
    const conflict = tempKeys.indexOf(e.code);
    if (conflict >= 0 && conflict !== listeningIdx) {
      tempKeys[conflict] = '';
      const badge = document.getElementById(`keybadge-${conflict}`);
      if (badge) badge.textContent = '??;
    }
  // ??바인????즉시 ?�??
  if (tempKeys[listeningIdx] !== e.code) {
    tempKeys[listeningIdx] = e.code;
    
    // ?�동 ?�??로직
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

  // ?�?� 게임 �??�축???�?�
  if (gameOver || animLock) return;
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  const idx = KEY_MAP[e.code];
  if (idx !== undefined) {
    e.preventDefault();
    onCardClick(idx);
  }
});

// ?�═?�═?�═?�═?�═?�═?�═?�═?�═?�═?�═?�═?�═?�═?�═?�═?�═?�═?�═?�═?�═?�═?�═
// TUTORIAL MODULE ??Junior SET (27�?카드)
// ?�═?�═?�═?�═?�═?�═?�═?�═?�═?�═?�═?�═?�═?�═?�═?�═?�═?�═?�═?�═?�═?�═?�═

// ?�명??고정 카드
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
// ?�이 모두 ?��? ?�시 (attrquiz ???�텝??
const TUT_CARDS_COLOR_SAME = [
  { shape: 'oval',     color: 'green', fill: 'outline' },
  { shape: 'diamond',  color: 'green', fill: 'striped' },
  { shape: 'squiggle', color: 'green', fill: 'solid'   },
];
// Challenge 1: 6?????�일??SET???�덱??0,1,2 (?�학?�으�?검�??�료)
const TUT_C1_BASE = [
  { shape: 'oval',     color: 'green',  fill: 'outline' }, // ?�답 A
  { shape: 'diamond',  color: 'purple', fill: 'striped' }, // ?�답 B
  { shape: 'squiggle', color: 'red',    fill: 'solid'   }, // ?�답 C
  { shape: 'diamond',  color: 'green',  fill: 'outline' }, // ?�답
  { shape: 'oval',     color: 'red',    fill: 'striped' }, // ?�답
  { shape: 'squiggle', color: 'purple', fill: 'outline' }, // ?�답
];

// ?�즈??고정 카드
const TUT_CARDS_QUIZ_YES = [
  { shape: 'oval',     color: 'green',  fill: 'outline' },
  { shape: 'diamond',  color: 'purple', fill: 'striped' },
  { shape: 'squiggle', color: 'red',    fill: 'solid'   },
]; // ???�성 모두 ?�라 ??SET ??
const TUT_CARDS_QUIZ_NO = [
  { shape: 'oval',     color: 'green',  fill: 'outline' },
  { shape: 'oval',     color: 'purple', fill: 'striped' },
  { shape: 'squiggle', color: 'red',    fill: 'solid'   },
]; // 모양: ?�?�·�??�·물�?(2�?같음) ??NOT SET ??

// NOT-SET ?�시: 모양 oval/oval/squiggle ??2개만 같아 규칙 ?�반
const TUT_SEQ_C_CARDS = [
  { shape: 'oval',     color: 'green',  fill: 'outline' },
  { shape: 'oval',     color: 'purple', fill: 'striped' },
  { shape: 'squiggle', color: 'red',    fill: 'solid'   },
];
// 카드???�즈: ?????�시 ???�머지 ????고르�?
const TUT_CARDPICK_GIVEN = [
  { shape: 'oval',    color: 'green',  fill: 'outline' },
  { shape: 'diamond', color: 'purple', fill: 'striped' },
];
const TUT_CARDPICK_CHOICES_RAW = [
  { isCorrect: true,  card: { shape: 'squiggle', color: 'red',    fill: 'solid'   } }, // ?�답
  { isCorrect: false, card: { shape: 'oval',     color: 'red',    fill: 'solid'   } }, // ?�답(모양?�반)
  { isCorrect: false, card: { shape: 'squiggle', color: 'green',  fill: 'solid'   } }, // ?�답(?�위�?
  { isCorrect: false, card: { shape: 'squiggle', color: 'red',    fill: 'outline' } }, // ?�답(채�??�반)
];

const JUNIOR_TUT_STEPS = [
  {
    id: 'intro', title: 'SET?� 무엇?��???',
    text: '카드 ???�을 골라 <strong>SET</strong>�??�성?�는 게임?�에??<br>�??�성(모양·?�·채?�)??<em>모두 같거??/em> <em>모두 ?�라??/em> SET가 ?�요.<br>지금�??????�을 보며 직접 ?�단?�요!',
    cards: null, interactive: false,
  },
  {
    id: 'seq_a', type: 'sequence',
    title: '직접 ?�단?�보?�요 ???�시 ??,
    cards: TUT_CARDS_INTRO,
    questions: [
      {
        q: '?????�의 <strong>모양</strong>?� ?�떤가??',
        type: 'attr', correctAnswer: 'different',
        praise: '?�� 맞아?? ?�??· 마름�?· 물결 ??<strong>모두 ?�라??/strong>.',
        wrong: '?�시 보세??<br>??카드???�태: ?�??· 마름�?· 물결 ????종류 모두 ?�라??',
      },
      {
        q: '?????�의 <strong>??/strong>?� ?�떤가??',
        type: 'attr', correctAnswer: 'different',
        praise: '?�� 맞아?? 초록 · 보라 · 빨강 ??<strong>모두 ?�라??/strong>.',
        wrong: '?�시 보세??<br>??카드???? 초록 · 보라 · 빨강 ????가지 모두 ?�른 ?�이?�요.',
      },
      {
        q: '?????�의 <strong>채�?</strong>?� ?�떤가??',
        type: 'attr', correctAnswer: 'different',
        praise: '?�� 맞아?? 비어?�음 · 줄무??· 가?�참 ??<strong>모두 ?�라??/strong>.',
        wrong: '?�시 보세?? 채�?: 비어?�음 · 줄무??· 가?�참 ????종류 모두 ?�른 방식?�에??',
      },
      {
        q: '모양 · ??· 채�? 모두 ?�인?�어??<br>그렇?�면 ?????��? <strong>SET</strong>?�까??',
        type: 'set', correctAnswer: 'yes',
        praise: '?�� ?�확?�요! ???�성??모두 규칙??맞아????<strong>SET</strong>?�요!',
        wrong: '?�시 ?�각?�보?�요!<br>???�성??모두 "모두 ?�라???�?�아??<br>모두 ?��? ?�도 SET가 ?�요!',
      },
    ],
  },
  {
    id: 'seq_b', type: 'sequence',
    title: '직접 ?�단?�보?�요 ???�시 ??,
    cards: TUT_CARDS_FILL,
    questions: [
      {
        q: '?????�의 <strong>모양</strong>?� ?�떤가??',
        type: 'attr', correctAnswer: 'same',
        praise: '?�� 맞아?? ????모두 ?�????<strong>모두 같아??/strong>.',
        wrong: '?�시 보세??<br>??카드???�태: ?�??· ?�??· ?�????모두 ?�?�으�?같아??',
      },
      {
        q: '?????�의 <strong>??/strong>?� ?�떤가??',
        type: 'attr', correctAnswer: 'same',
        praise: '?�� 맞아?? ????모두 초록 ??<strong>모두 같아??/strong>.',
        wrong: '?�시 보세??<br>??카드???? 초록 · 초록 · 초록 ??모두 초록?�로 같아??',
      },
      {
        q: '?????�의 <strong>채�?</strong>?� ?�떤가??',
        type: 'attr', correctAnswer: 'different',
        praise: '?�� 맞아?? 비어?�음 · 줄무??· 가?�참 ??<strong>모두 ?�라??/strong>.',
        wrong: '?�시 보세?? 채�?: 비어?�음 · 줄무??· 가?�참 ????종류 모두 ?�른 방식?�에??',
      },
      {
        q: '모양(같음) · ??같음) · 채�?(?�름) ?�인?�어??<br>그렇?�면 ?????��? <strong>SET</strong>?�까??',
        type: 'set', correctAnswer: 'yes',
        praise: '?�� ?�확?�요! 모양·?��? 모두 같고, 채�??� 모두 ?�라 ??규칙??맞아?? <strong>SET</strong>?�요!',
        wrong: '?�시 ?�각?�보?�요!<br>모양·?��? 모두 같고, 채�??� 모두 ?�라??<br>�??�성??규칙??만족?�면 SET가 ?�요!',
      },
    ],
  },
  {
    id: 'seq_c', type: 'sequence',
    title: '직접 ?�단?�보?�요 ???�시 ??(SET ?�닌 경우)',
    cards: TUT_SEQ_C_CARDS,
    questions: [
      {
        q: '?????�의 <strong>모양</strong>?� ?�떤가??',
        type: 'attr3', correctAnswer: 'neither', logLabel: '모양',
        praise: '?�� 맞아?? ?�??· ?�??· 물결 ??2개만 같아?? ?�건 <strong>규칙 ?�반</strong>?�에??',
        wrong_same: '?�시 보세??<br>?�?�·�??�·물�???모두 같�????�아??',
        wrong_diff: '?�시 보세??<br>?�?�·�??�·물�???모두 ?�르지???�아??<br>?�?�이 ??개예??',
      },
      {
        q: '?????�의 <strong>??/strong>?� ?�떤가??',
        type: 'attr', correctAnswer: 'different', logLabel: '??,
        praise: '?�� 맞아?? 초록 · 보라 · 빨강 ??<strong>모두 ?�라??/strong>.',
        wrong: '?�시 보세??<br>초록 · 보라 · 빨강 ????가지 모두 ?�른 ?�이?�요.',
      },
      {
        q: '?????�의 <strong>채�?</strong>?� ?�떤가??',
        type: 'attr', correctAnswer: 'different', logLabel: '채�?',
        praise: '?�� 맞아?? 비어?�음 · 줄무??· 가?�참 ??<strong>모두 ?�라??/strong>.',
        wrong: '?�시 보세??<br>채�?: 비어?�음 · 줄무??· 가?�참 ??모두 ?�른 방식?�에??',
      },
      {
        q: '모양?�서 <strong>규칙 ?�반</strong>???�었?�요!<br>그렇?�면 ?????��? <strong>SET</strong>?�까??',
        type: 'set', correctAnswer: 'no', logLabel: null,
        praise: '?�� ?�확?�요! 모양??규칙???�반?�으??<strong>SET가 ?�니?�요</strong>.',
        wrong: '?�시 ?�각?�보?�요!<br>모양?�서 2개만 같�? 규칙 ?�반???�었?�요.<br>?�나?�도 ?�반?�면 SET가 ???�요.',
      },
    ],
  },
  {
    id: 'cardpick', type: 'cardpick',
    title: 'SET�??�성??카드??',
    text: '?�래 ???�으�?SET�?만들?�면 ?�머지 ???��? ?�떤 카드?�까??',
    givenCards: TUT_CARDPICK_GIVEN,
  },
  {
    id: 'challenge1', title: '직접 찾아보세??',
    text: '6??중에??<strong>SET가 ?�는 ????/strong>??골라보세??<br>?�트 버튼???�러 ?��???받을 ???�어??',
    cards: null, interactive: true, hasHint: true,
  },
  {
    id: 'challenge2', title: '?�제 ?�전?�에??',
    text: '9??중에??<strong>SET�?찾아보세??</strong><br>?�번???�트가 ?�어??',
    cards: null, interactive: true, hasHint: false,
  },
];

// Tutorial ?�태
let tutStepIdx  = 0;
let tutSubQIdx  = 0;
let tutSelected = [];
let tutCards    = [];
let tutAnswer   = [];
let tutHintCard = -1;
let tutDone     = false;
let tutSubQNext = false; // ?�음 질문 진행???�래�?

// Tutorial ?�적 ?��?
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

const TUT_INTRO_TEXT = '카드 ???�을 골라 <strong>SET</strong>�??�성?�는 게임?�에??<br>�??�성(모양·?�·채?�)??<em>모두 같거??/em> <em>모두 ?�라??/em> SET가 ?�요.';

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
  tutHintBtn.textContent = '?�� ?�트';

  if (step.type === 'sequence') {
    tutSubQIdx         = 0;
    tutAnswerItems     = [];
    tutCards           = step.cards;
    tutBubbleEl.innerHTML = '';
    tutContextBubble.innerHTML = TUT_INTRO_TEXT;
    tutContextBubble.hidden    = false;
    tutAnswerLog.hidden        = true;
    tutAnswerLog.innerHTML     = '<div class="tut-log-title">?�� ?�단 결과</div>';
    renderTutCards(false);
    renderTutSubQ();
  } else if (step.type === 'cardpick') {
    tutBubbleEl.innerHTML   = step.text;
    tutContextBubble.hidden = true;
    tutAnswerLog.hidden     = true;
    renderCardPickStep();
    tutNextBtn.hidden = true;
  } else {
    tutBubbleEl.innerHTML      = step.text;
    tutContextBubble.hidden    = true;
    tutAnswerLog.hidden        = true;
    if (step.id === 'challenge1')      setupTutC1();
    else if (step.id === 'challenge2') setupTutC2();
    else                               tutCards = step.cards;
    renderTutCards(step.interactive);
    const isLast = tutStepIdx === total - 1;
    tutNextBtn.hidden      = step.interactive;
    tutNextBtn.textContent = isLast ? '?�료! ?��' : '?�음 ??;
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
      '?�� ?�벽?�요! ???�이 SET�??�루�??�어??',
      '?�� ?��??�요! ?�확?�게 찾았?�요!',
      '?�� ?�?�해?? ???�성??모두 맞아??',
    ];
    tutFeedbackEl.textContent = praises[Math.floor(Math.random() * praises.length)];
    tutFeedbackEl.className   = 'tut-feedback tut-success';
    tutHintBtn.hidden         = true;
    tutNextBtn.hidden         = false;
    tutNextBtn.textContent    = tutStepIdx >= JUNIOR_TUT_STEPS.length - 1 ? '?�료! ?��' : '?�음 ??;
  } else {
    tutSelected.forEach(idx => {
      const el = document.getElementById(`tut-card-${idx}`);
      if (el) el.classList.add('tut-wrong');
    });
    tutFeedbackEl.textContent = '??SET가 ?�니?�요. ?�시 ?�펴보세??';
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
  tutHintBtn.textContent = '? ?트 ?용??;
}

function renderTutSubQ() {
  const step  = JUNIOR_TUT_STEPS[tutStepIdx];
  const q     = step.questions[tutSubQIdx];
  const qNum  = tutSubQIdx + 1;
  const qTot  = step.questions.length;

  document.getElementById('tutQuizBtns')?.remove();
  tutBubbleEl.innerHTML     = `<span class="tut-sub-label">Q${qNum} / ${qTot}</span><br>${q.q}`;
  tutFeedbackEl.textContent = '';
  tutFeedbackEl.className   = 'tut-feedback';

  if (q.type === 'set') {
    tutFeedbackEl.insertAdjacentHTML('beforebegin', `
      <div class="tut-quiz-btns" id="tutQuizBtns">
        <button class="tut-quiz-yes" id="tutSeqYes">??SET?�에??</button>
        <button class="tut-quiz-no"  id="tutSeqNo">??SET가 ?�니?�요!</button>
      </div>`);
    document.getElementById('tutSeqYes').addEventListener('click', () => onTutSeqAnswer('yes'));
    document.getElementById('tutSeqNo' ).addEventListener('click', () => onTutSeqAnswer('no'));
  } else if (q.type === 'attr3') {
    tutFeedbackEl.insertAdjacentHTML('beforebegin', `
      <div class="tut-quiz-btns tut-quiz-btns-3" id="tutQuizBtns">
        <button class="tut-quiz-same"    id="tutSeqSame">?�� 모두 같아??/button>
        <button class="tut-quiz-diff"    id="tutSeqDiff">?�� 모두 ?�라??/button>
        <button class="tut-quiz-neither" id="tutSeqNeither">?�� 2개만 같아??(규칙 ?�반)</button>
      </div>`);
    document.getElementById('tutSeqSame'   ).addEventListener('click', () => onTutSeqAnswer('same'));
    document.getElementById('tutSeqDiff'   ).addEventListener('click', () => onTutSeqAnswer('different'));
    document.getElementById('tutSeqNeither').addEventListener('click', () => onTutSeqAnswer('neither'));
  } else {
    tutFeedbackEl.insertAdjacentHTML('beforebegin', `
      <div class="tut-quiz-btns" id="tutQuizBtns">
        <button class="tut-quiz-same" id="tutSeqSame">?�� 모두 같아??/button>
        <button class="tut-quiz-diff" id="tutSeqDiff">?�� 모두 ?�라??/button>
      </div>`);
    document.getElementById('tutSeqSame').addEventListener('click', () => onTutSeqAnswer('same'));
    document.getElementById('tutSeqDiff').addEventListener('click', () => onTutSeqAnswer('different'));
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

    // ?��? 로그 ?�적
    if (q.logLabel) {
      const ansText = answer === 'same'      ? '모두 같아???�️'
                    : answer === 'different'  ? '모두 ?�라???�️'
                    : '2개만 같아???�️';
      const cls    = answer === 'neither' ? 'log-err' : 'log-ok';
      tutAnswerItems.push({ label: q.logLabel, text: ansText, cls });
      renderAnswerLog();
    }

    const isLastQ = tutSubQIdx >= step.questions.length - 1;
    const isLastStep = tutStepIdx >= JUNIOR_TUT_STEPS.length - 1;
    tutSubQNext = !isLastQ; // 중간 질문?�면 ?�음 질문 버튼
    tutNextBtn.hidden      = false;
    tutNextBtn.textContent = isLastQ
      ? (isLastStep ? '?�료! ?��' : '?�음 ??)
      : '?�음 질문 ??;
  } else {
    tutFeedbackEl.innerHTML = `\u274c<br>${wrongMsg}`;
    tutFeedbackEl.className = 'tut-feedback tut-fail';
    // 메시지??그�?�??��?, 버튼�?즉시 ?�활?�화 ???�답 ?�택 ??�?��?�로 교체
    ['tutSeqYes','tutSeqNo','tutSeqSame','tutSeqDiff','tutSeqNeither'].forEach(id => {
      document.getElementById(id)?.removeAttribute('disabled');
    });
  }
}

function renderAnswerLog() {
  tutAnswerLog.innerHTML = '<div class="tut-log-title">?�� ?�단 결과</div>'
    + tutAnswerItems.map(it =>
        `<div class="tut-log-item ${it.cls}">${it.label}: ${it.text}</div>`
      ).join('');
  tutAnswerLog.hidden = false;
}

function renderCardPickStep() {
  tutCardArea.innerHTML = '';
  tutCardArea.className = 'tut-card-area tut-cardpick-area';
  const choices = shuffle([...TUT_CARDPICK_CHOICES_RAW]);
  const labels  = ['A', 'B', 'C', 'D'];
  const givenHTML = TUT_CARDPICK_GIVEN
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
    document.getElementById(`tut-pick-${i}`)?.addEventListener('click', () => onCardPickAnswer(ch.isCorrect, i, choices));
  });
}

function onCardPickAnswer(isCorrect, clickedIdx, choices) {
  choices.forEach((_, i) => document.getElementById(`tut-pick-${i}`)?.setAttribute('disabled', ''));
  if (isCorrect) {
    document.getElementById(`tut-pick-${clickedIdx}`)?.classList.add('tut-pick-correct');
    tutFeedbackEl.innerHTML = '?�� ?�확?�요! 모양(?�?�→마름모→물결), ??초록?�보?�→빨강), 채�?(비어?�음?�줄무늬?��??�참) ??모두 ?�라??<strong>SET</strong>?�요!';
    tutFeedbackEl.className = 'tut-feedback tut-success';
    tutNextBtn.hidden      = false;
    tutNextBtn.textContent = tutStepIdx >= JUNIOR_TUT_STEPS.length - 1 ? '?�료! ?��' : '?�음 ??;
  } else {
    document.getElementById(`tut-pick-${clickedIdx}`)?.classList.add('tut-pick-wrong');
    tutFeedbackEl.innerHTML = '???�시 ?�인?�보?�요! �??�성???�나??비교?�보?�요.';
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
    tutNextBtn.textContent = tutStepIdx >= JUNIOR_TUT_STEPS.length - 1 ? '?�료! ?��' : '?�음 ??;
  } else {
    tutFeedbackEl.innerHTML = `?�️ ?�시 ?�펴보세?? ${step.hint}`;
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
  // 버튼 비활?�화
  document.getElementById('tutQuizYes')?.setAttribute('disabled', '');
  document.getElementById('tutQuizNo' )?.setAttribute('disabled', '');
  // ?�드�?
  tutFeedbackEl.innerHTML = step.explanation;
  tutFeedbackEl.className = 'tut-feedback ' + (correct ? 'tut-success' : 'tut-fail');
  // 카드???�오 ?�시
  tutCards.forEach((_, idx) => {
    const el = document.getElementById(`tut-card-${idx}`);
    if (el) el.classList.add(correct ? 'tut-correct' : 'tut-wrong');
  });
  // ?�음 버튼 ?�시
  tutNextBtn.hidden      = false;
  tutNextBtn.textContent = tutStepIdx >= JUNIOR_TUT_STEPS.length - 1 ? '?�료! ?��' : '?�음 ??;
}

function tutAdvance() {
  // ?�퀀?????�브?�즈 ?�동
  if (tutSubQNext) {
    tutSubQNext = false;
    tutSubQIdx++;
    renderTutSubQ();
    return;
  }
  tutCardArea.className = 'tut-card-area';
  document.getElementById('tutQuizBtns')?.remove();
  if (tutStepIdx >= JUNIOR_TUT_STEPS.length) { showTutComplete(); return; }
  renderTutStep();
}

function showTutComplete() {
  tutProgressFill.style.width = '100%';
  tutStepLabel.textContent    = '?�료! ?��';
  tutTitleEl.textContent      = '?�� ?�토리얼 ?�료!';
  tutBubbleEl.innerHTML       = 'Junior SET 규칙??모두 ?�혔?�요!<br>?�제 모드 ?�택 ?�면?�로 ?�아가 ?�전?�보?�요.';
  document.getElementById('tutQuizBtns')?.remove();
  tutCardArea.innerHTML = `
    <div class="tut-complete-home">
      <button class="tut-home-big-btn" id="tutGoHomeComplete">
        <svg viewBox="0 0 24 24" width="56" height="56" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        <span>?�문으�?/span>
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

// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�

// 19. ?�크/?�이??모드 ?��?
// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�
const btnTheme   = document.getElementById('btnTheme');
const themeIcon  = document.getElementById('themeIcon');
const themeLabel = document.getElementById('themeLabel');

btnTheme.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  themeIcon.textContent  = isDark ? '?��? : '?��';
  themeLabel.textContent = isDark ? '?�이??모드' : '?�크 모드';
});

// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�
// 20. 초기????모드 ?�택 ?�면 ?�시
// ?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�?�
createParticles();
// 게임 ?�동 ?�작 ?�이 ?��?모드 ?�택) ?�면 ?�시
modeScreen.hidden = false;
