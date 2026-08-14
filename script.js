const papers = Array.from(document.querySelectorAll('.paper'));
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageNum = document.getElementById('page-num');

let currentLocation = 1;
const numOfPapers = papers.length;
const maxLocation = numOfPapers + 1;

// Mengatur tumpukan lembaran secara presisi saat animasi berjalan
function updateZIndex() {
  papers.forEach((paper, index) => {
    if (paper.classList.contains('flipped')) {
      // Kertas yang sudah dibalik ditumpuk sesuai urutannya di kiri
      paper.style.zIndex = index + 1;
    } else {
      // Kertas yang belum dibalik ditumpuk urut dari atas di kanan
      paper.style.zIndex = numOfPapers - index;
    }
  });
}

function goNextPage() {
  if (currentLocation < maxLocation) {
    const currentPaper = papers[currentLocation - 1];
    
    // Beri sedikit jeda z-index saat kertas membalik ke tengah
    currentPaper.style.zIndex = numOfPapers + 1;
    currentPaper.classList.add('flipped');
    
    setTimeout(() => {
      updateZIndex();
    }, 300); // Sinkron dengan pertengahan animasi flip

    currentLocation++;
    updateIndicator();
  }
}

function goPrevPage() {
  if (currentLocation > 1) {
    const prevPaper = papers[currentLocation - 2];
    
    prevPaper.style.zIndex = numOfPapers + 1;
    prevPaper.classList.remove('flipped');
    
    setTimeout(() => {
      updateZIndex();
    }, 300);

    currentLocation--;
    updateIndicator();
  }
}

function updateIndicator() {
  pageNum.innerText = `${currentLocation} / ${maxLocation}`;
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

prevBtn.addEventListener('click', goPrevPage);
nextBtn.addEventListener('click', goNextPage);

// Inisialisasi awal
updateZIndex();
