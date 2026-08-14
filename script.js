document.addEventListener('DOMContentLoaded', () => {
  const pageFlip = new St.PageFlip(
    document.getElementById('flipbook'),
    {
      width: 370,
      height: 560,
      size: 'fixed',
      minWidth: 300,
      maxWidth: 500,
      minHeight: 400,
      maxHeight: 700,
      maxShadowOpacity: 0.5, // Menambahkan efek bayangan realistis saat kertas ditarik
      showCover: true,
      mobileScrollSupport: false
    }
  );

  // Load elemen-elemen halaman
  pageFlip.loadFromHTML(document.querySelectorAll('.page'));

  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const pageNum = document.getElementById('page-num');

  // Event handler untuk update angka halaman saat dibalik
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
