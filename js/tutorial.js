// TUTORIAL MODULE — Junior SET (27종 카드)
// ══════════════════════════════════════════════

// ── 분석 1 카드 ──────────────────────────────────
const TUT_ANA1_CARDS = [
  { shape: 'diamond', color: 'green',  fill: 'outline' },
  { shape: 'diamond', color: 'purple', fill: 'outline' },
  { shape: 'diamond', color: 'red',    fill: 'outline' },
];

// ── 문제 1 카드 ──────────────────────────────────
const TUT_Q1_GIVEN = [
  { shape: 'squiggle', color: 'green', fill: 'solid' },
  { shape: 'squiggle', color: 'red',   fill: 'solid' },
];
const TUT_Q1_CHOICES = [
  { isCorrect: true,  card: { shape: 'squiggle', color: 'purple', fill: 'solid'   } },
  { isCorrect: false, card: { shape: 'squiggle', color: 'purple', fill: 'outline' } },
  { isCorrect: false, card: { shape: 'oval',     color: 'purple', fill: 'solid'   } },
  { isCorrect: false, card: { shape: 'oval',     color: 'purple', fill: 'outline' } },
];

// ── 분석 2 카드 ──────────────────────────────────
const TUT_ANA2_CARDS = [
  { shape: 'oval',     color: 'green',  fill: 'striped' },
  { shape: 'squiggle', color: 'purple', fill: 'striped' },
  { shape: 'diamond',  color: 'red',    fill: 'outline' },
];

// ── 문제 2 카드 ──────────────────────────────────
const TUT_Q2_GIVEN = [
  { shape: 'oval',    color: 'red', fill: 'solid' },
  { shape: 'diamond', color: 'red', fill: 'solid' },
];
const TUT_Q2_CHOICES = [
  { isCorrect: true,  card: { shape: 'squiggle', color: 'red',    fill: 'solid'   } },
  { isCorrect: false, card: { shape: 'squiggle', color: 'red',    fill: 'outline' } },
  { isCorrect: false, card: { shape: 'squiggle', color: 'purple', fill: 'solid'   } },
  { isCorrect: false, card: { shape: 'diamond',  color: 'purple', fill: 'solid'   } },
];

// ── 분석 3 카드 ──────────────────────────────────
const TUT_ANA3_CARDS = [
  { shape: 'diamond',  color: 'green',  fill: 'striped' },
  { shape: 'oval',     color: 'purple', fill: 'solid'   },
  { shape: 'squiggle', color: 'red',    fill: 'outline' },
];

// ── 문제 3 카드 ──────────────────────────────────
const TUT_Q3_GIVEN = [
  { shape: 'diamond', color: 'green',  fill: 'outline' },
  { shape: 'oval',    color: 'purple', fill: 'striped' },
];
const TUT_Q3_CHOICES = [
  { isCorrect: true,  card: { shape: 'squiggle', color: 'red',    fill: 'solid'   } },
  { isCorrect: false, card: { shape: 'squiggle', color: 'red',    fill: 'outline' } },
  { isCorrect: false, card: { shape: 'squiggle', color: 'green',  fill: 'solid'   } },
  { isCorrect: false, card: { shape: 'diamond',  color: 'red',    fill: 'solid'   } },
];

// ── 훈련1 고정 4장 (수학적 검증 완료: 유일 SET = 인덱스 0,1,2) ──
const TUT_TRAIN1_BASE = [
  { shape: 'oval',     color: 'green',  fill: 'outline' }, // 정답 A
  { shape: 'diamond',  color: 'purple', fill: 'striped' }, // 정답 B
  { shape: 'squiggle', color: 'red',    fill: 'solid'   }, // 정답 C
  { shape: 'oval',     color: 'purple', fill: 'solid'   }, // 미끼
];

