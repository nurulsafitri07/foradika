
const btn = document.getElementById('openBtn');
const cover = document.getElementById('cover');
const book = document.getElementById('book');

btn.addEventListener('click', () => {
  cover.style.opacity = '0';
  cover.style.transform = 'scale(0.98)';
  setTimeout(() => {
    cover.style.display = 'none';
    book.classList.remove('hidden');
    window.scrollTo({top:0, behavior:'smooth'});
  }, 350);
});
