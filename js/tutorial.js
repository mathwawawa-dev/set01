// TUTORIAL MODULE ??Junior SET (27ì¢?ì¹´ë“œ)
// ?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•

// ?€?€ ë¶„ì„ 1 ì¹´ë“œ ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€
const TUT_ANA1_CARDS = [
  { shape: 'diamond', color: 'green',  fill: 'outline' },
  { shape: 'diamond', color: 'purple', fill: 'outline' },
  { shape: 'diamond', color: 'red',    fill: 'outline' },
];

// ?€?€ ë¬¸ì œ 1 ì¹´ë“œ ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€
const TUT_Q1_GIVEN = [
  { shape: 'squiggle', color: 'green', fill: 'solid' },
  { shape: 'squiggle', color: 'red',   fill: 'solid' },
];
const TUT_Q1_CHOICES = [
  { isCorrect: true,  card: { shape: 'squiggle', color: 'purple', fill: 'solid'   } },
  { isCorrect: false, card: { shape: 'squiggle', color: 'purple', fill: 'outline' } },
  { isCorrect: false, card: { shape: 'oval',     color: 'purple', fill: 'solid'   } },
];

// ?€?€ ë¶„ì„ 2 ì¹´ë“œ ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€
const TUT_ANA2_CARDS = [
  { shape: 'oval',     color: 'green',  fill: 'striped' },
  { shape: 'squiggle', color: 'purple', fill: 'striped' },
  { shape: 'diamond',  color: 'red',    fill: 'outline' },
];

// ?€?€ ë¬¸ì œ 2 ì¹´ë“œ ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€
const TUT_Q2_GIVEN = [
  { shape: 'oval',    color: 'red', fill: 'solid' },
  { shape: 'diamond', color: 'red', fill: 'solid' },
];
const TUT_Q2_CHOICES = [
  { isCorrect: true,  card: { shape: 'squiggle', color: 'red',    fill: 'solid'   } },
  { isCorrect: false, card: { shape: 'squiggle', color: 'red',    fill: 'outline' } },
  { isCorrect: false, card: { shape: 'squiggle', color: 'purple', fill: 'solid'   } },
];

// ?€?€ ë¶„ì„ 3 ì¹´ë“œ ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€
const TUT_ANA3_CARDS = [
  { shape: 'diamond',  color: 'green',  fill: 'striped' },
  { shape: 'oval',     color: 'purple', fill: 'solid'   },
  { shape: 'squiggle', color: 'red',    fill: 'outline' },
];

// ?€?€ ë¬¸ì œ 3 ì¹´ë“œ ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€
const TUT_Q3_GIVEN = [
  { shape: 'diamond', color: 'green',  fill: 'outline' },
  { shape: 'oval',    color: 'purple', fill: 'striped' },
];
const TUT_Q3_CHOICES = [
  { isCorrect: true,  card: { shape: 'squiggle', color: 'red',    fill: 'solid'   } },
  { isCorrect: false, card: { shape: 'squiggle', color: 'red',    fill: 'outline' } },
  { isCorrect: false, card: { shape: 'squiggle', color: 'green',  fill: 'solid'   } },
];

// ?€?€ ?ˆë ¨1 ê³ ì • 4??(?˜í•™??ê²€ì¦??„ë£Œ: ? ì¼ SET = ?¸ë±??0,1,2) ?€?€
const TUT_TRAIN1_BASE = [
  { shape: 'oval',     color: 'green',  fill: 'outline' }, // ?•ë‹µ A
  { shape: 'diamond',  color: 'purple', fill: 'striped' }, // ?•ë‹µ B
  { shape: 'squiggle', color: 'red',    fill: 'solid'   }, // ?•ë‹µ C
  { shape: 'oval',     color: 'purple', fill: 'solid'   }, // ë¯¸ë¼
];

