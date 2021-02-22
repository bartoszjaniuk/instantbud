const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav__links');
const links = document.querySelectorAll('.nav__item');
const lineBurger = document.querySelector('.hamburger');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  lineBurger.classList.toggle('open');
});

const circles = document.querySelectorAll('.experience__tab__circle');
const counters = document.querySelectorAll('.experience__tab__counter');
const speed = 20;

counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const inc = Math.floor(target / speed);
    // console.log(`Count:` + count);
    // console.log(`Target:` + target);
    if (count < target) {
      counter.innerText = count + inc;
      setTimeout(updateCount, 100);
    } else {
      // count.innerText = '+';
      // circles.forEach(
      //   circle =>
      //     (circle.style.backgroundImage = 'linear-gradient(62deg, #fd5d06 0%, #ffda8d 100%)')
      // );
      circles.forEach(circle => circle.classList.add('experience__tab__circle--loaded'));
    }
  };
  updateCount();
});
