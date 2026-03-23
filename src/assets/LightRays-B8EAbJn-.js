import{j as Y}from"./motion-vendor-mP1pVv6d.js";import{r as a}from"./react-vendor-DULmSA1A.js";import{R as k,T as J,P as K,a as O}from"./3d-vendor-DWCWkvjD.js";const Q="#ffffff",B=l=>{const t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(l);return t?[parseInt(t[1],16)/255,parseInt(t[2],16)/255,parseInt(t[3],16)/255]:[1,1,1]},U=(l,t,s)=>{switch(l){case"top-left":return{anchor:[0,-.2*s],dir:[0,1]};case"top-right":return{anchor:[t,-.2*s],dir:[0,1]};case"left":return{anchor:[-.2*t,.5*s],dir:[1,0]};case"right":return{anchor:[(1+.2)*t,.5*s],dir:[-1,0]};case"bottom-left":return{anchor:[0,(1+.2)*s],dir:[0,-1]};case"bottom-center":return{anchor:[.5*t,(1+.2)*s],dir:[0,-1]};case"bottom-right":return{anchor:[t,(1+.2)*s],dir:[0,-1]};default:return{anchor:[.5*t,-.2*s],dir:[0,1]}}},te=({raysOrigin:l="top-center",raysColor:t=Q,raysSpeed:s=1,lightSpread:y=1,rayLength:C=2,pulsating:b=!1,fadeDistance:w=1,saturation:D=1,followMouse:S=!0,mouseInfluence:p=.1,noiseAmount:P=0,distortion:A=0,className:j=""})=>{const o=a.useRef(null),R=a.useRef(null),v=a.useRef(null),T=a.useRef({x:.5,y:.5}),g=a.useRef({x:.5,y:.5}),h=a.useRef(null),F=a.useRef(null),d=a.useRef(null),[z,q]=a.useState(!1),x=a.useRef(null);return a.useEffect(()=>{if(o.current)return x.current=new IntersectionObserver(r=>{const e=r[0];q(e.isIntersecting)},{threshold:.1}),x.current.observe(o.current),()=>{x.current&&(x.current.disconnect(),x.current=null)}},[]),a.useEffect(()=>!z||!o.current?void 0:(d.current&&(d.current(),d.current=null),(async()=>{if(!o.current||(await new Promise(i=>setTimeout(i,10)),!o.current))return;const e=new k({dpr:Math.min(window.devicePixelRatio,1.5),alpha:!0});v.current=e;const n=e.gl;for(n.canvas.style.width="100%",n.canvas.style.height="100%";o.current.firstChild;)o.current.removeChild(o.current.firstChild);o.current.appendChild(n.canvas);const m=`
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`,c=`precision highp float;

uniform float iTime;
uniform vec2  iResolution;

uniform vec2  rayPos;
uniform vec2  rayDir;
uniform vec3  raysColor;
uniform float raysSpeed;
uniform float lightSpread;
uniform float rayLength;
uniform float pulsating;
uniform float fadeDistance;
uniform float saturation;
uniform vec2  mousePos;
uniform float mouseInfluence;
uniform float noiseAmount;
uniform float distortion;

varying vec2 vUv;

float noise(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord,
                  float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  vec2 dirNorm = normalize(sourceToCoord);
  float cosAngle = dot(dirNorm, rayRefDirection);

  float distortedAngle = cosAngle + distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;
  
  float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));

  float distance = length(sourceToCoord);
  float maxDistance = iResolution.x * rayLength;
  float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);
  
  float fadeFalloff = clamp((iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance), 0.5, 1.0);
  float pulse = pulsating > 0.5 ? (0.8 + 0.2 * sin(iTime * speed * 3.0)) : 1.0;

  float baseStrength = clamp(
    (0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)),
    0.0, 1.0
  );

  return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);
  
  vec2 finalRayDir = rayDir;
  if (mouseInfluence > 0.0) {
    vec2 mouseScreenPos = mousePos * iResolution.xy;
    vec2 mouseDirection = normalize(mouseScreenPos - rayPos);
    finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
  }

  vec4 rays1 = vec4(1.0) *
               rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349,
                           1.5 * raysSpeed);
  vec4 rays2 = vec4(1.0) *
               rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234,
                           1.1 * raysSpeed);

  fragColor = rays1 * 0.5 + rays2 * 0.4;

  if (noiseAmount > 0.0) {
    float n = noise(coord * 0.01 + iTime * 0.1);
    fragColor.rgb *= (1.0 - noiseAmount + noiseAmount * n);
  }

  float brightness = 1.0 - (coord.y / iResolution.y);
  fragColor.x *= 0.1 + brightness * 0.8;
  fragColor.y *= 0.3 + brightness * 0.6;
  fragColor.z *= 0.5 + brightness * 0.5;

  if (saturation != 1.0) {
    float gray = dot(fragColor.rgb, vec3(0.299, 0.587, 0.114));
    fragColor.rgb = mix(vec3(gray), fragColor.rgb, saturation);
  }

  fragColor.rgb *= raysColor;
}

void main() {
  vec4 color;
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor  = color;
}`,u={iTime:{value:0},iResolution:{value:[1,1]},rayPos:{value:[0,0]},rayDir:{value:[0,1]},raysColor:{value:B(t)},raysSpeed:{value:s},lightSpread:{value:y},rayLength:{value:C},pulsating:{value:b?1:0},fadeDistance:{value:w},saturation:{value:D},mousePos:{value:[.5,.5]},mouseInfluence:{value:p},noiseAmount:{value:P},distortion:{value:A}};R.current=u;const E=new J(n),H=new K(n,{vertex:m,fragment:c,uniforms:u}),W=new O(n,{geometry:E,program:H});F.current=W;const L=()=>{if(!o.current||!e)return;e.dpr=Math.min(window.devicePixelRatio,1.5);const{clientWidth:i,clientHeight:f}=o.current;e.setSize(i,f);const _=e.dpr,G=i*_,N=f*_;u.iResolution.value=[G,N];const{anchor:$,dir:X}=U(l,G,N);u.rayPos.value=$,u.rayDir.value=X};let M=0;const V=1e3/30,I=i=>{if(!(!v.current||!R.current||!F.current)){if(i-M<V){h.current=requestAnimationFrame(I);return}M=i,u.iTime.value=i*.001,S&&p>0&&(g.current.x=g.current.x*.92+T.current.x*(1-.92),g.current.y=g.current.y*.92+T.current.y*(1-.92),u.mousePos.value=[g.current.x,g.current.y]);try{e.render({scene:W}),h.current=requestAnimationFrame(I)}catch(f){console.warn("WebGL rendering error:",f);return}}};window.addEventListener("resize",L),L(),h.current=requestAnimationFrame(I),d.current=()=>{if(h.current&&(cancelAnimationFrame(h.current),h.current=null),window.removeEventListener("resize",L),e)try{const i=e.gl.canvas,f=e.gl.getExtension("WEBGL_lose_context");f&&f.loseContext(),i&&i.parentNode&&i.parentNode.removeChild(i)}catch(i){console.warn("Error during WebGL cleanup:",i)}v.current=null,R.current=null,F.current=null}})(),()=>{d.current&&(d.current(),d.current=null)}),[z,l,t,s,y,C,b,w,D,S,p,P,A]),a.useEffect(()=>{if(!R.current||!o.current||!v.current)return;const r=R.current,e=v.current;r.raysColor.value=B(t),r.raysSpeed.value=s,r.lightSpread.value=y,r.rayLength.value=C,r.pulsating.value=b?1:0,r.fadeDistance.value=w,r.saturation.value=D,r.mouseInfluence.value=p,r.noiseAmount.value=P,r.distortion.value=A;const{clientWidth:n,clientHeight:m}=o.current,c=e.dpr,{anchor:u,dir:E}=U(l,n*c,m*c);r.rayPos.value=u,r.rayDir.value=E},[t,s,y,l,C,b,w,D,p,P,A]),a.useEffect(()=>{const r=e=>{if(!o.current||!v.current)return;const n=o.current.getBoundingClientRect(),m=(e.clientX-n.left)/n.width,c=(e.clientY-n.top)/n.height;T.current={x:m,y:c}};if(S){let e=0;const n=m=>{const c=Date.now();c-e<32||(e=c,r(m))};return window.addEventListener("mousemove",n,{passive:!0}),()=>window.removeEventListener("mousemove",n)}},[S]),Y.jsx("div",{ref:o,className:`light-rays-container ${j}`.trim()})};export{te as default};
