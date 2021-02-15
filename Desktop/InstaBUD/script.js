const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav__links');
const links = document.querySelectorAll('.nav__item');
const lineBurger = document.querySelector('.hamburger');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  lineBurger.classList.toggle('open');
});