// ══════════════════════════════════════════════
// JUNIOR_TUT_STEPS — 11단계
// ══════════════════════════════════════════════
const JUNIOR_TUT_STEPS = [
  // ── STEP 1: intro ──────────────────────────
  {
    id: 'intro', title: 'SET 게임이 뭐예요?',
    text: 'SET는 카드 세 장을 골라서 만드는 게임이에요! 🌟<br><br>카드마다 <strong>세 가지 특징</strong>이 있어요.<br><strong>모양</strong> (타원 · 마름모 · 물결)<br><strong>색깔</strong> (초록 · 보라 · 빨강)<br><strong>채움</strong> (빈 것 · 줄무늬 · 가득참)<br><br>세 장 각각의 특징이<br><span class="txt-black">모두 </span><span class="txt-blue">같거나</span> <span class="txt-black">모두 </span><span class="txt-red">달라야</span> SET예요!',
    cards: null, interactive: false,
  },

  // ── STEP 2: analysis1 ──────────────────────
  {
    id: 'analysis1', type: 'sequence',
    title: '분석 ①',
    cards: TUT_ANA1_CARDS,
    questions: [
      {
        q: '<strong>모양</strong>을 비교합시다!',
        attrLabel: '모양이', logLabel: '모양',
        type: 'attr', correctAnswer: 'same',
        praise: '🎉 굿굿!<br><br>마름모 · 마름모 · 마름모<br>— 세 장 모두 마름모! <strong>모두 같아요</strong>! ✔️',
        wrong: '세 장 모두 마름모 모양이에요!<br>— 다 같지 않나요? 😊',
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
        type: 'attr', correctAnswer: 'same',
        praise: '🎉 굿굿!<br><br>빈 것 · 빈 것 · 빈 것<br>— 채움 <strong>모두 같아요</strong>! ✔️',
        wrong: '세 장 모두 빈 것(outline)이에요!<br>— 다 같지 않나요? 😊',
      },
      {
        q: '모양, 색깔, 채움을 모두 정리해봐요!<br>세 장이 <strong>SET</strong>일까요?',
        type: 'set', correctAnswer: 'yes',
        praise: '🎉 굿굿!<br><br>세 가지 특징이 모두 규칙에 맞아요!<br>이게 바로 <strong>SET</strong>예요! 🌟',
        wrong: '💡 다시 생각해봐요!<br>모양·채움은 다 같고, 색깔만 다 달라요!<br>→ 이럴 때도 SET가 돼요! 🎉',
      },
    ],
  },

  // ── STEP 3: quiz1 ──────────────────────────
  {
    id: 'quiz1', type: 'cardpick',
    title: '문제 ① — SET를 완성해봐요!',
    text: 'SET가 되기 위해<br>필요한 카드는 무엇일까요?<br>A, B, C, D 중에서 골라봐요!',
    givenCards: TUT_Q1_GIVEN,
    choices: TUT_Q1_CHOICES,
    explanation: '🎉 정확해요!<br>모양 같음 · 색깔 달라야 보라 · 채움 같음<br>→ 물결 보라 가득참 카드! ✅',
  },

  // ── STEP 4: analysis2 ──────────────────────
  {
    id: 'analysis2', type: 'sequence',
    title: '분석 ②',
    cards: TUT_ANA2_CARDS,
    questions: [
      {
        q: '<strong>모양</strong>을 비교합시다!',
        attrLabel: '모양이', logLabel: '모양',
        type: 'attr', correctAnswer: 'different',
        praise: '🎉 굿굿!<br><br>타원 · 물결 · 마름모<br>— 세 모양이 <strong>모두 달라요</strong>! ✔️',
        wrong: '타원 · 물결 · 마름모<br>— 세 개가 서로 달라요! 😊',
      },
      {
        q: '<strong>색깔</strong>을 비교합시다!',
        attrLabel: '색깔이', logLabel: '색깔',
        type: 'attr', correctAnswer: 'different',
        praise: '🎉 굿굿!<br><br>초록 · 보라 · 빨강<br>— 색깔도 <strong>모두 달라요</strong>! ✔️',
        wrong: '초록 · 보라 · 빨강<br>— 세 개가 다 다른 색깔이에요! 😊',
      },
      {
        q: '<strong>채움</strong>을 비교합시다!',
        attrLabel: '채움이', logLabel: '채움',
        type: 'attr3', correctAnswer: 'neither',
        praise: '🎉 굿굿!<br><br>줄무늬 · 줄무늬 · 빈 것<br>— 줄무늬가 두 개예요.<br>⚠️ <strong>2개만 같아요</strong> — 규칙 위반이에요!',
        wrong_same: '줄무늬 · 줄무늬 · 빈 것<br>— 마지막이 빈 것이에요!<br>모두 같지는 않아요. 😊',
        wrong_diff: '줄무늬 · 줄무늬 · 빈 것<br>— 줄무늬가 두 개나 있어요!<br>모두 다른 것도 아니에요. 😊',
      },
      {
        q: '모양, 색깔, 채움을 모두 정리해봐요!<br>그럼 이 세 장이 <strong>SET</strong>일까요?',
        type: 'set', correctAnswer: 'no', logLabel: null,
        praise: '🎉 굿굿!<br><br>채움에서 규칙을 어겼으니까<br>이 세 장은 <strong>SET가 아니에요</strong>! 🙌',
        wrong: '💡 다시 생각해봐요!<br>채움에서 실패했어요 (줄무늬가 두 개).<br>한 가지라도 규칙을 어기면<br>SET가 안 돼요!',
      },
    ],
  },

  // ── STEP 5: quiz2 ──────────────────────────
  {
    id: 'quiz2', type: 'cardpick',
    title: '문제 ② — SET를 완성해봐요!',
    text: 'SET가 되기 위해<br>필요한 카드는 무엇일까요?<br>A, B, C, D 중에서 골라봐요!',
    givenCards: TUT_Q2_GIVEN,
    choices: TUT_Q2_CHOICES,
    explanation: '🎉 정확해요!<br>모양 달라야 물결 · 색깔 같음 빨강 · 채움 같음<br>→ 물결 빨강 가득참 카드! ✅',
  },

  // ── STEP 6: analysis3 ──────────────────────
  {
    id: 'analysis3', type: 'sequence',
    title: '분석 ③',
    cards: TUT_ANA3_CARDS,
    questions: [
      {
        q: '<strong>모양</strong>을 비교합시다!',
        attrLabel: '모양이', logLabel: '모양',
        type: 'attr', correctAnswer: 'different',
        praise: '🎉 굿굿!<br><br>마름모 · 타원 · 물결<br>— 세 모양이 <strong>모두 달라요</strong>! ✔️',
        wrong: '마름모 · 타원 · 물결<br>— 세 개가 서로 달라요! 😊',
      },
      {
        q: '<strong>색깔</strong>을 비교합시다!',
        attrLabel: '색깔이', logLabel: '색깔',
        type: 'attr', correctAnswer: 'different',
        praise: '🎉 굿굿!<br><br>초록 · 보라 · 빨강<br>— 색깔도 <strong>모두 달라요</strong>! ✔️',
        wrong: '초록 · 보라 · 빨강<br>— 세 개가 다 다른 색깔이에요! 😊',
      },
      {
        q: '<strong>채움</strong>을 비교합시다!',
        attrLabel: '채움이', logLabel: '채움',
        type: 'attr', correctAnswer: 'different',
        praise: '🎉 굿굿!<br><br>줄무늬 · 가득 참 · 빈 것<br>— 채움도 <strong>모두 달라요</strong>! ✔️',
        wrong: '줄무늬 · 가득 참 · 빈 것<br>— 세 개가 다 다른 채움이에요! 😊',
      },
      {
        q: '모양, 색깔, 채움을 모두 정리해봐요!<br>세 장이 <strong>SET</strong>일까요?',
        type: 'set', correctAnswer: 'yes',
        praise: '🎉 굿굿!<br><br>세 가지 특징이 모두 다 달라서<br>이게 바로 <strong>SET</strong>예요! 🌟',
        wrong: '💡 다시 생각해봐요!<br>모양·색깔·채움이 모두 다 달라요!<br>→ 이럴 때도 SET가 돼요! 🎉',
      },
    ],
  },

  // ── STEP 7: quiz3 ──────────────────────────
  {
    id: 'quiz3', type: 'cardpick',
    title: '문제 ③ — SET를 완성해봐요!',
    text: 'SET가 되기 위해<br>필요한 카드는 무엇일까요?<br>A, B, C, D 중에서 골라봐요!',
    givenCards: TUT_Q3_GIVEN,
    choices: TUT_Q3_CHOICES,
    explanation: '🎉 정확해요!<br>모양·색깔·채움 모두 달라야<br>→ 물결 빨강 가득참 카드! ✅',
  },

  // ── STEP 8: training1 ──────────────────────
  {
    id: 'training1', title: '훈련 ① — 4장에서 찾아봐요!',
    text: '4장 중에서 <strong>SET가 되는 세 장</strong>을 골라봐요!<br>힌트 버튼을 눌러 도움을 받을 수 있어요.',
    cards: null, interactive: true, hasHint: true, challengeN: 4,
  },

  // ── STEP 9: training2 ──────────────────────
  {
    id: 'training2', title: '훈련 ② — 5장에서 찾아봐요!',
    text: '5장 중에서 <strong>SET가 되는 세 장</strong>을 골라봐요!<br>힌트 버튼을 눌러 도움을 받을 수 있어요.',
    cards: null, interactive: true, hasHint: true, challengeN: 5,
  },

  // ── STEP 10: training3 ──────────────────────
  {
    id: 'training3', title: '훈련 ③ — 6장에서 찾아봐요!',
    text: '6장 중에서 <strong>SET가 되는 세 장</strong>을 골라봐요!<br>힌트 버튼을 눌러 도움을 받을 수 있어요.',
    cards: null, interactive: true, hasHint: true, challengeN: 6,
  },

  // ── STEP 11: final ──────────────────────────
  {
    id: 'final', title: '이제 실전이에요!',
    text: '9장 중에서 <strong>SET를 찾아보세요.</strong><br>이번엔 힌트가 없어요!',
    cards: null, interactive: true, hasHint: false, challengeN: 9,
  },
];

