const papers = Array.from(document.querySelectorAll('.paper'));
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageIndicator = document.getElementById('page-indicator');
const flipbook = document.getElementById('flipbook');

const candleArea = document.getElementById('candleArea');
const mainFlame = document.getElementById('mainFlame');

let currentLocation = 1;
const totalPapers = papers.length;
const maxLocation = totalPapers + 1;

// Fitur Interaktif Tiup Lilin
if (candleArea && mainFlame) {
  candleArea.addEventListener('click', (e) => {
    e.stopPropagation();
    mainFlame.classList.toggle('blown-out');
  });
}

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
  const displayNum = Math.min(currentLocation, totalPapers);
  pageIndicator.innerText = `${displayNum} / ${totalPapers}`;
}

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

// Setup Z-Index Awal
updateZIndex();
