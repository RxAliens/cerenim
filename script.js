const envelope=document.getElementById('open');
const intro=document.getElementById('intro');
const story=document.getElementById('story');
const ending=document.getElementById('ending');
const next=document.getElementById('next');
const slides=[...document.querySelectorAll('.slide')];
const counter=document.getElementById('counter');
const introMessage=intro?.querySelector('p');
let index=0;

function typeText(node,text,speed=30){return new Promise(resolve=>{node.textContent='';let i=0;const tick=()=>{if(i<text.length){node.textContent+=text.charAt(i++);setTimeout(tick,speed)}else resolve()};tick()})}

async function typeLetter(){
  const page=document.querySelector('.letter-page');
  if(!page||page.dataset.typed==='yes')return;
  page.dataset.typed='yes';
  page.classList.add('typing');

  const targets=[...page.querySelectorAll('.letter-small,h2,p,.letter-sign')];
  const saved=targets.map(node=>({node,text:node.innerText.trim()}));
  targets.forEach(node=>{node.textContent='';node.style.visibility='hidden'});

  for(const item of saved){
    item.node.style.visibility='visible';
    await typeText(item.node,item.text,item.node.matches('h2')?42:24);
    await new Promise(r=>setTimeout(r,220));
  }

  page.classList.remove('typing');
}

if(introMessage){
  const text=introMessage.textContent.trim();
  introMessage.textContent='';
  introMessage.classList.add('typing');
  let i=0;
  const typeIntro=()=>{
    if(i<text.length){introMessage.textContent+=text.charAt(i++);setTimeout(typeIntro,42)}
    else introMessage.classList.remove('typing')
  };
  setTimeout(typeIntro,650);
}

envelope.addEventListener('click',()=>{
  if(envelope.classList.contains('open'))return;
  envelope.classList.add('open');
  setTimeout(()=>{
    intro.style.display='none';
    story.classList.add('show');
    window.scrollTo({top:0,behavior:'smooth'});
    typeLetter();
  },900);
});

next.addEventListener('click',()=>{
  if(index<slides.length-1){
    slides[index].classList.remove('active');
    index++;
    slides[index].classList.add('active');
    counter.textContent=String(index+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0');
    window.scrollTo({top:0,behavior:'smooth'});
    if(index===slides.length-1)next.textContent='Son nota ♥';
  }else{
    story.classList.remove('show');
    story.style.display='none';
    ending.classList.add('show');
    window.scrollTo({top:0,behavior:'smooth'});
  }
});
