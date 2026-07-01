'use strict';

// スクロールスタック
const sections = document.querySelectorAll("[data-section]");

sections.forEach((section) => {
  const inner = section.querySelector("[data-section-inner]");

  const setFixed = () => {
    gsap.set(inner, {
      position: "fixed",
      bottom: 0,
    });
  };

  const setAbsolute = () => {
    gsap.set(inner, {
      position: "absolute",
      bottom: "auto",
    });
  };

  ScrollTrigger.create({
    trigger: section,
    start: "bottom bottom",
    onEnter: setFixed,
    onEnterBack: setFixed,
    onLeave: setAbsolute,
    onLeaveBack: setAbsolute,
  });
});










// ハイブリッドスクロール
const listWrapperEl = document.querySelector('.side-scroll-list-wrapper');
const listEl = document.querySelector('.side-scroll-list');

gsap.to(listEl, {
  x: () => -(listEl.clientWidth - listWrapperEl.clientWidth),
  ease: 'none',
  scrollTrigger: {
    trigger: listWrapperEl,
    start: 'top top',
    end: () => `+=${listEl.clientWidth - listWrapperEl.clientWidth}`,
    scrub: true,
    pin: true,
    anticipatePin: 1,
    invalidateOnRefresh: true,
  },
});