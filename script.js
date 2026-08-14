const papers = Array.from(document.querySelectorAll('.paper'));
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageCounter = document.getElementById('pageCounter');
const flipbook = document.getElementById('flipbook');

const candleArea = document.getElementById('candleFlameArea');
const mainFlame = document.getElementById('mainFlame');

let currentLocation = 1;
const totalPapers = papers.length;
let isAnimating = false; // Mencegah spam klik yang bikin tumpuk

// Fitur Tiup Lilin
if (candleArea && mainFlame) {
  candleArea.addEventListener('click', (e) => {
    e.stopPropagation();
    mainFlame.classList.toggle('blown-out');
  });
}

function updateState() {
  papers.forEach((paper, index) => {
    const pageNum = index + 1;

    // Atur Z-Index & Visibility agar halaman lain tidak tembus
    if (paper.classList.contains('flipped')) {
      paper.style.zIndex = pageNum;
    } else {
      paper.style.zIndex = totalPapers - index;
    }

    // Hanya tampilkan halaman saat ini & halaman sebelumnya/sesudahnya yang relevan
    if (pageNum === currentLocation || pageNum === currentLocation - 1) {
      paper.classList.add('is-visible');
    } else {
      paper.classList.remove('is-visible');
    }
  });
}

function goNextPage() {
  if (isAnimating || currentLocation > totalPapers) return;
  isAnimating = true;

  const currentPaper = papers[currentLocation - 1];
  
  // Pastikan kertas target terlihat sebelum animasi jalan
  if (currentLocation < totalPapers) {
    papers[currentLocation].classList.add('is-visible');
  }

  currentPaper.style.zIndex = totalPapers + 10;
  currentPaper.classList.add('flipped');

  currentLocation++;
  updateCounter();

  setTimeout(() => {
    updateState();
    isAnimating = false;
  }, 750); // Sinkron dengan durasi CSS transition (0.75s)
}

function goPrevPage() {
  if (isAnimating || currentLocation <= 1) return;
  isAnimating = true;

  const prevPaper = papers[currentLocation - 2];
  
  // Kunci utama: jadikan kertas yang dibalik ke kanan sebagai prioritas tertinggi
  prevPaper.classList.add('is-visible');
  prevPaper.style.zIndex = totalPapers + 10;
  prevPaper.classList.remove('flipped');

  currentLocation--;
  updateCounter();

  setTimeout(() => {
    updateState();
    isAnimating = false;
  }, 750);
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

flipbook.addEventListener('click', (e) => {
  const rect = flipbook.getBoundingClientRect();
  const clickX = e.clientX - rect.left;

  if (clickX > rect.width / 2) {
    goNextPage();
  } else {
    goPrevPage();
  }
});

// Jalankan set awal
updateState();
