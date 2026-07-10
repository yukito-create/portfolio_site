'use strict';

// ページ全体の読み込み後にScrollTriggerを再計算
window.addEventListener('load', () => {
  ScrollTrigger.refresh();
});


// マウスカーソル
const dot = document.querySelector(".cursor-dot");
const ring = document.querySelector(".cursor-ring");

const xTo = gsap.quickTo(ring, "x", {
    duration:0.4,
    ease:"power3"
});

const yTo = gsap.quickTo(ring, "y", {
    duration:0.4,
    ease:"power3"
});

window.addEventListener("mousemove", e => {

    gsap.set(dot,{
        x:e.clientX,
        y:e.clientY
    });

    xTo(e.clientX);
    yTo(e.clientY);

});


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


// MVのテキストアニメーション
gsap.from(".mv-copy .word > span > span", {
  opacity: 0,
  filter: "blur(12px)",
  scale: 1.15,
  duration: 2.75,
  ease: "power3.out",
  stagger: 0.18
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
const listWrapperEl = document.querySelector(".side-scroll-list-wrapper");
const listEl = document.querySelector(".side-scroll-list");

const horizontalTween = gsap.to(listEl, {
  x: () => {
    const distance = listEl.scrollWidth - listWrapperEl.clientWidth;
    return -distance;
  },
  ease: "none",
  scrollTrigger: {
    trigger: listWrapperEl,
    start: "top top",
    end: () => {
      const distance = listEl.scrollWidth - listWrapperEl.clientWidth;

      return window.innerWidth <= 500
        ? `+=${distance * 0.8}`
        : `+=${distance}`;
    },
    scrub: true,
    pin: true,
    anticipatePin: 1,
    invalidateOnRefresh: true,
  },
});


// アンダーラインのアニメーション
gsap.utils.toArray(".sub-ttl-left").forEach((title) => {
  ScrollTrigger.create({
    trigger: title,
    start: "top 80%",
    once: true,
    onEnter: () => {
      title.classList.add("is-active");
    }
  });
});


// テキストアニメーション
gsap.utils.toArray(".js-ttl").forEach((heading) => {
  gsap.from(heading.querySelectorAll("span"), {
    opacity: 0,
    y: 15,
    duration: 0.4,
    stagger: 0.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: heading,
      start: "top 60%",
      toggleActions: "play none none none"
    }
  });
});


// 横スクロール時のテキストアニメーション
gsap.utils.toArray(".js-ttl-side").forEach((heading) => {
  gsap.from(heading.querySelectorAll("span"), {
    opacity: 0,
    y: 15,
    duration: 0.4,
    stagger: 0.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: heading,
      containerAnimation: horizontalTween,
      start: "left 70%",
      toggleActions: "play none none none"
    }
  });
});


// 画像アニメーション
gsap.utils.toArray(".img-wrap").forEach((wrap) => {
  const img = wrap.querySelector("img");

  gsap.fromTo(
    img,
    {
      scale: 0,
      opacity: 0
    },
    {
      scale: 1,
      opacity: 1,
      duration: 1.5,
      delay: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: wrap,
        start: "top 65%",
        toggleActions: "play none none none"
      }
    }
  );
});


// flowのラインの動き
gsap.utils.toArray(".flow-step").forEach((step) => {
  ScrollTrigger.create({
    trigger: step,
    start: "top 50%",
    once: true,
    onEnter: () => {
      step.classList.add("line-active");
    }
  });
});