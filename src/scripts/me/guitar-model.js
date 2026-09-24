import {t} from './language.js';
import * as THREE from '../../vendor/three/three.module.min.js';

// Photo coordinates keep this guitar's wear and hardware positions together.
// ponytail: photo-projected front, measured relief hardware; unseen back remains approximate.
const S=.00031, X=x=>(x-540)*S, Y=y=>(1000-y)*S;
const limit=(n,a,b)=>Math.max(a,Math.min(b,n));
const stage=document.querySelector('.guitar-stage');
const dialog=document.querySelector('#guitar-closeup');
const canvas=document.createElement('canvas');
canvas.id='guitar-model';canvas.tabIndex=0;
canvas.setAttribute('aria-label',t("三维吉他。拖动转动，滚轮缩放，方向键转动，空格复位。","3D guitar. Drag or use arrow keys to turn, scroll to zoom, and press Space to reset."));
stage.append(canvas);

async function init() {
  const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,preserveDrawingBuffer:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
  renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.88;
  const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(32,1,.005,20);
  const guitar=new THREE.Group();scene.add(guitar);
  const loader=new THREE.TextureLoader();
  const [photo,bareBody,official,headOriginal]=await Promise.all([
    loader.loadAsync(new URL('../../assets/me/qiu-potbelly-stringless.webp',import.meta.url).href),
    loader.loadAsync(new URL('../../assets/me/qiu-potbelly-bare-body.webp',import.meta.url).href),
    loader.loadAsync(new URL('../../assets/me/bangdream-potbelly-stringless.webp',import.meta.url).href),
    loader.loadAsync(new URL('../../assets/me/bangdream-potbelly-fm-rana.webp',import.meta.url).href)
  ]);
  [photo,bareBody,official,headOriginal].forEach(t=>{t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());});

  // A small studio environment supplies real moving reflections on the metal.
  const studio=new THREE.Scene();studio.background=new THREE.Color('#333834');
  function softbox(x,y,z,w,h,intensity) {
    const box=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:new THREE.Color(intensity,intensity*.97,intensity*.9),side:THREE.DoubleSide}));
    box.position.set(x,y,z);box.lookAt(0,0,0);studio.add(box);
  }
  softbox(-2,1,3,1.6,5,4);softbox(3,.4,1,.55,4,3);softbox(0,4,0,3,2,2);softbox(-.7,0,3,.4,5,5);
  const pmrem=new THREE.PMREMGenerator(renderer),environment=pmrem.fromScene(studio,.025);
  scene.environment=environment.texture;pmrem.dispose();
  studio.traverse(n=>{if(n.isMesh){n.geometry.dispose();n.material.dispose();}});
  scene.add(new THREE.HemisphereLight('#f5eee0','#42493f',.85));
  const key=new THREE.DirectionalLight('#fff4dd',1.35);key.position.set(-2,3,4);scene.add(key);
  const fill=new THREE.DirectionalLight('#dce9f3',.55);fill.position.set(2,.4,1);scene.add(fill);

  const metal=new THREE.MeshStandardMaterial({color:'#bfc3c1',metalness:1,roughness:.24,envMapIntensity:.85});
  const darkMetal=new THREE.MeshStandardMaterial({color:'#424341',metalness:.8,roughness:.32});
  const cream=new THREE.MeshStandardMaterial({color:'#d9ca91',roughness:.38});
  const black=new THREE.MeshStandardMaterial({color:'#121513',roughness:.36});
  const side=new THREE.MeshPhysicalMaterial({color:'#351015',roughness:.37,clearcoat:.35,clearcoatRoughness:.3});
  const varnish=new THREE.MeshPhysicalMaterial({map:bareBody,roughness:.76,clearcoat:.12,clearcoatRoughness:.32,envMapIntensity:.22});
  const photographedMetal=new THREE.MeshStandardMaterial({map:photo,metalness:.35,roughness:.38,envMapIntensity:.5});
  const photographedPlastic=new THREE.MeshStandardMaterial({map:photo,roughness:.62,envMapIntensity:.18});
  const maple=new THREE.MeshStandardMaterial({color:'#b39b70',roughness:.5});
  const amber=new THREE.MeshPhysicalMaterial({color:'#684019',metalness:.25,roughness:.22,clearcoat:.7});

  function mesh(geometry,material,x=0,y=0,z=0,parent=guitar) {
    const m=new THREE.Mesh(geometry,material);m.position.set(x,y,z);parent.add(m);return m;
  }
  function roundedShape(w,h,r) {
    const p=new THREE.Shape();p.moveTo(-w/2+r,-h/2);
    p.lineTo(w/2-r,-h/2);p.quadraticCurveTo(w/2,-h/2,w/2,-h/2+r);
    p.lineTo(w/2,h/2-r);p.quadraticCurveTo(w/2,h/2,w/2-r,h/2);
    p.lineTo(-w/2+r,h/2);p.quadraticCurveTo(-w/2,h/2,-w/2,h/2-r);
    p.lineTo(-w/2,-h/2+r);p.quadraticCurveTo(-w/2,-h/2,-w/2+r,-h/2);
    return p;
  }
  function roundBox(w,h,d,r,material,x,y,z,parent=guitar) {
    return mesh(new THREE.ExtrudeGeometry(roundedShape(w,h,r),{depth:d,bevelEnabled:true,bevelSize:.0005,bevelThickness:.0005,bevelSegments:3,curveSegments:12}),material,x,y,z,parent);
  }
  function disk(r,d,material,x,y,z,parent=guitar) {
    const m=mesh(new THREE.CylinderGeometry(r,r,d,48),material,x,y,z,parent);m.rotation.x=Math.PI/2;return m;
  }
  function screw(x,y,z,r=.0018,parent=guitar,slotted=true) {
    disk(r,.001,metal,x,y,z,parent);
    if(slotted){const slot=mesh(new THREE.BoxGeometry(r*1.5,.00034,.00018),darkMetal,x,y,z+.0006,parent);slot.rotation.z=.5;}
  }
  function rod(a,b,r,material=metal,parent=guitar) {
    const start=new THREE.Vector3(...a),end=new THREE.Vector3(...b),delta=end.clone().sub(start);
    const m=mesh(new THREE.CylinderGeometry(r,r,delta.length(),12),material,0,0,0,parent);
    m.position.copy(start.add(end).multiplyScalar(.5));m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());return m;
  }

  const outline=new THREE.Shape();
  const move=(x,y)=>outline.moveTo(X(x),Y(y));
  const curve=(a,b,c,d,e,f)=>outline.bezierCurveTo(X(a),Y(b),X(c),Y(d),X(e),Y(f));
  move(254,82);
  curve(193,60,136,123,149,215);curve(160,302,228,421,241,547);
  curve(259,697,166,796,82,924);curve(-20,1067,-12,1190,67,1314);
  curve(165,1476,350,1500,559,1490);curve(804,1484,970,1344,1038,1171);
  curve(1101,1020,909,837,874,672);curve(845,588,902,511,938,456);
  curve(962,413,943,393,913,420);curve(806,518,716,500,669,421);
  outline.lineTo(X(658),Y(482));outline.lineTo(X(467),Y(478));outline.lineTo(X(471),Y(247));
  curve(403,332,335,309,308,234);curve(289,174,301,105,254,82);
  // One measured perimeter owns the top rim and the wall: no 3 mm open seam.
  const perimeter=outline.getSpacedPoints(384).slice(0,-1);
  const inward=perimeter.map((p,i)=>{
    const before=perimeter[(i+perimeter.length-1)%perimeter.length],after=perimeter[(i+1)%perimeter.length];
    return new THREE.Vector2(before.y-after.y,after.x-before.x).normalize();
  });
  const atEdge=(i,inset)=>perimeter[i].clone().addScaledVector(inward[i],inset+.0007);
  const edge=perimeter.map((p,i)=>atEdge(i,.002));edge.push(edge[0]);
  const faceOutline=new THREE.Shape(edge);
  // Rounded cross-section, with continuous normals around the entire perimeter.
  const profiles=[[.002,.014,0,1],[.0013,.01385,.35,.94],[.0006,.0133,.71,.71],[0,.0121,.94,.35],[0,.0108,1,0],[0,-.026,1,0],[.0006,-.0277,.71,-.71],[.002,-.029,0,-1]];
  const wallPositions=[],wallNormals=[],wallUV=[],wallIndices=[],count=perimeter.length;
  for(const [inset,z,radial,vertical] of profiles)for(let i=0;i<count;i++){
    const p=atEdge(i,inset);wallPositions.push(p.x,p.y,z);wallNormals.push(-inward[i].x*radial,-inward[i].y*radial,vertical);
    const sample=atEdge(i,.005);wallUV.push((sample.x/S+540)/1080,1-(1000-sample.y/S)/1501);
  }
  for(let row=0;row<profiles.length-1;row++)for(let i=0;i<count;i++){
    const j=(i+1)%count,a=row*count+i,b=row*count+j,c=(row+1)*count+i,d=(row+1)*count+j;
    wallIndices.push(a,c,b,b,c,d);
  }
  const wallGeometry=new THREE.BufferGeometry();wallGeometry.setAttribute('position',new THREE.Float32BufferAttribute(wallPositions,3));wallGeometry.setAttribute('normal',new THREE.Float32BufferAttribute(wallNormals,3));wallGeometry.setAttribute('uv',new THREE.Float32BufferAttribute(wallUV,2));wallGeometry.setIndex(wallIndices);
  wallGeometry.addGroup(0,count*6*3,0);wallGeometry.addGroup(count*6*3,wallIndices.length-count*6*3,1);
  const body=mesh(wallGeometry,[varnish,side]);body.name='Continuous rounded 55 mm body';
  const backMaterial=side.clone();backMaterial.side=THREE.BackSide;mesh(new THREE.ShapeGeometry(faceOutline),backMaterial,0,0,-.029);

  // Subdivide the front, then raise its interior into a carved maple top.
  const flat=new THREE.ShapeGeometry(faceOutline).toNonIndexed();
  const positions=[],uvs=[],heightCache=new Map();
  function bodySample(x,y) {
    const key=`${x.toFixed(7)},${y.toFixed(7)}`;let value=heightCache.get(key);
    if(value===undefined){let distanceSquared=Infinity,nx=0,ny=0,totalWeight=0,meanX=0,meanY=0;
    for(let i=0;i<edge.length-1;i++) {
      const a=edge[i],b=edge[i+1],dx=b.x-a.x,dy=b.y-a.y;
      const t=limit(((x-a.x)*dx+(y-a.y)*dy)/(dx*dx+dy*dy||1),0,1);
      const ex=x-a.x-dx*t,ey=y-a.y-dy*t,d=ex*ex+ey*ey;
      const weight=1/(d+.000025)**2;totalWeight+=weight;meanX+=ex*weight;meanY+=ey*weight;
      if(d<distanceSquared){distanceSquared=d;const len=Math.hypot(dx,dy)||1;nx=-dy/len;ny=dx/len;}
    }
    const distance=Math.sqrt(distanceSquared),t=limit(distance/.035,0,1);
    const slope=.012*6*t*(1-t)/.035;
    const normal=new THREE.Vector3(-slope*meanX/totalWeight/(distance||1),-slope*meanY/totalWeight/(distance||1),1).normalize();
    // Pad the photograph inward at the edge, so the wall/floor never bleeds onto the bevel.
    const padding=Math.max(0,.003-distance)**2/.003;
    value={z:.014+.012*t*t*(3-2*t),normal,u:((x+nx*padding)/S+540)/1080,v:1-(1000-(y+ny*padding)/S)/1501};heightCache.set(key,value);}
    return value;
  }
  function surface(x,y) {
    const value=bodySample(x,y);positions.push(x,y,value.z);uvs.push(value.u,value.v);
  }
  function triangle(a,b,c,depth) {
    if(!depth){surface(...a);surface(...b);surface(...c);return;}
    const mid=(u,v)=>[(u[0]+v[0])/2,(u[1]+v[1])/2],ab=mid(a,b),bc=mid(b,c),ca=mid(c,a);
    triangle(a,ab,ca,depth-1);triangle(ab,b,bc,depth-1);triangle(ca,bc,c,depth-1);triangle(ab,bc,ca,depth-1);
  }
  const points=flat.attributes.position;
  for(let i=0;i<points.count;i+=3)triangle([points.getX(i),points.getY(i)],[points.getX(i+1),points.getY(i+1)],[points.getX(i+2),points.getY(i+2)],3);
  const vertices=[],texcoords=[],indices=[],shared=new Map();
  for(let i=0;i<positions.length;i+=3){
    const key=positions.slice(i,i+3).map(n=>Math.round(n*1e7)).join(',');
    if(!shared.has(key)){shared.set(key,vertices.length/3);vertices.push(...positions.slice(i,i+3));texcoords.push(...uvs.slice(i/3*2,i/3*2+2));}
    indices.push(shared.get(key));
  }
  const top=new THREE.BufferGeometry();top.setAttribute('position',new THREE.Float32BufferAttribute(vertices,3));top.setAttribute('uv',new THREE.Float32BufferAttribute(texcoords,2));top.setIndex(indices);top.computeVertexNormals();mesh(top,varnish);flat.dispose();
  // Smoothed surface normals keep triangulation fans out of the reflections.
  const topNormals=top.attributes.normal;
  for(let i=0;i<vertices.length/3;i++){
    const key=`${vertices[i*3].toFixed(7)},${vertices[i*3+1].toFixed(7)}`,n=heightCache.get(key).normal;topNormals.setXYZ(i,n.x,n.y,n.z);
  }

  function photoFace(shape,texture,uvAt,z,parent=guitar) {
    const g=new THREE.ShapeGeometry(shape,18),p=g.attributes.position,uv=g.attributes.uv;
    for(let i=0;i<p.count;i++){const [u,v]=uvAt(p.getX(i),p.getY(i));uv.setXY(i,u,v);}
    return mesh(g,new THREE.MeshStandardMaterial({map:texture,roughness:.58,envMapIntensity:.25}),0,0,z,parent);
  }
  function photographCap(m,faceMaterial=photographedMetal,edgeMaterial=metal) {
    guitar.updateMatrixWorld(true);
    const p=m.geometry.attributes.position,uv=m.geometry.attributes.uv,v=new THREE.Vector3();
    for(let i=0;i<p.count;i++){v.fromBufferAttribute(p,i).applyMatrix4(m.matrixWorld);uv.setXY(i,(v.x/S+540)/1080,1-(1000-v.y/S)/1501);}
    m.material=[faceMaterial,edgeMaterial];return m;
  }
  const nut=.608,bridgeY=Y(1065),neckX=.007;
  const neckStart=guitar.children.length;
  const board=new THREE.Shape();board.moveTo(neckX-.0295,.153);board.lineTo(neckX+.0295,.153);board.lineTo(neckX+.0215,nut);board.lineTo(neckX-.0215,nut);board.closePath();
  mesh(new THREE.ExtrudeGeometry(board,{depth:.012,bevelEnabled:true,bevelSize:.0015,bevelThickness:.0015,bevelSegments:3}),maple,0,0,.008);
  // Register every photographed fret to its physical position, not a stretched crop.
  const fretPixels=[365,455,536,613,688,757,823,882,943,999,1049,1099,1148,1193,1235,1275,1313,1348,1380,1413,1442,1471,1498,1523];
  const fretY=fret=>nut-.628*(1-2**(-fret/12));
  const boardRows=fretPixels.map((pixel,i)=>({pixel,y:i===23?.153:fretY(i)}));
  const boardUV=(x,y)=>{
    let i=0;while(i<boardRows.length-2&&y<boardRows[i+1].y)i++;
    const a=boardRows[i],b=boardRows[i+1],t=limit((a.y-y)/(a.y-b.y),0,1);
    const py=a.pixel+(b.pixel-a.pixel)*t;
    const width=.043+(nut-y)/(nut-.153)*.016;
    const photoWidth=108+(py-365)/(1523-365)*36;
    return [(1198+(x-neckX)/width*photoWidth)/2400,1-py/2400];
  };
  // Each board interval gets its own UV strip; a single polygon cannot carry this warp.
  for(let i=0;i<boardRows.length-1;i++) {
    const a=boardRows[i].y,b=boardRows[i+1].y;
    const wa=(.043+(nut-a)/(nut-.153)*.016)/2,wb=(.043+(nut-b)/(nut-.153)*.016)/2;
    const strip=new THREE.Shape();strip.moveTo(neckX-wa,a);strip.lineTo(neckX-wb,b);strip.lineTo(neckX+wb,b);strip.lineTo(neckX+wa,a);strip.closePath();
    photoFace(strip,official,boardUV,.022);
  }
  const neckBack=mesh(new THREE.CylinderGeometry(.021,.029,.477,24),side,neckX,.374,-.010);neckBack.scale.z=.7;
  for(let fret=1;fret<=22;fret++) {
    const y=fretY(fret),w=.043+(nut-y)/(nut-.153)*.016;
    const crown=rod([neckX-w/2+.0008,y,.0226],[neckX+w/2-.0008,y,.0226],.00105);
    crown.name=`Fret ${fret}`;
  }
  roundBox(.043,.004,.003,.001,cream,neckX,nut,.0215);
  // The fingerboard follows the string plane towards the raised bridge.
  for(const part of guitar.children.slice(neckStart)){
    part.updateMatrix();const inverse=part.matrix.clone().invert(),v=new THREE.Vector3(),p=part.geometry.attributes.position;
    for(let i=0;i<p.count;i++){
      v.fromBufferAttribute(p,i).applyMatrix4(part.matrix);v.z+=limit((nut-v.y)/(nut-.153),0,1)*.012;v.applyMatrix4(inverse);p.setXYZ(i,v.x,v.y,v.z);
    }
    part.geometry.computeVertexNormals();
  }
  // A single photo coordinate system owns the contour, six posts, buttons and strings.
  const headScale=.043/108,HX=px=>neckX+(px-1198)*headScale,HY=py=>(365-py)*headScale;
  const headUV=(x,y)=>[(1198+(x-neckX)/headScale)/2400,1-(365-y/headScale)/2400];
  const headGroup=new THREE.Group();headGroup.name='Registered headstock';headGroup.position.set(0,nut,.016);headGroup.rotation.x=-THREE.MathUtils.degToRad(10);guitar.add(headGroup);
  const head=new THREE.Shape();
  const hp=(x,y)=>head.lineTo(HX(x),HY(y));
  const hc=(a,b,c,d,e,f)=>head.bezierCurveTo(HX(a),HY(b),HX(c),HY(d),HX(e),HY(f));
  head.moveTo(HX(1144),HY(360));
  hc(1142,321,1113,309,1094,290);hc(1089,279,1100,244,1105,217);
  hc(1119,167,1120,137,1118,104);hc(1116,79,1113,53,1117,39);
  hc(1120,31,1139,37,1154,29);hc(1171,21,1179,1,1195,2);
  hc(1214,1,1226,19,1245,30);hc(1254,37,1267,34,1275,38);
  hc(1280,61,1272,91,1273,125);hc(1271,173,1278,203,1285,236);
  hc(1290,257,1303,282,1296,291);hc(1278,309,1255,321,1251,360);
  hp(1144,360);head.closePath();
  mesh(new THREE.ExtrudeGeometry(head,{depth:.014,curveSegments:18,bevelEnabled:true,bevelSize:.00045,bevelThickness:.0005,bevelSegments:3}),side,0,0,-.008,headGroup);
  const posts=[{px:1154,py:100,bx:1093,by:104},{px:1146,py:178,bx:1082,by:183},{px:1135,py:254,bx:1073,by:257},{px:1237,py:100,bx:1298,by:106},{px:1246,py:179,bx:1309,by:186},{px:1258,py:257,bx:1320,by:263}];
  // Cut the original washers out of the flat face. Their pixels belong only to the relief.
  for(const post of posts){const hole=new THREE.Path();hole.absarc(HX(post.px),HY(post.py),18*headScale,0,Math.PI*2,true);head.holes.push(hole);}
  const headFace=photoFace(head,headOriginal,headUV,.007,headGroup);
  // Keep the original high-resolution lettering and wear. Use the cleaned texture
  // only inside the six narrow string corridors, where the source has baked strings.
  const stringCorridors=Array.from({length:6},(_,i)=>{
    const post=posts[i<3?2-i:i],endX=post.px+(i<3?5:-5),nutPixel=1153+i*18;
    const startY=post.py+18,startX=endX+(nutPixel-endX)*18/(365-post.py);
    return new THREE.Vector4(startX,startY,nutPixel,365);
  });
  headFace.material.onBeforeCompile=shader=>{
    shader.uniforms.cleanHead={value:official};shader.uniforms.stringCorridors={value:stringCorridors};
    shader.fragmentShader='uniform sampler2D cleanHead;\nuniform vec4 stringCorridors[6];\n'+shader.fragmentShader;
    shader.fragmentShader=shader.fragmentShader.replace('#include <map_fragment>',`#include <map_fragment>
      vec2 headPixel=vec2(vMapUv.x,1.0-vMapUv.y)*2400.0;
      float cleanMask=0.0;
      for(int i=0;i<6;i++){
        vec2 a=stringCorridors[i].xy,b=stringCorridors[i].zw;
        float t=clamp(dot(headPixel-a,b-a)/dot(b-a,b-a),0.0,1.0);
        cleanMask=max(cleanMask,1.0-smoothstep(3.0,5.0,length(headPixel-mix(a,b,t))));
      }
      diffuseColor.rgb=diffuse*mix(texture2D(map,vMapUv).rgb,texture2D(cleanHead,vMapUv).rgb,cleanMask);
    `);
  };
  const headChrome=new THREE.MeshStandardMaterial({map:headOriginal,metalness:.5,roughness:.3,envMapIntensity:.6});
  for(const [index,post] of posts.entries()) {
    const x=HX(post.px),y=HY(post.py),bx=HX(post.bx),by=HY(post.by);
    // Concentric, photo-registered mesh rings give each washer and post real height.
    const rings=[[18,.007],[15,.008],[13,.009],[8,.009],[6,.013],[5,.017],[0,.017]],pos=[],uv=[],idx=[];
    for(const [radius,z] of rings)for(let k=0;k<=48;k++){
      const a=k/48*Math.PI*2,px=x+Math.cos(a)*radius*headScale,py=y+Math.sin(a)*radius*headScale;
      pos.push(px,py,z);uv.push(...headUV(px,py));
    }
    for(let j=0;j<rings.length-1;j++)for(let k=0;k<48;k++){const a=j*49+k,b=a+49;idx.push(a,a+1,b,b,a+1,b+1);}
    const relief=new THREE.BufferGeometry();relief.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));relief.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));relief.setIndex(idx);relief.computeVertexNormals();
    mesh(relief,headChrome,0,0,0,headGroup).name=`Tuner post ${index+1}`;
    roundBox(.010,.016,.005,.003,metal,x,y,-.014,headGroup);
    rod([x,by,-.007],[bx,by,-.007],.0019,metal,headGroup);
    const button=mesh(new THREE.SphereGeometry(1,32,20),metal,bx,by,-.007,headGroup);
    button.scale.set(.0052,.007,.0035);button.rotation.z=(bx<x?1:-1)*.10;
  }

  const neckPickup=new THREE.Group();neckPickup.position.set(X(558),Y(574),.0265);neckPickup.name='Seymour Duncan SH-1n';guitar.add(neckPickup);
  const bridgePickup=new THREE.Group();bridgePickup.position.set(X(550),Y(929),.0265);bridgePickup.name='Seymour Duncan SH-16 reverse zebra';guitar.add(bridgePickup);
  for(const group of [neckPickup,bridgePickup]) {
    const bridge=group===bridgePickup;
    const ring=roundedShape(bridge?.095:.098,bridge?.0475:.051,.003);
    ring.holes.push(new THREE.Path(roundedShape(bridge?.073:.080,bridge?.040:.044,.003).getPoints(16).reverse()));
    photographCap(mesh(new THREE.ExtrudeGeometry(ring,{depth:.0025,bevelEnabled:true,bevelThickness:.00035,bevelSize:.00035,bevelSegments:3,curveSegments:16}),cream,0,0,0,group),photographedPlastic,cream);
    // A real open ring surrounds a dark pickup cavity; no stacked copies of its photograph.
    roundBox(bridge?.073:.080,bridge?.040:.044,.001,.003,black,0,0,0,group);
  }
  // The cover photo already contains its pole screws; no second offset screw row.
  photographCap(roundBox(.077,.041,.0055,.004,metal,0,0,.003,neckPickup));
  const creamCoil=photographCap(roundBox(.070,.018,.006,.007,cream,0,.006,.005,bridgePickup),photographedPlastic,cream);
  const blackCoil=photographCap(roundBox(.070,.017,.006,.004,black,0,-.0115,.005,bridgePickup),photographedPlastic,black);
  creamCoil.name='SH-16 cream neck-facing coil';blackCoil.name='SH-16 black bridge-facing coil';

  photographCap(roundBox(.091,.016,.006,.006,metal,X(546),bridgeY,.027));
  for(let i=0;i<6;i++) {
    const x=(i-2.5)*.0104+.002;
    photographCap(roundBox(.008,.013,.004,.001,metal,x,bridgeY,.034));
  }
  for(const x of [X(419),X(678)])screw(x,bridgeY,.035,.0035);
  const tailY=Y(1190);
  photographCap(roundBox(.101,.016,.012,.007,metal,X(540),tailY,.026));
  for(const x of [-.045,.045])screw(x,tailY,.04,.0045);
  for(const [px,py] of [[777,1030],[895,1191]]) {
    const z=bodySample(X(px),Y(py)).z+.0006;
    disk(.015,.001,black,X(px),Y(py),z);
    const profile=[[0,0],[.014,0],[.0147,.001],[.014,.004],[.012,.010],[.012,.012],[0,.012]].map(([r,h])=>new THREE.Vector2(r,h));
    const knob=mesh(new THREE.LatheGeometry(profile,64),amber,X(px),Y(py),z);knob.rotation.x=Math.PI/2;
    const face=new THREE.Shape();face.absarc(X(px),Y(py),.012,0,Math.PI*2,false);
    photoFace(face,photo,(x,y)=>[(x/S+540)/1080,1-(1000-y/S)/1501],z+.0122);
  }
  // Washer, threaded bushing and lever share one physical pivot and one axis.
  const selector=new THREE.Group();selector.name='Pickup selector';selector.position.set(X(894),Y(965),bodySample(X(894),Y(965)).z+.0005);guitar.add(selector);
  disk(.0082,.00065,darkMetal,0,0,.0002,selector);
  disk(.0077,.001,metal,0,0,.0009,selector);
  mesh(new THREE.TorusGeometry(.0063,.00035,8,64),metal,0,0,.0015,selector);
  const selectorNut=mesh(new THREE.CylinderGeometry(.0048,.0048,.0018,6),metal,0,0,.0022,selector);selectorNut.rotation.x=Math.PI/2;
  disk(.0033,.0032,metal,0,0,.0034,selector);
  for(let i=0;i<4;i++)mesh(new THREE.TorusGeometry(.0033,.00016,6,40),darkMetal,0,0,.0025+i*.00065,selector);
  const leverAxis=new THREE.Vector3(.50,-.30,.812).normalize(),pivot=new THREE.Vector3(0,0,.005);
  const tipStart=pivot.clone().addScaledVector(leverAxis,.007);
  rod(pivot.toArray(),tipStart.clone().addScaledVector(leverAxis,.002).toArray(),.00145,metal,selector);
  const tipProfile=[[0,0],[.0018,0],[.0024,.0007],[.0027,.002],[.0025,.0075],[.002,.0095],[.0009,.0104],[0,.0106]].map(([r,h])=>new THREE.Vector2(r,h));
  const cap=mesh(new THREE.LatheGeometry(tipProfile,40),cream,...tipStart.toArray(),selector);
  cap.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),leverAxis);
  for(let i=0;i<6;i++) {
    const x=(i-2.5)*.0104+.002,nutX=HX([1153,1171,1189,1207,1225,1243][i]);
    const radius=[46,36,26,17,13,10][i]*.0254/2000;
    rod([x,tailY,.040],[x,bridgeY,.041],radius);
    rod([x,bridgeY,.041],[nutX,nut,.026],radius).name=`String ${i+1}`;
    const post=posts[i<3?2-i:i];
    rod([nutX,0,.010],[HX(post.px)+(i<3?1:-1)*.002,HY(post.py),.015],radius,metal,headGroup);
  }
  // One small runnable invariant check: custom pickup layout and usable UV data.
  console.assert(creamCoil.position.y>0&&blackCoil.position.y<0,'Reverse-zebra coil orientation');
  console.assert(positions.every(Number.isFinite)&&uvs.every(v=>Number.isFinite(v)&&v>=0&&v<=1),'Guitar surface coordinates');
  console.assert(head.holes.length===6&&headGroup.children.filter(n=>n.name.startsWith('Tuner post')).length===6&&guitar.children.filter(n=>n.name.startsWith('Fret ')).length===22,'One registered component per tuner and fret');
  console.assert(edge.slice(0,-1).every((p,i)=>Math.hypot(p.x-wallPositions[i*3],p.y-wallPositions[i*3+1],.014-wallPositions[i*3+2])<1e-8)&&varnish.map!==photographedMetal.map,'Closed body rim and separate clean body texture');
  const stringHeight=y=>.026+(.041-.026)*(nut-y)/(nut-bridgeY);
  console.assert(stringHeight(neckPickup.position.y)>.0355+.001&&stringHeight(bridgePickup.position.y+.006)>.038+.001,'Strings clear both pickup faces');

  let yaw=-.10,pitch=0,zoom=1,view='body',queued=0,drag=null,lastHome='';
  const views={whole:[.300,1.00],body:[.071,.51],neck:[.383,.50],head:[.680,.185]};
  const renderSize=new THREE.Vector2();
  function size(w,h){renderer.getSize(renderSize);if(renderSize.x!==w||renderSize.y!==h)renderer.setSize(w,h,false);}
  function compose(focus,extent,aspect,rx,ry) {
    camera.aspect=aspect;camera.position.set(0,focus,extent/(2*Math.tan(THREE.MathUtils.degToRad(16))));camera.lookAt(0,focus,0);camera.updateProjectionMatrix();
    guitar.position.set(0,focus,0);guitar.rotation.set(rx,ry,0);
    // Rotate about the chosen part, so its center stays in the frame.
    const offset=new THREE.Vector3(0,-focus,0).applyEuler(guitar.rotation);guitar.position.add(offset);
  }
  function renderDetail() {
    if(!dialog.open||document.hidden)return;
    const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;
    size(w,h);
    const [focus,extent]=views[view];
    const fit=Math.max(extent,(view==='body'?.39:view==='whole'?.4:.10)/(w/h));
    compose(focus,fit/zoom,w/h,pitch,yaw);renderer.render(scene,camera);
    canvas.dataset.yaw=yaw.toFixed(3);canvas.dataset.pitch=pitch.toFixed(3);canvas.dataset.zoom=zoom.toFixed(2);canvas.dataset.view=view;
    lastHome='';
  }
  function requestRender(){if(!queued)queued=requestAnimationFrame(()=>{queued=0;renderDetail();});}
  window.qiuGuitar={
    canvas,
    drawHome(x,y){
      const signature=`${x.toFixed(3)},${y.toFixed(3)}`;if(signature===lastHome)return;
      size(850,850);compose(.300,1.02,1,y*.10,-.08+x*.44);renderer.render(scene,camera);lastHome=signature;
    },
    setDetail(name){view=name;zoom=1;requestRender();}
  };
  document.body.classList.add('guitar-model-ready');
  window.dispatchEvent(new Event('guitar-model-ready'));
  new ResizeObserver(requestRender).observe(stage);
  canvas.addEventListener('pointerdown',e=>{if(e.button!==0)return;drag={id:e.pointerId,x:e.clientX,y:e.clientY,yaw,pitch};canvas.setPointerCapture(e.pointerId);canvas.classList.add('turning');canvas.focus({preventScroll:true});});
  canvas.addEventListener('pointermove',e=>{
    if(drag&&e.pointerType==='mouse'&&e.buttons===0)release(e);
    if(drag&&drag.id===e.pointerId){yaw=limit(drag.yaw+(e.clientX-drag.x)*.007,-1.12,1.12);pitch=limit(drag.pitch+(e.clientY-drag.y)*.005,-.38,.38);requestRender();}
    else if(e.pointerType==='mouse'){const rect=canvas.getBoundingClientRect();key.position.x=-2+(e.clientX-rect.left)/rect.width*1.3;requestRender();}
  });
  function release(e){if(!drag||drag.id!==e.pointerId)return;drag=null;canvas.classList.remove('turning');if(canvas.hasPointerCapture(e.pointerId))canvas.releasePointerCapture(e.pointerId);}
  canvas.addEventListener('pointerup',release);canvas.addEventListener('pointercancel',release);
  canvas.addEventListener('lostpointercapture',()=>{drag=null;canvas.classList.remove('turning');});
  canvas.addEventListener('wheel',e=>{if(e.ctrlKey||e.metaKey)return;e.preventDefault();zoom=limit(zoom*Math.exp(-e.deltaY*.001),.7,2.3);requestRender();},{passive:false});
  function reset(){yaw=0;pitch=0;zoom=1;requestRender();}
  canvas.addEventListener('dblclick',reset);document.querySelector('#guitar-reset').addEventListener('click',reset);
  canvas.addEventListener('keydown',e=>{
    if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','-',' '].includes(e.key))return;e.preventDefault();
    if(e.key===' ')reset();
    else if(e.key==='+')zoom=limit(zoom*1.15,.7,2.3);
    else if(e.key==='-')zoom=limit(zoom/1.15,.7,2.3);
    else {yaw=limit(yaw+(e.key==='ArrowRight'?.12:e.key==='ArrowLeft'?-.12:0),-1.12,1.12);pitch=limit(pitch+(e.key==='ArrowDown'?.08:e.key==='ArrowUp'?-.08:0),-.38,.38);}
    requestRender();
  });
  dialog.addEventListener('close',()=>{lastHome='';window.dispatchEvent(new Event('guitar-model-ready'));});
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)requestRender();});
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();document.body.classList.remove('guitar-model-ready');delete window.qiuGuitar;document.querySelector('#guitar-status').textContent=t("三维显示暂时中断，请刷新恢复。","The 3D view was interrupted. Refresh to restore it.");});
  if(dialog.open)window.qiuGuitar.setDetail(stage.dataset.view||'body');
}
init().catch(error=>{console.error('Guitar model:',error);canvas.remove();document.querySelector('#guitar-status').textContent=t("三维模型未能载入，暂时显示参考照片。","The 3D model couldn’t load. Showing the reference photograph.");});
