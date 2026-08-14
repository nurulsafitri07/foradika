const sheets = Array.from(document.querySelectorAll('.sheet'));
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageNum = document.getElementById('page-num');

let currentIndex = 0;
const totalSheets = sheets.length;

function updateView() {
  sheets.forEach((sheet, index) => {
    sheet.classList.remove('active', 'flipped-out');

    if (index === currentIndex) {
      sheet.classList.add('active');
    } else if (index < currentIndex) {
      sheet.classList.add('flipped-out');
    }
  });

  pageNum.innerText = `${currentIndex + 1} / ${totalSheets}`;
}

function goNext() {
  if (currentIndex < totalSheets - 1) {
    currentIndex++;
    updateView();
  }
}

function goPrev() {
  if (currentIndex > 0) {
    currentIndex--;
    updateView();
  }
}

// Tap sisi kanan kartu untuk Next, sisi kiri untuk Prev
sheets.forEach((sheet) => {
  sheet.addEventListener('click', (e) => {
    const rect = sheet.getBoundingClientRect();
    const clickX = e.clientX - rect.left;

    if (clickX > rect.width / 2) {
      goNext();
    } else {
      goPrev();
    }
  });
});

prevBtn.onclick = goPrev;
nextBtn.onclick = goNext;

// Mulai halaman awal
updateView();