// ?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•
// JUNIOR_TUT_STEPS ??11?¨ê³„
// ?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•
const JUNIOR_TUT_STEPS = [
  // ?€?€ STEP 1: intro ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€
  {
    id: 'intro', title: 'SET ê²Œì„??ë­ì˜ˆ??',
    text: 'SET??ì¹´ë“œ ???¥ì„ ê³¨ë¼??ë§Œë“œ??ê²Œì„?´ì—?? ?ŒŸ<br><br>ì¹´ë“œë§ˆë‹¤ <strong>??ê°€ì§€ ?¹ì§•</strong>???ˆì–´??<br><strong>ëª¨ì–‘</strong> (?€??Â· ë§ˆë¦„ëª?Â· ë¬¼ê²°)<br><strong>?‰ê¹”</strong> (ì´ˆë¡ Â· ë³´ë¼ Â· ë¹¨ê°•)<br><strong>ì±„ì?</strong> (ë¹?ê²?Â· ì¤„ë¬´??Â· ê°€?ì°¸)<br><br>????ê°ê°???¹ì§•??br><span class="txt-black">ëª¨ë‘ </span><span class="txt-blue">ê°™ê±°??/span> <span class="txt-black">ëª¨ë‘ </span><span class="txt-red">?¬ë¼??/span> SET?ˆìš”!',
    cards: null, interactive: false,
  },

  // ?€?€ STEP 2: analysis1 ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€
  {
    id: 'analysis1', type: 'sequence',
    title: 'ë¶„ì„ 1?¨ê³„',
    cards: TUT_ANA1_CARDS,
    questions: [
      {
        q: '<strong>ëª¨ì–‘</strong>??ë¹„êµ?©ì‹œ??',
        attrLabel: 'ëª¨ì–‘??, logLabel: 'ëª¨ì–‘',
        type: 'attr', correctAnswer: 'same',
        praise: 'êµ¿êµ¿?‘<br><br>ë§ˆë¦„ëª?Â· ë§ˆë¦„ëª?Â· ë§ˆë¦„ëª?br>??????ëª¨ë‘ ë§ˆë¦„ëª? <strong>ëª¨ë‘ ê°™ì•„??/strong>! ?”ï¸',
        wrong: '????ëª¨ë‘ ë§ˆë¦„ëª?ëª¨ì–‘?´ì—??<br>????ê°™ì? ?Šë‚˜?? ?˜Š',
      },
      {
        q: '<strong>?‰ê¹”</strong>??ë¹„êµ?©ì‹œ??',
        attrLabel: '?‰ê¹”??, logLabel: '?‰ê¹”',
        type: 'attr', correctAnswer: 'different',
        praise: 'êµ¿êµ¿?‘<br><br>ì´ˆë¡ Â· ë³´ë¼ Â· ë¹¨ê°•<br>?????‰ê¹”??<strong>ëª¨ë‘ ?¬ë¼??/strong>! ?”ï¸',
        wrong: 'ì´ˆë¡ Â· ë³´ë¼ Â· ë¹¨ê°•<br>????ê°œê? ???¤ë¥¸ ?‰ê¹”?´ì—?? ?˜Š',
      },
      {
        q: '<strong>ì±„ì?</strong>??ë¹„êµ?©ì‹œ??',
        attrLabel: 'ì±„ì???, logLabel: 'ì±„ì?',
        type: 'attr', correctAnswer: 'same',
        praise: 'êµ¿êµ¿?‘<br><br>ë¹?ê²?Â· ë¹?ê²?Â· ë¹?ê²?br>??ì±„ì? <strong>ëª¨ë‘ ê°™ì•„??/strong>! ?”ï¸',
        wrong: '????ëª¨ë‘ ë¹?ê²?outline)?´ì—??<br>????ê°™ì? ?Šë‚˜?? ?˜Š',
      },
      {
        q: '???¥ì˜ ì¹´ë“œ??<strong>SET</strong>?¼ê¹Œ??',
        type: 'set', correctAnswer: 'yes',
        praise: 'êµ¿êµ¿?‘<br><br>??ê°€ì§€ ?¹ì§•??ëª¨ë‘ ê·œì¹™??ë§ì•„??<br>?´ê²Œ ë°”ë¡œ <strong>SET</strong>?ˆìš”! ?ŒŸ',
        wrong: '?’¡ ?¤ì‹œ ?ê°?´ë´??<br>ëª¨ì–‘Â·ì±„ì??€ ??ê°™ê³ , ?‰ê¹”ë§????¬ë¼??<br>??ëª¨ë‘ ê°™ê±°??ëª¨ë‘ ?¤ë¥´?ˆê¹Œ SETê°€ ?¼ìš”! ?‰',
      },
    ],
  },

  // ?€?€ STEP 3: quiz1 ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€
  {
    id: 'quiz1', type: 'cardpick',
    title: 'ë¬¸ì œ 1 - SETë¥??„ì„±?´ë´??',
    text: 'SETê°€ ?˜ê¸° ?„í•´ ?„ìš”??ì¹´ë“œ??ë¬´ì—‡?¼ê¹Œ??',
    givenCards: TUT_Q1_GIVEN,
    choices: TUT_Q1_CHOICES,
    explanation: '?‰ ?•í™•?´ìš”!<br>ëª¨ì–‘ ê°™ìŒ Â· ?‰ê¹” ?¬ë¼??ë³´ë¼ Â· ì±„ì? ê°™ìŒ<br>??ë¬¼ê²° ë³´ë¼ ê°€?ì°¸ ì¹´ë“œ! ??,
  },

  // ?€?€ STEP 4: analysis2 ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€
  {
    id: 'analysis2', type: 'sequence',
    title: 'ë¶„ì„ 2?¨ê³„',
    cards: TUT_ANA2_CARDS,
    questions: [
      {
        q: '<strong>ëª¨ì–‘</strong>??ë¹„êµ?©ì‹œ??',
        attrLabel: 'ëª¨ì–‘??, logLabel: 'ëª¨ì–‘',
        type: 'attr', correctAnswer: 'different',
        praise: 'êµ¿êµ¿?‘<br><br>?€??Â· ë¬¼ê²° Â· ë§ˆë¦„ëª?br>????ëª¨ì–‘??<strong>ëª¨ë‘ ?¬ë¼??/strong>! ?”ï¸',
        wrong: '?€??Â· ë¬¼ê²° Â· ë§ˆë¦„ëª?br>????ê°œê? ?œë¡œ ?¬ë¼?? ?˜Š',
      },
      {
        q: '<strong>?‰ê¹”</strong>??ë¹„êµ?©ì‹œ??',
        attrLabel: '?‰ê¹”??, logLabel: '?‰ê¹”',
        type: 'attr', correctAnswer: 'different',
        praise: 'êµ¿êµ¿?‘<br><br>ì´ˆë¡ Â· ë³´ë¼ Â· ë¹¨ê°•<br>???‰ê¹”??<strong>ëª¨ë‘ ?¬ë¼??/strong>! ?”ï¸',
        wrong: 'ì´ˆë¡ Â· ë³´ë¼ Â· ë¹¨ê°•<br>????ê°œê? ???¤ë¥¸ ?‰ê¹”?´ì—?? ?˜Š',
      },
      {
        q: '<strong>ì±„ì?</strong>??ë¹„êµ?©ì‹œ??',
        attrLabel: 'ì±„ì???, logLabel: 'ì±„ì?',
        type: 'attr3', correctAnswer: 'neither',
        praise: 'êµ¿êµ¿?‘<br><br>ì¤„ë¬´??Â· ì¤„ë¬´??Â· ë¹?ê²?br>??ì¤„ë¬´?¬ê? ??ê°œì˜ˆ??<br>? ï¸ <strong>2ê°œë§Œ ê°™ì•„??/strong> ??ê·œì¹™ ?„ë°˜?´ì—??',
        wrong_same: 'ì¤„ë¬´??Â· ì¤„ë¬´??Â· ë¹?ê²?br>??ë§ˆì?ë§‰ì´ ë¹?ê²ƒì´?ìš”!<br>ëª¨ë‘ ê°™ì????Šì•„?? ?˜Š',
        wrong_diff: 'ì¤„ë¬´??Â· ì¤„ë¬´??Â· ë¹?ê²?br>??ì¤„ë¬´?¬ê? ??ê°œë‚˜ ?ˆì–´??<br>ëª¨ë‘ ?¤ë¥¸ ê²ƒë„ ?„ë‹ˆ?ìš”. ?˜Š',
      },
      {
        q: '???¥ì˜ ì¹´ë“œ??<strong>SET</strong>?¼ê¹Œ??',
        type: 'set', correctAnswer: 'no', logLabel: null,
        praise: 'êµ¿êµ¿?‘<br><br>ì±„ì??ì„œ ê·œì¹™???´ê²¼?¼ë‹ˆê¹?br>?????¥ì? <strong>SETê°€ ?„ë‹ˆ?ìš”</strong>! ?™Œ',
        wrong: '?’¡ ?¤ì‹œ ?ê°?´ë´??<br>ì±„ì??ì„œ ?¤íŒ¨?ˆì–´??(ì¤„ë¬´?¬ê? ??ê°?.<br>??ê°€ì§€?¼ë„ ê·œì¹™???´ê¸°ë©?br>SETê°€ ???¼ìš”!',
      },
    ],
  },

  // ?€?€ STEP 5: quiz2 ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€
  {
    id: 'quiz2', type: 'cardpick',
    title: 'ë¬¸ì œ 2 - SETë¥??„ì„±?´ë´??',
    text: 'SETê°€ ?˜ê¸° ?„í•´ ?„ìš”??ì¹´ë“œ??ë¬´ì—‡?¼ê¹Œ??',
    givenCards: TUT_Q2_GIVEN,
    choices: TUT_Q2_CHOICES,
    explanation: '?‰ ?•í™•?´ìš”!<br>ëª¨ì–‘ ?¬ë¼??ë¬¼ê²° Â· ?‰ê¹” ê°™ìŒ ë¹¨ê°• Â· ì±„ì? ê°™ìŒ<br>??ë¬¼ê²° ë¹¨ê°• ê°€?ì°¸ ì¹´ë“œ! ??,
  },

  // ?€?€ STEP 6: analysis3 ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€
  {
    id: 'analysis3', type: 'sequence',
    title: 'ë¶„ì„ 3?¨ê³„',
    cards: TUT_ANA3_CARDS,
    questions: [
      {
        q: '<strong>ëª¨ì–‘</strong>??ë¹„êµ?©ì‹œ??',
        attrLabel: 'ëª¨ì–‘??, logLabel: 'ëª¨ì–‘',
        type: 'attr', correctAnswer: 'different',
        praise: 'êµ¿êµ¿?‘<br><br>ë§ˆë¦„ëª?Â· ?€??Â· ë¬¼ê²°<br>????ëª¨ì–‘??<strong>ëª¨ë‘ ?¬ë¼??/strong>! ?”ï¸',
        wrong: 'ë§ˆë¦„ëª?Â· ?€??Â· ë¬¼ê²°<br>????ê°œê? ?œë¡œ ?¬ë¼?? ?˜Š',
      },
      {
        q: '<strong>?‰ê¹”</strong>??ë¹„êµ?©ì‹œ??',
        attrLabel: '?‰ê¹”??, logLabel: '?‰ê¹”',
        type: 'attr', correctAnswer: 'different',
        praise: 'êµ¿êµ¿?‘<br><br>ì´ˆë¡ Â· ë³´ë¼ Â· ë¹¨ê°•<br>???‰ê¹”??<strong>ëª¨ë‘ ?¬ë¼??/strong>! ?”ï¸',
        wrong: 'ì´ˆë¡ Â· ë³´ë¼ Â· ë¹¨ê°•<br>????ê°œê? ???¤ë¥¸ ?‰ê¹”?´ì—?? ?˜Š',
      },
      {
        q: '<strong>ì±„ì?</strong>??ë¹„êµ?©ì‹œ??',
        attrLabel: 'ì±„ì???, logLabel: 'ì±„ì?',
        type: 'attr', correctAnswer: 'different',
        praise: 'êµ¿êµ¿?‘<br><br>ì¤„ë¬´??Â· ê°€??ì°?Â· ë¹?ê²?br>??ì±„ì???<strong>ëª¨ë‘ ?¬ë¼??/strong>! ?”ï¸',
        wrong: 'ì¤„ë¬´??Â· ê°€??ì°?Â· ë¹?ê²?br>????ê°œê? ???¤ë¥¸ ì±„ì??´ì—?? ?˜Š',
      },
      {
        q: '???¥ì˜ ì¹´ë“œ??<strong>SET</strong>?¼ê¹Œ??',
        type: 'set', correctAnswer: 'yes',
        praise: 'êµ¿êµ¿?‘<br><br>??ê°€ì§€ ?¹ì§•??ëª¨ë‘ ???¬ë¼??br>?´ê²Œ ë°”ë¡œ <strong>SET</strong>?ˆìš”! ?ŒŸ',
        wrong: '?’¡ ?¤ì‹œ ?ê°?´ë´??<br>ëª¨ì–‘Â·?‰ê¹”Â·ì±„ì???ëª¨ë‘ ???¬ë¼??<br>???´ëŸ´ ?Œë„ SETê°€ ?¼ìš”! ?‰',
      },
    ],
  },

  // ?€?€ STEP 7: quiz3 ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€
  {
    id: 'quiz3', type: 'cardpick',
    title: 'ë¬¸ì œ 3 - SETë¥??„ì„±?´ë´??',
    text: 'SETê°€ ?˜ê¸° ?„í•´ ?„ìš”??ì¹´ë“œ??ë¬´ì—‡?¼ê¹Œ??',
    givenCards: TUT_Q3_GIVEN,
    choices: TUT_Q3_CHOICES,
    explanation: '?‰ ?•í™•?´ìš”!<br>ëª¨ì–‘Â·?‰ê¹”Â·ì±„ì? ëª¨ë‘ ?¬ë¼??br>??ë¬¼ê²° ë¹¨ê°• ê°€?ì°¸ ì¹´ë“œ! ??,
  },

  // ?€?€ STEP 8: training1 ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€
  {
    id: 'training1', title: '?ˆë ¨ 1 - 4?¥ì—??ì°¾ì•„ë´ìš”!',
    text: '4??ì¤‘ì—??<strong>SETê°€ ?˜ëŠ” ????/strong>??ê³¨ë¼ë´ìš”!<br>?ŒíŠ¸ ë²„íŠ¼???ŒëŸ¬ ?„ì???ë°›ì„ ???ˆì–´??',
    cards: null, interactive: true, hasHint: true, challengeN: 4,
  },

  // ?€?€ STEP 9: training2 ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€
  {
    id: 'training2', title: '?ˆë ¨ 2 - 5?¥ì—??ì°¾ì•„ë´ìš”!',
    text: '5??ì¤‘ì—??<strong>SETê°€ ?˜ëŠ” ????/strong>??ê³¨ë¼ë´ìš”!<br>?ŒíŠ¸ ë²„íŠ¼???ŒëŸ¬ ?„ì???ë°›ì„ ???ˆì–´??',
    cards: null, interactive: true, hasHint: true, challengeN: 5,
  },

  // ?€?€ STEP 10: training3 ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€
  {
    id: 'training3', title: '?ˆë ¨ 3 - 6?¥ì—??ì°¾ì•„ë´ìš”!',
    text: '6??ì¤‘ì—??<strong>SETê°€ ?˜ëŠ” ????/strong>??ê³¨ë¼ë´ìš”!<br>?ŒíŠ¸ ë²„íŠ¼???ŒëŸ¬ ?„ì???ë°›ì„ ???ˆì–´??',
    cards: null, interactive: true, hasHint: true, challengeN: 6,
  },

  // ?€?€ STEP 11: final ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€
  {
    id: 'final', title: '',
    text: '<div style="display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap;"><div><span class="tut-sub-label" style="margin: 0; white-space: nowrap;">?¤ì „?°ìŠµ</span></div><div>9??ì¤‘ì—??<strong>SETë¥?ì°¾ì•„ë³´ì„¸??</strong></div></div>',
    cards: null, interactive: true, hasHint: false, challengeN: 9,
  },
];

