const slides = Array.from(document.querySelectorAll('.slide'));
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageNum = document.getElementById('page-num');

let currentIndex = 0;
const totalSlides = slides.length;

function showSlide(index) {
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });
  pageNum.innerText = `${index + 1} / ${totalSlides}`;
}

function nextSlide() {
  if (currentIndex < totalSlides - 1) {
    currentIndex++;
    showSlide(currentIndex);
  }
}

function prevSlide() {
  if (currentIndex > 0) {
    currentIndex--;
    showSlide(currentIndex);
  }
}

slides.forEach((slide) => {
  slide.addEventListener('click', (e) => {
    const rect = slide.getBoundingClientRect();
    const clickX = e.clientX - rect.left;

    if (clickX > rect.width / 2) {
      nextSlide();
    } else {
      prevSlide();
    }
  });
});

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

showSlide(currentIndex);
