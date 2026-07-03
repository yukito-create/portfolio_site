'use strict';

// ページ内リンク時のハッシュ削除
document.addEventListener("DOMContentLoaded", () => {
  // ページ内リンクを取得
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", () => {
      // スクロール完了後にURLのハッシュを削除
      setTimeout(() => {
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }, 10);
    });
  });
});

// スクロールスタック
const sections = gsap.utils.toArray(".stack-section");

sections.forEach((section, index) => {

    // 最後のセクションは固定しない
    if(index === sections.length - 1) return;

    ScrollTrigger.create({
        trigger: section,
        start: "top top",
        endTrigger: sections[index + 1],
        end: "top top",
        pin: true,
        pinSpacing: false,
        anticipatePin: 1
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