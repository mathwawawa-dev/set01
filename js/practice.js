const pracAttrMap = {
  shape: { diamond: '마름모', squiggle: '물결', oval: '타원' },
  color: { red: '빨강', green: '초록', purple: '보라' },
  fill: { empty: '빈 것', striped: '줄무늬', solid: '가득 참' }
};

let pracIsFull = false;
let pracCurrentDiff = 0; // 0: 쉬움, 1: 보통, 2: 어려움
let pracSolvedCount = 0;
let pracTotalAttempts = 0;

let pracGivenCards = [];
let pracCorrectCard = null;
let pracOptions = [];
let pracHintStep = 0;
let pracWaitNext = false;

function initPracticeMode(isFull) {
  pracIsFull = isFull;
  pracCurrentDiff = 0;
  pracSolvedCount = 0;
  pracTotalAttempts = 0;
  
  document.getElementById('pracSolvedCount').textContent = '0';
  document.getElementById('pracAccuracy').textContent = '0%';
  
  document.getElementById('modeScreen').hidden = true;
  document.getElementById('practiceScreen').hidden = false;
  
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
  
  const fb = document.getElementById('pracFeedback');
  fb.textContent = '';
  fb.className = 'prac-feedback';
  document.getElementById('pracHintBtn').textContent = '💡 힌트';
  
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
  
  // 2. 오답 카드 3장 고르기
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
  
  if(wrongCandidates.length < 3) {
    wrongCandidates = shuffle(availableForWrong);
  } else {
    wrongCandidates = shuffle(wrongCandidates);
  }
  
  let wrongOptions = wrongCandidates.slice(0, 3);
  
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
  if(pracIsFull && c1.number === c2.number) cnt++;
  return cnt;
}

function isSameCard(c1, c2) {
  return c1.shape === c2.shape && c1.color === c2.color && c1.fill === c2.fill && (pracIsFull ? c1.number === c2.number : true);
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
    label.textContent = String.fromCharCode(65 + idx); // A, B, C, D
    
    const el = createPracCardElement(opt);
    // 식별자 임시 부여
    el.dataset.idx = idx;
    el.addEventListener('click', () => handlePracOptionClick(opt, el));
    
    container.appendChild(label);
    container.appendChild(el);
    oArea.appendChild(container);
  });
}

function handlePracOptionClick(selectedCard, el) {
  if (pracWaitNext) return;
  
  pracTotalAttempts++;
  
  if (isSameCard(selectedCard, pracCorrectCard)) {
    // 정답
    pracSolvedCount++;
    el.classList.add('correct');
    
    const fb = document.getElementById('pracFeedback');
    fb.innerHTML = '굿굿👍<br>SET 규칙에 모두 맞아요! ✔️';
    fb.className = 'prac-feedback success';
    
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
    
    const fb = document.getElementById('pracFeedback');
    fb.innerHTML = '다시 한 번!<br>힌트를 확인해보세요.';
    fb.className = 'prac-feedback error';
    
    updatePracStats();
  }
}

function updatePracStats() {
  document.getElementById('pracSolvedCount').textContent = pracSolvedCount;
  let acc = Math.round((pracSolvedCount / pracTotalAttempts) * 100) || 0;
  document.getElementById('pracAccuracy').textContent = acc + '%';
}

function getAttrKorean(prop, val) {
  return pracAttrMap[prop][val] || val;
}

function showPracHint() {
  const fb = document.getElementById('pracFeedback');
  fb.className = 'prac-feedback';
  
  let hints = [];
  
  // 모양
  if (pracGivenCards[0].shape === pracGivenCards[1].shape) {
    hints.push(`모양이 모두 ${getAttrKorean('shape', pracGivenCards[0].shape)} → 정답도 ${getAttrKorean('shape', pracGivenCards[0].shape)}`);
  } else {
    hints.push(`모양이 서로 다름 → 정답은 나머지 하나`);
  }
  
  // 색깔
  if (pracGivenCards[0].color === pracGivenCards[1].color) {
    hints.push(`색깔이 모두 ${getAttrKorean('color', pracGivenCards[0].color)} → 정답도 ${getAttrKorean('color', pracGivenCards[0].color)}`);
  } else {
    hints.push(`색깔이 서로 다름 → 정답은 나머지 하나`);
  }
  
  // 채움
  if (pracGivenCards[0].fill === pracGivenCards[1].fill) {
    hints.push(`채움이 모두 ${getAttrKorean('fill', pracGivenCards[0].fill)} → 정답도 ${getAttrKorean('fill', pracGivenCards[0].fill)}`);
  } else {
    hints.push(`채움이 서로 다름 → 정답은 나머지 하나`);
  }
  
  // 개수 (정식 모드)
  if (pracIsFull) {
    if (pracGivenCards[0].number === pracGivenCards[1].number) {
      hints.push(`개수가 모두 ${pracGivenCards[0].number}개 → 정답도 ${pracGivenCards[0].number}개`);
    } else {
      hints.push(`개수가 서로 다름 → 정답은 나머지 하나`);
    }
  }
  
  if (pracHintStep < hints.length) {
    fb.textContent = `💡 힌트: ${hints[pracHintStep]}`;
    pracHintStep++;
  } else {
    let ansStr = `${getAttrKorean('shape', pracCorrectCard.shape)}, ${getAttrKorean('color', pracCorrectCard.color)}, ${getAttrKorean('fill', pracCorrectCard.fill)}`;
    if (pracIsFull) ansStr += `, ${pracCorrectCard.number}개`;
    
    fb.textContent = `💡 최종 힌트: 정답은 [ ${ansStr} ] 입니다!`;
  }
}

// 이벤트 리스너 연결
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('pracExitBtn').addEventListener('click', exitPracticeMode);
  document.getElementById('pracHintBtn').addEventListener('click', showPracHint);
  
  document.getElementById('btnModePractice').addEventListener('click', () => {
    initPracticeMode(false);
  });
  document.getElementById('btnModePracticeFull').addEventListener('click', () => {
    initPracticeMode(true);
  });
});
