const pages = [...document.querySelectorAll('.page')];
let current = 0;

function turnNext(){
  if(current < pages.length){
    pages[current].classList.add('flipped');
    current++;
  }
}
function turnPrev(){
  if(current > 0){
    current--;
    pages[current].classList.remove('flipped');
  }
}
document.addEventListener('click', e => {
  const x = e.clientX / window.innerWidth;
  if(x > .55) turnNext();
  else if(x < .45) turnPrev();
});
document.addEventListener('keydown', e => {
  if(e.key === 'ArrowRight') turnNext();
  if(e.key === 'ArrowLeft') turnPrev();
});
