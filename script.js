
const pages = Array.from(document.querySelectorAll('.page'));
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const current = document.getElementById('current');
const total = document.getElementById('total');

let index = 0;
total.textContent = pages.length;

function render(){
  pages.forEach((page,i)=>{
    page.style.zIndex = pages.length - i;
    if(i < index){
      page.classList.add('flipped');
    }else{
      page.classList.remove('flipped');
    }
  });
  current.textContent = index + 1;
}

next.addEventListener('click', ()=>{
  if(index < pages.length - 1){
    index++;
    render();
  }
});

prev.addEventListener('click', ()=>{
  if(index > 0){
    index--;
    render();
  }
});

render();
