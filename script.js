const pages=[...document.querySelectorAll(".page")];
const nextBtn=document.getElementById("next"),prevBtn=document.getElementById("prev"),counter=document.getElementById("counter"),book=document.getElementById("book");
let current=0;

function update(){
  counter.textContent=String(Math.min(current+1,pages.length)).padStart(2,"0")+" / "+String(pages.length).padStart(2,"0");
  prevBtn.disabled=current===0;
  nextBtn.disabled=current===pages.length;
}
function next(){if(current<pages.length){pages[current].classList.add("flipped");current++;update();}}
function prev(){if(current>0){current--;pages[current].classList.remove("flipped");update();}}
nextBtn.addEventListener("click",e=>{e.stopPropagation();next()});
prevBtn.addEventListener("click",e=>{e.stopPropagation();prev()});

let startX=0,startY=0;
book.addEventListener("pointerdown",e=>{startX=e.clientX;startY=e.clientY});
book.addEventListener("pointerup",e=>{
  const dx=e.clientX-startX,dy=e.clientY-startY;
  if(Math.abs(dx)>45 && Math.abs(dx)>Math.abs(dy)){dx<0?next():prev();return}
  const r=book.getBoundingClientRect(),x=e.clientX-r.left;
  if(x>r.width*.58) next();
  else if(x<r.width*.42) prev();
});
document.addEventListener("keydown",e=>{if(e.key==="ArrowRight")next();if(e.key==="ArrowLeft")prev()});
update();