// ?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•
// Tutorial ?íƒœ
// ?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•
let tutStepIdx  = 0;
let tutSubQIdx  = 0;
let tutSelected = [];
let tutCards    = [];
let tutAnswer   = [];
let tutHintCard = -1;
let tutDone     = false;
let tutSubQNext = false;
let tutAnswerItems = [];
let tutFinalSetCount = 0; // final ?¤í…?ì„œ SET ë°œê²¬ ?Ÿìˆ˜ (0??: ?¬ë„?? 2: ?„ë£Œ)
let tutIntroPhase = 1; // intro(1/11) ?¤í… ?œì°¨ ì§„í–‰ ?¨ê³„ (1, 2, 3)

// ?€?€ DOM ì°¸ì¡° ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€
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

const TUT_INTRO_TEXT = 'ëª¨ì–‘ Â· ?‰ê¹” Â· ì±„ì?<br>??ê°€ì§€ ?¹ì§•???˜ë‚˜???•ì¸?´ìš”!<br><br>???¥ì˜ ì¹´ë“œ <strong>ê°ê°???¹ì§•</strong>??br><span class="txt-blue">ëª¨ë‘ ê°™ê±°??/span>, <span class="txt-red">ëª¨ë‘ ?¤ë¥´ë©?/span> SET ?„ì„±!';