// ══════════════════════════════════════════════
// Tutorial 상태
// ══════════════════════════════════════════════
let tutStepIdx  = 0;
let tutSubQIdx  = 0;
let tutSelected = [];
let tutCards    = [];
let tutAnswer   = [];
let tutHintCard = -1;
let tutDone     = false;
let tutSubQNext = false;
let tutAnswerItems = [];

// ── DOM 참조 ─────────────────────────────────
const tutorialScreen   = document.getElementById('tutorialScreen');
const tutProgressFill  = document.getElementById('tutProgressFill');
const tutStepLabel     = document.getElementById('tutStepLabel');
const tutTitleEl       = document.getElementById('tutTitle');
const tutBubbleEl      = document.getElementById('tutBubble');
const tutCardArea      = document.getElementById('tutCardArea');
const tutFeedbackEl    = document.getElementById('tutFeedback');
const tutNextBtn       = document.getElementById('tutNextBtn');
const tutHintBtn       = document.getElementById('tutHintBtn');
const tutContextBubble = document.getElementById('tutContextBubble');
const tutAnswerLog     = document.getElementById('tutAnswerLog');
const tutModeScreen    = document.getElementById('modeScreen');

const TUT_INTRO_TEXT = '세 가지를 하나씩 확인해요!<br>모양 · 색깔 · 채움<br><span class="txt-black">모두 </span><span class="txt-blue">같거나</span> <span class="txt-black">모두 </span><span class="txt-red">달라야</span> SET예요!';

