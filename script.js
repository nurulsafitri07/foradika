const pages = Array.from(document.querySelectorAll('.page-item'));
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageCounter = document.getElementById('pageCounter');
const cardFrame = document.getElementById('cardFrame');

let currentPage = 0;
const totalPages = pages.length;

function renderPage(index) {
  pages.forEach((page, i) => {
    if (i === index) {
      page.classList.add('active');
    } else {
      page.classList.remove('active');
    }
  });
  pageCounter.innerText = `${index + 1} / ${totalPages}`;
}

function nextPage() {
  if (currentPage < totalPages - 1) {
    currentPage++;
    renderPage(currentPage);
  }
}

function prevPage() {
  if (currentPage > 0) {
    currentPage--;
    renderPage(currentPage);
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

// Tap sisi kanan kartu untuk Next, sisi kiri untuk Prev
cardFrame.addEventListener('click', (e) => {
  const rect = cardFrame.getBoundingClientRect();
  const clickX = e.clientX - rect.left;

  if (clickX > rect.width / 2) {
    nextPage();
  } else {
    prevPage();
  }
});

// Inisialisasi awal
renderPage(currentPage);
