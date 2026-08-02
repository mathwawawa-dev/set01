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
let deck        = [];   // 남은 덱 (아직 화면에 없는 카드)
let board       = [];   // 현재 화면에 있는 카드 (9장)
let selected    = [];   // 선택된 카드 인덱스(board 기준)
let score       = 0;
let timeLeft    = TOTAL_TIME;
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
const selectionBar  = document.getElementById('selectionBar');
const selectionText = document.getElementById('selectionText');
const gameOverlay   = document.getElementById('gameOverlay');
const overlayEmoji  = document.getElementById('overlayEmoji');
const overlayTitle  = document.getElementById('overlayTitle');
const overlayDesc   = document.getElementById('overlayDesc');
const btnRestart    = document.getElementById('btnRestart');
const bgParticles   = document.getElementById('bgParticles');

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
 * SET가 최소 1개 이상 보장된 9장을 뽑아 board에 설정하고
 * 나머지를 deck에 남긴다.
 */
function initBoard() {
  let attempt = 0;
  while (true) {
    attempt++;
    const full = shuffle(buildFullDeck());
    const candidate = full.slice(0, GRID_SIZE);
    if (hasAnySet(candidate)) {
      board = candidate;
      deck  = full.slice(GRID_SIZE);
      return;
    }
    // 최대 200회 시도 (실제로는 10회 이내에 반드시 성공)
    if (attempt > 200) {
      // 안전망: 억지로 SET 하나를 삽입
      const allCards = shuffle(buildFullDeck());
      board = forcedSetBoard(allCards);
      deck  = allCards.filter(c => !board.includes(c));
      return;
    }
  }
}

/**
 * 안전망: SET가 없는 경우 강제로 SET 포함 9장 구성
 * (실제로는 거의 호출되지 않음)
 */
function forcedSetBoard(shuffled) {
  // 첫 3장 중 SET를 만족하는 세 번째 카드를 찾아 삽입
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
 * SET로 확인된 3장(boardIndices)을 제거하고
 * deck에서 3장을 뽑아 보충. 보충 후 SET가 없으면 재시도.
 * deck이 3장 미만이면 빈자리 그대로.
 */
function replaceCards(boardIndices) {
  if (deck.length < 3) {
    // 덱 소진 시 그냥 제거만
    for (const idx of boardIndices) {
      board[idx] = null;
    }
    board = board.filter(c => c !== null);
    return;
  }

  const MAX_TRIES = 300;
  let tries = 0;

  while (tries < MAX_TRIES) {
    tries++;
    // 덱 셔플 후 3장 후보 뽑기
    shuffle(deck);
    const newCards = deck.slice(0, 3);

    // 보드에 임시 적용
    const tempBoard = [...board];
    for (let i = 0; i < 3; i++) {
      tempBoard[boardIndices[i]] = newCards[i];
    }

    if (hasAnySet(tempBoard)) {
      // 확정
      for (let i = 0; i < 3; i++) {
        board[boardIndices[i]] = newCards[i];
      }
      deck.splice(0, 3);
      return;
    }
  }

  // 300회 이후에도 실패하면 그냥 교체 (극히 드문 엣지 케이스)
  const newCards = deck.splice(0, 3);
  for (let i = 0; i < 3; i++) {
    board[boardIndices[i]] = newCards[i];
  }
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
  hintText.textContent = `${n}개의 셋이 보입니다.`;
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
    // 정답: 별도 표시 없이 카드 교체
    elems.forEach(el => el.classList.remove('selected'));

    score++;
    scoreDisplay.textContent = score;

    const indices = [...selected];
    selected = [];
    replaceCards(indices);
    indices.forEach(idx => renderCardAt(idx));
    updateHint();

    updateSelectionBar(null, '카드를 3장 선택하세요');
    animLock = false;

  } else {
    // 오답: 선택 즉시 해제 + 일시적 메시지
    elems.forEach(el => el.classList.remove('selected'));
    selected = [];
    updateSelectionBar('fail', '틀렸습니다! 다시 선택하세요.');
    setTimeout(() => {
      updateSelectionBar(null, '카드를 3장 선택하세요');
    }, 1200);
    animLock = false;
  }
}



// ──────────────────────────────────────────────
// 15. 타이머
// ──────────────────────────────────────────────
function startTimer() {
  clearInterval(timerID);
  timeLeft = TOTAL_TIME;
  timerDisplay.textContent = timeLeft;
  statTimer.classList.remove('danger');

  timerID = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 20) statTimer.classList.add('danger');
    if (timeLeft <= 0) {
      clearInterval(timerID);
      endGame();
    }
  }, 1000);
}

// ──────────────────────────────────────────────
// 16. 게임 종료
// ──────────────────────────────────────────────
function endGame() {
  gameOver = true;
  animLock = true;

  // 모든 카드 비활성화
  document.querySelectorAll('.card').forEach(el => el.classList.add('disabled'));

  overlayEmoji.textContent = score >= 5 ? '🏆' : score >= 3 ? '🎉' : '😅';
  overlayTitle.textContent = '시간 종료!';
  overlayDesc.innerHTML =
    `총 <strong style="color:#f5c842">${score}</strong>개의 SET를 찾았어요!<br>` +
    (score >= 5 ? '훌륭한 실력입니다! 👏' :
     score >= 3 ? '좋은 성적이에요! 계속 도전해보세요.' :
                  '연습하면 분명 더 잘할 수 있어요! 💪');

  gameOverlay.hidden = false;
}

// ──────────────────────────────────────────────
// 17. 게임 시작
// ──────────────────────────────────────────────
function startGame() {
  gameOver   = false;
  animLock   = false;
  score      = 0;
  selected   = [];

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
btnRestart.addEventListener('click', startGame);

// ──────────────────────────────────────────────
// 19. 키보드 단축키
// ──────────────────────────────────────────────
// 그리드 레이아웃 (row-major):
//   카드 0  1  2  (행 1)
//   카드 3  4  5  (행 2)
//   카드 6  7  8  (행 3)
//
// 키맵:
//   1  2  3  → card 0,1,2
//   Q  W  E  → card 3,4,5 (한글: ㅂㅈㄷ)
//   A  S  D  → card 6,7,8 (한글: ㅁㄴㅇ)
//   Numpad7  8  9 → card 0,1,2
//   Numpad4  5  6 → card 3,4,5
//   Numpad1  2  3 → card 6,7,8
const KEY_MAP = {
  'Digit1': 0, 'Digit2': 1, 'Digit3': 2,
  'KeyQ':   3, 'KeyW':   4, 'KeyE':   5,
  'KeyA':   6, 'KeyS':   7, 'KeyD':   8,
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
// 19. 초기화
// ──────────────────────────────────────────────
createParticles();
startGame();
