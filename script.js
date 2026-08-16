document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. ELEMEN DOM & VARIABEL FLIPBOOK
  // ==========================================
  const papers = Array.from(document.querySelectorAll('.paper'));
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const pageIndicator = document.getElementById('page-indicator');

  let currentLocation = 1;
  const numOfPapers = papers.length;
  const maxLocation = numOfPapers + 1;

  // ==========================================
  // 2. FUNGSI LOGIKA FLIPBOOK
  // ==========================================
  function updateZIndex() {
    papers.forEach((paper, index) => {
      if (paper.classList.contains('flipped')) {
        paper.style.zIndex = index + 1;
      } else {
        paper.style.zIndex = numOfPapers - index;
      }
    });
  }

  function updateIndicator() {
    if (pageIndicator) {
      const currentShow = Math.min(currentLocation, numOfPapers);
      pageIndicator.innerText = `${currentShow} / ${numOfPapers}`;
    }
  }

  function goNextPage() {
    if (currentLocation < maxLocation) {
      const currentPaper = papers[currentLocation - 1];
      if (currentPaper) {
        currentPaper.classList.add('flipped');
        currentLocation++;
        updateZIndex();
        updateIndicator();
      }
    }
  }

  function goPrevPage() {
    if (currentLocation > 1) {
      const prevPaper = papers[currentLocation - 2];
      if (prevPaper) {
        prevPaper.classList.remove('flipped');
        currentLocation--;
        updateZIndex();
        updateIndicator();
      }
    }
  }

  // Event Listener Klik pada Lembaran Buku
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

  // Event Listener Tombol Navigasi Bawah
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      goPrevPage();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      goNextPage();
    });
  }

  // Inisialisasi awal flipbook
  updateZIndex();
  updateIndicator();

  // ==========================================
  // 3. LOGIKA PEMUTAR MUSIK (BACKGROUND MUSIC)
  // ==========================================
  const music = document.getElementById('bgMusic');
  const musicBtn = document.getElementById('musicToggle');
  let isPlaying = false;

  function toggleMusic() {
    if (!music) return;

    if (isPlaying) {
      music.pause();
      if (musicBtn) {
        musicBtn.classList.remove('playing');
        musicBtn.innerText = '🔇';
      }
      isPlaying = false;
    } else {
      music.play().then(() => {
        if (musicBtn) {
          musicBtn.classList.add('playing');
          musicBtn.innerText = '🎵';
        }
        isPlaying = true;
      }).catch((err) => {
        console.log('Audio autoplay blocked:', err);
      });
    }
  }

  if (musicBtn) {
    musicBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMusic();
    });
  }

  // Auto-play musik pada interaksi/klik pertama pengguna di layar
  document.addEventListener('click', function startAudioOnFirstClick() {
    if (!isPlaying && music) {
      music.play().then(() => {
        if (musicBtn) {
          musicBtn.classList.add('playing');
          musicBtn.innerText = '🎵';
        }
        isPlaying = true;
      }).catch(() => {});
    }
    document.removeEventListener('click', startAudioOnFirstClick);
  }, { once: true });
});
