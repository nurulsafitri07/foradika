const pages = Array.from(document.querySelectorAll('.page'));
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageIndicator = document.getElementById('pageIndicator');
const bookViewport = document.getElementById('bookViewport');

const candleArea = document.getElementById('candleArea');
const flameSpark = document.getElementById('flameSpark');

let currentIndex = 0;
const totalPages = pages.length;
let isFlipping = false;

// Interaktif Tiup Lilin
if (candleArea && flameSpark) {
  candleArea.addEventListener('click', (e) => {
    e.stopPropagation();
    flameSpark.classList.toggle('blown-out');
  });
}

function updateIndicator() {
  pageIndicator.innerText = `${currentIndex + 1} / ${totalPages}`;
}

function flipToNext() {
  if (isFlipping || currentIndex >= totalPages - 1) return;
  isFlipping = true;

  const currentPage = pages[currentIndex];
  const nextPage = pages[currentIndex + 1];

  // Jalankan animasi flip keluar
  currentPage.classList.add('flipping-next');

  setTimeout(() => {
    currentPage.classList.remove('active', 'flipping-next');
    nextPage.classList.add('active');
    currentIndex++;
    updateIndicator();
    isFlipping = false;
  }, 500);
}

function flipToPrev() {
  if (isFlipping || currentIndex <= 0) return;
  isFlipping = true;

  const currentPage = pages[currentIndex];
  const prevPage = pages[currentIndex - 1];

  currentPage.classList.remove('active');
  prevPage.classList.add('active', 'flipping-prev');

  setTimeout(() => {
    prevPage.classList.remove('flipping-prev');
    currentIndex--;
    updateIndicator();
    isFlipping = false;
  }, 500);
}

nextBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  flipToNext();
});

prevBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  flipToPrev();
});

// Tap sisi kanan = Next, tap sisi kiri = Prev
bookViewport.addEventListener('click', (e) => {
  const rect = bookViewport.getBoundingClientRect();
  const clickX = e.clientX - rect.left;

  if (clickX > rect.width / 2) {
    flipToNext();
  } else {
    flipToPrev();
  }
});

updateIndicator();
