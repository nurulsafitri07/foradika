const pages = [
  ...document.querySelectorAll(".page")
];

let index = 0;
let animating = false;

function render() {
  pages.forEach((page, i) => {
    page.style.zIndex = pages.length - i;

    if (i < index) {
      page.classList.add("flipped");
    } else {
      page.classList.remove("flipped");
    }
  });
}

function nextPage() {
  if (animating) return;
  if (index >= pages.length) return;

  animating = true;
  index++;

  render();

  setTimeout(() => {
    animating = false;
  }, 1400);
}

function previousPage() {
  if (animating) return;
  if (index <= 0) return;

  animating = true;
  index--;

  render();

  setTimeout(() => {
    animating = false;
  }, 1400);
}

document.addEventListener("click", (event) => {
  const x = event.clientX / window.innerWidth;

  if (x > 0.55) {
    nextPage();
  } else if (x < 0.45) {
    previousPage();
  }
});

render();
