const PARAS = [
 ["ขอให้เธอมีความสุขมาก ๆ ในทุก ๆ วันเลยนะ","ขอให้ปีนี้เป็นปีที่ดีและใจดีกับเธอมาก ๆ","อยากให้เธอยิ้มเยอะ ๆ ไม่ต้องเจอเรื่องที่ทำให้เสียใจ","ขอให้ทุกสิ่งที่เธอตั้งใจไว้ประสบความสำเร็จทุกอย่างเลยนะ","ขอให้สุขภาพแข็งแรง กินอิ่ม นอนหลับ และดูแลตัวเองดี ๆ"],
 ["ขอบคุณที่เข้ามาเป็นความสุขและเป็นรอยยิ้มให้กับเค้านะ","ขอบคุณที่อยู่ด้วยกันและสร้างความทรงจำดี ๆ มากมาย","เค้าอาจจะไม่ใช่คนที่ดีที่สุด แต่เค้าจะพยายามให้ดีที่สุดนะ"],
 ["ถ้าวันไหนเธอเหนื่อยก็อย่าลืมว่ายังมีเค้าอยู่ข้าง ๆ เสมอ","มีอะไรก็เล่าให้เค้าฟังได้ทุกเรื่องเลยนะ ไม่ต้องเก็บไว้คนเดียว","ถึงบางครั้งเราอาจจะงอนหรือทะเลาะกันบ้าง แต่เค้าก็ยังรักเธอเหมือนเดิม"],
 ["เค้าอยากอยู่ดูแลเธอในทุก ๆ ช่วงเวลาของชีวิตเลย","อยากเห็นเธอเติบโตและประสบความสำเร็จในทุกสิ่งที่ฝัน","อยากเป็นคนที่คอยให้กำลังใจและอยู่ข้าง ๆ เธอในวันที่ไม่ไหว"],
 ["ขอให้เราได้มีวันเกิดด้วยกันแบบนี้ไปอีกหลาย ๆ ปีเลยนะ","ไม่ว่าจะผ่านไปนานแค่ไหนก็อยากให้เรามีกันแบบนี้ตลอดไป","ขอให้เธอได้รับความรักที่ดี และเค้าจะตั้งใจรักเธอให้ดีที่สุด"],
 ["รักเธอมาก ๆ เลยนะ ขอบคุณที่เกิดมาให้เค้าได้รักนะคับบบ","สุดท้ายขอให้เธอมีความสุขที่สุดในโลกเลยนะ อยู่ให้เค้ารักไปนาน ๆ นะ"]
];
const $=s=>document.querySelector(s), p1=$('#p1'), p2=$('#p2'), msg=$('#msg'), end=$('#end'), rp=$('#replay');
let run=0;
function fb(img,e){const s=document.createElement('span');s.textContent=e;s.className=img.className;
  s.style.cssText='font-size:'+(img.classList.contains('person')?'clamp(90px,20vw,150px)':'clamp(50px,11vw,90px)')+';position:'+(img.closest('.hero')?'absolute':'fixed')+';line-height:1';
  if(img.classList.contains('person')){s.style.cssText='display:block;text-align:center;font-size:clamp(90px,20vw,150px);line-height:1.2'}
  if(img.closest('#p1')){s.style.cssText='font-size:110px;cursor:pointer';s.onclick=openLetter}
  img.replaceWith(s)}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

async function type(el,text,id){
  for(const ch of text){ if(id!==run)return; el.insertBefore(document.createTextNode(ch),el.querySelector('.caret')); await sleep(16);
    p2.scrollTo({top:p2.scrollHeight,behavior:'auto'}); }
}
async function play(){
  const id=++run; msg.innerHTML=''; end.classList.remove('on'); rp.classList.remove('on'); p2.scrollTo(0,0);
  await sleep(2900); if(id!==run)return;
  for(const group of PARAS){
    const p=document.createElement('p'); p.innerHTML='<span class="caret"></span>'; msg.appendChild(p);
    for(let i=0;i<group.length;i++){ await type(p,group[i]+(i<group.length-1?' ':''),id); if(id!==run)return; await sleep(110); }
    p.querySelector('.caret').remove(); await sleep(220);
  }
  end.classList.add('on'); rp.classList.add('on');
}
let opened=false;
function openLetter(){
  if(opened)return; opened=true;
  const l=document.querySelector('#p1 .letter'); if(l)l.classList.add('opening');
  setTimeout(()=>{p1.classList.add('hide'); p2.classList.add('show'); play();},650);
}
$('#letter').onclick=openLetter;
rp.onclick=()=>{p2.classList.remove('show');void p2.offsetWidth;p2.classList.add('show');play()};