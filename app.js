const $ = id => document.getElementById(id);
const point=t=>[100+700*t,270-760*t*(1-t)];
const path=(from,to)=>Array.from({length:201},(_,i)=>{const [x,y]=point(from+(to-from)*i/200);return (i?'L':'M')+x+' '+y}).join(' ');
const split=650.76/1900;
$('route-base').setAttribute('d',path(0,1));
$('route-done').setAttribute('d',path(0,split));
$('route-supported').setAttribute('d',path(split,1));
$('route-stripes').setAttribute('d',path(split,1));
function position(t){const [x,y]=point(t);$('traveler').setAttribute('transform',`translate(${x} ${y})`);$('airplane').setAttribute('transform',`rotate(${Math.max(-18,Math.min(18,Math.atan2(1520*t-760,700)*180/Math.PI*.3))})`);}
position(1);
if(!matchMedia('(prefers-reduced-motion: reduce)').matches){const start=performance.now();function frame(now){const t=Math.min(1,(now-start)/1800);position(split+(1-split)*(1-Math.pow(1-t,3)));if(t<1)requestAnimationFrame(frame);}requestAnimationFrame(frame);}
let timer;
function toast(text){$('toast').textContent=text;$('toast').classList.add('show');clearTimeout(timer);timer=setTimeout(()=>$('toast').classList.remove('show'),3000);}
$('share').addEventListener('click',async()=>{const text='¡Lo logramos! 🇦🇷✈️ El pasaje a hackaTUM, Alemania, ya está comprado. Gracias a todos los que fueron parte. Este sábado a las 15:00 hs sorteamos las rifas en vivo desde @marcoaltum.\nhttps://marcooa22.github.io/rumbo-a-hackatum/';try{if(navigator.share){await navigator.share({title:'Lo logramos · Marco a hackaTUM',text});return;}await navigator.clipboard.writeText(text);toast('Mensaje copiado para compartir');}catch(e){if(e.name!=='AbortError')toast('Podés compartir desde el menú de tu navegador.');}});
