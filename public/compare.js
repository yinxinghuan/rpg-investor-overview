const paths={a:'./index.html',c:'./concept-c.html'};
const labels={a:'A 蓝金探索版',c:'C 创作平台版'};
const frame=document.querySelector('#live-preview');
let selected='a';
document.querySelectorAll('[data-preview]').forEach(button=>{
  button.addEventListener('click',()=>{
    const key=button.dataset.preview;
    if(key!==selected){frame.src=paths[key];selected=key;}
    frame.title=labels[key]+'完整交互预览';
    document.querySelectorAll('.preview-controls [data-preview]').forEach(item=>item.setAttribute('aria-pressed',String(item.dataset.preview===key)));
    if(button.closest('.option-actions'))document.querySelector('#preview').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
  });
});
document.querySelectorAll('[data-device]').forEach(button=>{
  button.addEventListener('click',()=>{
    frame.dataset.device=button.dataset.device;
    document.querySelectorAll('[data-device]').forEach(item=>{
      if(item.tagName==='BUTTON')item.setAttribute('aria-pressed',String(item===button));
    });
  });
});
const resize=new ResizeObserver(entries=>entries.forEach(({target,contentRect})=>{
  target.querySelector('iframe').style.transform='scale('+(contentRect.width/1200)+')';
}));
document.querySelectorAll('.mini-viewport').forEach(element=>resize.observe(element));
