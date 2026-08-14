const pages = [...document.querySelectorAll(".page")];
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const counter = document.getElementById("counter");
const book = document.getElementById("book");

let current = 0;
const total = pages.length;

// Correct stacking: the page currently in front always sits above the next page.
// When a page flips, it moves behind the remaining unflipped pages.
function setStack() {
  pages.forEach((page, i) => {
    if (i < current) {
      page.style.zIndex = i + 1;
    } else {
      page.style.zIndex = total - i;
    }
  });
}

function updateUI() {
  counter.textContent =
    String(Math.min(current + 1, total)).padStart(2, "0") +
    " / " +
    String(total).padStart(2, "0");

  prevBtn.disabled = current === 0;
  nextBtn.disabled = current === total;
  setStack();
}

function goNext() {
  if (current >= total) return;

  // Put the turning page above everything while it rotates.
  pages[current].style.zIndex = total + 10;
  pages[current].classList.add("flipped");

  current++;

  // After the rotation starts, restore the correct stack.
  setTimeout(setStack, 80);
  updateUI();
}

function goPrev() {
  if (current <= 0) return;

  current--;

  // The page being returned must be above the other pages while rotating.
  pages[current].style.zIndex = total + 10;
  pages[current].classList.remove("flipped");

  setTimeout(setStack, 80);
  updateUI();
}

nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  goNext();
});

prevBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  goPrev();
});

// Tap zones are calculated relative to the actual book, not the screen.
let pointerStartX = 0;
let pointerStartY = 0;
let moved = false;

book.addEventListener("pointerdown", (e) => {
  pointerStartX = e.clientX;
  pointerStartY = e.clientY;
  moved = false;
});

book.addEventListener("pointermove", (e) => {
  if (
    Math.abs(e.clientX - pointerStartX) > 10 ||
    Math.abs(e.clientY - pointerStartY) > 10
  ) {
    moved = true;
  }
});

book.addEventListener("pointerup", (e) => {
  const dx = e.clientX - pointerStartX;
  const dy = e.clientY - pointerStartY;

  // Mobile swipe.
  if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
    if (dx < 0) goNext();
    else goPrev();
    return;
  }

  // Ignore accidental drag/tap after movement.
  if (moved) return;

  const rect = book.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const ratio = x / rect.width;

  // Only the outer 42% on either side is a page-turn zone.
  if (ratio >= 0.58) {
    goNext();
  } else if (ratio <= 0.42) {
    goPrev();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") goNext();
  if (e.key === "ArrowLeft") goPrev();
});

setStack();
updateUI();
