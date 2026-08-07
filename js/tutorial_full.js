// TUTORIAL MODULE 정식 SET (81)
const FULL_ANA1_CARDS=[{shape:'oval',color:'green',fill:'outline',count:1},{shape:'oval',color:'green',fill:'outline',count:2},{shape:'oval',color:'green',fill:'outline',count:3}];
const FULL_ANA2_CARDS=[{shape:'diamond',color:'purple',fill:'striped',count:1},{shape:'diamond',color:'red',fill:'striped',count:1},{shape:'diamond',color:'green',fill:'striped',count:3}];
const FULL_ANA3_CARDS=[{shape:'oval',color:'green',fill:'outline',count:1},{shape:'diamond',color:'purple',fill:'striped',count:2},{shape:'squiggle',color:'red',fill:'solid',count:3}];
const FULL_ANA4_CARDS=[{shape:'oval',color:'purple',fill:'solid',count:1},{shape:'diamond',color:'purple',fill:'striped',count:2},{shape:'squiggle',color:'purple',fill:'outline',count:3}];
const FULL_Q1_GIVEN=[{shape:'squiggle',color:'red',fill:'solid',count:1},{shape:'squiggle',color:'red',fill:'solid',count:2}];
const FULL_Q1_CHOICES=[{isCorrect:true,card:{shape:'squiggle',color:'red',fill:'solid',count:3}},{isCorrect:false,card:{shape:'oval',color:'red',fill:'solid',count:3}},{isCorrect:false,card:{shape:'squiggle',color:'green',fill:'solid',count:3}},{isCorrect:false,card:{shape:'squiggle',color:'red',fill:'outline',count:3}}];
const FULL_Q2_GIVEN=[{shape:'oval',color:'green',fill:'outline',count:1},{shape:'diamond',color:'purple',fill:'striped',count:2}];
const FULL_Q2_CHOICES=[{isCorrect:true,card:{shape:'squiggle',color:'red',fill:'solid',count:3}},{isCorrect:false,card:{shape:'squiggle',color:'red',fill:'solid',count:1}},{isCorrect:false,card:{shape:'oval',color:'red',fill:'solid',count:3}},{isCorrect:false,card:{shape:'squiggle',color:'green',fill:'solid',count:3}}];
const FULL_Q3_GIVEN=[{shape:'oval',color:'red',fill:'solid',count:2},{shape:'diamond',color:'green',fill:'solid',count:2}];
const FULL_Q3_CHOICES=[{isCorrect:true,card:{shape:'squiggle',color:'purple',fill:'solid',count:2}},{isCorrect:false,card:{shape:'squiggle',color:'purple',fill:'solid',count:3}},{isCorrect:false,card:{shape:'squiggle',color:'purple',fill:'outline',count:2}},{isCorrect:false,card:{shape:'oval',color:'purple',fill:'solid',count:2}}];
const FULL_TUT_STEPS=[
{id:'intro',title:'정식 SET가 뭐예요?',cards:null,interactive:false},
{id:'analysis1',type:'sequence',title:'분석 1단계',cards:FULL_ANA1_CARDS,questions:[
{q:'<strong>모양</strong>을 비교합시다!',attrLabel:'모양이',logLabel:'모양',type:'attr',correctAnswer:'same',praise:'굿굿👍<br><br>타원 타원 타원<br>모두 같아요! ✔️',wrong:'세 장 모두 타원 모양이에요! 😊'},
{q:'<strong>색깔</strong>을 비교합시다!',attrLabel:'색깔이',logLabel:'색깔',type:'attr',correctAnswer:'same',praise:'굿굿👍<br><br>초록 초록 초록<br>모두 같아요! ✔️',wrong:'세 장 모두 초록이에요! 😊'},
{q:'<strong>채움</strong>을 비교합시다!',attrLabel:'채움이',logLabel:'채움',type:'attr',correctAnswer:'same',praise:'굿굿👍<br><br>빈 것 빈 것 빈 것<br>모두 같아요! ✔️',wrong:'세 장 모두 빈 것이에요! 😊'},
{q:'<strong>개수</strong>를 비교합시다!',attrLabel:'개수가',logLabel:'개수',type:'attr',correctAnswer:'different',praise:'굿굿👍<br><br>1개 2개 3개<br>개수가 <strong>모두 달라요</strong>! ✔️',wrong:'1개 2개 3개 — 세 개가 다 다른 개수예요! 😊'},
{q:'세 장의 카드는 <strong>SET</strong>일까요?',type:'set',correctAnswer:'yes',praise:'굿굿👍<br><br>네 가지 특징이 모두 규칙에 맞아요!<br>이게 바로 <strong>SET</strong>예요! 🌟',wrong:'모양·색깔·채움은 다 같고, 개수만 다 달라요!<br>→ SET예요! 🎉'}
]},
{id:'analysis2',type:'sequence',title:'분석 2단계',cards:FULL_ANA2_CARDS,questions:[
{q:'<strong>모양</strong>을 비교합시다!',attrLabel:'모양이',logLabel:'모양',type:'attr',correctAnswer:'same',praise:'굿굿👍<br><br>마름모 마름모 마름모<br>모두 같아요! ✔️',wrong:'세 장 모두 마름모예요! 😊'},
{q:'<strong>색깔</strong>을 비교합시다!',attrLabel:'색깔이',logLabel:'색깔',type:'attr',correctAnswer:'different',praise:'굿굿👍<br><br>보라 빨강 초록<br>모두 달라요! ✔️',wrong:'보라 빨강 초록 — 세 개가 서로 달라요! 😊'},
{q:'<strong>채움</strong>을 비교합시다!',attrLabel:'채움이',logLabel:'채움',type:'attr',correctAnswer:'same',praise:'굿굿👍<br><br>줄무늬 줄무늬 줄무늬<br>모두 같아요! ✔️',wrong:'세 장 모두 줄무늬예요! 😊'},
{q:'<strong>개수</strong>를 비교합시다!',attrLabel:'개수가',logLabel:'개수',type:'attr3',correctAnswer:'neither',praise:'굿굿👍<br><br>1개 1개 3개<br>개수가 1개인 카드가 두 개입니다. 규칙 위반!',wrong_same:'1개 1개 3개 — 마지막이 3개예요! 😊',wrong_diff:'1개 1개 3개 — 1개가 두 개나 있어요! 😊'},
{q:'세 장의 카드는 <strong>SET</strong>일까요?',type:'set',correctAnswer:'no',logLabel:null,praise:'굿굿👍<br><br>개수에서 규칙을 어겼으니까<br>이 세 장은 <strong>SET가 아니에요</strong>! 🙌',wrong:'개수에서 실패했어요 (1개가 두 개). 한 가지라도 규칙을 어기면 SET가 안 돼요!'}
]},
{id:'quiz1',type:'cardpick',title:'문제 1 - SET를 완성해봐요!',text:'SET가 되기 위해 필요한 카드는?',givenCards:FULL_Q1_GIVEN,choices:FULL_Q1_CHOICES,explanation:'굿굿👍<br><br>모양·색깔·채움 같고 개수만 달라야<br>→ 물결 빨강 가득참 3개 카드! ✅'},
{id:'analysis3',type:'sequence',title:'분석 3단계',cards:FULL_ANA3_CARDS,questions:[
{q:'<strong>모양</strong>을 비교합시다!',attrLabel:'모양이',logLabel:'모양',type:'attr',correctAnswer:'different',praise:'굿굿👍<br><br>타원 마름모 물결<br>모두 달라요! ✔️',wrong:'타원 마름모 물결 — 세 개가 서로 달라요! 😊'},
{q:'<strong>색깔</strong>을 비교합시다!',attrLabel:'색깔이',logLabel:'색깔',type:'attr',correctAnswer:'different',praise:'굿굿👍<br><br>초록 보라 빨강<br>모두 달라요! ✔️',wrong:'초록 보라 빨강 — 세 개가 서로 달라요! 😊'},
{q:'<strong>채움</strong>을 비교합시다!',attrLabel:'채움이',logLabel:'채움',type:'attr',correctAnswer:'different',praise:'굿굿👍<br><br>빈 것 줄무늬 가득참<br>모두 달라요! ✔️',wrong:'빈 것 줄무늬 가득참 — 세 개가 서로 달라요! 😊'},
{q:'<strong>개수</strong>를 비교합시다!',attrLabel:'개수가',logLabel:'개수',type:'attr',correctAnswer:'different',praise:'굿굿👍<br><br>1개 2개 3개<br>모두 달라요! ✔️',wrong:'1개 2개 3개 — 세 개가 서로 달라요! 😊'},
{q:'모양, 색깔, 채움, 개수 모두 정리했어요!<br>이 세 장이 <strong>SET</strong>일까요?',type:'set',correctAnswer:'yes',praise:'굿굿👍<br><br>네 가지 특징이 전부 다 달라서<br>이게 바로 <strong>SET</strong>예요! 🌟',wrong:'모양·색깔·채움·개수가 모두 다 달라요!<br>→ 이럴 때도 SET가 돼요! 🎉'}
]},
{id:'analysis4',type:'sequence',title:'분석 4단계',cards:FULL_ANA4_CARDS,questions:[
{q:'<strong>모양</strong>을 비교합시다!',attrLabel:'모양이',logLabel:'모양',type:'attr',correctAnswer:'different',praise:'굿굿👍<br><br>타원 마름모 물결<br>모두 달라요! ✔️',wrong:'타원 마름모 물결 — 세 개가 서로 달라요! 😊'},
{q:'<strong>색깔</strong>을 비교합시다!',attrLabel:'색깔이',logLabel:'색깔',type:'attr',correctAnswer:'same',praise:'굿굿👍<br><br>보라 보라 보라<br>색깔은 모두 같아요! ✔️ 특징마다 독립적으로 판단해요!',wrong:'세 장 모두 보라예요! 다 같지 않나요? 😊'},
{q:'<strong>채움</strong>을 비교합시다!',attrLabel:'채움이',logLabel:'채움',type:'attr',correctAnswer:'different',praise:'굿굿👍<br><br>가득참 줄무늬 빈 것<br>모두 달라요! ✔️',wrong:'가득참 줄무늬 빈 것 — 세 개가 서로 달라요! 😊'},
{q:'<strong>개수</strong>를 비교합시다!',attrLabel:'개수가',logLabel:'개수',type:'attr',correctAnswer:'different',praise:'굿굿👍<br><br>1개 2개 3개<br>모두 달라요! ✔️',wrong:'1개 2개 3개 — 세 개가 서로 달라요! 😊'},
{q:'세 장의 카드는 <strong>SET</strong>일까요?',type:'set',correctAnswer:'yes',praise:'굿굿👍<br><br>색깔만 같아도 나머지 특징이 모두 규칙에 맞으면 SET예요! 🌟',wrong:'각 특징마다 독립적으로 판단해요.<br>하나가 같아도 나머지가 규칙에 맞으면 SET! 🎉'}
]},
{id:'quiz2',type:'cardpick',title:'문제 2 - SET를 완성해봐요!',text:'SET가 되기 위해 필요한 카드는?',givenCards:FULL_Q2_GIVEN,choices:FULL_Q2_CHOICES,explanation:'굿굿👍<br><br>모양·색깔·채움·개수 모두 달라야<br>→ 물결 빨강 가득참 3개 카드! ✅'},
{id:'quiz3',type:'cardpick',title:'문제 3 - SET를 완성해봐요!',text:'SET가 되기 위해 필요한 카드는?',givenCards:FULL_Q3_GIVEN,choices:FULL_Q3_CHOICES,explanation:'굿굿👍<br><br>모양·색깔 달라야, 채움·개수 같음<br>→ 물결 보라 가득참 2개 카드! ✅'},
{id:'training1',title:'훈련 1 - 5장에서 찾아봐요!',text:'5장 중에서 <strong>SET가 되는 세 장</strong>을 골라봐요!<br>힌트 버튼을 눌러 도움을 받을 수 있어요.',cards:null,interactive:true,hasHint:true,challengeN:5},
{id:'training2',title:'훈련 2 - 6장에서 찾아봐요!',text:'6장 중에서 <strong>SET가 되는 세 장</strong>을 골라봐요!<br>힌트 버튼을 눌러 도움을 받을 수 있어요.',cards:null,interactive:true,hasHint:true,challengeN:6},
{id:'training3',title:'훈련 3 - 9장에서 찾아봐요!',text:'9장 중에서 <strong>SET가 되는 세 장</strong>을 골라봐요!<br>힌트 버튼을 눌러 도움을 받을 수 있어요.',cards:null,interactive:true,hasHint:true,challengeN:9},
{id:'final',title:'',text:'<div style="display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap;"><div><span class="tut-sub-label" style="margin: 0; white-space: nowrap;">실전연습</span></div><div>12장 중에서 <strong>SET를 찾아보세요.</strong></div></div>',cards:null,interactive:true,hasHint:false,challengeN:12}
];
let ftStepIdx=0,ftSubQIdx=0,ftSelected=[],ftCards=[],ftAnswer=[],ftHintCard=-1,ftDone=false,ftSubQNext=false,ftAnswerItems=[],ftFinalSetCount=0,ftIntroPhase=1,ftActive=false;
const ftTutorialScreen=document.getElementById('tutorialScreen'),ftProgressFill=document.getElementById('tutProgressFill'),ftStepLabel=document.getElementById('tutStepLabel'),ftTitleEl=document.getElementById('tutTitle'),ftBubbleEl=document.getElementById('tutBubble'),ftCardArea=document.getElementById('tutCardArea'),ftFeedbackEl=document.getElementById('tutFeedback'),ftNextBtn=document.getElementById('tutNextBtn'),ftHintBtn=document.getElementById('tutHintBtn'),ftContextBubble=document.getElementById('tutContextBubble'),ftAnswerLog=document.getElementById('tutAnswerLog'),ftModeScreen=document.getElementById('modeScreen');
const FULL_TUT_INTRO_TEXT='모양 · 색깔 · 채움 · <strong>개수</strong><br>네 가지 특징을 하나씩 확인해요!<br><br>세 장의 카드 <strong>각각의 특징</strong>이<br><span class="txt-blue">모두 같거나</span>, <span class="txt-red">모두 다르면</span> SET 완성!';
function ftImgPath(c){return IMAGE_BASE+c.shape+'_'+c.color+'_'+c.fill+'.png';}
function ftRenderCardHTML(c){var n=c.count||1,inner='<div class="card-symbols count-'+n+'">';for(var i=0;i<n;i++){inner+='<img src="'+ftImgPath(c)+'" alt="" draggable="false" class="card-symbol">';}inner+='</div>';return inner;}
function startTutorialFull(){ftActive=true;ftStepIdx=0;ftModeScreen.hidden=true;ftTutorialScreen.classList.add('ft-tut-mode');ftTutorialScreen.hidden=false;ftRenderStep();}
function ftRenderStep(){
  var step=FULL_TUT_STEPS[ftStepIdx],total=FULL_TUT_STEPS.length;
  document.getElementById('tutQuizBtns')&&document.getElementById('tutQuizBtns').remove();
  ftProgressFill.style.width=(ftStepIdx/total*100)+'%';
  ftStepLabel.textContent=(ftStepIdx+1)+' / '+total;
  ftTitleEl.textContent=step.title;
  ftTitleEl.style.display=step.title?'':'none';
  ftFeedbackEl.textContent='';ftFeedbackEl.className='tut-feedback';
  ftSelected=[];ftDone=false;ftFinalSetCount=0;
  ftBubbleEl.onclick = null;ftBubbleEl.style.cursor = 'default';
  ftHintBtn.hidden=!step.interactive||!step.hasHint;ftHintBtn.disabled=false;ftHintBtn.textContent='💡 힌트';
  document.getElementById('tutBackBtn').hidden=(ftStepIdx===0);
  document.getElementById('tutSkipBtn').hidden=false;
  var wrapper=ftCardArea.parentElement;if(wrapper)wrapper.style.display='';
  var tutInner=ftTutorialScreen.querySelector('.tut-inner');
  document.getElementById('tutRpgHint').hidden=true;
  if(step.type==='sequence'){
    tutInner.classList.remove('tut-layout-quiz');ftSubQIdx=0;ftAnswerItems=[];ftCards=step.cards;
    ftBubbleEl.innerHTML='';ftContextBubble.innerHTML=FULL_TUT_INTRO_TEXT;ftContextBubble.hidden=true;
    ftAnswerLog.hidden=true;ftAnswerLog.innerHTML='<div class="tut-log-title">판단 결과</div>';
    ftRenderCards(false);ftRenderSubQ();
  }else if(step.type==='cardpick'){
    tutInner.classList.add('tut-layout-quiz');
    ftBubbleEl.innerHTML='<div class="stamp-anim">'+step.text+'</div>';
    ftContextBubble.hidden=true;ftAnswerLog.hidden=true;
    ftRenderCardPickStep();ftNextBtn.hidden=true;
  }else if(step.id==='intro'){
    tutInner.classList.remove('tut-layout-quiz');
    ftContextBubble.hidden=true;ftAnswerLog.hidden=true;
    ftCardArea.innerHTML='';ftIntroPhase=1;ftRenderIntroPhase();
  }else{
    tutInner.classList.add('tut-layout-quiz');
    ftBubbleEl.innerHTML=step.text;ftContextBubble.hidden=true;ftAnswerLog.hidden=true;
    ftSetupChallenge(step);ftRenderCards(step.interactive);
    var isLast=ftStepIdx===total-1;
    ftNextBtn.hidden=step.interactive;ftNextBtn.textContent=isLast?'완료! 🎓':'다음 →';
  }
}
function ftRenderIntroPhase(){
  var html='<div>Junior SET를 클리어했나요? 이제 정식 SET입니다.</div>';
  if(ftIntroPhase>=2)html+='<div class="'+(ftIntroPhase===2?'stamp-anim':'')+'" style="margin-top:14px;"><div>정식 SET는 카드가 <strong>81종</strong>으로 더 많아요!</div></div>';
  if(ftIntroPhase>=3)html+='<div class="'+(ftIntroPhase===3?'stamp-anim':'')+'" style="margin-top:14px;"><div>특징이 <strong>4가지</strong>로 늘어났어요.</div></div>';
  if(ftIntroPhase>=4)html+='<div class="'+(ftIntroPhase===4?'stamp-anim':'')+'" style="margin-top:6px;"><div><strong>모양 · 색깔 · 채움</strong> (기존)</div></div>';
  if(ftIntroPhase>=5)html+='<div class="'+(ftIntroPhase===5?'stamp-anim':'')+'" style="margin-top:2px;"><div><strong>개수</strong> (1개 · 2개 · 3개) ← <span class=\"txt-blue\">새로 추가!</span></div></div>';
  if(ftIntroPhase>=6)html+='<div class="'+(ftIntroPhase===6?'stamp-anim':'')+'" style="margin-top:14px;"><div>세 장의 카드 <strong>각각의 특징</strong>이</div><div><span class=\"txt-blue\">모두 같거나</span>, <span class=\"txt-red\">모두 다르면</span> SET 완성!</div></div>';
  if(ftIntroPhase<6){
    html+='<button class="tut-rpg-arrow" id="btnFullIntroExpand" title="다음">▼</button>';
    document.getElementById('tutRpgHint').hidden=false;
    ftNextBtn.hidden=true;
    ftBubbleEl.style.cursor='pointer';
    ftBubbleEl.onclick=function(){if(ftIntroPhase<6){ftIntroPhase++;ftRenderIntroPhase();}};
  } else {
    document.getElementById('tutRpgHint').hidden=true;
    ftBubbleEl.style.cursor='default';
    ftBubbleEl.onclick=null;
    ftShowNextBtn('다음 →');
  }
  ftBubbleEl.innerHTML=html;
}
function ftSetupChallenge(step){
  var n=step.challengeN||9,wantExact=(n<12);
  for(var t=0;t<500;t++){var pool=shuffle(buildOfficialDeck()).slice(0,n),sets=ftFindAllSets(pool);if(wantExact?sets.length===1:sets.length>=1){ftCards=pool;ftAnswer=sets[0];ftHintCard=wantExact?ftAnswer[0]:-1;return;}}
  for(var t=0;t<500;t++){var pool=shuffle(buildOfficialDeck()).slice(0,n);if(ftHasAnySet(pool)){ftCards=pool;for(var i=0;i<n-2;i++)for(var j=i+1;j<n-1;j++)for(var k=j+1;k<n;k++)if(isSetOfficial(pool[i],pool[j],pool[k])){ftAnswer=[i,j,k];ftHintCard=wantExact?i:-1;return;}}}
}
function ftFindAllSets(cards){var sets=[],n=cards.length;for(var i=0;i<n-2;i++)for(var j=i+1;j<n-1;j++)for(var k=j+1;k<n;k++)if(isSetOfficial(cards[i],cards[j],cards[k]))sets.push([i,j,k]);return sets;}
function ftHasAnySet(cards){for(var i=0;i<cards.length-2;i++)for(var j=i+1;j<cards.length-1;j++)for(var k=j+1;k<cards.length;k++)if(isSetOfficial(cards[i],cards[j],cards[k]))return true;return false;}
function ftShowNextBtn(label){ftNextBtn.textContent=label||'다음 →';ftNextBtn.classList.remove('tut-next-fadein');void ftNextBtn.offsetWidth;ftNextBtn.hidden=false;ftNextBtn.classList.add('tut-next-fadein');}
function ftRenderCards(interactive){
  ftCardArea.style.cssText='';ftCardArea.innerHTML='';ftCardArea.className='tut-card-area';
  if(!ftCards||!ftCards.length)return;
  ftCards.forEach(function(card,idx){
    var el=document.createElement('div');el.className='card tut-card';el.dataset.tidx=idx;el.id='ft-card-'+idx;
    el.innerHTML=ftRenderCardHTML(card);
    if(interactive)el.addEventListener('click',(function(i){return function(){ftOnCardClick(i);};})(idx));
    ftCardArea.appendChild(el);
  });
}
function ftOnCardClick(idx){
  if(ftDone)return;var el=document.getElementById('ft-card-'+idx);if(!el)return;
  if(ftSelected.indexOf(idx)>=0){ftSelected=ftSelected.filter(function(i){return i!==idx;});el.classList.remove('selected');return;}
  if(ftSelected.length>=3)return;ftSelected.push(idx);el.classList.add('selected');
  if(ftSelected.length===3)setTimeout(ftEvalSel,60);
}
function ftEvalSel(){
  var i=ftSelected[0],j=ftSelected[1],k=ftSelected[2],valid=isSetOfficial(ftCards[i],ftCards[j],ftCards[k]);
  if(valid){
    var step=FULL_TUT_STEPS[ftStepIdx],isFinal=step.id==='final';
    ftSelected.forEach(function(idx){var el=document.getElementById('ft-card-'+idx);if(el){el.classList.remove('selected');el.classList.add('tut-correct');}});
    if(isFinal){
      ftFinalSetCount++;
      if(ftFinalSetCount===1){
        setTimeout(function(){
          var idxs=[...ftSelected].sort(function(a,b){return a-b;}),onBoard=ftCards.filter(Boolean);
          var pool=shuffle(buildOfficialDeck().filter(function(c){return !onBoard.some(function(b){return b.shape===c.shape&&b.color===c.color&&b.fill===c.fill&&b.count===c.count;});}));
          var placed=false;
          for(var t=0;t<500&&!placed;t++){var nc=shuffle([...pool]).slice(0,3);if(isSetOfficial(nc[0],nc[1],nc[2]))continue;var tb=[...ftCards];idxs.forEach(function(bi,ni){tb[bi]=nc[ni];});if(ftHasAnySet(tb.filter(Boolean))){idxs.forEach(function(bi,ni){ftCards[bi]=nc[ni];});placed=true;}}
          if(!placed){var nc=pool.slice(0,3);idxs.forEach(function(bi,ni){ftCards[bi]=nc[ni];});}
          ftSelected=[];ftDone=false;ftRenderCards(true);
          ftFeedbackEl.textContent='🎉 훌륭해요! 한 번 더 찾아보세요!';ftFeedbackEl.className='tut-feedback tut-success';
          ftBubbleEl.innerHTML='SET가 되는 세 장의 카드를 <strong>한 번 더</strong> 찾아보세요!';
          ftNextBtn.hidden=true;ftHintBtn.hidden=true;
        },700);return;
      }
      ftDone=true;var pr=['🎉 완벽해요! 세 장이 SET를 이루고 있어요!','🌟 훌륭해요! 정확하게 찾았어요!','굿굿👍'];
      ftFeedbackEl.textContent=pr[Math.floor(Math.random()*pr.length)];ftFeedbackEl.className='tut-feedback tut-success';ftHintBtn.hidden=true;ftShowNextBtn('완료! 🎓');
    }else{
      ftDone=true;var pr=['🎉 완벽해요! 세 장이 SET를 이루고 있어요!','🌟 훌륭해요! 정확하게 찾았어요!','굿굿👍'];
      ftFeedbackEl.textContent=pr[Math.floor(Math.random()*pr.length)];ftFeedbackEl.className='tut-feedback tut-success';ftHintBtn.hidden=true;
      ftShowNextBtn(ftStepIdx>=FULL_TUT_STEPS.length-1?'완료! 🎓':'다음 →');
    }
  }else{
    ftSelected.forEach(function(idx){var el=document.getElementById('ft-card-'+idx);if(el)el.classList.add('tut-wrong');});
    ftFeedbackEl.textContent='❌ SET가 아니에요. 다시 살펴보세요!';ftFeedbackEl.className='tut-feedback tut-fail';
    setTimeout(function(){ftSelected.forEach(function(idx){var el=document.getElementById('ft-card-'+idx);if(el)el.classList.remove('selected','tut-wrong');});ftSelected=[];ftFeedbackEl.textContent='';ftFeedbackEl.className='tut-feedback';},900);
  }
}
function ftOnHint(){if(ftHintCard<0)return;var el=document.getElementById('ft-card-'+ftHintCard);if(el)el.classList.add('tut-hint-glow');ftHintBtn.disabled=true;ftHintBtn.textContent='💡 힌트 사용됨';}
function ftRenderSubQ(){
  var step=FULL_TUT_STEPS[ftStepIdx],q=step.questions[ftSubQIdx],qNum=ftSubQIdx+1,qTot=step.questions.length;
  var oldQ=document.getElementById('tutQuizBtns');if(oldQ)oldQ.remove();
  var KO=['첫','두','세','네','다섯','여섯','일곱','여덟','아홉','열'];
  var lbl=qNum===qTot?'마지막 질문':(KO[qNum-1]||qNum)+' 번째 질문';
  ftBubbleEl.innerHTML='<div style="display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap;"><div class="stamp-anim"><span class="tut-sub-label" style="margin: 0; white-space: nowrap;">'+lbl+'</span></div><div class="stamp-anim" style="animation-delay:0.15s;">'+q.q+'</div></div>';
  ftFeedbackEl.textContent='';ftFeedbackEl.className='tut-feedback';
  if(q.type==='set'){
    ftFeedbackEl.insertAdjacentHTML('beforebegin','<div class="tut-quiz-btns choices-hidden" id="tutQuizBtns"><button class="tut-quiz-yes" id="tutSeqYes">세 장의 카드는<br>SET입니다.</button><button class="tut-quiz-no" id="tutSeqNo">세 장의 카드는<br>SET가 아닙니다.</button></div>');
    document.getElementById('tutSeqYes').addEventListener('click',function(){ftOnSeqAnswer('yes');});
    document.getElementById('tutSeqNo').addEventListener('click',function(){ftOnSeqAnswer('no');});
  }else{
    var p=q.attrLabel?q.attrLabel+'<br>':'';
    ftFeedbackEl.insertAdjacentHTML('beforebegin','<div class="tut-quiz-btns tut-quiz-btns-3 choices-hidden" id="tutQuizBtns"><button class="tut-quiz-same" id="tutSeqSame">'+p+'<span class="txt-blue">모두 같아요</span></button><button class="tut-quiz-diff" id="tutSeqDiff">'+p+'<span class="txt-red">모두 달라요</span></button><button class="tut-quiz-neither" id="tutSeqNeither">'+p+'2개만 같아요</button></div>');
    document.getElementById('tutSeqSame').addEventListener('click',function(){ftOnSeqAnswer('same');});
    document.getElementById('tutSeqDiff').addEventListener('click',function(){ftOnSeqAnswer('different');});
    document.getElementById('tutSeqNeither').addEventListener('click',function(){ftOnSeqAnswer('neither');});
  }
  setTimeout(function(){var b=document.getElementById('tutQuizBtns');if(b){b.classList.remove('choices-hidden');b.classList.add('choices-fadein');}},450);
  ftNextBtn.hidden=true;
}
function ftOnSeqAnswer(answer){
  var step=FULL_TUT_STEPS[ftStepIdx],q=step.questions[ftSubQIdx],correct=(answer===q.correctAnswer);
  var wrongMsg=q.type==='attr3'?(answer==='same'?q.wrong_same:answer==='different'?q.wrong_diff:q.wrong||''):(q.wrong||'');
  if(correct){
    ['tutSeqYes','tutSeqNo','tutSeqSame','tutSeqDiff','tutSeqNeither'].forEach(function(id){var el=document.getElementById(id);if(el)el.setAttribute('disabled','');});
    ftFeedbackEl.innerHTML=q.praise;ftFeedbackEl.className='tut-feedback tut-success';
    if(q.logLabel){var t=answer==='same'?'모두 같아요':answer==='different'?'모두 달라요':'2개만 같아요';var cls=answer==='same'?'log-same':answer==='different'?'log-diff':'log-err';ftAnswerItems.push({label:q.logLabel,text:t,cls:cls});ftRenderAnswerLog();}
    var isLastQ=ftSubQIdx>=step.questions.length-1,isLastStep=ftStepIdx>=FULL_TUT_STEPS.length-1;
    ftSubQNext=!isLastQ;ftShowNextBtn(isLastQ?(isLastStep?'완료! 🎓':'다음 →'):'다음 질문 →');
  }else{
    ftFeedbackEl.innerHTML='❌<br><br>'+wrongMsg;ftFeedbackEl.className='tut-feedback tut-fail';
    ['tutSeqYes','tutSeqNo','tutSeqSame','tutSeqDiff','tutSeqNeither'].forEach(function(id){var el=document.getElementById(id);if(el)el.removeAttribute('disabled');});
  }
}
function ftRenderAnswerLog(){ftAnswerLog.innerHTML='<div class="tut-log-title">판단 결과</div>'+ftAnswerItems.map(function(it){return '<div class="tut-log-item '+it.cls+'"><span class="log-label">'+it.label+':</span> '+it.text+'</div>';}).join('');ftAnswerLog.hidden=false;}
function ftRenderCardPickStep(){
  ftCardArea.innerHTML='';ftCardArea.className='tut-card-area tut-cardpick-area';
  var step=FULL_TUT_STEPS[ftStepIdx],choices=shuffle([...step.choices]),labels=['A','B','C','D'];
  var givenHTML=step.givenCards.map(function(c){return '<div class="card tut-pick-given-card">'+ftRenderCardHTML(c)+'</div>';}).join('');
  var cHTML=choices.map(function(ch,i){return '<button class="tut-pick-choice" id="tut-pick-'+i+'"><span class="tut-pick-label">'+labels[i]+'</span><div class="card tut-pick-card">'+ftRenderCardHTML(ch.card)+'</div></button>';}).join('');
  ftCardArea.innerHTML='<div class="tut-pick-given">'+givenHTML+'<div class="tut-pick-unknown">?</div></div><div class="tut-pick-choices choices-hidden" id="tutPickChoices">'+cHTML+'</div>';
  setTimeout(function(){var e=document.getElementById('tutPickChoices');if(e){e.classList.remove('choices-hidden');e.classList.add('choices-fadein');}},450);
  choices.forEach(function(ch,i){var btn=document.getElementById('tut-pick-'+i);if(btn)btn.addEventListener('click',(function(ci,chx){return function(){ftOnCardPickAnswer(chx.isCorrect,ci,choices,step.explanation);};})(i,ch));});
}
function ftOnCardPickAnswer(isCorrect,clickedIdx,choices,explanation){
  choices.forEach(function(_,i){var b=document.getElementById('tut-pick-'+i);if(b)b.setAttribute('disabled','');});
  if(isCorrect){
    var b=document.getElementById('tut-pick-'+clickedIdx);if(b)b.classList.add('tut-pick-correct');
    ftFeedbackEl.innerHTML=explanation||'굿굿👍 규칙에 맞아서 SET예요!';ftFeedbackEl.className='tut-feedback tut-success';
    ftShowNextBtn(ftStepIdx>=FULL_TUT_STEPS.length-1?'완료! 🎓':'다음 →');
  }else{
    var b=document.getElementById('tut-pick-'+clickedIdx);if(b)b.classList.add('tut-pick-wrong');
    ftFeedbackEl.innerHTML='❌ 다시 확인해보세요! 개수도 꼭 확인해보세요.';ftFeedbackEl.className='tut-feedback tut-fail';
    setTimeout(function(){var b=document.getElementById('tut-pick-'+clickedIdx);if(b)b.classList.remove('tut-pick-wrong');choices.forEach(function(_,i){var b=document.getElementById('tut-pick-'+i);if(b)b.removeAttribute('disabled');});ftFeedbackEl.textContent='';ftFeedbackEl.className='tut-feedback';},2000);
  }
}
function ftAdvance(){
  if(ftSubQNext){ftSubQNext=false;ftSubQIdx++;ftRenderSubQ();return;}
  ftCardArea.className='tut-card-area';var oldQ=document.getElementById('tutQuizBtns');if(oldQ)oldQ.remove();
  ftStepIdx++;if(ftStepIdx>=FULL_TUT_STEPS.length){ftShowComplete();return;}ftRenderStep();
}
function ftShowComplete(){
  ftProgressFill.style.width='100%';ftStepLabel.textContent='완료! 🎓';ftTitleEl.textContent='🏅 튜토리얼 완료!';ftTitleEl.style.display='';
  var oldQ=document.getElementById('tutQuizBtns');if(oldQ)oldQ.remove();
  ftTutorialScreen.querySelector('.tut-inner').classList.add('tut-layout-quiz');
  ftBubbleEl.innerHTML='정식 SET 규칙을 모두 익혔어요!<br>이제 모드 선택 화면으로 돌아가 도전해보세요.';
  var wrapper=ftCardArea.parentElement;if(wrapper){wrapper.style.display='';wrapper.style.flex='';}
  ftCardArea.style.cssText='';ftCardArea.className='tut-card-area tut-card-area--complete';
  ftCardArea.innerHTML='<button class="tut-home-bare-btn" id="ftGoHomeComplete"><svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg><span>대문으로</span></button>';
  ftContextBubble.hidden=true;ftAnswerLog.hidden=true;ftFeedbackEl.textContent='';ftHintBtn.hidden=true;ftNextBtn.hidden=true;document.getElementById('tutSkipBtn').hidden=true;
  document.getElementById('ftGoHomeComplete').addEventListener('click',function(){ftActive=false;ftTutorialScreen.classList.remove('ft-tut-mode');ftTutorialScreen.hidden=true;returnToHome();});
}
document.getElementById('btnModeTutorialFull').addEventListener('click',startTutorialFull);