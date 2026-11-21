  function drawCard(ctx,w,h,b,t){
    const palettes={'Midnight lime':['#19172f','#d6fb83'],'Ocean blue':['#0b3143','#7be6f1'],'Plum rose':['#401d43','#ffc8d9']};
    const [bg,ink]=palettes[b.palette]||palettes['Midnight lime'];
    ctx.fillStyle=bg;ctx.fillRect(0,0,w,h);
    const stage=t<2.8?0:t<7.3?1:2;
    const elapsed=t-[0,2.8,7.3][stage];
    const card=[b.hook||'For '+b.audience,b.idea,b.cta][stage];
    ctx.fillStyle=ink;ctx.globalAlpha=.12;ctx.beginPath();ctx.arc(w*.95,h*.15+Math.sin(t*.7)*h*.05,w*.35,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;
    const pad=w*.09, max=w-pad*2;
    let size=Math.min(w,h)*.095, lines=[];
    do {
      ctx.font='bold '+size+'px sans-serif';lines=[''];
      for(const word of card.split(/\s+/)){
        let current=lines.at(-1);
        if(current && ctx.measureText(current+' '+word).width>max){lines.push('');current='';}
        for(const ch of word){
          if(ctx.measureText(current+ch).width>max){lines[lines.length-1]=current;lines.push('');current='';}
          current+=ch;
        }
        lines[lines.length-1]=current+' ';
      }
      if(lines.length*size*1.22<=h*.64)break;
      size*=.9;
    }while(size>8);
    ctx.fillStyle=ink;ctx.globalAlpha=Math.min(1,.2+elapsed*5);
    lines.forEach((line,i)=>ctx.fillText(line,pad,h*.5+(i-(lines.length-1)/2)*size*1.22+size*.3+Math.max(0,1-elapsed*4)*h*.025));
    ctx.globalAlpha=1;ctx.fillRect(pad,h*.9,max*Math.min(1,t/10),Math.max(3,h*.007));
  }
  async function localRender(b){
    if(!window.MediaRecorder || !HTMLCanvasElement.prototype.captureStream)throw Error('This browser cannot record a canvas. Try a browser with video recording support.');
    const type=['video/mp4;codecs=avc1.42001E','video/mp4','video/webm;codecs=vp9','video/webm'].find(x=>MediaRecorder.isTypeSupported(x));
    if(!type)throw Error('This browser has no compatible video encoder.');
    const canvas=document.createElement('canvas');
    [canvas.width,canvas.height]=b.ratio==='9:16'?[720,1280]:b.ratio==='16:9'?[1280,720]:[720,720];
    const ctx=canvas.getContext('2d');drawCard(ctx,canvas.width,canvas.height,b,0);
    const stream=canvas.captureStream(30);
    let animation,timer;
    try{
      const recorder=new MediaRecorder(stream,{mimeType:type,videoBitsPerSecond:3000000}), chunks=[];
      const done=new Promise((resolve,reject)=>{
        recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};
        recorder.onerror=()=>reject(Error('Recording failed. Try another browser.'));
        recorder.onstop=()=>chunks.length?resolve(new Blob(chunks,{type})):reject(Error('The browser produced an empty clip.'));
      });
      recorder.start();const start=performance.now();
      function tick(now){drawCard(ctx,canvas.width,canvas.height,b,Math.min(10,(now-start)/1000));animation=requestAnimationFrame(tick);}
      animation=requestAnimationFrame(tick);
      timer=setTimeout(()=>recorder.stop(),10000);
      return await done;
    }finally{clearTimeout(timer);cancelAnimationFrame(animation);stream.getTracks().forEach(track=>track.stop());}
  }

const get=id=>document.getElementById(id);
let clipUrl;
get('clipForm').onsubmit=async event=>{
  event.preventDefault();
  const brief=Object.fromEntries(['idea','hook','audience','cta','palette','ratio'].map(id=>[id,get(id).value.trim()]));
  get('createClip').disabled=true;
  get('clipMessage').textContent='Rendering for 10 seconds. Keep this tab visible.';
  try {
    const blob=await localRender(brief);
    if(clipUrl) URL.revokeObjectURL(clipUrl);
    clipUrl=URL.createObjectURL(blob);
    get('clipPlayer').src=clipUrl;
    get('downloadClip').href=clipUrl;
    get('downloadClip').download='ayb-cast.'+(blob.type.includes('mp4')?'mp4':'webm');
    get('clipOutput').hidden=false;
    get('clipMessage').textContent='Your clip is ready.';
  } catch(error){get('clipMessage').textContent=error.message;}
  finally{get('createClip').disabled=false;}
};
