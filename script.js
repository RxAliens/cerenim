const envelope=document.getElementById('open');
const intro=document.getElementById('intro');
const story=document.getElementById('story');
const ending=document.getElementById('ending');
const next=document.getElementById('next');
const slides=[...document.querySelectorAll('.slide')];
const counter=document.getElementById('counter');
const introMessage=intro?.querySelector('p');
let index=0;

if(introMessage){
  const text=introMessage.textContent.trim();
  introMessage.textContent='';
  introMessage.classList.add('typing');
  let i=0;
  const type=()=>{
    if(i<text.length){
      introMessage.textContent+=text.charAt(i++);
      setTimeout(type,42);
    }else introMessage.classList.remove('typing');
  };
  setTimeout(type,650);
}

envelope.addEventListener('click',()=>{
  if(envelope.classList.contains('open'))return;
  envelope.classList.add('open');
  setTimeout(()=>{
    intro.style.display='none';
    story.classList.add('show');
    window.scrollTo({top:0,behavior:'smooth'});
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