// ?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•
// ì§„ì…/ì¢…ë£Œ
// ?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•
function startTutorial() {
  tutStepIdx = 0;
  tutModeScreen.hidden  = true;
  tutorialScreen.hidden = false;
  renderTutStep();
}

// ?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•
// ?¤í… ?Œë”ë§?
// ?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•
function renderTutStep() {
  const step  = JUNIOR_TUT_STEPS[tutStepIdx];
  const total = JUNIOR_TUT_STEPS.length;

  document.getElementById('tutQuizBtns')?.remove();
  tutProgressFill.style.width = `${(tutStepIdx / total) * 100}%`;
  tutStepLabel.textContent    = `${tutStepIdx + 1} / ${total}`;
  tutTitleEl.textContent      = step.title;
  tutTitleEl.style.display    = step.title ? '' : 'none';
  tutFeedbackEl.textContent   = '';
  tutFeedbackEl.className     = 'tut-feedback';
  tutSelected = [];
  tutDone     = false;

  tutBubbleEl.onclick = null;
  tutBubbleEl.style.cursor = 'default';

  tutHintBtn.hidden      = !step.interactive || !step.hasHint;
  tutHintBtn.disabled    = false;
  tutHintBtn.textContent = '?’¡ ?ŒíŠ¸';

  // ?´ì „ ë²„íŠ¼: ì²??¤í…?€ ?¨ê¸°ê³??˜ë¨¸ì§€???œì‹œ
  document.getElementById('tutBackBtn').hidden = (tutStepIdx === 0);
  document.getElementById('tutSkipBtn').hidden = false;

  // ?„ë£Œ ?”ë©´?ì„œ ?Œì•„??ê²½ìš° ì¹´ë“œ ?˜í¼ ë³µì›
  const wrapper = tutCardArea.parentElement;
  if (wrapper) wrapper.style.display = '';

  const tutInner = tutorialScreen.querySelector('.tut-inner');
  document.getElementById('tutRpgHint').hidden = true;

  tutFinalSetCount = 0; // final ?¤í… SET ì¹´ìš´??ë¦¬ì…‹
  if (step.type === 'sequence') {
    tutInner.classList.remove('tut-layout-quiz');
    tutSubQIdx         = 0;
    tutAnswerItems     = [];
    tutCards           = step.cards;
    tutBubbleEl.innerHTML = '';
    tutContextBubble.innerHTML = TUT_INTRO_TEXT;
    tutContextBubble.hidden    = true;
    tutAnswerLog.hidden        = true;
    tutAnswerLog.innerHTML     = '<div class="tut-log-title">?“‹ ?ë‹¨ ê²°ê³¼</div>';
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
    tutContextBubble.hidden = true;
    tutAnswerLog.hidden     = true;
    tutCardArea.innerHTML   = '';
    tutIntroPhase           = 1;
    renderIntroPhase();
  } else {
    // training1 / training2 / training3 / final
    tutInner.classList.add('tut-layout-quiz');
    tutBubbleEl.innerHTML      = step.text;
    tutContextBubble.hidden    = true;
    tutAnswerLog.hidden        = true;
    setupTutChallenge(step);
    renderTutCards(step.interactive);
    const isLast = tutStepIdx === total - 1;
    tutNextBtn.hidden      = step.interactive;
    tutNextBtn.textContent = isLast ? '?„ë£Œ! ?“' : '?¤ìŒ ??;
  }
}