// ══════════════════════════════════════════════
// 진입/종료
// ══════════════════════════════════════════════
function startTutorial() {
  tutStepIdx = 0;
  tutModeScreen.hidden  = true;
  tutorialScreen.hidden = false;
  renderTutStep();
}

// ══════════════════════════════════════════════
// 스텝 렌더링
// ══════════════════════════════════════════════
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

  const tutInner = tutorialScreen.querySelector('.tut-inner');

  if (step.type === 'sequence') {
    tutInner.classList.remove('tut-layout-quiz');
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
    tutInner.classList.add('tut-layout-quiz');
    tutBubbleEl.innerHTML   = `<div class="stamp-anim">${step.text}</div>`;
    tutContextBubble.hidden = true;
    tutAnswerLog.hidden     = true;
    renderCardPickStep();
    tutNextBtn.hidden = true;
  } else if (step.id === 'intro') {
    tutInner.classList.remove('tut-layout-quiz');
    tutBubbleEl.innerHTML      = step.text;
    tutContextBubble.hidden    = true;
    tutAnswerLog.hidden        = true;
    tutCardArea.innerHTML      = '';
    tutNextBtn.hidden          = false;
    tutNextBtn.textContent     = '다음 →';
  } else {
    // training1 / training2 / training3 / final
    tutInner.classList.remove('tut-layout-quiz');
    tutBubbleEl.innerHTML      = step.text;
    tutContextBubble.hidden    = true;
    tutAnswerLog.hidden        = true;
    setupTutChallenge(step);
    renderTutCards(step.interactive);
    const isLast = tutStepIdx === total - 1;
    tutNextBtn.hidden      = step.interactive;
    tutNextBtn.textContent = isLast ? '완료! 🎓' : '다음 →';
  }
}

