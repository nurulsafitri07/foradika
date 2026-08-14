const papers = Array.from(document.querySelectorAll('.paper'));
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageIndicator = document.getElementById('page-indicator');

let currentLocation = 1;
const numOfPapers = papers.length;
const maxLocation = numOfPapers + 1;

function updateZIndex() {
  papers.forEach((paper, index) => {
    if (paper.classList.contains('flipped')) {
      paper.style.zIndex = index + 1;
    } else {
      paper.style.zIndex = numOfPapers - index;
    }
  });
}

function goNextPage() {
  if (currentLocation < maxLocation) {
    const currentPaper = papers[currentLocation - 1];
    currentPaper.classList.add('flipped');
    currentLocation++;
    updateZIndex();
    updateIndicator();
  }
}

function goPrevPage() {
  if (currentLocation > 1) {
    const prevPaper = papers[currentLocation - 2];
    prevPaper.classList.remove('flipped');
    currentLocation--;
    updateZIndex();
    updateIndicator();
  }
}

function updateIndicator() {
  const currentShow = Math.min(currentLocation, numOfPapers);
  pageIndicator.innerText = `${currentShow} / ${numOfPapers}`;
}

// Navigasi tap kanan/kiri area buku
papers.forEach((paper) => {
  paper.addEventListener('click', (e) => {
    const rect = paper.getBoundingClientRect();
    const clickX = e.clientX - rect.left;

    if (clickX > rect.width / 2) {
      goNextPage();
    } else {
      goPrevPage();
    }
  });
});

prevBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  goPrevPage();
});

nextBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  goNextPage();
});

// Setup Z-Index awal
updateZIndex();
