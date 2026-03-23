import{j as u}from"./motion-vendor-mP1pVv6d.js";import{r as t}from"./react-vendor-DULmSA1A.js";import{u as be}from"./3d-vendor-DWCWkvjD.js";const we=[{src:"/IMG_6816.JPG",alt:"Abstract art"},{src:"/IMG_2907.JPG",alt:"Modern sculpture"},{src:"/IMG_2888.JPG",alt:"Digital artwork"},{src:"/IMG_2476.JPG",alt:"Contemporary art"},{src:"/IMG_6927.JPG",alt:"Geometric pattern"},{src:"/IMG_6922.JPG",alt:"Textured surface"},{src:"/IMG_2019.JPG",alt:"Social media image"}],V={maxVerticalRotationDeg:5,dragSensitivity:20,enlargeTransitionMs:300,segments:35},S=(n,g,R)=>Math.min(Math.max(n,g),R),me=n=>(n%360+360)%360,Re=n=>((n+180)%360+360)%360-180,O=(n,g,R)=>{const y=n.dataset[g]??n.getAttribute(`data-${g}`),G=y==null?NaN:parseFloat(y);return Number.isFinite(G)?G:R};function Me(n,g){const R=Array.from({length:g},(s,l)=>-37+l*2),y=[-4,-2,0,2,4],G=[-3,-1,1,3,5],z=R.flatMap((s,l)=>(l%2===0?y:G).map(K=>({x:s,y:K,sizeX:2,sizeY:2}))),k=z.length;if(n.length===0)return z.map(s=>({...s,src:"",alt:""}));n.length>k&&console.warn(`[DomeGallery] Provided image count (${n.length}) exceeds available tiles (${k}). Some images will not be shown.`);const P=n.map(s=>typeof s=="string"?{src:s,alt:""}:{src:s.src||"",alt:s.alt||""}),f=Array.from({length:k},(s,l)=>P[l%P.length]);for(let s=1;s<f.length;s++)if(f[s].src===f[s-1].src){for(let l=s+1;l<f.length;l++)if(f[l].src!==f[s].src){[f[s],f[l]]=[f[l],f[s]];break}}return z.map((s,l)=>({...s,src:f[l].src,alt:f[l].alt}))}function _e(n,g,R,y,G){const z=360/G/2,k=z*(n+(R-1)/2);return{rotateX:z*(g-(y-1)/2),rotateY:k}}function Ge({images:n=we,fit:g=.5,fitBasis:R="auto",minRadius:y=600,maxRadius:G=1/0,padFactor:z=.25,overlayBlurColor:k="#060010",maxVerticalRotationDeg:P=V.maxVerticalRotationDeg,dragSensitivity:f=V.dragSensitivity,enlargeTransitionMs:s=V.enlargeTransitionMs,segments:l=V.segments,dragDampening:U=2,openedImageWidth:K="400px",openedImageHeight:pe="400px",imageBorderRadius:Q="30px",openedImageBorderRadius:L="30px",grayscale:C=!0}){const j=t.useRef(null),B=t.useRef(null),oe=t.useRef(null),ce=t.useRef(null),he=t.useRef(null),le=t.useRef(null),A=t.useRef(null),ee=t.useRef(null),M=t.useRef({x:0,y:0}),te=t.useRef({x:0,y:0}),E=t.useRef(null),re=t.useRef(!1),F=t.useRef(!1),D=t.useRef(!1),X=t.useRef(null),T=t.useRef("mouse"),H=t.useRef(null),J=t.useRef(!1),ue=t.useRef(0),ge=t.useRef(0),q=t.useRef(!1),de=t.useCallback(()=>{q.current||(q.current=!0,document.body.classList.add("dg-scroll-lock"))},[]),W=t.useCallback(()=>{q.current&&j.current?.getAttribute("data-enlarging")!=="true"&&(q.current=!1,document.body.classList.remove("dg-scroll-lock"))},[]),xe=t.useMemo(()=>Me(n,l),[n,l]),Z=(e,r)=>{const x=oe.current;x&&(x.style.transform=`translateZ(calc(var(--radius) * -1)) rotateX(${e}deg) rotateY(${r}deg)`)},fe=t.useRef(null);t.useEffect(()=>{const e=j.current;if(!e)return;const r=new ResizeObserver(x=>{const i=x[0].contentRect,o=Math.max(1,i.width),a=Math.max(1,i.height),c=Math.min(o,a),p=Math.max(o,a),v=o/a;let h;switch(R){case"min":h=c;break;case"max":h=p;break;case"width":h=o;break;case"height":h=a;break;default:h=v>=1.3?o:c}let b=h*g;const d=a*1.35;b=Math.min(b,d),b=S(b,y,G),fe.current=Math.round(b);const m=Math.max(8,Math.round(c*z));e.style.setProperty("--radius",`${fe.current}px`),e.style.setProperty("--viewer-pad",`${m}px`),e.style.setProperty("--overlay-blur-color",k),e.style.setProperty("--tile-radius",Q),e.style.setProperty("--enlarge-radius",L),e.style.setProperty("--image-filter",C?"grayscale(1)":"none"),Z(M.current.x,M.current.y)});return r.observe(e),()=>r.disconnect()},[g,R,y,G,z,k,C,Q,L,K,pe]),t.useEffect(()=>{Z(M.current.x,M.current.y)},[]);const ne=t.useCallback(()=>{X.current&&(cancelAnimationFrame(X.current),X.current=null)},[]),ye=t.useCallback((e,r)=>{let i=S(e,-1.4,1.4)*80,o=S(r,-1.4,1.4)*80,a=0;const c=S(U??.6,0,1),p=.94+.055*c,v=.015-.01*c,h=Math.round(90+270*c),b=()=>{if(i*=p,o*=p,Math.abs(i)<v&&Math.abs(o)<v){X.current=null;return}if(++a>h){X.current=null;return}const d=S(M.current.x-o/200,-P,P),m=Re(M.current.y+i/200);M.current={x:d,y:m},Z(d,m),X.current=requestAnimationFrame(b)};ne(),X.current=requestAnimationFrame(b)},[U,P,ne]);be({onDragStart:({event:e})=>{if(A.current)return;ne();const r=e;T.current=r.pointerType||"mouse",T.current==="touch"&&r.preventDefault(),T.current==="touch"&&de(),re.current=!0,F.current=!1,D.current=!1,te.current={...M.current},E.current={x:r.clientX,y:r.clientY};const x=r.target.closest?.(".item__image");H.current=x||null},onDrag:({event:e,last:r,velocity:x=[0,0],direction:i=[0,0],movement:o})=>{if(A.current||!re.current||!E.current)return;const a=e;T.current==="touch"&&a.preventDefault();const c=a.clientX-E.current.x,p=a.clientY-E.current.y;D.current||c*c+p*p>16&&(D.current=!0);const v=S(te.current.x-p/f,-P,P),h=te.current.y+c/f,b=M.current;if((b.x!==v||b.y!==h)&&(M.current={x:v,y:h},Z(v,h)),r){re.current=!1;let d=!1;if(E.current){const _=a.clientX-E.current.x,N=a.clientY-E.current.y,ie=_*_+N*N,$=T.current==="touch"?10:6;ie<=$*$&&(d=!0)}let[m,se]=x;const[ae,w]=i;let I=m*ae,Y=se*w;if(!d&&Math.abs(I)<.001&&Math.abs(Y)<.001&&Array.isArray(o)){const[_,N]=o;I=_/f*.02,Y=N/f*.02}!d&&(Math.abs(I)>.005||Math.abs(Y)>.005)&&ye(I,Y),E.current=null,F.current=!d,d&&H.current&&!A.current&&ve(H.current),H.current=null,F.current&&setTimeout(()=>F.current=!1,120),T.current==="touch"&&W(),D.current&&(ge.current=performance.now()),D.current=!1}}},{target:B,eventOptions:{passive:!1}}),t.useEffect(()=>{const e=le.current;if(!e)return;const r=()=>{if(performance.now()-ue.current<250)return;const i=A.current;if(!i)return;const o=i.parentElement,a=document.body.querySelector(".enlarge");if(!a)return;const c=o.querySelector(".item__image--reference"),p=ee.current;if(!p){a.remove(),c&&c.remove(),o.style.setProperty("--rot-y-delta","0deg"),o.style.setProperty("--rot-x-delta","0deg"),i.style.visibility="",i.style.zIndex=0,A.current=null,j.current?.removeAttribute("data-enlarging"),J.current=!1;return}a.style.left=`${p.left}px`,a.style.top=`${p.top}px`,a.style.width=`${p.width}px`,a.style.height=`${p.height}px`,a.style.opacity="0";const v=()=>{a.remove(),ee.current=null,c&&c.remove(),o.style.transition="none",i.style.transition="none",o.style.setProperty("--rot-y-delta","0deg"),o.style.setProperty("--rot-x-delta","0deg"),i.style.visibility="",i.style.zIndex=0,i.removeAttribute("data-focused"),A.current=null,j.current?.removeAttribute("data-enlarging"),J.current=!1,W()};a.addEventListener("transitionend",v,{once:!0}),setTimeout(v,s+100)};e.addEventListener("click",r);const x=i=>{i.key==="Escape"&&r()};return window.addEventListener("keydown",x),()=>{e.removeEventListener("click",r),window.removeEventListener("keydown",x)}},[s,L,C,W]);const ve=e=>{if(J.current)return;J.current=!0,ue.current=performance.now(),de();const r=e.parentElement;A.current=e,e.setAttribute("data-focused","true");const x=O(r,"offsetX",0),i=O(r,"offsetY",0),o=O(r,"sizeX",2),a=O(r,"sizeY",2),c=_e(x,i,o,a,l),p=me(c.rotateY),v=me(M.current.y);let h=-(p+v)%360;h<-180&&(h+=360);const b=-c.rotateX-M.current.x;r.style.setProperty("--rot-y-delta",`${h}deg`),r.style.setProperty("--rot-x-delta",`${b}deg`);const d=document.createElement("div");d.className="item__image item__image--reference opacity-0",d.style.transform=`rotateX(${-c.rotateX}deg) rotateY(${-c.rotateY}deg)`,r.appendChild(d),d.offsetHeight;const m=d.getBoundingClientRect(),se=B.current?.getBoundingClientRect(),ae=ce.current?.getBoundingClientRect();if(!se||!ae||m.width<=0||m.height<=0){J.current=!1,A.current=null,r.removeChild(d),W();return}ee.current={left:m.left,top:m.top,width:m.width,height:m.height},e.style.visibility="hidden",e.style.zIndex=0;const w=document.createElement("div");w.className="enlarge";const I=window.innerWidth,Y=window.innerHeight,_=Math.min(I*.8,Y*.8,600);w.style.cssText=`
      position: fixed;
      width: ${_}px;
      height: ${_}px;
      opacity: 0;
      z-index: 9999;
      will-change: transform, opacity, width, height, left, top;
      transition: all ${s}ms ease;
      border-radius: ${L};
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,.5);
      left: ${m.left}px;
      top: ${m.top}px;
      width: ${m.width}px;
      height: ${m.height}px;
    `;const N=r.dataset.src||e.querySelector("img")?.src||"",ie=r.dataset.alt||e.querySelector("img")?.alt||"",$=document.createElement("img");$.src=N,$.alt=ie,$.style.cssText="width:100%; height:100%; object-fit:cover;",w.appendChild($),document.body.appendChild(w),w.offsetHeight,setTimeout(()=>{w.parentElement&&(w.style.opacity="1",w.style.left=`${(I-_)/2}px`,w.style.top=`${(Y-_)/2}px`,w.style.width=`${_}px`,w.style.height=`${_}px`,j.current?.setAttribute("data-enlarging","true"))},16)};return t.useEffect(()=>()=>{document.body.classList.remove("dg-scroll-lock")},[]),u.jsxs(u.Fragment,{children:[u.jsx("style",{dangerouslySetInnerHTML:{__html:`
    .dg-scroll-lock {
      overflow: hidden !important;
    }
    .sphere-root {
      --radius: 520px;
      --viewer-pad: 72px;
      --circ: calc(var(--radius) * 3.14);
      --rot-y: calc((360deg / var(--segments-x)) / 2);
      --rot-x: calc((360deg / var(--segments-y)) / 2);
      --item-width: calc(var(--circ) / var(--segments-x));
      --item-height: calc(var(--circ) / var(--segments-y));
    }
    
    .sphere-root * { box-sizing: border-box; }
    .sphere, .sphere-item, .item__image { transform-style: preserve-3d; }
    
    .stage {
      width: 100%;
      height: 100%;
      display: grid;
      place-items: center;
      position: absolute;
      inset: 0;
      margin: auto;
      perspective: calc(var(--radius) * 2);
      perspective-origin: 50% 50%;
    }
    
    .sphere {
      transform: translateZ(calc(var(--radius) * -1));
      will-change: transform;
      position: absolute;
    }
    
    .sphere-item {
      width: calc(var(--item-width) * var(--item-size-x));
      height: calc(var(--item-height) * var(--item-size-y));
      position: absolute;
      top: -999px;
      bottom: -999px;
      left: -999px;
      right: -999px;
      margin: auto;
      transform-origin: 50% 50%;
      backface-visibility: hidden;
      transition: transform 300ms;
      transform: rotateY(calc(var(--rot-y) * (var(--offset-x) + ((var(--item-size-x) - 1) / 2)) + var(--rot-y-delta, 0deg))) 
                 rotateX(calc(var(--rot-x) * (var(--offset-y) - ((var(--item-size-y) - 1) / 2)) + var(--rot-x-delta, 0deg))) 
                 translateZ(var(--radius));
    }
    
    .sphere-root[data-enlarging="true"] .scrim {
      opacity: 1 !important;
      pointer-events: all !important;
    }
    
    @media (max-aspect-ratio: 1/1) {
      .viewer-frame {
        height: 80% !important;
        width: 80% !important;
        aspect-ratio: auto !important;
      }
    }
    
    .item__image {
      position: absolute;
      inset: 10px;
      border-radius: var(--tile-radius, 12px);
      overflow: hidden;
      cursor: pointer;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      transition: transform 300ms;
      pointer-events: auto;
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
    }
    .item__image--reference {
      position: absolute;
      inset: 10px;
      pointer-events: none;
    }
    
    .item__image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: var(--image-filter, none);
      transition: filter 300ms, transform 300ms;
    }
    
    .item__image:hover img {
      transform: scale(1.05);
    }
    
    .enlarge {
      position: fixed !important;
      top: 50% !important;
      left: 50% !important;
      transform: translate(-50%, -50%) !important;
      z-index: 9999 !important;
    }
    
    .enlarge img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .scrim {
      position: fixed;
      inset: 0;
      background: var(--overlay-blur-color, rgba(0,0,0,0.9));
      opacity: 0;
      pointer-events: none;
      transition: opacity 300ms;
      z-index: 9997;
    }
    
    .viewer-frame {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: min(80vw, 600px);
      height: min(80vh, 600px);
      z-index: 9998;
      pointer-events: none;
    }
  `}}),u.jsxs("div",{ref:j,className:"sphere-root relative h-full w-full",style:{"--segments-x":l,"--segments-y":l,"--overlay-blur-color":k,"--tile-radius":Q,"--enlarge-radius":L,"--image-filter":C?"grayscale(1)":"none"},children:[u.jsx("div",{ref:B,className:"stage touch-none",children:u.jsx("div",{ref:oe,className:"sphere",children:xe.map((e,r)=>u.jsx("div",{className:"sphere-item","data-offset-x":e.x,"data-offset-y":e.y,"data-size-x":e.sizeX,"data-size-y":e.sizeY,"data-src":e.src,"data-alt":e.alt,style:{"--offset-x":e.x,"--offset-y":e.y,"--item-size-x":e.sizeX,"--item-size-y":e.sizeY},children:u.jsx("div",{className:"item__image",children:e.src&&u.jsx("img",{src:e.src,alt:e.alt,loading:"lazy",draggable:!1})})},r))})}),u.jsx("div",{ref:le,className:"scrim"}),u.jsx("div",{ref:he,className:"viewer-frame",children:u.jsx("div",{ref:ce,className:"w-full h-full"})})]})]})}const Ee=()=>{const[n,g]=t.useState(!1);t.useEffect(()=>{const y=()=>g(window.innerWidth<768);return y(),window.addEventListener("resize",y),()=>window.removeEventListener("resize",y)},[]);const R=[{src:"/IMG_6816.JPG",alt:"Hackathon event"},{src:"/IMG_2907.JPG",alt:"Team collaboration"},{src:"/IMG_2888.JPG",alt:"Coding session"},{src:"/IMG_2476.JPG",alt:"Presentation"},{src:"/IMG_6927.JPG",alt:"Workshop"},{src:"/IMG_6922.JPG",alt:"Networking"},{src:"/IMG_2019.JPG",alt:"Awards ceremony"}];return u.jsxs("section",{id:"gallery",className:"relative py-24 overflow-hidden",children:[u.jsx("div",{className:"container mx-auto px-6 mb-16 md:mb-48 relative z-20 pointer-events-none",children:u.jsxs("div",{className:"text-center",children:[u.jsx("h2",{className:"text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4",children:u.jsx("span",{className:"text-primary",children:"GALLERY"})}),u.jsx("p",{className:"text-gray-400 text-lg max-w-2xl mx-auto",children:"Moments captured from our previous events and hackathons"})]})}),u.jsx("div",{className:"w-full h-[50vh] min-h-[350px] md:h-[70vh] md:min-h-[500px] relative z-10",children:u.jsx(Ge,{images:R,fit:n?.85:.6,fitBasis:"auto",minRadius:n?180:400,maxRadius:n?350:800,padFactor:.2,overlayBlurColor:"rgba(0, 0, 0, 0.9)",maxVerticalRotationDeg:n?5:8,dragSensitivity:n?10:18,enlargeTransitionMs:n?250:350,segments:n?12:30,dragDampening:1.5,openedImageWidth:n?"85vw":"500px",openedImageHeight:n?"85vw":"500px",imageBorderRadius:"16px",openedImageBorderRadius:"12px",grayscale:!1})})]})};export{Ee as GallerySection,Ee as default};
