// TUTORIAL MODULE ?•ì‹ SET (81)
const FULL_ANA1_CARDS=[{shape:'oval',color:'green',fill:'outline',count:1},{shape:'oval',color:'green',fill:'outline',count:2},{shape:'oval',color:'green',fill:'outline',count:3}];
const FULL_ANA2_CARDS=[{shape:'diamond',color:'purple',fill:'striped',count:1},{shape:'diamond',color:'red',fill:'striped',count:1},{shape:'diamond',color:'green',fill:'striped',count:3}];
const FULL_ANA3_CARDS=[{shape:'oval',color:'green',fill:'outline',count:1},{shape:'diamond',color:'purple',fill:'striped',count:2},{shape:'squiggle',color:'red',fill:'solid',count:3}];
const FULL_ANA4_CARDS=[{shape:'oval',color:'purple',fill:'solid',count:1},{shape:'diamond',color:'purple',fill:'striped',count:2},{shape:'squiggle',color:'purple',fill:'outline',count:3}];
const FULL_Q1_GIVEN=[{shape:'squiggle',color:'red',fill:'solid',count:1},{shape:'squiggle',color:'red',fill:'solid',count:2}];
const FULL_Q1_CHOICES=[{isCorrect:true,card:{shape:'squiggle',color:'red',fill:'solid',count:3}},{isCorrect:false,card:{shape:'oval',color:'red',fill:'solid',count:3}},{isCorrect:false,card:{shape:'squiggle',color:'green',fill:'solid',count:3}}];
const FULL_Q2_GIVEN=[{shape:'oval',color:'green',fill:'outline',count:1},{shape:'diamond',color:'purple',fill:'striped',count:2}];
const FULL_Q2_CHOICES=[{isCorrect:true,card:{shape:'squiggle',color:'red',fill:'solid',count:3}},{isCorrect:false,card:{shape:'squiggle',color:'red',fill:'solid',count:1}},{isCorrect:false,card:{shape:'oval',color:'red',fill:'solid',count:3}}];
const FULL_Q3_GIVEN=[{shape:'oval',color:'red',fill:'solid',count:2},{shape:'diamond',color:'green',fill:'solid',count:2}];
const FULL_Q3_CHOICES=[{isCorrect:true,card:{shape:'squiggle',color:'purple',fill:'solid',count:2}},{isCorrect:false,card:{shape:'squiggle',color:'purple',fill:'solid',count:3}},{isCorrect:false,card:{shape:'squiggle',color:'purple',fill:'outline',count:2}}];
const FULL_TUT_STEPS=[
{id:'intro',title:'?•ì‹ SETê°€ ë­ì˜ˆ??',cards:null,interactive:false},
{id:'analysis1',type:'sequence',title:'ë¶„ì„ 1?¨ê³„',cards:FULL_ANA1_CARDS,questions:[
{q:'<strong>ëª¨ì–‘</strong>??ë¹„êµ?©ì‹œ??',attrLabel:'ëª¨ì–‘??,logLabel:'ëª¨ì–‘',type:'attr',correctAnswer:'same',praise:'êµ¿êµ¿?‘<br><br>?€???€???€??br>ëª¨ë‘ ê°™ì•„?? ?”ï¸',wrong:'????ëª¨ë‘ ?€??ëª¨ì–‘?´ì—?? ?˜Š'},
{q:'<strong>?‰ê¹”</strong>??ë¹„êµ?©ì‹œ??',attrLabel:'?‰ê¹”??,logLabel:'?‰ê¹”',type:'attr',correctAnswer:'same',praise:'êµ¿êµ¿?‘<br><br>ì´ˆë¡ ì´ˆë¡ ì´ˆë¡<br>ëª¨ë‘ ê°™ì•„?? ?”ï¸',wrong:'????ëª¨ë‘ ì´ˆë¡?´ì—?? ?˜Š'},
{q:'<strong>ì±„ì?</strong>??ë¹„êµ?©ì‹œ??',attrLabel:'ì±„ì???,logLabel:'ì±„ì?',type:'attr',correctAnswer:'same',praise:'êµ¿êµ¿?‘<br><br>ë¹?ê²?ë¹?ê²?ë¹?ê²?br>ëª¨ë‘ ê°™ì•„?? ?”ï¸',wrong:'????ëª¨ë‘ ë¹?ê²ƒì´?ìš”! ?˜Š'},
{q:'<strong>ê°œìˆ˜</strong>ë¥?ë¹„êµ?©ì‹œ??',attrLabel:'ê°œìˆ˜ê°€',logLabel:'ê°œìˆ˜',type:'attr',correctAnswer:'different',praise:'êµ¿êµ¿?‘<br><br>1ê°?2ê°?3ê°?br>ê°œìˆ˜ê°€ <strong>ëª¨ë‘ ?¬ë¼??/strong>! ?”ï¸',wrong:'1ê°?2ê°?3ê°?????ê°œê? ???¤ë¥¸ ê°œìˆ˜?ˆìš”! ?˜Š'},
{q:'???¥ì˜ ì¹´ë“œ??<strong>SET</strong>?¼ê¹Œ??',type:'set',correctAnswer:'yes',praise:'êµ¿êµ¿?‘<br><br>??ê°€ì§€ ?¹ì§•??ëª¨ë‘ ê·œì¹™??ë§ì•„??<br>?´ê²Œ ë°”ë¡œ <strong>SET</strong>?ˆìš”! ?ŒŸ',wrong:'ëª¨ì–‘Â·?‰ê¹”Â·ì±„ì??€ ??ê°™ê³ , ê°œìˆ˜ë§????¬ë¼??<br>??SET?ˆìš”! ?‰'}
]},
{id:'analysis2',type:'sequence',title:'ë¶„ì„ 2?¨ê³„',cards:FULL_ANA2_CARDS,questions:[
{q:'<strong>ëª¨ì–‘</strong>??ë¹„êµ?©ì‹œ??',attrLabel:'ëª¨ì–‘??,logLabel:'ëª¨ì–‘',type:'attr',correctAnswer:'same',praise:'êµ¿êµ¿?‘<br><br>ë§ˆë¦„ëª?ë§ˆë¦„ëª?ë§ˆë¦„ëª?br>ëª¨ë‘ ê°™ì•„?? ?”ï¸',wrong:'????ëª¨ë‘ ë§ˆë¦„ëª¨ì˜ˆ?? ?˜Š'},
{q:'<strong>?‰ê¹”</strong>??ë¹„êµ?©ì‹œ??',attrLabel:'?‰ê¹”??,logLabel:'?‰ê¹”',type:'attr',correctAnswer:'different',praise:'êµ¿êµ¿?‘<br><br>ë³´ë¼ ë¹¨ê°• ì´ˆë¡<br>ëª¨ë‘ ?¬ë¼?? ?”ï¸',wrong:'ë³´ë¼ ë¹¨ê°• ì´ˆë¡ ????ê°œê? ?œë¡œ ?¬ë¼?? ?˜Š'},
{q:'<strong>ì±„ì?</strong>??ë¹„êµ?©ì‹œ??',attrLabel:'ì±„ì???,logLabel:'ì±„ì?',type:'attr',correctAnswer:'same',praise:'êµ¿êµ¿?‘<br><br>ì¤„ë¬´??ì¤„ë¬´??ì¤„ë¬´??br>ëª¨ë‘ ê°™ì•„?? ?”ï¸',wrong:'????ëª¨ë‘ ì¤„ë¬´?¬ì˜ˆ?? ?˜Š'},
{q:'<strong>ê°œìˆ˜</strong>ë¥?ë¹„êµ?©ì‹œ??',attrLabel:'ê°œìˆ˜ê°€',logLabel:'ê°œìˆ˜',type:'attr3',correctAnswer:'neither',praise:'êµ¿êµ¿?‘<br><br>1ê°?1ê°?3ê°?br>ê°œìˆ˜ê°€ 1ê°œì¸ ì¹´ë“œê°€ ??ê°œì…?ˆë‹¤. ê·œì¹™ ?„ë°˜!',wrong_same:'1ê°?1ê°?3ê°???ë§ˆì?ë§‰ì´ 3ê°œì˜ˆ?? ?˜Š',wrong_diff:'1ê°?1ê°?3ê°???1ê°œê? ??ê°œë‚˜ ?ˆì–´?? ?˜Š'},
{q:'???¥ì˜ ì¹´ë“œ??<strong>SET</strong>?¼ê¹Œ??',type:'set',correctAnswer:'no',logLabel:null,praise:'êµ¿êµ¿?‘<br><br>ê°œìˆ˜?ì„œ ê·œì¹™???´ê²¼?¼ë‹ˆê¹?br>?????¥ì? <strong>SETê°€ ?„ë‹ˆ?ìš”</strong>! ?™Œ',wrong:'ê°œìˆ˜?ì„œ ?¤íŒ¨?ˆì–´??(1ê°œê? ??ê°?. ??ê°€ì§€?¼ë„ ê·œì¹™???´ê¸°ë©?SETê°€ ???¼ìš”!'}
]},
{id:'quiz1',type:'cardpick',title:'ë¬¸ì œ 1 - SETë¥??„ì„±?´ë´??',text:'SETê°€ ?˜ê¸° ?„í•´ ?„ìš”??ì¹´ë“œ??ë¬´ì—‡?¼ê¹Œ??',givenCards:FULL_Q1_GIVEN,choices:FULL_Q1_CHOICES,explanation:'êµ¿êµ¿?‘<br><br>ëª¨ì–‘Â·?‰ê¹”Â·ì±„ì? ê°™ìŒ ê°œìˆ˜ ?¬ë¼??3ê°?br>??ë¬¼ê²° ë¹¨ê°• ê°€?ì°¸ 3ê°?ì¹´ë“œ! ??},
{id:'analysis3',type:'sequence',title:'ë¶„ì„ 3?¨ê³„',cards:FULL_ANA3_CARDS,questions:[
{q:'<strong>ëª¨ì–‘</strong>??ë¹„êµ?©ì‹œ??',attrLabel:'ëª¨ì–‘??,logLabel:'ëª¨ì–‘',type:'attr',correctAnswer:'different',praise:'êµ¿êµ¿?‘<br><br>?€??ë§ˆë¦„ëª?ë¬¼ê²°<br>ëª¨ë‘ ?¬ë¼?? ?”ï¸',wrong:'?€??ë§ˆë¦„ëª?ë¬¼ê²° ????ê°œê? ?œë¡œ ?¬ë¼?? ?˜Š'},
{q:'<strong>?‰ê¹”</strong>??ë¹„êµ?©ì‹œ??',attrLabel:'?‰ê¹”??,logLabel:'?‰ê¹”',type:'attr',correctAnswer:'different',praise:'êµ¿êµ¿?‘<br><br>ì´ˆë¡ ë³´ë¼ ë¹¨ê°•<br>ëª¨ë‘ ?¬ë¼?? ?”ï¸',wrong:'ì´ˆë¡ ë³´ë¼ ë¹¨ê°• ????ê°œê? ?œë¡œ ?¬ë¼?? ?˜Š'},
{q:'<strong>ì±„ì?</strong>??ë¹„êµ?©ì‹œ??',attrLabel:'ì±„ì???,logLabel:'ì±„ì?',type:'attr',correctAnswer:'different',praise:'êµ¿êµ¿?‘<br><br>ë¹?ê²?ì¤„ë¬´??ê°€?ì°¸<br>ëª¨ë‘ ?¬ë¼?? ?”ï¸',wrong:'ë¹?ê²?ì¤„ë¬´??ê°€?ì°¸ ????ê°œê? ?œë¡œ ?¬ë¼?? ?˜Š'},
{q:'<strong>ê°œìˆ˜</strong>ë¥?ë¹„êµ?©ì‹œ??',attrLabel:'ê°œìˆ˜ê°€',logLabel:'ê°œìˆ˜',type:'attr',correctAnswer:'different',praise:'êµ¿êµ¿?‘<br><br>1ê°?2ê°?3ê°?br>ëª¨ë‘ ?¬ë¼?? ?”ï¸',wrong:'1ê°?2ê°?3ê°?????ê°œê? ?œë¡œ ?¬ë¼?? ?˜Š'},
{q:'ëª¨ì–‘, ?‰ê¹”, ì±„ì?, ê°œìˆ˜ ëª¨ë‘ ?•ë¦¬?ˆì–´??<br>?????¥ì´ <strong>SET</strong>?¼ê¹Œ??',type:'set',correctAnswer:'yes',praise:'êµ¿êµ¿?‘<br><br>??ê°€ì§€ ?¹ì§•???„ë? ???¬ë¼??br>?´ê²Œ ë°”ë¡œ <strong>SET</strong>?ˆìš”! ?ŒŸ',wrong:'ëª¨ì–‘Â·?‰ê¹”Â·ì±„ì?Â·ê°œìˆ˜ê°€ ëª¨ë‘ ???¬ë¼??<br>???´ëŸ´ ?Œë„ SETê°€ ?¼ìš”! ?‰'}
]},
{id:'analysis4',type:'sequence',title:'ë¶„ì„ 4?¨ê³„',cards:FULL_ANA4_CARDS,questions:[
{q:'<strong>ëª¨ì–‘</strong>??ë¹„êµ?©ì‹œ??',attrLabel:'ëª¨ì–‘??,logLabel:'ëª¨ì–‘',type:'attr',correctAnswer:'different',praise:'êµ¿êµ¿?‘<br><br>?€??ë§ˆë¦„ëª?ë¬¼ê²°<br>ëª¨ë‘ ?¬ë¼?? ?”ï¸',wrong:'?€??ë§ˆë¦„ëª?ë¬¼ê²° ????ê°œê? ?œë¡œ ?¬ë¼?? ?˜Š'},
{q:'<strong>?‰ê¹”</strong>??ë¹„êµ?©ì‹œ??',attrLabel:'?‰ê¹”??,logLabel:'?‰ê¹”',type:'attr',correctAnswer:'same',praise:'êµ¿êµ¿?‘<br><br>ë³´ë¼ ë³´ë¼ ë³´ë¼<br>?‰ê¹”?€ ëª¨ë‘ ê°™ì•„?? ?”ï¸ ?¹ì§•ë§ˆë‹¤ ?…ë¦½?ìœ¼ë¡??ë‹¨?´ìš”!',wrong:'????ëª¨ë‘ ë³´ë¼?ˆìš”! ??ê°™ì? ?Šë‚˜?? ?˜Š'},
{q:'<strong>ì±„ì?</strong>??ë¹„êµ?©ì‹œ??',attrLabel:'ì±„ì???,logLabel:'ì±„ì?',type:'attr',correctAnswer:'different',praise:'êµ¿êµ¿?‘<br><br>ê°€?ì°¸ ì¤„ë¬´??ë¹?ê²?br>ëª¨ë‘ ?¬ë¼?? ?”ï¸',wrong:'ê°€?ì°¸ ì¤„ë¬´??ë¹?ê²?????ê°œê? ?œë¡œ ?¬ë¼?? ?˜Š'},
{q:'<strong>ê°œìˆ˜</strong>ë¥?ë¹„êµ?©ì‹œ??',attrLabel:'ê°œìˆ˜ê°€',logLabel:'ê°œìˆ˜',type:'attr',correctAnswer:'different',praise:'êµ¿êµ¿?‘<br><br>1ê°?2ê°?3ê°?br>ëª¨ë‘ ?¬ë¼?? ?”ï¸',wrong:'1ê°?2ê°?3ê°?????ê°œê? ?œë¡œ ?¬ë¼?? ?˜Š'},
{q:'???¥ì˜ ì¹´ë“œ??<strong>SET</strong>?¼ê¹Œ??',type:'set',correctAnswer:'yes',praise:'êµ¿êµ¿?‘<br><br>?‰ê¹”ë§?ê°™ì•„???˜ë¨¸ì§€ ?¹ì§•??ëª¨ë‘ ê·œì¹™??ë§ìœ¼ë©?SET?ˆìš”! ?ŒŸ',wrong:'ê°??¹ì§•ë§ˆë‹¤ ?…ë¦½?ìœ¼ë¡??ë‹¨?´ìš”.<br>?˜ë‚˜ê°€ ê°™ì•„???˜ë¨¸ì§€ê°€ ê·œì¹™??ë§ìœ¼ë©?SET! ?‰'}
]},
{id:'quiz2',type:'cardpick',title:'ë¬¸ì œ 2 - SETë¥??„ì„±?´ë´??',text:'SETê°€ ?˜ê¸° ?„í•´ ?„ìš”??ì¹´ë“œ??ë¬´ì—‡?¼ê¹Œ??',givenCards:FULL_Q2_GIVEN,choices:FULL_Q2_CHOICES,explanation:'êµ¿êµ¿?‘<br><br>ëª¨ì–‘Â·?‰ê¹”Â·ì±„ì?Â·ê°œìˆ˜ ëª¨ë‘ ?¬ë¼??br>??ë¬¼ê²° ë¹¨ê°• ê°€?ì°¸ 3ê°?ì¹´ë“œ! ??},
{id:'quiz3',type:'cardpick',title:'ë¬¸ì œ 3 - SETë¥??„ì„±?´ë´??',text:'SETê°€ ?˜ê¸° ?„í•´ ?„ìš”??ì¹´ë“œ??ë¬´ì—‡?¼ê¹Œ??',givenCards:FULL_Q3_GIVEN,choices:FULL_Q3_CHOICES,explanation:'êµ¿êµ¿?‘<br><br>ëª¨ì–‘Â·?‰ê¹” ?¬ë¼?? ì±„ì?Â·ê°œìˆ˜ ê°™ìŒ<br>??ë¬¼ê²° ë³´ë¼ ê°€?ì°¸ 2ê°?ì¹´ë“œ! ??},
{id:'training1',title:'?ˆë ¨ 1 - 5?¥ì—??ì°¾ì•„ë´ìš”!',text:'5??ì¤‘ì—??<strong>SETê°€ ?˜ëŠ” ????/strong>??ê³¨ë¼ë´ìš”!<br>?ŒíŠ¸ ë²„íŠ¼???ŒëŸ¬ ?„ì???ë°›ì„ ???ˆì–´??',cards:null,interactive:true,hasHint:true,challengeN:5},
{id:'training2',title:'?ˆë ¨ 2 - 6?¥ì—??ì°¾ì•„ë´ìš”!',text:'6??ì¤‘ì—??<strong>SETê°€ ?˜ëŠ” ????/strong>??ê³¨ë¼ë´ìš”!<br>?ŒíŠ¸ ë²„íŠ¼???ŒëŸ¬ ?„ì???ë°›ì„ ???ˆì–´??',cards:null,interactive:true,hasHint:true,challengeN:6},
{id:'training3',title:'?ˆë ¨ 3 - 9?¥ì—??ì°¾ì•„ë´ìš”!',text:'9??ì¤‘ì—??<strong>SETê°€ ?˜ëŠ” ????/strong>??ê³¨ë¼ë´ìš”!<br>?ŒíŠ¸ ë²„íŠ¼???ŒëŸ¬ ?„ì???ë°›ì„ ???ˆì–´??',cards:null,interactive:true,hasHint:true,challengeN:9},
{id:'final',title:'',text:'<div style="display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap;"><div><span class="tut-sub-label" style="margin: 0; white-space: nowrap;">?¤ì „?°ìŠµ</span></div><div>12??ì¤‘ì—??<strong>SETë¥?ì°¾ì•„ë³´ì„¸??</strong></div></div>',cards:null,interactive:true,hasHint:false,challengeN:12}
];
let ftStepIdx=0,ftSubQIdx=0,ftSelected=[],ftCards=[],ftAnswer=[],ftHintCard=-1,ftDone=false,ftSubQNext=false,ftAnswerItems=[],ftFinalSetCount=0,ftIntroPhase=1,ftActive=false;
const ftTutorialScreen=document.getElementById('tutorialScreen'),ftProgressFill=document.getElementById('tutProgressFill'),ftStepLabel=document.getElementById('tutStepLabel'),ftTitleEl=document.getElementById('tutTitle'),ftBubbleEl=document.getElementById('tutBubble'),ftCardArea=document.getElementById('tutCardArea'),ftFeedbackEl=document.getElementById('tutFeedback'),ftNextBtn=document.getElementById('tutNextBtn'),ftHintBtn=document.getElementById('tutHintBtn'),ftContextBubble=document.getElementById('tutContextBubble'),ftAnswerLog=document.getElementById('tutAnswerLog'),ftModeScreen=document.getElementById('modeScreen');
const FULL_TUT_INTRO_TEXT='ëª¨ì–‘ Â· ?‰ê¹” Â· ì±„ì? Â· <strong>ê°œìˆ˜</strong><br>??ê°€ì§€ ?¹ì§•???˜ë‚˜???•ì¸?´ìš”!<br><br>???¥ì˜ ì¹´ë“œ <strong>ê°ê°???¹ì§•</strong>??br><span class="txt-blue">ëª¨ë‘ ê°™ê±°??/span>, <span class="txt-red">ëª¨ë‘ ?¤ë¥´ë©?/span> SET ?„ì„±!';
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
  ftHintBtn.hidden=!step.interactive||!step.hasHint;ftHintBtn.disabled=false;ftHintBtn.textContent='?’¡ ?ŒíŠ¸';
  document.getElementById('tutBackBtn').hidden=(ftStepIdx===0);
  document.getElementById('tutSkipBtn').hidden=false;
  var wrapper=ftCardArea.parentElement;if(wrapper)wrapper.style.display='';
  var tutInner=ftTutorialScreen.querySelector('.tut-inner');
  document.getElementById('tutRpgHint').hidden=true;
  if(step.type==='sequence'){
    tutInner.classList.remove('tut-layout-quiz');ftSubQIdx=0;ftAnswerItems=[];ftCards=step.cards;
    ftBubbleEl.innerHTML='';ftContextBubble.innerHTML=FULL_TUT_INTRO_TEXT;ftContextBubble.hidden=true;
    ftAnswerLog.hidden=true;ftAnswerLog.innerHTML='<div class="tut-log-title">?ë‹¨ ê²°ê³¼</div>';
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
    ftNextBtn.hidden=step.interactive;ftNextBtn.textContent=isLast?'?„ë£Œ! ?“':'?¤ìŒ ??;
  }
}
function ftRenderIntroPhase(){
  var html='<div>Junior SETë¥??´ë¦¬?´í–ˆ?˜ìš”? ?´ì œ ?•ì‹ SET?…ë‹ˆ??</div>';
  if(ftIntroPhase>=2)html+='<div class="'+(ftIntroPhase===2?'stamp-anim':'')+'" style="margin-top:14px;"><div>?•ì‹ SET??ì¹´ë“œê°€ <strong>81ì¢?/strong>?¼ë¡œ ??ë§ì•„??</div></div>';
  if(ftIntroPhase>=3)html+='<div class="'+(ftIntroPhase===3?'stamp-anim':'')+'" style="margin-top:14px;"><div>?¹ì§•??<strong>4ê°€ì§€</strong>ë¡??˜ì–´?¬ì–´??</div></div>';
  if(ftIntroPhase>=4)html+='<div class="'+(ftIntroPhase===4?'stamp-anim':'')+'" style="margin-top:6px;"><div><strong>ëª¨ì–‘ Â· ?‰ê¹” Â· ì±„ì?</strong> (ê¸°ì¡´)</div></div>';
  if(ftIntroPhase>=5)html+='<div class="'+(ftIntroPhase===5?'stamp-anim':'')+'" style="margin-top:2px;"><div><strong>ê°œìˆ˜</strong> (1ê°?Â· 2ê°?Â· 3ê°? ??<span class=\"txt-blue\">?ˆë¡œ ì¶”ê?!</span></div></div>';
  if(ftIntroPhase>=6)html+='<div class="'+(ftIntroPhase===6?'stamp-anim':'')+'" style="margin-top:14px;"><div>???¥ì˜ ì¹´ë“œ <strong>ê°ê°???¹ì§•</strong>??/div><div><span class=\"txt-blue\">ëª¨ë‘ ê°™ê±°??/span>, <span class=\"txt-red\">ëª¨ë‘ ?¤ë¥´ë©?/span> SET ?„ì„±!</div></div>';
  if(ftIntroPhase<6){
    html+='<button class="tut-rpg-arrow" id="btnFullIntroExpand" title="?¤ìŒ">??/button>';
    document.getElementById('tutRpgHint').hidden=false;
    ftNextBtn.hidden=true;
    ftBubbleEl.style.cursor='pointer';
    ftBubbleEl.onclick=function(){if(ftIntroPhase<6){ftIntroPhase++;ftRenderIntroPhase();}};
  } else {
    document.getElementById('tutRpgHint').hidden=true;
    ftBubbleEl.style.cursor='default';
    ftBubbleEl.onclick=null;
    ftShowNextBtn('?¤ìŒ ??);
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
function ftShowNextBtn(label){ftNextBtn.textContent=label||'?¤ìŒ ??;ftNextBtn.classList.remove('tut-next-fadein');void ftNextBtn.offsetWidth;ftNextBtn.hidden=false;ftNextBtn.classList.add('tut-next-fadein');}
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
          ftFeedbackEl.textContent='?‰ ?Œë??´ìš”! ??ë²???ì°¾ì•„ë³´ì„¸??';ftFeedbackEl.className='tut-feedback tut-success';
          ftBubbleEl.innerHTML='SETê°€ ?˜ëŠ” ???¥ì˜ ì¹´ë“œë¥?<strong>??ë²???/strong> ì°¾ì•„ë³´ì„¸??';
          ftNextBtn.hidden=true;ftHintBtn.hidden=true;
        },700);return;
      }
      ftDone=true;var pr=['?‰ ?„ë²½?´ìš”! ???¥ì´ SETë¥??´ë£¨ê³??ˆì–´??','?ŒŸ ?Œë??´ìš”! ?•í™•?˜ê²Œ ì°¾ì•˜?´ìš”!','êµ¿êµ¿?‘'];
      ftFeedbackEl.textContent=pr[Math.floor(Math.random()*pr.length)];ftFeedbackEl.className='tut-feedback tut-success';ftHintBtn.hidden=true;ftShowNextBtn('?„ë£Œ! ?“');
    }else{
      ftDone=true;var pr=['?‰ ?„ë²½?´ìš”! ???¥ì´ SETë¥??´ë£¨ê³??ˆì–´??','?ŒŸ ?Œë??´ìš”! ?•í™•?˜ê²Œ ì°¾ì•˜?´ìš”!','êµ¿êµ¿?‘'];
      ftFeedbackEl.textContent=pr[Math.floor(Math.random()*pr.length)];ftFeedbackEl.className='tut-feedback tut-success';ftHintBtn.hidden=true;
      ftShowNextBtn(ftStepIdx>=FULL_TUT_STEPS.length-1?'?„ë£Œ! ?“':'?¤ìŒ ??);
    }
  }else{
    ftSelected.forEach(function(idx){var el=document.getElementById('ft-card-'+idx);if(el)el.classList.add('tut-wrong');});
    ftFeedbackEl.textContent='??SETê°€ ?„ë‹ˆ?ìš”. ?¤ì‹œ ?´í´ë³´ì„¸??';ftFeedbackEl.className='tut-feedback tut-fail';
    setTimeout(function(){ftSelected.forEach(function(idx){var el=document.getElementById('ft-card-'+idx);if(el)el.classList.remove('selected','tut-wrong');});ftSelected=[];ftFeedbackEl.textContent='';ftFeedbackEl.className='tut-feedback';},900);
  }
}
function ftOnHint(){if(ftHintCard<0)return;var el=document.getElementById('ft-card-'+ftHintCard);if(el)el.classList.add('tut-hint-glow');ftHintBtn.disabled=true;ftHintBtn.textContent='?’¡ ?ŒíŠ¸ ?¬ìš©??;}
function ftRenderSubQ(){
  var step=FULL_TUT_STEPS[ftStepIdx],q=step.questions[ftSubQIdx],qNum=ftSubQIdx+1,qTot=step.questions.length;
  var oldQ=document.getElementById('tutQuizBtns');if(oldQ)oldQ.remove();
  var KO=['ì²?,'??,'??,'??,'?¤ì„¯','?¬ì„¯','?¼ê³±','?¬ëŸ','?„í™‰','??];
  var lbl=qNum===qTot?'ë§ˆì?ë§?ì§ˆë¬¸':(KO[qNum-1]||qNum)+' ë²ˆì§¸ ì§ˆë¬¸';
  ftBubbleEl.innerHTML='<div style="display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap;"><div class="stamp-anim"><span class="tut-sub-label" style="margin: 0; white-space: nowrap;">'+lbl+'</span></div><div class="stamp-anim" style="animation-delay:0.15s;">'+q.q+'</div></div>';
  ftFeedbackEl.textContent='';ftFeedbackEl.className='tut-feedback';
  if(q.type==='set'){
    ftFeedbackEl.insertAdjacentHTML('beforebegin','<div class="tut-quiz-btns choices-hidden" id="tutQuizBtns"><button class="tut-quiz-yes" id="tutSeqYes">???¥ì˜ ì¹´ë“œ??br>SET?…ë‹ˆ??</button><button class="tut-quiz-no" id="tutSeqNo">???¥ì˜ ì¹´ë“œ??br>SETê°€ ?„ë‹™?ˆë‹¤.</button></div>');
    document.getElementById('tutSeqYes').addEventListener('click',function(){ftOnSeqAnswer('yes');});
    document.getElementById('tutSeqNo').addEventListener('click',function(){ftOnSeqAnswer('no');});
  }else{
    var p=q.attrLabel?q.attrLabel+'<br>':'';
    ftFeedbackEl.insertAdjacentHTML('beforebegin','<div class="tut-quiz-btns tut-quiz-btns-3 choices-hidden" id="tutQuizBtns"><button class="tut-quiz-same" id="tutSeqSame">'+p+'<span class="txt-blue">ëª¨ë‘ ê°™ì•„??/span></button><button class="tut-quiz-diff" id="tutSeqDiff">'+p+'<span class="txt-red">ëª¨ë‘ ?¬ë¼??/span></button><button class="tut-quiz-neither" id="tutSeqNeither">'+p+'2ê°œë§Œ ê°™ì•„??/button></div>');
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
    if(q.logLabel){var t=answer==='same'?'ëª¨ë‘ ê°™ì•„??:answer==='different'?'ëª¨ë‘ ?¬ë¼??:'2ê°œë§Œ ê°™ì•„??;var cls=answer==='same'?'log-same':answer==='different'?'log-diff':'log-err';ftAnswerItems.push({label:q.logLabel,text:t,cls:cls});ftRenderAnswerLog();}
    var isLastQ=ftSubQIdx>=step.questions.length-1,isLastStep=ftStepIdx>=FULL_TUT_STEPS.length-1;
    ftSubQNext=!isLastQ;ftShowNextBtn(isLastQ?(isLastStep?'?„ë£Œ! ?“':'?¤ìŒ ??):'?¤ìŒ ì§ˆë¬¸ ??);
  }else{
    ftFeedbackEl.innerHTML='??br><br>'+wrongMsg;ftFeedbackEl.className='tut-feedback tut-fail';
    ['tutSeqYes','tutSeqNo','tutSeqSame','tutSeqDiff','tutSeqNeither'].forEach(function(id){var el=document.getElementById(id);if(el)el.removeAttribute('disabled');});
  }
}
function ftRenderAnswerLog(){ftAnswerLog.innerHTML='<div class="tut-log-title">?ë‹¨ ê²°ê³¼</div>'+ftAnswerItems.map(function(it){return '<div class="tut-log-item '+it.cls+'"><span class="log-label">'+it.label+':</span> '+it.text+'</div>';}).join('');ftAnswerLog.hidden=false;}
function ftRenderCardPickStep(){
  ftCardArea.innerHTML='';ftCardArea.className='tut-card-area tut-cardpick-area';
  var step=FULL_TUT_STEPS[ftStepIdx],choices=shuffle([...step.choices]),labels=['A','B','C'];
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
    ftFeedbackEl.innerHTML=explanation||'êµ¿êµ¿?‘ ê·œì¹™??ë§ì•„??SET?ˆìš”!';ftFeedbackEl.className='tut-feedback tut-success';
    ftShowNextBtn(ftStepIdx>=FULL_TUT_STEPS.length-1?'?„ë£Œ! ?“':'?¤ìŒ ??);
  }else{
    var b=document.getElementById('tut-pick-'+clickedIdx);if(b)b.classList.add('tut-pick-wrong');
    ftFeedbackEl.innerHTML='???¤ì‹œ ?•ì¸?´ë³´?¸ìš”! ê°œìˆ˜??ê¼??•ì¸?´ë³´?¸ìš”.';ftFeedbackEl.className='tut-feedback tut-fail';
    setTimeout(function(){var b=document.getElementById('tut-pick-'+clickedIdx);if(b)b.classList.remove('tut-pick-wrong');choices.forEach(function(_,i){var b=document.getElementById('tut-pick-'+i);if(b)b.removeAttribute('disabled');});ftFeedbackEl.textContent='';ftFeedbackEl.className='tut-feedback';},2000);
  }
}
function ftAdvance(){
  if(ftSubQNext){ftSubQNext=false;ftSubQIdx++;ftRenderSubQ();return;}
  ftCardArea.className='tut-card-area';var oldQ=document.getElementById('tutQuizBtns');if(oldQ)oldQ.remove();
  ftStepIdx++;if(ftStepIdx>=FULL_TUT_STEPS.length){ftShowComplete();return;}ftRenderStep();
}
function ftShowComplete(){
  ftProgressFill.style.width='100%';ftStepLabel.textContent='?„ë£Œ! ?“';ftTitleEl.textContent='?… ?œí† ë¦¬ì–¼ ?„ë£Œ!';ftTitleEl.style.display='';
  var oldQ=document.getElementById('tutQuizBtns');if(oldQ)oldQ.remove();
  ftTutorialScreen.querySelector('.tut-inner').classList.add('tut-layout-quiz');
  ftBubbleEl.innerHTML='?•ì‹ SET ê·œì¹™??ëª¨ë‘ ?µí˜”?´ìš”!<br>?´ì œ ëª¨ë“œ ? íƒ ?”ë©´?¼ë¡œ ?Œì•„ê°€ ?„ì „?´ë³´?¸ìš”.';
  var wrapper=ftCardArea.parentElement;if(wrapper){wrapper.style.display='';wrapper.style.flex='';}
  ftCardArea.style.cssText='';ftCardArea.className='tut-card-area tut-card-area--complete';
  ftCardArea.innerHTML='<button class="tut-home-bare-btn" id="ftGoHomeComplete"><svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg><span>?€ë¬¸ìœ¼ë¡?/span></button>';
  ftContextBubble.hidden=true;ftAnswerLog.hidden=true;ftFeedbackEl.textContent='';ftHintBtn.hidden=true;ftNextBtn.hidden=true;document.getElementById('tutSkipBtn').hidden=true;
  document.getElementById('ftGoHomeComplete').addEventListener('click',function(){ftActive=false;ftTutorialScreen.classList.remove('ft-tut-mode');ftTutorialScreen.hidden=true;returnToHome();});
}
document.getElementById('btnModeTutorialFull').addEventListener('click',startTutorialFull);
