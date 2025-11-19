const images = [
  "public/pictures/01.jpg",
  "public/pictures/02.jpg",
  "public/pictures/03.jpg",
  "public/pictures/04.jpg",
  "public/pictures/05.jpg",
  "public/pictures/06.jpg",
  "public/pictures/07.jpg",
  "public/pictures/08.jpg",
  "public/pictures/09.jpg",
  "public/pictures/10.jpg",
  "public/pictures/11.jpg",
  "public/pictures/12.jpg",
  "public/pictures/13.jpg", 
  "public/pictures/14.jpg",
  "public/pictures/15.jpg",
  "public/pictures/16.jpg"
];

function setFullHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
// 初期設定
setFullHeight();
// ウィンドウリサイズ時にも再設定
window.addEventListener('resize', setFullHeight);


let lastIndex = 1;
let index = 0;
document.addEventListener("DOMContentLoaded", function() {

  // 文字のフェードイン
  const contents = document.querySelectorAll('.content')
  contents.forEach(content => {
    content.classList.add('fade-in')
  })
  
  // 背景画像切り替え
  function changeBackground() {
    const backgroundImg = document.querySelector("#backgroundImg");
    while(lastIndex === index){
      index = Math.floor(Math.random() * images.length);
    }
    lastIndex = index;
    backgroundImg.src = images[index];
    backgroundImg.classList.add('fade-in-image');
  }
  setInterval(changeBackground, 10000);
  changeBackground();

  // scrollではなくタップで移動
  const scrollDowns = document.querySelectorAll(".scroll-down");
  const scrollUps = document.querySelectorAll(".scroll-up");
  scrollDowns.forEach((scrollDown, index) => {
    scrollDown.addEventListener("click", function () {
      const nextSection = document.querySelectorAll(".scroll-section")[index + 1];
      if (nextSection) {
          nextSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
  scrollUps.forEach((scrollUp, index) => {
    scrollUp.addEventListener("click", function () {
      const previousSection = document.querySelectorAll(".scroll-section")[index];
      if (previousSection) {
        previousSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // scroll 
  document.addEventListener("wheel", function(event) {
    const sections = document.querySelectorAll(".scroll-section");
    let currentIndex = [...sections].findIndex(section => section.getBoundingClientRect().top >= 0);
    if (event.deltaY > 0) {
      currentIndex = Math.min(currentIndex + 1, sections.length - 1);
    } else {
      currentIndex = Math.max(currentIndex - 1, 0);
    }
    sections[currentIndex].scrollIntoView({ behavior: 'smooth' });
  });

  document.addEventListener("scroll", function() {
    document.querySelectorAll(".content").forEach(content => {
        const rect = content.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.80) {
            content.classList.add("fade-in");
        }
    });
  });

  // 帯 
  const page1 = document.getElementById("page1");
  const page2 = document.getElementById("page2");
  const page3 = document.getElementById("page3");
  const page4 = document.getElementById("page4");
  const pages = [page1, page2, page3, page4];
  const shadow1 = document.getElementById("shadow1");
  const shadow2 = document.getElementById("shadow2");
  const shadow3 = document.getElementById("shadow3");
  const shadow4 = document.getElementById("shadow4");
  const shadows = [shadow1, shadow2, shadow3, shadow4];
  const sections = document.querySelectorAll(".scroll-section");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const index = [...sections].indexOf(entry.target);

      pages.forEach((p, i) => {
        if (i === index - 1 && entry.isIntersecting) {
          p.classList.add("view");
          shadows[i].classList.add("view");
        } else {
          p.classList.remove("view");
          shadows[i].classList.remove("view");
        }
      });

    });
  }, { threshold: 0.8 });

  // 監視したいセクションだけを登録
  sections.forEach(sec => io.observe(sec));

});

