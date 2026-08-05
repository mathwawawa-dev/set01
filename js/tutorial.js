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
// seq_c (예시 ③): 모양에서 규칙 위반 — 타원·타원·물결 (2개만 같음)
const TUT_SEQ_C_CARDS = [
  { shape: 'oval',     color: 'green',  fill: 'outline' },
  { shape: 'oval',     color: 'purple', fill: 'striped' },
  { shape: 'squiggle', color: 'red',    fill: 'solid'   },
];
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
    text: 'SET는 카드 세 장을 골라서 만드는 게임이에요! 🌟<br><br>카드마다 <strong>세 가지 특징</strong>이 있어요.<br><strong>모양</strong> (타원 · 마름모 · 물결)<br><strong>색깔</strong> (초록 · 보라 · 빨강)<br><strong>채움</strong> (빈 것 · 줄무늬 · 가득참)<br><br>세 장 각각의 특징이<br><span class="txt-black">모두 </span><span class="txt-blue">같거나</span> <span class="txt-black">모두 </span><span class="txt-red">달라야</span> SET예요!',
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
        q: '모양, 색깔, 채움을 모두 정리해봐요!<br>세 장이 <strong>SET</strong>일까요?',
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
        q: '모양, 색깔, 채움을 모두 정리해봐요!<br>세 장이 <strong>SET</strong>일까요?',
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
        q: '모양, 색깔, 채움을 모두 정리해봐요!<br>그럼 이 세 장이 <strong>SET</strong>일까요?',
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
    givenCards: TUT_CARDPICK_GIVEN_A,
    choices: TUT_CARDPICK_CHOICES_RAW_A,
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
// game.js 에서 공유되는 DOM (tutorial 전용 재참조)
const tutModeScreen   = document.getElementById('modeScreen');

const TUT_INTRO_TEXT = '세 가지를 하나씩 확인해요!<br>모양 · 색깔 · 채움<br><span class="txt-black">모두 </span><span class="txt-blue">같거나</span> <span class="txt-black">모두 </span><span class="txt-red">달라야</span> SET예요!';

function startTutorial() {
  tutStepIdx = 0;
  tutModeScreen.hidden  = true;
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
      const cls    = answer === 'same' ? 'log-same' : answer === 'different' ? 'log-diff' : 'log-err';
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
        `<div class="tut-log-item ${it.cls}"><span class="log-label">${it.label}:</span> ${it.text}</div>`
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
