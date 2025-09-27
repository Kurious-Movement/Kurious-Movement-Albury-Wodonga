document.addEventListener('DOMContentLoaded',()=>{
  const slideEls=document.querySelectorAll('.slide-up');
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in')}});
  },{threshold:.2});
  slideEls.forEach(el=>io.observe(el));
  const arrow=document.getElementById('bgArrow');
  if(arrow){window.addEventListener('scroll',()=>{
    const y=window.scrollY*0.25; arrow.style.transform=`translateY(${y}px)`;});
  }
});