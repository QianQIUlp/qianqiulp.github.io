// A lightweight instrument and effect chain, inspired by pedals, not a circuit emulation.
const clamp=(n,a,b)=>Math.min(b,Math.max(a,n));
export const defaultRig={goldDrive:32,goldTone:55,goldLevel:50,blueLevel:50,blueTone:50,blueDrive:42,echoTime:420,echoFeedback:34,echoMix:28,volume:65,gold:false,blue:false,echo:false};
export const tones={
  clean:{...defaultRig},
  gold:{...defaultRig,gold:true,goldDrive:34,goldTone:58},
  blue:{...defaultRig,blue:true,blueDrive:58,blueTone:46},
  night:{...defaultRig,gold:true,echo:true,goldDrive:20,goldTone:44,echoTime:560,echoFeedback:48,echoMix:42}
};

export function makePluck(context,frequency){
  const rate=context.sampleRate,length=Math.ceil(rate*3.2),period=Math.round(rate/frequency-.5);
  const ring=new Float32Array(period),samples=new Float32Array(length);
  let seed=2026+Math.round(frequency*31);
  for(let i=0;i<period;i++){seed=(Math.imul(seed,1664525)+1013904223)>>>0;ring[i]=(seed/4294967296*2-1)*.9;}
  // A plucked-string delay line. The half-sample loss filter sets both decay and tuning.
  for(let i=0;i<length;i++){const k=i%period;samples[i]=ring[k]*Math.min(1,i/(rate*.0015))*Math.min(1,(length-i)/(rate*.06));ring[k]=.4985*(ring[k]+ring[(k+1)%period]);}
  const buffer=context.createBuffer(1,length,rate);buffer.copyToChannel(samples,0);return buffer;
}
export function createAudioRig(context,destination=context.destination){
  const input=context.createGain(),master=context.createGain(),analyser=context.createAnalyser();
  master.gain.value=0;
  const values={...defaultRig},buffers=new Map(),voices=new Set();
  const gain=(value=1)=>{const n=context.createGain();n.gain.value=value;return n;};
  const filter=(type,hz,q=.7)=>{const n=context.createBiquadFilter();n.type=type;n.frequency.value=hz;n.Q.value=q;return n;};
  const smooth=(param,value)=>param.setTargetAtTime(value,context.currentTime,.018);
  function driveStage(blue=false){
    const entry=gain(),output=gain(),dry=gain(),wet=gain(0),pre=gain(),post=gain();
    const shape=context.createWaveShaper(),tone=filter(blue?'lowpass':'highshelf',blue?3400:2200);
    const color=filter(blue?'highpass':'peaking',blue?115:780,blue?.7:.62);
    if(!blue)color.gain.value=2;
    const curve=new Float32Array(4097);
    for(let i=0;i<curve.length;i++){const x=i/(curve.length-1)*2-1,bias=blue?.13:0;curve[i]=(Math.tanh(x*2.3+bias)-Math.tanh(bias))*.72;}
    shape.curve=curve;shape.oversample='2x';
    entry.connect(dry).connect(output);
    entry.connect(color).connect(pre).connect(shape).connect(tone).connect(post).connect(wet).connect(output);
    return{entry,output,dry,wet,pre,post,tone};
  }
  const gold=driveStage(),blue=driveStage(true);
  const highpass=filter('highpass',65),cabinet=filter('lowpass',6600);
  input.connect(highpass).connect(gold.entry);gold.output.connect(blue.entry);blue.output.connect(filter('highpass',35)).connect(cabinet);
  const delay=context.createDelay(1),feedback=gain(.34),delaySend=gain(0),delayMix=gain(0),damping=filter('lowpass',3300);
  cabinet.connect(master);cabinet.connect(delaySend).connect(delay);
  delay.connect(damping).connect(feedback).connect(delay);
  delay.connect(delayMix).connect(master);
  const compressor=context.createDynamicsCompressor();
  compressor.threshold.value=-12;compressor.knee.value=10;compressor.ratio.value=10;compressor.attack.value=.003;compressor.release.value=.14;
  // Catch short transients that can pass through the compressor's attack.
  const ceiling=context.createWaveShaper(),ceilingCurve=new Float32Array(4097);
  for(let i=0;i<ceilingCurve.length;i++){const x=i/(ceilingCurve.length-1)*2-1,a=Math.abs(x);ceilingCurve[i]=a<=.65?x:Math.sign(x)*(.65+.25*Math.tanh((a-.65)/.25));}
  ceiling.curve=ceilingCurve;ceiling.oversample='2x';
  master.connect(compressor).connect(ceiling).connect(analyser).connect(destination);analyser.fftSize=512;
  const meterData=new Float32Array(analyser.fftSize);
  function apply(){
    const g=values.goldDrive/100,b=values.blueDrive/100;
    smooth(gold.pre.gain,1+g*24);smooth(gold.post.gain,(.45+values.goldLevel/100)*.76);
    smooth(gold.tone.gain,(values.goldTone-50)*.18);
    // The gold voice keeps some clean attack mixed under its soft clipping.
    smooth(gold.dry.gain,values.gold?.35:1);smooth(gold.wet.gain,values.gold?.85:0);
    smooth(blue.pre.gain,1+b*38);smooth(blue.post.gain,(.4+values.blueLevel/100)*.75);
    smooth(blue.tone.frequency,900*Math.pow(8,values.blueTone/100));
    smooth(blue.dry.gain,values.blue?0:1);smooth(blue.wet.gain,values.blue?1:0);
    smooth(delay.delayTime,values.echoTime/1000);smooth(feedback.gain,values.echoFeedback/100);
    smooth(delaySend.gain,values.echo?1:0);smooth(delayMix.gain,values.echo?values.echoMix/100:0);
    smooth(master.gain,values.volume/100*.65);
  }
  function set(patch){
    for(const [key,value] of Object.entries(patch)){
      if(!Object.hasOwn(values,key))continue;
      if(['gold','blue','echo'].includes(key))values[key]=Boolean(value);
      else if(Number.isFinite(value))values[key]=clamp(value,key==='echoTime'?80:0,key==='echoTime'?800:key==='echoFeedback'?72:100);
    }
    apply();
  }
  function play(frequency,strength=1,when=context.currentTime,kind='live'){
    if(!Number.isFinite(frequency)||frequency<40||frequency>1600)return;
    const key=frequency.toFixed(3);
    if(!buffers.has(key)){if(buffers.size>=48)buffers.delete(buffers.keys().next().value);buffers.set(key,makePluck(context,frequency));}
    if(voices.size>=32){const first=voices.values().next().value;first.source.stop();voices.delete(first);}
    const source=context.createBufferSource(),level=gain(clamp(strength,0,1)*.85);
    source.buffer=buffers.get(key);source.connect(level).connect(input);
    const voice={source,kind};voices.add(voice);
    source.onended=()=>{voices.delete(voice);source.disconnect();level.disconnect();};
    source.start(Math.max(when,context.currentTime));return source;
  }
  function stopLoop(){for(const v of voices)if(v.kind==='loop'){v.source.stop();voices.delete(v);}}
  function meter(){analyser.getFloatTimeDomainData(meterData);let sum=0;for(const n of meterData)sum+=n*n;return Math.sqrt(sum/meterData.length);}
  apply();
  return{input,set,play,stopLoop,meter,get active(){return voices.size>0;}};
}
