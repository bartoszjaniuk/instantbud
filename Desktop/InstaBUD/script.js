const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav__links');
const links = document.querySelectorAll('.nav__item');
const lineBurger = document.querySelector('.hamburger');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  lineBurger.classList.toggle('open');
});

const header = document.querySelector('.header');

// CREATE ELEMENT
// .insertAdjecentHTML

// CREATE ELEMENT FROM SCRATCH
const message = document.createElement('div');
// ADD CLASSNAME
message.classList.add('cookie-message');
// ADD TEXT TO THE ELEMENT
// message.textContent = 'We use cookies for improved functionality and analytics';
// ADD TEXT TO THE ELEMENT WITH HTML ELEMENTS
message.innerHTML =
  'We use cookies for improved functionality and analytics <button class ="btn btn--close-cookie">Got it!</button>';

header.before(message);

document.querySelector('.btn--close-cookie').addEventListener('click', () => message.remove());

message.style.backgroundColor = '#37384d';

message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

const logo = document.querySelector('.logo__img');

logo.alt = 'Alternative text set by JS';

logo.setAttribute('designer', 'Bartosz');

const link = document.querySelector('.nav__link');

// Classes

logo.classList.add('c', 'd');
logo.classList.remove('c');
logo.classList.toggle('c');
// logo.classList.contain('c');

// DON'T USE - only one class
// logo.className = 'bartol';

const scrollTo = document.querySelector('.arrow__learn-more');
const section1 = document.querySelector('#section--1');
const section2 = document.querySelector('#section--2');
const section3 = document.querySelector('#section--3');
const section4 = document.querySelector('#section--4');

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = e => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
console.log(randomColor(0, 255));

// TABBED COMPONENT
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// Event delegation instead of tabs.forEach (t) => t.addEventListener
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause - modern solution
  if (!clicked) return;
  // Clear all active and add to the clicked one
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // Activate content area
  tabsContent.forEach(tab => tab.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation
const handleHover = function (e) {
  // może być tylko jeden argument, który jest eventem
  if (e.target.classList.contains('nav__link')) {
    // sprawdza czy cel zawiera klasę nav__link
    const link = e.target;
    const siblings = link.closest('nav').querySelectorAll('.nav__link'); // zaznacza rodzeństwo
    const logo = link.closest('nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

const nav = document.querySelector('nav');
// nav.addEventListener('mouseover', handleHover); TO NIE ZADZIAŁA
// nav.addEventListener('mouseout', handleHover); TO NIE ZADZIAŁA

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

const navHeight = nav.getBoundingClientRect().height;

const observerOptions = {
  root: null, // entire viewport
  treshhold: 0,
  rootMargin: `-${navHeight}px`,
};

const stickyNav = function (entries) {
  const [entry] = entries; // entry[0] to samo
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else {
    nav.classList.remove('sticky');
  }
};
const headerObserver = new IntersectionObserver(stickyNav, observerOptions);
headerObserver.observe(header);

// Reveal sections ->>>>>>>>
const allSections = document.querySelectorAll('.section');
const revealSection = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const revealOptions = {
  root: null,
  treshhold: 0.15,
};
const sectionObserver = new IntersectionObserver(revealSection, revealOptions);
allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
// ->>>>>>>>>>>>>>>>>>>>>

// Reveal Counting Numbers

const circles = document.querySelectorAll('.experience__tab__circle');
const counters = document.querySelectorAll('.experience__tab__counter');
const speed = 20;
const startCounting = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const inc = Math.floor(target / speed);
      if (count < target) {
        counter.innerText = count + inc;
        setTimeout(updateCount, 100);
      } else {
        circles.forEach(circle => circle.classList.add('experience__tab__circle--loaded'));
      }
    };
    updateCount();
  });
  observer.unobserve(entry.target);
};

countingSectionObserver = new IntersectionObserver(startCounting, revealOptions);
countingSectionObserver.observe(section3);

// Lazy loading images
const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgTargets = document.querySelectorAll('img[data-src]');
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
});

imgTargets.forEach(img => imgObserver.observe(img));