// ══════════════════════════════════════════════
// challenge 세팅 — 범용 함수
// ══════════════════════════════════════════════
function setupTutChallenge(step) {
  const n = step.challengeN || 6;

  if (n === 4) {
    // 고정 4장 — 수학적 검증 완료
    const indexed = TUT_TRAIN1_BASE.map((card, i) => ({ card, ans: i < 3 }));
    shuffle(indexed);
    tutCards    = indexed.map(x => x.card);
    tutAnswer   = indexed.reduce((acc, x, i) => { if (x.ans) acc.push(i); return acc; }, []);
    tutHintCard = tutAnswer[0];
    return;
  }

  // n=5, 6, 9: 랜덤 탐색
  const wantExact = (n !== 9); // 9장은 1개 이상이면 OK
  for (let t = 0; t < 500; t++) {
    const pool = shuffle(buildFullDeck()).slice(0, n);
    const sets = findAllSets(pool);
    if (wantExact ? sets.length === 1 : sets.length >= 1) {
      tutCards    = pool;
      tutAnswer   = sets[0];
      tutHintCard = wantExact ? tutAnswer[0] : -1;
      return;
    }
  }
  // 폴백: 1회 유효 SET 찾기
  for (let t = 0; t < 500; t++) {
    const pool = shuffle(buildFullDeck()).slice(0, n);
    if (hasAnySet(pool)) {
      tutCards = pool;
      for (let i = 0; i < n - 2; i++)
        for (let j = i + 1; j < n - 1; j++)
          for (let k = j + 1; k < n; k++)
            if (isSet(pool[i], pool[j], pool[k])) {
              tutAnswer   = [i, j, k];
              tutHintCard = wantExact ? i : -1;
              return;
            }
    }
  }
}

// ══════════════════════════════════════════════
// 모든 SET 찾기 헬퍼
// ══════════════════════════════════════════════
function findAllSets(cards) {
  const sets = [];
  const n = cards.length;
  for (let i = 0; i < n - 2; i++)
    for (let j = i + 1; j < n - 1; j++)
      for (let k = j + 1; k < n; k++)
        if (isSet(cards[i], cards[j], cards[k]))
          sets.push([i, j, k]);
  return sets;
}

