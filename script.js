const pages = Array.from(document.querySelectorAll('.page-item'));
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageIndicator = document.getElementById('pageIndicator');
const bookCard = document.getElementById('bookCard');

let currentIndex = 0;
const totalPages = pages.length;

function renderPage(index) {
  pages.forEach((page, i) => {
    if (i === index) {
      page.classList.add('active');
    } else {
      page.classList.remove('active');
    }
  });
  pageIndicator.innerText = `${index + 1} / ${totalPages}`;
}

function nextPage() {
  if (currentIndex < totalPages - 1) {
    currentIndex++;
    renderPage(currentIndex);
  }
}

function prevPage() {
  if (currentIndex > 0) {
    currentIndex--;
    renderPage(currentIndex);
  }
}

nextBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  nextPage();
});

prevBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  prevPage();
});

// Tap sisi kanan = Next, tap sisi kiri = Prev
bookCard.addEventListener('click', (e) => {
  const rect = bookCard.getBoundingClientRect();
  const clickX = e.clientX - rect.left;

  if (clickX > rect.width / 2) {
    nextPage();
  } else {
    prevPage();
  }
});

// Inisialisasi awal
renderPage(currentIndex);
