const envelope = document.getElementById('open');
const intro = document.getElementById('intro');
const story = document.getElementById('story');
const ending = document.getElementById('ending');
const next = document.getElementById('next');
const slides = [...document.querySelectorAll('.slide')];
const counter = document.getElementById('counter');
const introMessage = intro?.querySelector('p');
let index = 0;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function typeText(node, text, speed = 35) {
  return new Promise(resolve => {
    node.textContent = '';
    let i = 0;
    const tick = () => {
      if (i < text.length) {
        node.textContent += text.charAt(i++);
        setTimeout(tick, speed);
      } else {
        resolve();
      }
    };
    tick();
  });
}

function wrapTextNodes(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  let node;
  while ((node = walker.nextNode())) nodes.push(node);

  nodes.forEach(textNode => {
    const text = textNode.nodeValue || '';
    if (!text.trim()) return;

    const fragment = document.createDocumentFragment();
    [...text].forEach(char => {
      const span = document.createElement('span');
      span.className = 'type-char';
      span.textContent = char;
      fragment.appendChild(span);
    });
    textNode.parentNode.replaceChild(fragment, textNode);
  });
}

async function typeLetter() {
  const page = document.querySelector('.letter-page');
  if (!page || page.dataset.ready === 'yes') return;

  page.dataset.ready = 'yes';
  page.style.visibility = 'visible';

  const targets = [...page.querySelectorAll('.letter-small, h2, p, .letter-sign')];

  // Metni gizlemek yerine karakterleri hazırlıyoruz. Böylece strong/em gibi
  // biçimlendirmeler kaybolmuyor ve aşağıdaki satırlar önceden görünmüyor.
  targets.forEach(target => {
    target.style.visibility = 'visible';
    wrapTextNodes(target);
  });

  const characters = targets.flatMap(target => [...target.querySelectorAll('.type-char')]);

  // Her şey gerçekten gizli olsun.
  characters.forEach(char => {
    char.style.opacity = '0';
    char.style.transition = 'opacity .02s linear';
  });

  // Başlık ve paragraflar sırayla daktilo gibi ortaya çıksın.
  for (const target of targets) {
    const chars = [...target.querySelectorAll('.type-char')];
    if (!chars.length) continue;

    for (const char of chars) {
      char.style.opacity = '1';
      await sleep(target.matches('h2') ? 38 : 19);
    }

    await sleep(target.matches('.letter-love') ? 350 : 180);
  }
}

if (introMessage) {
  const text = introMessage.textContent.trim();
  introMessage.textContent = '';
  introMessage.classList.add('typing');
  let i = 0;
  const typeIntro = () => {
    if (i < text.length) {
      introMessage.textContent += text.charAt(i++);
      setTimeout(typeIntro, 42);
    } else {
      introMessage.classList.remove('typing');
    }
  };
  setTimeout(typeIntro, 650);
}

envelope?.addEventListener('click', () => {
  if (envelope.classList.contains('open')) return;
  envelope.classList.add('open');

  setTimeout(() => {
    intro.style.display = 'none';
    story.classList.add('show');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Mobil tarayıcılarda geçiş tamamlandıktan sonra başlatıyoruz.
    requestAnimationFrame(() => typeLetter());
  }, 900);
});

next?.addEventListener('click', () => {
  if (index < slides.length - 1) {
    slides[index].classList.remove('active');
    index++;
    slides[index].classList.add('active');
    counter.textContent = String(index + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (index === slides.length - 1) next.textContent = 'Son nota ♥';
  } else {
    story.classList.remove('show');
    story.style.display = 'none';
    ending.classList.add('show');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});