// ══════════════════════════════════════════════
// 카드 렌더링
// ══════════════════════════════════════════════
function renderTutCards(interactive) {
  tutCardArea.innerHTML = '';
  tutCardArea.className = 'tut-card-area';
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

// ══════════════════════════════════════════════
// 카드 클릭 (훈련/실전)
// ══════════════════════════════════════════════
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

// ══════════════════════════════════════════════
// 힌트
// ══════════════════════════════════════════════
function onTutHint() {
  if (tutHintCard < 0) return;
  const el = document.getElementById(`tut-card-${tutHintCard}`);
  if (el) el.classList.add('tut-hint-glow');
  tutHintBtn.disabled    = true;
  tutHintBtn.textContent = '💡 힌트 사용됨';
}

// ══════════════════════════════════════════════
// 서브 질문 렌더링 (sequence)
// ══════════════════════════════════════════════
function renderTutSubQ() {
  const step  = JUNIOR_TUT_STEPS[tutStepIdx];
  const q     = step.questions[tutSubQIdx];
  const qNum  = tutSubQIdx + 1;
  const qTot  = step.questions.length;

  document.getElementById('tutQuizBtns')?.remove();
  const KO_ORD = ['첫','두','세','네','다섯','여섯','일곱','여덟','아홉','열'];
  const labelText = (qNum === qTot) ? '마지막 질문' : `${KO_ORD[qNum-1] ?? qNum} 번째 질문`;
  tutBubbleEl.innerHTML     = `<div class="stamp-anim"><span class="tut-sub-label">${labelText}</span></div><br><div class="stamp-anim" style="animation-delay: 0.15s; margin-top: 4px;">${q.q}</div>`;
  tutFeedbackEl.textContent = '';
  tutFeedbackEl.className   = 'tut-feedback';

  if (q.type === 'set') {
    tutFeedbackEl.insertAdjacentHTML('beforebegin', `
      <div class="tut-quiz-btns choices-hidden" id="tutQuizBtns">
        <button class="tut-quiz-yes" id="tutSeqYes">세 장의 카드는<br>SET입니다.</button>
        <button class="tut-quiz-no"  id="tutSeqNo">세 장의 카드는<br>SET가 아닙니다.</button>
      </div>`);
    document.getElementById('tutSeqYes').addEventListener('click', () => onTutSeqAnswer('yes'));
    document.getElementById('tutSeqNo' ).addEventListener('click', () => onTutSeqAnswer('no'));
  } else {
    const attrSubject = q.attrLabel || '';
    const prefix = attrSubject ? `${attrSubject}<br>` : '';
    tutFeedbackEl.insertAdjacentHTML('beforebegin', `
      <div class="tut-quiz-btns tut-quiz-btns-3 choices-hidden" id="tutQuizBtns">
        <button class="tut-quiz-same"    id="tutSeqSame">${prefix}<span class="txt-blue">모두 같아요</span></button>
        <button class="tut-quiz-diff"    id="tutSeqDiff">${prefix}<span class="txt-red">모두 달라요</span></button>
        <button class="tut-quiz-neither" id="tutSeqNeither">${prefix}2개만 같아요</button>
      </div>`);
    document.getElementById('tutSeqSame'   ).addEventListener('click', () => onTutSeqAnswer('same'));
    document.getElementById('tutSeqDiff'   ).addEventListener('click', () => onTutSeqAnswer('different'));
    document.getElementById('tutSeqNeither').addEventListener('click', () => onTutSeqAnswer('neither'));
  }

  // stamp 애니메이션 후 선지 fade-in
  setTimeout(() => {
    const btns = document.getElementById('tutQuizBtns');
    if (btns) { btns.classList.remove('choices-hidden'); btns.classList.add('choices-fadein'); }
  }, 450);

  tutNextBtn.hidden = true;
}

// ══════════════════════════════════════════════
// 서브 질문 답변 처리
// ══════════════════════════════════════════════
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

    if (q.logLabel) {
      const ansText = answer === 'same'     ? '모두 같아요'
                    : answer === 'different' ? '모두 달라요'
                    : '2개만 같아요';
      const cls = answer === 'same' ? 'log-same' : answer === 'different' ? 'log-diff' : 'log-err';
      tutAnswerItems.push({ label: q.logLabel, text: ansText, cls });
      renderAnswerLog();
    }

    const isLastQ    = tutSubQIdx >= step.questions.length - 1;
    const isLastStep = tutStepIdx >= JUNIOR_TUT_STEPS.length - 1;
    tutSubQNext = !isLastQ;
    tutNextBtn.hidden      = false;
    tutNextBtn.textContent = isLastQ
      ? (isLastStep ? '완료! 🎓' : '다음 →')
      : '다음 질문 →';
  } else {
    tutFeedbackEl.innerHTML = `❌<br><br>${wrongMsg}`;
    tutFeedbackEl.className = 'tut-feedback tut-fail';
    ['tutSeqYes','tutSeqNo','tutSeqSame','tutSeqDiff','tutSeqNeither'].forEach(id => {
      document.getElementById(id)?.removeAttribute('disabled');
    });
  }
}

