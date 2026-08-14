document.addEventListener('DOMContentLoaded', () => {
  const pageFlip = new St.PageFlip(
    document.getElementById('flipbook'),
    {
      width: 370,
      height: 560,
      size: 'fixed',
      minWidth: 370,
      maxWidth: 370,
      minHeight: 560,
      maxHeight: 560,
      maxShadowOpacity: 0.4,
      showCover: true,
      usePortrait: true,        // Memaksa mode 1 halaman di tengah (bukan 2 halaman menyamping)
      startPage: 0,
      drawShadow: true,
      flippingTime: 1000,       // Durasi membalik yang pas (1 detik)
      useMouseEvents: true,     // BIsa ditarik/drag sudut kertasnya
      mobileScrollSupport: false // MATIKAN SCROLL biar ga bisa di-scroll
    }
  );

  // Load elemen-elemen halaman
  pageFlip.loadFromHTML(document.querySelectorAll('.page'));

  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const pageNum = document.getElementById('page-num');

  // Update angka halaman pas dibalik
  pageFlip.on('flip', (e) => {
    pageNum.innerText = `${e.data + 1} / ${pageFlip.getPageCount()}`;
  });

  prevBtn.addEventListener('click', () => {
    pageFlip.flipPrev();
  });

  nextBtn.addEventListener('click', () => {
    pageFlip.flipNext();
  });
});
