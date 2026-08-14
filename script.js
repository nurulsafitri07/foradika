const papers = Array.from(document.querySelectorAll('.paper'));
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageCounter = document.getElementById('pageCounter');
const flipbook = document.getElementById('flipbook');

let currentLocation = 1;
const totalPapers = papers.length;

function updateZIndex() {
  papers.forEach((paper, index) => {
    if (paper.classList.contains('flipped')) {
      paper.style.zIndex = index + 1;
    } else {
      paper.style.zIndex = totalPapers - index;
    }
  });
}

function goNextPage() {
  if (currentLocation <= totalPapers) {
    const currentPaper = papers[currentLocation - 1];
    currentPaper.classList.add('flipped');
    currentLocation++;
    updateZIndex();
    updateCounter();
  }
}

function goPrevPage() {
  if (currentLocation > 1) {
    const prevPaper = papers[currentLocation - 2];
    prevPaper.classList.remove('flipped');
    currentLocation--;
    updateZIndex();
    updateCounter();
  }
}

function updateCounter() {
  const displayNum = Math.min(currentLocation, totalPapers);
  pageCounter.innerText = `${displayNum} / ${totalPapers}`;
}

nextBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  goNextPage();
});

prevBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  goPrevPage();
});

// Tap sisi kanan = Flip Maju, sisi kiri = Flip Balik
flipbook.addEventListener('click', (e) => {
  const rect = flipbook.getBoundingClientRect();
  const clickX = e.clientX - rect.left;

  if (clickX > rect.width / 2) {
    goNextPage();
  } else {
    goPrevPage();
  }
});

// Initialize
updateZIndex();
