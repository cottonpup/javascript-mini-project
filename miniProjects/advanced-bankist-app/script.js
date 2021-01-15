'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Button scrolling
btnScrollTo.addEventListener('click', function (e) {
  // 뷰포트에서 보이는 좌표 - Section의 위치를 뺀 좌표
  // 상대적인 값!
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  // console.log(e.target.getBoundingClientRect());

  // Current scroll 위치
  // console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  // 뷰포트 사이즈
  // console.log(
  //   'height/width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // 전통적인 방법!
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // 모던한 방법이지만 지원하는 브라우저가 적음.
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// const h1 = document.querySelector('h1');
// const alertH1 = function(e){
//   alert('addEventListener: Great! You are reading the heading :D');
//   // 이벤트 한번만 일어나게 하고 지우기!
//   // h1.removeEventListener('mouseenter', alertH1)
// };

// h1.addEventListener('mouseenter', alertH1);

// // 이벤트 3초 뒤에 지우기!
// setTimeout(()=> h1.removeEventListener('mouseenter', alertH1), 3000);

// 보통 많이 쓰는 방법!
// h1.addEventListener('mouseenter', function(e){
//   alert('addEventListener: Great! You are reading the heading :D')
// })

// 올드한 방법!! On-event property
// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the heading :D');
// };

///////////////////////////////////////

// // rgb(255.255.255)
// const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
// console.log(randomColor(0, 255));

/*
Event happens at the document root and from there, 
It travels down to the target element.
*/

// EVENT BUBBLING 🛁
// 부모 엘리먼트로 버블 업!
// document.querySelector('.nav__link').addEventListener('click', function(e){
//   this.style.backgroundColor = randomColor();
//   console.log('LINK', e.target, e.currentTarget);
//   console.log(e.currentTarget === this);

//   // Stop propagation
//   // e.stopPropagation();
// })

// document.querySelector('.nav__links').addEventListener('click', function(e){
//   this.style.backgroundColor = randomColor();
//   console.log('CONTAINER', e.target, e.currentTarget);
// })

// document.querySelector('.nav').addEventListener('click', function(e){
//   this.style.backgroundColor = randomColor();
//   console.log('NAV', e.target, e.currentTarget);
// }, false);
// // if you set true, the event handler will no longer listen to bubbling events,
// // but instead, to capturing events.
// // it travels down from the DOM

///////////////////////////////////////
// Page navigation
// a 태그에 하이퍼링크를 달아두면, 앵커에 따라 페이지가 이동한다.
//

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  console.log(e.target);

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

const h1 = document.querySelector('h1');

///////////////////////////////////////
// Tabbed Component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// BAD PRACTICE => What if we have 200 tabs!?? 👿😡
// then it would slow down page!
// tabs.forEach(t => t.addEventListener('click', ()=> {
//   console.log('TAB');
// }))

// INSTEAD USE Event delegation!!!
tabsContainer.addEventListener('click', function (e) {
  // DOM TRAVERSING
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);
  // Guard clause
  if (!clicked) return; // NO ERROR THX!!

  // Active tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  // this means if(clicked){ do something}

  // Activate content area
  // console.log(`${clicked.dataset.tab}`);
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
// event delegation에 closest 메서드가 매우 도움이 된다!!
// closest: find closet patent

///////////////////////////////////////
// Menu fade animation
// mouseenter => doesn't not bubble
const handleHover = function (e) {
  // console.log(this, e.currentTarget); // SAME AS CURRENT TARGET
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sibling = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    sibling.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// anonymous callback 활용하기
// 두번째 인자값은 함수를 기대하지, 함수 표현식을 원하지 않는다..!
// 따라서 콜백함수를 집어넣어줘야 한다.
// nav.addEventListener('mouseover', function(e){
//   handleHover(e, 0.5);
// })

// // Undo fade animation
// nav.addEventListener('mouseout', function(e){
//   handleHover(e, 1);
// })

// BETTER WAY WITH BIND METHOD!!
// bind returns new function!
// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// ///////////////////////////////////////
// // Sticky navigation
// const initialCoords = section1.getBoundingClientRect();

// ITS NOT REALLY GOOD WAY FOR MOBILE
// window.addEventListener('scroll', function(e){
//   // console.log('window.scrollY', window.scrollY);
//   // console.log('initialCoords', initialCoords);
//   if(window.scrollY > initialCoords.top) nav.classList.add('sticky')
//   else nav.classList.remove('sticky')
// });

/////////////////////////////////////////
// A better way: The intersection observer API

// const obsCallback = function(entries, observer){
//   entries.forEach(entry => {
//     console.log(entry);
//   })
// };

// const obsOptions = {
//   root: null, // the target that is intersecting
//   threshold: [0, 0.2]
//   // 0.1 10%, percentage of intersection
//   // [0, 0.2] 0 means each time our target element completely out of the view
//   // [0, 1, 0.2] 1 means when 100% of the targe is actually visible
// };
// // say intersecting the view port
// const observer = new IntersectionObserver
// (obsCallback, obsOptions);
// observer.observe(section1); // target element = section1

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
// rootMargin: '-90px' => 90처럼 하드코딩하는 것은 좋지 못한 방법!
// console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, // Percentage, Rem doesn't work
});
headerObserver.observe(header);

/////////////////////////////////////////
// Reveal Sections
// 자바스크립트로 콘텐츠를 reveal하는 것은 좋지 못한 방법.
// 자바스크립트 자체를 꺼놓는 유저들이 있다는 걸 명심해야 함.
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

/////////////////////////////////////////
// Lazy Loading Images
const imgTarget = document.querySelectorAll('img[data-src]');
// console.log(imgTarget);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  // Network => slow 3g로 변경해서 보면, 아직 로딩되지도 않았는데 lazy-img 클래스를 지워버림
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTarget.forEach(img => imgObserver.observe(img));

/////////////////////////////////////////
// Slider Part 1
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

let curSlide = 0;
const maxSlide = slides.length; // 4

// const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.2) translateX(-700px)'; // 크기 조절..
// slider.style.overflow = 'visible'

// Functions
const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
};

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

// Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  // console.log(curSlide);
  goToSlide(curSlide);
  activateDot(curSlide);
};

// 호출하는 순서 중요!! 
const init = function(){
  // default active class 추가
  goToSlide(0);
  createDots();
  activateDot(0); 
  // 0% 100% 200% 300%
}
init();

// Event handler
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

// -100% 0% 100% 200%
// i가 0, curSlide 1 => -1 => -100%
// i가 1, curSlide 1 => 0 => 0%
// i가 2, curSlide 1 => 1 => 100%
// i가 3, curSlide 1 => 1 => 200%

/////////////////////////////////////////
// Slider Part 2
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});

dotContainer.addEventListener('click', function (e) {
  // EVENT DELEGATION
  if (e.target.classList.contains('dots__dot')) {
    // Select dataset value (with destructing)
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});
};

slider();

/////////////////////////////////////////
// Lifecycle DOM Events
document.addEventListener('DOMContentLoaded', function(e){
  console.log('HTML parsed and DOM tree built!', e);
})

window.addEventListener('load', function(e){
  console.log('Page fully loaded', e);
})

// window.addEventListener('beforeunload', function(e){
//   e.preventDefault(); // some browsers require it for running this
//   console.log(e);
//   e.returnValue = '';
// })