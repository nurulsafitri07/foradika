const papers = Array.from(document.querySelectorAll('.paper'));
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageNum = document.getElementById('page-num');

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
  pageNum.innerText = `${currentLocation} / ${maxLocation}`;
}

prevBtn.onclick = goPrevPage;
nextBtn.onclick = goNextPage;

papers.forEach((paper) => {
  paper.onclick = (e) => {
    const rect = paper.getBoundingClientRect();
    const clickX = e.clientX - rect.left;

    if (clickX > rect.width / 2) {
      goNextPage();
    } else {
      goPrevPage();
    }
  };
});

updateZIndex();
