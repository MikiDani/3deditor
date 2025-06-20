(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Po="176",Mu=0,sl=1,Su=2,cc=1,yu=2,ai=3,bi=0,vn=1,Wn=2,Ei=0,_r=1,al=2,ol=3,ll=4,Eu=5,Hi=100,Tu=101,bu=102,Au=103,wu=104,Cu=200,Ru=201,Pu=202,Du=203,Ha=204,ka=205,Lu=206,Uu=207,Iu=208,Nu=209,Fu=210,Ou=211,Bu=212,zu=213,Hu=214,Va=0,Ga=1,Wa=2,xr=3,Xa=4,qa=5,Ya=6,ja=7,Do=0,ku=1,Vu=2,Ti=0,Gu=1,Wu=2,Xu=3,qu=4,Yu=5,ju=6,$u=7,uc=300,Mr=301,Sr=302,$a=303,Ka=304,qs=306,jr=1e3,Vi=1001,Za=1002,En=1003,Ku=1004,ds=1005,Xn=1006,ua=1007,Gi=1008,Yn=1009,fc=1010,hc=1011,$r=1012,Lo=1013,qi=1014,oi=1015,ts=1016,Uo=1017,Io=1018,Kr=1020,dc=35902,pc=1021,mc=1022,Fn=1023,Zr=1026,Jr=1027,gc=1028,No=1029,_c=1030,Fo=1031,Oo=1033,Ns=33776,Fs=33777,Os=33778,Bs=33779,Ja=35840,Qa=35841,eo=35842,to=35843,no=36196,io=37492,ro=37496,so=37808,ao=37809,oo=37810,lo=37811,co=37812,uo=37813,fo=37814,ho=37815,po=37816,mo=37817,go=37818,_o=37819,vo=37820,xo=37821,zs=36492,Mo=36494,So=36495,vc=36283,yo=36284,Eo=36285,To=36286,Zu=3200,Ju=3201,xc=0,Qu=1,yi="",Cn="srgb",yr="srgb-linear",Gs="linear",It="srgb",Qi=7680,cl=519,ef=512,tf=513,nf=514,Mc=515,rf=516,sf=517,af=518,of=519,ul=35044,fl="300 es",li=2e3,Ws=2001;class Ar{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const a=s.indexOf(t);a!==-1&&s.splice(a,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let a=0,c=s.length;a<c;a++)s[a].call(this,e);e.target=null}}}const an=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let hl=1234567;const Xr=Math.PI/180,Qr=180/Math.PI;function wr(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(an[i&255]+an[i>>8&255]+an[i>>16&255]+an[i>>24&255]+"-"+an[e&255]+an[e>>8&255]+"-"+an[e>>16&15|64]+an[e>>24&255]+"-"+an[t&63|128]+an[t>>8&255]+"-"+an[t>>16&255]+an[t>>24&255]+an[n&255]+an[n>>8&255]+an[n>>16&255]+an[n>>24&255]).toLowerCase()}function xt(i,e,t){return Math.max(e,Math.min(t,i))}function Bo(i,e){return(i%e+e)%e}function lf(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function cf(i,e,t){return i!==e?(t-i)/(e-i):0}function qr(i,e,t){return(1-t)*i+t*e}function uf(i,e,t,n){return qr(i,e,1-Math.exp(-t*n))}function ff(i,e=1){return e-Math.abs(Bo(i,e*2)-e)}function hf(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function df(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function pf(i,e){return i+Math.floor(Math.random()*(e-i+1))}function mf(i,e){return i+Math.random()*(e-i)}function gf(i){return i*(.5-Math.random())}function _f(i){i!==void 0&&(hl=i);let e=hl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function vf(i){return i*Xr}function xf(i){return i*Qr}function Mf(i){return(i&i-1)===0&&i!==0}function Sf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function yf(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Ef(i,e,t,n,s){const a=Math.cos,c=Math.sin,u=a(t/2),d=c(t/2),p=a((e+n)/2),g=c((e+n)/2),_=a((e-n)/2),M=c((e-n)/2),y=a((n-e)/2),T=c((n-e)/2);switch(s){case"XYX":i.set(u*g,d*_,d*M,u*p);break;case"YZY":i.set(d*M,u*g,d*_,u*p);break;case"ZXZ":i.set(d*_,d*M,u*g,u*p);break;case"XZX":i.set(u*g,d*T,d*y,u*p);break;case"YXY":i.set(d*y,u*g,d*T,u*p);break;case"ZYZ":i.set(d*T,d*y,u*g,u*p);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function dr(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function fn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Yr={DEG2RAD:Xr,RAD2DEG:Qr,generateUUID:wr,clamp:xt,euclideanModulo:Bo,mapLinear:lf,inverseLerp:cf,lerp:qr,damp:uf,pingpong:ff,smoothstep:hf,smootherstep:df,randInt:pf,randFloat:mf,randFloatSpread:gf,seededRandom:_f,degToRad:vf,radToDeg:xf,isPowerOfTwo:Mf,ceilPowerOfTwo:Sf,floorPowerOfTwo:yf,setQuaternionFromProperEuler:Ef,normalize:fn,denormalize:dr};class Ct{constructor(e=0,t=0){Ct.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=xt(this.x,e.x,t.x),this.y=xt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=xt(this.x,e,t),this.y=xt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(xt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(xt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),a=this.x-e.x,c=this.y-e.y;return this.x=a*n-c*s+e.x,this.y=a*s+c*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class rt{constructor(e,t,n,s,a,c,u,d,p){rt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,a,c,u,d,p)}set(e,t,n,s,a,c,u,d,p){const g=this.elements;return g[0]=e,g[1]=s,g[2]=u,g[3]=t,g[4]=a,g[5]=d,g[6]=n,g[7]=c,g[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,a=this.elements,c=n[0],u=n[3],d=n[6],p=n[1],g=n[4],_=n[7],M=n[2],y=n[5],T=n[8],w=s[0],S=s[3],m=s[6],O=s[1],N=s[4],L=s[7],q=s[2],V=s[5],l=s[8];return a[0]=c*w+u*O+d*q,a[3]=c*S+u*N+d*V,a[6]=c*m+u*L+d*l,a[1]=p*w+g*O+_*q,a[4]=p*S+g*N+_*V,a[7]=p*m+g*L+_*l,a[2]=M*w+y*O+T*q,a[5]=M*S+y*N+T*V,a[8]=M*m+y*L+T*l,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],a=e[3],c=e[4],u=e[5],d=e[6],p=e[7],g=e[8];return t*c*g-t*u*p-n*a*g+n*u*d+s*a*p-s*c*d}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],a=e[3],c=e[4],u=e[5],d=e[6],p=e[7],g=e[8],_=g*c-u*p,M=u*d-g*a,y=p*a-c*d,T=t*_+n*M+s*y;if(T===0)return this.set(0,0,0,0,0,0,0,0,0);const w=1/T;return e[0]=_*w,e[1]=(s*p-g*n)*w,e[2]=(u*n-s*c)*w,e[3]=M*w,e[4]=(g*t-s*d)*w,e[5]=(s*a-u*t)*w,e[6]=y*w,e[7]=(n*d-p*t)*w,e[8]=(c*t-n*a)*w,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,a,c,u){const d=Math.cos(a),p=Math.sin(a);return this.set(n*d,n*p,-n*(d*c+p*u)+c+e,-s*p,s*d,-s*(-p*c+d*u)+u+t,0,0,1),this}scale(e,t){return this.premultiply(fa.makeScale(e,t)),this}rotate(e){return this.premultiply(fa.makeRotation(-e)),this}translate(e,t){return this.premultiply(fa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const fa=new rt;function Sc(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function es(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Tf(){const i=es("canvas");return i.style.display="block",i}const dl={};function Hs(i){i in dl||(dl[i]=!0,console.warn(i))}function bf(i,e,t){return new Promise(function(n,s){function a(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:n()}}setTimeout(a,t)})}function Af(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function wf(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const pl=new rt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ml=new rt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Cf(){const i={enabled:!0,workingColorSpace:yr,spaces:{},convert:function(s,a,c){return this.enabled===!1||a===c||!a||!c||(this.spaces[a].transfer===It&&(s.r=ci(s.r),s.g=ci(s.g),s.b=ci(s.b)),this.spaces[a].primaries!==this.spaces[c].primaries&&(s.applyMatrix3(this.spaces[a].toXYZ),s.applyMatrix3(this.spaces[c].fromXYZ)),this.spaces[c].transfer===It&&(s.r=vr(s.r),s.g=vr(s.g),s.b=vr(s.b))),s},fromWorkingColorSpace:function(s,a){return this.convert(s,this.workingColorSpace,a)},toWorkingColorSpace:function(s,a){return this.convert(s,a,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===yi?Gs:this.spaces[s].transfer},getLuminanceCoefficients:function(s,a=this.workingColorSpace){return s.fromArray(this.spaces[a].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,a,c){return s.copy(this.spaces[a].toXYZ).multiply(this.spaces[c].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[yr]:{primaries:e,whitePoint:n,transfer:Gs,toXYZ:pl,fromXYZ:ml,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Cn},outputColorSpaceConfig:{drawingBufferColorSpace:Cn}},[Cn]:{primaries:e,whitePoint:n,transfer:It,toXYZ:pl,fromXYZ:ml,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Cn}}}),i}const At=Cf();function ci(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function vr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let er;class Rf{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{er===void 0&&(er=es("canvas")),er.width=e.width,er.height=e.height;const s=er.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=er}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=es("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),a=s.data;for(let c=0;c<a.length;c++)a[c]=ci(a[c]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ci(t[n]/255)*255):t[n]=ci(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Pf=0;class zo{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Pf++}),this.uuid=wr(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let a;if(Array.isArray(s)){a=[];for(let c=0,u=s.length;c<u;c++)s[c].isDataTexture?a.push(ha(s[c].image)):a.push(ha(s[c]))}else a=ha(s);n.url=a}return t||(e.images[this.uuid]=n),n}}function ha(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Rf.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Df=0;class dn extends Ar{constructor(e=dn.DEFAULT_IMAGE,t=dn.DEFAULT_MAPPING,n=Vi,s=Vi,a=Xn,c=Gi,u=Fn,d=Yn,p=dn.DEFAULT_ANISOTROPY,g=yi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Df++}),this.uuid=wr(),this.name="",this.source=new zo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=a,this.minFilter=c,this.anisotropy=p,this.format=u,this.internalFormat=null,this.type=d,this.offset=new Ct(0,0),this.repeat=new Ct(1,1),this.center=new Ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new rt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=g,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isTextureArray=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isTextureArray=e.isTextureArray,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==uc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case jr:e.x=e.x-Math.floor(e.x);break;case Vi:e.x=e.x<0?0:1;break;case Za:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case jr:e.y=e.y-Math.floor(e.y);break;case Vi:e.y=e.y<0?0:1;break;case Za:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}dn.DEFAULT_IMAGE=null;dn.DEFAULT_MAPPING=uc;dn.DEFAULT_ANISOTROPY=1;class Nt{constructor(e=0,t=0,n=0,s=1){Nt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,a=this.w,c=e.elements;return this.x=c[0]*t+c[4]*n+c[8]*s+c[12]*a,this.y=c[1]*t+c[5]*n+c[9]*s+c[13]*a,this.z=c[2]*t+c[6]*n+c[10]*s+c[14]*a,this.w=c[3]*t+c[7]*n+c[11]*s+c[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,a;const d=e.elements,p=d[0],g=d[4],_=d[8],M=d[1],y=d[5],T=d[9],w=d[2],S=d[6],m=d[10];if(Math.abs(g-M)<.01&&Math.abs(_-w)<.01&&Math.abs(T-S)<.01){if(Math.abs(g+M)<.1&&Math.abs(_+w)<.1&&Math.abs(T+S)<.1&&Math.abs(p+y+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const N=(p+1)/2,L=(y+1)/2,q=(m+1)/2,V=(g+M)/4,l=(_+w)/4,Y=(T+S)/4;return N>L&&N>q?N<.01?(n=0,s=.707106781,a=.707106781):(n=Math.sqrt(N),s=V/n,a=l/n):L>q?L<.01?(n=.707106781,s=0,a=.707106781):(s=Math.sqrt(L),n=V/s,a=Y/s):q<.01?(n=.707106781,s=.707106781,a=0):(a=Math.sqrt(q),n=l/a,s=Y/a),this.set(n,s,a,t),this}let O=Math.sqrt((S-T)*(S-T)+(_-w)*(_-w)+(M-g)*(M-g));return Math.abs(O)<.001&&(O=1),this.x=(S-T)/O,this.y=(_-w)/O,this.z=(M-g)/O,this.w=Math.acos((p+y+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=xt(this.x,e.x,t.x),this.y=xt(this.y,e.y,t.y),this.z=xt(this.z,e.z,t.z),this.w=xt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=xt(this.x,e,t),this.y=xt(this.y,e,t),this.z=xt(this.z,e,t),this.w=xt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(xt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Lf extends Ar{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth?n.depth:1,this.scissor=new Nt(0,0,e,t),this.scissorTest=!1,this.viewport=new Nt(0,0,e,t);const s={width:e,height:t,depth:this.depth};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Xn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,multiview:!1},n);const a=new dn(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);a.flipY=!1,a.generateMipmaps=n.generateMipmaps,a.internalFormat=n.internalFormat,this.textures=[];const c=n.count;for(let u=0;u<c;u++)this.textures[u]=a.clone(),this.textures[u].isRenderTargetTexture=!0,this.textures[u].renderTarget=this;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,a=this.textures.length;s<a;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new zo(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Yi extends Lf{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class yc extends dn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=En,this.minFilter=En,this.wrapR=Vi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Uf extends dn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=En,this.minFilter=En,this.wrapR=Vi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ns{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,a,c,u){let d=n[s+0],p=n[s+1],g=n[s+2],_=n[s+3];const M=a[c+0],y=a[c+1],T=a[c+2],w=a[c+3];if(u===0){e[t+0]=d,e[t+1]=p,e[t+2]=g,e[t+3]=_;return}if(u===1){e[t+0]=M,e[t+1]=y,e[t+2]=T,e[t+3]=w;return}if(_!==w||d!==M||p!==y||g!==T){let S=1-u;const m=d*M+p*y+g*T+_*w,O=m>=0?1:-1,N=1-m*m;if(N>Number.EPSILON){const q=Math.sqrt(N),V=Math.atan2(q,m*O);S=Math.sin(S*V)/q,u=Math.sin(u*V)/q}const L=u*O;if(d=d*S+M*L,p=p*S+y*L,g=g*S+T*L,_=_*S+w*L,S===1-u){const q=1/Math.sqrt(d*d+p*p+g*g+_*_);d*=q,p*=q,g*=q,_*=q}}e[t]=d,e[t+1]=p,e[t+2]=g,e[t+3]=_}static multiplyQuaternionsFlat(e,t,n,s,a,c){const u=n[s],d=n[s+1],p=n[s+2],g=n[s+3],_=a[c],M=a[c+1],y=a[c+2],T=a[c+3];return e[t]=u*T+g*_+d*y-p*M,e[t+1]=d*T+g*M+p*_-u*y,e[t+2]=p*T+g*y+u*M-d*_,e[t+3]=g*T-u*_-d*M-p*y,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,a=e._z,c=e._order,u=Math.cos,d=Math.sin,p=u(n/2),g=u(s/2),_=u(a/2),M=d(n/2),y=d(s/2),T=d(a/2);switch(c){case"XYZ":this._x=M*g*_+p*y*T,this._y=p*y*_-M*g*T,this._z=p*g*T+M*y*_,this._w=p*g*_-M*y*T;break;case"YXZ":this._x=M*g*_+p*y*T,this._y=p*y*_-M*g*T,this._z=p*g*T-M*y*_,this._w=p*g*_+M*y*T;break;case"ZXY":this._x=M*g*_-p*y*T,this._y=p*y*_+M*g*T,this._z=p*g*T+M*y*_,this._w=p*g*_-M*y*T;break;case"ZYX":this._x=M*g*_-p*y*T,this._y=p*y*_+M*g*T,this._z=p*g*T-M*y*_,this._w=p*g*_+M*y*T;break;case"YZX":this._x=M*g*_+p*y*T,this._y=p*y*_+M*g*T,this._z=p*g*T-M*y*_,this._w=p*g*_-M*y*T;break;case"XZY":this._x=M*g*_-p*y*T,this._y=p*y*_-M*g*T,this._z=p*g*T+M*y*_,this._w=p*g*_+M*y*T;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+c)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],a=t[8],c=t[1],u=t[5],d=t[9],p=t[2],g=t[6],_=t[10],M=n+u+_;if(M>0){const y=.5/Math.sqrt(M+1);this._w=.25/y,this._x=(g-d)*y,this._y=(a-p)*y,this._z=(c-s)*y}else if(n>u&&n>_){const y=2*Math.sqrt(1+n-u-_);this._w=(g-d)/y,this._x=.25*y,this._y=(s+c)/y,this._z=(a+p)/y}else if(u>_){const y=2*Math.sqrt(1+u-n-_);this._w=(a-p)/y,this._x=(s+c)/y,this._y=.25*y,this._z=(d+g)/y}else{const y=2*Math.sqrt(1+_-n-u);this._w=(c-s)/y,this._x=(a+p)/y,this._y=(d+g)/y,this._z=.25*y}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(xt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,a=e._z,c=e._w,u=t._x,d=t._y,p=t._z,g=t._w;return this._x=n*g+c*u+s*p-a*d,this._y=s*g+c*d+a*u-n*p,this._z=a*g+c*p+n*d-s*u,this._w=c*g-n*u-s*d-a*p,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,a=this._z,c=this._w;let u=c*e._w+n*e._x+s*e._y+a*e._z;if(u<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,u=-u):this.copy(e),u>=1)return this._w=c,this._x=n,this._y=s,this._z=a,this;const d=1-u*u;if(d<=Number.EPSILON){const y=1-t;return this._w=y*c+t*this._w,this._x=y*n+t*this._x,this._y=y*s+t*this._y,this._z=y*a+t*this._z,this.normalize(),this}const p=Math.sqrt(d),g=Math.atan2(p,u),_=Math.sin((1-t)*g)/p,M=Math.sin(t*g)/p;return this._w=c*_+this._w*M,this._x=n*_+this._x*M,this._y=s*_+this._y*M,this._z=a*_+this._z*M,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),a=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class X{constructor(e=0,t=0,n=0){X.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(gl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(gl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,a=e.elements;return this.x=a[0]*t+a[3]*n+a[6]*s,this.y=a[1]*t+a[4]*n+a[7]*s,this.z=a[2]*t+a[5]*n+a[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,a=e.elements,c=1/(a[3]*t+a[7]*n+a[11]*s+a[15]);return this.x=(a[0]*t+a[4]*n+a[8]*s+a[12])*c,this.y=(a[1]*t+a[5]*n+a[9]*s+a[13])*c,this.z=(a[2]*t+a[6]*n+a[10]*s+a[14])*c,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,a=e.x,c=e.y,u=e.z,d=e.w,p=2*(c*s-u*n),g=2*(u*t-a*s),_=2*(a*n-c*t);return this.x=t+d*p+c*_-u*g,this.y=n+d*g+u*p-a*_,this.z=s+d*_+a*g-c*p,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s,this.y=a[1]*t+a[5]*n+a[9]*s,this.z=a[2]*t+a[6]*n+a[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=xt(this.x,e.x,t.x),this.y=xt(this.y,e.y,t.y),this.z=xt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=xt(this.x,e,t),this.y=xt(this.y,e,t),this.z=xt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(xt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,a=e.z,c=t.x,u=t.y,d=t.z;return this.x=s*d-a*u,this.y=a*c-n*d,this.z=n*u-s*c,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return da.copy(this).projectOnVector(e),this.sub(da)}reflect(e){return this.sub(da.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(xt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const da=new X,gl=new ns;class On{constructor(e=new X(1/0,1/0,1/0),t=new X(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ln.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ln.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Ln.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const a=n.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let c=0,u=a.count;c<u;c++)e.isMesh===!0?e.getVertexPosition(c,Ln):Ln.fromBufferAttribute(a,c),Ln.applyMatrix4(e.matrixWorld),this.expandByPoint(Ln);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ps.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ps.copy(n.boundingBox)),ps.applyMatrix4(e.matrixWorld),this.union(ps)}const s=e.children;for(let a=0,c=s.length;a<c;a++)this.expandByObject(s[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ln),Ln.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(zr),ms.subVectors(this.max,zr),tr.subVectors(e.a,zr),nr.subVectors(e.b,zr),ir.subVectors(e.c,zr),gi.subVectors(nr,tr),_i.subVectors(ir,nr),Li.subVectors(tr,ir);let t=[0,-gi.z,gi.y,0,-_i.z,_i.y,0,-Li.z,Li.y,gi.z,0,-gi.x,_i.z,0,-_i.x,Li.z,0,-Li.x,-gi.y,gi.x,0,-_i.y,_i.x,0,-Li.y,Li.x,0];return!pa(t,tr,nr,ir,ms)||(t=[1,0,0,0,1,0,0,0,1],!pa(t,tr,nr,ir,ms))?!1:(gs.crossVectors(gi,_i),t=[gs.x,gs.y,gs.z],pa(t,tr,nr,ir,ms))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ln).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ln).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ti[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ti[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ti[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ti[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ti[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ti[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ti[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ti[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ti),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const ti=[new X,new X,new X,new X,new X,new X,new X,new X],Ln=new X,ps=new On,tr=new X,nr=new X,ir=new X,gi=new X,_i=new X,Li=new X,zr=new X,ms=new X,gs=new X,Ui=new X;function pa(i,e,t,n,s){for(let a=0,c=i.length-3;a<=c;a+=3){Ui.fromArray(i,a);const u=s.x*Math.abs(Ui.x)+s.y*Math.abs(Ui.y)+s.z*Math.abs(Ui.z),d=e.dot(Ui),p=t.dot(Ui),g=n.dot(Ui);if(Math.max(-Math.max(d,p,g),Math.min(d,p,g))>u)return!1}return!0}const If=new On,Hr=new X,ma=new X;class Ho{constructor(e=new X,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):If.setFromPoints(e).getCenter(n);let s=0;for(let a=0,c=e.length;a<c;a++)s=Math.max(s,n.distanceToSquared(e[a]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Hr.subVectors(e,this.center);const t=Hr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Hr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ma.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Hr.copy(e.center).add(ma)),this.expandByPoint(Hr.copy(e.center).sub(ma))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ni=new X,ga=new X,_s=new X,vi=new X,_a=new X,vs=new X,va=new X;class Ec{constructor(e=new X,t=new X(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ni)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ni.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ni.copy(this.origin).addScaledVector(this.direction,t),ni.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){ga.copy(e).add(t).multiplyScalar(.5),_s.copy(t).sub(e).normalize(),vi.copy(this.origin).sub(ga);const a=e.distanceTo(t)*.5,c=-this.direction.dot(_s),u=vi.dot(this.direction),d=-vi.dot(_s),p=vi.lengthSq(),g=Math.abs(1-c*c);let _,M,y,T;if(g>0)if(_=c*d-u,M=c*u-d,T=a*g,_>=0)if(M>=-T)if(M<=T){const w=1/g;_*=w,M*=w,y=_*(_+c*M+2*u)+M*(c*_+M+2*d)+p}else M=a,_=Math.max(0,-(c*M+u)),y=-_*_+M*(M+2*d)+p;else M=-a,_=Math.max(0,-(c*M+u)),y=-_*_+M*(M+2*d)+p;else M<=-T?(_=Math.max(0,-(-c*a+u)),M=_>0?-a:Math.min(Math.max(-a,-d),a),y=-_*_+M*(M+2*d)+p):M<=T?(_=0,M=Math.min(Math.max(-a,-d),a),y=M*(M+2*d)+p):(_=Math.max(0,-(c*a+u)),M=_>0?a:Math.min(Math.max(-a,-d),a),y=-_*_+M*(M+2*d)+p);else M=c>0?-a:a,_=Math.max(0,-(c*M+u)),y=-_*_+M*(M+2*d)+p;return n&&n.copy(this.origin).addScaledVector(this.direction,_),s&&s.copy(ga).addScaledVector(_s,M),y}intersectSphere(e,t){ni.subVectors(e.center,this.origin);const n=ni.dot(this.direction),s=ni.dot(ni)-n*n,a=e.radius*e.radius;if(s>a)return null;const c=Math.sqrt(a-s),u=n-c,d=n+c;return d<0?null:u<0?this.at(d,t):this.at(u,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,a,c,u,d;const p=1/this.direction.x,g=1/this.direction.y,_=1/this.direction.z,M=this.origin;return p>=0?(n=(e.min.x-M.x)*p,s=(e.max.x-M.x)*p):(n=(e.max.x-M.x)*p,s=(e.min.x-M.x)*p),g>=0?(a=(e.min.y-M.y)*g,c=(e.max.y-M.y)*g):(a=(e.max.y-M.y)*g,c=(e.min.y-M.y)*g),n>c||a>s||((a>n||isNaN(n))&&(n=a),(c<s||isNaN(s))&&(s=c),_>=0?(u=(e.min.z-M.z)*_,d=(e.max.z-M.z)*_):(u=(e.max.z-M.z)*_,d=(e.min.z-M.z)*_),n>d||u>s)||((u>n||n!==n)&&(n=u),(d<s||s!==s)&&(s=d),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,ni)!==null}intersectTriangle(e,t,n,s,a){_a.subVectors(t,e),vs.subVectors(n,e),va.crossVectors(_a,vs);let c=this.direction.dot(va),u;if(c>0){if(s)return null;u=1}else if(c<0)u=-1,c=-c;else return null;vi.subVectors(this.origin,e);const d=u*this.direction.dot(vs.crossVectors(vi,vs));if(d<0)return null;const p=u*this.direction.dot(_a.cross(vi));if(p<0||d+p>c)return null;const g=-u*vi.dot(va);return g<0?null:this.at(g/c,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class kt{constructor(e,t,n,s,a,c,u,d,p,g,_,M,y,T,w,S){kt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,a,c,u,d,p,g,_,M,y,T,w,S)}set(e,t,n,s,a,c,u,d,p,g,_,M,y,T,w,S){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=s,m[1]=a,m[5]=c,m[9]=u,m[13]=d,m[2]=p,m[6]=g,m[10]=_,m[14]=M,m[3]=y,m[7]=T,m[11]=w,m[15]=S,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new kt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/rr.setFromMatrixColumn(e,0).length(),a=1/rr.setFromMatrixColumn(e,1).length(),c=1/rr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*a,t[5]=n[5]*a,t[6]=n[6]*a,t[7]=0,t[8]=n[8]*c,t[9]=n[9]*c,t[10]=n[10]*c,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,a=e.z,c=Math.cos(n),u=Math.sin(n),d=Math.cos(s),p=Math.sin(s),g=Math.cos(a),_=Math.sin(a);if(e.order==="XYZ"){const M=c*g,y=c*_,T=u*g,w=u*_;t[0]=d*g,t[4]=-d*_,t[8]=p,t[1]=y+T*p,t[5]=M-w*p,t[9]=-u*d,t[2]=w-M*p,t[6]=T+y*p,t[10]=c*d}else if(e.order==="YXZ"){const M=d*g,y=d*_,T=p*g,w=p*_;t[0]=M+w*u,t[4]=T*u-y,t[8]=c*p,t[1]=c*_,t[5]=c*g,t[9]=-u,t[2]=y*u-T,t[6]=w+M*u,t[10]=c*d}else if(e.order==="ZXY"){const M=d*g,y=d*_,T=p*g,w=p*_;t[0]=M-w*u,t[4]=-c*_,t[8]=T+y*u,t[1]=y+T*u,t[5]=c*g,t[9]=w-M*u,t[2]=-c*p,t[6]=u,t[10]=c*d}else if(e.order==="ZYX"){const M=c*g,y=c*_,T=u*g,w=u*_;t[0]=d*g,t[4]=T*p-y,t[8]=M*p+w,t[1]=d*_,t[5]=w*p+M,t[9]=y*p-T,t[2]=-p,t[6]=u*d,t[10]=c*d}else if(e.order==="YZX"){const M=c*d,y=c*p,T=u*d,w=u*p;t[0]=d*g,t[4]=w-M*_,t[8]=T*_+y,t[1]=_,t[5]=c*g,t[9]=-u*g,t[2]=-p*g,t[6]=y*_+T,t[10]=M-w*_}else if(e.order==="XZY"){const M=c*d,y=c*p,T=u*d,w=u*p;t[0]=d*g,t[4]=-_,t[8]=p*g,t[1]=M*_+w,t[5]=c*g,t[9]=y*_-T,t[2]=T*_-y,t[6]=u*g,t[10]=w*_+M}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Nf,e,Ff)}lookAt(e,t,n){const s=this.elements;return xn.subVectors(e,t),xn.lengthSq()===0&&(xn.z=1),xn.normalize(),xi.crossVectors(n,xn),xi.lengthSq()===0&&(Math.abs(n.z)===1?xn.x+=1e-4:xn.z+=1e-4,xn.normalize(),xi.crossVectors(n,xn)),xi.normalize(),xs.crossVectors(xn,xi),s[0]=xi.x,s[4]=xs.x,s[8]=xn.x,s[1]=xi.y,s[5]=xs.y,s[9]=xn.y,s[2]=xi.z,s[6]=xs.z,s[10]=xn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,a=this.elements,c=n[0],u=n[4],d=n[8],p=n[12],g=n[1],_=n[5],M=n[9],y=n[13],T=n[2],w=n[6],S=n[10],m=n[14],O=n[3],N=n[7],L=n[11],q=n[15],V=s[0],l=s[4],Y=s[8],R=s[12],C=s[1],z=s[5],ue=s[9],j=s[13],de=s[2],me=s[6],he=s[10],pe=s[14],se=s[3],Se=s[7],Ue=s[11],Ve=s[15];return a[0]=c*V+u*C+d*de+p*se,a[4]=c*l+u*z+d*me+p*Se,a[8]=c*Y+u*ue+d*he+p*Ue,a[12]=c*R+u*j+d*pe+p*Ve,a[1]=g*V+_*C+M*de+y*se,a[5]=g*l+_*z+M*me+y*Se,a[9]=g*Y+_*ue+M*he+y*Ue,a[13]=g*R+_*j+M*pe+y*Ve,a[2]=T*V+w*C+S*de+m*se,a[6]=T*l+w*z+S*me+m*Se,a[10]=T*Y+w*ue+S*he+m*Ue,a[14]=T*R+w*j+S*pe+m*Ve,a[3]=O*V+N*C+L*de+q*se,a[7]=O*l+N*z+L*me+q*Se,a[11]=O*Y+N*ue+L*he+q*Ue,a[15]=O*R+N*j+L*pe+q*Ve,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],a=e[12],c=e[1],u=e[5],d=e[9],p=e[13],g=e[2],_=e[6],M=e[10],y=e[14],T=e[3],w=e[7],S=e[11],m=e[15];return T*(+a*d*_-s*p*_-a*u*M+n*p*M+s*u*y-n*d*y)+w*(+t*d*y-t*p*M+a*c*M-s*c*y+s*p*g-a*d*g)+S*(+t*p*_-t*u*y-a*c*_+n*c*y+a*u*g-n*p*g)+m*(-s*u*g-t*d*_+t*u*M+s*c*_-n*c*M+n*d*g)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],a=e[3],c=e[4],u=e[5],d=e[6],p=e[7],g=e[8],_=e[9],M=e[10],y=e[11],T=e[12],w=e[13],S=e[14],m=e[15],O=_*S*p-w*M*p+w*d*y-u*S*y-_*d*m+u*M*m,N=T*M*p-g*S*p-T*d*y+c*S*y+g*d*m-c*M*m,L=g*w*p-T*_*p+T*u*y-c*w*y-g*u*m+c*_*m,q=T*_*d-g*w*d-T*u*M+c*w*M+g*u*S-c*_*S,V=t*O+n*N+s*L+a*q;if(V===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const l=1/V;return e[0]=O*l,e[1]=(w*M*a-_*S*a-w*s*y+n*S*y+_*s*m-n*M*m)*l,e[2]=(u*S*a-w*d*a+w*s*p-n*S*p-u*s*m+n*d*m)*l,e[3]=(_*d*a-u*M*a-_*s*p+n*M*p+u*s*y-n*d*y)*l,e[4]=N*l,e[5]=(g*S*a-T*M*a+T*s*y-t*S*y-g*s*m+t*M*m)*l,e[6]=(T*d*a-c*S*a-T*s*p+t*S*p+c*s*m-t*d*m)*l,e[7]=(c*M*a-g*d*a+g*s*p-t*M*p-c*s*y+t*d*y)*l,e[8]=L*l,e[9]=(T*_*a-g*w*a-T*n*y+t*w*y+g*n*m-t*_*m)*l,e[10]=(c*w*a-T*u*a+T*n*p-t*w*p-c*n*m+t*u*m)*l,e[11]=(g*u*a-c*_*a-g*n*p+t*_*p+c*n*y-t*u*y)*l,e[12]=q*l,e[13]=(g*w*s-T*_*s+T*n*M-t*w*M-g*n*S+t*_*S)*l,e[14]=(T*u*s-c*w*s-T*n*d+t*w*d+c*n*S-t*u*S)*l,e[15]=(c*_*s-g*u*s+g*n*d-t*_*d-c*n*M+t*u*M)*l,this}scale(e){const t=this.elements,n=e.x,s=e.y,a=e.z;return t[0]*=n,t[4]*=s,t[8]*=a,t[1]*=n,t[5]*=s,t[9]*=a,t[2]*=n,t[6]*=s,t[10]*=a,t[3]*=n,t[7]*=s,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),a=1-n,c=e.x,u=e.y,d=e.z,p=a*c,g=a*u;return this.set(p*c+n,p*u-s*d,p*d+s*u,0,p*u+s*d,g*u+n,g*d-s*c,0,p*d-s*u,g*d+s*c,a*d*d+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,a,c){return this.set(1,n,a,0,e,1,c,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,a=t._x,c=t._y,u=t._z,d=t._w,p=a+a,g=c+c,_=u+u,M=a*p,y=a*g,T=a*_,w=c*g,S=c*_,m=u*_,O=d*p,N=d*g,L=d*_,q=n.x,V=n.y,l=n.z;return s[0]=(1-(w+m))*q,s[1]=(y+L)*q,s[2]=(T-N)*q,s[3]=0,s[4]=(y-L)*V,s[5]=(1-(M+m))*V,s[6]=(S+O)*V,s[7]=0,s[8]=(T+N)*l,s[9]=(S-O)*l,s[10]=(1-(M+w))*l,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let a=rr.set(s[0],s[1],s[2]).length();const c=rr.set(s[4],s[5],s[6]).length(),u=rr.set(s[8],s[9],s[10]).length();this.determinant()<0&&(a=-a),e.x=s[12],e.y=s[13],e.z=s[14],Un.copy(this);const p=1/a,g=1/c,_=1/u;return Un.elements[0]*=p,Un.elements[1]*=p,Un.elements[2]*=p,Un.elements[4]*=g,Un.elements[5]*=g,Un.elements[6]*=g,Un.elements[8]*=_,Un.elements[9]*=_,Un.elements[10]*=_,t.setFromRotationMatrix(Un),n.x=a,n.y=c,n.z=u,this}makePerspective(e,t,n,s,a,c,u=li){const d=this.elements,p=2*a/(t-e),g=2*a/(n-s),_=(t+e)/(t-e),M=(n+s)/(n-s);let y,T;if(u===li)y=-(c+a)/(c-a),T=-2*c*a/(c-a);else if(u===Ws)y=-c/(c-a),T=-c*a/(c-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+u);return d[0]=p,d[4]=0,d[8]=_,d[12]=0,d[1]=0,d[5]=g,d[9]=M,d[13]=0,d[2]=0,d[6]=0,d[10]=y,d[14]=T,d[3]=0,d[7]=0,d[11]=-1,d[15]=0,this}makeOrthographic(e,t,n,s,a,c,u=li){const d=this.elements,p=1/(t-e),g=1/(n-s),_=1/(c-a),M=(t+e)*p,y=(n+s)*g;let T,w;if(u===li)T=(c+a)*_,w=-2*_;else if(u===Ws)T=a*_,w=-1*_;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+u);return d[0]=2*p,d[4]=0,d[8]=0,d[12]=-M,d[1]=0,d[5]=2*g,d[9]=0,d[13]=-y,d[2]=0,d[6]=0,d[10]=w,d[14]=-T,d[3]=0,d[7]=0,d[11]=0,d[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const rr=new X,Un=new kt,Nf=new X(0,0,0),Ff=new X(1,1,1),xi=new X,xs=new X,xn=new X,_l=new kt,vl=new ns;class jn{constructor(e=0,t=0,n=0,s=jn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,a=s[0],c=s[4],u=s[8],d=s[1],p=s[5],g=s[9],_=s[2],M=s[6],y=s[10];switch(t){case"XYZ":this._y=Math.asin(xt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(-g,y),this._z=Math.atan2(-c,a)):(this._x=Math.atan2(M,p),this._z=0);break;case"YXZ":this._x=Math.asin(-xt(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(u,y),this._z=Math.atan2(d,p)):(this._y=Math.atan2(-_,a),this._z=0);break;case"ZXY":this._x=Math.asin(xt(M,-1,1)),Math.abs(M)<.9999999?(this._y=Math.atan2(-_,y),this._z=Math.atan2(-c,p)):(this._y=0,this._z=Math.atan2(d,a));break;case"ZYX":this._y=Math.asin(-xt(_,-1,1)),Math.abs(_)<.9999999?(this._x=Math.atan2(M,y),this._z=Math.atan2(d,a)):(this._x=0,this._z=Math.atan2(-c,p));break;case"YZX":this._z=Math.asin(xt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-g,p),this._y=Math.atan2(-_,a)):(this._x=0,this._y=Math.atan2(u,y));break;case"XZY":this._z=Math.asin(-xt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(M,p),this._y=Math.atan2(u,a)):(this._x=Math.atan2(-g,y),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return _l.makeRotationFromQuaternion(e),this.setFromRotationMatrix(_l,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return vl.setFromEuler(this),this.setFromQuaternion(vl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}jn.DEFAULT_ORDER="XYZ";class ko{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Of=0;const xl=new X,sr=new ns,ii=new kt,Ms=new X,kr=new X,Bf=new X,zf=new ns,Ml=new X(1,0,0),Sl=new X(0,1,0),yl=new X(0,0,1),El={type:"added"},Hf={type:"removed"},ar={type:"childadded",child:null},xa={type:"childremoved",child:null};class nn extends Ar{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Of++}),this.uuid=wr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=nn.DEFAULT_UP.clone();const e=new X,t=new jn,n=new ns,s=new X(1,1,1);function a(){n.setFromEuler(t,!1)}function c(){t.setFromQuaternion(n,void 0,!1)}t._onChange(a),n._onChange(c),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new kt},normalMatrix:{value:new rt}}),this.matrix=new kt,this.matrixWorld=new kt,this.matrixAutoUpdate=nn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=nn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ko,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return sr.setFromAxisAngle(e,t),this.quaternion.multiply(sr),this}rotateOnWorldAxis(e,t){return sr.setFromAxisAngle(e,t),this.quaternion.premultiply(sr),this}rotateX(e){return this.rotateOnAxis(Ml,e)}rotateY(e){return this.rotateOnAxis(Sl,e)}rotateZ(e){return this.rotateOnAxis(yl,e)}translateOnAxis(e,t){return xl.copy(e).applyQuaternion(this.quaternion),this.position.add(xl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ml,e)}translateY(e){return this.translateOnAxis(Sl,e)}translateZ(e){return this.translateOnAxis(yl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ii.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ms.copy(e):Ms.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),kr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ii.lookAt(kr,Ms,this.up):ii.lookAt(Ms,kr,this.up),this.quaternion.setFromRotationMatrix(ii),s&&(ii.extractRotation(s.matrixWorld),sr.setFromRotationMatrix(ii),this.quaternion.premultiply(sr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(El),ar.child=e,this.dispatchEvent(ar),ar.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Hf),xa.child=e,this.dispatchEvent(xa),xa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ii.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ii.multiply(e.parent.matrixWorld)),e.applyMatrix4(ii),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(El),ar.child=e,this.dispatchEvent(ar),ar.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const c=this.children[n].getObjectByProperty(e,t);if(c!==void 0)return c}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let a=0,c=s.length;a<c;a++)s[a].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(kr,e,Bf),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(kr,zf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let a=0,c=s.length;a<c;a++)s[a].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(u=>({...u,boundingBox:u.boundingBox?{min:u.boundingBox.min.toArray(),max:u.boundingBox.max.toArray()}:void 0,boundingSphere:u.boundingSphere?{radius:u.boundingSphere.radius,center:u.boundingSphere.center.toArray()}:void 0})),s.instanceInfo=this._instanceInfo.map(u=>({...u})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:this.boundingSphere.center.toArray(),radius:this.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:this.boundingBox.min.toArray(),max:this.boundingBox.max.toArray()}));function a(u,d){return u[d.uuid]===void 0&&(u[d.uuid]=d.toJSON(e)),d.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=a(e.geometries,this.geometry);const u=this.geometry.parameters;if(u!==void 0&&u.shapes!==void 0){const d=u.shapes;if(Array.isArray(d))for(let p=0,g=d.length;p<g;p++){const _=d[p];a(e.shapes,_)}else a(e.shapes,d)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const u=[];for(let d=0,p=this.material.length;d<p;d++)u.push(a(e.materials,this.material[d]));s.material=u}else s.material=a(e.materials,this.material);if(this.children.length>0){s.children=[];for(let u=0;u<this.children.length;u++)s.children.push(this.children[u].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let u=0;u<this.animations.length;u++){const d=this.animations[u];s.animations.push(a(e.animations,d))}}if(t){const u=c(e.geometries),d=c(e.materials),p=c(e.textures),g=c(e.images),_=c(e.shapes),M=c(e.skeletons),y=c(e.animations),T=c(e.nodes);u.length>0&&(n.geometries=u),d.length>0&&(n.materials=d),p.length>0&&(n.textures=p),g.length>0&&(n.images=g),_.length>0&&(n.shapes=_),M.length>0&&(n.skeletons=M),y.length>0&&(n.animations=y),T.length>0&&(n.nodes=T)}return n.object=s,n;function c(u){const d=[];for(const p in u){const g=u[p];delete g.metadata,d.push(g)}return d}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}nn.DEFAULT_UP=new X(0,1,0);nn.DEFAULT_MATRIX_AUTO_UPDATE=!0;nn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const In=new X,ri=new X,Ma=new X,si=new X,or=new X,lr=new X,Tl=new X,Sa=new X,ya=new X,Ea=new X,Ta=new Nt,ba=new Nt,Aa=new Nt;class Nn{constructor(e=new X,t=new X,n=new X){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),In.subVectors(e,t),s.cross(In);const a=s.lengthSq();return a>0?s.multiplyScalar(1/Math.sqrt(a)):s.set(0,0,0)}static getBarycoord(e,t,n,s,a){In.subVectors(s,t),ri.subVectors(n,t),Ma.subVectors(e,t);const c=In.dot(In),u=In.dot(ri),d=In.dot(Ma),p=ri.dot(ri),g=ri.dot(Ma),_=c*p-u*u;if(_===0)return a.set(0,0,0),null;const M=1/_,y=(p*d-u*g)*M,T=(c*g-u*d)*M;return a.set(1-y-T,T,y)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,si)===null?!1:si.x>=0&&si.y>=0&&si.x+si.y<=1}static getInterpolation(e,t,n,s,a,c,u,d){return this.getBarycoord(e,t,n,s,si)===null?(d.x=0,d.y=0,"z"in d&&(d.z=0),"w"in d&&(d.w=0),null):(d.setScalar(0),d.addScaledVector(a,si.x),d.addScaledVector(c,si.y),d.addScaledVector(u,si.z),d)}static getInterpolatedAttribute(e,t,n,s,a,c){return Ta.setScalar(0),ba.setScalar(0),Aa.setScalar(0),Ta.fromBufferAttribute(e,t),ba.fromBufferAttribute(e,n),Aa.fromBufferAttribute(e,s),c.setScalar(0),c.addScaledVector(Ta,a.x),c.addScaledVector(ba,a.y),c.addScaledVector(Aa,a.z),c}static isFrontFacing(e,t,n,s){return In.subVectors(n,t),ri.subVectors(e,t),In.cross(ri).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return In.subVectors(this.c,this.b),ri.subVectors(this.a,this.b),In.cross(ri).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Nn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Nn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,a){return Nn.getInterpolation(e,this.a,this.b,this.c,t,n,s,a)}containsPoint(e){return Nn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Nn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,a=this.c;let c,u;or.subVectors(s,n),lr.subVectors(a,n),Sa.subVectors(e,n);const d=or.dot(Sa),p=lr.dot(Sa);if(d<=0&&p<=0)return t.copy(n);ya.subVectors(e,s);const g=or.dot(ya),_=lr.dot(ya);if(g>=0&&_<=g)return t.copy(s);const M=d*_-g*p;if(M<=0&&d>=0&&g<=0)return c=d/(d-g),t.copy(n).addScaledVector(or,c);Ea.subVectors(e,a);const y=or.dot(Ea),T=lr.dot(Ea);if(T>=0&&y<=T)return t.copy(a);const w=y*p-d*T;if(w<=0&&p>=0&&T<=0)return u=p/(p-T),t.copy(n).addScaledVector(lr,u);const S=g*T-y*_;if(S<=0&&_-g>=0&&y-T>=0)return Tl.subVectors(a,s),u=(_-g)/(_-g+(y-T)),t.copy(s).addScaledVector(Tl,u);const m=1/(S+w+M);return c=w*m,u=M*m,t.copy(n).addScaledVector(or,c).addScaledVector(lr,u)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Tc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Mi={h:0,s:0,l:0},Ss={h:0,s:0,l:0};function wa(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class wt{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Cn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,At.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=At.workingColorSpace){return this.r=e,this.g=t,this.b=n,At.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=At.workingColorSpace){if(e=Bo(e,1),t=xt(t,0,1),n=xt(n,0,1),t===0)this.r=this.g=this.b=n;else{const a=n<=.5?n*(1+t):n+t-n*t,c=2*n-a;this.r=wa(c,a,e+1/3),this.g=wa(c,a,e),this.b=wa(c,a,e-1/3)}return At.toWorkingColorSpace(this,s),this}setStyle(e,t=Cn){function n(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const c=s[1],u=s[2];switch(c){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u))return n(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u))return n(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u))return n(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=s[1],c=a.length;if(c===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(c===6)return this.setHex(parseInt(a,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Cn){const n=Tc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ci(e.r),this.g=ci(e.g),this.b=ci(e.b),this}copyLinearToSRGB(e){return this.r=vr(e.r),this.g=vr(e.g),this.b=vr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Cn){return At.fromWorkingColorSpace(on.copy(this),e),Math.round(xt(on.r*255,0,255))*65536+Math.round(xt(on.g*255,0,255))*256+Math.round(xt(on.b*255,0,255))}getHexString(e=Cn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=At.workingColorSpace){At.fromWorkingColorSpace(on.copy(this),t);const n=on.r,s=on.g,a=on.b,c=Math.max(n,s,a),u=Math.min(n,s,a);let d,p;const g=(u+c)/2;if(u===c)d=0,p=0;else{const _=c-u;switch(p=g<=.5?_/(c+u):_/(2-c-u),c){case n:d=(s-a)/_+(s<a?6:0);break;case s:d=(a-n)/_+2;break;case a:d=(n-s)/_+4;break}d/=6}return e.h=d,e.s=p,e.l=g,e}getRGB(e,t=At.workingColorSpace){return At.fromWorkingColorSpace(on.copy(this),t),e.r=on.r,e.g=on.g,e.b=on.b,e}getStyle(e=Cn){At.fromWorkingColorSpace(on.copy(this),e);const t=on.r,n=on.g,s=on.b;return e!==Cn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Mi),this.setHSL(Mi.h+e,Mi.s+t,Mi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Mi),e.getHSL(Ss);const n=qr(Mi.h,Ss.h,t),s=qr(Mi.s,Ss.s,t),a=qr(Mi.l,Ss.l,t);return this.setHSL(n,s,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,a=e.elements;return this.r=a[0]*t+a[3]*n+a[6]*s,this.g=a[1]*t+a[4]*n+a[7]*s,this.b=a[2]*t+a[5]*n+a[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const on=new wt;wt.NAMES=Tc;let kf=0;class is extends Ar{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:kf++}),this.uuid=wr(),this.name="",this.type="Material",this.blending=_r,this.side=bi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ha,this.blendDst=ka,this.blendEquation=Hi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new wt(0,0,0),this.blendAlpha=0,this.depthFunc=xr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=cl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Qi,this.stencilZFail=Qi,this.stencilZPass=Qi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==_r&&(n.blending=this.blending),this.side!==bi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ha&&(n.blendSrc=this.blendSrc),this.blendDst!==ka&&(n.blendDst=this.blendDst),this.blendEquation!==Hi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==xr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==cl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Qi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Qi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Qi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(a){const c=[];for(const u in a){const d=a[u];delete d.metadata,c.push(d)}return c}if(t){const a=s(e.textures),c=s(e.images);a.length>0&&(n.textures=a),c.length>0&&(n.images=c)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let a=0;a!==s;++a)n[a]=t[a].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class bc extends is{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new jn,this.combine=Do,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Yt=new X,ys=new Ct;let Vf=0;class Rn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Vf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ul,this.updateRanges=[],this.gpuType=oi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,a=this.itemSize;s<a;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ys.fromBufferAttribute(this,t),ys.applyMatrix3(e),this.setXY(t,ys.x,ys.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Yt.fromBufferAttribute(this,t),Yt.applyMatrix3(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Yt.fromBufferAttribute(this,t),Yt.applyMatrix4(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Yt.fromBufferAttribute(this,t),Yt.applyNormalMatrix(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Yt.fromBufferAttribute(this,t),Yt.transformDirection(e),this.setXYZ(t,Yt.x,Yt.y,Yt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=dr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=fn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=dr(t,this.array)),t}setX(e,t){return this.normalized&&(t=fn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=dr(t,this.array)),t}setY(e,t){return this.normalized&&(t=fn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=dr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=fn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=dr(t,this.array)),t}setW(e,t){return this.normalized&&(t=fn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=fn(t,this.array),n=fn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=fn(t,this.array),n=fn(n,this.array),s=fn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,a){return e*=this.itemSize,this.normalized&&(t=fn(t,this.array),n=fn(n,this.array),s=fn(s,this.array),a=fn(a,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ul&&(e.usage=this.usage),e}}class Ac extends Rn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class wc extends Rn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Wi extends Rn{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Gf=0;const wn=new kt,Ca=new nn,cr=new X,Mn=new On,Vr=new On,tn=new X;class wi extends Ar{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Gf++}),this.uuid=wr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Sc(e)?wc:Ac)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const a=new rt().getNormalMatrix(e);n.applyNormalMatrix(a),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return wn.makeRotationFromQuaternion(e),this.applyMatrix4(wn),this}rotateX(e){return wn.makeRotationX(e),this.applyMatrix4(wn),this}rotateY(e){return wn.makeRotationY(e),this.applyMatrix4(wn),this}rotateZ(e){return wn.makeRotationZ(e),this.applyMatrix4(wn),this}translate(e,t,n){return wn.makeTranslation(e,t,n),this.applyMatrix4(wn),this}scale(e,t,n){return wn.makeScale(e,t,n),this.applyMatrix4(wn),this}lookAt(e){return Ca.lookAt(e),Ca.updateMatrix(),this.applyMatrix4(Ca.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(cr).negate(),this.translate(cr.x,cr.y,cr.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,a=e.length;s<a;s++){const c=e[s];n.push(c.x,c.y,c.z||0)}this.setAttribute("position",new Wi(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const a=e[s];t.setXYZ(s,a.x,a.y,a.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new On);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new X(-1/0,-1/0,-1/0),new X(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const a=t[n];Mn.setFromBufferAttribute(a),this.morphTargetsRelative?(tn.addVectors(this.boundingBox.min,Mn.min),this.boundingBox.expandByPoint(tn),tn.addVectors(this.boundingBox.max,Mn.max),this.boundingBox.expandByPoint(tn)):(this.boundingBox.expandByPoint(Mn.min),this.boundingBox.expandByPoint(Mn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ho);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new X,1/0);return}if(e){const n=this.boundingSphere.center;if(Mn.setFromBufferAttribute(e),t)for(let a=0,c=t.length;a<c;a++){const u=t[a];Vr.setFromBufferAttribute(u),this.morphTargetsRelative?(tn.addVectors(Mn.min,Vr.min),Mn.expandByPoint(tn),tn.addVectors(Mn.max,Vr.max),Mn.expandByPoint(tn)):(Mn.expandByPoint(Vr.min),Mn.expandByPoint(Vr.max))}Mn.getCenter(n);let s=0;for(let a=0,c=e.count;a<c;a++)tn.fromBufferAttribute(e,a),s=Math.max(s,n.distanceToSquared(tn));if(t)for(let a=0,c=t.length;a<c;a++){const u=t[a],d=this.morphTargetsRelative;for(let p=0,g=u.count;p<g;p++)tn.fromBufferAttribute(u,p),d&&(cr.fromBufferAttribute(e,p),tn.add(cr)),s=Math.max(s,n.distanceToSquared(tn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,a=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Rn(new Float32Array(4*n.count),4));const c=this.getAttribute("tangent"),u=[],d=[];for(let Y=0;Y<n.count;Y++)u[Y]=new X,d[Y]=new X;const p=new X,g=new X,_=new X,M=new Ct,y=new Ct,T=new Ct,w=new X,S=new X;function m(Y,R,C){p.fromBufferAttribute(n,Y),g.fromBufferAttribute(n,R),_.fromBufferAttribute(n,C),M.fromBufferAttribute(a,Y),y.fromBufferAttribute(a,R),T.fromBufferAttribute(a,C),g.sub(p),_.sub(p),y.sub(M),T.sub(M);const z=1/(y.x*T.y-T.x*y.y);isFinite(z)&&(w.copy(g).multiplyScalar(T.y).addScaledVector(_,-y.y).multiplyScalar(z),S.copy(_).multiplyScalar(y.x).addScaledVector(g,-T.x).multiplyScalar(z),u[Y].add(w),u[R].add(w),u[C].add(w),d[Y].add(S),d[R].add(S),d[C].add(S))}let O=this.groups;O.length===0&&(O=[{start:0,count:e.count}]);for(let Y=0,R=O.length;Y<R;++Y){const C=O[Y],z=C.start,ue=C.count;for(let j=z,de=z+ue;j<de;j+=3)m(e.getX(j+0),e.getX(j+1),e.getX(j+2))}const N=new X,L=new X,q=new X,V=new X;function l(Y){q.fromBufferAttribute(s,Y),V.copy(q);const R=u[Y];N.copy(R),N.sub(q.multiplyScalar(q.dot(R))).normalize(),L.crossVectors(V,R);const z=L.dot(d[Y])<0?-1:1;c.setXYZW(Y,N.x,N.y,N.z,z)}for(let Y=0,R=O.length;Y<R;++Y){const C=O[Y],z=C.start,ue=C.count;for(let j=z,de=z+ue;j<de;j+=3)l(e.getX(j+0)),l(e.getX(j+1)),l(e.getX(j+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Rn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let M=0,y=n.count;M<y;M++)n.setXYZ(M,0,0,0);const s=new X,a=new X,c=new X,u=new X,d=new X,p=new X,g=new X,_=new X;if(e)for(let M=0,y=e.count;M<y;M+=3){const T=e.getX(M+0),w=e.getX(M+1),S=e.getX(M+2);s.fromBufferAttribute(t,T),a.fromBufferAttribute(t,w),c.fromBufferAttribute(t,S),g.subVectors(c,a),_.subVectors(s,a),g.cross(_),u.fromBufferAttribute(n,T),d.fromBufferAttribute(n,w),p.fromBufferAttribute(n,S),u.add(g),d.add(g),p.add(g),n.setXYZ(T,u.x,u.y,u.z),n.setXYZ(w,d.x,d.y,d.z),n.setXYZ(S,p.x,p.y,p.z)}else for(let M=0,y=t.count;M<y;M+=3)s.fromBufferAttribute(t,M+0),a.fromBufferAttribute(t,M+1),c.fromBufferAttribute(t,M+2),g.subVectors(c,a),_.subVectors(s,a),g.cross(_),n.setXYZ(M+0,g.x,g.y,g.z),n.setXYZ(M+1,g.x,g.y,g.z),n.setXYZ(M+2,g.x,g.y,g.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)tn.fromBufferAttribute(e,t),tn.normalize(),e.setXYZ(t,tn.x,tn.y,tn.z)}toNonIndexed(){function e(u,d){const p=u.array,g=u.itemSize,_=u.normalized,M=new p.constructor(d.length*g);let y=0,T=0;for(let w=0,S=d.length;w<S;w++){u.isInterleavedBufferAttribute?y=d[w]*u.data.stride+u.offset:y=d[w]*g;for(let m=0;m<g;m++)M[T++]=p[y++]}return new Rn(M,g,_)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new wi,n=this.index.array,s=this.attributes;for(const u in s){const d=s[u],p=e(d,n);t.setAttribute(u,p)}const a=this.morphAttributes;for(const u in a){const d=[],p=a[u];for(let g=0,_=p.length;g<_;g++){const M=p[g],y=e(M,n);d.push(y)}t.morphAttributes[u]=d}t.morphTargetsRelative=this.morphTargetsRelative;const c=this.groups;for(let u=0,d=c.length;u<d;u++){const p=c[u];t.addGroup(p.start,p.count,p.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const d=this.parameters;for(const p in d)d[p]!==void 0&&(e[p]=d[p]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const d in n){const p=n[d];e.data.attributes[d]=p.toJSON(e.data)}const s={};let a=!1;for(const d in this.morphAttributes){const p=this.morphAttributes[d],g=[];for(let _=0,M=p.length;_<M;_++){const y=p[_];g.push(y.toJSON(e.data))}g.length>0&&(s[d]=g,a=!0)}a&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const c=this.groups;c.length>0&&(e.data.groups=JSON.parse(JSON.stringify(c)));const u=this.boundingSphere;return u!==null&&(e.data.boundingSphere={center:u.center.toArray(),radius:u.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const p in s){const g=s[p];this.setAttribute(p,g.clone(t))}const a=e.morphAttributes;for(const p in a){const g=[],_=a[p];for(let M=0,y=_.length;M<y;M++)g.push(_[M].clone(t));this.morphAttributes[p]=g}this.morphTargetsRelative=e.morphTargetsRelative;const c=e.groups;for(let p=0,g=c.length;p<g;p++){const _=c[p];this.addGroup(_.start,_.count,_.materialIndex)}const u=e.boundingBox;u!==null&&(this.boundingBox=u.clone());const d=e.boundingSphere;return d!==null&&(this.boundingSphere=d.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const bl=new kt,Ii=new Ec,Es=new Ho,Al=new X,Ts=new X,bs=new X,As=new X,Ra=new X,ws=new X,wl=new X,Cs=new X;class qn extends nn{constructor(e=new wi,t=new bc){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,c=s.length;a<c;a++){const u=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[u]=a}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,a=n.morphAttributes.position,c=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const u=this.morphTargetInfluences;if(a&&u){ws.set(0,0,0);for(let d=0,p=a.length;d<p;d++){const g=u[d],_=a[d];g!==0&&(Ra.fromBufferAttribute(_,e),c?ws.addScaledVector(Ra,g):ws.addScaledVector(Ra.sub(t),g))}t.add(ws)}return t}raycast(e,t){const n=this.geometry,s=this.material,a=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Es.copy(n.boundingSphere),Es.applyMatrix4(a),Ii.copy(e.ray).recast(e.near),!(Es.containsPoint(Ii.origin)===!1&&(Ii.intersectSphere(Es,Al)===null||Ii.origin.distanceToSquared(Al)>(e.far-e.near)**2))&&(bl.copy(a).invert(),Ii.copy(e.ray).applyMatrix4(bl),!(n.boundingBox!==null&&Ii.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ii)))}_computeIntersections(e,t,n){let s;const a=this.geometry,c=this.material,u=a.index,d=a.attributes.position,p=a.attributes.uv,g=a.attributes.uv1,_=a.attributes.normal,M=a.groups,y=a.drawRange;if(u!==null)if(Array.isArray(c))for(let T=0,w=M.length;T<w;T++){const S=M[T],m=c[S.materialIndex],O=Math.max(S.start,y.start),N=Math.min(u.count,Math.min(S.start+S.count,y.start+y.count));for(let L=O,q=N;L<q;L+=3){const V=u.getX(L),l=u.getX(L+1),Y=u.getX(L+2);s=Rs(this,m,e,n,p,g,_,V,l,Y),s&&(s.faceIndex=Math.floor(L/3),s.face.materialIndex=S.materialIndex,t.push(s))}}else{const T=Math.max(0,y.start),w=Math.min(u.count,y.start+y.count);for(let S=T,m=w;S<m;S+=3){const O=u.getX(S),N=u.getX(S+1),L=u.getX(S+2);s=Rs(this,c,e,n,p,g,_,O,N,L),s&&(s.faceIndex=Math.floor(S/3),t.push(s))}}else if(d!==void 0)if(Array.isArray(c))for(let T=0,w=M.length;T<w;T++){const S=M[T],m=c[S.materialIndex],O=Math.max(S.start,y.start),N=Math.min(d.count,Math.min(S.start+S.count,y.start+y.count));for(let L=O,q=N;L<q;L+=3){const V=L,l=L+1,Y=L+2;s=Rs(this,m,e,n,p,g,_,V,l,Y),s&&(s.faceIndex=Math.floor(L/3),s.face.materialIndex=S.materialIndex,t.push(s))}}else{const T=Math.max(0,y.start),w=Math.min(d.count,y.start+y.count);for(let S=T,m=w;S<m;S+=3){const O=S,N=S+1,L=S+2;s=Rs(this,c,e,n,p,g,_,O,N,L),s&&(s.faceIndex=Math.floor(S/3),t.push(s))}}}}function Wf(i,e,t,n,s,a,c,u){let d;if(e.side===vn?d=n.intersectTriangle(c,a,s,!0,u):d=n.intersectTriangle(s,a,c,e.side===bi,u),d===null)return null;Cs.copy(u),Cs.applyMatrix4(i.matrixWorld);const p=t.ray.origin.distanceTo(Cs);return p<t.near||p>t.far?null:{distance:p,point:Cs.clone(),object:i}}function Rs(i,e,t,n,s,a,c,u,d,p){i.getVertexPosition(u,Ts),i.getVertexPosition(d,bs),i.getVertexPosition(p,As);const g=Wf(i,e,t,n,Ts,bs,As,wl);if(g){const _=new X;Nn.getBarycoord(wl,Ts,bs,As,_),s&&(g.uv=Nn.getInterpolatedAttribute(s,u,d,p,_,new Ct)),a&&(g.uv1=Nn.getInterpolatedAttribute(a,u,d,p,_,new Ct)),c&&(g.normal=Nn.getInterpolatedAttribute(c,u,d,p,_,new X),g.normal.dot(n.direction)>0&&g.normal.multiplyScalar(-1));const M={a:u,b:d,c:p,normal:new X,materialIndex:0};Nn.getNormal(Ts,bs,As,M.normal),g.face=M,g.barycoord=_}return g}class rs extends wi{constructor(e=1,t=1,n=1,s=1,a=1,c=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:a,depthSegments:c};const u=this;s=Math.floor(s),a=Math.floor(a),c=Math.floor(c);const d=[],p=[],g=[],_=[];let M=0,y=0;T("z","y","x",-1,-1,n,t,e,c,a,0),T("z","y","x",1,-1,n,t,-e,c,a,1),T("x","z","y",1,1,e,n,t,s,c,2),T("x","z","y",1,-1,e,n,-t,s,c,3),T("x","y","z",1,-1,e,t,n,s,a,4),T("x","y","z",-1,-1,e,t,-n,s,a,5),this.setIndex(d),this.setAttribute("position",new Wi(p,3)),this.setAttribute("normal",new Wi(g,3)),this.setAttribute("uv",new Wi(_,2));function T(w,S,m,O,N,L,q,V,l,Y,R){const C=L/l,z=q/Y,ue=L/2,j=q/2,de=V/2,me=l+1,he=Y+1;let pe=0,se=0;const Se=new X;for(let Ue=0;Ue<he;Ue++){const Ve=Ue*z-j;for(let st=0;st<me;st++){const Rt=st*C-ue;Se[w]=Rt*O,Se[S]=Ve*N,Se[m]=de,p.push(Se.x,Se.y,Se.z),Se[w]=0,Se[S]=0,Se[m]=V>0?1:-1,g.push(Se.x,Se.y,Se.z),_.push(st/l),_.push(1-Ue/Y),pe+=1}}for(let Ue=0;Ue<Y;Ue++)for(let Ve=0;Ve<l;Ve++){const st=M+Ve+me*Ue,Rt=M+Ve+me*(Ue+1),ce=M+(Ve+1)+me*(Ue+1),Me=M+(Ve+1)+me*Ue;d.push(st,Rt,Me),d.push(Rt,ce,Me),se+=6}u.addGroup(y,se,R),y+=se,M+=pe}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new rs(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Er(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function hn(i){const e={};for(let t=0;t<i.length;t++){const n=Er(i[t]);for(const s in n)e[s]=n[s]}return e}function Xf(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Cc(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:At.workingColorSpace}const qf={clone:Er,merge:hn};var Yf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,jf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ai extends is{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Yf,this.fragmentShader=jf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Er(e.uniforms),this.uniformsGroups=Xf(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const c=this.uniforms[s].value;c&&c.isTexture?t.uniforms[s]={type:"t",value:c.toJSON(e).uuid}:c&&c.isColor?t.uniforms[s]={type:"c",value:c.getHex()}:c&&c.isVector2?t.uniforms[s]={type:"v2",value:c.toArray()}:c&&c.isVector3?t.uniforms[s]={type:"v3",value:c.toArray()}:c&&c.isVector4?t.uniforms[s]={type:"v4",value:c.toArray()}:c&&c.isMatrix3?t.uniforms[s]={type:"m3",value:c.toArray()}:c&&c.isMatrix4?t.uniforms[s]={type:"m4",value:c.toArray()}:t.uniforms[s]={value:c}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Rc extends nn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new kt,this.projectionMatrix=new kt,this.projectionMatrixInverse=new kt,this.coordinateSystem=li}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Si=new X,Cl=new Ct,Rl=new Ct;class Sn extends Rc{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Qr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Xr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Qr*2*Math.atan(Math.tan(Xr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Si.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Si.x,Si.y).multiplyScalar(-e/Si.z),Si.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Si.x,Si.y).multiplyScalar(-e/Si.z)}getViewSize(e,t){return this.getViewBounds(e,Cl,Rl),t.subVectors(Rl,Cl)}setViewOffset(e,t,n,s,a,c){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=a,this.view.height=c,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Xr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,a=-.5*s;const c=this.view;if(this.view!==null&&this.view.enabled){const d=c.fullWidth,p=c.fullHeight;a+=c.offsetX*s/d,t-=c.offsetY*n/p,s*=c.width/d,n*=c.height/p}const u=this.filmOffset;u!==0&&(a+=e*u/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ur=-90,fr=1;class $f extends nn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Sn(ur,fr,e,t);s.layers=this.layers,this.add(s);const a=new Sn(ur,fr,e,t);a.layers=this.layers,this.add(a);const c=new Sn(ur,fr,e,t);c.layers=this.layers,this.add(c);const u=new Sn(ur,fr,e,t);u.layers=this.layers,this.add(u);const d=new Sn(ur,fr,e,t);d.layers=this.layers,this.add(d);const p=new Sn(ur,fr,e,t);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,a,c,u,d]=t;for(const p of t)this.remove(p);if(e===li)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),c.up.set(0,0,1),c.lookAt(0,-1,0),u.up.set(0,1,0),u.lookAt(0,0,1),d.up.set(0,1,0),d.lookAt(0,0,-1);else if(e===Ws)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),c.up.set(0,0,-1),c.lookAt(0,-1,0),u.up.set(0,-1,0),u.lookAt(0,0,1),d.up.set(0,-1,0),d.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const p of t)this.add(p),p.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,c,u,d,p,g]=this.children,_=e.getRenderTarget(),M=e.getActiveCubeFace(),y=e.getActiveMipmapLevel(),T=e.xr.enabled;e.xr.enabled=!1;const w=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,a),e.setRenderTarget(n,1,s),e.render(t,c),e.setRenderTarget(n,2,s),e.render(t,u),e.setRenderTarget(n,3,s),e.render(t,d),e.setRenderTarget(n,4,s),e.render(t,p),n.texture.generateMipmaps=w,e.setRenderTarget(n,5,s),e.render(t,g),e.setRenderTarget(_,M,y),e.xr.enabled=T,n.texture.needsPMREMUpdate=!0}}class Pc extends dn{constructor(e=[],t=Mr,n,s,a,c,u,d,p,g){super(e,t,n,s,a,c,u,d,p,g),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Kf extends Yi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Pc(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Xn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new rs(5,5,5),a=new Ai({name:"CubemapFromEquirect",uniforms:Er(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:vn,blending:Ei});a.uniforms.tEquirect.value=t;const c=new qn(s,a),u=t.minFilter;return t.minFilter===Gi&&(t.minFilter=Xn),new $f(1,10,this).update(e,c),t.minFilter=u,c.geometry.dispose(),c.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const a=e.getRenderTarget();for(let c=0;c<6;c++)e.setRenderTarget(this,c),e.clear(t,n,s);e.setRenderTarget(a)}}class pr extends nn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Zf={type:"move"};class Pa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new pr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new pr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new X,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new X),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new pr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new X,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new X),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,a=null,c=null;const u=this._targetRay,d=this._grip,p=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(p&&e.hand){c=!0;for(const w of e.hand.values()){const S=t.getJointPose(w,n),m=this._getHandJoint(p,w);S!==null&&(m.matrix.fromArray(S.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=S.radius),m.visible=S!==null}const g=p.joints["index-finger-tip"],_=p.joints["thumb-tip"],M=g.position.distanceTo(_.position),y=.02,T=.005;p.inputState.pinching&&M>y+T?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!p.inputState.pinching&&M<=y-T&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else d!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,n),a!==null&&(d.matrix.fromArray(a.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,a.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(a.linearVelocity)):d.hasLinearVelocity=!1,a.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(a.angularVelocity)):d.hasAngularVelocity=!1));u!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&a!==null&&(s=a),s!==null&&(u.matrix.fromArray(s.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,s.linearVelocity?(u.hasLinearVelocity=!0,u.linearVelocity.copy(s.linearVelocity)):u.hasLinearVelocity=!1,s.angularVelocity?(u.hasAngularVelocity=!0,u.angularVelocity.copy(s.angularVelocity)):u.hasAngularVelocity=!1,this.dispatchEvent(Zf)))}return u!==null&&(u.visible=s!==null),d!==null&&(d.visible=a!==null),p!==null&&(p.visible=c!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new pr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Jf extends nn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new jn,this.environmentIntensity=1,this.environmentRotation=new jn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Da=new X,Qf=new X,eh=new rt;class Bi{constructor(e=new X(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Da.subVectors(n,t).cross(Qf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Da),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return a<0||a>1?null:t.copy(e.start).addScaledVector(n,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||eh.getNormalMatrix(e),s=this.coplanarPoint(Da).applyMatrix4(e),a=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ni=new Ho,Ps=new X;class Vo{constructor(e=new Bi,t=new Bi,n=new Bi,s=new Bi,a=new Bi,c=new Bi){this.planes=[e,t,n,s,a,c]}set(e,t,n,s,a,c){const u=this.planes;return u[0].copy(e),u[1].copy(t),u[2].copy(n),u[3].copy(s),u[4].copy(a),u[5].copy(c),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=li){const n=this.planes,s=e.elements,a=s[0],c=s[1],u=s[2],d=s[3],p=s[4],g=s[5],_=s[6],M=s[7],y=s[8],T=s[9],w=s[10],S=s[11],m=s[12],O=s[13],N=s[14],L=s[15];if(n[0].setComponents(d-a,M-p,S-y,L-m).normalize(),n[1].setComponents(d+a,M+p,S+y,L+m).normalize(),n[2].setComponents(d+c,M+g,S+T,L+O).normalize(),n[3].setComponents(d-c,M-g,S-T,L-O).normalize(),n[4].setComponents(d-u,M-_,S-w,L-N).normalize(),t===li)n[5].setComponents(d+u,M+_,S+w,L+N).normalize();else if(t===Ws)n[5].setComponents(u,_,w,N).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ni.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ni.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ni)}intersectsSprite(e){return Ni.center.set(0,0,0),Ni.radius=.7071067811865476,Ni.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ni)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Ps.x=s.normal.x>0?e.max.x:e.min.x,Ps.y=s.normal.y>0?e.max.y:e.min.y,Ps.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ps)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class th extends dn{constructor(e,t,n,s,a,c,u,d,p){super(e,t,n,s,a,c,u,d,p),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Dc extends dn{constructor(e,t,n=qi,s,a,c,u=En,d=En,p,g=Zr){if(g!==Zr&&g!==Jr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super(null,s,a,c,u,d,g,n,p),this.isDepthTexture=!0,this.image={width:e,height:t},this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new zo(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Ys extends wi{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const a=e/2,c=t/2,u=Math.floor(n),d=Math.floor(s),p=u+1,g=d+1,_=e/u,M=t/d,y=[],T=[],w=[],S=[];for(let m=0;m<g;m++){const O=m*M-c;for(let N=0;N<p;N++){const L=N*_-a;T.push(L,-O,0),w.push(0,0,1),S.push(N/u),S.push(1-m/d)}}for(let m=0;m<d;m++)for(let O=0;O<u;O++){const N=O+p*m,L=O+p*(m+1),q=O+1+p*(m+1),V=O+1+p*m;y.push(N,L,V),y.push(L,q,V)}this.setIndex(y),this.setAttribute("position",new Wi(T,3)),this.setAttribute("normal",new Wi(w,3)),this.setAttribute("uv",new Wi(S,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ys(e.width,e.height,e.widthSegments,e.heightSegments)}}class nh extends is{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new wt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=xc,this.normalScale=new Ct(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new jn,this.combine=Do,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ih extends is{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Zu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class rh extends is{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Pl={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class sh{constructor(e,t,n){const s=this;let a=!1,c=0,u=0,d;const p=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(g){u++,a===!1&&s.onStart!==void 0&&s.onStart(g,c,u),a=!0},this.itemEnd=function(g){c++,s.onProgress!==void 0&&s.onProgress(g,c,u),c===u&&(a=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(g){s.onError!==void 0&&s.onError(g)},this.resolveURL=function(g){return d?d(g):g},this.setURLModifier=function(g){return d=g,this},this.addHandler=function(g,_){return p.push(g,_),this},this.removeHandler=function(g){const _=p.indexOf(g);return _!==-1&&p.splice(_,2),this},this.getHandler=function(g){for(let _=0,M=p.length;_<M;_+=2){const y=p[_],T=p[_+1];if(y.global&&(y.lastIndex=0),y.test(g))return T}return null}}}const ah=new sh;class Lc{constructor(e){this.manager=e!==void 0?e:ah,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,a){n.load(e,s,t,a)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Lc.DEFAULT_MATERIAL_NAME="__DEFAULT";class oh extends Lc{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const a=this,c=Pl.get(e);if(c!==void 0)return a.manager.itemStart(e),setTimeout(function(){t&&t(c),a.manager.itemEnd(e)},0),c;const u=es("img");function d(){g(),Pl.add(e,this),t&&t(this),a.manager.itemEnd(e)}function p(_){g(),s&&s(_),a.manager.itemError(e),a.manager.itemEnd(e)}function g(){u.removeEventListener("load",d,!1),u.removeEventListener("error",p,!1)}return u.addEventListener("load",d,!1),u.addEventListener("error",p,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(u.crossOrigin=this.crossOrigin),a.manager.itemStart(e),u.src=e,u}}class Go extends nn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new wt(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const La=new kt,Dl=new X,Ll=new X;class Uc{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ct(512,512),this.mapType=Yn,this.map=null,this.mapPass=null,this.matrix=new kt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Vo,this._frameExtents=new Ct(1,1),this._viewportCount=1,this._viewports=[new Nt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Dl.setFromMatrixPosition(e.matrixWorld),t.position.copy(Dl),Ll.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ll),t.updateMatrixWorld(),La.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(La),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(La)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Ul=new kt,Gr=new X,Ua=new X;class lh extends Uc{constructor(){super(new Sn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ct(4,2),this._viewportCount=6,this._viewports=[new Nt(2,1,1,1),new Nt(0,1,1,1),new Nt(3,1,1,1),new Nt(1,1,1,1),new Nt(3,0,1,1),new Nt(1,0,1,1)],this._cubeDirections=[new X(1,0,0),new X(-1,0,0),new X(0,0,1),new X(0,0,-1),new X(0,1,0),new X(0,-1,0)],this._cubeUps=[new X(0,1,0),new X(0,1,0),new X(0,1,0),new X(0,1,0),new X(0,0,1),new X(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,a=e.distance||n.far;a!==n.far&&(n.far=a,n.updateProjectionMatrix()),Gr.setFromMatrixPosition(e.matrixWorld),n.position.copy(Gr),Ua.copy(n.position),Ua.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Ua),n.updateMatrixWorld(),s.makeTranslation(-Gr.x,-Gr.y,-Gr.z),Ul.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ul)}}class ch extends Go{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new lh}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Ic extends Rc{constructor(e=-1,t=1,n=1,s=-1,a=.1,c=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=a,this.far=c,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,a,c){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=a,this.view.height=c,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let a=n-e,c=n+e,u=s+t,d=s-t;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,g=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=p*this.view.offsetX,c=a+p*this.view.width,u-=g*this.view.offsetY,d=u-g*this.view.height}this.projectionMatrix.makeOrthographic(a,c,u,d,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class uh extends Uc{constructor(){super(new Ic(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class fh extends Go{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(nn.DEFAULT_UP),this.updateMatrix(),this.target=new nn,this.shadow=new uh}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class hh extends Go{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class dh extends Sn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Il=new kt;class ph{constructor(e,t,n=0,s=1/0){this.ray=new Ec(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new ko,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Il.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Il),this}intersectObject(e,t=!0,n=[]){return bo(e,this,n,t),n.sort(Nl),n}intersectObjects(e,t=!0,n=[]){for(let s=0,a=e.length;s<a;s++)bo(e[s],this,n,t);return n.sort(Nl),n}}function Nl(i,e){return i.distance-e.distance}function bo(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){const a=i.children;for(let c=0,u=a.length;c<u;c++)bo(a[c],e,t,!0)}}function Fl(i,e,t,n){const s=mh(n);switch(t){case pc:return i*e;case gc:return i*e/s.components*s.byteLength;case No:return i*e/s.components*s.byteLength;case _c:return i*e*2/s.components*s.byteLength;case Fo:return i*e*2/s.components*s.byteLength;case mc:return i*e*3/s.components*s.byteLength;case Fn:return i*e*4/s.components*s.byteLength;case Oo:return i*e*4/s.components*s.byteLength;case Ns:case Fs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Os:case Bs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Qa:case to:return Math.max(i,16)*Math.max(e,8)/4;case Ja:case eo:return Math.max(i,8)*Math.max(e,8)/2;case no:case io:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ro:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case so:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ao:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case oo:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case lo:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case co:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case uo:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case fo:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case ho:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case po:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case mo:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case go:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case _o:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case vo:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case xo:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case zs:case Mo:case So:return Math.ceil(i/4)*Math.ceil(e/4)*16;case vc:case yo:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Eo:case To:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function mh(i){switch(i){case Yn:case fc:return{byteLength:1,components:1};case $r:case hc:case ts:return{byteLength:2,components:1};case Uo:case Io:return{byteLength:2,components:4};case qi:case Lo:case oi:return{byteLength:4,components:1};case dc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Po}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Po);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Nc(){let i=null,e=!1,t=null,n=null;function s(a,c){t(a,c),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){i=a}}}function gh(i){const e=new WeakMap;function t(u,d){const p=u.array,g=u.usage,_=p.byteLength,M=i.createBuffer();i.bindBuffer(d,M),i.bufferData(d,p,g),u.onUploadCallback();let y;if(p instanceof Float32Array)y=i.FLOAT;else if(p instanceof Uint16Array)u.isFloat16BufferAttribute?y=i.HALF_FLOAT:y=i.UNSIGNED_SHORT;else if(p instanceof Int16Array)y=i.SHORT;else if(p instanceof Uint32Array)y=i.UNSIGNED_INT;else if(p instanceof Int32Array)y=i.INT;else if(p instanceof Int8Array)y=i.BYTE;else if(p instanceof Uint8Array)y=i.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)y=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:M,type:y,bytesPerElement:p.BYTES_PER_ELEMENT,version:u.version,size:_}}function n(u,d,p){const g=d.array,_=d.updateRanges;if(i.bindBuffer(p,u),_.length===0)i.bufferSubData(p,0,g);else{_.sort((y,T)=>y.start-T.start);let M=0;for(let y=1;y<_.length;y++){const T=_[M],w=_[y];w.start<=T.start+T.count+1?T.count=Math.max(T.count,w.start+w.count-T.start):(++M,_[M]=w)}_.length=M+1;for(let y=0,T=_.length;y<T;y++){const w=_[y];i.bufferSubData(p,w.start*g.BYTES_PER_ELEMENT,g,w.start,w.count)}d.clearUpdateRanges()}d.onUploadCallback()}function s(u){return u.isInterleavedBufferAttribute&&(u=u.data),e.get(u)}function a(u){u.isInterleavedBufferAttribute&&(u=u.data);const d=e.get(u);d&&(i.deleteBuffer(d.buffer),e.delete(u))}function c(u,d){if(u.isInterleavedBufferAttribute&&(u=u.data),u.isGLBufferAttribute){const g=e.get(u);(!g||g.version<u.version)&&e.set(u,{buffer:u.buffer,type:u.type,bytesPerElement:u.elementSize,version:u.version});return}const p=e.get(u);if(p===void 0)e.set(u,t(u,d));else if(p.version<u.version){if(p.size!==u.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(p.buffer,u,d),p.version=u.version}}return{get:s,remove:a,update:c}}var _h=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,vh=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,xh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Mh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Sh=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,yh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Eh=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Th=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,bh=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Ah=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,wh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ch=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Rh=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Ph=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Dh=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Lh=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Uh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ih=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Nh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Fh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Oh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Bh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,zh=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Hh=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,kh=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Vh=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Gh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Wh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Xh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,qh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Yh="gl_FragColor = linearToOutputTexel( gl_FragColor );",jh=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,$h=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Kh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Zh=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Jh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Qh=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,ed=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,td=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,nd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,id=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,rd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,sd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ad=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,od=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ld=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,cd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,ud=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,fd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,hd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,dd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,pd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,md=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,gd=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,_d=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,vd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,xd=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Md=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sd=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yd=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ed=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Td=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,bd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Ad=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Cd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Rd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Pd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Dd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ld=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Ud=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Id=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Nd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Fd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Od=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,zd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Hd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,kd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Vd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Gd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Wd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Xd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,qd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Yd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,jd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,$d=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Kd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Zd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Jd=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Qd=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,ep=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,tp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,np=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ip=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,rp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,sp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,ap=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,op=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,lp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,cp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,up=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,fp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,hp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,dp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,pp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,mp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const gp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,_p=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Sp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Ep=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Tp=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,bp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Ap=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,wp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Rp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Pp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Dp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Up=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ip=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Np=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Op=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Bp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,kp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Gp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Xp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,qp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Yp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,jp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,$p=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ot={alphahash_fragment:_h,alphahash_pars_fragment:vh,alphamap_fragment:xh,alphamap_pars_fragment:Mh,alphatest_fragment:Sh,alphatest_pars_fragment:yh,aomap_fragment:Eh,aomap_pars_fragment:Th,batching_pars_vertex:bh,batching_vertex:Ah,begin_vertex:wh,beginnormal_vertex:Ch,bsdfs:Rh,iridescence_fragment:Ph,bumpmap_pars_fragment:Dh,clipping_planes_fragment:Lh,clipping_planes_pars_fragment:Uh,clipping_planes_pars_vertex:Ih,clipping_planes_vertex:Nh,color_fragment:Fh,color_pars_fragment:Oh,color_pars_vertex:Bh,color_vertex:zh,common:Hh,cube_uv_reflection_fragment:kh,defaultnormal_vertex:Vh,displacementmap_pars_vertex:Gh,displacementmap_vertex:Wh,emissivemap_fragment:Xh,emissivemap_pars_fragment:qh,colorspace_fragment:Yh,colorspace_pars_fragment:jh,envmap_fragment:$h,envmap_common_pars_fragment:Kh,envmap_pars_fragment:Zh,envmap_pars_vertex:Jh,envmap_physical_pars_fragment:cd,envmap_vertex:Qh,fog_vertex:ed,fog_pars_vertex:td,fog_fragment:nd,fog_pars_fragment:id,gradientmap_pars_fragment:rd,lightmap_pars_fragment:sd,lights_lambert_fragment:ad,lights_lambert_pars_fragment:od,lights_pars_begin:ld,lights_toon_fragment:ud,lights_toon_pars_fragment:fd,lights_phong_fragment:hd,lights_phong_pars_fragment:dd,lights_physical_fragment:pd,lights_physical_pars_fragment:md,lights_fragment_begin:gd,lights_fragment_maps:_d,lights_fragment_end:vd,logdepthbuf_fragment:xd,logdepthbuf_pars_fragment:Md,logdepthbuf_pars_vertex:Sd,logdepthbuf_vertex:yd,map_fragment:Ed,map_pars_fragment:Td,map_particle_fragment:bd,map_particle_pars_fragment:Ad,metalnessmap_fragment:wd,metalnessmap_pars_fragment:Cd,morphinstance_vertex:Rd,morphcolor_vertex:Pd,morphnormal_vertex:Dd,morphtarget_pars_vertex:Ld,morphtarget_vertex:Ud,normal_fragment_begin:Id,normal_fragment_maps:Nd,normal_pars_fragment:Fd,normal_pars_vertex:Od,normal_vertex:Bd,normalmap_pars_fragment:zd,clearcoat_normal_fragment_begin:Hd,clearcoat_normal_fragment_maps:kd,clearcoat_pars_fragment:Vd,iridescence_pars_fragment:Gd,opaque_fragment:Wd,packing:Xd,premultiplied_alpha_fragment:qd,project_vertex:Yd,dithering_fragment:jd,dithering_pars_fragment:$d,roughnessmap_fragment:Kd,roughnessmap_pars_fragment:Zd,shadowmap_pars_fragment:Jd,shadowmap_pars_vertex:Qd,shadowmap_vertex:ep,shadowmask_pars_fragment:tp,skinbase_vertex:np,skinning_pars_vertex:ip,skinning_vertex:rp,skinnormal_vertex:sp,specularmap_fragment:ap,specularmap_pars_fragment:op,tonemapping_fragment:lp,tonemapping_pars_fragment:cp,transmission_fragment:up,transmission_pars_fragment:fp,uv_pars_fragment:hp,uv_pars_vertex:dp,uv_vertex:pp,worldpos_vertex:mp,background_vert:gp,background_frag:_p,backgroundCube_vert:vp,backgroundCube_frag:xp,cube_vert:Mp,cube_frag:Sp,depth_vert:yp,depth_frag:Ep,distanceRGBA_vert:Tp,distanceRGBA_frag:bp,equirect_vert:Ap,equirect_frag:wp,linedashed_vert:Cp,linedashed_frag:Rp,meshbasic_vert:Pp,meshbasic_frag:Dp,meshlambert_vert:Lp,meshlambert_frag:Up,meshmatcap_vert:Ip,meshmatcap_frag:Np,meshnormal_vert:Fp,meshnormal_frag:Op,meshphong_vert:Bp,meshphong_frag:zp,meshphysical_vert:Hp,meshphysical_frag:kp,meshtoon_vert:Vp,meshtoon_frag:Gp,points_vert:Wp,points_frag:Xp,shadow_vert:qp,shadow_frag:Yp,sprite_vert:jp,sprite_frag:$p},Ee={common:{diffuse:{value:new wt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new rt},alphaMap:{value:null},alphaMapTransform:{value:new rt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new rt}},envmap:{envMap:{value:null},envMapRotation:{value:new rt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new rt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new rt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new rt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new rt},normalScale:{value:new Ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new rt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new rt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new rt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new rt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new wt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new wt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new rt},alphaTest:{value:0},uvTransform:{value:new rt}},sprite:{diffuse:{value:new wt(16777215)},opacity:{value:1},center:{value:new Ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new rt},alphaMap:{value:null},alphaMapTransform:{value:new rt},alphaTest:{value:0}}},Gn={basic:{uniforms:hn([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.fog]),vertexShader:ot.meshbasic_vert,fragmentShader:ot.meshbasic_frag},lambert:{uniforms:hn([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new wt(0)}}]),vertexShader:ot.meshlambert_vert,fragmentShader:ot.meshlambert_frag},phong:{uniforms:hn([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new wt(0)},specular:{value:new wt(1118481)},shininess:{value:30}}]),vertexShader:ot.meshphong_vert,fragmentShader:ot.meshphong_frag},standard:{uniforms:hn([Ee.common,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.roughnessmap,Ee.metalnessmap,Ee.fog,Ee.lights,{emissive:{value:new wt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag},toon:{uniforms:hn([Ee.common,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.gradientmap,Ee.fog,Ee.lights,{emissive:{value:new wt(0)}}]),vertexShader:ot.meshtoon_vert,fragmentShader:ot.meshtoon_frag},matcap:{uniforms:hn([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,{matcap:{value:null}}]),vertexShader:ot.meshmatcap_vert,fragmentShader:ot.meshmatcap_frag},points:{uniforms:hn([Ee.points,Ee.fog]),vertexShader:ot.points_vert,fragmentShader:ot.points_frag},dashed:{uniforms:hn([Ee.common,Ee.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ot.linedashed_vert,fragmentShader:ot.linedashed_frag},depth:{uniforms:hn([Ee.common,Ee.displacementmap]),vertexShader:ot.depth_vert,fragmentShader:ot.depth_frag},normal:{uniforms:hn([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,{opacity:{value:1}}]),vertexShader:ot.meshnormal_vert,fragmentShader:ot.meshnormal_frag},sprite:{uniforms:hn([Ee.sprite,Ee.fog]),vertexShader:ot.sprite_vert,fragmentShader:ot.sprite_frag},background:{uniforms:{uvTransform:{value:new rt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ot.background_vert,fragmentShader:ot.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new rt}},vertexShader:ot.backgroundCube_vert,fragmentShader:ot.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ot.cube_vert,fragmentShader:ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ot.equirect_vert,fragmentShader:ot.equirect_frag},distanceRGBA:{uniforms:hn([Ee.common,Ee.displacementmap,{referencePosition:{value:new X},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ot.distanceRGBA_vert,fragmentShader:ot.distanceRGBA_frag},shadow:{uniforms:hn([Ee.lights,Ee.fog,{color:{value:new wt(0)},opacity:{value:1}}]),vertexShader:ot.shadow_vert,fragmentShader:ot.shadow_frag}};Gn.physical={uniforms:hn([Gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new rt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new rt},clearcoatNormalScale:{value:new Ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new rt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new rt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new rt},sheen:{value:0},sheenColor:{value:new wt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new rt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new rt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new rt},transmissionSamplerSize:{value:new Ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new rt},attenuationDistance:{value:0},attenuationColor:{value:new wt(0)},specularColor:{value:new wt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new rt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new rt},anisotropyVector:{value:new Ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new rt}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag};const Ds={r:0,b:0,g:0},Fi=new jn,Kp=new kt;function Zp(i,e,t,n,s,a,c){const u=new wt(0);let d=a===!0?0:1,p,g,_=null,M=0,y=null;function T(N){let L=N.isScene===!0?N.background:null;return L&&L.isTexture&&(L=(N.backgroundBlurriness>0?t:e).get(L)),L}function w(N){let L=!1;const q=T(N);q===null?m(u,d):q&&q.isColor&&(m(q,1),L=!0);const V=i.xr.getEnvironmentBlendMode();V==="additive"?n.buffers.color.setClear(0,0,0,1,c):V==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,c),(i.autoClear||L)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function S(N,L){const q=T(L);q&&(q.isCubeTexture||q.mapping===qs)?(g===void 0&&(g=new qn(new rs(1,1,1),new Ai({name:"BackgroundCubeMaterial",uniforms:Er(Gn.backgroundCube.uniforms),vertexShader:Gn.backgroundCube.vertexShader,fragmentShader:Gn.backgroundCube.fragmentShader,side:vn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),g.geometry.deleteAttribute("normal"),g.geometry.deleteAttribute("uv"),g.onBeforeRender=function(V,l,Y){this.matrixWorld.copyPosition(Y.matrixWorld)},Object.defineProperty(g.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(g)),Fi.copy(L.backgroundRotation),Fi.x*=-1,Fi.y*=-1,Fi.z*=-1,q.isCubeTexture&&q.isRenderTargetTexture===!1&&(Fi.y*=-1,Fi.z*=-1),g.material.uniforms.envMap.value=q,g.material.uniforms.flipEnvMap.value=q.isCubeTexture&&q.isRenderTargetTexture===!1?-1:1,g.material.uniforms.backgroundBlurriness.value=L.backgroundBlurriness,g.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,g.material.uniforms.backgroundRotation.value.setFromMatrix4(Kp.makeRotationFromEuler(Fi)),g.material.toneMapped=At.getTransfer(q.colorSpace)!==It,(_!==q||M!==q.version||y!==i.toneMapping)&&(g.material.needsUpdate=!0,_=q,M=q.version,y=i.toneMapping),g.layers.enableAll(),N.unshift(g,g.geometry,g.material,0,0,null)):q&&q.isTexture&&(p===void 0&&(p=new qn(new Ys(2,2),new Ai({name:"BackgroundMaterial",uniforms:Er(Gn.background.uniforms),vertexShader:Gn.background.vertexShader,fragmentShader:Gn.background.fragmentShader,side:bi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),Object.defineProperty(p.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(p)),p.material.uniforms.t2D.value=q,p.material.uniforms.backgroundIntensity.value=L.backgroundIntensity,p.material.toneMapped=At.getTransfer(q.colorSpace)!==It,q.matrixAutoUpdate===!0&&q.updateMatrix(),p.material.uniforms.uvTransform.value.copy(q.matrix),(_!==q||M!==q.version||y!==i.toneMapping)&&(p.material.needsUpdate=!0,_=q,M=q.version,y=i.toneMapping),p.layers.enableAll(),N.unshift(p,p.geometry,p.material,0,0,null))}function m(N,L){N.getRGB(Ds,Cc(i)),n.buffers.color.setClear(Ds.r,Ds.g,Ds.b,L,c)}function O(){g!==void 0&&(g.geometry.dispose(),g.material.dispose(),g=void 0),p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0)}return{getClearColor:function(){return u},setClearColor:function(N,L=1){u.set(N),d=L,m(u,d)},getClearAlpha:function(){return d},setClearAlpha:function(N){d=N,m(u,d)},render:w,addToRenderList:S,dispose:O}}function Jp(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=M(null);let a=s,c=!1;function u(C,z,ue,j,de){let me=!1;const he=_(j,ue,z);a!==he&&(a=he,p(a.object)),me=y(C,j,ue,de),me&&T(C,j,ue,de),de!==null&&e.update(de,i.ELEMENT_ARRAY_BUFFER),(me||c)&&(c=!1,L(C,z,ue,j),de!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(de).buffer))}function d(){return i.createVertexArray()}function p(C){return i.bindVertexArray(C)}function g(C){return i.deleteVertexArray(C)}function _(C,z,ue){const j=ue.wireframe===!0;let de=n[C.id];de===void 0&&(de={},n[C.id]=de);let me=de[z.id];me===void 0&&(me={},de[z.id]=me);let he=me[j];return he===void 0&&(he=M(d()),me[j]=he),he}function M(C){const z=[],ue=[],j=[];for(let de=0;de<t;de++)z[de]=0,ue[de]=0,j[de]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:ue,attributeDivisors:j,object:C,attributes:{},index:null}}function y(C,z,ue,j){const de=a.attributes,me=z.attributes;let he=0;const pe=ue.getAttributes();for(const se in pe)if(pe[se].location>=0){const Ue=de[se];let Ve=me[se];if(Ve===void 0&&(se==="instanceMatrix"&&C.instanceMatrix&&(Ve=C.instanceMatrix),se==="instanceColor"&&C.instanceColor&&(Ve=C.instanceColor)),Ue===void 0||Ue.attribute!==Ve||Ve&&Ue.data!==Ve.data)return!0;he++}return a.attributesNum!==he||a.index!==j}function T(C,z,ue,j){const de={},me=z.attributes;let he=0;const pe=ue.getAttributes();for(const se in pe)if(pe[se].location>=0){let Ue=me[se];Ue===void 0&&(se==="instanceMatrix"&&C.instanceMatrix&&(Ue=C.instanceMatrix),se==="instanceColor"&&C.instanceColor&&(Ue=C.instanceColor));const Ve={};Ve.attribute=Ue,Ue&&Ue.data&&(Ve.data=Ue.data),de[se]=Ve,he++}a.attributes=de,a.attributesNum=he,a.index=j}function w(){const C=a.newAttributes;for(let z=0,ue=C.length;z<ue;z++)C[z]=0}function S(C){m(C,0)}function m(C,z){const ue=a.newAttributes,j=a.enabledAttributes,de=a.attributeDivisors;ue[C]=1,j[C]===0&&(i.enableVertexAttribArray(C),j[C]=1),de[C]!==z&&(i.vertexAttribDivisor(C,z),de[C]=z)}function O(){const C=a.newAttributes,z=a.enabledAttributes;for(let ue=0,j=z.length;ue<j;ue++)z[ue]!==C[ue]&&(i.disableVertexAttribArray(ue),z[ue]=0)}function N(C,z,ue,j,de,me,he){he===!0?i.vertexAttribIPointer(C,z,ue,de,me):i.vertexAttribPointer(C,z,ue,j,de,me)}function L(C,z,ue,j){w();const de=j.attributes,me=ue.getAttributes(),he=z.defaultAttributeValues;for(const pe in me){const se=me[pe];if(se.location>=0){let Se=de[pe];if(Se===void 0&&(pe==="instanceMatrix"&&C.instanceMatrix&&(Se=C.instanceMatrix),pe==="instanceColor"&&C.instanceColor&&(Se=C.instanceColor)),Se!==void 0){const Ue=Se.normalized,Ve=Se.itemSize,st=e.get(Se);if(st===void 0)continue;const Rt=st.buffer,ce=st.type,Me=st.bytesPerElement,Oe=ce===i.INT||ce===i.UNSIGNED_INT||Se.gpuType===Lo;if(Se.isInterleavedBufferAttribute){const be=Se.data,$e=be.stride,Mt=Se.offset;if(be.isInstancedInterleavedBuffer){for(let He=0;He<se.locationSize;He++)m(se.location+He,be.meshPerAttribute);C.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=be.meshPerAttribute*be.count)}else for(let He=0;He<se.locationSize;He++)S(se.location+He);i.bindBuffer(i.ARRAY_BUFFER,Rt);for(let He=0;He<se.locationSize;He++)N(se.location+He,Ve/se.locationSize,ce,Ue,$e*Me,(Mt+Ve/se.locationSize*He)*Me,Oe)}else{if(Se.isInstancedBufferAttribute){for(let be=0;be<se.locationSize;be++)m(se.location+be,Se.meshPerAttribute);C.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=Se.meshPerAttribute*Se.count)}else for(let be=0;be<se.locationSize;be++)S(se.location+be);i.bindBuffer(i.ARRAY_BUFFER,Rt);for(let be=0;be<se.locationSize;be++)N(se.location+be,Ve/se.locationSize,ce,Ue,Ve*Me,Ve/se.locationSize*be*Me,Oe)}}else if(he!==void 0){const Ue=he[pe];if(Ue!==void 0)switch(Ue.length){case 2:i.vertexAttrib2fv(se.location,Ue);break;case 3:i.vertexAttrib3fv(se.location,Ue);break;case 4:i.vertexAttrib4fv(se.location,Ue);break;default:i.vertexAttrib1fv(se.location,Ue)}}}}O()}function q(){Y();for(const C in n){const z=n[C];for(const ue in z){const j=z[ue];for(const de in j)g(j[de].object),delete j[de];delete z[ue]}delete n[C]}}function V(C){if(n[C.id]===void 0)return;const z=n[C.id];for(const ue in z){const j=z[ue];for(const de in j)g(j[de].object),delete j[de];delete z[ue]}delete n[C.id]}function l(C){for(const z in n){const ue=n[z];if(ue[C.id]===void 0)continue;const j=ue[C.id];for(const de in j)g(j[de].object),delete j[de];delete ue[C.id]}}function Y(){R(),c=!0,a!==s&&(a=s,p(a.object))}function R(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:u,reset:Y,resetDefaultState:R,dispose:q,releaseStatesOfGeometry:V,releaseStatesOfProgram:l,initAttributes:w,enableAttribute:S,disableUnusedAttributes:O}}function Qp(i,e,t){let n;function s(p){n=p}function a(p,g){i.drawArrays(n,p,g),t.update(g,n,1)}function c(p,g,_){_!==0&&(i.drawArraysInstanced(n,p,g,_),t.update(g,n,_))}function u(p,g,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,p,0,g,0,_);let y=0;for(let T=0;T<_;T++)y+=g[T];t.update(y,n,1)}function d(p,g,_,M){if(_===0)return;const y=e.get("WEBGL_multi_draw");if(y===null)for(let T=0;T<p.length;T++)c(p[T],g[T],M[T]);else{y.multiDrawArraysInstancedWEBGL(n,p,0,g,0,M,0,_);let T=0;for(let w=0;w<_;w++)T+=g[w]*M[w];t.update(T,n,1)}}this.setMode=s,this.render=a,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function em(i,e,t,n){let s;function a(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const l=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(l.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function c(l){return!(l!==Fn&&n.convert(l)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function u(l){const Y=l===ts&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(l!==Yn&&n.convert(l)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&l!==oi&&!Y)}function d(l){if(l==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";l="mediump"}return l==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=t.precision!==void 0?t.precision:"highp";const g=d(p);g!==p&&(console.warn("THREE.WebGLRenderer:",p,"not supported, using",g,"instead."),p=g);const _=t.logarithmicDepthBuffer===!0,M=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),y=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),T=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),w=i.getParameter(i.MAX_TEXTURE_SIZE),S=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),O=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),N=i.getParameter(i.MAX_VARYING_VECTORS),L=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),q=T>0,V=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:d,textureFormatReadable:c,textureTypeReadable:u,precision:p,logarithmicDepthBuffer:_,reverseDepthBuffer:M,maxTextures:y,maxVertexTextures:T,maxTextureSize:w,maxCubemapSize:S,maxAttributes:m,maxVertexUniforms:O,maxVaryings:N,maxFragmentUniforms:L,vertexTextures:q,maxSamples:V}}function tm(i){const e=this;let t=null,n=0,s=!1,a=!1;const c=new Bi,u=new rt,d={value:null,needsUpdate:!1};this.uniform=d,this.numPlanes=0,this.numIntersection=0,this.init=function(_,M){const y=_.length!==0||M||n!==0||s;return s=M,n=_.length,y},this.beginShadows=function(){a=!0,g(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(_,M){t=g(_,M,0)},this.setState=function(_,M,y){const T=_.clippingPlanes,w=_.clipIntersection,S=_.clipShadows,m=i.get(_);if(!s||T===null||T.length===0||a&&!S)a?g(null):p();else{const O=a?0:n,N=O*4;let L=m.clippingState||null;d.value=L,L=g(T,M,N,y);for(let q=0;q!==N;++q)L[q]=t[q];m.clippingState=L,this.numIntersection=w?this.numPlanes:0,this.numPlanes+=O}};function p(){d.value!==t&&(d.value=t,d.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function g(_,M,y,T){const w=_!==null?_.length:0;let S=null;if(w!==0){if(S=d.value,T!==!0||S===null){const m=y+w*4,O=M.matrixWorldInverse;u.getNormalMatrix(O),(S===null||S.length<m)&&(S=new Float32Array(m));for(let N=0,L=y;N!==w;++N,L+=4)c.copy(_[N]).applyMatrix4(O,u),c.normal.toArray(S,L),S[L+3]=c.constant}d.value=S,d.needsUpdate=!0}return e.numPlanes=w,e.numIntersection=0,S}}function nm(i){let e=new WeakMap;function t(c,u){return u===$a?c.mapping=Mr:u===Ka&&(c.mapping=Sr),c}function n(c){if(c&&c.isTexture){const u=c.mapping;if(u===$a||u===Ka)if(e.has(c)){const d=e.get(c).texture;return t(d,c.mapping)}else{const d=c.image;if(d&&d.height>0){const p=new Kf(d.height);return p.fromEquirectangularTexture(i,c),e.set(c,p),c.addEventListener("dispose",s),t(p.texture,c.mapping)}else return null}}return c}function s(c){const u=c.target;u.removeEventListener("dispose",s);const d=e.get(u);d!==void 0&&(e.delete(u),d.dispose())}function a(){e=new WeakMap}return{get:n,dispose:a}}const mr=4,Ol=[.125,.215,.35,.446,.526,.582],ki=20,Ia=new Ic,Bl=new wt;let Na=null,Fa=0,Oa=0,Ba=!1;const zi=(1+Math.sqrt(5))/2,hr=1/zi,zl=[new X(-zi,hr,0),new X(zi,hr,0),new X(-hr,0,zi),new X(hr,0,zi),new X(0,zi,-hr),new X(0,zi,hr),new X(-1,1,-1),new X(1,1,-1),new X(-1,1,1),new X(1,1,1)],im=new X;class Hl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100,a={}){const{size:c=256,position:u=im}=a;Na=this._renderer.getRenderTarget(),Fa=this._renderer.getActiveCubeFace(),Oa=this._renderer.getActiveMipmapLevel(),Ba=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(c);const d=this._allocateTargets();return d.depthBuffer=!0,this._sceneToCubeUV(e,n,s,d,u),t>0&&this._blur(d,0,0,t),this._applyPMREM(d),this._cleanup(d),d}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Gl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Vl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Na,Fa,Oa),this._renderer.xr.enabled=Ba,e.scissorTest=!1,Ls(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Mr||e.mapping===Sr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Na=this._renderer.getRenderTarget(),Fa=this._renderer.getActiveCubeFace(),Oa=this._renderer.getActiveMipmapLevel(),Ba=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Xn,minFilter:Xn,generateMipmaps:!1,type:ts,format:Fn,colorSpace:yr,depthBuffer:!1},s=kl(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=kl(e,t,n);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=rm(a)),this._blurMaterial=sm(a,e,t)}return s}_compileMaterial(e){const t=new qn(this._lodPlanes[0],e);this._renderer.compile(t,Ia)}_sceneToCubeUV(e,t,n,s,a){const d=new Sn(90,1,t,n),p=[1,-1,1,1,1,1],g=[1,1,1,-1,-1,-1],_=this._renderer,M=_.autoClear,y=_.toneMapping;_.getClearColor(Bl),_.toneMapping=Ti,_.autoClear=!1;const T=new bc({name:"PMREM.Background",side:vn,depthWrite:!1,depthTest:!1}),w=new qn(new rs,T);let S=!1;const m=e.background;m?m.isColor&&(T.color.copy(m),e.background=null,S=!0):(T.color.copy(Bl),S=!0);for(let O=0;O<6;O++){const N=O%3;N===0?(d.up.set(0,p[O],0),d.position.set(a.x,a.y,a.z),d.lookAt(a.x+g[O],a.y,a.z)):N===1?(d.up.set(0,0,p[O]),d.position.set(a.x,a.y,a.z),d.lookAt(a.x,a.y+g[O],a.z)):(d.up.set(0,p[O],0),d.position.set(a.x,a.y,a.z),d.lookAt(a.x,a.y,a.z+g[O]));const L=this._cubeSize;Ls(s,N*L,O>2?L:0,L,L),_.setRenderTarget(s),S&&_.render(w,d),_.render(e,d)}w.geometry.dispose(),w.material.dispose(),_.toneMapping=y,_.autoClear=M,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Mr||e.mapping===Sr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Gl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Vl());const a=s?this._cubemapMaterial:this._equirectMaterial,c=new qn(this._lodPlanes[0],a),u=a.uniforms;u.envMap.value=e;const d=this._cubeSize;Ls(t,0,0,3*d,2*d),n.setRenderTarget(t),n.render(c,Ia)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let a=1;a<s;a++){const c=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),u=zl[(s-a-1)%zl.length];this._blur(e,a-1,a,c,u)}t.autoClear=n}_blur(e,t,n,s,a){const c=this._pingPongRenderTarget;this._halfBlur(e,c,t,n,s,"latitudinal",a),this._halfBlur(c,e,n,n,s,"longitudinal",a)}_halfBlur(e,t,n,s,a,c,u){const d=this._renderer,p=this._blurMaterial;c!=="latitudinal"&&c!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const g=3,_=new qn(this._lodPlanes[s],p),M=p.uniforms,y=this._sizeLods[n]-1,T=isFinite(a)?Math.PI/(2*y):2*Math.PI/(2*ki-1),w=a/T,S=isFinite(a)?1+Math.floor(g*w):ki;S>ki&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${S} samples when the maximum is set to ${ki}`);const m=[];let O=0;for(let l=0;l<ki;++l){const Y=l/w,R=Math.exp(-Y*Y/2);m.push(R),l===0?O+=R:l<S&&(O+=2*R)}for(let l=0;l<m.length;l++)m[l]=m[l]/O;M.envMap.value=e.texture,M.samples.value=S,M.weights.value=m,M.latitudinal.value=c==="latitudinal",u&&(M.poleAxis.value=u);const{_lodMax:N}=this;M.dTheta.value=T,M.mipInt.value=N-n;const L=this._sizeLods[s],q=3*L*(s>N-mr?s-N+mr:0),V=4*(this._cubeSize-L);Ls(t,q,V,3*L,2*L),d.setRenderTarget(t),d.render(_,Ia)}}function rm(i){const e=[],t=[],n=[];let s=i;const a=i-mr+1+Ol.length;for(let c=0;c<a;c++){const u=Math.pow(2,s);t.push(u);let d=1/u;c>i-mr?d=Ol[c-i+mr-1]:c===0&&(d=0),n.push(d);const p=1/(u-2),g=-p,_=1+p,M=[g,g,_,g,_,_,g,g,_,_,g,_],y=6,T=6,w=3,S=2,m=1,O=new Float32Array(w*T*y),N=new Float32Array(S*T*y),L=new Float32Array(m*T*y);for(let V=0;V<y;V++){const l=V%3*2/3-1,Y=V>2?0:-1,R=[l,Y,0,l+2/3,Y,0,l+2/3,Y+1,0,l,Y,0,l+2/3,Y+1,0,l,Y+1,0];O.set(R,w*T*V),N.set(M,S*T*V);const C=[V,V,V,V,V,V];L.set(C,m*T*V)}const q=new wi;q.setAttribute("position",new Rn(O,w)),q.setAttribute("uv",new Rn(N,S)),q.setAttribute("faceIndex",new Rn(L,m)),e.push(q),s>mr&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function kl(i,e,t){const n=new Yi(i,e,t);return n.texture.mapping=qs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ls(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function sm(i,e,t){const n=new Float32Array(ki),s=new X(0,1,0);return new Ai({name:"SphericalGaussianBlur",defines:{n:ki,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Wo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ei,depthTest:!1,depthWrite:!1})}function Vl(){return new Ai({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Wo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ei,depthTest:!1,depthWrite:!1})}function Gl(){return new Ai({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Wo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ei,depthTest:!1,depthWrite:!1})}function Wo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function am(i){let e=new WeakMap,t=null;function n(u){if(u&&u.isTexture){const d=u.mapping,p=d===$a||d===Ka,g=d===Mr||d===Sr;if(p||g){let _=e.get(u);const M=_!==void 0?_.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==M)return t===null&&(t=new Hl(i)),_=p?t.fromEquirectangular(u,_):t.fromCubemap(u,_),_.texture.pmremVersion=u.pmremVersion,e.set(u,_),_.texture;if(_!==void 0)return _.texture;{const y=u.image;return p&&y&&y.height>0||g&&y&&s(y)?(t===null&&(t=new Hl(i)),_=p?t.fromEquirectangular(u):t.fromCubemap(u),_.texture.pmremVersion=u.pmremVersion,e.set(u,_),u.addEventListener("dispose",a),_.texture):null}}}return u}function s(u){let d=0;const p=6;for(let g=0;g<p;g++)u[g]!==void 0&&d++;return d===p}function a(u){const d=u.target;d.removeEventListener("dispose",a);const p=e.get(d);p!==void 0&&(e.delete(d),p.dispose())}function c(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:c}}function om(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Hs("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function lm(i,e,t,n){const s={},a=new WeakMap;function c(_){const M=_.target;M.index!==null&&e.remove(M.index);for(const T in M.attributes)e.remove(M.attributes[T]);M.removeEventListener("dispose",c),delete s[M.id];const y=a.get(M);y&&(e.remove(y),a.delete(M)),n.releaseStatesOfGeometry(M),M.isInstancedBufferGeometry===!0&&delete M._maxInstanceCount,t.memory.geometries--}function u(_,M){return s[M.id]===!0||(M.addEventListener("dispose",c),s[M.id]=!0,t.memory.geometries++),M}function d(_){const M=_.attributes;for(const y in M)e.update(M[y],i.ARRAY_BUFFER)}function p(_){const M=[],y=_.index,T=_.attributes.position;let w=0;if(y!==null){const O=y.array;w=y.version;for(let N=0,L=O.length;N<L;N+=3){const q=O[N+0],V=O[N+1],l=O[N+2];M.push(q,V,V,l,l,q)}}else if(T!==void 0){const O=T.array;w=T.version;for(let N=0,L=O.length/3-1;N<L;N+=3){const q=N+0,V=N+1,l=N+2;M.push(q,V,V,l,l,q)}}else return;const S=new(Sc(M)?wc:Ac)(M,1);S.version=w;const m=a.get(_);m&&e.remove(m),a.set(_,S)}function g(_){const M=a.get(_);if(M){const y=_.index;y!==null&&M.version<y.version&&p(_)}else p(_);return a.get(_)}return{get:u,update:d,getWireframeAttribute:g}}function cm(i,e,t){let n;function s(M){n=M}let a,c;function u(M){a=M.type,c=M.bytesPerElement}function d(M,y){i.drawElements(n,y,a,M*c),t.update(y,n,1)}function p(M,y,T){T!==0&&(i.drawElementsInstanced(n,y,a,M*c,T),t.update(y,n,T))}function g(M,y,T){if(T===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,y,0,a,M,0,T);let S=0;for(let m=0;m<T;m++)S+=y[m];t.update(S,n,1)}function _(M,y,T,w){if(T===0)return;const S=e.get("WEBGL_multi_draw");if(S===null)for(let m=0;m<M.length;m++)p(M[m]/c,y[m],w[m]);else{S.multiDrawElementsInstancedWEBGL(n,y,0,a,M,0,w,0,T);let m=0;for(let O=0;O<T;O++)m+=y[O]*w[O];t.update(m,n,1)}}this.setMode=s,this.setIndex=u,this.render=d,this.renderInstances=p,this.renderMultiDraw=g,this.renderMultiDrawInstances=_}function um(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(a,c,u){switch(t.calls++,c){case i.TRIANGLES:t.triangles+=u*(a/3);break;case i.LINES:t.lines+=u*(a/2);break;case i.LINE_STRIP:t.lines+=u*(a-1);break;case i.LINE_LOOP:t.lines+=u*a;break;case i.POINTS:t.points+=u*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",c);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function fm(i,e,t){const n=new WeakMap,s=new Nt;function a(c,u,d){const p=c.morphTargetInfluences,g=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,_=g!==void 0?g.length:0;let M=n.get(u);if(M===void 0||M.count!==_){let C=function(){Y.dispose(),n.delete(u),u.removeEventListener("dispose",C)};var y=C;M!==void 0&&M.texture.dispose();const T=u.morphAttributes.position!==void 0,w=u.morphAttributes.normal!==void 0,S=u.morphAttributes.color!==void 0,m=u.morphAttributes.position||[],O=u.morphAttributes.normal||[],N=u.morphAttributes.color||[];let L=0;T===!0&&(L=1),w===!0&&(L=2),S===!0&&(L=3);let q=u.attributes.position.count*L,V=1;q>e.maxTextureSize&&(V=Math.ceil(q/e.maxTextureSize),q=e.maxTextureSize);const l=new Float32Array(q*V*4*_),Y=new yc(l,q,V,_);Y.type=oi,Y.needsUpdate=!0;const R=L*4;for(let z=0;z<_;z++){const ue=m[z],j=O[z],de=N[z],me=q*V*4*z;for(let he=0;he<ue.count;he++){const pe=he*R;T===!0&&(s.fromBufferAttribute(ue,he),l[me+pe+0]=s.x,l[me+pe+1]=s.y,l[me+pe+2]=s.z,l[me+pe+3]=0),w===!0&&(s.fromBufferAttribute(j,he),l[me+pe+4]=s.x,l[me+pe+5]=s.y,l[me+pe+6]=s.z,l[me+pe+7]=0),S===!0&&(s.fromBufferAttribute(de,he),l[me+pe+8]=s.x,l[me+pe+9]=s.y,l[me+pe+10]=s.z,l[me+pe+11]=de.itemSize===4?s.w:1)}}M={count:_,texture:Y,size:new Ct(q,V)},n.set(u,M),u.addEventListener("dispose",C)}if(c.isInstancedMesh===!0&&c.morphTexture!==null)d.getUniforms().setValue(i,"morphTexture",c.morphTexture,t);else{let T=0;for(let S=0;S<p.length;S++)T+=p[S];const w=u.morphTargetsRelative?1:1-T;d.getUniforms().setValue(i,"morphTargetBaseInfluence",w),d.getUniforms().setValue(i,"morphTargetInfluences",p)}d.getUniforms().setValue(i,"morphTargetsTexture",M.texture,t),d.getUniforms().setValue(i,"morphTargetsTextureSize",M.size)}return{update:a}}function hm(i,e,t,n){let s=new WeakMap;function a(d){const p=n.render.frame,g=d.geometry,_=e.get(d,g);if(s.get(_)!==p&&(e.update(_),s.set(_,p)),d.isInstancedMesh&&(d.hasEventListener("dispose",u)===!1&&d.addEventListener("dispose",u),s.get(d)!==p&&(t.update(d.instanceMatrix,i.ARRAY_BUFFER),d.instanceColor!==null&&t.update(d.instanceColor,i.ARRAY_BUFFER),s.set(d,p))),d.isSkinnedMesh){const M=d.skeleton;s.get(M)!==p&&(M.update(),s.set(M,p))}return _}function c(){s=new WeakMap}function u(d){const p=d.target;p.removeEventListener("dispose",u),t.remove(p.instanceMatrix),p.instanceColor!==null&&t.remove(p.instanceColor)}return{update:a,dispose:c}}const Fc=new dn,Wl=new Dc(1,1),Oc=new yc,Bc=new Uf,zc=new Pc,Xl=[],ql=[],Yl=new Float32Array(16),jl=new Float32Array(9),$l=new Float32Array(4);function Cr(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let a=Xl[s];if(a===void 0&&(a=new Float32Array(s),Xl[s]=a),e!==0){n.toArray(a,0);for(let c=1,u=0;c!==e;++c)u+=t,i[c].toArray(a,u)}return a}function Zt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Jt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function js(i,e){let t=ql[e];t===void 0&&(t=new Int32Array(e),ql[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function dm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function pm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Zt(t,e))return;i.uniform2fv(this.addr,e),Jt(t,e)}}function mm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Zt(t,e))return;i.uniform3fv(this.addr,e),Jt(t,e)}}function gm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Zt(t,e))return;i.uniform4fv(this.addr,e),Jt(t,e)}}function _m(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Zt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Jt(t,e)}else{if(Zt(t,n))return;$l.set(n),i.uniformMatrix2fv(this.addr,!1,$l),Jt(t,n)}}function vm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Zt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Jt(t,e)}else{if(Zt(t,n))return;jl.set(n),i.uniformMatrix3fv(this.addr,!1,jl),Jt(t,n)}}function xm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Zt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Jt(t,e)}else{if(Zt(t,n))return;Yl.set(n),i.uniformMatrix4fv(this.addr,!1,Yl),Jt(t,n)}}function Mm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Sm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Zt(t,e))return;i.uniform2iv(this.addr,e),Jt(t,e)}}function ym(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Zt(t,e))return;i.uniform3iv(this.addr,e),Jt(t,e)}}function Em(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Zt(t,e))return;i.uniform4iv(this.addr,e),Jt(t,e)}}function Tm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function bm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Zt(t,e))return;i.uniform2uiv(this.addr,e),Jt(t,e)}}function Am(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Zt(t,e))return;i.uniform3uiv(this.addr,e),Jt(t,e)}}function wm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Zt(t,e))return;i.uniform4uiv(this.addr,e),Jt(t,e)}}function Cm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let a;this.type===i.SAMPLER_2D_SHADOW?(Wl.compareFunction=Mc,a=Wl):a=Fc,t.setTexture2D(e||a,s)}function Rm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Bc,s)}function Pm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||zc,s)}function Dm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Oc,s)}function Lm(i){switch(i){case 5126:return dm;case 35664:return pm;case 35665:return mm;case 35666:return gm;case 35674:return _m;case 35675:return vm;case 35676:return xm;case 5124:case 35670:return Mm;case 35667:case 35671:return Sm;case 35668:case 35672:return ym;case 35669:case 35673:return Em;case 5125:return Tm;case 36294:return bm;case 36295:return Am;case 36296:return wm;case 35678:case 36198:case 36298:case 36306:case 35682:return Cm;case 35679:case 36299:case 36307:return Rm;case 35680:case 36300:case 36308:case 36293:return Pm;case 36289:case 36303:case 36311:case 36292:return Dm}}function Um(i,e){i.uniform1fv(this.addr,e)}function Im(i,e){const t=Cr(e,this.size,2);i.uniform2fv(this.addr,t)}function Nm(i,e){const t=Cr(e,this.size,3);i.uniform3fv(this.addr,t)}function Fm(i,e){const t=Cr(e,this.size,4);i.uniform4fv(this.addr,t)}function Om(i,e){const t=Cr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Bm(i,e){const t=Cr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function zm(i,e){const t=Cr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Hm(i,e){i.uniform1iv(this.addr,e)}function km(i,e){i.uniform2iv(this.addr,e)}function Vm(i,e){i.uniform3iv(this.addr,e)}function Gm(i,e){i.uniform4iv(this.addr,e)}function Wm(i,e){i.uniform1uiv(this.addr,e)}function Xm(i,e){i.uniform2uiv(this.addr,e)}function qm(i,e){i.uniform3uiv(this.addr,e)}function Ym(i,e){i.uniform4uiv(this.addr,e)}function jm(i,e,t){const n=this.cache,s=e.length,a=js(t,s);Zt(n,a)||(i.uniform1iv(this.addr,a),Jt(n,a));for(let c=0;c!==s;++c)t.setTexture2D(e[c]||Fc,a[c])}function $m(i,e,t){const n=this.cache,s=e.length,a=js(t,s);Zt(n,a)||(i.uniform1iv(this.addr,a),Jt(n,a));for(let c=0;c!==s;++c)t.setTexture3D(e[c]||Bc,a[c])}function Km(i,e,t){const n=this.cache,s=e.length,a=js(t,s);Zt(n,a)||(i.uniform1iv(this.addr,a),Jt(n,a));for(let c=0;c!==s;++c)t.setTextureCube(e[c]||zc,a[c])}function Zm(i,e,t){const n=this.cache,s=e.length,a=js(t,s);Zt(n,a)||(i.uniform1iv(this.addr,a),Jt(n,a));for(let c=0;c!==s;++c)t.setTexture2DArray(e[c]||Oc,a[c])}function Jm(i){switch(i){case 5126:return Um;case 35664:return Im;case 35665:return Nm;case 35666:return Fm;case 35674:return Om;case 35675:return Bm;case 35676:return zm;case 5124:case 35670:return Hm;case 35667:case 35671:return km;case 35668:case 35672:return Vm;case 35669:case 35673:return Gm;case 5125:return Wm;case 36294:return Xm;case 36295:return qm;case 36296:return Ym;case 35678:case 36198:case 36298:case 36306:case 35682:return jm;case 35679:case 36299:case 36307:return $m;case 35680:case 36300:case 36308:case 36293:return Km;case 36289:case 36303:case 36311:case 36292:return Zm}}class Qm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Lm(t.type)}}class eg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Jm(t.type)}}class tg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let a=0,c=s.length;a!==c;++a){const u=s[a];u.setValue(e,t[u.id],n)}}}const za=/(\w+)(\])?(\[|\.)?/g;function Kl(i,e){i.seq.push(e),i.map[e.id]=e}function ng(i,e,t){const n=i.name,s=n.length;for(za.lastIndex=0;;){const a=za.exec(n),c=za.lastIndex;let u=a[1];const d=a[2]==="]",p=a[3];if(d&&(u=u|0),p===void 0||p==="["&&c+2===s){Kl(t,p===void 0?new Qm(u,i,e):new eg(u,i,e));break}else{let _=t.map[u];_===void 0&&(_=new tg(u),Kl(t,_)),t=_}}}class ks{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const a=e.getActiveUniform(t,s),c=e.getUniformLocation(t,a.name);ng(a,c,this)}}setValue(e,t,n,s){const a=this.map[t];a!==void 0&&a.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let a=0,c=t.length;a!==c;++a){const u=t[a],d=n[u.id];d.needsUpdate!==!1&&u.setValue(e,d.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,a=e.length;s!==a;++s){const c=e[s];c.id in t&&n.push(c)}return n}}function Zl(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const ig=37297;let rg=0;function sg(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let c=s;c<a;c++){const u=c+1;n.push(`${u===e?">":" "} ${u}: ${t[c]}`)}return n.join(`
`)}const Jl=new rt;function ag(i){At._getMatrix(Jl,At.workingColorSpace,i);const e=`mat3( ${Jl.elements.map(t=>t.toFixed(4))} )`;switch(At.getTransfer(i)){case Gs:return[e,"LinearTransferOETF"];case It:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Ql(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const c=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+sg(i.getShaderSource(e),c)}else return s}function og(i,e){const t=ag(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function lg(i,e){let t;switch(e){case Gu:t="Linear";break;case Wu:t="Reinhard";break;case Xu:t="Cineon";break;case qu:t="ACESFilmic";break;case ju:t="AgX";break;case $u:t="Neutral";break;case Yu:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Us=new X;function cg(){At.getLuminanceCoefficients(Us);const i=Us.x.toFixed(4),e=Us.y.toFixed(4),t=Us.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ug(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Wr).join(`
`)}function fg(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function hg(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const a=i.getActiveAttrib(e,s),c=a.name;let u=1;a.type===i.FLOAT_MAT2&&(u=2),a.type===i.FLOAT_MAT3&&(u=3),a.type===i.FLOAT_MAT4&&(u=4),t[c]={type:a.type,location:i.getAttribLocation(e,c),locationSize:u}}return t}function Wr(i){return i!==""}function ec(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function tc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const dg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ao(i){return i.replace(dg,mg)}const pg=new Map;function mg(i,e){let t=ot[e];if(t===void 0){const n=pg.get(e);if(n!==void 0)t=ot[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ao(t)}const gg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function nc(i){return i.replace(gg,_g)}function _g(i,e,t,n){let s="";for(let a=parseInt(e);a<parseInt(t);a++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return s}function ic(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function vg(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===cc?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===yu?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===ai&&(e="SHADOWMAP_TYPE_VSM"),e}function xg(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Mr:case Sr:e="ENVMAP_TYPE_CUBE";break;case qs:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Mg(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Sr:e="ENVMAP_MODE_REFRACTION";break}return e}function Sg(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Do:e="ENVMAP_BLENDING_MULTIPLY";break;case ku:e="ENVMAP_BLENDING_MIX";break;case Vu:e="ENVMAP_BLENDING_ADD";break}return e}function yg(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Eg(i,e,t,n){const s=i.getContext(),a=t.defines;let c=t.vertexShader,u=t.fragmentShader;const d=vg(t),p=xg(t),g=Mg(t),_=Sg(t),M=yg(t),y=ug(t),T=fg(a),w=s.createProgram();let S,m,O=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(S=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,T].filter(Wr).join(`
`),S.length>0&&(S+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,T].filter(Wr).join(`
`),m.length>0&&(m+=`
`)):(S=[ic(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,T,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+g:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+d:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Wr).join(`
`),m=[ic(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,T,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+p:"",t.envMap?"#define "+g:"",t.envMap?"#define "+_:"",M?"#define CUBEUV_TEXEL_WIDTH "+M.texelWidth:"",M?"#define CUBEUV_TEXEL_HEIGHT "+M.texelHeight:"",M?"#define CUBEUV_MAX_MIP "+M.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+d:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ti?"#define TONE_MAPPING":"",t.toneMapping!==Ti?ot.tonemapping_pars_fragment:"",t.toneMapping!==Ti?lg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ot.colorspace_pars_fragment,og("linearToOutputTexel",t.outputColorSpace),cg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Wr).join(`
`)),c=Ao(c),c=ec(c,t),c=tc(c,t),u=Ao(u),u=ec(u,t),u=tc(u,t),c=nc(c),u=nc(u),t.isRawShaderMaterial!==!0&&(O=`#version 300 es
`,S=[y,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+S,m=["#define varying in",t.glslVersion===fl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===fl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const N=O+S+c,L=O+m+u,q=Zl(s,s.VERTEX_SHADER,N),V=Zl(s,s.FRAGMENT_SHADER,L);s.attachShader(w,q),s.attachShader(w,V),t.index0AttributeName!==void 0?s.bindAttribLocation(w,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(w,0,"position"),s.linkProgram(w);function l(z){if(i.debug.checkShaderErrors){const ue=s.getProgramInfoLog(w).trim(),j=s.getShaderInfoLog(q).trim(),de=s.getShaderInfoLog(V).trim();let me=!0,he=!0;if(s.getProgramParameter(w,s.LINK_STATUS)===!1)if(me=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,w,q,V);else{const pe=Ql(s,q,"vertex"),se=Ql(s,V,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(w,s.VALIDATE_STATUS)+`

Material Name: `+z.name+`
Material Type: `+z.type+`

Program Info Log: `+ue+`
`+pe+`
`+se)}else ue!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ue):(j===""||de==="")&&(he=!1);he&&(z.diagnostics={runnable:me,programLog:ue,vertexShader:{log:j,prefix:S},fragmentShader:{log:de,prefix:m}})}s.deleteShader(q),s.deleteShader(V),Y=new ks(s,w),R=hg(s,w)}let Y;this.getUniforms=function(){return Y===void 0&&l(this),Y};let R;this.getAttributes=function(){return R===void 0&&l(this),R};let C=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=s.getProgramParameter(w,ig)),C},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(w),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=rg++,this.cacheKey=e,this.usedTimes=1,this.program=w,this.vertexShader=q,this.fragmentShader=V,this}let Tg=0;class bg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),a=this._getShaderStage(n),c=this._getShaderCacheForMaterial(e);return c.has(s)===!1&&(c.add(s),s.usedTimes++),c.has(a)===!1&&(c.add(a),a.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Ag(e),t.set(e,n)),n}}class Ag{constructor(e){this.id=Tg++,this.code=e,this.usedTimes=0}}function wg(i,e,t,n,s,a,c){const u=new ko,d=new bg,p=new Set,g=[],_=s.logarithmicDepthBuffer,M=s.vertexTextures;let y=s.precision;const T={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function w(R){return p.add(R),R===0?"uv":`uv${R}`}function S(R,C,z,ue,j){const de=ue.fog,me=j.geometry,he=R.isMeshStandardMaterial?ue.environment:null,pe=(R.isMeshStandardMaterial?t:e).get(R.envMap||he),se=pe&&pe.mapping===qs?pe.image.height:null,Se=T[R.type];R.precision!==null&&(y=s.getMaxPrecision(R.precision),y!==R.precision&&console.warn("THREE.WebGLProgram.getParameters:",R.precision,"not supported, using",y,"instead."));const Ue=me.morphAttributes.position||me.morphAttributes.normal||me.morphAttributes.color,Ve=Ue!==void 0?Ue.length:0;let st=0;me.morphAttributes.position!==void 0&&(st=1),me.morphAttributes.normal!==void 0&&(st=2),me.morphAttributes.color!==void 0&&(st=3);let Rt,ce,Me,Oe;if(Se){const Pt=Gn[Se];Rt=Pt.vertexShader,ce=Pt.fragmentShader}else Rt=R.vertexShader,ce=R.fragmentShader,d.update(R),Me=d.getVertexShaderID(R),Oe=d.getFragmentShaderID(R);const be=i.getRenderTarget(),$e=i.state.buffers.depth.getReversed(),Mt=j.isInstancedMesh===!0,He=j.isBatchedMesh===!0,Vt=!!R.map,Dt=!!R.matcap,lt=!!pe,F=!!R.aoMap,pn=!!R.lightMap,ft=!!R.bumpMap,ct=!!R.normalMap,Fe=!!R.displacementMap,Ft=!!R.emissiveMap,Ge=!!R.metalnessMap,D=!!R.roughnessMap,b=R.anisotropy>0,K=R.clearcoat>0,le=R.dispersion>0,Z=R.iridescence>0,re=R.sheen>0,ze=R.transmission>0,Ae=b&&!!R.anisotropyMap,Ke=K&&!!R.clearcoatMap,Ze=K&&!!R.clearcoatNormalMap,_e=K&&!!R.clearcoatRoughnessMap,Le=Z&&!!R.iridescenceMap,ke=Z&&!!R.iridescenceThicknessMap,Ye=re&&!!R.sheenColorMap,De=re&&!!R.sheenRoughnessMap,gt=!!R.specularMap,nt=!!R.specularColorMap,Lt=!!R.specularIntensityMap,k=ze&&!!R.transmissionMap,we=ze&&!!R.thicknessMap,ie=!!R.gradientMap,fe=!!R.alphaMap,Ce=R.alphaTest>0,Te=!!R.alphaHash,qe=!!R.extensions;let ht=Ti;R.toneMapped&&(be===null||be.isXRRenderTarget===!0)&&(ht=i.toneMapping);const Xt={shaderID:Se,shaderType:R.type,shaderName:R.name,vertexShader:Rt,fragmentShader:ce,defines:R.defines,customVertexShaderID:Me,customFragmentShaderID:Oe,isRawShaderMaterial:R.isRawShaderMaterial===!0,glslVersion:R.glslVersion,precision:y,batching:He,batchingColor:He&&j._colorsTexture!==null,instancing:Mt,instancingColor:Mt&&j.instanceColor!==null,instancingMorph:Mt&&j.morphTexture!==null,supportsVertexTextures:M,outputColorSpace:be===null?i.outputColorSpace:be.isXRRenderTarget===!0?be.texture.colorSpace:yr,alphaToCoverage:!!R.alphaToCoverage,map:Vt,matcap:Dt,envMap:lt,envMapMode:lt&&pe.mapping,envMapCubeUVHeight:se,aoMap:F,lightMap:pn,bumpMap:ft,normalMap:ct,displacementMap:M&&Fe,emissiveMap:Ft,normalMapObjectSpace:ct&&R.normalMapType===Qu,normalMapTangentSpace:ct&&R.normalMapType===xc,metalnessMap:Ge,roughnessMap:D,anisotropy:b,anisotropyMap:Ae,clearcoat:K,clearcoatMap:Ke,clearcoatNormalMap:Ze,clearcoatRoughnessMap:_e,dispersion:le,iridescence:Z,iridescenceMap:Le,iridescenceThicknessMap:ke,sheen:re,sheenColorMap:Ye,sheenRoughnessMap:De,specularMap:gt,specularColorMap:nt,specularIntensityMap:Lt,transmission:ze,transmissionMap:k,thicknessMap:we,gradientMap:ie,opaque:R.transparent===!1&&R.blending===_r&&R.alphaToCoverage===!1,alphaMap:fe,alphaTest:Ce,alphaHash:Te,combine:R.combine,mapUv:Vt&&w(R.map.channel),aoMapUv:F&&w(R.aoMap.channel),lightMapUv:pn&&w(R.lightMap.channel),bumpMapUv:ft&&w(R.bumpMap.channel),normalMapUv:ct&&w(R.normalMap.channel),displacementMapUv:Fe&&w(R.displacementMap.channel),emissiveMapUv:Ft&&w(R.emissiveMap.channel),metalnessMapUv:Ge&&w(R.metalnessMap.channel),roughnessMapUv:D&&w(R.roughnessMap.channel),anisotropyMapUv:Ae&&w(R.anisotropyMap.channel),clearcoatMapUv:Ke&&w(R.clearcoatMap.channel),clearcoatNormalMapUv:Ze&&w(R.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_e&&w(R.clearcoatRoughnessMap.channel),iridescenceMapUv:Le&&w(R.iridescenceMap.channel),iridescenceThicknessMapUv:ke&&w(R.iridescenceThicknessMap.channel),sheenColorMapUv:Ye&&w(R.sheenColorMap.channel),sheenRoughnessMapUv:De&&w(R.sheenRoughnessMap.channel),specularMapUv:gt&&w(R.specularMap.channel),specularColorMapUv:nt&&w(R.specularColorMap.channel),specularIntensityMapUv:Lt&&w(R.specularIntensityMap.channel),transmissionMapUv:k&&w(R.transmissionMap.channel),thicknessMapUv:we&&w(R.thicknessMap.channel),alphaMapUv:fe&&w(R.alphaMap.channel),vertexTangents:!!me.attributes.tangent&&(ct||b),vertexColors:R.vertexColors,vertexAlphas:R.vertexColors===!0&&!!me.attributes.color&&me.attributes.color.itemSize===4,pointsUvs:j.isPoints===!0&&!!me.attributes.uv&&(Vt||fe),fog:!!de,useFog:R.fog===!0,fogExp2:!!de&&de.isFogExp2,flatShading:R.flatShading===!0,sizeAttenuation:R.sizeAttenuation===!0,logarithmicDepthBuffer:_,reverseDepthBuffer:$e,skinning:j.isSkinnedMesh===!0,morphTargets:me.morphAttributes.position!==void 0,morphNormals:me.morphAttributes.normal!==void 0,morphColors:me.morphAttributes.color!==void 0,morphTargetsCount:Ve,morphTextureStride:st,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numClippingPlanes:c.numPlanes,numClipIntersection:c.numIntersection,dithering:R.dithering,shadowMapEnabled:i.shadowMap.enabled&&z.length>0,shadowMapType:i.shadowMap.type,toneMapping:ht,decodeVideoTexture:Vt&&R.map.isVideoTexture===!0&&At.getTransfer(R.map.colorSpace)===It,decodeVideoTextureEmissive:Ft&&R.emissiveMap.isVideoTexture===!0&&At.getTransfer(R.emissiveMap.colorSpace)===It,premultipliedAlpha:R.premultipliedAlpha,doubleSided:R.side===Wn,flipSided:R.side===vn,useDepthPacking:R.depthPacking>=0,depthPacking:R.depthPacking||0,index0AttributeName:R.index0AttributeName,extensionClipCullDistance:qe&&R.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(qe&&R.extensions.multiDraw===!0||He)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:R.customProgramCacheKey()};return Xt.vertexUv1s=p.has(1),Xt.vertexUv2s=p.has(2),Xt.vertexUv3s=p.has(3),p.clear(),Xt}function m(R){const C=[];if(R.shaderID?C.push(R.shaderID):(C.push(R.customVertexShaderID),C.push(R.customFragmentShaderID)),R.defines!==void 0)for(const z in R.defines)C.push(z),C.push(R.defines[z]);return R.isRawShaderMaterial===!1&&(O(C,R),N(C,R),C.push(i.outputColorSpace)),C.push(R.customProgramCacheKey),C.join()}function O(R,C){R.push(C.precision),R.push(C.outputColorSpace),R.push(C.envMapMode),R.push(C.envMapCubeUVHeight),R.push(C.mapUv),R.push(C.alphaMapUv),R.push(C.lightMapUv),R.push(C.aoMapUv),R.push(C.bumpMapUv),R.push(C.normalMapUv),R.push(C.displacementMapUv),R.push(C.emissiveMapUv),R.push(C.metalnessMapUv),R.push(C.roughnessMapUv),R.push(C.anisotropyMapUv),R.push(C.clearcoatMapUv),R.push(C.clearcoatNormalMapUv),R.push(C.clearcoatRoughnessMapUv),R.push(C.iridescenceMapUv),R.push(C.iridescenceThicknessMapUv),R.push(C.sheenColorMapUv),R.push(C.sheenRoughnessMapUv),R.push(C.specularMapUv),R.push(C.specularColorMapUv),R.push(C.specularIntensityMapUv),R.push(C.transmissionMapUv),R.push(C.thicknessMapUv),R.push(C.combine),R.push(C.fogExp2),R.push(C.sizeAttenuation),R.push(C.morphTargetsCount),R.push(C.morphAttributeCount),R.push(C.numDirLights),R.push(C.numPointLights),R.push(C.numSpotLights),R.push(C.numSpotLightMaps),R.push(C.numHemiLights),R.push(C.numRectAreaLights),R.push(C.numDirLightShadows),R.push(C.numPointLightShadows),R.push(C.numSpotLightShadows),R.push(C.numSpotLightShadowsWithMaps),R.push(C.numLightProbes),R.push(C.shadowMapType),R.push(C.toneMapping),R.push(C.numClippingPlanes),R.push(C.numClipIntersection),R.push(C.depthPacking)}function N(R,C){u.disableAll(),C.supportsVertexTextures&&u.enable(0),C.instancing&&u.enable(1),C.instancingColor&&u.enable(2),C.instancingMorph&&u.enable(3),C.matcap&&u.enable(4),C.envMap&&u.enable(5),C.normalMapObjectSpace&&u.enable(6),C.normalMapTangentSpace&&u.enable(7),C.clearcoat&&u.enable(8),C.iridescence&&u.enable(9),C.alphaTest&&u.enable(10),C.vertexColors&&u.enable(11),C.vertexAlphas&&u.enable(12),C.vertexUv1s&&u.enable(13),C.vertexUv2s&&u.enable(14),C.vertexUv3s&&u.enable(15),C.vertexTangents&&u.enable(16),C.anisotropy&&u.enable(17),C.alphaHash&&u.enable(18),C.batching&&u.enable(19),C.dispersion&&u.enable(20),C.batchingColor&&u.enable(21),R.push(u.mask),u.disableAll(),C.fog&&u.enable(0),C.useFog&&u.enable(1),C.flatShading&&u.enable(2),C.logarithmicDepthBuffer&&u.enable(3),C.reverseDepthBuffer&&u.enable(4),C.skinning&&u.enable(5),C.morphTargets&&u.enable(6),C.morphNormals&&u.enable(7),C.morphColors&&u.enable(8),C.premultipliedAlpha&&u.enable(9),C.shadowMapEnabled&&u.enable(10),C.doubleSided&&u.enable(11),C.flipSided&&u.enable(12),C.useDepthPacking&&u.enable(13),C.dithering&&u.enable(14),C.transmission&&u.enable(15),C.sheen&&u.enable(16),C.opaque&&u.enable(17),C.pointsUvs&&u.enable(18),C.decodeVideoTexture&&u.enable(19),C.decodeVideoTextureEmissive&&u.enable(20),C.alphaToCoverage&&u.enable(21),R.push(u.mask)}function L(R){const C=T[R.type];let z;if(C){const ue=Gn[C];z=qf.clone(ue.uniforms)}else z=R.uniforms;return z}function q(R,C){let z;for(let ue=0,j=g.length;ue<j;ue++){const de=g[ue];if(de.cacheKey===C){z=de,++z.usedTimes;break}}return z===void 0&&(z=new Eg(i,C,R,a),g.push(z)),z}function V(R){if(--R.usedTimes===0){const C=g.indexOf(R);g[C]=g[g.length-1],g.pop(),R.destroy()}}function l(R){d.remove(R)}function Y(){d.dispose()}return{getParameters:S,getProgramCacheKey:m,getUniforms:L,acquireProgram:q,releaseProgram:V,releaseShaderCache:l,programs:g,dispose:Y}}function Cg(){let i=new WeakMap;function e(c){return i.has(c)}function t(c){let u=i.get(c);return u===void 0&&(u={},i.set(c,u)),u}function n(c){i.delete(c)}function s(c,u,d){i.get(c)[u]=d}function a(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:a}}function Rg(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function rc(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function sc(){const i=[];let e=0;const t=[],n=[],s=[];function a(){e=0,t.length=0,n.length=0,s.length=0}function c(_,M,y,T,w,S){let m=i[e];return m===void 0?(m={id:_.id,object:_,geometry:M,material:y,groupOrder:T,renderOrder:_.renderOrder,z:w,group:S},i[e]=m):(m.id=_.id,m.object=_,m.geometry=M,m.material=y,m.groupOrder=T,m.renderOrder=_.renderOrder,m.z=w,m.group=S),e++,m}function u(_,M,y,T,w,S){const m=c(_,M,y,T,w,S);y.transmission>0?n.push(m):y.transparent===!0?s.push(m):t.push(m)}function d(_,M,y,T,w,S){const m=c(_,M,y,T,w,S);y.transmission>0?n.unshift(m):y.transparent===!0?s.unshift(m):t.unshift(m)}function p(_,M){t.length>1&&t.sort(_||Rg),n.length>1&&n.sort(M||rc),s.length>1&&s.sort(M||rc)}function g(){for(let _=e,M=i.length;_<M;_++){const y=i[_];if(y.id===null)break;y.id=null,y.object=null,y.geometry=null,y.material=null,y.group=null}}return{opaque:t,transmissive:n,transparent:s,init:a,push:u,unshift:d,finish:g,sort:p}}function Pg(){let i=new WeakMap;function e(n,s){const a=i.get(n);let c;return a===void 0?(c=new sc,i.set(n,[c])):s>=a.length?(c=new sc,a.push(c)):c=a[s],c}function t(){i=new WeakMap}return{get:e,dispose:t}}function Dg(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new X,color:new wt};break;case"SpotLight":t={position:new X,direction:new X,color:new wt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new X,color:new wt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new X,skyColor:new wt,groundColor:new wt};break;case"RectAreaLight":t={color:new wt,position:new X,halfWidth:new X,halfHeight:new X};break}return i[e.id]=t,t}}}function Lg(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Ug=0;function Ig(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Ng(i){const e=new Dg,t=Lg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)n.probe.push(new X);const s=new X,a=new kt,c=new kt;function u(p){let g=0,_=0,M=0;for(let R=0;R<9;R++)n.probe[R].set(0,0,0);let y=0,T=0,w=0,S=0,m=0,O=0,N=0,L=0,q=0,V=0,l=0;p.sort(Ig);for(let R=0,C=p.length;R<C;R++){const z=p[R],ue=z.color,j=z.intensity,de=z.distance,me=z.shadow&&z.shadow.map?z.shadow.map.texture:null;if(z.isAmbientLight)g+=ue.r*j,_+=ue.g*j,M+=ue.b*j;else if(z.isLightProbe){for(let he=0;he<9;he++)n.probe[he].addScaledVector(z.sh.coefficients[he],j);l++}else if(z.isDirectionalLight){const he=e.get(z);if(he.color.copy(z.color).multiplyScalar(z.intensity),z.castShadow){const pe=z.shadow,se=t.get(z);se.shadowIntensity=pe.intensity,se.shadowBias=pe.bias,se.shadowNormalBias=pe.normalBias,se.shadowRadius=pe.radius,se.shadowMapSize=pe.mapSize,n.directionalShadow[y]=se,n.directionalShadowMap[y]=me,n.directionalShadowMatrix[y]=z.shadow.matrix,O++}n.directional[y]=he,y++}else if(z.isSpotLight){const he=e.get(z);he.position.setFromMatrixPosition(z.matrixWorld),he.color.copy(ue).multiplyScalar(j),he.distance=de,he.coneCos=Math.cos(z.angle),he.penumbraCos=Math.cos(z.angle*(1-z.penumbra)),he.decay=z.decay,n.spot[w]=he;const pe=z.shadow;if(z.map&&(n.spotLightMap[q]=z.map,q++,pe.updateMatrices(z),z.castShadow&&V++),n.spotLightMatrix[w]=pe.matrix,z.castShadow){const se=t.get(z);se.shadowIntensity=pe.intensity,se.shadowBias=pe.bias,se.shadowNormalBias=pe.normalBias,se.shadowRadius=pe.radius,se.shadowMapSize=pe.mapSize,n.spotShadow[w]=se,n.spotShadowMap[w]=me,L++}w++}else if(z.isRectAreaLight){const he=e.get(z);he.color.copy(ue).multiplyScalar(j),he.halfWidth.set(z.width*.5,0,0),he.halfHeight.set(0,z.height*.5,0),n.rectArea[S]=he,S++}else if(z.isPointLight){const he=e.get(z);if(he.color.copy(z.color).multiplyScalar(z.intensity),he.distance=z.distance,he.decay=z.decay,z.castShadow){const pe=z.shadow,se=t.get(z);se.shadowIntensity=pe.intensity,se.shadowBias=pe.bias,se.shadowNormalBias=pe.normalBias,se.shadowRadius=pe.radius,se.shadowMapSize=pe.mapSize,se.shadowCameraNear=pe.camera.near,se.shadowCameraFar=pe.camera.far,n.pointShadow[T]=se,n.pointShadowMap[T]=me,n.pointShadowMatrix[T]=z.shadow.matrix,N++}n.point[T]=he,T++}else if(z.isHemisphereLight){const he=e.get(z);he.skyColor.copy(z.color).multiplyScalar(j),he.groundColor.copy(z.groundColor).multiplyScalar(j),n.hemi[m]=he,m++}}S>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ee.LTC_FLOAT_1,n.rectAreaLTC2=Ee.LTC_FLOAT_2):(n.rectAreaLTC1=Ee.LTC_HALF_1,n.rectAreaLTC2=Ee.LTC_HALF_2)),n.ambient[0]=g,n.ambient[1]=_,n.ambient[2]=M;const Y=n.hash;(Y.directionalLength!==y||Y.pointLength!==T||Y.spotLength!==w||Y.rectAreaLength!==S||Y.hemiLength!==m||Y.numDirectionalShadows!==O||Y.numPointShadows!==N||Y.numSpotShadows!==L||Y.numSpotMaps!==q||Y.numLightProbes!==l)&&(n.directional.length=y,n.spot.length=w,n.rectArea.length=S,n.point.length=T,n.hemi.length=m,n.directionalShadow.length=O,n.directionalShadowMap.length=O,n.pointShadow.length=N,n.pointShadowMap.length=N,n.spotShadow.length=L,n.spotShadowMap.length=L,n.directionalShadowMatrix.length=O,n.pointShadowMatrix.length=N,n.spotLightMatrix.length=L+q-V,n.spotLightMap.length=q,n.numSpotLightShadowsWithMaps=V,n.numLightProbes=l,Y.directionalLength=y,Y.pointLength=T,Y.spotLength=w,Y.rectAreaLength=S,Y.hemiLength=m,Y.numDirectionalShadows=O,Y.numPointShadows=N,Y.numSpotShadows=L,Y.numSpotMaps=q,Y.numLightProbes=l,n.version=Ug++)}function d(p,g){let _=0,M=0,y=0,T=0,w=0;const S=g.matrixWorldInverse;for(let m=0,O=p.length;m<O;m++){const N=p[m];if(N.isDirectionalLight){const L=n.directional[_];L.direction.setFromMatrixPosition(N.matrixWorld),s.setFromMatrixPosition(N.target.matrixWorld),L.direction.sub(s),L.direction.transformDirection(S),_++}else if(N.isSpotLight){const L=n.spot[y];L.position.setFromMatrixPosition(N.matrixWorld),L.position.applyMatrix4(S),L.direction.setFromMatrixPosition(N.matrixWorld),s.setFromMatrixPosition(N.target.matrixWorld),L.direction.sub(s),L.direction.transformDirection(S),y++}else if(N.isRectAreaLight){const L=n.rectArea[T];L.position.setFromMatrixPosition(N.matrixWorld),L.position.applyMatrix4(S),c.identity(),a.copy(N.matrixWorld),a.premultiply(S),c.extractRotation(a),L.halfWidth.set(N.width*.5,0,0),L.halfHeight.set(0,N.height*.5,0),L.halfWidth.applyMatrix4(c),L.halfHeight.applyMatrix4(c),T++}else if(N.isPointLight){const L=n.point[M];L.position.setFromMatrixPosition(N.matrixWorld),L.position.applyMatrix4(S),M++}else if(N.isHemisphereLight){const L=n.hemi[w];L.direction.setFromMatrixPosition(N.matrixWorld),L.direction.transformDirection(S),w++}}}return{setup:u,setupView:d,state:n}}function ac(i){const e=new Ng(i),t=[],n=[];function s(g){p.camera=g,t.length=0,n.length=0}function a(g){t.push(g)}function c(g){n.push(g)}function u(){e.setup(t)}function d(g){e.setupView(t,g)}const p={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:p,setupLights:u,setupLightsView:d,pushLight:a,pushShadow:c}}function Fg(i){let e=new WeakMap;function t(s,a=0){const c=e.get(s);let u;return c===void 0?(u=new ac(i),e.set(s,[u])):a>=c.length?(u=new ac(i),c.push(u)):u=c[a],u}function n(){e=new WeakMap}return{get:t,dispose:n}}const Og=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Bg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function zg(i,e,t){let n=new Vo;const s=new Ct,a=new Ct,c=new Nt,u=new ih({depthPacking:Ju}),d=new rh,p={},g=t.maxTextureSize,_={[bi]:vn,[vn]:bi,[Wn]:Wn},M=new Ai({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ct},radius:{value:4}},vertexShader:Og,fragmentShader:Bg}),y=M.clone();y.defines.HORIZONTAL_PASS=1;const T=new wi;T.setAttribute("position",new Rn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const w=new qn(T,M),S=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=cc;let m=this.type;this.render=function(V,l,Y){if(S.enabled===!1||S.autoUpdate===!1&&S.needsUpdate===!1||V.length===0)return;const R=i.getRenderTarget(),C=i.getActiveCubeFace(),z=i.getActiveMipmapLevel(),ue=i.state;ue.setBlending(Ei),ue.buffers.color.setClear(1,1,1,1),ue.buffers.depth.setTest(!0),ue.setScissorTest(!1);const j=m!==ai&&this.type===ai,de=m===ai&&this.type!==ai;for(let me=0,he=V.length;me<he;me++){const pe=V[me],se=pe.shadow;if(se===void 0){console.warn("THREE.WebGLShadowMap:",pe,"has no shadow.");continue}if(se.autoUpdate===!1&&se.needsUpdate===!1)continue;s.copy(se.mapSize);const Se=se.getFrameExtents();if(s.multiply(Se),a.copy(se.mapSize),(s.x>g||s.y>g)&&(s.x>g&&(a.x=Math.floor(g/Se.x),s.x=a.x*Se.x,se.mapSize.x=a.x),s.y>g&&(a.y=Math.floor(g/Se.y),s.y=a.y*Se.y,se.mapSize.y=a.y)),se.map===null||j===!0||de===!0){const Ve=this.type!==ai?{minFilter:En,magFilter:En}:{};se.map!==null&&se.map.dispose(),se.map=new Yi(s.x,s.y,Ve),se.map.texture.name=pe.name+".shadowMap",se.camera.updateProjectionMatrix()}i.setRenderTarget(se.map),i.clear();const Ue=se.getViewportCount();for(let Ve=0;Ve<Ue;Ve++){const st=se.getViewport(Ve);c.set(a.x*st.x,a.y*st.y,a.x*st.z,a.y*st.w),ue.viewport(c),se.updateMatrices(pe,Ve),n=se.getFrustum(),L(l,Y,se.camera,pe,this.type)}se.isPointLightShadow!==!0&&this.type===ai&&O(se,Y),se.needsUpdate=!1}m=this.type,S.needsUpdate=!1,i.setRenderTarget(R,C,z)};function O(V,l){const Y=e.update(w);M.defines.VSM_SAMPLES!==V.blurSamples&&(M.defines.VSM_SAMPLES=V.blurSamples,y.defines.VSM_SAMPLES=V.blurSamples,M.needsUpdate=!0,y.needsUpdate=!0),V.mapPass===null&&(V.mapPass=new Yi(s.x,s.y)),M.uniforms.shadow_pass.value=V.map.texture,M.uniforms.resolution.value=V.mapSize,M.uniforms.radius.value=V.radius,i.setRenderTarget(V.mapPass),i.clear(),i.renderBufferDirect(l,null,Y,M,w,null),y.uniforms.shadow_pass.value=V.mapPass.texture,y.uniforms.resolution.value=V.mapSize,y.uniforms.radius.value=V.radius,i.setRenderTarget(V.map),i.clear(),i.renderBufferDirect(l,null,Y,y,w,null)}function N(V,l,Y,R){let C=null;const z=Y.isPointLight===!0?V.customDistanceMaterial:V.customDepthMaterial;if(z!==void 0)C=z;else if(C=Y.isPointLight===!0?d:u,i.localClippingEnabled&&l.clipShadows===!0&&Array.isArray(l.clippingPlanes)&&l.clippingPlanes.length!==0||l.displacementMap&&l.displacementScale!==0||l.alphaMap&&l.alphaTest>0||l.map&&l.alphaTest>0||l.alphaToCoverage===!0){const ue=C.uuid,j=l.uuid;let de=p[ue];de===void 0&&(de={},p[ue]=de);let me=de[j];me===void 0&&(me=C.clone(),de[j]=me,l.addEventListener("dispose",q)),C=me}if(C.visible=l.visible,C.wireframe=l.wireframe,R===ai?C.side=l.shadowSide!==null?l.shadowSide:l.side:C.side=l.shadowSide!==null?l.shadowSide:_[l.side],C.alphaMap=l.alphaMap,C.alphaTest=l.alphaToCoverage===!0?.5:l.alphaTest,C.map=l.map,C.clipShadows=l.clipShadows,C.clippingPlanes=l.clippingPlanes,C.clipIntersection=l.clipIntersection,C.displacementMap=l.displacementMap,C.displacementScale=l.displacementScale,C.displacementBias=l.displacementBias,C.wireframeLinewidth=l.wireframeLinewidth,C.linewidth=l.linewidth,Y.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const ue=i.properties.get(C);ue.light=Y}return C}function L(V,l,Y,R,C){if(V.visible===!1)return;if(V.layers.test(l.layers)&&(V.isMesh||V.isLine||V.isPoints)&&(V.castShadow||V.receiveShadow&&C===ai)&&(!V.frustumCulled||n.intersectsObject(V))){V.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,V.matrixWorld);const j=e.update(V),de=V.material;if(Array.isArray(de)){const me=j.groups;for(let he=0,pe=me.length;he<pe;he++){const se=me[he],Se=de[se.materialIndex];if(Se&&Se.visible){const Ue=N(V,Se,R,C);V.onBeforeShadow(i,V,l,Y,j,Ue,se),i.renderBufferDirect(Y,null,j,Ue,V,se),V.onAfterShadow(i,V,l,Y,j,Ue,se)}}}else if(de.visible){const me=N(V,de,R,C);V.onBeforeShadow(i,V,l,Y,j,me,null),i.renderBufferDirect(Y,null,j,me,V,null),V.onAfterShadow(i,V,l,Y,j,me,null)}}const ue=V.children;for(let j=0,de=ue.length;j<de;j++)L(ue[j],l,Y,R,C)}function q(V){V.target.removeEventListener("dispose",q);for(const Y in p){const R=p[Y],C=V.target.uuid;C in R&&(R[C].dispose(),delete R[C])}}}const Hg={[Va]:Ga,[Wa]:Ya,[Xa]:ja,[xr]:qa,[Ga]:Va,[Ya]:Wa,[ja]:Xa,[qa]:xr};function kg(i,e){function t(){let k=!1;const we=new Nt;let ie=null;const fe=new Nt(0,0,0,0);return{setMask:function(Ce){ie!==Ce&&!k&&(i.colorMask(Ce,Ce,Ce,Ce),ie=Ce)},setLocked:function(Ce){k=Ce},setClear:function(Ce,Te,qe,ht,Xt){Xt===!0&&(Ce*=ht,Te*=ht,qe*=ht),we.set(Ce,Te,qe,ht),fe.equals(we)===!1&&(i.clearColor(Ce,Te,qe,ht),fe.copy(we))},reset:function(){k=!1,ie=null,fe.set(-1,0,0,0)}}}function n(){let k=!1,we=!1,ie=null,fe=null,Ce=null;return{setReversed:function(Te){if(we!==Te){const qe=e.get("EXT_clip_control");Te?qe.clipControlEXT(qe.LOWER_LEFT_EXT,qe.ZERO_TO_ONE_EXT):qe.clipControlEXT(qe.LOWER_LEFT_EXT,qe.NEGATIVE_ONE_TO_ONE_EXT),we=Te;const ht=Ce;Ce=null,this.setClear(ht)}},getReversed:function(){return we},setTest:function(Te){Te?be(i.DEPTH_TEST):$e(i.DEPTH_TEST)},setMask:function(Te){ie!==Te&&!k&&(i.depthMask(Te),ie=Te)},setFunc:function(Te){if(we&&(Te=Hg[Te]),fe!==Te){switch(Te){case Va:i.depthFunc(i.NEVER);break;case Ga:i.depthFunc(i.ALWAYS);break;case Wa:i.depthFunc(i.LESS);break;case xr:i.depthFunc(i.LEQUAL);break;case Xa:i.depthFunc(i.EQUAL);break;case qa:i.depthFunc(i.GEQUAL);break;case Ya:i.depthFunc(i.GREATER);break;case ja:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}fe=Te}},setLocked:function(Te){k=Te},setClear:function(Te){Ce!==Te&&(we&&(Te=1-Te),i.clearDepth(Te),Ce=Te)},reset:function(){k=!1,ie=null,fe=null,Ce=null,we=!1}}}function s(){let k=!1,we=null,ie=null,fe=null,Ce=null,Te=null,qe=null,ht=null,Xt=null;return{setTest:function(Pt){k||(Pt?be(i.STENCIL_TEST):$e(i.STENCIL_TEST))},setMask:function(Pt){we!==Pt&&!k&&(i.stencilMask(Pt),we=Pt)},setFunc:function(Pt,mn,Tn){(ie!==Pt||fe!==mn||Ce!==Tn)&&(i.stencilFunc(Pt,mn,Tn),ie=Pt,fe=mn,Ce=Tn)},setOp:function(Pt,mn,Tn){(Te!==Pt||qe!==mn||ht!==Tn)&&(i.stencilOp(Pt,mn,Tn),Te=Pt,qe=mn,ht=Tn)},setLocked:function(Pt){k=Pt},setClear:function(Pt){Xt!==Pt&&(i.clearStencil(Pt),Xt=Pt)},reset:function(){k=!1,we=null,ie=null,fe=null,Ce=null,Te=null,qe=null,ht=null,Xt=null}}}const a=new t,c=new n,u=new s,d=new WeakMap,p=new WeakMap;let g={},_={},M=new WeakMap,y=[],T=null,w=!1,S=null,m=null,O=null,N=null,L=null,q=null,V=null,l=new wt(0,0,0),Y=0,R=!1,C=null,z=null,ue=null,j=null,de=null;const me=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let he=!1,pe=0;const se=i.getParameter(i.VERSION);se.indexOf("WebGL")!==-1?(pe=parseFloat(/^WebGL (\d)/.exec(se)[1]),he=pe>=1):se.indexOf("OpenGL ES")!==-1&&(pe=parseFloat(/^OpenGL ES (\d)/.exec(se)[1]),he=pe>=2);let Se=null,Ue={};const Ve=i.getParameter(i.SCISSOR_BOX),st=i.getParameter(i.VIEWPORT),Rt=new Nt().fromArray(Ve),ce=new Nt().fromArray(st);function Me(k,we,ie,fe){const Ce=new Uint8Array(4),Te=i.createTexture();i.bindTexture(k,Te),i.texParameteri(k,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(k,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let qe=0;qe<ie;qe++)k===i.TEXTURE_3D||k===i.TEXTURE_2D_ARRAY?i.texImage3D(we,0,i.RGBA,1,1,fe,0,i.RGBA,i.UNSIGNED_BYTE,Ce):i.texImage2D(we+qe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Ce);return Te}const Oe={};Oe[i.TEXTURE_2D]=Me(i.TEXTURE_2D,i.TEXTURE_2D,1),Oe[i.TEXTURE_CUBE_MAP]=Me(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Oe[i.TEXTURE_2D_ARRAY]=Me(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Oe[i.TEXTURE_3D]=Me(i.TEXTURE_3D,i.TEXTURE_3D,1,1),a.setClear(0,0,0,1),c.setClear(1),u.setClear(0),be(i.DEPTH_TEST),c.setFunc(xr),ft(!1),ct(sl),be(i.CULL_FACE),F(Ei);function be(k){g[k]!==!0&&(i.enable(k),g[k]=!0)}function $e(k){g[k]!==!1&&(i.disable(k),g[k]=!1)}function Mt(k,we){return _[k]!==we?(i.bindFramebuffer(k,we),_[k]=we,k===i.DRAW_FRAMEBUFFER&&(_[i.FRAMEBUFFER]=we),k===i.FRAMEBUFFER&&(_[i.DRAW_FRAMEBUFFER]=we),!0):!1}function He(k,we){let ie=y,fe=!1;if(k){ie=M.get(we),ie===void 0&&(ie=[],M.set(we,ie));const Ce=k.textures;if(ie.length!==Ce.length||ie[0]!==i.COLOR_ATTACHMENT0){for(let Te=0,qe=Ce.length;Te<qe;Te++)ie[Te]=i.COLOR_ATTACHMENT0+Te;ie.length=Ce.length,fe=!0}}else ie[0]!==i.BACK&&(ie[0]=i.BACK,fe=!0);fe&&i.drawBuffers(ie)}function Vt(k){return T!==k?(i.useProgram(k),T=k,!0):!1}const Dt={[Hi]:i.FUNC_ADD,[Tu]:i.FUNC_SUBTRACT,[bu]:i.FUNC_REVERSE_SUBTRACT};Dt[Au]=i.MIN,Dt[wu]=i.MAX;const lt={[Cu]:i.ZERO,[Ru]:i.ONE,[Pu]:i.SRC_COLOR,[Ha]:i.SRC_ALPHA,[Fu]:i.SRC_ALPHA_SATURATE,[Iu]:i.DST_COLOR,[Lu]:i.DST_ALPHA,[Du]:i.ONE_MINUS_SRC_COLOR,[ka]:i.ONE_MINUS_SRC_ALPHA,[Nu]:i.ONE_MINUS_DST_COLOR,[Uu]:i.ONE_MINUS_DST_ALPHA,[Ou]:i.CONSTANT_COLOR,[Bu]:i.ONE_MINUS_CONSTANT_COLOR,[zu]:i.CONSTANT_ALPHA,[Hu]:i.ONE_MINUS_CONSTANT_ALPHA};function F(k,we,ie,fe,Ce,Te,qe,ht,Xt,Pt){if(k===Ei){w===!0&&($e(i.BLEND),w=!1);return}if(w===!1&&(be(i.BLEND),w=!0),k!==Eu){if(k!==S||Pt!==R){if((m!==Hi||L!==Hi)&&(i.blendEquation(i.FUNC_ADD),m=Hi,L=Hi),Pt)switch(k){case _r:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case al:i.blendFunc(i.ONE,i.ONE);break;case ol:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ll:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case _r:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case al:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case ol:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ll:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}O=null,N=null,q=null,V=null,l.set(0,0,0),Y=0,S=k,R=Pt}return}Ce=Ce||we,Te=Te||ie,qe=qe||fe,(we!==m||Ce!==L)&&(i.blendEquationSeparate(Dt[we],Dt[Ce]),m=we,L=Ce),(ie!==O||fe!==N||Te!==q||qe!==V)&&(i.blendFuncSeparate(lt[ie],lt[fe],lt[Te],lt[qe]),O=ie,N=fe,q=Te,V=qe),(ht.equals(l)===!1||Xt!==Y)&&(i.blendColor(ht.r,ht.g,ht.b,Xt),l.copy(ht),Y=Xt),S=k,R=!1}function pn(k,we){k.side===Wn?$e(i.CULL_FACE):be(i.CULL_FACE);let ie=k.side===vn;we&&(ie=!ie),ft(ie),k.blending===_r&&k.transparent===!1?F(Ei):F(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),c.setFunc(k.depthFunc),c.setTest(k.depthTest),c.setMask(k.depthWrite),a.setMask(k.colorWrite);const fe=k.stencilWrite;u.setTest(fe),fe&&(u.setMask(k.stencilWriteMask),u.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),u.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),Ft(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?be(i.SAMPLE_ALPHA_TO_COVERAGE):$e(i.SAMPLE_ALPHA_TO_COVERAGE)}function ft(k){C!==k&&(k?i.frontFace(i.CW):i.frontFace(i.CCW),C=k)}function ct(k){k!==Mu?(be(i.CULL_FACE),k!==z&&(k===sl?i.cullFace(i.BACK):k===Su?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):$e(i.CULL_FACE),z=k}function Fe(k){k!==ue&&(he&&i.lineWidth(k),ue=k)}function Ft(k,we,ie){k?(be(i.POLYGON_OFFSET_FILL),(j!==we||de!==ie)&&(i.polygonOffset(we,ie),j=we,de=ie)):$e(i.POLYGON_OFFSET_FILL)}function Ge(k){k?be(i.SCISSOR_TEST):$e(i.SCISSOR_TEST)}function D(k){k===void 0&&(k=i.TEXTURE0+me-1),Se!==k&&(i.activeTexture(k),Se=k)}function b(k,we,ie){ie===void 0&&(Se===null?ie=i.TEXTURE0+me-1:ie=Se);let fe=Ue[ie];fe===void 0&&(fe={type:void 0,texture:void 0},Ue[ie]=fe),(fe.type!==k||fe.texture!==we)&&(Se!==ie&&(i.activeTexture(ie),Se=ie),i.bindTexture(k,we||Oe[k]),fe.type=k,fe.texture=we)}function K(){const k=Ue[Se];k!==void 0&&k.type!==void 0&&(i.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function le(){try{i.compressedTexImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Z(){try{i.compressedTexImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function re(){try{i.texSubImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ze(){try{i.texSubImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ae(){try{i.compressedTexSubImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ke(){try{i.compressedTexSubImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ze(){try{i.texStorage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function _e(){try{i.texStorage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Le(){try{i.texImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ke(){try{i.texImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ye(k){Rt.equals(k)===!1&&(i.scissor(k.x,k.y,k.z,k.w),Rt.copy(k))}function De(k){ce.equals(k)===!1&&(i.viewport(k.x,k.y,k.z,k.w),ce.copy(k))}function gt(k,we){let ie=p.get(we);ie===void 0&&(ie=new WeakMap,p.set(we,ie));let fe=ie.get(k);fe===void 0&&(fe=i.getUniformBlockIndex(we,k.name),ie.set(k,fe))}function nt(k,we){const fe=p.get(we).get(k);d.get(we)!==fe&&(i.uniformBlockBinding(we,fe,k.__bindingPointIndex),d.set(we,fe))}function Lt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),c.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),g={},Se=null,Ue={},_={},M=new WeakMap,y=[],T=null,w=!1,S=null,m=null,O=null,N=null,L=null,q=null,V=null,l=new wt(0,0,0),Y=0,R=!1,C=null,z=null,ue=null,j=null,de=null,Rt.set(0,0,i.canvas.width,i.canvas.height),ce.set(0,0,i.canvas.width,i.canvas.height),a.reset(),c.reset(),u.reset()}return{buffers:{color:a,depth:c,stencil:u},enable:be,disable:$e,bindFramebuffer:Mt,drawBuffers:He,useProgram:Vt,setBlending:F,setMaterial:pn,setFlipSided:ft,setCullFace:ct,setLineWidth:Fe,setPolygonOffset:Ft,setScissorTest:Ge,activeTexture:D,bindTexture:b,unbindTexture:K,compressedTexImage2D:le,compressedTexImage3D:Z,texImage2D:Le,texImage3D:ke,updateUBOMapping:gt,uniformBlockBinding:nt,texStorage2D:Ze,texStorage3D:_e,texSubImage2D:re,texSubImage3D:ze,compressedTexSubImage2D:Ae,compressedTexSubImage3D:Ke,scissor:Ye,viewport:De,reset:Lt}}function Vg(i,e,t,n,s,a,c){const u=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,d=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new Ct,g=new WeakMap;let _;const M=new WeakMap;let y=!1;try{y=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function T(D,b){return y?new OffscreenCanvas(D,b):es("canvas")}function w(D,b,K){let le=1;const Z=Ge(D);if((Z.width>K||Z.height>K)&&(le=K/Math.max(Z.width,Z.height)),le<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const re=Math.floor(le*Z.width),ze=Math.floor(le*Z.height);_===void 0&&(_=T(re,ze));const Ae=b?T(re,ze):_;return Ae.width=re,Ae.height=ze,Ae.getContext("2d").drawImage(D,0,0,re,ze),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+re+"x"+ze+")."),Ae}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),D;return D}function S(D){return D.generateMipmaps}function m(D){i.generateMipmap(D)}function O(D){return D.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?i.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function N(D,b,K,le,Z=!1){if(D!==null){if(i[D]!==void 0)return i[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let re=b;if(b===i.RED&&(K===i.FLOAT&&(re=i.R32F),K===i.HALF_FLOAT&&(re=i.R16F),K===i.UNSIGNED_BYTE&&(re=i.R8)),b===i.RED_INTEGER&&(K===i.UNSIGNED_BYTE&&(re=i.R8UI),K===i.UNSIGNED_SHORT&&(re=i.R16UI),K===i.UNSIGNED_INT&&(re=i.R32UI),K===i.BYTE&&(re=i.R8I),K===i.SHORT&&(re=i.R16I),K===i.INT&&(re=i.R32I)),b===i.RG&&(K===i.FLOAT&&(re=i.RG32F),K===i.HALF_FLOAT&&(re=i.RG16F),K===i.UNSIGNED_BYTE&&(re=i.RG8)),b===i.RG_INTEGER&&(K===i.UNSIGNED_BYTE&&(re=i.RG8UI),K===i.UNSIGNED_SHORT&&(re=i.RG16UI),K===i.UNSIGNED_INT&&(re=i.RG32UI),K===i.BYTE&&(re=i.RG8I),K===i.SHORT&&(re=i.RG16I),K===i.INT&&(re=i.RG32I)),b===i.RGB_INTEGER&&(K===i.UNSIGNED_BYTE&&(re=i.RGB8UI),K===i.UNSIGNED_SHORT&&(re=i.RGB16UI),K===i.UNSIGNED_INT&&(re=i.RGB32UI),K===i.BYTE&&(re=i.RGB8I),K===i.SHORT&&(re=i.RGB16I),K===i.INT&&(re=i.RGB32I)),b===i.RGBA_INTEGER&&(K===i.UNSIGNED_BYTE&&(re=i.RGBA8UI),K===i.UNSIGNED_SHORT&&(re=i.RGBA16UI),K===i.UNSIGNED_INT&&(re=i.RGBA32UI),K===i.BYTE&&(re=i.RGBA8I),K===i.SHORT&&(re=i.RGBA16I),K===i.INT&&(re=i.RGBA32I)),b===i.RGB&&K===i.UNSIGNED_INT_5_9_9_9_REV&&(re=i.RGB9_E5),b===i.RGBA){const ze=Z?Gs:At.getTransfer(le);K===i.FLOAT&&(re=i.RGBA32F),K===i.HALF_FLOAT&&(re=i.RGBA16F),K===i.UNSIGNED_BYTE&&(re=ze===It?i.SRGB8_ALPHA8:i.RGBA8),K===i.UNSIGNED_SHORT_4_4_4_4&&(re=i.RGBA4),K===i.UNSIGNED_SHORT_5_5_5_1&&(re=i.RGB5_A1)}return(re===i.R16F||re===i.R32F||re===i.RG16F||re===i.RG32F||re===i.RGBA16F||re===i.RGBA32F)&&e.get("EXT_color_buffer_float"),re}function L(D,b){let K;return D?b===null||b===qi||b===Kr?K=i.DEPTH24_STENCIL8:b===oi?K=i.DEPTH32F_STENCIL8:b===$r&&(K=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===qi||b===Kr?K=i.DEPTH_COMPONENT24:b===oi?K=i.DEPTH_COMPONENT32F:b===$r&&(K=i.DEPTH_COMPONENT16),K}function q(D,b){return S(D)===!0||D.isFramebufferTexture&&D.minFilter!==En&&D.minFilter!==Xn?Math.log2(Math.max(b.width,b.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?b.mipmaps.length:1}function V(D){const b=D.target;b.removeEventListener("dispose",V),Y(b),b.isVideoTexture&&g.delete(b)}function l(D){const b=D.target;b.removeEventListener("dispose",l),C(b)}function Y(D){const b=n.get(D);if(b.__webglInit===void 0)return;const K=D.source,le=M.get(K);if(le){const Z=le[b.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&R(D),Object.keys(le).length===0&&M.delete(K)}n.remove(D)}function R(D){const b=n.get(D);i.deleteTexture(b.__webglTexture);const K=D.source,le=M.get(K);delete le[b.__cacheKey],c.memory.textures--}function C(D){const b=n.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),n.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let le=0;le<6;le++){if(Array.isArray(b.__webglFramebuffer[le]))for(let Z=0;Z<b.__webglFramebuffer[le].length;Z++)i.deleteFramebuffer(b.__webglFramebuffer[le][Z]);else i.deleteFramebuffer(b.__webglFramebuffer[le]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[le])}else{if(Array.isArray(b.__webglFramebuffer))for(let le=0;le<b.__webglFramebuffer.length;le++)i.deleteFramebuffer(b.__webglFramebuffer[le]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let le=0;le<b.__webglColorRenderbuffer.length;le++)b.__webglColorRenderbuffer[le]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[le]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const K=D.textures;for(let le=0,Z=K.length;le<Z;le++){const re=n.get(K[le]);re.__webglTexture&&(i.deleteTexture(re.__webglTexture),c.memory.textures--),n.remove(K[le])}n.remove(D)}let z=0;function ue(){z=0}function j(){const D=z;return D>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+s.maxTextures),z+=1,D}function de(D){const b=[];return b.push(D.wrapS),b.push(D.wrapT),b.push(D.wrapR||0),b.push(D.magFilter),b.push(D.minFilter),b.push(D.anisotropy),b.push(D.internalFormat),b.push(D.format),b.push(D.type),b.push(D.generateMipmaps),b.push(D.premultiplyAlpha),b.push(D.flipY),b.push(D.unpackAlignment),b.push(D.colorSpace),b.join()}function me(D,b){const K=n.get(D);if(D.isVideoTexture&&Fe(D),D.isRenderTargetTexture===!1&&D.version>0&&K.__version!==D.version){const le=D.image;if(le===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(le.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ce(K,D,b);return}}t.bindTexture(i.TEXTURE_2D,K.__webglTexture,i.TEXTURE0+b)}function he(D,b){const K=n.get(D);if(D.version>0&&K.__version!==D.version){ce(K,D,b);return}t.bindTexture(i.TEXTURE_2D_ARRAY,K.__webglTexture,i.TEXTURE0+b)}function pe(D,b){const K=n.get(D);if(D.version>0&&K.__version!==D.version){ce(K,D,b);return}t.bindTexture(i.TEXTURE_3D,K.__webglTexture,i.TEXTURE0+b)}function se(D,b){const K=n.get(D);if(D.version>0&&K.__version!==D.version){Me(K,D,b);return}t.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture,i.TEXTURE0+b)}const Se={[jr]:i.REPEAT,[Vi]:i.CLAMP_TO_EDGE,[Za]:i.MIRRORED_REPEAT},Ue={[En]:i.NEAREST,[Ku]:i.NEAREST_MIPMAP_NEAREST,[ds]:i.NEAREST_MIPMAP_LINEAR,[Xn]:i.LINEAR,[ua]:i.LINEAR_MIPMAP_NEAREST,[Gi]:i.LINEAR_MIPMAP_LINEAR},Ve={[ef]:i.NEVER,[of]:i.ALWAYS,[tf]:i.LESS,[Mc]:i.LEQUAL,[nf]:i.EQUAL,[af]:i.GEQUAL,[rf]:i.GREATER,[sf]:i.NOTEQUAL};function st(D,b){if(b.type===oi&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===Xn||b.magFilter===ua||b.magFilter===ds||b.magFilter===Gi||b.minFilter===Xn||b.minFilter===ua||b.minFilter===ds||b.minFilter===Gi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(D,i.TEXTURE_WRAP_S,Se[b.wrapS]),i.texParameteri(D,i.TEXTURE_WRAP_T,Se[b.wrapT]),(D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY)&&i.texParameteri(D,i.TEXTURE_WRAP_R,Se[b.wrapR]),i.texParameteri(D,i.TEXTURE_MAG_FILTER,Ue[b.magFilter]),i.texParameteri(D,i.TEXTURE_MIN_FILTER,Ue[b.minFilter]),b.compareFunction&&(i.texParameteri(D,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(D,i.TEXTURE_COMPARE_FUNC,Ve[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===En||b.minFilter!==ds&&b.minFilter!==Gi||b.type===oi&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const K=e.get("EXT_texture_filter_anisotropic");i.texParameterf(D,K.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function Rt(D,b){let K=!1;D.__webglInit===void 0&&(D.__webglInit=!0,b.addEventListener("dispose",V));const le=b.source;let Z=M.get(le);Z===void 0&&(Z={},M.set(le,Z));const re=de(b);if(re!==D.__cacheKey){Z[re]===void 0&&(Z[re]={texture:i.createTexture(),usedTimes:0},c.memory.textures++,K=!0),Z[re].usedTimes++;const ze=Z[D.__cacheKey];ze!==void 0&&(Z[D.__cacheKey].usedTimes--,ze.usedTimes===0&&R(b)),D.__cacheKey=re,D.__webglTexture=Z[re].texture}return K}function ce(D,b,K){let le=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(le=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(le=i.TEXTURE_3D);const Z=Rt(D,b),re=b.source;t.bindTexture(le,D.__webglTexture,i.TEXTURE0+K);const ze=n.get(re);if(re.version!==ze.__version||Z===!0){t.activeTexture(i.TEXTURE0+K);const Ae=At.getPrimaries(At.workingColorSpace),Ke=b.colorSpace===yi?null:At.getPrimaries(b.colorSpace),Ze=b.colorSpace===yi||Ae===Ke?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ze);let _e=w(b.image,!1,s.maxTextureSize);_e=Ft(b,_e);const Le=a.convert(b.format,b.colorSpace),ke=a.convert(b.type);let Ye=N(b.internalFormat,Le,ke,b.colorSpace,b.isVideoTexture);st(le,b);let De;const gt=b.mipmaps,nt=b.isVideoTexture!==!0,Lt=ze.__version===void 0||Z===!0,k=re.dataReady,we=q(b,_e);if(b.isDepthTexture)Ye=L(b.format===Jr,b.type),Lt&&(nt?t.texStorage2D(i.TEXTURE_2D,1,Ye,_e.width,_e.height):t.texImage2D(i.TEXTURE_2D,0,Ye,_e.width,_e.height,0,Le,ke,null));else if(b.isDataTexture)if(gt.length>0){nt&&Lt&&t.texStorage2D(i.TEXTURE_2D,we,Ye,gt[0].width,gt[0].height);for(let ie=0,fe=gt.length;ie<fe;ie++)De=gt[ie],nt?k&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,De.width,De.height,Le,ke,De.data):t.texImage2D(i.TEXTURE_2D,ie,Ye,De.width,De.height,0,Le,ke,De.data);b.generateMipmaps=!1}else nt?(Lt&&t.texStorage2D(i.TEXTURE_2D,we,Ye,_e.width,_e.height),k&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,_e.width,_e.height,Le,ke,_e.data)):t.texImage2D(i.TEXTURE_2D,0,Ye,_e.width,_e.height,0,Le,ke,_e.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){nt&&Lt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,we,Ye,gt[0].width,gt[0].height,_e.depth);for(let ie=0,fe=gt.length;ie<fe;ie++)if(De=gt[ie],b.format!==Fn)if(Le!==null)if(nt){if(k)if(b.layerUpdates.size>0){const Ce=Fl(De.width,De.height,b.format,b.type);for(const Te of b.layerUpdates){const qe=De.data.subarray(Te*Ce/De.data.BYTES_PER_ELEMENT,(Te+1)*Ce/De.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,Te,De.width,De.height,1,Le,qe)}b.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,0,De.width,De.height,_e.depth,Le,De.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ie,Ye,De.width,De.height,_e.depth,0,De.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else nt?k&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,0,De.width,De.height,_e.depth,Le,ke,De.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ie,Ye,De.width,De.height,_e.depth,0,Le,ke,De.data)}else{nt&&Lt&&t.texStorage2D(i.TEXTURE_2D,we,Ye,gt[0].width,gt[0].height);for(let ie=0,fe=gt.length;ie<fe;ie++)De=gt[ie],b.format!==Fn?Le!==null?nt?k&&t.compressedTexSubImage2D(i.TEXTURE_2D,ie,0,0,De.width,De.height,Le,De.data):t.compressedTexImage2D(i.TEXTURE_2D,ie,Ye,De.width,De.height,0,De.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):nt?k&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,De.width,De.height,Le,ke,De.data):t.texImage2D(i.TEXTURE_2D,ie,Ye,De.width,De.height,0,Le,ke,De.data)}else if(b.isDataArrayTexture)if(nt){if(Lt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,we,Ye,_e.width,_e.height,_e.depth),k)if(b.layerUpdates.size>0){const ie=Fl(_e.width,_e.height,b.format,b.type);for(const fe of b.layerUpdates){const Ce=_e.data.subarray(fe*ie/_e.data.BYTES_PER_ELEMENT,(fe+1)*ie/_e.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,fe,_e.width,_e.height,1,Le,ke,Ce)}b.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,_e.width,_e.height,_e.depth,Le,ke,_e.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ye,_e.width,_e.height,_e.depth,0,Le,ke,_e.data);else if(b.isData3DTexture)nt?(Lt&&t.texStorage3D(i.TEXTURE_3D,we,Ye,_e.width,_e.height,_e.depth),k&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,_e.width,_e.height,_e.depth,Le,ke,_e.data)):t.texImage3D(i.TEXTURE_3D,0,Ye,_e.width,_e.height,_e.depth,0,Le,ke,_e.data);else if(b.isFramebufferTexture){if(Lt)if(nt)t.texStorage2D(i.TEXTURE_2D,we,Ye,_e.width,_e.height);else{let ie=_e.width,fe=_e.height;for(let Ce=0;Ce<we;Ce++)t.texImage2D(i.TEXTURE_2D,Ce,Ye,ie,fe,0,Le,ke,null),ie>>=1,fe>>=1}}else if(gt.length>0){if(nt&&Lt){const ie=Ge(gt[0]);t.texStorage2D(i.TEXTURE_2D,we,Ye,ie.width,ie.height)}for(let ie=0,fe=gt.length;ie<fe;ie++)De=gt[ie],nt?k&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,Le,ke,De):t.texImage2D(i.TEXTURE_2D,ie,Ye,Le,ke,De);b.generateMipmaps=!1}else if(nt){if(Lt){const ie=Ge(_e);t.texStorage2D(i.TEXTURE_2D,we,Ye,ie.width,ie.height)}k&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Le,ke,_e)}else t.texImage2D(i.TEXTURE_2D,0,Ye,Le,ke,_e);S(b)&&m(le),ze.__version=re.version,b.onUpdate&&b.onUpdate(b)}D.__version=b.version}function Me(D,b,K){if(b.image.length!==6)return;const le=Rt(D,b),Z=b.source;t.bindTexture(i.TEXTURE_CUBE_MAP,D.__webglTexture,i.TEXTURE0+K);const re=n.get(Z);if(Z.version!==re.__version||le===!0){t.activeTexture(i.TEXTURE0+K);const ze=At.getPrimaries(At.workingColorSpace),Ae=b.colorSpace===yi?null:At.getPrimaries(b.colorSpace),Ke=b.colorSpace===yi||ze===Ae?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ke);const Ze=b.isCompressedTexture||b.image[0].isCompressedTexture,_e=b.image[0]&&b.image[0].isDataTexture,Le=[];for(let fe=0;fe<6;fe++)!Ze&&!_e?Le[fe]=w(b.image[fe],!0,s.maxCubemapSize):Le[fe]=_e?b.image[fe].image:b.image[fe],Le[fe]=Ft(b,Le[fe]);const ke=Le[0],Ye=a.convert(b.format,b.colorSpace),De=a.convert(b.type),gt=N(b.internalFormat,Ye,De,b.colorSpace),nt=b.isVideoTexture!==!0,Lt=re.__version===void 0||le===!0,k=Z.dataReady;let we=q(b,ke);st(i.TEXTURE_CUBE_MAP,b);let ie;if(Ze){nt&&Lt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,we,gt,ke.width,ke.height);for(let fe=0;fe<6;fe++){ie=Le[fe].mipmaps;for(let Ce=0;Ce<ie.length;Ce++){const Te=ie[Ce];b.format!==Fn?Ye!==null?nt?k&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ce,0,0,Te.width,Te.height,Ye,Te.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ce,gt,Te.width,Te.height,0,Te.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):nt?k&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ce,0,0,Te.width,Te.height,Ye,De,Te.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ce,gt,Te.width,Te.height,0,Ye,De,Te.data)}}}else{if(ie=b.mipmaps,nt&&Lt){ie.length>0&&we++;const fe=Ge(Le[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,we,gt,fe.width,fe.height)}for(let fe=0;fe<6;fe++)if(_e){nt?k&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,0,0,Le[fe].width,Le[fe].height,Ye,De,Le[fe].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,gt,Le[fe].width,Le[fe].height,0,Ye,De,Le[fe].data);for(let Ce=0;Ce<ie.length;Ce++){const qe=ie[Ce].image[fe].image;nt?k&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ce+1,0,0,qe.width,qe.height,Ye,De,qe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ce+1,gt,qe.width,qe.height,0,Ye,De,qe.data)}}else{nt?k&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,0,0,Ye,De,Le[fe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,gt,Ye,De,Le[fe]);for(let Ce=0;Ce<ie.length;Ce++){const Te=ie[Ce];nt?k&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ce+1,0,0,Ye,De,Te.image[fe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Ce+1,gt,Ye,De,Te.image[fe])}}}S(b)&&m(i.TEXTURE_CUBE_MAP),re.__version=Z.version,b.onUpdate&&b.onUpdate(b)}D.__version=b.version}function Oe(D,b,K,le,Z,re){const ze=a.convert(K.format,K.colorSpace),Ae=a.convert(K.type),Ke=N(K.internalFormat,ze,Ae,K.colorSpace),Ze=n.get(b),_e=n.get(K);if(_e.__renderTarget=b,!Ze.__hasExternalTextures){const Le=Math.max(1,b.width>>re),ke=Math.max(1,b.height>>re);Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?t.texImage3D(Z,re,Ke,Le,ke,b.depth,0,ze,Ae,null):t.texImage2D(Z,re,Ke,Le,ke,0,ze,Ae,null)}t.bindFramebuffer(i.FRAMEBUFFER,D),ct(b)?u.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,le,Z,_e.__webglTexture,0,ft(b)):(Z===i.TEXTURE_2D||Z>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,le,Z,_e.__webglTexture,re),t.bindFramebuffer(i.FRAMEBUFFER,null)}function be(D,b,K){if(i.bindRenderbuffer(i.RENDERBUFFER,D),b.depthBuffer){const le=b.depthTexture,Z=le&&le.isDepthTexture?le.type:null,re=L(b.stencilBuffer,Z),ze=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ae=ft(b);ct(b)?u.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ae,re,b.width,b.height):K?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ae,re,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,re,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ze,i.RENDERBUFFER,D)}else{const le=b.textures;for(let Z=0;Z<le.length;Z++){const re=le[Z],ze=a.convert(re.format,re.colorSpace),Ae=a.convert(re.type),Ke=N(re.internalFormat,ze,Ae,re.colorSpace),Ze=ft(b);K&&ct(b)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ze,Ke,b.width,b.height):ct(b)?u.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ze,Ke,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,Ke,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function $e(D,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,D),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const le=n.get(b.depthTexture);le.__renderTarget=b,(!le.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),me(b.depthTexture,0);const Z=le.__webglTexture,re=ft(b);if(b.depthTexture.format===Zr)ct(b)?u.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0,re):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Z,0);else if(b.depthTexture.format===Jr)ct(b)?u.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0,re):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function Mt(D){const b=n.get(D),K=D.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==D.depthTexture){const le=D.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),le){const Z=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,le.removeEventListener("dispose",Z)};le.addEventListener("dispose",Z),b.__depthDisposeCallback=Z}b.__boundDepthTexture=le}if(D.depthTexture&&!b.__autoAllocateDepthBuffer){if(K)throw new Error("target.depthTexture not supported in Cube render targets");const le=D.texture.mipmaps;le&&le.length>0?$e(b.__webglFramebuffer[0],D):$e(b.__webglFramebuffer,D)}else if(K){b.__webglDepthbuffer=[];for(let le=0;le<6;le++)if(t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[le]),b.__webglDepthbuffer[le]===void 0)b.__webglDepthbuffer[le]=i.createRenderbuffer(),be(b.__webglDepthbuffer[le],D,!1);else{const Z=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,re=b.__webglDepthbuffer[le];i.bindRenderbuffer(i.RENDERBUFFER,re),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,re)}}else{const le=D.texture.mipmaps;if(le&&le.length>0?t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),be(b.__webglDepthbuffer,D,!1);else{const Z=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,re=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,re),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,re)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function He(D,b,K){const le=n.get(D);b!==void 0&&Oe(le.__webglFramebuffer,D,D.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),K!==void 0&&Mt(D)}function Vt(D){const b=D.texture,K=n.get(D),le=n.get(b);D.addEventListener("dispose",l);const Z=D.textures,re=D.isWebGLCubeRenderTarget===!0,ze=Z.length>1;if(ze||(le.__webglTexture===void 0&&(le.__webglTexture=i.createTexture()),le.__version=b.version,c.memory.textures++),re){K.__webglFramebuffer=[];for(let Ae=0;Ae<6;Ae++)if(b.mipmaps&&b.mipmaps.length>0){K.__webglFramebuffer[Ae]=[];for(let Ke=0;Ke<b.mipmaps.length;Ke++)K.__webglFramebuffer[Ae][Ke]=i.createFramebuffer()}else K.__webglFramebuffer[Ae]=i.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){K.__webglFramebuffer=[];for(let Ae=0;Ae<b.mipmaps.length;Ae++)K.__webglFramebuffer[Ae]=i.createFramebuffer()}else K.__webglFramebuffer=i.createFramebuffer();if(ze)for(let Ae=0,Ke=Z.length;Ae<Ke;Ae++){const Ze=n.get(Z[Ae]);Ze.__webglTexture===void 0&&(Ze.__webglTexture=i.createTexture(),c.memory.textures++)}if(D.samples>0&&ct(D)===!1){K.__webglMultisampledFramebuffer=i.createFramebuffer(),K.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,K.__webglMultisampledFramebuffer);for(let Ae=0;Ae<Z.length;Ae++){const Ke=Z[Ae];K.__webglColorRenderbuffer[Ae]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,K.__webglColorRenderbuffer[Ae]);const Ze=a.convert(Ke.format,Ke.colorSpace),_e=a.convert(Ke.type),Le=N(Ke.internalFormat,Ze,_e,Ke.colorSpace,D.isXRRenderTarget===!0),ke=ft(D);i.renderbufferStorageMultisample(i.RENDERBUFFER,ke,Le,D.width,D.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ae,i.RENDERBUFFER,K.__webglColorRenderbuffer[Ae])}i.bindRenderbuffer(i.RENDERBUFFER,null),D.depthBuffer&&(K.__webglDepthRenderbuffer=i.createRenderbuffer(),be(K.__webglDepthRenderbuffer,D,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(re){t.bindTexture(i.TEXTURE_CUBE_MAP,le.__webglTexture),st(i.TEXTURE_CUBE_MAP,b);for(let Ae=0;Ae<6;Ae++)if(b.mipmaps&&b.mipmaps.length>0)for(let Ke=0;Ke<b.mipmaps.length;Ke++)Oe(K.__webglFramebuffer[Ae][Ke],D,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,Ke);else Oe(K.__webglFramebuffer[Ae],D,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0);S(b)&&m(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ze){for(let Ae=0,Ke=Z.length;Ae<Ke;Ae++){const Ze=Z[Ae],_e=n.get(Ze);t.bindTexture(i.TEXTURE_2D,_e.__webglTexture),st(i.TEXTURE_2D,Ze),Oe(K.__webglFramebuffer,D,Ze,i.COLOR_ATTACHMENT0+Ae,i.TEXTURE_2D,0),S(Ze)&&m(i.TEXTURE_2D)}t.unbindTexture()}else{let Ae=i.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(Ae=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Ae,le.__webglTexture),st(Ae,b),b.mipmaps&&b.mipmaps.length>0)for(let Ke=0;Ke<b.mipmaps.length;Ke++)Oe(K.__webglFramebuffer[Ke],D,b,i.COLOR_ATTACHMENT0,Ae,Ke);else Oe(K.__webglFramebuffer,D,b,i.COLOR_ATTACHMENT0,Ae,0);S(b)&&m(Ae),t.unbindTexture()}D.depthBuffer&&Mt(D)}function Dt(D){const b=D.textures;for(let K=0,le=b.length;K<le;K++){const Z=b[K];if(S(Z)){const re=O(D),ze=n.get(Z).__webglTexture;t.bindTexture(re,ze),m(re),t.unbindTexture()}}}const lt=[],F=[];function pn(D){if(D.samples>0){if(ct(D)===!1){const b=D.textures,K=D.width,le=D.height;let Z=i.COLOR_BUFFER_BIT;const re=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ze=n.get(D),Ae=b.length>1;if(Ae)for(let Ze=0;Ze<b.length;Ze++)t.bindFramebuffer(i.FRAMEBUFFER,ze.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ze,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ze.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ze,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ze.__webglMultisampledFramebuffer);const Ke=D.texture.mipmaps;Ke&&Ke.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ze.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ze.__webglFramebuffer);for(let Ze=0;Ze<b.length;Ze++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(Z|=i.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(Z|=i.STENCIL_BUFFER_BIT)),Ae){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ze.__webglColorRenderbuffer[Ze]);const _e=n.get(b[Ze]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,_e,0)}i.blitFramebuffer(0,0,K,le,0,0,K,le,Z,i.NEAREST),d===!0&&(lt.length=0,F.length=0,lt.push(i.COLOR_ATTACHMENT0+Ze),D.depthBuffer&&D.resolveDepthBuffer===!1&&(lt.push(re),F.push(re),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,F)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,lt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Ae)for(let Ze=0;Ze<b.length;Ze++){t.bindFramebuffer(i.FRAMEBUFFER,ze.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ze,i.RENDERBUFFER,ze.__webglColorRenderbuffer[Ze]);const _e=n.get(b[Ze]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ze.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ze,i.TEXTURE_2D,_e,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ze.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&d){const b=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function ft(D){return Math.min(s.maxSamples,D.samples)}function ct(D){const b=n.get(D);return D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Fe(D){const b=c.render.frame;g.get(D)!==b&&(g.set(D,b),D.update())}function Ft(D,b){const K=D.colorSpace,le=D.format,Z=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||K!==yr&&K!==yi&&(At.getTransfer(K)===It?(le!==Fn||Z!==Yn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",K)),b}function Ge(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(p.width=D.naturalWidth||D.width,p.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(p.width=D.displayWidth,p.height=D.displayHeight):(p.width=D.width,p.height=D.height),p}this.allocateTextureUnit=j,this.resetTextureUnits=ue,this.setTexture2D=me,this.setTexture2DArray=he,this.setTexture3D=pe,this.setTextureCube=se,this.rebindTextures=He,this.setupRenderTarget=Vt,this.updateRenderTargetMipmap=Dt,this.updateMultisampleRenderTarget=pn,this.setupDepthRenderbuffer=Mt,this.setupFrameBufferTexture=Oe,this.useMultisampledRTT=ct}function Gg(i,e){function t(n,s=yi){let a;const c=At.getTransfer(s);if(n===Yn)return i.UNSIGNED_BYTE;if(n===Uo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Io)return i.UNSIGNED_SHORT_5_5_5_1;if(n===dc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===fc)return i.BYTE;if(n===hc)return i.SHORT;if(n===$r)return i.UNSIGNED_SHORT;if(n===Lo)return i.INT;if(n===qi)return i.UNSIGNED_INT;if(n===oi)return i.FLOAT;if(n===ts)return i.HALF_FLOAT;if(n===pc)return i.ALPHA;if(n===mc)return i.RGB;if(n===Fn)return i.RGBA;if(n===Zr)return i.DEPTH_COMPONENT;if(n===Jr)return i.DEPTH_STENCIL;if(n===gc)return i.RED;if(n===No)return i.RED_INTEGER;if(n===_c)return i.RG;if(n===Fo)return i.RG_INTEGER;if(n===Oo)return i.RGBA_INTEGER;if(n===Ns||n===Fs||n===Os||n===Bs)if(c===It)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(n===Ns)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Fs)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Os)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Bs)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(n===Ns)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Fs)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Os)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Bs)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ja||n===Qa||n===eo||n===to)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(n===Ja)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Qa)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===eo)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===to)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===no||n===io||n===ro)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(n===no||n===io)return c===It?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(n===ro)return c===It?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===so||n===ao||n===oo||n===lo||n===co||n===uo||n===fo||n===ho||n===po||n===mo||n===go||n===_o||n===vo||n===xo)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(n===so)return c===It?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ao)return c===It?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===oo)return c===It?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===lo)return c===It?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===co)return c===It?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===uo)return c===It?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===fo)return c===It?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ho)return c===It?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===po)return c===It?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===mo)return c===It?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===go)return c===It?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===_o)return c===It?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===vo)return c===It?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===xo)return c===It?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===zs||n===Mo||n===So)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(n===zs)return c===It?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Mo)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===So)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===vc||n===yo||n===Eo||n===To)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(n===zs)return a.COMPRESSED_RED_RGTC1_EXT;if(n===yo)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Eo)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===To)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Kr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const Wg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Xg=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class qg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new dn,a=e.properties.get(s);a.__webglTexture=t.texture,(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Ai({vertexShader:Wg,fragmentShader:Xg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new qn(new Ys(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Yg extends Ar{constructor(e,t){super();const n=this;let s=null,a=1,c=null,u="local-floor",d=1,p=null,g=null,_=null,M=null,y=null,T=null;const w=new qg,S=t.getContextAttributes();let m=null,O=null;const N=[],L=[],q=new Ct;let V=null;const l=new Sn;l.viewport=new Nt;const Y=new Sn;Y.viewport=new Nt;const R=[l,Y],C=new dh;let z=null,ue=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ce){let Me=N[ce];return Me===void 0&&(Me=new Pa,N[ce]=Me),Me.getTargetRaySpace()},this.getControllerGrip=function(ce){let Me=N[ce];return Me===void 0&&(Me=new Pa,N[ce]=Me),Me.getGripSpace()},this.getHand=function(ce){let Me=N[ce];return Me===void 0&&(Me=new Pa,N[ce]=Me),Me.getHandSpace()};function j(ce){const Me=L.indexOf(ce.inputSource);if(Me===-1)return;const Oe=N[Me];Oe!==void 0&&(Oe.update(ce.inputSource,ce.frame,p||c),Oe.dispatchEvent({type:ce.type,data:ce.inputSource}))}function de(){s.removeEventListener("select",j),s.removeEventListener("selectstart",j),s.removeEventListener("selectend",j),s.removeEventListener("squeeze",j),s.removeEventListener("squeezestart",j),s.removeEventListener("squeezeend",j),s.removeEventListener("end",de),s.removeEventListener("inputsourceschange",me);for(let ce=0;ce<N.length;ce++){const Me=L[ce];Me!==null&&(L[ce]=null,N[ce].disconnect(Me))}z=null,ue=null,w.reset(),e.setRenderTarget(m),y=null,M=null,_=null,s=null,O=null,Rt.stop(),n.isPresenting=!1,e.setPixelRatio(V),e.setSize(q.width,q.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ce){a=ce,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ce){u=ce,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||c},this.setReferenceSpace=function(ce){p=ce},this.getBaseLayer=function(){return M!==null?M:y},this.getBinding=function(){return _},this.getFrame=function(){return T},this.getSession=function(){return s},this.setSession=async function(ce){if(s=ce,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",j),s.addEventListener("selectstart",j),s.addEventListener("selectend",j),s.addEventListener("squeeze",j),s.addEventListener("squeezestart",j),s.addEventListener("squeezeend",j),s.addEventListener("end",de),s.addEventListener("inputsourceschange",me),S.xrCompatible!==!0&&await t.makeXRCompatible(),V=e.getPixelRatio(),e.getSize(q),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let Oe=null,be=null,$e=null;S.depth&&($e=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Oe=S.stencil?Jr:Zr,be=S.stencil?Kr:qi);const Mt={colorFormat:t.RGBA8,depthFormat:$e,scaleFactor:a};_=new XRWebGLBinding(s,t),M=_.createProjectionLayer(Mt),s.updateRenderState({layers:[M]}),e.setPixelRatio(1),e.setSize(M.textureWidth,M.textureHeight,!1),O=new Yi(M.textureWidth,M.textureHeight,{format:Fn,type:Yn,depthTexture:new Dc(M.textureWidth,M.textureHeight,be,void 0,void 0,void 0,void 0,void 0,void 0,Oe),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:M.ignoreDepthValues===!1,resolveStencilBuffer:M.ignoreDepthValues===!1})}else{const Oe={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:a};y=new XRWebGLLayer(s,t,Oe),s.updateRenderState({baseLayer:y}),e.setPixelRatio(1),e.setSize(y.framebufferWidth,y.framebufferHeight,!1),O=new Yi(y.framebufferWidth,y.framebufferHeight,{format:Fn,type:Yn,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:y.ignoreDepthValues===!1,resolveStencilBuffer:y.ignoreDepthValues===!1})}O.isXRRenderTarget=!0,this.setFoveation(d),p=null,c=await s.requestReferenceSpace(u),Rt.setContext(s),Rt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return w.getDepthTexture()};function me(ce){for(let Me=0;Me<ce.removed.length;Me++){const Oe=ce.removed[Me],be=L.indexOf(Oe);be>=0&&(L[be]=null,N[be].disconnect(Oe))}for(let Me=0;Me<ce.added.length;Me++){const Oe=ce.added[Me];let be=L.indexOf(Oe);if(be===-1){for(let Mt=0;Mt<N.length;Mt++)if(Mt>=L.length){L.push(Oe),be=Mt;break}else if(L[Mt]===null){L[Mt]=Oe,be=Mt;break}if(be===-1)break}const $e=N[be];$e&&$e.connect(Oe)}}const he=new X,pe=new X;function se(ce,Me,Oe){he.setFromMatrixPosition(Me.matrixWorld),pe.setFromMatrixPosition(Oe.matrixWorld);const be=he.distanceTo(pe),$e=Me.projectionMatrix.elements,Mt=Oe.projectionMatrix.elements,He=$e[14]/($e[10]-1),Vt=$e[14]/($e[10]+1),Dt=($e[9]+1)/$e[5],lt=($e[9]-1)/$e[5],F=($e[8]-1)/$e[0],pn=(Mt[8]+1)/Mt[0],ft=He*F,ct=He*pn,Fe=be/(-F+pn),Ft=Fe*-F;if(Me.matrixWorld.decompose(ce.position,ce.quaternion,ce.scale),ce.translateX(Ft),ce.translateZ(Fe),ce.matrixWorld.compose(ce.position,ce.quaternion,ce.scale),ce.matrixWorldInverse.copy(ce.matrixWorld).invert(),$e[10]===-1)ce.projectionMatrix.copy(Me.projectionMatrix),ce.projectionMatrixInverse.copy(Me.projectionMatrixInverse);else{const Ge=He+Fe,D=Vt+Fe,b=ft-Ft,K=ct+(be-Ft),le=Dt*Vt/D*Ge,Z=lt*Vt/D*Ge;ce.projectionMatrix.makePerspective(b,K,le,Z,Ge,D),ce.projectionMatrixInverse.copy(ce.projectionMatrix).invert()}}function Se(ce,Me){Me===null?ce.matrixWorld.copy(ce.matrix):ce.matrixWorld.multiplyMatrices(Me.matrixWorld,ce.matrix),ce.matrixWorldInverse.copy(ce.matrixWorld).invert()}this.updateCamera=function(ce){if(s===null)return;let Me=ce.near,Oe=ce.far;w.texture!==null&&(w.depthNear>0&&(Me=w.depthNear),w.depthFar>0&&(Oe=w.depthFar)),C.near=Y.near=l.near=Me,C.far=Y.far=l.far=Oe,(z!==C.near||ue!==C.far)&&(s.updateRenderState({depthNear:C.near,depthFar:C.far}),z=C.near,ue=C.far),l.layers.mask=ce.layers.mask|2,Y.layers.mask=ce.layers.mask|4,C.layers.mask=l.layers.mask|Y.layers.mask;const be=ce.parent,$e=C.cameras;Se(C,be);for(let Mt=0;Mt<$e.length;Mt++)Se($e[Mt],be);$e.length===2?se(C,l,Y):C.projectionMatrix.copy(l.projectionMatrix),Ue(ce,C,be)};function Ue(ce,Me,Oe){Oe===null?ce.matrix.copy(Me.matrixWorld):(ce.matrix.copy(Oe.matrixWorld),ce.matrix.invert(),ce.matrix.multiply(Me.matrixWorld)),ce.matrix.decompose(ce.position,ce.quaternion,ce.scale),ce.updateMatrixWorld(!0),ce.projectionMatrix.copy(Me.projectionMatrix),ce.projectionMatrixInverse.copy(Me.projectionMatrixInverse),ce.isPerspectiveCamera&&(ce.fov=Qr*2*Math.atan(1/ce.projectionMatrix.elements[5]),ce.zoom=1)}this.getCamera=function(){return C},this.getFoveation=function(){if(!(M===null&&y===null))return d},this.setFoveation=function(ce){d=ce,M!==null&&(M.fixedFoveation=ce),y!==null&&y.fixedFoveation!==void 0&&(y.fixedFoveation=ce)},this.hasDepthSensing=function(){return w.texture!==null},this.getDepthSensingMesh=function(){return w.getMesh(C)};let Ve=null;function st(ce,Me){if(g=Me.getViewerPose(p||c),T=Me,g!==null){const Oe=g.views;y!==null&&(e.setRenderTargetFramebuffer(O,y.framebuffer),e.setRenderTarget(O));let be=!1;Oe.length!==C.cameras.length&&(C.cameras.length=0,be=!0);for(let He=0;He<Oe.length;He++){const Vt=Oe[He];let Dt=null;if(y!==null)Dt=y.getViewport(Vt);else{const F=_.getViewSubImage(M,Vt);Dt=F.viewport,He===0&&(e.setRenderTargetTextures(O,F.colorTexture,F.depthStencilTexture),e.setRenderTarget(O))}let lt=R[He];lt===void 0&&(lt=new Sn,lt.layers.enable(He),lt.viewport=new Nt,R[He]=lt),lt.matrix.fromArray(Vt.transform.matrix),lt.matrix.decompose(lt.position,lt.quaternion,lt.scale),lt.projectionMatrix.fromArray(Vt.projectionMatrix),lt.projectionMatrixInverse.copy(lt.projectionMatrix).invert(),lt.viewport.set(Dt.x,Dt.y,Dt.width,Dt.height),He===0&&(C.matrix.copy(lt.matrix),C.matrix.decompose(C.position,C.quaternion,C.scale)),be===!0&&C.cameras.push(lt)}const $e=s.enabledFeatures;if($e&&$e.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){const He=_.getDepthInformation(Oe[0]);He&&He.isValid&&He.texture&&w.init(e,He,s.renderState)}}for(let Oe=0;Oe<N.length;Oe++){const be=L[Oe],$e=N[Oe];be!==null&&$e!==void 0&&$e.update(be,Me,p||c)}Ve&&Ve(ce,Me),Me.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Me}),T=null}const Rt=new Nc;Rt.setAnimationLoop(st),this.setAnimationLoop=function(ce){Ve=ce},this.dispose=function(){}}}const Oi=new jn,jg=new kt;function $g(i,e){function t(S,m){S.matrixAutoUpdate===!0&&S.updateMatrix(),m.value.copy(S.matrix)}function n(S,m){m.color.getRGB(S.fogColor.value,Cc(i)),m.isFog?(S.fogNear.value=m.near,S.fogFar.value=m.far):m.isFogExp2&&(S.fogDensity.value=m.density)}function s(S,m,O,N,L){m.isMeshBasicMaterial||m.isMeshLambertMaterial?a(S,m):m.isMeshToonMaterial?(a(S,m),_(S,m)):m.isMeshPhongMaterial?(a(S,m),g(S,m)):m.isMeshStandardMaterial?(a(S,m),M(S,m),m.isMeshPhysicalMaterial&&y(S,m,L)):m.isMeshMatcapMaterial?(a(S,m),T(S,m)):m.isMeshDepthMaterial?a(S,m):m.isMeshDistanceMaterial?(a(S,m),w(S,m)):m.isMeshNormalMaterial?a(S,m):m.isLineBasicMaterial?(c(S,m),m.isLineDashedMaterial&&u(S,m)):m.isPointsMaterial?d(S,m,O,N):m.isSpriteMaterial?p(S,m):m.isShadowMaterial?(S.color.value.copy(m.color),S.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function a(S,m){S.opacity.value=m.opacity,m.color&&S.diffuse.value.copy(m.color),m.emissive&&S.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(S.map.value=m.map,t(m.map,S.mapTransform)),m.alphaMap&&(S.alphaMap.value=m.alphaMap,t(m.alphaMap,S.alphaMapTransform)),m.bumpMap&&(S.bumpMap.value=m.bumpMap,t(m.bumpMap,S.bumpMapTransform),S.bumpScale.value=m.bumpScale,m.side===vn&&(S.bumpScale.value*=-1)),m.normalMap&&(S.normalMap.value=m.normalMap,t(m.normalMap,S.normalMapTransform),S.normalScale.value.copy(m.normalScale),m.side===vn&&S.normalScale.value.negate()),m.displacementMap&&(S.displacementMap.value=m.displacementMap,t(m.displacementMap,S.displacementMapTransform),S.displacementScale.value=m.displacementScale,S.displacementBias.value=m.displacementBias),m.emissiveMap&&(S.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,S.emissiveMapTransform)),m.specularMap&&(S.specularMap.value=m.specularMap,t(m.specularMap,S.specularMapTransform)),m.alphaTest>0&&(S.alphaTest.value=m.alphaTest);const O=e.get(m),N=O.envMap,L=O.envMapRotation;N&&(S.envMap.value=N,Oi.copy(L),Oi.x*=-1,Oi.y*=-1,Oi.z*=-1,N.isCubeTexture&&N.isRenderTargetTexture===!1&&(Oi.y*=-1,Oi.z*=-1),S.envMapRotation.value.setFromMatrix4(jg.makeRotationFromEuler(Oi)),S.flipEnvMap.value=N.isCubeTexture&&N.isRenderTargetTexture===!1?-1:1,S.reflectivity.value=m.reflectivity,S.ior.value=m.ior,S.refractionRatio.value=m.refractionRatio),m.lightMap&&(S.lightMap.value=m.lightMap,S.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,S.lightMapTransform)),m.aoMap&&(S.aoMap.value=m.aoMap,S.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,S.aoMapTransform))}function c(S,m){S.diffuse.value.copy(m.color),S.opacity.value=m.opacity,m.map&&(S.map.value=m.map,t(m.map,S.mapTransform))}function u(S,m){S.dashSize.value=m.dashSize,S.totalSize.value=m.dashSize+m.gapSize,S.scale.value=m.scale}function d(S,m,O,N){S.diffuse.value.copy(m.color),S.opacity.value=m.opacity,S.size.value=m.size*O,S.scale.value=N*.5,m.map&&(S.map.value=m.map,t(m.map,S.uvTransform)),m.alphaMap&&(S.alphaMap.value=m.alphaMap,t(m.alphaMap,S.alphaMapTransform)),m.alphaTest>0&&(S.alphaTest.value=m.alphaTest)}function p(S,m){S.diffuse.value.copy(m.color),S.opacity.value=m.opacity,S.rotation.value=m.rotation,m.map&&(S.map.value=m.map,t(m.map,S.mapTransform)),m.alphaMap&&(S.alphaMap.value=m.alphaMap,t(m.alphaMap,S.alphaMapTransform)),m.alphaTest>0&&(S.alphaTest.value=m.alphaTest)}function g(S,m){S.specular.value.copy(m.specular),S.shininess.value=Math.max(m.shininess,1e-4)}function _(S,m){m.gradientMap&&(S.gradientMap.value=m.gradientMap)}function M(S,m){S.metalness.value=m.metalness,m.metalnessMap&&(S.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,S.metalnessMapTransform)),S.roughness.value=m.roughness,m.roughnessMap&&(S.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,S.roughnessMapTransform)),m.envMap&&(S.envMapIntensity.value=m.envMapIntensity)}function y(S,m,O){S.ior.value=m.ior,m.sheen>0&&(S.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),S.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(S.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,S.sheenColorMapTransform)),m.sheenRoughnessMap&&(S.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,S.sheenRoughnessMapTransform))),m.clearcoat>0&&(S.clearcoat.value=m.clearcoat,S.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(S.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,S.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(S.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,S.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(S.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,S.clearcoatNormalMapTransform),S.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===vn&&S.clearcoatNormalScale.value.negate())),m.dispersion>0&&(S.dispersion.value=m.dispersion),m.iridescence>0&&(S.iridescence.value=m.iridescence,S.iridescenceIOR.value=m.iridescenceIOR,S.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],S.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(S.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,S.iridescenceMapTransform)),m.iridescenceThicknessMap&&(S.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,S.iridescenceThicknessMapTransform))),m.transmission>0&&(S.transmission.value=m.transmission,S.transmissionSamplerMap.value=O.texture,S.transmissionSamplerSize.value.set(O.width,O.height),m.transmissionMap&&(S.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,S.transmissionMapTransform)),S.thickness.value=m.thickness,m.thicknessMap&&(S.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,S.thicknessMapTransform)),S.attenuationDistance.value=m.attenuationDistance,S.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(S.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(S.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,S.anisotropyMapTransform))),S.specularIntensity.value=m.specularIntensity,S.specularColor.value.copy(m.specularColor),m.specularColorMap&&(S.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,S.specularColorMapTransform)),m.specularIntensityMap&&(S.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,S.specularIntensityMapTransform))}function T(S,m){m.matcap&&(S.matcap.value=m.matcap)}function w(S,m){const O=e.get(m).light;S.referencePosition.value.setFromMatrixPosition(O.matrixWorld),S.nearDistance.value=O.shadow.camera.near,S.farDistance.value=O.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Kg(i,e,t,n){let s={},a={},c=[];const u=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function d(O,N){const L=N.program;n.uniformBlockBinding(O,L)}function p(O,N){let L=s[O.id];L===void 0&&(T(O),L=g(O),s[O.id]=L,O.addEventListener("dispose",S));const q=N.program;n.updateUBOMapping(O,q);const V=e.render.frame;a[O.id]!==V&&(M(O),a[O.id]=V)}function g(O){const N=_();O.__bindingPointIndex=N;const L=i.createBuffer(),q=O.__size,V=O.usage;return i.bindBuffer(i.UNIFORM_BUFFER,L),i.bufferData(i.UNIFORM_BUFFER,q,V),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,N,L),L}function _(){for(let O=0;O<u;O++)if(c.indexOf(O)===-1)return c.push(O),O;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function M(O){const N=s[O.id],L=O.uniforms,q=O.__cache;i.bindBuffer(i.UNIFORM_BUFFER,N);for(let V=0,l=L.length;V<l;V++){const Y=Array.isArray(L[V])?L[V]:[L[V]];for(let R=0,C=Y.length;R<C;R++){const z=Y[R];if(y(z,V,R,q)===!0){const ue=z.__offset,j=Array.isArray(z.value)?z.value:[z.value];let de=0;for(let me=0;me<j.length;me++){const he=j[me],pe=w(he);typeof he=="number"||typeof he=="boolean"?(z.__data[0]=he,i.bufferSubData(i.UNIFORM_BUFFER,ue+de,z.__data)):he.isMatrix3?(z.__data[0]=he.elements[0],z.__data[1]=he.elements[1],z.__data[2]=he.elements[2],z.__data[3]=0,z.__data[4]=he.elements[3],z.__data[5]=he.elements[4],z.__data[6]=he.elements[5],z.__data[7]=0,z.__data[8]=he.elements[6],z.__data[9]=he.elements[7],z.__data[10]=he.elements[8],z.__data[11]=0):(he.toArray(z.__data,de),de+=pe.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,ue,z.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function y(O,N,L,q){const V=O.value,l=N+"_"+L;if(q[l]===void 0)return typeof V=="number"||typeof V=="boolean"?q[l]=V:q[l]=V.clone(),!0;{const Y=q[l];if(typeof V=="number"||typeof V=="boolean"){if(Y!==V)return q[l]=V,!0}else if(Y.equals(V)===!1)return Y.copy(V),!0}return!1}function T(O){const N=O.uniforms;let L=0;const q=16;for(let l=0,Y=N.length;l<Y;l++){const R=Array.isArray(N[l])?N[l]:[N[l]];for(let C=0,z=R.length;C<z;C++){const ue=R[C],j=Array.isArray(ue.value)?ue.value:[ue.value];for(let de=0,me=j.length;de<me;de++){const he=j[de],pe=w(he),se=L%q,Se=se%pe.boundary,Ue=se+Se;L+=Se,Ue!==0&&q-Ue<pe.storage&&(L+=q-Ue),ue.__data=new Float32Array(pe.storage/Float32Array.BYTES_PER_ELEMENT),ue.__offset=L,L+=pe.storage}}}const V=L%q;return V>0&&(L+=q-V),O.__size=L,O.__cache={},this}function w(O){const N={boundary:0,storage:0};return typeof O=="number"||typeof O=="boolean"?(N.boundary=4,N.storage=4):O.isVector2?(N.boundary=8,N.storage=8):O.isVector3||O.isColor?(N.boundary=16,N.storage=12):O.isVector4?(N.boundary=16,N.storage=16):O.isMatrix3?(N.boundary=48,N.storage=48):O.isMatrix4?(N.boundary=64,N.storage=64):O.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",O),N}function S(O){const N=O.target;N.removeEventListener("dispose",S);const L=c.indexOf(N.__bindingPointIndex);c.splice(L,1),i.deleteBuffer(s[N.id]),delete s[N.id],delete a[N.id]}function m(){for(const O in s)i.deleteBuffer(s[O]);c=[],s={},a={}}return{bind:d,update:p,dispose:m}}class Zg{constructor(e={}){const{canvas:t=Tf(),context:n=null,depth:s=!0,stencil:a=!1,alpha:c=!1,antialias:u=!1,premultipliedAlpha:d=!0,preserveDrawingBuffer:p=!1,powerPreference:g="default",failIfMajorPerformanceCaveat:_=!1,reverseDepthBuffer:M=!1}=e;this.isWebGLRenderer=!0;let y;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");y=n.getContextAttributes().alpha}else y=c;const T=new Uint32Array(4),w=new Int32Array(4);let S=null,m=null;const O=[],N=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ti,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const L=this;let q=!1;this._outputColorSpace=Cn;let V=0,l=0,Y=null,R=-1,C=null;const z=new Nt,ue=new Nt;let j=null;const de=new wt(0);let me=0,he=t.width,pe=t.height,se=1,Se=null,Ue=null;const Ve=new Nt(0,0,he,pe),st=new Nt(0,0,he,pe);let Rt=!1;const ce=new Vo;let Me=!1,Oe=!1;const be=new kt,$e=new kt,Mt=new X,He=new Nt,Vt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Dt=!1;function lt(){return Y===null?se:1}let F=n;function pn(A,G){return t.getContext(A,G)}try{const A={alpha:!0,depth:s,stencil:a,antialias:u,premultipliedAlpha:d,preserveDrawingBuffer:p,powerPreference:g,failIfMajorPerformanceCaveat:_};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Po}`),t.addEventListener("webglcontextlost",fe,!1),t.addEventListener("webglcontextrestored",Ce,!1),t.addEventListener("webglcontextcreationerror",Te,!1),F===null){const G="webgl2";if(F=pn(G,A),F===null)throw pn(G)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let ft,ct,Fe,Ft,Ge,D,b,K,le,Z,re,ze,Ae,Ke,Ze,_e,Le,ke,Ye,De,gt,nt,Lt,k;function we(){ft=new om(F),ft.init(),nt=new Gg(F,ft),ct=new em(F,ft,e,nt),Fe=new kg(F,ft),ct.reverseDepthBuffer&&M&&Fe.buffers.depth.setReversed(!0),Ft=new um(F),Ge=new Cg,D=new Vg(F,ft,Fe,Ge,ct,nt,Ft),b=new nm(L),K=new am(L),le=new gh(F),Lt=new Jp(F,le),Z=new lm(F,le,Ft,Lt),re=new hm(F,Z,le,Ft),Ye=new fm(F,ct,D),_e=new tm(Ge),ze=new wg(L,b,K,ft,ct,Lt,_e),Ae=new $g(L,Ge),Ke=new Pg,Ze=new Fg(ft),ke=new Zp(L,b,K,Fe,re,y,d),Le=new zg(L,re,ct),k=new Kg(F,Ft,ct,Fe),De=new Qp(F,ft,Ft),gt=new cm(F,ft,Ft),Ft.programs=ze.programs,L.capabilities=ct,L.extensions=ft,L.properties=Ge,L.renderLists=Ke,L.shadowMap=Le,L.state=Fe,L.info=Ft}we();const ie=new Yg(L,F);this.xr=ie,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const A=ft.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=ft.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return se},this.setPixelRatio=function(A){A!==void 0&&(se=A,this.setSize(he,pe,!1))},this.getSize=function(A){return A.set(he,pe)},this.setSize=function(A,G,Q=!0){if(ie.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}he=A,pe=G,t.width=Math.floor(A*se),t.height=Math.floor(G*se),Q===!0&&(t.style.width=A+"px",t.style.height=G+"px"),this.setViewport(0,0,A,G)},this.getDrawingBufferSize=function(A){return A.set(he*se,pe*se).floor()},this.setDrawingBufferSize=function(A,G,Q){he=A,pe=G,se=Q,t.width=Math.floor(A*Q),t.height=Math.floor(G*Q),this.setViewport(0,0,A,G)},this.getCurrentViewport=function(A){return A.copy(z)},this.getViewport=function(A){return A.copy(Ve)},this.setViewport=function(A,G,Q,ee){A.isVector4?Ve.set(A.x,A.y,A.z,A.w):Ve.set(A,G,Q,ee),Fe.viewport(z.copy(Ve).multiplyScalar(se).round())},this.getScissor=function(A){return A.copy(st)},this.setScissor=function(A,G,Q,ee){A.isVector4?st.set(A.x,A.y,A.z,A.w):st.set(A,G,Q,ee),Fe.scissor(ue.copy(st).multiplyScalar(se).round())},this.getScissorTest=function(){return Rt},this.setScissorTest=function(A){Fe.setScissorTest(Rt=A)},this.setOpaqueSort=function(A){Se=A},this.setTransparentSort=function(A){Ue=A},this.getClearColor=function(A){return A.copy(ke.getClearColor())},this.setClearColor=function(){ke.setClearColor(...arguments)},this.getClearAlpha=function(){return ke.getClearAlpha()},this.setClearAlpha=function(){ke.setClearAlpha(...arguments)},this.clear=function(A=!0,G=!0,Q=!0){let ee=0;if(A){let W=!1;if(Y!==null){const ve=Y.texture.format;W=ve===Oo||ve===Fo||ve===No}if(W){const ve=Y.texture.type,ye=ve===Yn||ve===qi||ve===$r||ve===Kr||ve===Uo||ve===Io,Ie=ke.getClearColor(),Ne=ke.getClearAlpha(),et=Ie.r,Je=Ie.g,Xe=Ie.b;ye?(T[0]=et,T[1]=Je,T[2]=Xe,T[3]=Ne,F.clearBufferuiv(F.COLOR,0,T)):(w[0]=et,w[1]=Je,w[2]=Xe,w[3]=Ne,F.clearBufferiv(F.COLOR,0,w))}else ee|=F.COLOR_BUFFER_BIT}G&&(ee|=F.DEPTH_BUFFER_BIT),Q&&(ee|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(ee)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",fe,!1),t.removeEventListener("webglcontextrestored",Ce,!1),t.removeEventListener("webglcontextcreationerror",Te,!1),ke.dispose(),Ke.dispose(),Ze.dispose(),Ge.dispose(),b.dispose(),K.dispose(),re.dispose(),Lt.dispose(),k.dispose(),ze.dispose(),ie.dispose(),ie.removeEventListener("sessionstart",$n),ie.removeEventListener("sessionend",Kn),Pn.stop()};function fe(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),q=!0}function Ce(){console.log("THREE.WebGLRenderer: Context Restored."),q=!1;const A=Ft.autoReset,G=Le.enabled,Q=Le.autoUpdate,ee=Le.needsUpdate,W=Le.type;we(),Ft.autoReset=A,Le.enabled=G,Le.autoUpdate=Q,Le.needsUpdate=ee,Le.type=W}function Te(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function qe(A){const G=A.target;G.removeEventListener("dispose",qe),ht(G)}function ht(A){Xt(A),Ge.remove(A)}function Xt(A){const G=Ge.get(A).programs;G!==void 0&&(G.forEach(function(Q){ze.releaseProgram(Q)}),A.isShaderMaterial&&ze.releaseShaderCache(A))}this.renderBufferDirect=function(A,G,Q,ee,W,ve){G===null&&(G=Vt);const ye=W.isMesh&&W.matrixWorld.determinant()<0,Ie=$s(A,G,Q,ee,W);Fe.setMaterial(ee,ye);let Ne=Q.index,et=1;if(ee.wireframe===!0){if(Ne=Z.getWireframeAttribute(Q),Ne===void 0)return;et=2}const Je=Q.drawRange,Xe=Q.attributes.position;let _t=Je.start*et,St=(Je.start+Je.count)*et;ve!==null&&(_t=Math.max(_t,ve.start*et),St=Math.min(St,(ve.start+ve.count)*et)),Ne!==null?(_t=Math.max(_t,0),St=Math.min(St,Ne.count)):Xe!=null&&(_t=Math.max(_t,0),St=Math.min(St,Xe.count));const Gt=St-_t;if(Gt<0||Gt===1/0)return;Lt.setup(W,ee,Ie,Q,Ne);let dt,ut=De;if(Ne!==null&&(dt=le.get(Ne),ut=gt,ut.setIndex(dt)),W.isMesh)ee.wireframe===!0?(Fe.setLineWidth(ee.wireframeLinewidth*lt()),ut.setMode(F.LINES)):ut.setMode(F.TRIANGLES);else if(W.isLine){let We=ee.linewidth;We===void 0&&(We=1),Fe.setLineWidth(We*lt()),W.isLineSegments?ut.setMode(F.LINES):W.isLineLoop?ut.setMode(F.LINE_LOOP):ut.setMode(F.LINE_STRIP)}else W.isPoints?ut.setMode(F.POINTS):W.isSprite&&ut.setMode(F.TRIANGLES);if(W.isBatchedMesh)if(W._multiDrawInstances!==null)Hs("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ut.renderMultiDrawInstances(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount,W._multiDrawInstances);else if(ft.get("WEBGL_multi_draw"))ut.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const We=W._multiDrawStarts,jt=W._multiDrawCounts,bt=W._multiDrawCount,cn=Ne?le.get(Ne).bytesPerElement:1,Zn=Ge.get(ee).currentProgram.getUniforms();for(let Qt=0;Qt<bt;Qt++)Zn.setValue(F,"_gl_DrawID",Qt),ut.render(We[Qt]/cn,jt[Qt])}else if(W.isInstancedMesh)ut.renderInstances(_t,Gt,W.count);else if(Q.isInstancedBufferGeometry){const We=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,jt=Math.min(Q.instanceCount,We);ut.renderInstances(_t,Gt,jt)}else ut.render(_t,Gt)};function Pt(A,G,Q){A.transparent===!0&&A.side===Wn&&A.forceSinglePass===!1?(A.side=vn,A.needsUpdate=!0,$i(A,G,Q),A.side=bi,A.needsUpdate=!0,$i(A,G,Q),A.side=Wn):$i(A,G,Q)}this.compile=function(A,G,Q=null){Q===null&&(Q=A),m=Ze.get(Q),m.init(G),N.push(m),Q.traverseVisible(function(W){W.isLight&&W.layers.test(G.layers)&&(m.pushLight(W),W.castShadow&&m.pushShadow(W))}),A!==Q&&A.traverseVisible(function(W){W.isLight&&W.layers.test(G.layers)&&(m.pushLight(W),W.castShadow&&m.pushShadow(W))}),m.setupLights();const ee=new Set;return A.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const ve=W.material;if(ve)if(Array.isArray(ve))for(let ye=0;ye<ve.length;ye++){const Ie=ve[ye];Pt(Ie,Q,W),ee.add(Ie)}else Pt(ve,Q,W),ee.add(ve)}),m=N.pop(),ee},this.compileAsync=function(A,G,Q=null){const ee=this.compile(A,G,Q);return new Promise(W=>{function ve(){if(ee.forEach(function(ye){Ge.get(ye).currentProgram.isReady()&&ee.delete(ye)}),ee.size===0){W(A);return}setTimeout(ve,10)}ft.get("KHR_parallel_shader_compile")!==null?ve():setTimeout(ve,10)})};let mn=null;function Tn(A){mn&&mn(A)}function $n(){Pn.stop()}function Kn(){Pn.start()}const Pn=new Nc;Pn.setAnimationLoop(Tn),typeof self<"u"&&Pn.setContext(self),this.setAnimationLoop=function(A){mn=A,ie.setAnimationLoop(A),A===null?Pn.stop():Pn.start()},ie.addEventListener("sessionstart",$n),ie.addEventListener("sessionend",Kn),this.render=function(A,G){if(G!==void 0&&G.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(q===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),ie.enabled===!0&&ie.isPresenting===!0&&(ie.cameraAutoUpdate===!0&&ie.updateCamera(G),G=ie.getCamera()),A.isScene===!0&&A.onBeforeRender(L,A,G,Y),m=Ze.get(A,N.length),m.init(G),N.push(m),$e.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),ce.setFromProjectionMatrix($e),Oe=this.localClippingEnabled,Me=_e.init(this.clippingPlanes,Oe),S=Ke.get(A,O.length),S.init(),O.push(S),ie.enabled===!0&&ie.isPresenting===!0){const ve=L.xr.getDepthSensingMesh();ve!==null&&ui(ve,G,-1/0,L.sortObjects)}ui(A,G,0,L.sortObjects),S.finish(),L.sortObjects===!0&&S.sort(Se,Ue),Dt=ie.enabled===!1||ie.isPresenting===!1||ie.hasDepthSensing()===!1,Dt&&ke.addToRenderList(S,A),this.info.render.frame++,Me===!0&&_e.beginShadows();const Q=m.state.shadowsArray;Le.render(Q,A,G),Me===!0&&_e.endShadows(),this.info.autoReset===!0&&this.info.reset();const ee=S.opaque,W=S.transmissive;if(m.setupLights(),G.isArrayCamera){const ve=G.cameras;if(W.length>0)for(let ye=0,Ie=ve.length;ye<Ie;ye++){const Ne=ve[ye];as(ee,W,A,Ne)}Dt&&ke.render(A);for(let ye=0,Ie=ve.length;ye<Ie;ye++){const Ne=ve[ye];ss(S,A,Ne,Ne.viewport)}}else W.length>0&&as(ee,W,A,G),Dt&&ke.render(A),ss(S,A,G);Y!==null&&l===0&&(D.updateMultisampleRenderTarget(Y),D.updateRenderTargetMipmap(Y)),A.isScene===!0&&A.onAfterRender(L,A,G),Lt.resetDefaultState(),R=-1,C=null,N.pop(),N.length>0?(m=N[N.length-1],Me===!0&&_e.setGlobalState(L.clippingPlanes,m.state.camera)):m=null,O.pop(),O.length>0?S=O[O.length-1]:S=null};function ui(A,G,Q,ee){if(A.visible===!1)return;if(A.layers.test(G.layers)){if(A.isGroup)Q=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(G);else if(A.isLight)m.pushLight(A),A.castShadow&&m.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||ce.intersectsSprite(A)){ee&&He.setFromMatrixPosition(A.matrixWorld).applyMatrix4($e);const ye=re.update(A),Ie=A.material;Ie.visible&&S.push(A,ye,Ie,Q,He.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||ce.intersectsObject(A))){const ye=re.update(A),Ie=A.material;if(ee&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),He.copy(A.boundingSphere.center)):(ye.boundingSphere===null&&ye.computeBoundingSphere(),He.copy(ye.boundingSphere.center)),He.applyMatrix4(A.matrixWorld).applyMatrix4($e)),Array.isArray(Ie)){const Ne=ye.groups;for(let et=0,Je=Ne.length;et<Je;et++){const Xe=Ne[et],_t=Ie[Xe.materialIndex];_t&&_t.visible&&S.push(A,ye,_t,Q,He.z,Xe)}}else Ie.visible&&S.push(A,ye,Ie,Q,He.z,null)}}const ve=A.children;for(let ye=0,Ie=ve.length;ye<Ie;ye++)ui(ve[ye],G,Q,ee)}function ss(A,G,Q,ee){const W=A.opaque,ve=A.transmissive,ye=A.transparent;m.setupLightsView(Q),Me===!0&&_e.setGlobalState(L.clippingPlanes,Q),ee&&Fe.viewport(z.copy(ee)),W.length>0&&ji(W,G,Q),ve.length>0&&ji(ve,G,Q),ye.length>0&&ji(ye,G,Q),Fe.buffers.depth.setTest(!0),Fe.buffers.depth.setMask(!0),Fe.buffers.color.setMask(!0),Fe.setPolygonOffset(!1)}function as(A,G,Q,ee){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[ee.id]===void 0&&(m.state.transmissionRenderTarget[ee.id]=new Yi(1,1,{generateMipmaps:!0,type:ft.has("EXT_color_buffer_half_float")||ft.has("EXT_color_buffer_float")?ts:Yn,minFilter:Gi,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:At.workingColorSpace}));const ve=m.state.transmissionRenderTarget[ee.id],ye=ee.viewport||z;ve.setSize(ye.z*L.transmissionResolutionScale,ye.w*L.transmissionResolutionScale);const Ie=L.getRenderTarget();L.setRenderTarget(ve),L.getClearColor(de),me=L.getClearAlpha(),me<1&&L.setClearColor(16777215,.5),L.clear(),Dt&&ke.render(Q);const Ne=L.toneMapping;L.toneMapping=Ti;const et=ee.viewport;if(ee.viewport!==void 0&&(ee.viewport=void 0),m.setupLightsView(ee),Me===!0&&_e.setGlobalState(L.clippingPlanes,ee),ji(A,Q,ee),D.updateMultisampleRenderTarget(ve),D.updateRenderTargetMipmap(ve),ft.has("WEBGL_multisampled_render_to_texture")===!1){let Je=!1;for(let Xe=0,_t=G.length;Xe<_t;Xe++){const St=G[Xe],Gt=St.object,dt=St.geometry,ut=St.material,We=St.group;if(ut.side===Wn&&Gt.layers.test(ee.layers)){const jt=ut.side;ut.side=vn,ut.needsUpdate=!0,Rr(Gt,Q,ee,dt,ut,We),ut.side=jt,ut.needsUpdate=!0,Je=!0}}Je===!0&&(D.updateMultisampleRenderTarget(ve),D.updateRenderTargetMipmap(ve))}L.setRenderTarget(Ie),L.setClearColor(de,me),et!==void 0&&(ee.viewport=et),L.toneMapping=Ne}function ji(A,G,Q){const ee=G.isScene===!0?G.overrideMaterial:null;for(let W=0,ve=A.length;W<ve;W++){const ye=A[W],Ie=ye.object,Ne=ye.geometry,et=ye.group;let Je=ye.material;Je.allowOverride===!0&&ee!==null&&(Je=ee),Ie.layers.test(Q.layers)&&Rr(Ie,G,Q,Ne,Je,et)}}function Rr(A,G,Q,ee,W,ve){A.onBeforeRender(L,G,Q,ee,W,ve),A.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),W.onBeforeRender(L,G,Q,ee,A,ve),W.transparent===!0&&W.side===Wn&&W.forceSinglePass===!1?(W.side=vn,W.needsUpdate=!0,L.renderBufferDirect(Q,G,ee,W,A,ve),W.side=bi,W.needsUpdate=!0,L.renderBufferDirect(Q,G,ee,W,A,ve),W.side=Wn):L.renderBufferDirect(Q,G,ee,W,A,ve),A.onAfterRender(L,G,Q,ee,W,ve)}function $i(A,G,Q){G.isScene!==!0&&(G=Vt);const ee=Ge.get(A),W=m.state.lights,ve=m.state.shadowsArray,ye=W.state.version,Ie=ze.getParameters(A,W.state,ve,G,Q),Ne=ze.getProgramCacheKey(Ie);let et=ee.programs;ee.environment=A.isMeshStandardMaterial?G.environment:null,ee.fog=G.fog,ee.envMap=(A.isMeshStandardMaterial?K:b).get(A.envMap||ee.environment),ee.envMapRotation=ee.environment!==null&&A.envMap===null?G.environmentRotation:A.envMapRotation,et===void 0&&(A.addEventListener("dispose",qe),et=new Map,ee.programs=et);let Je=et.get(Ne);if(Je!==void 0){if(ee.currentProgram===Je&&ee.lightsStateVersion===ye)return Pr(A,Ie),Je}else Ie.uniforms=ze.getUniforms(A),A.onBeforeCompile(Ie,L),Je=ze.acquireProgram(Ie,Ne),et.set(Ne,Je),ee.uniforms=Ie.uniforms;const Xe=ee.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Xe.clippingPlanes=_e.uniform),Pr(A,Ie),ee.needsLights=ls(A),ee.lightsStateVersion=ye,ee.needsLights&&(Xe.ambientLightColor.value=W.state.ambient,Xe.lightProbe.value=W.state.probe,Xe.directionalLights.value=W.state.directional,Xe.directionalLightShadows.value=W.state.directionalShadow,Xe.spotLights.value=W.state.spot,Xe.spotLightShadows.value=W.state.spotShadow,Xe.rectAreaLights.value=W.state.rectArea,Xe.ltc_1.value=W.state.rectAreaLTC1,Xe.ltc_2.value=W.state.rectAreaLTC2,Xe.pointLights.value=W.state.point,Xe.pointLightShadows.value=W.state.pointShadow,Xe.hemisphereLights.value=W.state.hemi,Xe.directionalShadowMap.value=W.state.directionalShadowMap,Xe.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Xe.spotShadowMap.value=W.state.spotShadowMap,Xe.spotLightMatrix.value=W.state.spotLightMatrix,Xe.spotLightMap.value=W.state.spotLightMap,Xe.pointShadowMap.value=W.state.pointShadowMap,Xe.pointShadowMatrix.value=W.state.pointShadowMatrix),ee.currentProgram=Je,ee.uniformsList=null,Je}function os(A){if(A.uniformsList===null){const G=A.currentProgram.getUniforms();A.uniformsList=ks.seqWithValue(G.seq,A.uniforms)}return A.uniformsList}function Pr(A,G){const Q=Ge.get(A);Q.outputColorSpace=G.outputColorSpace,Q.batching=G.batching,Q.batchingColor=G.batchingColor,Q.instancing=G.instancing,Q.instancingColor=G.instancingColor,Q.instancingMorph=G.instancingMorph,Q.skinning=G.skinning,Q.morphTargets=G.morphTargets,Q.morphNormals=G.morphNormals,Q.morphColors=G.morphColors,Q.morphTargetsCount=G.morphTargetsCount,Q.numClippingPlanes=G.numClippingPlanes,Q.numIntersection=G.numClipIntersection,Q.vertexAlphas=G.vertexAlphas,Q.vertexTangents=G.vertexTangents,Q.toneMapping=G.toneMapping}function $s(A,G,Q,ee,W){G.isScene!==!0&&(G=Vt),D.resetTextureUnits();const ve=G.fog,ye=ee.isMeshStandardMaterial?G.environment:null,Ie=Y===null?L.outputColorSpace:Y.isXRRenderTarget===!0?Y.texture.colorSpace:yr,Ne=(ee.isMeshStandardMaterial?K:b).get(ee.envMap||ye),et=ee.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,Je=!!Q.attributes.tangent&&(!!ee.normalMap||ee.anisotropy>0),Xe=!!Q.morphAttributes.position,_t=!!Q.morphAttributes.normal,St=!!Q.morphAttributes.color;let Gt=Ti;ee.toneMapped&&(Y===null||Y.isXRRenderTarget===!0)&&(Gt=L.toneMapping);const dt=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,ut=dt!==void 0?dt.length:0,We=Ge.get(ee),jt=m.state.lights;if(Me===!0&&(Oe===!0||A!==C)){const en=A===C&&ee.id===R;_e.setState(ee,A,en)}let bt=!1;ee.version===We.__version?(We.needsLights&&We.lightsStateVersion!==jt.state.version||We.outputColorSpace!==Ie||W.isBatchedMesh&&We.batching===!1||!W.isBatchedMesh&&We.batching===!0||W.isBatchedMesh&&We.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&We.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&We.instancing===!1||!W.isInstancedMesh&&We.instancing===!0||W.isSkinnedMesh&&We.skinning===!1||!W.isSkinnedMesh&&We.skinning===!0||W.isInstancedMesh&&We.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&We.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&We.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&We.instancingMorph===!1&&W.morphTexture!==null||We.envMap!==Ne||ee.fog===!0&&We.fog!==ve||We.numClippingPlanes!==void 0&&(We.numClippingPlanes!==_e.numPlanes||We.numIntersection!==_e.numIntersection)||We.vertexAlphas!==et||We.vertexTangents!==Je||We.morphTargets!==Xe||We.morphNormals!==_t||We.morphColors!==St||We.toneMapping!==Gt||We.morphTargetsCount!==ut)&&(bt=!0):(bt=!0,We.__version=ee.version);let cn=We.currentProgram;bt===!0&&(cn=$i(ee,G,W));let Zn=!1,Qt=!1,hi=!1;const Bt=cn.getUniforms(),gn=We.uniforms;if(Fe.useProgram(cn.program)&&(Zn=!0,Qt=!0,hi=!0),ee.id!==R&&(R=ee.id,Qt=!0),Zn||C!==A){Fe.buffers.depth.getReversed()?(be.copy(A.projectionMatrix),Af(be),wf(be),Bt.setValue(F,"projectionMatrix",be)):Bt.setValue(F,"projectionMatrix",A.projectionMatrix),Bt.setValue(F,"viewMatrix",A.matrixWorldInverse);const qt=Bt.map.cameraPosition;qt!==void 0&&qt.setValue(F,Mt.setFromMatrixPosition(A.matrixWorld)),ct.logarithmicDepthBuffer&&Bt.setValue(F,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(ee.isMeshPhongMaterial||ee.isMeshToonMaterial||ee.isMeshLambertMaterial||ee.isMeshBasicMaterial||ee.isMeshStandardMaterial||ee.isShaderMaterial)&&Bt.setValue(F,"isOrthographic",A.isOrthographicCamera===!0),C!==A&&(C=A,Qt=!0,hi=!0)}if(W.isSkinnedMesh){Bt.setOptional(F,W,"bindMatrix"),Bt.setOptional(F,W,"bindMatrixInverse");const en=W.skeleton;en&&(en.boneTexture===null&&en.computeBoneTexture(),Bt.setValue(F,"boneTexture",en.boneTexture,D))}W.isBatchedMesh&&(Bt.setOptional(F,W,"batchingTexture"),Bt.setValue(F,"batchingTexture",W._matricesTexture,D),Bt.setOptional(F,W,"batchingIdTexture"),Bt.setValue(F,"batchingIdTexture",W._indirectTexture,D),Bt.setOptional(F,W,"batchingColorTexture"),W._colorsTexture!==null&&Bt.setValue(F,"batchingColorTexture",W._colorsTexture,D));const Ht=Q.morphAttributes;if((Ht.position!==void 0||Ht.normal!==void 0||Ht.color!==void 0)&&Ye.update(W,Q,cn),(Qt||We.receiveShadow!==W.receiveShadow)&&(We.receiveShadow=W.receiveShadow,Bt.setValue(F,"receiveShadow",W.receiveShadow)),ee.isMeshGouraudMaterial&&ee.envMap!==null&&(gn.envMap.value=Ne,gn.flipEnvMap.value=Ne.isCubeTexture&&Ne.isRenderTargetTexture===!1?-1:1),ee.isMeshStandardMaterial&&ee.envMap===null&&G.environment!==null&&(gn.envMapIntensity.value=G.environmentIntensity),Qt&&(Bt.setValue(F,"toneMappingExposure",L.toneMappingExposure),We.needsLights&&fi(gn,hi),ve&&ee.fog===!0&&Ae.refreshFogUniforms(gn,ve),Ae.refreshMaterialUniforms(gn,ee,se,pe,m.state.transmissionRenderTarget[A.id]),ks.upload(F,os(We),gn,D)),ee.isShaderMaterial&&ee.uniformsNeedUpdate===!0&&(ks.upload(F,os(We),gn,D),ee.uniformsNeedUpdate=!1),ee.isSpriteMaterial&&Bt.setValue(F,"center",W.center),Bt.setValue(F,"modelViewMatrix",W.modelViewMatrix),Bt.setValue(F,"normalMatrix",W.normalMatrix),Bt.setValue(F,"modelMatrix",W.matrixWorld),ee.isShaderMaterial||ee.isRawShaderMaterial){const en=ee.uniformsGroups;for(let qt=0,Ur=en.length;qt<Ur;qt++){const Jn=en[qt];k.update(Jn,cn),k.bind(Jn,cn)}}return cn}function fi(A,G){A.ambientLightColor.needsUpdate=G,A.lightProbe.needsUpdate=G,A.directionalLights.needsUpdate=G,A.directionalLightShadows.needsUpdate=G,A.pointLights.needsUpdate=G,A.pointLightShadows.needsUpdate=G,A.spotLights.needsUpdate=G,A.spotLightShadows.needsUpdate=G,A.rectAreaLights.needsUpdate=G,A.hemisphereLights.needsUpdate=G}function ls(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return V},this.getActiveMipmapLevel=function(){return l},this.getRenderTarget=function(){return Y},this.setRenderTargetTextures=function(A,G,Q){const ee=Ge.get(A);ee.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,ee.__autoAllocateDepthBuffer===!1&&(ee.__useRenderToTexture=!1),Ge.get(A.texture).__webglTexture=G,Ge.get(A.depthTexture).__webglTexture=ee.__autoAllocateDepthBuffer?void 0:Q,ee.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,G){const Q=Ge.get(A);Q.__webglFramebuffer=G,Q.__useDefaultFramebuffer=G===void 0};const Dr=F.createFramebuffer();this.setRenderTarget=function(A,G=0,Q=0){Y=A,V=G,l=Q;let ee=!0,W=null,ve=!1,ye=!1;if(A){const Ne=Ge.get(A);if(Ne.__useDefaultFramebuffer!==void 0)Fe.bindFramebuffer(F.FRAMEBUFFER,null),ee=!1;else if(Ne.__webglFramebuffer===void 0)D.setupRenderTarget(A);else if(Ne.__hasExternalTextures)D.rebindTextures(A,Ge.get(A.texture).__webglTexture,Ge.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Xe=A.depthTexture;if(Ne.__boundDepthTexture!==Xe){if(Xe!==null&&Ge.has(Xe)&&(A.width!==Xe.image.width||A.height!==Xe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");D.setupDepthRenderbuffer(A)}}const et=A.texture;(et.isData3DTexture||et.isDataArrayTexture||et.isCompressedArrayTexture)&&(ye=!0);const Je=Ge.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Je[G])?W=Je[G][Q]:W=Je[G],ve=!0):A.samples>0&&D.useMultisampledRTT(A)===!1?W=Ge.get(A).__webglMultisampledFramebuffer:Array.isArray(Je)?W=Je[Q]:W=Je,z.copy(A.viewport),ue.copy(A.scissor),j=A.scissorTest}else z.copy(Ve).multiplyScalar(se).floor(),ue.copy(st).multiplyScalar(se).floor(),j=Rt;if(Q!==0&&(W=Dr),Fe.bindFramebuffer(F.FRAMEBUFFER,W)&&ee&&Fe.drawBuffers(A,W),Fe.viewport(z),Fe.scissor(ue),Fe.setScissorTest(j),ve){const Ne=Ge.get(A.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+G,Ne.__webglTexture,Q)}else if(ye){const Ne=Ge.get(A.texture),et=G;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ne.__webglTexture,Q,et)}else if(A!==null&&Q!==0){const Ne=Ge.get(A.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Ne.__webglTexture,Q)}R=-1},this.readRenderTargetPixels=function(A,G,Q,ee,W,ve,ye){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ie=Ge.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&ye!==void 0&&(Ie=Ie[ye]),Ie){Fe.bindFramebuffer(F.FRAMEBUFFER,Ie);try{const Ne=A.texture,et=Ne.format,Je=Ne.type;if(!ct.textureFormatReadable(et)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ct.textureTypeReadable(Je)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=A.width-ee&&Q>=0&&Q<=A.height-W&&F.readPixels(G,Q,ee,W,nt.convert(et),nt.convert(Je),ve)}finally{const Ne=Y!==null?Ge.get(Y).__webglFramebuffer:null;Fe.bindFramebuffer(F.FRAMEBUFFER,Ne)}}},this.readRenderTargetPixelsAsync=async function(A,G,Q,ee,W,ve,ye){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ie=Ge.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&ye!==void 0&&(Ie=Ie[ye]),Ie)if(G>=0&&G<=A.width-ee&&Q>=0&&Q<=A.height-W){Fe.bindFramebuffer(F.FRAMEBUFFER,Ie);const Ne=A.texture,et=Ne.format,Je=Ne.type;if(!ct.textureFormatReadable(et))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ct.textureTypeReadable(Je))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Xe=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,Xe),F.bufferData(F.PIXEL_PACK_BUFFER,ve.byteLength,F.STREAM_READ),F.readPixels(G,Q,ee,W,nt.convert(et),nt.convert(Je),0);const _t=Y!==null?Ge.get(Y).__webglFramebuffer:null;Fe.bindFramebuffer(F.FRAMEBUFFER,_t);const St=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await bf(F,St,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,Xe),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,ve),F.deleteBuffer(Xe),F.deleteSync(St),ve}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,G=null,Q=0){const ee=Math.pow(2,-Q),W=Math.floor(A.image.width*ee),ve=Math.floor(A.image.height*ee),ye=G!==null?G.x:0,Ie=G!==null?G.y:0;D.setTexture2D(A,0),F.copyTexSubImage2D(F.TEXTURE_2D,Q,0,0,ye,Ie,W,ve),Fe.unbindTexture()};const Lr=F.createFramebuffer(),Ki=F.createFramebuffer();this.copyTextureToTexture=function(A,G,Q=null,ee=null,W=0,ve=null){ve===null&&(W!==0?(Hs("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ve=W,W=0):ve=0);let ye,Ie,Ne,et,Je,Xe,_t,St,Gt;const dt=A.isCompressedTexture?A.mipmaps[ve]:A.image;if(Q!==null)ye=Q.max.x-Q.min.x,Ie=Q.max.y-Q.min.y,Ne=Q.isBox3?Q.max.z-Q.min.z:1,et=Q.min.x,Je=Q.min.y,Xe=Q.isBox3?Q.min.z:0;else{const Ht=Math.pow(2,-W);ye=Math.floor(dt.width*Ht),Ie=Math.floor(dt.height*Ht),A.isDataArrayTexture?Ne=dt.depth:A.isData3DTexture?Ne=Math.floor(dt.depth*Ht):Ne=1,et=0,Je=0,Xe=0}ee!==null?(_t=ee.x,St=ee.y,Gt=ee.z):(_t=0,St=0,Gt=0);const ut=nt.convert(G.format),We=nt.convert(G.type);let jt;G.isData3DTexture?(D.setTexture3D(G,0),jt=F.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(D.setTexture2DArray(G,0),jt=F.TEXTURE_2D_ARRAY):(D.setTexture2D(G,0),jt=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,G.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,G.unpackAlignment);const bt=F.getParameter(F.UNPACK_ROW_LENGTH),cn=F.getParameter(F.UNPACK_IMAGE_HEIGHT),Zn=F.getParameter(F.UNPACK_SKIP_PIXELS),Qt=F.getParameter(F.UNPACK_SKIP_ROWS),hi=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,dt.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,dt.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,et),F.pixelStorei(F.UNPACK_SKIP_ROWS,Je),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Xe);const Bt=A.isDataArrayTexture||A.isData3DTexture,gn=G.isDataArrayTexture||G.isData3DTexture;if(A.isDepthTexture){const Ht=Ge.get(A),en=Ge.get(G),qt=Ge.get(Ht.__renderTarget),Ur=Ge.get(en.__renderTarget);Fe.bindFramebuffer(F.READ_FRAMEBUFFER,qt.__webglFramebuffer),Fe.bindFramebuffer(F.DRAW_FRAMEBUFFER,Ur.__webglFramebuffer);for(let Jn=0;Jn<Ne;Jn++)Bt&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ge.get(A).__webglTexture,W,Xe+Jn),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ge.get(G).__webglTexture,ve,Gt+Jn)),F.blitFramebuffer(et,Je,ye,Ie,_t,St,ye,Ie,F.DEPTH_BUFFER_BIT,F.NEAREST);Fe.bindFramebuffer(F.READ_FRAMEBUFFER,null),Fe.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(W!==0||A.isRenderTargetTexture||Ge.has(A)){const Ht=Ge.get(A),en=Ge.get(G);Fe.bindFramebuffer(F.READ_FRAMEBUFFER,Lr),Fe.bindFramebuffer(F.DRAW_FRAMEBUFFER,Ki);for(let qt=0;qt<Ne;qt++)Bt?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ht.__webglTexture,W,Xe+qt):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Ht.__webglTexture,W),gn?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,en.__webglTexture,ve,Gt+qt):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,en.__webglTexture,ve),W!==0?F.blitFramebuffer(et,Je,ye,Ie,_t,St,ye,Ie,F.COLOR_BUFFER_BIT,F.NEAREST):gn?F.copyTexSubImage3D(jt,ve,_t,St,Gt+qt,et,Je,ye,Ie):F.copyTexSubImage2D(jt,ve,_t,St,et,Je,ye,Ie);Fe.bindFramebuffer(F.READ_FRAMEBUFFER,null),Fe.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else gn?A.isDataTexture||A.isData3DTexture?F.texSubImage3D(jt,ve,_t,St,Gt,ye,Ie,Ne,ut,We,dt.data):G.isCompressedArrayTexture?F.compressedTexSubImage3D(jt,ve,_t,St,Gt,ye,Ie,Ne,ut,dt.data):F.texSubImage3D(jt,ve,_t,St,Gt,ye,Ie,Ne,ut,We,dt):A.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,ve,_t,St,ye,Ie,ut,We,dt.data):A.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,ve,_t,St,dt.width,dt.height,ut,dt.data):F.texSubImage2D(F.TEXTURE_2D,ve,_t,St,ye,Ie,ut,We,dt);F.pixelStorei(F.UNPACK_ROW_LENGTH,bt),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,cn),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Zn),F.pixelStorei(F.UNPACK_SKIP_ROWS,Qt),F.pixelStorei(F.UNPACK_SKIP_IMAGES,hi),ve===0&&G.generateMipmaps&&F.generateMipmap(jt),Fe.unbindTexture()},this.copyTextureToTexture3D=function(A,G,Q=null,ee=null,W=0){return Hs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,G,Q,ee,W)},this.initRenderTarget=function(A){Ge.get(A).__webglFramebuffer===void 0&&D.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?D.setTextureCube(A,0):A.isData3DTexture?D.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?D.setTexture2DArray(A,0):D.setTexture2D(A,0),Fe.unbindTexture()},this.resetState=function(){V=0,l=0,Y=null,Fe.reset(),Lt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return li}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=At._getDrawingBufferColorSpace(e),t.unpackColorSpace=At._getUnpackColorSpace()}}function Jg(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var Vs={exports:{}};/*!
 * jQuery JavaScript Library v3.7.1
 * https://jquery.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2023-08-28T13:37Z
 */var Qg=Vs.exports,oc;function e_(){return oc||(oc=1,function(i){(function(e,t){i.exports=e.document?t(e,!0):function(n){if(!n.document)throw new Error("jQuery requires a window with a document");return t(n)}})(typeof window<"u"?window:Qg,function(e,t){var n=[],s=Object.getPrototypeOf,a=n.slice,c=n.flat?function(r){return n.flat.call(r)}:function(r){return n.concat.apply([],r)},u=n.push,d=n.indexOf,p={},g=p.toString,_=p.hasOwnProperty,M=_.toString,y=M.call(Object),T={},w=function(o){return typeof o=="function"&&typeof o.nodeType!="number"&&typeof o.item!="function"},S=function(o){return o!=null&&o===o.window},m=e.document,O={type:!0,src:!0,nonce:!0,noModule:!0};function N(r,o,f){f=f||m;var h,v,x=f.createElement("script");if(x.text=r,o)for(h in O)v=o[h]||o.getAttribute&&o.getAttribute(h),v&&x.setAttribute(h,v);f.head.appendChild(x).parentNode.removeChild(x)}function L(r){return r==null?r+"":typeof r=="object"||typeof r=="function"?p[g.call(r)]||"object":typeof r}var q="3.7.1",V=/HTML$/i,l=function(r,o){return new l.fn.init(r,o)};l.fn=l.prototype={jquery:q,constructor:l,length:0,toArray:function(){return a.call(this)},get:function(r){return r==null?a.call(this):r<0?this[r+this.length]:this[r]},pushStack:function(r){var o=l.merge(this.constructor(),r);return o.prevObject=this,o},each:function(r){return l.each(this,r)},map:function(r){return this.pushStack(l.map(this,function(o,f){return r.call(o,f,o)}))},slice:function(){return this.pushStack(a.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},even:function(){return this.pushStack(l.grep(this,function(r,o){return(o+1)%2}))},odd:function(){return this.pushStack(l.grep(this,function(r,o){return o%2}))},eq:function(r){var o=this.length,f=+r+(r<0?o:0);return this.pushStack(f>=0&&f<o?[this[f]]:[])},end:function(){return this.prevObject||this.constructor()},push:u,sort:n.sort,splice:n.splice},l.extend=l.fn.extend=function(){var r,o,f,h,v,x,E=arguments[0]||{},I=1,U=arguments.length,H=!1;for(typeof E=="boolean"&&(H=E,E=arguments[I]||{},I++),typeof E!="object"&&!w(E)&&(E={}),I===U&&(E=this,I--);I<U;I++)if((r=arguments[I])!=null)for(o in r)h=r[o],!(o==="__proto__"||E===h)&&(H&&h&&(l.isPlainObject(h)||(v=Array.isArray(h)))?(f=E[o],v&&!Array.isArray(f)?x=[]:!v&&!l.isPlainObject(f)?x={}:x=f,v=!1,E[o]=l.extend(H,x,h)):h!==void 0&&(E[o]=h));return E},l.extend({expando:"jQuery"+(q+Math.random()).replace(/\D/g,""),isReady:!0,error:function(r){throw new Error(r)},noop:function(){},isPlainObject:function(r){var o,f;return!r||g.call(r)!=="[object Object]"?!1:(o=s(r),o?(f=_.call(o,"constructor")&&o.constructor,typeof f=="function"&&M.call(f)===y):!0)},isEmptyObject:function(r){var o;for(o in r)return!1;return!0},globalEval:function(r,o,f){N(r,{nonce:o&&o.nonce},f)},each:function(r,o){var f,h=0;if(Y(r))for(f=r.length;h<f&&o.call(r[h],h,r[h])!==!1;h++);else for(h in r)if(o.call(r[h],h,r[h])===!1)break;return r},text:function(r){var o,f="",h=0,v=r.nodeType;if(!v)for(;o=r[h++];)f+=l.text(o);return v===1||v===11?r.textContent:v===9?r.documentElement.textContent:v===3||v===4?r.nodeValue:f},makeArray:function(r,o){var f=o||[];return r!=null&&(Y(Object(r))?l.merge(f,typeof r=="string"?[r]:r):u.call(f,r)),f},inArray:function(r,o,f){return o==null?-1:d.call(o,r,f)},isXMLDoc:function(r){var o=r&&r.namespaceURI,f=r&&(r.ownerDocument||r).documentElement;return!V.test(o||f&&f.nodeName||"HTML")},merge:function(r,o){for(var f=+o.length,h=0,v=r.length;h<f;h++)r[v++]=o[h];return r.length=v,r},grep:function(r,o,f){for(var h,v=[],x=0,E=r.length,I=!f;x<E;x++)h=!o(r[x],x),h!==I&&v.push(r[x]);return v},map:function(r,o,f){var h,v,x=0,E=[];if(Y(r))for(h=r.length;x<h;x++)v=o(r[x],x,f),v!=null&&E.push(v);else for(x in r)v=o(r[x],x,f),v!=null&&E.push(v);return c(E)},guid:1,support:T}),typeof Symbol=="function"&&(l.fn[Symbol.iterator]=n[Symbol.iterator]),l.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(r,o){p["[object "+o+"]"]=o.toLowerCase()});function Y(r){var o=!!r&&"length"in r&&r.length,f=L(r);return w(r)||S(r)?!1:f==="array"||o===0||typeof o=="number"&&o>0&&o-1 in r}function R(r,o){return r.nodeName&&r.nodeName.toLowerCase()===o.toLowerCase()}var C=n.pop,z=n.sort,ue=n.splice,j="[\\x20\\t\\r\\n\\f]",de=new RegExp("^"+j+"+|((?:^|[^\\\\])(?:\\\\.)*)"+j+"+$","g");l.contains=function(r,o){var f=o&&o.parentNode;return r===f||!!(f&&f.nodeType===1&&(r.contains?r.contains(f):r.compareDocumentPosition&&r.compareDocumentPosition(f)&16))};var me=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;function he(r,o){return o?r==="\0"?"�":r.slice(0,-1)+"\\"+r.charCodeAt(r.length-1).toString(16)+" ":"\\"+r}l.escapeSelector=function(r){return(r+"").replace(me,he)};var pe=m,se=u;(function(){var r,o,f,h,v,x=se,E,I,U,H,ne,oe=l.expando,J=0,ge=0,tt=cs(),yt=cs(),at=cs(),rn=cs(),$t=function(P,B){return P===B&&(v=!0),0},Bn="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",zn="(?:\\\\[\\da-fA-F]{1,6}"+j+"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",vt="\\["+j+"*("+zn+")(?:"+j+"*([*^$|!~]?=)"+j+`*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"|(`+zn+"))|)"+j+"*\\]",Pi=":("+zn+`)(?:\\((('((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|`+vt+")*)|.*)\\)|)",Tt=new RegExp(j+"+","g"),Wt=new RegExp("^"+j+"*,"+j+"*"),Fr=new RegExp("^"+j+"*([>+~]|"+j+")"+j+"*"),ia=new RegExp(j+"|>"),Hn=new RegExp(Pi),Or=new RegExp("^"+zn+"$"),kn={ID:new RegExp("^#("+zn+")"),CLASS:new RegExp("^\\.("+zn+")"),TAG:new RegExp("^("+zn+"|[*])"),ATTR:new RegExp("^"+vt),PSEUDO:new RegExp("^"+Pi),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+j+"*(even|odd|(([+-]|)(\\d*)n|)"+j+"*(?:([+-]|)"+j+"*(\\d+)|))"+j+"*\\)|)","i"),bool:new RegExp("^(?:"+Bn+")$","i"),needsContext:new RegExp("^"+j+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+j+"*((?:-\\d)?\\d*)"+j+"*\\)|)(?=[^-]|$)","i")},di=/^(?:input|select|textarea|button)$/i,pi=/^h\d$/i,bn=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,ra=/[+~]/,Qn=new RegExp("\\\\[\\da-fA-F]{1,6}"+j+"?|\\\\([^\\r\\n\\f])","g"),ei=function(P,B){var $="0x"+P.slice(1)-65536;return B||($<0?String.fromCharCode($+65536):String.fromCharCode($>>10|55296,$&1023|56320))},du=function(){mi()},pu=fs(function(P){return P.disabled===!0&&R(P,"fieldset")},{dir:"parentNode",next:"legend"});function mu(){try{return E.activeElement}catch{}}try{x.apply(n=a.call(pe.childNodes),pe.childNodes),n[pe.childNodes.length].nodeType}catch{x={apply:function(B,$){se.apply(B,a.call($))},call:function(B){se.apply(B,a.call(arguments,1))}}}function Ut(P,B,$,te){var ae,xe,Re,Be,Pe,pt,Qe,it=B&&B.ownerDocument,mt=B?B.nodeType:9;if($=$||[],typeof P!="string"||!P||mt!==1&&mt!==9&&mt!==11)return $;if(!te&&(mi(B),B=B||E,U)){if(mt!==11&&(Pe=bn.exec(P)))if(ae=Pe[1]){if(mt===9)if(Re=B.getElementById(ae)){if(Re.id===ae)return x.call($,Re),$}else return $;else if(it&&(Re=it.getElementById(ae))&&Ut.contains(B,Re)&&Re.id===ae)return x.call($,Re),$}else{if(Pe[2])return x.apply($,B.getElementsByTagName(P)),$;if((ae=Pe[3])&&B.getElementsByClassName)return x.apply($,B.getElementsByClassName(ae)),$}if(!rn[P+" "]&&(!H||!H.test(P))){if(Qe=P,it=B,mt===1&&(ia.test(P)||Fr.test(P))){for(it=ra.test(P)&&sa(B.parentNode)||B,(it!=B||!T.scope)&&((Be=B.getAttribute("id"))?Be=l.escapeSelector(Be):B.setAttribute("id",Be=oe)),pt=Br(P),xe=pt.length;xe--;)pt[xe]=(Be?"#"+Be:":scope")+" "+us(pt[xe]);Qe=pt.join(",")}try{return x.apply($,it.querySelectorAll(Qe)),$}catch{rn(P,!0)}finally{Be===oe&&B.removeAttribute("id")}}}return rl(P.replace(de,"$1"),B,$,te)}function cs(){var P=[];function B($,te){return P.push($+" ")>o.cacheLength&&delete B[P.shift()],B[$+" "]=te}return B}function Dn(P){return P[oe]=!0,P}function Zi(P){var B=E.createElement("fieldset");try{return!!P(B)}catch{return!1}finally{B.parentNode&&B.parentNode.removeChild(B),B=null}}function gu(P){return function(B){return R(B,"input")&&B.type===P}}function _u(P){return function(B){return(R(B,"input")||R(B,"button"))&&B.type===P}}function nl(P){return function(B){return"form"in B?B.parentNode&&B.disabled===!1?"label"in B?"label"in B.parentNode?B.parentNode.disabled===P:B.disabled===P:B.isDisabled===P||B.isDisabled!==!P&&pu(B)===P:B.disabled===P:"label"in B?B.disabled===P:!1}}function Di(P){return Dn(function(B){return B=+B,Dn(function($,te){for(var ae,xe=P([],$.length,B),Re=xe.length;Re--;)$[ae=xe[Re]]&&($[ae]=!(te[ae]=$[ae]))})})}function sa(P){return P&&typeof P.getElementsByTagName<"u"&&P}function mi(P){var B,$=P?P.ownerDocument||P:pe;return $==E||$.nodeType!==9||!$.documentElement||(E=$,I=E.documentElement,U=!l.isXMLDoc(E),ne=I.matches||I.webkitMatchesSelector||I.msMatchesSelector,I.msMatchesSelector&&pe!=E&&(B=E.defaultView)&&B.top!==B&&B.addEventListener("unload",du),T.getById=Zi(function(te){return I.appendChild(te).id=l.expando,!E.getElementsByName||!E.getElementsByName(l.expando).length}),T.disconnectedMatch=Zi(function(te){return ne.call(te,"*")}),T.scope=Zi(function(){return E.querySelectorAll(":scope")}),T.cssHas=Zi(function(){try{return E.querySelector(":has(*,:jqfake)"),!1}catch{return!0}}),T.getById?(o.filter.ID=function(te){var ae=te.replace(Qn,ei);return function(xe){return xe.getAttribute("id")===ae}},o.find.ID=function(te,ae){if(typeof ae.getElementById<"u"&&U){var xe=ae.getElementById(te);return xe?[xe]:[]}}):(o.filter.ID=function(te){var ae=te.replace(Qn,ei);return function(xe){var Re=typeof xe.getAttributeNode<"u"&&xe.getAttributeNode("id");return Re&&Re.value===ae}},o.find.ID=function(te,ae){if(typeof ae.getElementById<"u"&&U){var xe,Re,Be,Pe=ae.getElementById(te);if(Pe){if(xe=Pe.getAttributeNode("id"),xe&&xe.value===te)return[Pe];for(Be=ae.getElementsByName(te),Re=0;Pe=Be[Re++];)if(xe=Pe.getAttributeNode("id"),xe&&xe.value===te)return[Pe]}return[]}}),o.find.TAG=function(te,ae){return typeof ae.getElementsByTagName<"u"?ae.getElementsByTagName(te):ae.querySelectorAll(te)},o.find.CLASS=function(te,ae){if(typeof ae.getElementsByClassName<"u"&&U)return ae.getElementsByClassName(te)},H=[],Zi(function(te){var ae;I.appendChild(te).innerHTML="<a id='"+oe+"' href='' disabled='disabled'></a><select id='"+oe+"-\r\\' disabled='disabled'><option selected=''></option></select>",te.querySelectorAll("[selected]").length||H.push("\\["+j+"*(?:value|"+Bn+")"),te.querySelectorAll("[id~="+oe+"-]").length||H.push("~="),te.querySelectorAll("a#"+oe+"+*").length||H.push(".#.+[+~]"),te.querySelectorAll(":checked").length||H.push(":checked"),ae=E.createElement("input"),ae.setAttribute("type","hidden"),te.appendChild(ae).setAttribute("name","D"),I.appendChild(te).disabled=!0,te.querySelectorAll(":disabled").length!==2&&H.push(":enabled",":disabled"),ae=E.createElement("input"),ae.setAttribute("name",""),te.appendChild(ae),te.querySelectorAll("[name='']").length||H.push("\\["+j+"*name"+j+"*="+j+`*(?:''|"")`)}),T.cssHas||H.push(":has"),H=H.length&&new RegExp(H.join("|")),$t=function(te,ae){if(te===ae)return v=!0,0;var xe=!te.compareDocumentPosition-!ae.compareDocumentPosition;return xe||(xe=(te.ownerDocument||te)==(ae.ownerDocument||ae)?te.compareDocumentPosition(ae):1,xe&1||!T.sortDetached&&ae.compareDocumentPosition(te)===xe?te===E||te.ownerDocument==pe&&Ut.contains(pe,te)?-1:ae===E||ae.ownerDocument==pe&&Ut.contains(pe,ae)?1:h?d.call(h,te)-d.call(h,ae):0:xe&4?-1:1)}),E}Ut.matches=function(P,B){return Ut(P,null,null,B)},Ut.matchesSelector=function(P,B){if(mi(P),U&&!rn[B+" "]&&(!H||!H.test(B)))try{var $=ne.call(P,B);if($||T.disconnectedMatch||P.document&&P.document.nodeType!==11)return $}catch{rn(B,!0)}return Ut(B,E,null,[P]).length>0},Ut.contains=function(P,B){return(P.ownerDocument||P)!=E&&mi(P),l.contains(P,B)},Ut.attr=function(P,B){(P.ownerDocument||P)!=E&&mi(P);var $=o.attrHandle[B.toLowerCase()],te=$&&_.call(o.attrHandle,B.toLowerCase())?$(P,B,!U):void 0;return te!==void 0?te:P.getAttribute(B)},Ut.error=function(P){throw new Error("Syntax error, unrecognized expression: "+P)},l.uniqueSort=function(P){var B,$=[],te=0,ae=0;if(v=!T.sortStable,h=!T.sortStable&&a.call(P,0),z.call(P,$t),v){for(;B=P[ae++];)B===P[ae]&&(te=$.push(ae));for(;te--;)ue.call(P,$[te],1)}return h=null,P},l.fn.uniqueSort=function(){return this.pushStack(l.uniqueSort(a.apply(this)))},o=l.expr={cacheLength:50,createPseudo:Dn,match:kn,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(P){return P[1]=P[1].replace(Qn,ei),P[3]=(P[3]||P[4]||P[5]||"").replace(Qn,ei),P[2]==="~="&&(P[3]=" "+P[3]+" "),P.slice(0,4)},CHILD:function(P){return P[1]=P[1].toLowerCase(),P[1].slice(0,3)==="nth"?(P[3]||Ut.error(P[0]),P[4]=+(P[4]?P[5]+(P[6]||1):2*(P[3]==="even"||P[3]==="odd")),P[5]=+(P[7]+P[8]||P[3]==="odd")):P[3]&&Ut.error(P[0]),P},PSEUDO:function(P){var B,$=!P[6]&&P[2];return kn.CHILD.test(P[0])?null:(P[3]?P[2]=P[4]||P[5]||"":$&&Hn.test($)&&(B=Br($,!0))&&(B=$.indexOf(")",$.length-B)-$.length)&&(P[0]=P[0].slice(0,B),P[2]=$.slice(0,B)),P.slice(0,3))}},filter:{TAG:function(P){var B=P.replace(Qn,ei).toLowerCase();return P==="*"?function(){return!0}:function($){return R($,B)}},CLASS:function(P){var B=tt[P+" "];return B||(B=new RegExp("(^|"+j+")"+P+"("+j+"|$)"))&&tt(P,function($){return B.test(typeof $.className=="string"&&$.className||typeof $.getAttribute<"u"&&$.getAttribute("class")||"")})},ATTR:function(P,B,$){return function(te){var ae=Ut.attr(te,P);return ae==null?B==="!=":B?(ae+="",B==="="?ae===$:B==="!="?ae!==$:B==="^="?$&&ae.indexOf($)===0:B==="*="?$&&ae.indexOf($)>-1:B==="$="?$&&ae.slice(-$.length)===$:B==="~="?(" "+ae.replace(Tt," ")+" ").indexOf($)>-1:B==="|="?ae===$||ae.slice(0,$.length+1)===$+"-":!1):!0}},CHILD:function(P,B,$,te,ae){var xe=P.slice(0,3)!=="nth",Re=P.slice(-4)!=="last",Be=B==="of-type";return te===1&&ae===0?function(Pe){return!!Pe.parentNode}:function(Pe,pt,Qe){var it,mt,je,zt,_n,sn=xe!==Re?"nextSibling":"previousSibling",An=Pe.parentNode,Vn=Be&&Pe.nodeName.toLowerCase(),Ji=!Qe&&!Be,un=!1;if(An){if(xe){for(;sn;){for(je=Pe;je=je[sn];)if(Be?R(je,Vn):je.nodeType===1)return!1;_n=sn=P==="only"&&!_n&&"nextSibling"}return!0}if(_n=[Re?An.firstChild:An.lastChild],Re&&Ji){for(mt=An[oe]||(An[oe]={}),it=mt[P]||[],zt=it[0]===J&&it[1],un=zt&&it[2],je=zt&&An.childNodes[zt];je=++zt&&je&&je[sn]||(un=zt=0)||_n.pop();)if(je.nodeType===1&&++un&&je===Pe){mt[P]=[J,zt,un];break}}else if(Ji&&(mt=Pe[oe]||(Pe[oe]={}),it=mt[P]||[],zt=it[0]===J&&it[1],un=zt),un===!1)for(;(je=++zt&&je&&je[sn]||(un=zt=0)||_n.pop())&&!((Be?R(je,Vn):je.nodeType===1)&&++un&&(Ji&&(mt=je[oe]||(je[oe]={}),mt[P]=[J,un]),je===Pe)););return un-=ae,un===te||un%te===0&&un/te>=0}}},PSEUDO:function(P,B){var $,te=o.pseudos[P]||o.setFilters[P.toLowerCase()]||Ut.error("unsupported pseudo: "+P);return te[oe]?te(B):te.length>1?($=[P,P,"",B],o.setFilters.hasOwnProperty(P.toLowerCase())?Dn(function(ae,xe){for(var Re,Be=te(ae,B),Pe=Be.length;Pe--;)Re=d.call(ae,Be[Pe]),ae[Re]=!(xe[Re]=Be[Pe])}):function(ae){return te(ae,0,$)}):te}},pseudos:{not:Dn(function(P){var B=[],$=[],te=ca(P.replace(de,"$1"));return te[oe]?Dn(function(ae,xe,Re,Be){for(var Pe,pt=te(ae,null,Be,[]),Qe=ae.length;Qe--;)(Pe=pt[Qe])&&(ae[Qe]=!(xe[Qe]=Pe))}):function(ae,xe,Re){return B[0]=ae,te(B,null,Re,$),B[0]=null,!$.pop()}}),has:Dn(function(P){return function(B){return Ut(P,B).length>0}}),contains:Dn(function(P){return P=P.replace(Qn,ei),function(B){return(B.textContent||l.text(B)).indexOf(P)>-1}}),lang:Dn(function(P){return Or.test(P||"")||Ut.error("unsupported lang: "+P),P=P.replace(Qn,ei).toLowerCase(),function(B){var $;do if($=U?B.lang:B.getAttribute("xml:lang")||B.getAttribute("lang"))return $=$.toLowerCase(),$===P||$.indexOf(P+"-")===0;while((B=B.parentNode)&&B.nodeType===1);return!1}}),target:function(P){var B=e.location&&e.location.hash;return B&&B.slice(1)===P.id},root:function(P){return P===I},focus:function(P){return P===mu()&&E.hasFocus()&&!!(P.type||P.href||~P.tabIndex)},enabled:nl(!1),disabled:nl(!0),checked:function(P){return R(P,"input")&&!!P.checked||R(P,"option")&&!!P.selected},selected:function(P){return P.parentNode&&P.parentNode.selectedIndex,P.selected===!0},empty:function(P){for(P=P.firstChild;P;P=P.nextSibling)if(P.nodeType<6)return!1;return!0},parent:function(P){return!o.pseudos.empty(P)},header:function(P){return pi.test(P.nodeName)},input:function(P){return di.test(P.nodeName)},button:function(P){return R(P,"input")&&P.type==="button"||R(P,"button")},text:function(P){var B;return R(P,"input")&&P.type==="text"&&((B=P.getAttribute("type"))==null||B.toLowerCase()==="text")},first:Di(function(){return[0]}),last:Di(function(P,B){return[B-1]}),eq:Di(function(P,B,$){return[$<0?$+B:$]}),even:Di(function(P,B){for(var $=0;$<B;$+=2)P.push($);return P}),odd:Di(function(P,B){for(var $=1;$<B;$+=2)P.push($);return P}),lt:Di(function(P,B,$){var te;for($<0?te=$+B:$>B?te=B:te=$;--te>=0;)P.push(te);return P}),gt:Di(function(P,B,$){for(var te=$<0?$+B:$;++te<B;)P.push(te);return P})}},o.pseudos.nth=o.pseudos.eq;for(r in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})o.pseudos[r]=gu(r);for(r in{submit:!0,reset:!0})o.pseudos[r]=_u(r);function il(){}il.prototype=o.filters=o.pseudos,o.setFilters=new il;function Br(P,B){var $,te,ae,xe,Re,Be,Pe,pt=yt[P+" "];if(pt)return B?0:pt.slice(0);for(Re=P,Be=[],Pe=o.preFilter;Re;){(!$||(te=Wt.exec(Re)))&&(te&&(Re=Re.slice(te[0].length)||Re),Be.push(ae=[])),$=!1,(te=Fr.exec(Re))&&($=te.shift(),ae.push({value:$,type:te[0].replace(de," ")}),Re=Re.slice($.length));for(xe in o.filter)(te=kn[xe].exec(Re))&&(!Pe[xe]||(te=Pe[xe](te)))&&($=te.shift(),ae.push({value:$,type:xe,matches:te}),Re=Re.slice($.length));if(!$)break}return B?Re.length:Re?Ut.error(P):yt(P,Be).slice(0)}function us(P){for(var B=0,$=P.length,te="";B<$;B++)te+=P[B].value;return te}function fs(P,B,$){var te=B.dir,ae=B.next,xe=ae||te,Re=$&&xe==="parentNode",Be=ge++;return B.first?function(Pe,pt,Qe){for(;Pe=Pe[te];)if(Pe.nodeType===1||Re)return P(Pe,pt,Qe);return!1}:function(Pe,pt,Qe){var it,mt,je=[J,Be];if(Qe){for(;Pe=Pe[te];)if((Pe.nodeType===1||Re)&&P(Pe,pt,Qe))return!0}else for(;Pe=Pe[te];)if(Pe.nodeType===1||Re)if(mt=Pe[oe]||(Pe[oe]={}),ae&&R(Pe,ae))Pe=Pe[te]||Pe;else{if((it=mt[xe])&&it[0]===J&&it[1]===Be)return je[2]=it[2];if(mt[xe]=je,je[2]=P(Pe,pt,Qe))return!0}return!1}}function aa(P){return P.length>1?function(B,$,te){for(var ae=P.length;ae--;)if(!P[ae](B,$,te))return!1;return!0}:P[0]}function vu(P,B,$){for(var te=0,ae=B.length;te<ae;te++)Ut(P,B[te],$);return $}function hs(P,B,$,te,ae){for(var xe,Re=[],Be=0,Pe=P.length,pt=B!=null;Be<Pe;Be++)(xe=P[Be])&&(!$||$(xe,te,ae))&&(Re.push(xe),pt&&B.push(Be));return Re}function oa(P,B,$,te,ae,xe){return te&&!te[oe]&&(te=oa(te)),ae&&!ae[oe]&&(ae=oa(ae,xe)),Dn(function(Re,Be,Pe,pt){var Qe,it,mt,je,zt=[],_n=[],sn=Be.length,An=Re||vu(B||"*",Pe.nodeType?[Pe]:Pe,[]),Vn=P&&(Re||!B)?hs(An,zt,P,Pe,pt):An;if($?(je=ae||(Re?P:sn||te)?[]:Be,$(Vn,je,Pe,pt)):je=Vn,te)for(Qe=hs(je,_n),te(Qe,[],Pe,pt),it=Qe.length;it--;)(mt=Qe[it])&&(je[_n[it]]=!(Vn[_n[it]]=mt));if(Re){if(ae||P){if(ae){for(Qe=[],it=je.length;it--;)(mt=je[it])&&Qe.push(Vn[it]=mt);ae(null,je=[],Qe,pt)}for(it=je.length;it--;)(mt=je[it])&&(Qe=ae?d.call(Re,mt):zt[it])>-1&&(Re[Qe]=!(Be[Qe]=mt))}}else je=hs(je===Be?je.splice(sn,je.length):je),ae?ae(null,Be,je,pt):x.apply(Be,je)})}function la(P){for(var B,$,te,ae=P.length,xe=o.relative[P[0].type],Re=xe||o.relative[" "],Be=xe?1:0,Pe=fs(function(it){return it===B},Re,!0),pt=fs(function(it){return d.call(B,it)>-1},Re,!0),Qe=[function(it,mt,je){var zt=!xe&&(je||mt!=f)||((B=mt).nodeType?Pe(it,mt,je):pt(it,mt,je));return B=null,zt}];Be<ae;Be++)if($=o.relative[P[Be].type])Qe=[fs(aa(Qe),$)];else{if($=o.filter[P[Be].type].apply(null,P[Be].matches),$[oe]){for(te=++Be;te<ae&&!o.relative[P[te].type];te++);return oa(Be>1&&aa(Qe),Be>1&&us(P.slice(0,Be-1).concat({value:P[Be-2].type===" "?"*":""})).replace(de,"$1"),$,Be<te&&la(P.slice(Be,te)),te<ae&&la(P=P.slice(te)),te<ae&&us(P))}Qe.push($)}return aa(Qe)}function xu(P,B){var $=B.length>0,te=P.length>0,ae=function(xe,Re,Be,Pe,pt){var Qe,it,mt,je=0,zt="0",_n=xe&&[],sn=[],An=f,Vn=xe||te&&o.find.TAG("*",pt),Ji=J+=An==null?1:Math.random()||.1,un=Vn.length;for(pt&&(f=Re==E||Re||pt);zt!==un&&(Qe=Vn[zt])!=null;zt++){if(te&&Qe){for(it=0,!Re&&Qe.ownerDocument!=E&&(mi(Qe),Be=!U);mt=P[it++];)if(mt(Qe,Re||E,Be)){x.call(Pe,Qe);break}pt&&(J=Ji)}$&&((Qe=!mt&&Qe)&&je--,xe&&_n.push(Qe))}if(je+=zt,$&&zt!==je){for(it=0;mt=B[it++];)mt(_n,sn,Re,Be);if(xe){if(je>0)for(;zt--;)_n[zt]||sn[zt]||(sn[zt]=C.call(Pe));sn=hs(sn)}x.apply(Pe,sn),pt&&!xe&&sn.length>0&&je+B.length>1&&l.uniqueSort(Pe)}return pt&&(J=Ji,f=An),_n};return $?Dn(ae):ae}function ca(P,B){var $,te=[],ae=[],xe=at[P+" "];if(!xe){for(B||(B=Br(P)),$=B.length;$--;)xe=la(B[$]),xe[oe]?te.push(xe):ae.push(xe);xe=at(P,xu(ae,te)),xe.selector=P}return xe}function rl(P,B,$,te){var ae,xe,Re,Be,Pe,pt=typeof P=="function"&&P,Qe=!te&&Br(P=pt.selector||P);if($=$||[],Qe.length===1){if(xe=Qe[0]=Qe[0].slice(0),xe.length>2&&(Re=xe[0]).type==="ID"&&B.nodeType===9&&U&&o.relative[xe[1].type]){if(B=(o.find.ID(Re.matches[0].replace(Qn,ei),B)||[])[0],B)pt&&(B=B.parentNode);else return $;P=P.slice(xe.shift().value.length)}for(ae=kn.needsContext.test(P)?0:xe.length;ae--&&(Re=xe[ae],!o.relative[Be=Re.type]);)if((Pe=o.find[Be])&&(te=Pe(Re.matches[0].replace(Qn,ei),ra.test(xe[0].type)&&sa(B.parentNode)||B))){if(xe.splice(ae,1),P=te.length&&us(xe),!P)return x.apply($,te),$;break}}return(pt||ca(P,Qe))(te,B,!U,$,!B||ra.test(P)&&sa(B.parentNode)||B),$}T.sortStable=oe.split("").sort($t).join("")===oe,mi(),T.sortDetached=Zi(function(P){return P.compareDocumentPosition(E.createElement("fieldset"))&1}),l.find=Ut,l.expr[":"]=l.expr.pseudos,l.unique=l.uniqueSort,Ut.compile=ca,Ut.select=rl,Ut.setDocument=mi,Ut.tokenize=Br,Ut.escape=l.escapeSelector,Ut.getText=l.text,Ut.isXML=l.isXMLDoc,Ut.selectors=l.expr,Ut.support=l.support,Ut.uniqueSort=l.uniqueSort})();var Se=function(r,o,f){for(var h=[],v=f!==void 0;(r=r[o])&&r.nodeType!==9;)if(r.nodeType===1){if(v&&l(r).is(f))break;h.push(r)}return h},Ue=function(r,o){for(var f=[];r;r=r.nextSibling)r.nodeType===1&&r!==o&&f.push(r);return f},Ve=l.expr.match.needsContext,st=/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;function Rt(r,o,f){return w(o)?l.grep(r,function(h,v){return!!o.call(h,v,h)!==f}):o.nodeType?l.grep(r,function(h){return h===o!==f}):typeof o!="string"?l.grep(r,function(h){return d.call(o,h)>-1!==f}):l.filter(o,r,f)}l.filter=function(r,o,f){var h=o[0];return f&&(r=":not("+r+")"),o.length===1&&h.nodeType===1?l.find.matchesSelector(h,r)?[h]:[]:l.find.matches(r,l.grep(o,function(v){return v.nodeType===1}))},l.fn.extend({find:function(r){var o,f,h=this.length,v=this;if(typeof r!="string")return this.pushStack(l(r).filter(function(){for(o=0;o<h;o++)if(l.contains(v[o],this))return!0}));for(f=this.pushStack([]),o=0;o<h;o++)l.find(r,v[o],f);return h>1?l.uniqueSort(f):f},filter:function(r){return this.pushStack(Rt(this,r||[],!1))},not:function(r){return this.pushStack(Rt(this,r||[],!0))},is:function(r){return!!Rt(this,typeof r=="string"&&Ve.test(r)?l(r):r||[],!1).length}});var ce,Me=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,Oe=l.fn.init=function(r,o,f){var h,v;if(!r)return this;if(f=f||ce,typeof r=="string")if(r[0]==="<"&&r[r.length-1]===">"&&r.length>=3?h=[null,r,null]:h=Me.exec(r),h&&(h[1]||!o))if(h[1]){if(o=o instanceof l?o[0]:o,l.merge(this,l.parseHTML(h[1],o&&o.nodeType?o.ownerDocument||o:m,!0)),st.test(h[1])&&l.isPlainObject(o))for(h in o)w(this[h])?this[h](o[h]):this.attr(h,o[h]);return this}else return v=m.getElementById(h[2]),v&&(this[0]=v,this.length=1),this;else return!o||o.jquery?(o||f).find(r):this.constructor(o).find(r);else{if(r.nodeType)return this[0]=r,this.length=1,this;if(w(r))return f.ready!==void 0?f.ready(r):r(l)}return l.makeArray(r,this)};Oe.prototype=l.fn,ce=l(m);var be=/^(?:parents|prev(?:Until|All))/,$e={children:!0,contents:!0,next:!0,prev:!0};l.fn.extend({has:function(r){var o=l(r,this),f=o.length;return this.filter(function(){for(var h=0;h<f;h++)if(l.contains(this,o[h]))return!0})},closest:function(r,o){var f,h=0,v=this.length,x=[],E=typeof r!="string"&&l(r);if(!Ve.test(r)){for(;h<v;h++)for(f=this[h];f&&f!==o;f=f.parentNode)if(f.nodeType<11&&(E?E.index(f)>-1:f.nodeType===1&&l.find.matchesSelector(f,r))){x.push(f);break}}return this.pushStack(x.length>1?l.uniqueSort(x):x)},index:function(r){return r?typeof r=="string"?d.call(l(r),this[0]):d.call(this,r.jquery?r[0]:r):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(r,o){return this.pushStack(l.uniqueSort(l.merge(this.get(),l(r,o))))},addBack:function(r){return this.add(r==null?this.prevObject:this.prevObject.filter(r))}});function Mt(r,o){for(;(r=r[o])&&r.nodeType!==1;);return r}l.each({parent:function(r){var o=r.parentNode;return o&&o.nodeType!==11?o:null},parents:function(r){return Se(r,"parentNode")},parentsUntil:function(r,o,f){return Se(r,"parentNode",f)},next:function(r){return Mt(r,"nextSibling")},prev:function(r){return Mt(r,"previousSibling")},nextAll:function(r){return Se(r,"nextSibling")},prevAll:function(r){return Se(r,"previousSibling")},nextUntil:function(r,o,f){return Se(r,"nextSibling",f)},prevUntil:function(r,o,f){return Se(r,"previousSibling",f)},siblings:function(r){return Ue((r.parentNode||{}).firstChild,r)},children:function(r){return Ue(r.firstChild)},contents:function(r){return r.contentDocument!=null&&s(r.contentDocument)?r.contentDocument:(R(r,"template")&&(r=r.content||r),l.merge([],r.childNodes))}},function(r,o){l.fn[r]=function(f,h){var v=l.map(this,o,f);return r.slice(-5)!=="Until"&&(h=f),h&&typeof h=="string"&&(v=l.filter(h,v)),this.length>1&&($e[r]||l.uniqueSort(v),be.test(r)&&v.reverse()),this.pushStack(v)}});var He=/[^\x20\t\r\n\f]+/g;function Vt(r){var o={};return l.each(r.match(He)||[],function(f,h){o[h]=!0}),o}l.Callbacks=function(r){r=typeof r=="string"?Vt(r):l.extend({},r);var o,f,h,v,x=[],E=[],I=-1,U=function(){for(v=v||r.once,h=o=!0;E.length;I=-1)for(f=E.shift();++I<x.length;)x[I].apply(f[0],f[1])===!1&&r.stopOnFalse&&(I=x.length,f=!1);r.memory||(f=!1),o=!1,v&&(f?x=[]:x="")},H={add:function(){return x&&(f&&!o&&(I=x.length-1,E.push(f)),function ne(oe){l.each(oe,function(J,ge){w(ge)?(!r.unique||!H.has(ge))&&x.push(ge):ge&&ge.length&&L(ge)!=="string"&&ne(ge)})}(arguments),f&&!o&&U()),this},remove:function(){return l.each(arguments,function(ne,oe){for(var J;(J=l.inArray(oe,x,J))>-1;)x.splice(J,1),J<=I&&I--}),this},has:function(ne){return ne?l.inArray(ne,x)>-1:x.length>0},empty:function(){return x&&(x=[]),this},disable:function(){return v=E=[],x=f="",this},disabled:function(){return!x},lock:function(){return v=E=[],!f&&!o&&(x=f=""),this},locked:function(){return!!v},fireWith:function(ne,oe){return v||(oe=oe||[],oe=[ne,oe.slice?oe.slice():oe],E.push(oe),o||U()),this},fire:function(){return H.fireWith(this,arguments),this},fired:function(){return!!h}};return H};function Dt(r){return r}function lt(r){throw r}function F(r,o,f,h){var v;try{r&&w(v=r.promise)?v.call(r).done(o).fail(f):r&&w(v=r.then)?v.call(r,o,f):o.apply(void 0,[r].slice(h))}catch(x){f.apply(void 0,[x])}}l.extend({Deferred:function(r){var o=[["notify","progress",l.Callbacks("memory"),l.Callbacks("memory"),2],["resolve","done",l.Callbacks("once memory"),l.Callbacks("once memory"),0,"resolved"],["reject","fail",l.Callbacks("once memory"),l.Callbacks("once memory"),1,"rejected"]],f="pending",h={state:function(){return f},always:function(){return v.done(arguments).fail(arguments),this},catch:function(x){return h.then(null,x)},pipe:function(){var x=arguments;return l.Deferred(function(E){l.each(o,function(I,U){var H=w(x[U[4]])&&x[U[4]];v[U[1]](function(){var ne=H&&H.apply(this,arguments);ne&&w(ne.promise)?ne.promise().progress(E.notify).done(E.resolve).fail(E.reject):E[U[0]+"With"](this,H?[ne]:arguments)})}),x=null}).promise()},then:function(x,E,I){var U=0;function H(ne,oe,J,ge){return function(){var tt=this,yt=arguments,at=function(){var $t,Bn;if(!(ne<U)){if($t=J.apply(tt,yt),$t===oe.promise())throw new TypeError("Thenable self-resolution");Bn=$t&&(typeof $t=="object"||typeof $t=="function")&&$t.then,w(Bn)?ge?Bn.call($t,H(U,oe,Dt,ge),H(U,oe,lt,ge)):(U++,Bn.call($t,H(U,oe,Dt,ge),H(U,oe,lt,ge),H(U,oe,Dt,oe.notifyWith))):(J!==Dt&&(tt=void 0,yt=[$t]),(ge||oe.resolveWith)(tt,yt))}},rn=ge?at:function(){try{at()}catch($t){l.Deferred.exceptionHook&&l.Deferred.exceptionHook($t,rn.error),ne+1>=U&&(J!==lt&&(tt=void 0,yt=[$t]),oe.rejectWith(tt,yt))}};ne?rn():(l.Deferred.getErrorHook?rn.error=l.Deferred.getErrorHook():l.Deferred.getStackHook&&(rn.error=l.Deferred.getStackHook()),e.setTimeout(rn))}}return l.Deferred(function(ne){o[0][3].add(H(0,ne,w(I)?I:Dt,ne.notifyWith)),o[1][3].add(H(0,ne,w(x)?x:Dt)),o[2][3].add(H(0,ne,w(E)?E:lt))}).promise()},promise:function(x){return x!=null?l.extend(x,h):h}},v={};return l.each(o,function(x,E){var I=E[2],U=E[5];h[E[1]]=I.add,U&&I.add(function(){f=U},o[3-x][2].disable,o[3-x][3].disable,o[0][2].lock,o[0][3].lock),I.add(E[3].fire),v[E[0]]=function(){return v[E[0]+"With"](this===v?void 0:this,arguments),this},v[E[0]+"With"]=I.fireWith}),h.promise(v),r&&r.call(v,v),v},when:function(r){var o=arguments.length,f=o,h=Array(f),v=a.call(arguments),x=l.Deferred(),E=function(I){return function(U){h[I]=this,v[I]=arguments.length>1?a.call(arguments):U,--o||x.resolveWith(h,v)}};if(o<=1&&(F(r,x.done(E(f)).resolve,x.reject,!o),x.state()==="pending"||w(v[f]&&v[f].then)))return x.then();for(;f--;)F(v[f],E(f),x.reject);return x.promise()}});var pn=/^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;l.Deferred.exceptionHook=function(r,o){e.console&&e.console.warn&&r&&pn.test(r.name)&&e.console.warn("jQuery.Deferred exception: "+r.message,r.stack,o)},l.readyException=function(r){e.setTimeout(function(){throw r})};var ft=l.Deferred();l.fn.ready=function(r){return ft.then(r).catch(function(o){l.readyException(o)}),this},l.extend({isReady:!1,readyWait:1,ready:function(r){(r===!0?--l.readyWait:l.isReady)||(l.isReady=!0,!(r!==!0&&--l.readyWait>0)&&ft.resolveWith(m,[l]))}}),l.ready.then=ft.then;function ct(){m.removeEventListener("DOMContentLoaded",ct),e.removeEventListener("load",ct),l.ready()}m.readyState==="complete"||m.readyState!=="loading"&&!m.documentElement.doScroll?e.setTimeout(l.ready):(m.addEventListener("DOMContentLoaded",ct),e.addEventListener("load",ct));var Fe=function(r,o,f,h,v,x,E){var I=0,U=r.length,H=f==null;if(L(f)==="object"){v=!0;for(I in f)Fe(r,o,I,f[I],!0,x,E)}else if(h!==void 0&&(v=!0,w(h)||(E=!0),H&&(E?(o.call(r,h),o=null):(H=o,o=function(ne,oe,J){return H.call(l(ne),J)})),o))for(;I<U;I++)o(r[I],f,E?h:h.call(r[I],I,o(r[I],f)));return v?r:H?o.call(r):U?o(r[0],f):x},Ft=/^-ms-/,Ge=/-([a-z])/g;function D(r,o){return o.toUpperCase()}function b(r){return r.replace(Ft,"ms-").replace(Ge,D)}var K=function(r){return r.nodeType===1||r.nodeType===9||!+r.nodeType};function le(){this.expando=l.expando+le.uid++}le.uid=1,le.prototype={cache:function(r){var o=r[this.expando];return o||(o={},K(r)&&(r.nodeType?r[this.expando]=o:Object.defineProperty(r,this.expando,{value:o,configurable:!0}))),o},set:function(r,o,f){var h,v=this.cache(r);if(typeof o=="string")v[b(o)]=f;else for(h in o)v[b(h)]=o[h];return v},get:function(r,o){return o===void 0?this.cache(r):r[this.expando]&&r[this.expando][b(o)]},access:function(r,o,f){return o===void 0||o&&typeof o=="string"&&f===void 0?this.get(r,o):(this.set(r,o,f),f!==void 0?f:o)},remove:function(r,o){var f,h=r[this.expando];if(h!==void 0){if(o!==void 0)for(Array.isArray(o)?o=o.map(b):(o=b(o),o=o in h?[o]:o.match(He)||[]),f=o.length;f--;)delete h[o[f]];(o===void 0||l.isEmptyObject(h))&&(r.nodeType?r[this.expando]=void 0:delete r[this.expando])}},hasData:function(r){var o=r[this.expando];return o!==void 0&&!l.isEmptyObject(o)}};var Z=new le,re=new le,ze=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Ae=/[A-Z]/g;function Ke(r){return r==="true"?!0:r==="false"?!1:r==="null"?null:r===+r+""?+r:ze.test(r)?JSON.parse(r):r}function Ze(r,o,f){var h;if(f===void 0&&r.nodeType===1)if(h="data-"+o.replace(Ae,"-$&").toLowerCase(),f=r.getAttribute(h),typeof f=="string"){try{f=Ke(f)}catch{}re.set(r,o,f)}else f=void 0;return f}l.extend({hasData:function(r){return re.hasData(r)||Z.hasData(r)},data:function(r,o,f){return re.access(r,o,f)},removeData:function(r,o){re.remove(r,o)},_data:function(r,o,f){return Z.access(r,o,f)},_removeData:function(r,o){Z.remove(r,o)}}),l.fn.extend({data:function(r,o){var f,h,v,x=this[0],E=x&&x.attributes;if(r===void 0){if(this.length&&(v=re.get(x),x.nodeType===1&&!Z.get(x,"hasDataAttrs"))){for(f=E.length;f--;)E[f]&&(h=E[f].name,h.indexOf("data-")===0&&(h=b(h.slice(5)),Ze(x,h,v[h])));Z.set(x,"hasDataAttrs",!0)}return v}return typeof r=="object"?this.each(function(){re.set(this,r)}):Fe(this,function(I){var U;if(x&&I===void 0)return U=re.get(x,r),U!==void 0||(U=Ze(x,r),U!==void 0)?U:void 0;this.each(function(){re.set(this,r,I)})},null,o,arguments.length>1,null,!0)},removeData:function(r){return this.each(function(){re.remove(this,r)})}}),l.extend({queue:function(r,o,f){var h;if(r)return o=(o||"fx")+"queue",h=Z.get(r,o),f&&(!h||Array.isArray(f)?h=Z.access(r,o,l.makeArray(f)):h.push(f)),h||[]},dequeue:function(r,o){o=o||"fx";var f=l.queue(r,o),h=f.length,v=f.shift(),x=l._queueHooks(r,o),E=function(){l.dequeue(r,o)};v==="inprogress"&&(v=f.shift(),h--),v&&(o==="fx"&&f.unshift("inprogress"),delete x.stop,v.call(r,E,x)),!h&&x&&x.empty.fire()},_queueHooks:function(r,o){var f=o+"queueHooks";return Z.get(r,f)||Z.access(r,f,{empty:l.Callbacks("once memory").add(function(){Z.remove(r,[o+"queue",f])})})}}),l.fn.extend({queue:function(r,o){var f=2;return typeof r!="string"&&(o=r,r="fx",f--),arguments.length<f?l.queue(this[0],r):o===void 0?this:this.each(function(){var h=l.queue(this,r,o);l._queueHooks(this,r),r==="fx"&&h[0]!=="inprogress"&&l.dequeue(this,r)})},dequeue:function(r){return this.each(function(){l.dequeue(this,r)})},clearQueue:function(r){return this.queue(r||"fx",[])},promise:function(r,o){var f,h=1,v=l.Deferred(),x=this,E=this.length,I=function(){--h||v.resolveWith(x,[x])};for(typeof r!="string"&&(o=r,r=void 0),r=r||"fx";E--;)f=Z.get(x[E],r+"queueHooks"),f&&f.empty&&(h++,f.empty.add(I));return I(),v.promise(o)}});var _e=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,Le=new RegExp("^(?:([+-])=|)("+_e+")([a-z%]*)$","i"),ke=["Top","Right","Bottom","Left"],Ye=m.documentElement,De=function(r){return l.contains(r.ownerDocument,r)},gt={composed:!0};Ye.getRootNode&&(De=function(r){return l.contains(r.ownerDocument,r)||r.getRootNode(gt)===r.ownerDocument});var nt=function(r,o){return r=o||r,r.style.display==="none"||r.style.display===""&&De(r)&&l.css(r,"display")==="none"};function Lt(r,o,f,h){var v,x,E=20,I=h?function(){return h.cur()}:function(){return l.css(r,o,"")},U=I(),H=f&&f[3]||(l.cssNumber[o]?"":"px"),ne=r.nodeType&&(l.cssNumber[o]||H!=="px"&&+U)&&Le.exec(l.css(r,o));if(ne&&ne[3]!==H){for(U=U/2,H=H||ne[3],ne=+U||1;E--;)l.style(r,o,ne+H),(1-x)*(1-(x=I()/U||.5))<=0&&(E=0),ne=ne/x;ne=ne*2,l.style(r,o,ne+H),f=f||[]}return f&&(ne=+ne||+U||0,v=f[1]?ne+(f[1]+1)*f[2]:+f[2],h&&(h.unit=H,h.start=ne,h.end=v)),v}var k={};function we(r){var o,f=r.ownerDocument,h=r.nodeName,v=k[h];return v||(o=f.body.appendChild(f.createElement(h)),v=l.css(o,"display"),o.parentNode.removeChild(o),v==="none"&&(v="block"),k[h]=v,v)}function ie(r,o){for(var f,h,v=[],x=0,E=r.length;x<E;x++)h=r[x],h.style&&(f=h.style.display,o?(f==="none"&&(v[x]=Z.get(h,"display")||null,v[x]||(h.style.display="")),h.style.display===""&&nt(h)&&(v[x]=we(h))):f!=="none"&&(v[x]="none",Z.set(h,"display",f)));for(x=0;x<E;x++)v[x]!=null&&(r[x].style.display=v[x]);return r}l.fn.extend({show:function(){return ie(this,!0)},hide:function(){return ie(this)},toggle:function(r){return typeof r=="boolean"?r?this.show():this.hide():this.each(function(){nt(this)?l(this).show():l(this).hide()})}});var fe=/^(?:checkbox|radio)$/i,Ce=/<([a-z][^\/\0>\x20\t\r\n\f]*)/i,Te=/^$|^module$|\/(?:java|ecma)script/i;(function(){var r=m.createDocumentFragment(),o=r.appendChild(m.createElement("div")),f=m.createElement("input");f.setAttribute("type","radio"),f.setAttribute("checked","checked"),f.setAttribute("name","t"),o.appendChild(f),T.checkClone=o.cloneNode(!0).cloneNode(!0).lastChild.checked,o.innerHTML="<textarea>x</textarea>",T.noCloneChecked=!!o.cloneNode(!0).lastChild.defaultValue,o.innerHTML="<option></option>",T.option=!!o.lastChild})();var qe={thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};qe.tbody=qe.tfoot=qe.colgroup=qe.caption=qe.thead,qe.th=qe.td,T.option||(qe.optgroup=qe.option=[1,"<select multiple='multiple'>","</select>"]);function ht(r,o){var f;return typeof r.getElementsByTagName<"u"?f=r.getElementsByTagName(o||"*"):typeof r.querySelectorAll<"u"?f=r.querySelectorAll(o||"*"):f=[],o===void 0||o&&R(r,o)?l.merge([r],f):f}function Xt(r,o){for(var f=0,h=r.length;f<h;f++)Z.set(r[f],"globalEval",!o||Z.get(o[f],"globalEval"))}var Pt=/<|&#?\w+;/;function mn(r,o,f,h,v){for(var x,E,I,U,H,ne,oe=o.createDocumentFragment(),J=[],ge=0,tt=r.length;ge<tt;ge++)if(x=r[ge],x||x===0)if(L(x)==="object")l.merge(J,x.nodeType?[x]:x);else if(!Pt.test(x))J.push(o.createTextNode(x));else{for(E=E||oe.appendChild(o.createElement("div")),I=(Ce.exec(x)||["",""])[1].toLowerCase(),U=qe[I]||qe._default,E.innerHTML=U[1]+l.htmlPrefilter(x)+U[2],ne=U[0];ne--;)E=E.lastChild;l.merge(J,E.childNodes),E=oe.firstChild,E.textContent=""}for(oe.textContent="",ge=0;x=J[ge++];){if(h&&l.inArray(x,h)>-1){v&&v.push(x);continue}if(H=De(x),E=ht(oe.appendChild(x),"script"),H&&Xt(E),f)for(ne=0;x=E[ne++];)Te.test(x.type||"")&&f.push(x)}return oe}var Tn=/^([^.]*)(?:\.(.+)|)/;function $n(){return!0}function Kn(){return!1}function Pn(r,o,f,h,v,x){var E,I;if(typeof o=="object"){typeof f!="string"&&(h=h||f,f=void 0);for(I in o)Pn(r,I,f,h,o[I],x);return r}if(h==null&&v==null?(v=f,h=f=void 0):v==null&&(typeof f=="string"?(v=h,h=void 0):(v=h,h=f,f=void 0)),v===!1)v=Kn;else if(!v)return r;return x===1&&(E=v,v=function(U){return l().off(U),E.apply(this,arguments)},v.guid=E.guid||(E.guid=l.guid++)),r.each(function(){l.event.add(this,o,v,h,f)})}l.event={global:{},add:function(r,o,f,h,v){var x,E,I,U,H,ne,oe,J,ge,tt,yt,at=Z.get(r);if(K(r))for(f.handler&&(x=f,f=x.handler,v=x.selector),v&&l.find.matchesSelector(Ye,v),f.guid||(f.guid=l.guid++),(U=at.events)||(U=at.events=Object.create(null)),(E=at.handle)||(E=at.handle=function(rn){return typeof l<"u"&&l.event.triggered!==rn.type?l.event.dispatch.apply(r,arguments):void 0}),o=(o||"").match(He)||[""],H=o.length;H--;)I=Tn.exec(o[H])||[],ge=yt=I[1],tt=(I[2]||"").split(".").sort(),ge&&(oe=l.event.special[ge]||{},ge=(v?oe.delegateType:oe.bindType)||ge,oe=l.event.special[ge]||{},ne=l.extend({type:ge,origType:yt,data:h,handler:f,guid:f.guid,selector:v,needsContext:v&&l.expr.match.needsContext.test(v),namespace:tt.join(".")},x),(J=U[ge])||(J=U[ge]=[],J.delegateCount=0,(!oe.setup||oe.setup.call(r,h,tt,E)===!1)&&r.addEventListener&&r.addEventListener(ge,E)),oe.add&&(oe.add.call(r,ne),ne.handler.guid||(ne.handler.guid=f.guid)),v?J.splice(J.delegateCount++,0,ne):J.push(ne),l.event.global[ge]=!0)},remove:function(r,o,f,h,v){var x,E,I,U,H,ne,oe,J,ge,tt,yt,at=Z.hasData(r)&&Z.get(r);if(!(!at||!(U=at.events))){for(o=(o||"").match(He)||[""],H=o.length;H--;){if(I=Tn.exec(o[H])||[],ge=yt=I[1],tt=(I[2]||"").split(".").sort(),!ge){for(ge in U)l.event.remove(r,ge+o[H],f,h,!0);continue}for(oe=l.event.special[ge]||{},ge=(h?oe.delegateType:oe.bindType)||ge,J=U[ge]||[],I=I[2]&&new RegExp("(^|\\.)"+tt.join("\\.(?:.*\\.|)")+"(\\.|$)"),E=x=J.length;x--;)ne=J[x],(v||yt===ne.origType)&&(!f||f.guid===ne.guid)&&(!I||I.test(ne.namespace))&&(!h||h===ne.selector||h==="**"&&ne.selector)&&(J.splice(x,1),ne.selector&&J.delegateCount--,oe.remove&&oe.remove.call(r,ne));E&&!J.length&&((!oe.teardown||oe.teardown.call(r,tt,at.handle)===!1)&&l.removeEvent(r,ge,at.handle),delete U[ge])}l.isEmptyObject(U)&&Z.remove(r,"handle events")}},dispatch:function(r){var o,f,h,v,x,E,I=new Array(arguments.length),U=l.event.fix(r),H=(Z.get(this,"events")||Object.create(null))[U.type]||[],ne=l.event.special[U.type]||{};for(I[0]=U,o=1;o<arguments.length;o++)I[o]=arguments[o];if(U.delegateTarget=this,!(ne.preDispatch&&ne.preDispatch.call(this,U)===!1)){for(E=l.event.handlers.call(this,U,H),o=0;(v=E[o++])&&!U.isPropagationStopped();)for(U.currentTarget=v.elem,f=0;(x=v.handlers[f++])&&!U.isImmediatePropagationStopped();)(!U.rnamespace||x.namespace===!1||U.rnamespace.test(x.namespace))&&(U.handleObj=x,U.data=x.data,h=((l.event.special[x.origType]||{}).handle||x.handler).apply(v.elem,I),h!==void 0&&(U.result=h)===!1&&(U.preventDefault(),U.stopPropagation()));return ne.postDispatch&&ne.postDispatch.call(this,U),U.result}},handlers:function(r,o){var f,h,v,x,E,I=[],U=o.delegateCount,H=r.target;if(U&&H.nodeType&&!(r.type==="click"&&r.button>=1)){for(;H!==this;H=H.parentNode||this)if(H.nodeType===1&&!(r.type==="click"&&H.disabled===!0)){for(x=[],E={},f=0;f<U;f++)h=o[f],v=h.selector+" ",E[v]===void 0&&(E[v]=h.needsContext?l(v,this).index(H)>-1:l.find(v,this,null,[H]).length),E[v]&&x.push(h);x.length&&I.push({elem:H,handlers:x})}}return H=this,U<o.length&&I.push({elem:H,handlers:o.slice(U)}),I},addProp:function(r,o){Object.defineProperty(l.Event.prototype,r,{enumerable:!0,configurable:!0,get:w(o)?function(){if(this.originalEvent)return o(this.originalEvent)}:function(){if(this.originalEvent)return this.originalEvent[r]},set:function(f){Object.defineProperty(this,r,{enumerable:!0,configurable:!0,writable:!0,value:f})}})},fix:function(r){return r[l.expando]?r:new l.Event(r)},special:{load:{noBubble:!0},click:{setup:function(r){var o=this||r;return fe.test(o.type)&&o.click&&R(o,"input")&&ui(o,"click",!0),!1},trigger:function(r){var o=this||r;return fe.test(o.type)&&o.click&&R(o,"input")&&ui(o,"click"),!0},_default:function(r){var o=r.target;return fe.test(o.type)&&o.click&&R(o,"input")&&Z.get(o,"click")||R(o,"a")}},beforeunload:{postDispatch:function(r){r.result!==void 0&&r.originalEvent&&(r.originalEvent.returnValue=r.result)}}}};function ui(r,o,f){if(!f){Z.get(r,o)===void 0&&l.event.add(r,o,$n);return}Z.set(r,o,!1),l.event.add(r,o,{namespace:!1,handler:function(h){var v,x=Z.get(this,o);if(h.isTrigger&1&&this[o]){if(x)(l.event.special[o]||{}).delegateType&&h.stopPropagation();else if(x=a.call(arguments),Z.set(this,o,x),this[o](),v=Z.get(this,o),Z.set(this,o,!1),x!==v)return h.stopImmediatePropagation(),h.preventDefault(),v}else x&&(Z.set(this,o,l.event.trigger(x[0],x.slice(1),this)),h.stopPropagation(),h.isImmediatePropagationStopped=$n)}})}l.removeEvent=function(r,o,f){r.removeEventListener&&r.removeEventListener(o,f)},l.Event=function(r,o){if(!(this instanceof l.Event))return new l.Event(r,o);r&&r.type?(this.originalEvent=r,this.type=r.type,this.isDefaultPrevented=r.defaultPrevented||r.defaultPrevented===void 0&&r.returnValue===!1?$n:Kn,this.target=r.target&&r.target.nodeType===3?r.target.parentNode:r.target,this.currentTarget=r.currentTarget,this.relatedTarget=r.relatedTarget):this.type=r,o&&l.extend(this,o),this.timeStamp=r&&r.timeStamp||Date.now(),this[l.expando]=!0},l.Event.prototype={constructor:l.Event,isDefaultPrevented:Kn,isPropagationStopped:Kn,isImmediatePropagationStopped:Kn,isSimulated:!1,preventDefault:function(){var r=this.originalEvent;this.isDefaultPrevented=$n,r&&!this.isSimulated&&r.preventDefault()},stopPropagation:function(){var r=this.originalEvent;this.isPropagationStopped=$n,r&&!this.isSimulated&&r.stopPropagation()},stopImmediatePropagation:function(){var r=this.originalEvent;this.isImmediatePropagationStopped=$n,r&&!this.isSimulated&&r.stopImmediatePropagation(),this.stopPropagation()}},l.each({altKey:!0,bubbles:!0,cancelable:!0,changedTouches:!0,ctrlKey:!0,detail:!0,eventPhase:!0,metaKey:!0,pageX:!0,pageY:!0,shiftKey:!0,view:!0,char:!0,code:!0,charCode:!0,key:!0,keyCode:!0,button:!0,buttons:!0,clientX:!0,clientY:!0,offsetX:!0,offsetY:!0,pointerId:!0,pointerType:!0,screenX:!0,screenY:!0,targetTouches:!0,toElement:!0,touches:!0,which:!0},l.event.addProp),l.each({focus:"focusin",blur:"focusout"},function(r,o){function f(h){if(m.documentMode){var v=Z.get(this,"handle"),x=l.event.fix(h);x.type=h.type==="focusin"?"focus":"blur",x.isSimulated=!0,v(h),x.target===x.currentTarget&&v(x)}else l.event.simulate(o,h.target,l.event.fix(h))}l.event.special[r]={setup:function(){var h;if(ui(this,r,!0),m.documentMode)h=Z.get(this,o),h||this.addEventListener(o,f),Z.set(this,o,(h||0)+1);else return!1},trigger:function(){return ui(this,r),!0},teardown:function(){var h;if(m.documentMode)h=Z.get(this,o)-1,h?Z.set(this,o,h):(this.removeEventListener(o,f),Z.remove(this,o));else return!1},_default:function(h){return Z.get(h.target,r)},delegateType:o},l.event.special[o]={setup:function(){var h=this.ownerDocument||this.document||this,v=m.documentMode?this:h,x=Z.get(v,o);x||(m.documentMode?this.addEventListener(o,f):h.addEventListener(r,f,!0)),Z.set(v,o,(x||0)+1)},teardown:function(){var h=this.ownerDocument||this.document||this,v=m.documentMode?this:h,x=Z.get(v,o)-1;x?Z.set(v,o,x):(m.documentMode?this.removeEventListener(o,f):h.removeEventListener(r,f,!0),Z.remove(v,o))}}}),l.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(r,o){l.event.special[r]={delegateType:o,bindType:o,handle:function(f){var h,v=this,x=f.relatedTarget,E=f.handleObj;return(!x||x!==v&&!l.contains(v,x))&&(f.type=E.origType,h=E.handler.apply(this,arguments),f.type=o),h}}}),l.fn.extend({on:function(r,o,f,h){return Pn(this,r,o,f,h)},one:function(r,o,f,h){return Pn(this,r,o,f,h,1)},off:function(r,o,f){var h,v;if(r&&r.preventDefault&&r.handleObj)return h=r.handleObj,l(r.delegateTarget).off(h.namespace?h.origType+"."+h.namespace:h.origType,h.selector,h.handler),this;if(typeof r=="object"){for(v in r)this.off(v,o,r[v]);return this}return(o===!1||typeof o=="function")&&(f=o,o=void 0),f===!1&&(f=Kn),this.each(function(){l.event.remove(this,r,f,o)})}});var ss=/<script|<style|<link/i,as=/checked\s*(?:[^=]|=\s*.checked.)/i,ji=/^\s*<!\[CDATA\[|\]\]>\s*$/g;function Rr(r,o){return R(r,"table")&&R(o.nodeType!==11?o:o.firstChild,"tr")&&l(r).children("tbody")[0]||r}function $i(r){return r.type=(r.getAttribute("type")!==null)+"/"+r.type,r}function os(r){return(r.type||"").slice(0,5)==="true/"?r.type=r.type.slice(5):r.removeAttribute("type"),r}function Pr(r,o){var f,h,v,x,E,I,U;if(o.nodeType===1){if(Z.hasData(r)&&(x=Z.get(r),U=x.events,U)){Z.remove(o,"handle events");for(v in U)for(f=0,h=U[v].length;f<h;f++)l.event.add(o,v,U[v][f])}re.hasData(r)&&(E=re.access(r),I=l.extend({},E),re.set(o,I))}}function $s(r,o){var f=o.nodeName.toLowerCase();f==="input"&&fe.test(r.type)?o.checked=r.checked:(f==="input"||f==="textarea")&&(o.defaultValue=r.defaultValue)}function fi(r,o,f,h){o=c(o);var v,x,E,I,U,H,ne=0,oe=r.length,J=oe-1,ge=o[0],tt=w(ge);if(tt||oe>1&&typeof ge=="string"&&!T.checkClone&&as.test(ge))return r.each(function(yt){var at=r.eq(yt);tt&&(o[0]=ge.call(this,yt,at.html())),fi(at,o,f,h)});if(oe&&(v=mn(o,r[0].ownerDocument,!1,r,h),x=v.firstChild,v.childNodes.length===1&&(v=x),x||h)){for(E=l.map(ht(v,"script"),$i),I=E.length;ne<oe;ne++)U=v,ne!==J&&(U=l.clone(U,!0,!0),I&&l.merge(E,ht(U,"script"))),f.call(r[ne],U,ne);if(I)for(H=E[E.length-1].ownerDocument,l.map(E,os),ne=0;ne<I;ne++)U=E[ne],Te.test(U.type||"")&&!Z.access(U,"globalEval")&&l.contains(H,U)&&(U.src&&(U.type||"").toLowerCase()!=="module"?l._evalUrl&&!U.noModule&&l._evalUrl(U.src,{nonce:U.nonce||U.getAttribute("nonce")},H):N(U.textContent.replace(ji,""),U,H))}return r}function ls(r,o,f){for(var h,v=o?l.filter(o,r):r,x=0;(h=v[x])!=null;x++)!f&&h.nodeType===1&&l.cleanData(ht(h)),h.parentNode&&(f&&De(h)&&Xt(ht(h,"script")),h.parentNode.removeChild(h));return r}l.extend({htmlPrefilter:function(r){return r},clone:function(r,o,f){var h,v,x,E,I=r.cloneNode(!0),U=De(r);if(!T.noCloneChecked&&(r.nodeType===1||r.nodeType===11)&&!l.isXMLDoc(r))for(E=ht(I),x=ht(r),h=0,v=x.length;h<v;h++)$s(x[h],E[h]);if(o)if(f)for(x=x||ht(r),E=E||ht(I),h=0,v=x.length;h<v;h++)Pr(x[h],E[h]);else Pr(r,I);return E=ht(I,"script"),E.length>0&&Xt(E,!U&&ht(r,"script")),I},cleanData:function(r){for(var o,f,h,v=l.event.special,x=0;(f=r[x])!==void 0;x++)if(K(f)){if(o=f[Z.expando]){if(o.events)for(h in o.events)v[h]?l.event.remove(f,h):l.removeEvent(f,h,o.handle);f[Z.expando]=void 0}f[re.expando]&&(f[re.expando]=void 0)}}}),l.fn.extend({detach:function(r){return ls(this,r,!0)},remove:function(r){return ls(this,r)},text:function(r){return Fe(this,function(o){return o===void 0?l.text(this):this.empty().each(function(){(this.nodeType===1||this.nodeType===11||this.nodeType===9)&&(this.textContent=o)})},null,r,arguments.length)},append:function(){return fi(this,arguments,function(r){if(this.nodeType===1||this.nodeType===11||this.nodeType===9){var o=Rr(this,r);o.appendChild(r)}})},prepend:function(){return fi(this,arguments,function(r){if(this.nodeType===1||this.nodeType===11||this.nodeType===9){var o=Rr(this,r);o.insertBefore(r,o.firstChild)}})},before:function(){return fi(this,arguments,function(r){this.parentNode&&this.parentNode.insertBefore(r,this)})},after:function(){return fi(this,arguments,function(r){this.parentNode&&this.parentNode.insertBefore(r,this.nextSibling)})},empty:function(){for(var r,o=0;(r=this[o])!=null;o++)r.nodeType===1&&(l.cleanData(ht(r,!1)),r.textContent="");return this},clone:function(r,o){return r=r??!1,o=o??r,this.map(function(){return l.clone(this,r,o)})},html:function(r){return Fe(this,function(o){var f=this[0]||{},h=0,v=this.length;if(o===void 0&&f.nodeType===1)return f.innerHTML;if(typeof o=="string"&&!ss.test(o)&&!qe[(Ce.exec(o)||["",""])[1].toLowerCase()]){o=l.htmlPrefilter(o);try{for(;h<v;h++)f=this[h]||{},f.nodeType===1&&(l.cleanData(ht(f,!1)),f.innerHTML=o);f=0}catch{}}f&&this.empty().append(o)},null,r,arguments.length)},replaceWith:function(){var r=[];return fi(this,arguments,function(o){var f=this.parentNode;l.inArray(this,r)<0&&(l.cleanData(ht(this)),f&&f.replaceChild(o,this))},r)}}),l.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(r,o){l.fn[r]=function(f){for(var h,v=[],x=l(f),E=x.length-1,I=0;I<=E;I++)h=I===E?this:this.clone(!0),l(x[I])[o](h),u.apply(v,h.get());return this.pushStack(v)}});var Dr=new RegExp("^("+_e+")(?!px)[a-z%]+$","i"),Lr=/^--/,Ki=function(r){var o=r.ownerDocument.defaultView;return(!o||!o.opener)&&(o=e),o.getComputedStyle(r)},A=function(r,o,f){var h,v,x={};for(v in o)x[v]=r.style[v],r.style[v]=o[v];h=f.call(r);for(v in o)r.style[v]=x[v];return h},G=new RegExp(ke.join("|"),"i");(function(){function r(){if(H){U.style.cssText="position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",H.style.cssText="position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",Ye.appendChild(U).appendChild(H);var ne=e.getComputedStyle(H);f=ne.top!=="1%",I=o(ne.marginLeft)===12,H.style.right="60%",x=o(ne.right)===36,h=o(ne.width)===36,H.style.position="absolute",v=o(H.offsetWidth/3)===12,Ye.removeChild(U),H=null}}function o(ne){return Math.round(parseFloat(ne))}var f,h,v,x,E,I,U=m.createElement("div"),H=m.createElement("div");H.style&&(H.style.backgroundClip="content-box",H.cloneNode(!0).style.backgroundClip="",T.clearCloneStyle=H.style.backgroundClip==="content-box",l.extend(T,{boxSizingReliable:function(){return r(),h},pixelBoxStyles:function(){return r(),x},pixelPosition:function(){return r(),f},reliableMarginLeft:function(){return r(),I},scrollboxSize:function(){return r(),v},reliableTrDimensions:function(){var ne,oe,J,ge;return E==null&&(ne=m.createElement("table"),oe=m.createElement("tr"),J=m.createElement("div"),ne.style.cssText="position:absolute;left:-11111px;border-collapse:separate",oe.style.cssText="box-sizing:content-box;border:1px solid",oe.style.height="1px",J.style.height="9px",J.style.display="block",Ye.appendChild(ne).appendChild(oe).appendChild(J),ge=e.getComputedStyle(oe),E=parseInt(ge.height,10)+parseInt(ge.borderTopWidth,10)+parseInt(ge.borderBottomWidth,10)===oe.offsetHeight,Ye.removeChild(ne)),E}}))})();function Q(r,o,f){var h,v,x,E,I=Lr.test(o),U=r.style;return f=f||Ki(r),f&&(E=f.getPropertyValue(o)||f[o],I&&E&&(E=E.replace(de,"$1")||void 0),E===""&&!De(r)&&(E=l.style(r,o)),!T.pixelBoxStyles()&&Dr.test(E)&&G.test(o)&&(h=U.width,v=U.minWidth,x=U.maxWidth,U.minWidth=U.maxWidth=U.width=E,E=f.width,U.width=h,U.minWidth=v,U.maxWidth=x)),E!==void 0?E+"":E}function ee(r,o){return{get:function(){if(r()){delete this.get;return}return(this.get=o).apply(this,arguments)}}}var W=["Webkit","Moz","ms"],ve=m.createElement("div").style,ye={};function Ie(r){for(var o=r[0].toUpperCase()+r.slice(1),f=W.length;f--;)if(r=W[f]+o,r in ve)return r}function Ne(r){var o=l.cssProps[r]||ye[r];return o||(r in ve?r:ye[r]=Ie(r)||r)}var et=/^(none|table(?!-c[ea]).+)/,Je={position:"absolute",visibility:"hidden",display:"block"},Xe={letterSpacing:"0",fontWeight:"400"};function _t(r,o,f){var h=Le.exec(o);return h?Math.max(0,h[2]-(f||0))+(h[3]||"px"):o}function St(r,o,f,h,v,x){var E=o==="width"?1:0,I=0,U=0,H=0;if(f===(h?"border":"content"))return 0;for(;E<4;E+=2)f==="margin"&&(H+=l.css(r,f+ke[E],!0,v)),h?(f==="content"&&(U-=l.css(r,"padding"+ke[E],!0,v)),f!=="margin"&&(U-=l.css(r,"border"+ke[E]+"Width",!0,v))):(U+=l.css(r,"padding"+ke[E],!0,v),f!=="padding"?U+=l.css(r,"border"+ke[E]+"Width",!0,v):I+=l.css(r,"border"+ke[E]+"Width",!0,v));return!h&&x>=0&&(U+=Math.max(0,Math.ceil(r["offset"+o[0].toUpperCase()+o.slice(1)]-x-U-I-.5))||0),U+H}function Gt(r,o,f){var h=Ki(r),v=!T.boxSizingReliable()||f,x=v&&l.css(r,"boxSizing",!1,h)==="border-box",E=x,I=Q(r,o,h),U="offset"+o[0].toUpperCase()+o.slice(1);if(Dr.test(I)){if(!f)return I;I="auto"}return(!T.boxSizingReliable()&&x||!T.reliableTrDimensions()&&R(r,"tr")||I==="auto"||!parseFloat(I)&&l.css(r,"display",!1,h)==="inline")&&r.getClientRects().length&&(x=l.css(r,"boxSizing",!1,h)==="border-box",E=U in r,E&&(I=r[U])),I=parseFloat(I)||0,I+St(r,o,f||(x?"border":"content"),E,h,I)+"px"}l.extend({cssHooks:{opacity:{get:function(r,o){if(o){var f=Q(r,"opacity");return f===""?"1":f}}}},cssNumber:{animationIterationCount:!0,aspectRatio:!0,borderImageSlice:!0,columnCount:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,gridArea:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnStart:!0,gridRow:!0,gridRowEnd:!0,gridRowStart:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,scale:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeMiterlimit:!0,strokeOpacity:!0},cssProps:{},style:function(r,o,f,h){if(!(!r||r.nodeType===3||r.nodeType===8||!r.style)){var v,x,E,I=b(o),U=Lr.test(o),H=r.style;if(U||(o=Ne(I)),E=l.cssHooks[o]||l.cssHooks[I],f!==void 0){if(x=typeof f,x==="string"&&(v=Le.exec(f))&&v[1]&&(f=Lt(r,o,v),x="number"),f==null||f!==f)return;x==="number"&&!U&&(f+=v&&v[3]||(l.cssNumber[I]?"":"px")),!T.clearCloneStyle&&f===""&&o.indexOf("background")===0&&(H[o]="inherit"),(!E||!("set"in E)||(f=E.set(r,f,h))!==void 0)&&(U?H.setProperty(o,f):H[o]=f)}else return E&&"get"in E&&(v=E.get(r,!1,h))!==void 0?v:H[o]}},css:function(r,o,f,h){var v,x,E,I=b(o),U=Lr.test(o);return U||(o=Ne(I)),E=l.cssHooks[o]||l.cssHooks[I],E&&"get"in E&&(v=E.get(r,!0,f)),v===void 0&&(v=Q(r,o,h)),v==="normal"&&o in Xe&&(v=Xe[o]),f===""||f?(x=parseFloat(v),f===!0||isFinite(x)?x||0:v):v}}),l.each(["height","width"],function(r,o){l.cssHooks[o]={get:function(f,h,v){if(h)return et.test(l.css(f,"display"))&&(!f.getClientRects().length||!f.getBoundingClientRect().width)?A(f,Je,function(){return Gt(f,o,v)}):Gt(f,o,v)},set:function(f,h,v){var x,E=Ki(f),I=!T.scrollboxSize()&&E.position==="absolute",U=I||v,H=U&&l.css(f,"boxSizing",!1,E)==="border-box",ne=v?St(f,o,v,H,E):0;return H&&I&&(ne-=Math.ceil(f["offset"+o[0].toUpperCase()+o.slice(1)]-parseFloat(E[o])-St(f,o,"border",!1,E)-.5)),ne&&(x=Le.exec(h))&&(x[3]||"px")!=="px"&&(f.style[o]=h,h=l.css(f,o)),_t(f,h,ne)}}}),l.cssHooks.marginLeft=ee(T.reliableMarginLeft,function(r,o){if(o)return(parseFloat(Q(r,"marginLeft"))||r.getBoundingClientRect().left-A(r,{marginLeft:0},function(){return r.getBoundingClientRect().left}))+"px"}),l.each({margin:"",padding:"",border:"Width"},function(r,o){l.cssHooks[r+o]={expand:function(f){for(var h=0,v={},x=typeof f=="string"?f.split(" "):[f];h<4;h++)v[r+ke[h]+o]=x[h]||x[h-2]||x[0];return v}},r!=="margin"&&(l.cssHooks[r+o].set=_t)}),l.fn.extend({css:function(r,o){return Fe(this,function(f,h,v){var x,E,I={},U=0;if(Array.isArray(h)){for(x=Ki(f),E=h.length;U<E;U++)I[h[U]]=l.css(f,h[U],!1,x);return I}return v!==void 0?l.style(f,h,v):l.css(f,h)},r,o,arguments.length>1)}});function dt(r,o,f,h,v){return new dt.prototype.init(r,o,f,h,v)}l.Tween=dt,dt.prototype={constructor:dt,init:function(r,o,f,h,v,x){this.elem=r,this.prop=f,this.easing=v||l.easing._default,this.options=o,this.start=this.now=this.cur(),this.end=h,this.unit=x||(l.cssNumber[f]?"":"px")},cur:function(){var r=dt.propHooks[this.prop];return r&&r.get?r.get(this):dt.propHooks._default.get(this)},run:function(r){var o,f=dt.propHooks[this.prop];return this.options.duration?this.pos=o=l.easing[this.easing](r,this.options.duration*r,0,1,this.options.duration):this.pos=o=r,this.now=(this.end-this.start)*o+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),f&&f.set?f.set(this):dt.propHooks._default.set(this),this}},dt.prototype.init.prototype=dt.prototype,dt.propHooks={_default:{get:function(r){var o;return r.elem.nodeType!==1||r.elem[r.prop]!=null&&r.elem.style[r.prop]==null?r.elem[r.prop]:(o=l.css(r.elem,r.prop,""),!o||o==="auto"?0:o)},set:function(r){l.fx.step[r.prop]?l.fx.step[r.prop](r):r.elem.nodeType===1&&(l.cssHooks[r.prop]||r.elem.style[Ne(r.prop)]!=null)?l.style(r.elem,r.prop,r.now+r.unit):r.elem[r.prop]=r.now}}},dt.propHooks.scrollTop=dt.propHooks.scrollLeft={set:function(r){r.elem.nodeType&&r.elem.parentNode&&(r.elem[r.prop]=r.now)}},l.easing={linear:function(r){return r},swing:function(r){return .5-Math.cos(r*Math.PI)/2},_default:"swing"},l.fx=dt.prototype.init,l.fx.step={};var ut,We,jt=/^(?:toggle|show|hide)$/,bt=/queueHooks$/;function cn(){We&&(m.hidden===!1&&e.requestAnimationFrame?e.requestAnimationFrame(cn):e.setTimeout(cn,l.fx.interval),l.fx.tick())}function Zn(){return e.setTimeout(function(){ut=void 0}),ut=Date.now()}function Qt(r,o){var f,h=0,v={height:r};for(o=o?1:0;h<4;h+=2-o)f=ke[h],v["margin"+f]=v["padding"+f]=r;return o&&(v.opacity=v.width=r),v}function hi(r,o,f){for(var h,v=(Ht.tweeners[o]||[]).concat(Ht.tweeners["*"]),x=0,E=v.length;x<E;x++)if(h=v[x].call(f,o,r))return h}function Bt(r,o,f){var h,v,x,E,I,U,H,ne,oe="width"in o||"height"in o,J=this,ge={},tt=r.style,yt=r.nodeType&&nt(r),at=Z.get(r,"fxshow");f.queue||(E=l._queueHooks(r,"fx"),E.unqueued==null&&(E.unqueued=0,I=E.empty.fire,E.empty.fire=function(){E.unqueued||I()}),E.unqueued++,J.always(function(){J.always(function(){E.unqueued--,l.queue(r,"fx").length||E.empty.fire()})}));for(h in o)if(v=o[h],jt.test(v)){if(delete o[h],x=x||v==="toggle",v===(yt?"hide":"show"))if(v==="show"&&at&&at[h]!==void 0)yt=!0;else continue;ge[h]=at&&at[h]||l.style(r,h)}if(U=!l.isEmptyObject(o),!(!U&&l.isEmptyObject(ge))){oe&&r.nodeType===1&&(f.overflow=[tt.overflow,tt.overflowX,tt.overflowY],H=at&&at.display,H==null&&(H=Z.get(r,"display")),ne=l.css(r,"display"),ne==="none"&&(H?ne=H:(ie([r],!0),H=r.style.display||H,ne=l.css(r,"display"),ie([r]))),(ne==="inline"||ne==="inline-block"&&H!=null)&&l.css(r,"float")==="none"&&(U||(J.done(function(){tt.display=H}),H==null&&(ne=tt.display,H=ne==="none"?"":ne)),tt.display="inline-block")),f.overflow&&(tt.overflow="hidden",J.always(function(){tt.overflow=f.overflow[0],tt.overflowX=f.overflow[1],tt.overflowY=f.overflow[2]})),U=!1;for(h in ge)U||(at?"hidden"in at&&(yt=at.hidden):at=Z.access(r,"fxshow",{display:H}),x&&(at.hidden=!yt),yt&&ie([r],!0),J.done(function(){yt||ie([r]),Z.remove(r,"fxshow");for(h in ge)l.style(r,h,ge[h])})),U=hi(yt?at[h]:0,h,J),h in at||(at[h]=U.start,yt&&(U.end=U.start,U.start=0))}}function gn(r,o){var f,h,v,x,E;for(f in r)if(h=b(f),v=o[h],x=r[f],Array.isArray(x)&&(v=x[1],x=r[f]=x[0]),f!==h&&(r[h]=x,delete r[f]),E=l.cssHooks[h],E&&"expand"in E){x=E.expand(x),delete r[h];for(f in x)f in r||(r[f]=x[f],o[f]=v)}else o[h]=v}function Ht(r,o,f){var h,v,x=0,E=Ht.prefilters.length,I=l.Deferred().always(function(){delete U.elem}),U=function(){if(v)return!1;for(var oe=ut||Zn(),J=Math.max(0,H.startTime+H.duration-oe),ge=J/H.duration||0,tt=1-ge,yt=0,at=H.tweens.length;yt<at;yt++)H.tweens[yt].run(tt);return I.notifyWith(r,[H,tt,J]),tt<1&&at?J:(at||I.notifyWith(r,[H,1,0]),I.resolveWith(r,[H]),!1)},H=I.promise({elem:r,props:l.extend({},o),opts:l.extend(!0,{specialEasing:{},easing:l.easing._default},f),originalProperties:o,originalOptions:f,startTime:ut||Zn(),duration:f.duration,tweens:[],createTween:function(oe,J){var ge=l.Tween(r,H.opts,oe,J,H.opts.specialEasing[oe]||H.opts.easing);return H.tweens.push(ge),ge},stop:function(oe){var J=0,ge=oe?H.tweens.length:0;if(v)return this;for(v=!0;J<ge;J++)H.tweens[J].run(1);return oe?(I.notifyWith(r,[H,1,0]),I.resolveWith(r,[H,oe])):I.rejectWith(r,[H,oe]),this}}),ne=H.props;for(gn(ne,H.opts.specialEasing);x<E;x++)if(h=Ht.prefilters[x].call(H,r,ne,H.opts),h)return w(h.stop)&&(l._queueHooks(H.elem,H.opts.queue).stop=h.stop.bind(h)),h;return l.map(ne,hi,H),w(H.opts.start)&&H.opts.start.call(r,H),H.progress(H.opts.progress).done(H.opts.done,H.opts.complete).fail(H.opts.fail).always(H.opts.always),l.fx.timer(l.extend(U,{elem:r,anim:H,queue:H.opts.queue})),H}l.Animation=l.extend(Ht,{tweeners:{"*":[function(r,o){var f=this.createTween(r,o);return Lt(f.elem,r,Le.exec(o),f),f}]},tweener:function(r,o){w(r)?(o=r,r=["*"]):r=r.match(He);for(var f,h=0,v=r.length;h<v;h++)f=r[h],Ht.tweeners[f]=Ht.tweeners[f]||[],Ht.tweeners[f].unshift(o)},prefilters:[Bt],prefilter:function(r,o){o?Ht.prefilters.unshift(r):Ht.prefilters.push(r)}}),l.speed=function(r,o,f){var h=r&&typeof r=="object"?l.extend({},r):{complete:f||!f&&o||w(r)&&r,duration:r,easing:f&&o||o&&!w(o)&&o};return l.fx.off?h.duration=0:typeof h.duration!="number"&&(h.duration in l.fx.speeds?h.duration=l.fx.speeds[h.duration]:h.duration=l.fx.speeds._default),(h.queue==null||h.queue===!0)&&(h.queue="fx"),h.old=h.complete,h.complete=function(){w(h.old)&&h.old.call(this),h.queue&&l.dequeue(this,h.queue)},h},l.fn.extend({fadeTo:function(r,o,f,h){return this.filter(nt).css("opacity",0).show().end().animate({opacity:o},r,f,h)},animate:function(r,o,f,h){var v=l.isEmptyObject(r),x=l.speed(o,f,h),E=function(){var I=Ht(this,l.extend({},r),x);(v||Z.get(this,"finish"))&&I.stop(!0)};return E.finish=E,v||x.queue===!1?this.each(E):this.queue(x.queue,E)},stop:function(r,o,f){var h=function(v){var x=v.stop;delete v.stop,x(f)};return typeof r!="string"&&(f=o,o=r,r=void 0),o&&this.queue(r||"fx",[]),this.each(function(){var v=!0,x=r!=null&&r+"queueHooks",E=l.timers,I=Z.get(this);if(x)I[x]&&I[x].stop&&h(I[x]);else for(x in I)I[x]&&I[x].stop&&bt.test(x)&&h(I[x]);for(x=E.length;x--;)E[x].elem===this&&(r==null||E[x].queue===r)&&(E[x].anim.stop(f),v=!1,E.splice(x,1));(v||!f)&&l.dequeue(this,r)})},finish:function(r){return r!==!1&&(r=r||"fx"),this.each(function(){var o,f=Z.get(this),h=f[r+"queue"],v=f[r+"queueHooks"],x=l.timers,E=h?h.length:0;for(f.finish=!0,l.queue(this,r,[]),v&&v.stop&&v.stop.call(this,!0),o=x.length;o--;)x[o].elem===this&&x[o].queue===r&&(x[o].anim.stop(!0),x.splice(o,1));for(o=0;o<E;o++)h[o]&&h[o].finish&&h[o].finish.call(this);delete f.finish})}}),l.each(["toggle","show","hide"],function(r,o){var f=l.fn[o];l.fn[o]=function(h,v,x){return h==null||typeof h=="boolean"?f.apply(this,arguments):this.animate(Qt(o,!0),h,v,x)}}),l.each({slideDown:Qt("show"),slideUp:Qt("hide"),slideToggle:Qt("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(r,o){l.fn[r]=function(f,h,v){return this.animate(o,f,h,v)}}),l.timers=[],l.fx.tick=function(){var r,o=0,f=l.timers;for(ut=Date.now();o<f.length;o++)r=f[o],!r()&&f[o]===r&&f.splice(o--,1);f.length||l.fx.stop(),ut=void 0},l.fx.timer=function(r){l.timers.push(r),l.fx.start()},l.fx.interval=13,l.fx.start=function(){We||(We=!0,cn())},l.fx.stop=function(){We=null},l.fx.speeds={slow:600,fast:200,_default:400},l.fn.delay=function(r,o){return r=l.fx&&l.fx.speeds[r]||r,o=o||"fx",this.queue(o,function(f,h){var v=e.setTimeout(f,r);h.stop=function(){e.clearTimeout(v)}})},function(){var r=m.createElement("input"),o=m.createElement("select"),f=o.appendChild(m.createElement("option"));r.type="checkbox",T.checkOn=r.value!=="",T.optSelected=f.selected,r=m.createElement("input"),r.value="t",r.type="radio",T.radioValue=r.value==="t"}();var en,qt=l.expr.attrHandle;l.fn.extend({attr:function(r,o){return Fe(this,l.attr,r,o,arguments.length>1)},removeAttr:function(r){return this.each(function(){l.removeAttr(this,r)})}}),l.extend({attr:function(r,o,f){var h,v,x=r.nodeType;if(!(x===3||x===8||x===2)){if(typeof r.getAttribute>"u")return l.prop(r,o,f);if((x!==1||!l.isXMLDoc(r))&&(v=l.attrHooks[o.toLowerCase()]||(l.expr.match.bool.test(o)?en:void 0)),f!==void 0){if(f===null){l.removeAttr(r,o);return}return v&&"set"in v&&(h=v.set(r,f,o))!==void 0?h:(r.setAttribute(o,f+""),f)}return v&&"get"in v&&(h=v.get(r,o))!==null?h:(h=l.find.attr(r,o),h??void 0)}},attrHooks:{type:{set:function(r,o){if(!T.radioValue&&o==="radio"&&R(r,"input")){var f=r.value;return r.setAttribute("type",o),f&&(r.value=f),o}}}},removeAttr:function(r,o){var f,h=0,v=o&&o.match(He);if(v&&r.nodeType===1)for(;f=v[h++];)r.removeAttribute(f)}}),en={set:function(r,o,f){return o===!1?l.removeAttr(r,f):r.setAttribute(f,f),f}},l.each(l.expr.match.bool.source.match(/\w+/g),function(r,o){var f=qt[o]||l.find.attr;qt[o]=function(h,v,x){var E,I,U=v.toLowerCase();return x||(I=qt[U],qt[U]=E,E=f(h,v,x)!=null?U:null,qt[U]=I),E}});var Ur=/^(?:input|select|textarea|button)$/i,Jn=/^(?:a|area)$/i;l.fn.extend({prop:function(r,o){return Fe(this,l.prop,r,o,arguments.length>1)},removeProp:function(r){return this.each(function(){delete this[l.propFix[r]||r]})}}),l.extend({prop:function(r,o,f){var h,v,x=r.nodeType;if(!(x===3||x===8||x===2))return(x!==1||!l.isXMLDoc(r))&&(o=l.propFix[o]||o,v=l.propHooks[o]),f!==void 0?v&&"set"in v&&(h=v.set(r,f,o))!==void 0?h:r[o]=f:v&&"get"in v&&(h=v.get(r,o))!==null?h:r[o]},propHooks:{tabIndex:{get:function(r){var o=l.find.attr(r,"tabindex");return o?parseInt(o,10):Ur.test(r.nodeName)||Jn.test(r.nodeName)&&r.href?0:-1}}},propFix:{for:"htmlFor",class:"className"}}),T.optSelected||(l.propHooks.selected={get:function(r){var o=r.parentNode;return o&&o.parentNode&&o.parentNode.selectedIndex,null},set:function(r){var o=r.parentNode;o&&(o.selectedIndex,o.parentNode&&o.parentNode.selectedIndex)}}),l.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){l.propFix[this.toLowerCase()]=this});function Ci(r){var o=r.match(He)||[];return o.join(" ")}function Ri(r){return r.getAttribute&&r.getAttribute("class")||""}function Ks(r){return Array.isArray(r)?r:typeof r=="string"?r.match(He)||[]:[]}l.fn.extend({addClass:function(r){var o,f,h,v,x,E;return w(r)?this.each(function(I){l(this).addClass(r.call(this,I,Ri(this)))}):(o=Ks(r),o.length?this.each(function(){if(h=Ri(this),f=this.nodeType===1&&" "+Ci(h)+" ",f){for(x=0;x<o.length;x++)v=o[x],f.indexOf(" "+v+" ")<0&&(f+=v+" ");E=Ci(f),h!==E&&this.setAttribute("class",E)}}):this)},removeClass:function(r){var o,f,h,v,x,E;return w(r)?this.each(function(I){l(this).removeClass(r.call(this,I,Ri(this)))}):arguments.length?(o=Ks(r),o.length?this.each(function(){if(h=Ri(this),f=this.nodeType===1&&" "+Ci(h)+" ",f){for(x=0;x<o.length;x++)for(v=o[x];f.indexOf(" "+v+" ")>-1;)f=f.replace(" "+v+" "," ");E=Ci(f),h!==E&&this.setAttribute("class",E)}}):this):this.attr("class","")},toggleClass:function(r,o){var f,h,v,x,E=typeof r,I=E==="string"||Array.isArray(r);return w(r)?this.each(function(U){l(this).toggleClass(r.call(this,U,Ri(this),o),o)}):typeof o=="boolean"&&I?o?this.addClass(r):this.removeClass(r):(f=Ks(r),this.each(function(){if(I)for(x=l(this),v=0;v<f.length;v++)h=f[v],x.hasClass(h)?x.removeClass(h):x.addClass(h);else(r===void 0||E==="boolean")&&(h=Ri(this),h&&Z.set(this,"__className__",h),this.setAttribute&&this.setAttribute("class",h||r===!1?"":Z.get(this,"__className__")||""))}))},hasClass:function(r){var o,f,h=0;for(o=" "+r+" ";f=this[h++];)if(f.nodeType===1&&(" "+Ci(Ri(f))+" ").indexOf(o)>-1)return!0;return!1}});var Kc=/\r/g;l.fn.extend({val:function(r){var o,f,h,v=this[0];return arguments.length?(h=w(r),this.each(function(x){var E;this.nodeType===1&&(h?E=r.call(this,x,l(this).val()):E=r,E==null?E="":typeof E=="number"?E+="":Array.isArray(E)&&(E=l.map(E,function(I){return I==null?"":I+""})),o=l.valHooks[this.type]||l.valHooks[this.nodeName.toLowerCase()],(!o||!("set"in o)||o.set(this,E,"value")===void 0)&&(this.value=E))})):v?(o=l.valHooks[v.type]||l.valHooks[v.nodeName.toLowerCase()],o&&"get"in o&&(f=o.get(v,"value"))!==void 0?f:(f=v.value,typeof f=="string"?f.replace(Kc,""):f??"")):void 0}}),l.extend({valHooks:{option:{get:function(r){var o=l.find.attr(r,"value");return o??Ci(l.text(r))}},select:{get:function(r){var o,f,h,v=r.options,x=r.selectedIndex,E=r.type==="select-one",I=E?null:[],U=E?x+1:v.length;for(x<0?h=U:h=E?x:0;h<U;h++)if(f=v[h],(f.selected||h===x)&&!f.disabled&&(!f.parentNode.disabled||!R(f.parentNode,"optgroup"))){if(o=l(f).val(),E)return o;I.push(o)}return I},set:function(r,o){for(var f,h,v=r.options,x=l.makeArray(o),E=v.length;E--;)h=v[E],(h.selected=l.inArray(l.valHooks.option.get(h),x)>-1)&&(f=!0);return f||(r.selectedIndex=-1),x}}}}),l.each(["radio","checkbox"],function(){l.valHooks[this]={set:function(r,o){if(Array.isArray(o))return r.checked=l.inArray(l(r).val(),o)>-1}},T.checkOn||(l.valHooks[this].get=function(r){return r.getAttribute("value")===null?"on":r.value})});var Ir=e.location,Yo={guid:Date.now()},Zs=/\?/;l.parseXML=function(r){var o,f;if(!r||typeof r!="string")return null;try{o=new e.DOMParser().parseFromString(r,"text/xml")}catch{}return f=o&&o.getElementsByTagName("parsererror")[0],(!o||f)&&l.error("Invalid XML: "+(f?l.map(f.childNodes,function(h){return h.textContent}).join(`
`):r)),o};var jo=/^(?:focusinfocus|focusoutblur)$/,$o=function(r){r.stopPropagation()};l.extend(l.event,{trigger:function(r,o,f,h){var v,x,E,I,U,H,ne,oe,J=[f||m],ge=_.call(r,"type")?r.type:r,tt=_.call(r,"namespace")?r.namespace.split("."):[];if(x=oe=E=f=f||m,!(f.nodeType===3||f.nodeType===8)&&!jo.test(ge+l.event.triggered)&&(ge.indexOf(".")>-1&&(tt=ge.split("."),ge=tt.shift(),tt.sort()),U=ge.indexOf(":")<0&&"on"+ge,r=r[l.expando]?r:new l.Event(ge,typeof r=="object"&&r),r.isTrigger=h?2:3,r.namespace=tt.join("."),r.rnamespace=r.namespace?new RegExp("(^|\\.)"+tt.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,r.result=void 0,r.target||(r.target=f),o=o==null?[r]:l.makeArray(o,[r]),ne=l.event.special[ge]||{},!(!h&&ne.trigger&&ne.trigger.apply(f,o)===!1))){if(!h&&!ne.noBubble&&!S(f)){for(I=ne.delegateType||ge,jo.test(I+ge)||(x=x.parentNode);x;x=x.parentNode)J.push(x),E=x;E===(f.ownerDocument||m)&&J.push(E.defaultView||E.parentWindow||e)}for(v=0;(x=J[v++])&&!r.isPropagationStopped();)oe=x,r.type=v>1?I:ne.bindType||ge,H=(Z.get(x,"events")||Object.create(null))[r.type]&&Z.get(x,"handle"),H&&H.apply(x,o),H=U&&x[U],H&&H.apply&&K(x)&&(r.result=H.apply(x,o),r.result===!1&&r.preventDefault());return r.type=ge,!h&&!r.isDefaultPrevented()&&(!ne._default||ne._default.apply(J.pop(),o)===!1)&&K(f)&&U&&w(f[ge])&&!S(f)&&(E=f[U],E&&(f[U]=null),l.event.triggered=ge,r.isPropagationStopped()&&oe.addEventListener(ge,$o),f[ge](),r.isPropagationStopped()&&oe.removeEventListener(ge,$o),l.event.triggered=void 0,E&&(f[U]=E)),r.result}},simulate:function(r,o,f){var h=l.extend(new l.Event,f,{type:r,isSimulated:!0});l.event.trigger(h,null,o)}}),l.fn.extend({trigger:function(r,o){return this.each(function(){l.event.trigger(r,o,this)})},triggerHandler:function(r,o){var f=this[0];if(f)return l.event.trigger(r,o,f,!0)}});var Zc=/\[\]$/,Ko=/\r?\n/g,Jc=/^(?:submit|button|image|reset|file)$/i,Qc=/^(?:input|select|textarea|keygen)/i;function Js(r,o,f,h){var v;if(Array.isArray(o))l.each(o,function(x,E){f||Zc.test(r)?h(r,E):Js(r+"["+(typeof E=="object"&&E!=null?x:"")+"]",E,f,h)});else if(!f&&L(o)==="object")for(v in o)Js(r+"["+v+"]",o[v],f,h);else h(r,o)}l.param=function(r,o){var f,h=[],v=function(x,E){var I=w(E)?E():E;h[h.length]=encodeURIComponent(x)+"="+encodeURIComponent(I??"")};if(r==null)return"";if(Array.isArray(r)||r.jquery&&!l.isPlainObject(r))l.each(r,function(){v(this.name,this.value)});else for(f in r)Js(f,r[f],o,v);return h.join("&")},l.fn.extend({serialize:function(){return l.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var r=l.prop(this,"elements");return r?l.makeArray(r):this}).filter(function(){var r=this.type;return this.name&&!l(this).is(":disabled")&&Qc.test(this.nodeName)&&!Jc.test(r)&&(this.checked||!fe.test(r))}).map(function(r,o){var f=l(this).val();return f==null?null:Array.isArray(f)?l.map(f,function(h){return{name:o.name,value:h.replace(Ko,`\r
`)}}):{name:o.name,value:f.replace(Ko,`\r
`)}}).get()}});var eu=/%20/g,tu=/#.*$/,nu=/([?&])_=[^&]*/,iu=/^(.*?):[ \t]*([^\r\n]*)$/mg,ru=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,su=/^(?:GET|HEAD)$/,au=/^\/\//,Zo={},Qs={},Jo="*/".concat("*"),ea=m.createElement("a");ea.href=Ir.href;function Qo(r){return function(o,f){typeof o!="string"&&(f=o,o="*");var h,v=0,x=o.toLowerCase().match(He)||[];if(w(f))for(;h=x[v++];)h[0]==="+"?(h=h.slice(1)||"*",(r[h]=r[h]||[]).unshift(f)):(r[h]=r[h]||[]).push(f)}}function el(r,o,f,h){var v={},x=r===Qs;function E(I){var U;return v[I]=!0,l.each(r[I]||[],function(H,ne){var oe=ne(o,f,h);if(typeof oe=="string"&&!x&&!v[oe])return o.dataTypes.unshift(oe),E(oe),!1;if(x)return!(U=oe)}),U}return E(o.dataTypes[0])||!v["*"]&&E("*")}function ta(r,o){var f,h,v=l.ajaxSettings.flatOptions||{};for(f in o)o[f]!==void 0&&((v[f]?r:h||(h={}))[f]=o[f]);return h&&l.extend(!0,r,h),r}function ou(r,o,f){for(var h,v,x,E,I=r.contents,U=r.dataTypes;U[0]==="*";)U.shift(),h===void 0&&(h=r.mimeType||o.getResponseHeader("Content-Type"));if(h){for(v in I)if(I[v]&&I[v].test(h)){U.unshift(v);break}}if(U[0]in f)x=U[0];else{for(v in f){if(!U[0]||r.converters[v+" "+U[0]]){x=v;break}E||(E=v)}x=x||E}if(x)return x!==U[0]&&U.unshift(x),f[x]}function lu(r,o,f,h){var v,x,E,I,U,H={},ne=r.dataTypes.slice();if(ne[1])for(E in r.converters)H[E.toLowerCase()]=r.converters[E];for(x=ne.shift();x;)if(r.responseFields[x]&&(f[r.responseFields[x]]=o),!U&&h&&r.dataFilter&&(o=r.dataFilter(o,r.dataType)),U=x,x=ne.shift(),x){if(x==="*")x=U;else if(U!=="*"&&U!==x){if(E=H[U+" "+x]||H["* "+x],!E){for(v in H)if(I=v.split(" "),I[1]===x&&(E=H[U+" "+I[0]]||H["* "+I[0]],E)){E===!0?E=H[v]:H[v]!==!0&&(x=I[0],ne.unshift(I[1]));break}}if(E!==!0)if(E&&r.throws)o=E(o);else try{o=E(o)}catch(oe){return{state:"parsererror",error:E?oe:"No conversion from "+U+" to "+x}}}}return{state:"success",data:o}}l.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Ir.href,type:"GET",isLocal:ru.test(Ir.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Jo,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":JSON.parse,"text xml":l.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(r,o){return o?ta(ta(r,l.ajaxSettings),o):ta(l.ajaxSettings,r)},ajaxPrefilter:Qo(Zo),ajaxTransport:Qo(Qs),ajax:function(r,o){typeof r=="object"&&(o=r,r=void 0),o=o||{};var f,h,v,x,E,I,U,H,ne,oe,J=l.ajaxSetup({},o),ge=J.context||J,tt=J.context&&(ge.nodeType||ge.jquery)?l(ge):l.event,yt=l.Deferred(),at=l.Callbacks("once memory"),rn=J.statusCode||{},$t={},Bn={},zn="canceled",vt={readyState:0,getResponseHeader:function(Tt){var Wt;if(U){if(!x)for(x={};Wt=iu.exec(v);)x[Wt[1].toLowerCase()+" "]=(x[Wt[1].toLowerCase()+" "]||[]).concat(Wt[2]);Wt=x[Tt.toLowerCase()+" "]}return Wt==null?null:Wt.join(", ")},getAllResponseHeaders:function(){return U?v:null},setRequestHeader:function(Tt,Wt){return U==null&&(Tt=Bn[Tt.toLowerCase()]=Bn[Tt.toLowerCase()]||Tt,$t[Tt]=Wt),this},overrideMimeType:function(Tt){return U==null&&(J.mimeType=Tt),this},statusCode:function(Tt){var Wt;if(Tt)if(U)vt.always(Tt[vt.status]);else for(Wt in Tt)rn[Wt]=[rn[Wt],Tt[Wt]];return this},abort:function(Tt){var Wt=Tt||zn;return f&&f.abort(Wt),Pi(0,Wt),this}};if(yt.promise(vt),J.url=((r||J.url||Ir.href)+"").replace(au,Ir.protocol+"//"),J.type=o.method||o.type||J.method||J.type,J.dataTypes=(J.dataType||"*").toLowerCase().match(He)||[""],J.crossDomain==null){I=m.createElement("a");try{I.href=J.url,I.href=I.href,J.crossDomain=ea.protocol+"//"+ea.host!=I.protocol+"//"+I.host}catch{J.crossDomain=!0}}if(J.data&&J.processData&&typeof J.data!="string"&&(J.data=l.param(J.data,J.traditional)),el(Zo,J,o,vt),U)return vt;H=l.event&&J.global,H&&l.active++===0&&l.event.trigger("ajaxStart"),J.type=J.type.toUpperCase(),J.hasContent=!su.test(J.type),h=J.url.replace(tu,""),J.hasContent?J.data&&J.processData&&(J.contentType||"").indexOf("application/x-www-form-urlencoded")===0&&(J.data=J.data.replace(eu,"+")):(oe=J.url.slice(h.length),J.data&&(J.processData||typeof J.data=="string")&&(h+=(Zs.test(h)?"&":"?")+J.data,delete J.data),J.cache===!1&&(h=h.replace(nu,"$1"),oe=(Zs.test(h)?"&":"?")+"_="+Yo.guid+++oe),J.url=h+oe),J.ifModified&&(l.lastModified[h]&&vt.setRequestHeader("If-Modified-Since",l.lastModified[h]),l.etag[h]&&vt.setRequestHeader("If-None-Match",l.etag[h])),(J.data&&J.hasContent&&J.contentType!==!1||o.contentType)&&vt.setRequestHeader("Content-Type",J.contentType),vt.setRequestHeader("Accept",J.dataTypes[0]&&J.accepts[J.dataTypes[0]]?J.accepts[J.dataTypes[0]]+(J.dataTypes[0]!=="*"?", "+Jo+"; q=0.01":""):J.accepts["*"]);for(ne in J.headers)vt.setRequestHeader(ne,J.headers[ne]);if(J.beforeSend&&(J.beforeSend.call(ge,vt,J)===!1||U))return vt.abort();if(zn="abort",at.add(J.complete),vt.done(J.success),vt.fail(J.error),f=el(Qs,J,o,vt),!f)Pi(-1,"No Transport");else{if(vt.readyState=1,H&&tt.trigger("ajaxSend",[vt,J]),U)return vt;J.async&&J.timeout>0&&(E=e.setTimeout(function(){vt.abort("timeout")},J.timeout));try{U=!1,f.send($t,Pi)}catch(Tt){if(U)throw Tt;Pi(-1,Tt)}}function Pi(Tt,Wt,Fr,ia){var Hn,Or,kn,di,pi,bn=Wt;U||(U=!0,E&&e.clearTimeout(E),f=void 0,v=ia||"",vt.readyState=Tt>0?4:0,Hn=Tt>=200&&Tt<300||Tt===304,Fr&&(di=ou(J,vt,Fr)),!Hn&&l.inArray("script",J.dataTypes)>-1&&l.inArray("json",J.dataTypes)<0&&(J.converters["text script"]=function(){}),di=lu(J,di,vt,Hn),Hn?(J.ifModified&&(pi=vt.getResponseHeader("Last-Modified"),pi&&(l.lastModified[h]=pi),pi=vt.getResponseHeader("etag"),pi&&(l.etag[h]=pi)),Tt===204||J.type==="HEAD"?bn="nocontent":Tt===304?bn="notmodified":(bn=di.state,Or=di.data,kn=di.error,Hn=!kn)):(kn=bn,(Tt||!bn)&&(bn="error",Tt<0&&(Tt=0))),vt.status=Tt,vt.statusText=(Wt||bn)+"",Hn?yt.resolveWith(ge,[Or,bn,vt]):yt.rejectWith(ge,[vt,bn,kn]),vt.statusCode(rn),rn=void 0,H&&tt.trigger(Hn?"ajaxSuccess":"ajaxError",[vt,J,Hn?Or:kn]),at.fireWith(ge,[vt,bn]),H&&(tt.trigger("ajaxComplete",[vt,J]),--l.active||l.event.trigger("ajaxStop")))}return vt},getJSON:function(r,o,f){return l.get(r,o,f,"json")},getScript:function(r,o){return l.get(r,void 0,o,"script")}}),l.each(["get","post"],function(r,o){l[o]=function(f,h,v,x){return w(h)&&(x=x||v,v=h,h=void 0),l.ajax(l.extend({url:f,type:o,dataType:x,data:h,success:v},l.isPlainObject(f)&&f))}}),l.ajaxPrefilter(function(r){var o;for(o in r.headers)o.toLowerCase()==="content-type"&&(r.contentType=r.headers[o]||"")}),l._evalUrl=function(r,o,f){return l.ajax({url:r,type:"GET",dataType:"script",cache:!0,async:!1,global:!1,converters:{"text script":function(){}},dataFilter:function(h){l.globalEval(h,o,f)}})},l.fn.extend({wrapAll:function(r){var o;return this[0]&&(w(r)&&(r=r.call(this[0])),o=l(r,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&o.insertBefore(this[0]),o.map(function(){for(var f=this;f.firstElementChild;)f=f.firstElementChild;return f}).append(this)),this},wrapInner:function(r){return w(r)?this.each(function(o){l(this).wrapInner(r.call(this,o))}):this.each(function(){var o=l(this),f=o.contents();f.length?f.wrapAll(r):o.append(r)})},wrap:function(r){var o=w(r);return this.each(function(f){l(this).wrapAll(o?r.call(this,f):r)})},unwrap:function(r){return this.parent(r).not("body").each(function(){l(this).replaceWith(this.childNodes)}),this}}),l.expr.pseudos.hidden=function(r){return!l.expr.pseudos.visible(r)},l.expr.pseudos.visible=function(r){return!!(r.offsetWidth||r.offsetHeight||r.getClientRects().length)},l.ajaxSettings.xhr=function(){try{return new e.XMLHttpRequest}catch{}};var cu={0:200,1223:204},Nr=l.ajaxSettings.xhr();T.cors=!!Nr&&"withCredentials"in Nr,T.ajax=Nr=!!Nr,l.ajaxTransport(function(r){var o,f;if(T.cors||Nr&&!r.crossDomain)return{send:function(h,v){var x,E=r.xhr();if(E.open(r.type,r.url,r.async,r.username,r.password),r.xhrFields)for(x in r.xhrFields)E[x]=r.xhrFields[x];r.mimeType&&E.overrideMimeType&&E.overrideMimeType(r.mimeType),!r.crossDomain&&!h["X-Requested-With"]&&(h["X-Requested-With"]="XMLHttpRequest");for(x in h)E.setRequestHeader(x,h[x]);o=function(I){return function(){o&&(o=f=E.onload=E.onerror=E.onabort=E.ontimeout=E.onreadystatechange=null,I==="abort"?E.abort():I==="error"?typeof E.status!="number"?v(0,"error"):v(E.status,E.statusText):v(cu[E.status]||E.status,E.statusText,(E.responseType||"text")!=="text"||typeof E.responseText!="string"?{binary:E.response}:{text:E.responseText},E.getAllResponseHeaders()))}},E.onload=o(),f=E.onerror=E.ontimeout=o("error"),E.onabort!==void 0?E.onabort=f:E.onreadystatechange=function(){E.readyState===4&&e.setTimeout(function(){o&&f()})},o=o("abort");try{E.send(r.hasContent&&r.data||null)}catch(I){if(o)throw I}},abort:function(){o&&o()}}}),l.ajaxPrefilter(function(r){r.crossDomain&&(r.contents.script=!1)}),l.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(r){return l.globalEval(r),r}}}),l.ajaxPrefilter("script",function(r){r.cache===void 0&&(r.cache=!1),r.crossDomain&&(r.type="GET")}),l.ajaxTransport("script",function(r){if(r.crossDomain||r.scriptAttrs){var o,f;return{send:function(h,v){o=l("<script>").attr(r.scriptAttrs||{}).prop({charset:r.scriptCharset,src:r.url}).on("load error",f=function(x){o.remove(),f=null,x&&v(x.type==="error"?404:200,x.type)}),m.head.appendChild(o[0])},abort:function(){f&&f()}}}});var tl=[],na=/(=)\?(?=&|$)|\?\?/;l.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var r=tl.pop()||l.expando+"_"+Yo.guid++;return this[r]=!0,r}}),l.ajaxPrefilter("json jsonp",function(r,o,f){var h,v,x,E=r.jsonp!==!1&&(na.test(r.url)?"url":typeof r.data=="string"&&(r.contentType||"").indexOf("application/x-www-form-urlencoded")===0&&na.test(r.data)&&"data");if(E||r.dataTypes[0]==="jsonp")return h=r.jsonpCallback=w(r.jsonpCallback)?r.jsonpCallback():r.jsonpCallback,E?r[E]=r[E].replace(na,"$1"+h):r.jsonp!==!1&&(r.url+=(Zs.test(r.url)?"&":"?")+r.jsonp+"="+h),r.converters["script json"]=function(){return x||l.error(h+" was not called"),x[0]},r.dataTypes[0]="json",v=e[h],e[h]=function(){x=arguments},f.always(function(){v===void 0?l(e).removeProp(h):e[h]=v,r[h]&&(r.jsonpCallback=o.jsonpCallback,tl.push(h)),x&&w(v)&&v(x[0]),x=v=void 0}),"script"}),T.createHTMLDocument=function(){var r=m.implementation.createHTMLDocument("").body;return r.innerHTML="<form></form><form></form>",r.childNodes.length===2}(),l.parseHTML=function(r,o,f){if(typeof r!="string")return[];typeof o=="boolean"&&(f=o,o=!1);var h,v,x;return o||(T.createHTMLDocument?(o=m.implementation.createHTMLDocument(""),h=o.createElement("base"),h.href=m.location.href,o.head.appendChild(h)):o=m),v=st.exec(r),x=!f&&[],v?[o.createElement(v[1])]:(v=mn([r],o,x),x&&x.length&&l(x).remove(),l.merge([],v.childNodes))},l.fn.load=function(r,o,f){var h,v,x,E=this,I=r.indexOf(" ");return I>-1&&(h=Ci(r.slice(I)),r=r.slice(0,I)),w(o)?(f=o,o=void 0):o&&typeof o=="object"&&(v="POST"),E.length>0&&l.ajax({url:r,type:v||"GET",dataType:"html",data:o}).done(function(U){x=arguments,E.html(h?l("<div>").append(l.parseHTML(U)).find(h):U)}).always(f&&function(U,H){E.each(function(){f.apply(this,x||[U.responseText,H,U])})}),this},l.expr.pseudos.animated=function(r){return l.grep(l.timers,function(o){return r===o.elem}).length},l.offset={setOffset:function(r,o,f){var h,v,x,E,I,U,H,ne=l.css(r,"position"),oe=l(r),J={};ne==="static"&&(r.style.position="relative"),I=oe.offset(),x=l.css(r,"top"),U=l.css(r,"left"),H=(ne==="absolute"||ne==="fixed")&&(x+U).indexOf("auto")>-1,H?(h=oe.position(),E=h.top,v=h.left):(E=parseFloat(x)||0,v=parseFloat(U)||0),w(o)&&(o=o.call(r,f,l.extend({},I))),o.top!=null&&(J.top=o.top-I.top+E),o.left!=null&&(J.left=o.left-I.left+v),"using"in o?o.using.call(r,J):oe.css(J)}},l.fn.extend({offset:function(r){if(arguments.length)return r===void 0?this:this.each(function(v){l.offset.setOffset(this,r,v)});var o,f,h=this[0];if(h)return h.getClientRects().length?(o=h.getBoundingClientRect(),f=h.ownerDocument.defaultView,{top:o.top+f.pageYOffset,left:o.left+f.pageXOffset}):{top:0,left:0}},position:function(){if(this[0]){var r,o,f,h=this[0],v={top:0,left:0};if(l.css(h,"position")==="fixed")o=h.getBoundingClientRect();else{for(o=this.offset(),f=h.ownerDocument,r=h.offsetParent||f.documentElement;r&&(r===f.body||r===f.documentElement)&&l.css(r,"position")==="static";)r=r.parentNode;r&&r!==h&&r.nodeType===1&&(v=l(r).offset(),v.top+=l.css(r,"borderTopWidth",!0),v.left+=l.css(r,"borderLeftWidth",!0))}return{top:o.top-v.top-l.css(h,"marginTop",!0),left:o.left-v.left-l.css(h,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){for(var r=this.offsetParent;r&&l.css(r,"position")==="static";)r=r.offsetParent;return r||Ye})}}),l.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(r,o){var f=o==="pageYOffset";l.fn[r]=function(h){return Fe(this,function(v,x,E){var I;if(S(v)?I=v:v.nodeType===9&&(I=v.defaultView),E===void 0)return I?I[o]:v[x];I?I.scrollTo(f?I.pageXOffset:E,f?E:I.pageYOffset):v[x]=E},r,h,arguments.length)}}),l.each(["top","left"],function(r,o){l.cssHooks[o]=ee(T.pixelPosition,function(f,h){if(h)return h=Q(f,o),Dr.test(h)?l(f).position()[o]+"px":h})}),l.each({Height:"height",Width:"width"},function(r,o){l.each({padding:"inner"+r,content:o,"":"outer"+r},function(f,h){l.fn[h]=function(v,x){var E=arguments.length&&(f||typeof v!="boolean"),I=f||(v===!0||x===!0?"margin":"border");return Fe(this,function(U,H,ne){var oe;return S(U)?h.indexOf("outer")===0?U["inner"+r]:U.document.documentElement["client"+r]:U.nodeType===9?(oe=U.documentElement,Math.max(U.body["scroll"+r],oe["scroll"+r],U.body["offset"+r],oe["offset"+r],oe["client"+r])):ne===void 0?l.css(U,H,I):l.style(U,H,ne,I)},o,E?v:void 0,E)}})}),l.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(r,o){l.fn[o]=function(f){return this.on(o,f)}}),l.fn.extend({bind:function(r,o,f){return this.on(r,null,o,f)},unbind:function(r,o){return this.off(r,null,o)},delegate:function(r,o,f,h){return this.on(o,r,f,h)},undelegate:function(r,o,f){return arguments.length===1?this.off(r,"**"):this.off(o,r||"**",f)},hover:function(r,o){return this.on("mouseenter",r).on("mouseleave",o||r)}}),l.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),function(r,o){l.fn[o]=function(f,h){return arguments.length>0?this.on(o,null,f,h):this.trigger(o)}});var uu=/^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;l.proxy=function(r,o){var f,h,v;if(typeof o=="string"&&(f=r[o],o=r,r=f),!!w(r))return h=a.call(arguments,2),v=function(){return r.apply(o||this,h.concat(a.call(arguments)))},v.guid=r.guid=r.guid||l.guid++,v},l.holdReady=function(r){r?l.readyWait++:l.ready(!0)},l.isArray=Array.isArray,l.parseJSON=JSON.parse,l.nodeName=R,l.isFunction=w,l.isWindow=S,l.camelCase=b,l.type=L,l.now=Date.now,l.isNumeric=function(r){var o=l.type(r);return(o==="number"||o==="string")&&!isNaN(r-parseFloat(r))},l.trim=function(r){return r==null?"":(r+"").replace(uu,"$1")};var fu=e.jQuery,hu=e.$;return l.noConflict=function(r){return e.$===l&&(e.$=hu),r&&e.jQuery===l&&(e.jQuery=fu),l},typeof t>"u"&&(e.jQuery=e.$=l),l})}(Vs)),Vs.exports}var t_=e_();const ln=Jg(t_);document.getElementById("closeBtn").addEventListener("click",()=>{document.getElementById("cloud").style.display="none"});var Hc=-.05,n_=-.05,lc=!0,kc=!1,Vc=[],Ot={data:null,structure:null},Is=.02;const Gc=[],Wc=[],wo=[],Co=[],Ro=[];var Xc=!0,Kt={active:!0,state:"closed",scale:.02,counter:0,min:0,max:90},Xs=[];const Tr=new Jf,Xi=document.getElementById("screen");Xi.style.imageRendering="pixelated";console.log(window.innerWidth);const Xo=new Zg({canvas:Xi,alpha:!0,premultipliedAlpha:!1}),qc=window.innerWidth/3,Yc=window.innerHeight/3;Xo.setSize(qc,Yc,!1);Xo.setPixelRatio(1);var br=new Sn(60,qc/Yc,.1,10);const yn=new nn;yn.add(br);const Et=new nn;Et.position.set(0,0,0);Et.add(yn);Tr.add(Et);const i_=document.getElementById("mouseButton");i_.addEventListener("click",()=>{Xi.requestPointerLock()});let jc=!1;document.addEventListener("pointerlockchange",()=>{jc=document.pointerLockElement==Xi});document.addEventListener("mousemove",i=>{if(!jc)return;const e=i.movementX||0,t=i.movementY||0;Et.rotation.y-=e*.002,yn.rotation.x-=t*.002;const n=Yr.degToRad(80),s=Yr.degToRad(-80);yn.rotation.x=Math.max(s,Math.min(n,yn.rotation.x)),br.rotation.z=0});const $c=[];function r_(){const i=Yr.degToRad(3),e=new Set;let t=!0,n={isJumping:!1,size:.5,startY:0,targetY:0,startTime:0,duration:200};window.addEventListener("keydown",u=>e.add(u.key.toLowerCase())),window.addEventListener("keyup",u=>e.delete(u.key.toLowerCase()));function s(u){const d=new On().setFromCenterAndSize(u,new X(.4,1,.4));let p=$c.some(g=>g.intersectsBox(d));return p||(p=Xs.some(g=>g.box.intersectsBox(d))),p}function a(u){const d=Et.position.clone().add(u);if(kc||!s(d))return Et.position.add(u),!0;const p=new X(u.x,0,0),g=Et.position.clone().add(p),_=!s(g),M=new X(0,0,u.z),y=Et.position.clone().add(M),T=!s(y);return _&&Et.position.add(p),T&&Et.position.add(M),_||T}function c(){const u=e.has("shift");let d=!1;const p=new X(-Math.sin(Et.rotation.y),0,-Math.cos(Et.rotation.y)).normalize();if(e.has("escape")&&(console.log("esc"),Xc=!1),e.has("w")&&(u?d||(d=a(new X(0,Is,0))):d||(d=a(p.clone().multiplyScalar(Is)))),e.has("s")&&(u?d||(d=a(new X(0,-.02,0))):d||(d=a(p.clone().multiplyScalar(-.02)))),e.has("a"))if(u){const _=new X().crossVectors(br.up,p).normalize().multiplyScalar(Is);d||(d=a(_))}else Et.rotation.y+=i,d=!0;if(e.has("d"))if(u){const _=new X().crossVectors(p,br.up).normalize().multiplyScalar(Is);d||(d=a(_))}else Et.rotation.y-=i,d=!0;const g=Yr.degToRad(80);if(e.has("pagedown")&&(yn.rotation.x-=i,yn.rotation.x=Math.max(-g,Math.min(g,yn.rotation.x))),e.has("pageup")&&(yn.rotation.x+=i,yn.rotation.x=Math.max(-g,Math.min(g,yn.rotation.x))),e.has(" ")&&t&&!n.isJumping&&(n.isJumping=!0,n.startY=Et.position.y,n.targetY=Et.position.y+n.size,n.startTime=performance.now(),t=!1),n.isJumping){const _=performance.now()-n.startTime,M=Math.min(_/n.duration,1),y=Yr.lerp(n.startY,n.targetY,M),T=new X(0,y-Et.position.y,0),w=Et.position.clone().add(T);s(w)?n.isJumping=!1:Et.position.y=y,M>=1&&(n.isJumping=!1)}if(!n.isJumping){const _=new X(0,Hc,0),M=Et.position.clone().add(_);s(M)?t=!0:(Et.position.add(_),t=!1)}return d}return c}ln(document).on("keydown",i=>{i.key=="i"&&(console.log("map.player"),console.log(Ot.player.x),console.log(Ot.player.y),console.log(Ot.player.z),console.log(Ot.player.fYaw),console.log(Ot.player.fXaw))});function gr(i,e){if(Array.isArray(i))return i.map(t=>gr(t,e));if(i!==null&&typeof i=="object"){let t={};for(let n in i)i.hasOwnProperty(n)&&(t[n]=n=="visible"&&e==!0?1:gr(i[n],e));return t}return i}async function qo(i,e){const t="https://tuccmann.com/3deditor/editor.php";try{const n=await ln.ajax({url:t,type:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:i});return e?n:JSON.parse(n)}catch{}}async function s_(i,e,t=100){const n=new oh,s=e.length,a=[];for(const y of e)try{const T=y+".png",w=await new Promise((S,m)=>{n.load(T,S,void 0,()=>m(new Error(`Nem sikerült betölteni: ${T}`)))});a.push(w)}catch(T){console.error(`Hiba a kép betöltésekor: ${T.message}`)}const c=a[0].width,u=a[0].height,d=document.createElement("canvas");d.width=c*s,d.height=u;const p=d.getContext("2d",{alpha:!0});a.forEach((y,T)=>{const w=T*c;p.drawImage(y,w,0)});const g=new th(d);g.minFilter=En,g.magFilter=En,g.generateMipmaps=!1,g.wrapS=jr,g.wrapT=jr,g.repeat.set(1/s,1),g.offset.set(0,0);let _=0;const M=a.length;return M>1&&setInterval(()=>{_=(_+1)%M,g.offset.x=_/s,g.needsUpdate=!0},t),g}async function a_(i){const e=await qo({ajax:!0,load:!0,filename:i});if(console.log(e),e!=null&&e.data&&(e!=null&&e.structure)&&(Ot.data=gr(e.data,!0),Ot.structure=gr(e.structure,!0),Ot.player=gr(e.player),Ot.lights=gr(e.lights)),Ot.data){Ot!=null&&Ot.player?(console.log("Player DATAS",Ot.player),Et.position.x=Ot.player.x,Et.position.y=Ot.player.y,Et.position.z=-Ot.player.z/7,Et.rotation.y-=Ot.player.fYaw,yn.rotation.x-=Ot.player.fXaw):(Et.position.x=.5,Et.position.y=0,Et.position.z=.5);for(let t of Ot.data){const n=new pr;for(let s of t.tris){let a=null;if(s.texture.name){let M=Object.values(Vc[s.texture.name]);a=await s_(s.texture.name,M,500)}const c=new wi,u=new Float32Array([s.p[0].x,s.p[0].y,s.p[0].z,s.p[1].x,s.p[1].y,s.p[1].z,s.p[2].x,s.p[2].y,s.p[2].z]);c.setAttribute("position",new Rn(u,3));const d=new Float32Array([s.t[0].u,1-s.t[0].v,s.t[1].u,1-s.t[1].v,s.t[2].u,1-s.t[2].v]);c.setAttribute("uv",new Rn(d,2)),c.computeVertexNormals();const p=new nh({map:a,side:Wn,transparent:!0,opacity:1,alphaTest:.01}),g=new qn(c,p);n.add(g),t!=null&&t.actions&&t.actions.includes("1")&&Wc.push(g),t.name=="chees"&&wo.push(g),t.name=="salad"&&Co.push(g),t.name=="Ketchup"&&Ro.push(g),c.computeBoundingBox();const _=c.boundingBox.clone();_.min.add(g.position),_.max.add(g.position),$c.push(_)}if(t!=null&&t.actions&&(t.actions.includes("2")||t.actions.includes("1"))){const s=new On().setFromObject(n),a=new pr;a.position.set(s.min.x,s.min.y,s.max.z),n.position.sub(a.position),a.add(n),Tr.add(a),Gc.push(a),Xs.push({object:a,box:new On})}else Tr.add(n)}}}async function o_(){const i=await qo({ajax:!0,gettexturestructure:!0});if(i!=null&&i.structure)for(const e in i.structure){let t=Object.keys(i.structure[e]);for(let n of t)Vc[n]=i.structure[e][n]}else throw"Textures didn't load."}async function l_(){await o_();const i=await qo({ajax:!0,getfiles:!0});if(i!=null&&i.files){console.log(i.files);let s="";for(const a of i.files)s+=`<span class="filename" style="margin-left:10px;margin-right:10px;color:white;cursor:pointer;">${a.name}</span>`;ln("#filelist-container").append(s)}ln("#loading").hide(),ln("#gravity-button").on("click",function(){Hc=ln(this).prop("checked")?n_:0}),ln("#lights-button").on("click",function(){lc=ln(this).prop("checked")}),ln("#ghost-button").on("click",function(){kc=ln(this).prop("checked")}),ln("#filelist-container .filename").on("click",function(){ln("#file-input").val(ln(this).text())}),await new Promise((s,a)=>{ln("#closeBtn").on("click",()=>{s()})}),ln("#cloud").hide();const e=ln("input[name='filename']").val();await a_(e);const t=new ph,n=new Ct;if(Xi.addEventListener("mousedown",s=>{n.x=s.clientX/Xi.clientWidth*2-1,n.y=-(s.clientY/Xi.clientHeight)*2+1,t.setFromCamera(n,br);const a=t.intersectObjects(Wc,!0);a.length>0&&(console.clear(),console.log("A Hűtő messze van..."),console.log(a[0].distance),a[0].distance<.8&&(console.log("HŰTŐ: "+Kt.state+" !!!"),Kt.active=!Kt.active)),t.intersectObjects(wo,!0).length>0&&wo.forEach(p=>{p.visible=!p.visible}),t.intersectObjects(Co,!0).length>0&&Co.forEach(p=>{p.visible=!p.visible}),t.intersectObjects(Ro,!0).length>0&&Ro.forEach(p=>{p.visible=!p.visible})}),console.log(Ot.lights),lc){if(Ot!=null&&Ot.lights&&Ot.lights.length>0){for(const s of Ot.lights)if(s.visible){console.log(s.color),console.log(s.intensity),console.log(s.distance),console.log(s.type);let a=new wt(parseInt(s.color,16)),c=null;s.type=="point"?c=new ch(a,s.intensity,s.distance*5):s.type=="direction"&&(c=new fh(a,s.intensity)),c&&(c.position.set(s.p.x,s.p.y,s.p.z),Tr.add(c))}}}else{console.log("NINCSEN");const s=new hh(16777215,1);Tr.add(s)}c_()}function c_(){const i=r_();function e(){Xc&&requestAnimationFrame(e);for(const t of Xs)t.box.copy(new On().setFromObject(t.object));for(const t of Gc){const n=Xs.find(a=>a.object===t);if(!n)continue;let s=0;if(Kt.active){Kt.state=="closed"?s=Kt.scale:Kt.state=="opened"&&(s=-.02),t.rotation.y+=s;const a=new On().setFromObject(t);new On().setFromCenterAndSize(Et.position.clone(),new X(.5,1,.5)).intersectsBox(a)?t.rotation.y-=s:(n.box.copy(a),Kt.state=="closed"?(Kt.counter++,Kt.counter==Kt.max&&(Kt.active=!1,Kt.state="opened")):Kt.state=="opened"&&(Kt.counter--,Kt.counter==Kt.min&&(Kt.active=!1,Kt.state="closed")))}}i(),Xo.render(Tr,br),Ot.player={x:Et.position.x,y:Et.position.y,z:Et.position.z,fYaw:Et.rotation.y,fXaw:yn.rotation.x}}e()}l_();
