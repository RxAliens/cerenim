const envelope=document.getElementById('open');
const intro=document.getElementById('intro');
const story=document.getElementById('story');
const ending=document.getElementById('ending');
const next=document.getElementById('next');
const slides=[...document.querySelectorAll('.slide')];
const counter=document.getElementById('counter');
const introMessage=intro?.querySelector('p');
let index=0;

const wait=ms=>new Promise(r=>setTimeout(r,ms));

function typeText(node,text,speed=34){
  return new Promise(resolve=>{
    node.textContent='';
    let i=0;
    const tick=()=>{
      if(i<text.length){
        node.textContent+=text.charAt(i++);
        setTimeout(tick,speed);
      }else resolve();
    };
    tick();
  });
}

async function typeLetter(){
  const page=document.querySelector('.letter-page');
  if(!page||page.dataset.typed==='yes')return;
  page.dataset.typed='yes';

  // Önce bütün mektubu tamamen görünmez yapıyoruz.
  // Böylece aşağıdaki paragraflar daha yazılmadan sayfada görünmeyecek.
  page.classList.add('typing-letter');

  const targets=[
    page.querySelector('.letter-small'),
    page.querySelector('h2'),
    ...page.querySelectorAll('p'),
    page.querySelector('.letter-sign')
  ].filter(Boolean);

  const originals=targets.map(n=>n.textContent);
  targets.forEach(n=>{
    n.textContent='';
    n.classList.add('type-target');
  });

  // Başlıklar da mektubun yazılışının bir parçası olsun.
  for(let i=0;i<targets.length;i++){
    const node=targets[i];
    const text=originals[i];
    const speed=node.matches('h2')?48:node.classList.contains('letter-small')?65:30;
    await typeText(node,text,speed);
    await wait(node.matches('p')?420:220);
  }

  page.classList.remove('typing-letter');
}

if(introMessage){
  const text=introMessage.textContent.trim();
  introMessage.textContent='';
  introMessage.classList.add('typing');
  let i=0;
  const typeIntro=()=>{
    if(i<text.length){
      introMessage.textContent+=text.charAt(i++);
      setTimeout(typeIntro,42);
    }else introMessage.classList.remove('typing');
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