// ?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•
// 1/11 ?¨ê³„ (intro) ?œì°¨ ?¼ì¹˜ê¸?
// ?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•
function renderIntroPhase() {
  let html = `<div>SET??ì¡°ê±´??ë§ëŠ” ì¹´ë“œ ???¥ì„ ì°¾ì•„?´ëŠ” ê²Œì„?´ì—??</div>`;

  if (tutIntroPhase >= 2) {
    html += `
      <div class="${tutIntroPhase === 2 ? 'stamp-anim' : ''}" style="margin-top: 14px;">
        <div>ì¹´ë“œë§ˆë‹¤ <strong>??ê°€ì§€ ?¹ì§•</strong>???ˆì–´??</div>
      </div>`;
  }

  if (tutIntroPhase >= 3) {
    html += `
      <div class="${tutIntroPhase === 3 ? 'stamp-anim' : ''}" style="margin-top: 6px;">
        <div><strong>ëª¨ì–‘</strong> (?€??Â· ë§ˆë¦„ëª?Â· ë¬¼ê²°)</div>
      </div>`;
  }

  if (tutIntroPhase >= 4) {
    html += `
      <div class="${tutIntroPhase === 4 ? 'stamp-anim' : ''}" style="margin-top: 2px;">
        <div><strong>?‰ê¹”</strong> (ì´ˆë¡ Â· ë³´ë¼ Â· ë¹¨ê°•)</div>
      </div>`;
  }

  if (tutIntroPhase >= 5) {
    html += `
      <div class="${tutIntroPhase === 5 ? 'stamp-anim' : ''}" style="margin-top: 2px;">
        <div><strong>ì±„ì?</strong> (ë¹?ê²?Â· ì¤„ë¬´??Â· ê°€?ì°¸)</div>
      </div>`;
  }

  if (tutIntroPhase >= 6) {
    html += `
      <div class="${tutIntroPhase === 6 ? 'stamp-anim' : ''}" style="margin-top: 14px;">
        <div>???¥ì˜ ì¹´ë“œ <strong>ê°ê°???¹ì§•</strong>??/div>
        <div><span class="txt-blue">ëª¨ë‘ ê°™ê±°??/span>, <span class="txt-red">ëª¨ë‘ ?¤ë¥´ë©?/span> SET ?„ì„±!</div>
      </div>`;
  }


  if (tutIntroPhase < 6) {
    html += `
      <button class="tut-rpg-arrow" id="btnIntroExpand" title="?¤ìŒ">??/button>`;
    document.getElementById('tutRpgHint').hidden = false;
    tutNextBtn.hidden = true;
    tutBubbleEl.style.cursor = 'pointer';
    tutBubbleEl.onclick = () => {
      if (tutIntroPhase < 6) {
        tutIntroPhase++;
        renderIntroPhase();
      }
    };
  } else {
    document.getElementById('tutRpgHint').hidden = true;
    tutBubbleEl.style.cursor = 'default';
    tutBubbleEl.onclick = null;
    showTutNextBtn('?¤ìŒ ??);
  }

  tutBubbleEl.innerHTML = html;


}

// ?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•
// challenge ?¸íŒ… ??ë²”ìš© ?¨ìˆ˜
// ?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•
function setupTutChallenge(step) {
  const n = step.challengeN || 6;

  if (n === 4) {
    // ê³ ì • 4?????˜í•™??ê²€ì¦??„ë£Œ
    const indexed = TUT_TRAIN1_BASE.map((card, i) => ({ card, ans: i < 3 }));
    shuffle(indexed);
    tutCards    = indexed.map(x => x.card);
    tutAnswer   = indexed.reduce((acc, x, i) => { if (x.ans) acc.push(i); return acc; }, []);
    tutHintCard = tutAnswer[0];
    return;
  }

  // n=5, 6, 9: ?œë¤ ?ìƒ‰
  const wantExact = (n !== 9); // 9?¥ì? 1ê°??´ìƒ?´ë©´ OK
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
  // ?´ë°±: 1??? íš¨ SET ì°¾ê¸°
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

// ?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•
// ?¤ìŒ ë²„íŠ¼ fade-in ?¬í¼
// ?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•
function showTutNextBtn(label) {
  tutNextBtn.textContent = label || '?¤ìŒ ??;
  tutNextBtn.classList.remove('tut-next-fadein');
  void tutNextBtn.offsetWidth; // reflow to restart animation
  tutNextBtn.hidden = false;
  tutNextBtn.classList.add('tut-next-fadein');
}

// ?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•
// ëª¨ë“  SET ì°¾ê¸° ?¬í¼
// ?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•
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

// ?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•
// ì¹´ë“œ ?Œë”ë§?
// ?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•
function renderTutCards(interactive) {
  tutCardArea.style.cssText = ''; // ?„ë£Œ ?”ë©´ ?±ì—???¨ì? ?¸ë¼???¤í???ì´ˆê¸°??
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

// ?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•
// ì¹´ë“œ ?´ë¦­ (?ˆë ¨/?¤ì „)
// ?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•
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
    const step = JUNIOR_TUT_STEPS[tutStepIdx];
    const isFinal = step.id === 'final';

    tutSelected.forEach(idx => {
      const el = document.getElementById(`tut-card-${idx}`);
      if (el) { el.classList.remove('selected'); el.classList.add('tut-correct'); }
    });

    if (isFinal) {
      tutFinalSetCount++;
      if (tutFinalSetCount === 1) {
        // ì²?ë²ˆì§¸ SET: ì¹´ë“œ êµì²´ ???¬ë„??ë©”ì‹œì§€
        setTimeout(() => {
          // ì°¾ì? 3??êµì²´ (game.js replaceCards ë°©ì‹ ?¸ë¼??
          const idxs = [...tutSelected].sort((a, b) => a - b);
          const onBoard = tutCards.filter(Boolean);
          const all = buildFullDeck();
          const pool = shuffle(all.filter(c =>
            !onBoard.some(b => b.shape === c.shape && b.color === c.color && b.fill === c.fill)
          ));
          // ? ê·œ 3?? ?ì²´ SET ?„ë‹ˆê³? ?„ì²´ 9???ˆì— SET ì¡´ì¬?˜ëŠ” ì¡°í•© ?ìƒ‰
          let placed = false;
          for (let t = 0; t < 500 && !placed; t++) {
            const newCards = shuffle([...pool]).slice(0, 3);
            if (isSet(newCards[0], newCards[1], newCards[2])) continue;
            const tempBoard = [...tutCards];
            idxs.forEach((bi, ni) => { tempBoard[bi] = newCards[ni]; });
            if (hasAnySet(tempBoard.filter(Boolean))) {
              idxs.forEach((bi, ni) => { tutCards[bi] = newCards[ni]; });
              placed = true;
            }
          }
          if (!placed) {
            const newCards = pool.slice(0, 3);
            idxs.forEach((bi, ni) => { tutCards[bi] = newCards[ni]; });
          }
          tutSelected = [];
          tutDone = false;
          renderTutCards(true);
          tutFeedbackEl.textContent = '?‰ ?Œë??´ìš”! ??ë²???ì°¾ì•„ë³´ì„¸??';
          tutFeedbackEl.className = 'tut-feedback tut-success';
          tutBubbleEl.innerHTML = 'SETê°€ ?˜ëŠ” ???¥ì˜ ì¹´ë“œë¥?<strong>??ë²???/strong> ì°¾ì•„ë³´ì„¸??';
          tutNextBtn.hidden = true;
          tutHintBtn.hidden = true;
        }, 700);
        return;
      }
      // ??ë²ˆì§¸ SET: ?„ë£Œ ë²„íŠ¼ ?œì‹œ
      tutDone = true;
      const praises = [
        '?‰ ?„ë²½?´ìš”! ???¥ì´ SETë¥??´ë£¨ê³??ˆì–´??',
        '?ŒŸ ?Œë??´ìš”! ?•í™•?˜ê²Œ ì°¾ì•˜?´ìš”!',
        'êµ¿êµ¿?‘',
      ];
      tutFeedbackEl.textContent = praises[Math.floor(Math.random() * praises.length)];
      tutFeedbackEl.className   = 'tut-feedback tut-success';
      tutHintBtn.hidden = true;
      showTutNextBtn('?„ë£Œ! ?“');
    } else {
      tutDone = true;
      const praises = [
        '?‰ ?„ë²½?´ìš”! ???¥ì´ SETë¥??´ë£¨ê³??ˆì–´??',
        '?ŒŸ ?Œë??´ìš”! ?•í™•?˜ê²Œ ì°¾ì•˜?´ìš”!',
        'êµ¿êµ¿?‘',
      ];
      tutFeedbackEl.textContent = praises[Math.floor(Math.random() * praises.length)];
      tutFeedbackEl.className   = 'tut-feedback tut-success';
      tutHintBtn.hidden = true;
      showTutNextBtn(tutStepIdx >= JUNIOR_TUT_STEPS.length - 1 ? '?„ë£Œ! ?“' : '?¤ìŒ ??);
    }
  } else {
    tutSelected.forEach(idx => {
      const el = document.getElementById(`tut-card-${idx}`);
      if (el) el.classList.add('tut-wrong');
    });
    tutFeedbackEl.textContent = '??SETê°€ ?„ë‹ˆ?ìš”. ?¤ì‹œ ?´í´ë³´ì„¸??';
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

// ?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•
// ?ŒíŠ¸
// ?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•
function onTutHint() {
  if (tutHintCard < 0) return;
  const el = document.getElementById(`tut-card-${tutHintCard}`);
  if (el) el.classList.add('tut-hint-glow');
  tutHintBtn.disabled    = true;
  tutHintBtn.textContent = '?’¡ ?ŒíŠ¸ ?¬ìš©??;
}

// ?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•
// ?œë¸Œ ì§ˆë¬¸ ?Œë”ë§?(sequence)
// ?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•
function renderTutSubQ() {
  const step  = JUNIOR_TUT_STEPS[tutStepIdx];
  const q     = step.questions[tutSubQIdx];
  const qNum  = tutSubQIdx + 1;
  const qTot  = step.questions.length;

  document.getElementById('tutQuizBtns')?.remove();
  const KO_ORD = ['ì²?,'??,'??,'??,'?¤ì„¯','?¬ì„¯','?¼ê³±','?¬ëŸ','?„í™‰','??];
  const labelText = (qNum === qTot) ? 'ë§ˆì?ë§?ì§ˆë¬¸' : `${KO_ORD[qNum-1] ?? qNum} ë²ˆì§¸ ì§ˆë¬¸`;
  tutBubbleEl.innerHTML     = `<div style="display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap;"><div class="stamp-anim"><span class="tut-sub-label" style="margin: 0; white-space: nowrap;">${labelText}</span></div><div class="stamp-anim" style="animation-delay: 0.15s;">${q.q}</div></div>`;
  tutFeedbackEl.textContent = '';
  tutFeedbackEl.className   = 'tut-feedback';

  if (q.type === 'set') {
    tutFeedbackEl.insertAdjacentHTML('beforebegin', `
      <div class="tut-quiz-btns choices-hidden" id="tutQuizBtns">
        <button class="tut-quiz-yes" id="tutSeqYes">???¥ì˜ ì¹´ë“œ??br>SET?…ë‹ˆ??</button>
        <button class="tut-quiz-no"  id="tutSeqNo">???¥ì˜ ì¹´ë“œ??br>SETê°€ ?„ë‹™?ˆë‹¤.</button>
      </div>`);
    document.getElementById('tutSeqYes').addEventListener('click', () => onTutSeqAnswer('yes'));
    document.getElementById('tutSeqNo' ).addEventListener('click', () => onTutSeqAnswer('no'));
  } else {
    const attrSubject = q.attrLabel || '';
    const prefix = attrSubject ? `${attrSubject}<br>` : '';
    tutFeedbackEl.insertAdjacentHTML('beforebegin', `
      <div class="tut-quiz-btns tut-quiz-btns-3 choices-hidden" id="tutQuizBtns">
        <button class="tut-quiz-same"    id="tutSeqSame">${prefix}<span class="txt-blue">ëª¨ë‘ ê°™ì•„??/span></button>
        <button class="tut-quiz-diff"    id="tutSeqDiff">${prefix}<span class="txt-red">ëª¨ë‘ ?¬ë¼??/span></button>
        <button class="tut-quiz-neither" id="tutSeqNeither">${prefix}2ê°œë§Œ ê°™ì•„??/button>
      </div>`);
    document.getElementById('tutSeqSame'   ).addEventListener('click', () => onTutSeqAnswer('same'));
    document.getElementById('tutSeqDiff'   ).addEventListener('click', () => onTutSeqAnswer('different'));
    document.getElementById('tutSeqNeither').addEventListener('click', () => onTutSeqAnswer('neither'));
  }

  // stamp ? ë‹ˆë©”ì´????? ì? fade-in
  setTimeout(() => {
    const btns = document.getElementById('tutQuizBtns');
    if (btns) { btns.classList.remove('choices-hidden'); btns.classList.add('choices-fadein'); }
  }, 450);

  tutNextBtn.hidden = true;
}

// ?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•
// ?œë¸Œ ì§ˆë¬¸ ?µë? ì²˜ë¦¬
// ?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•
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
      const ansText = answer === 'same'     ? 'ëª¨ë‘ ê°™ì•„??
                    : answer === 'different' ? 'ëª¨ë‘ ?¬ë¼??
                    : '2ê°œë§Œ ê°™ì•„??;
      const cls = answer === 'same' ? 'log-same' : answer === 'different' ? 'log-diff' : 'log-err';
      tutAnswerItems.push({ label: q.logLabel, text: ansText, cls });
      renderAnswerLog();
    }

    const isLastQ    = tutSubQIdx >= step.questions.length - 1;
    const isLastStep = tutStepIdx >= JUNIOR_TUT_STEPS.length - 1;
    tutSubQNext = !isLastQ;
    showTutNextBtn(isLastQ ? (isLastStep ? '?„ë£Œ! ?“' : '?¤ìŒ ??) : '?¤ìŒ ì§ˆë¬¸ ??);
  } else {
    tutFeedbackEl.innerHTML = `??br><br>${wrongMsg}`;
    tutFeedbackEl.className = 'tut-feedback tut-fail';
    ['tutSeqYes','tutSeqNo','tutSeqSame','tutSeqDiff','tutSeqNeither'].forEach(id => {
      document.getElementById(id)?.removeAttribute('disabled');
    });
  }
}

// ?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•
// ?ë‹¨ ê²°ê³¼ ë¡œê·¸
// ?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•
function renderAnswerLog() {
  tutAnswerLog.innerHTML = '<div class="tut-log-title">?ë‹¨ ê²°ê³¼</div>'
    + tutAnswerItems.map(it =>
        `<div class="tut-log-item ${it.cls}"><span class="log-label">${it.label}:</span> ${it.text}</div>`
      ).join('');
  tutAnswerLog.hidden = false;
}

// ?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•
// ì¹´ë“œ???´ì¦ˆ ?Œë”ë§?
// ?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•
function renderCardPickStep() {
  tutCardArea.innerHTML = '';
  tutCardArea.className = 'tut-card-area tut-cardpick-area';
  const step       = JUNIOR_TUT_STEPS[tutStepIdx];
  const rawChoices = step.choices;
  const choices    = shuffle([...rawChoices]);
  const labels     = ['A', 'B', 'C'];
  const givenCards = step.givenCards;
  const givenHTML  = step.givenCards
    .map(c => `<div class="card tut-pick-given-card"><img src="${imgPath(c)}" alt="" draggable="false"></div>`)
    .join('');
  const choicesHTML = choices.map((ch, i) => `
    <button class="tut-pick-choice" id="tut-pick-${i}">
      <span class="tut-pick-label">${labels[i]}</span>
      <div class="card tut-pick-card"><img src="${imgPath(ch.card)}" alt="" draggable="false"></div>
    </button>`).join('');

  tutCardArea.innerHTML = `
    <div class="tut-pick-given">
      ${givenHTML}
      <div class="tut-pick-unknown">?</div>
    </div>
    <div class="tut-pick-choices choices-hidden" id="tutPickChoices">${choicesHTML}</div>`;

  // ë²„ë¸” stamp ? ë‹ˆë©”ì´????? ì? fade-in
  const STAMP_DELAY = 450; // stamp 0.4s + ?¬ìœ 
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
    tutFeedbackEl.innerHTML = explanation || 'êµ¿êµ¿?‘ ê·œì¹™??ë§ì•„??<strong>SET</strong>?ˆìš”!';
    tutFeedbackEl.className = 'tut-feedback tut-success';
    showTutNextBtn(tutStepIdx >= JUNIOR_TUT_STEPS.length - 1 ? '?„ë£Œ! ?“' : '?¤ìŒ ??);
  } else {
    document.getElementById(`tut-pick-${clickedIdx}`)?.classList.add('tut-pick-wrong');
    tutFeedbackEl.innerHTML = '???¤ì‹œ ?•ì¸?´ë³´?¸ìš”! ê°??ì„±???˜ë‚˜??ë¹„êµ?´ë³´?¸ìš”.';
    tutFeedbackEl.className = 'tut-feedback tut-fail';
    setTimeout(() => {
      document.getElementById(`tut-pick-${clickedIdx}`)?.classList.remove('tut-pick-wrong');
      choices.forEach((_, i) => document.getElementById(`tut-pick-${i}`)?.removeAttribute('disabled'));
      tutFeedbackEl.textContent = '';
      tutFeedbackEl.className   = 'tut-feedback';
    }, 2000);
  }
}

// ?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•
// ì§„í–‰ ë²„íŠ¼
// ?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•
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

// ?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•
// ?„ë£Œ ?”ë©´
// ?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•
function showTutComplete() {
  tutProgressFill.style.width = '100%';
  tutStepLabel.textContent    = '?„ë£Œ! ?“';
  tutTitleEl.textContent      = '?… ?œí† ë¦¬ì–¼ ?„ë£Œ!';
  document.getElementById('tutQuizBtns')?.remove();

  const tutInner = tutorialScreen.querySelector('.tut-inner');
  tutInner.classList.add('tut-layout-quiz');

  // ë²„ë¸”: ?ìŠ¤?¸ë§Œ
  tutBubbleEl.innerHTML = 'Junior SET ê·œì¹™??ëª¨ë‘ ?µí˜”?´ìš”!<br>?´ì œ ëª¨ë“œ ? íƒ ?”ë©´?¼ë¡œ ?Œì•„ê°€ ?„ì „?´ë³´?¸ìš”.';

  // ë²„íŠ¼: ë²„ë¸” ë°?ì¹´ë“œ ?ì—­?? ë²„ë¸”ê³??™ì¼????100%)?¼ë¡œ ë°°ì¹˜
  const wrapper = tutCardArea.parentElement;
  if (wrapper) { wrapper.style.display = ''; wrapper.style.flex = ''; }
  tutCardArea.style.cssText = ''; // ?¸ë¼???¤í???ì´ˆê¸°??
  tutCardArea.className = 'tut-card-area tut-card-area--complete';
  tutCardArea.innerHTML = `
    <button class="tut-home-bare-btn" id="tutGoHomeComplete">
      <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
      <span>?€ë¬¸ìœ¼ë¡?/span>
    </button>`;

  tutContextBubble.hidden   = true;
  tutAnswerLog.hidden       = true;
  tutFeedbackEl.textContent = '';
  tutHintBtn.hidden  = true;
  tutNextBtn.hidden  = true;
  document.getElementById('tutSkipBtn').hidden = true;
  document.getElementById('tutGoHomeComplete').addEventListener('click', () => {
    tutorialScreen.hidden = true; returnToHome();
  });
}

// ?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•
// ?´ë²¤??ë¦¬ìŠ¤??
// ?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•
tutNextBtn.addEventListener('click', () => {
  if (typeof ftActive !== 'undefined' && ftActive) ftAdvance();
  else tutAdvance();
});
tutHintBtn.addEventListener('click', () => {
  if (typeof ftActive !== 'undefined' && ftActive) ftOnHint();
  else onTutHint();
});
document.getElementById('tutHomeBtn').addEventListener('click', () => {
  if (typeof ftActive !== 'undefined') ftActive = false;
  tutorialScreen.hidden = true; returnToHome();
});
document.getElementById('tutBackBtn').addEventListener('click', () => {
  const wrapper = tutCardArea.parentElement;
  if (wrapper) { wrapper.style.display = ''; wrapper.style.flex = ''; }
  tutCardArea.style.flex = '';
  if (typeof ftActive !== 'undefined' && ftActive) {
    if (ftStepIdx <= 0) return;
    ftStepIdx--; ftRenderStep();
  } else {
    if (tutStepIdx <= 0) return;
    tutStepIdx--; renderTutStep();
  }
});
document.getElementById('tutSkipBtn').addEventListener('click', () => {
  document.getElementById('tutQuizBtns')?.remove();
  const wrapper = tutCardArea.parentElement;
  if (wrapper) { wrapper.style.display = ''; wrapper.style.flex = ''; }
  tutCardArea.style.flex = '';
  if (typeof ftActive !== 'undefined' && ftActive) {
    tutCardArea.className = 'tut-card-area';
    ftStepIdx++;
    if (ftStepIdx >= FULL_TUT_STEPS.length) { ftShowComplete(); return; }
    ftRenderStep();
  } else {
    tutCardArea.className = 'tut-card-area';
    tutStepIdx++;
    if (tutStepIdx >= JUNIOR_TUT_STEPS.length) { showTutComplete(); return; }
    renderTutStep();
  }
});
document.getElementById('btnModeTutorial').addEventListener('click', startTutorial);


// ?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€?€