// ══════════════════════════════════════════════
// 판단 결과 로그
// ══════════════════════════════════════════════
function renderAnswerLog() {
  tutAnswerLog.innerHTML = '<div class="tut-log-title">판단 결과</div>'
    + tutAnswerItems.map(it =>
        `<div class="tut-log-item ${it.cls}"><span class="log-label">${it.label}:</span> ${it.text}</div>`
      ).join('');
  tutAnswerLog.hidden = false;
}

// ══════════════════════════════════════════════
// 카드픽 퀴즈 렌더링
// ══════════════════════════════════════════════
function renderCardPickStep() {
  tutCardArea.innerHTML = '';
  tutCardArea.className = 'tut-card-area tut-cardpick-area';
  const step       = JUNIOR_TUT_STEPS[tutStepIdx];
  const rawChoices = step.choices;
  const choices    = shuffle([...rawChoices]);
  const labels     = ['A', 'B', 'C', 'D'];
  const givenCards = step.givenCards;
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
    <div class="tut-pick-choices choices-hidden" id="tutPickChoices">${choicesHTML}</div>`;

  // 버블 stamp 애니메이션 후 선지 fade-in
  const STAMP_DELAY = 450; // stamp 0.4s + 여유
  setTimeout(() => {
    const choicesEl = document.getElementById('tutPickChoices');
    if (choicesEl) {
      choicesEl.classList.remove('choices-hidden');
      choicesEl.classList.add('choices-fadein');
    }
  }, STAMP_DELAY);

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

// ══════════════════════════════════════════════
// 진행 버튼
// ══════════════════════════════════════════════
function tutAdvance() {
  if (tutSubQNext) {
    tutSubQNext = false;
    tutSubQIdx++;
    renderTutSubQ();
    return;
  }
  tutCardArea.className = 'tut-card-area';
  document.getElementById('tutQuizBtns')?.remove();
  tutStepIdx++;
  if (tutStepIdx >= JUNIOR_TUT_STEPS.length) { showTutComplete(); return; }
  renderTutStep();
}

// ══════════════════════════════════════════════
// 완료 화면
// ══════════════════════════════════════════════
function showTutComplete() {
  tutProgressFill.style.width = '100%';
  tutStepLabel.textContent    = '완료! 🎓';
  tutTitleEl.textContent      = '🏅 튜토리얼 완료!';
  tutBubbleEl.innerHTML       = 'Junior SET 규칙을 모두 익혔어요!<br>이제 모드 선택 화면으로 돌아가 도전해보세요.';
  document.getElementById('tutQuizBtns')?.remove();

  // 완료 시 카드 래퍼가 남은 공간을 모두 차지해 버튼이 세로 중앙 배치되도록
  const wrapper = tutCardArea.parentElement;
  if (wrapper) wrapper.style.flex = '1';
  tutCardArea.style.flex = '1';

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

// ══════════════════════════════════════════════
// 이벤트 리스너
// ══════════════════════════════════════════════
tutNextBtn.addEventListener('click', tutAdvance);
tutHintBtn.addEventListener('click', onTutHint);
document.getElementById('tutHomeBtn').addEventListener('click', () => {
  tutorialScreen.hidden = true; returnToHome();
});
document.getElementById('btnModeTutorial').addEventListener('click', startTutorial);

// ──────────────────────────────────────────────
