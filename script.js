const envelope=document.getElementById('open');
const intro=document.getElementById('intro');
const story=document.getElementById('story');
const ending=document.getElementById('ending');
const next=document.getElementById('next');
const slides=[...document.querySelectorAll('.slide')];
const counter=document.getElementById('counter');
const introMessage=intro?.querySelector('p');
let index=0;

function typeNode(node,speed=24){return new Promise(resolve=>{const original=node.textContent;node.textContent='';let i=0;const tick=()=>{if(i<original.length){node.textContent+=original.charAt(i++);setTimeout(tick,speed)}else resolve()};tick()})}
function getLetterTextNodes(root){const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(node){if(!node.textContent.trim())return NodeFilter.FILTER_REJECT;return NodeFilter.FILTER_ACCEPT}});const nodes=[];let n;while(n=walker.nextNode())nodes.push(n);return nodes}
async function typeLetter(){const page=document.querySelector('.letter-page');if(!page||page.dataset.typed==='yes')return;page.dataset.typed='yes';const nodes=getLetterTextNodes(page);for(const node of nodes){await typeNode(node,22);await new Promise(r=>setTimeout(r,100))}}

if(introMessage){const text=introMessage.textContent.trim();introMessage.textContent='';introMessage.classList.add('typing');let i=0;const typeIntro=()=>{if(i<text.length){introMessage.textContent+=text.charAt(i++);setTimeout(typeIntro,42)}else introMessage.classList.remove('typing')};setTimeout(typeIntro,650)}

envelope.addEventListener('click',()=>{if(envelope.classList.contains('open'))return;envelope.classList.add('open');setTimeout(()=>{intro.style.display='none';story.classList.add('show');window.scrollTo({top:0,behavior:'smooth'});typeLetter()},900)});
next.addEventListener('click',()=>{if(index<slides.length-1){slides[index].classList.remove('active');index++;slides[index].classList.add('active');counter.textContent=String(index+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0');window.scrollTo({top:0,behavior:'smooth'});if(index===slides.length-1)next.textContent='Son nota ♥'}else{story.classList.remove('show');story.style.display='none';ending.classList.add('show');window.scrollTo({top:0,behavior:'smooth'})}});
