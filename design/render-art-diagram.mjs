import {readFile,writeFile} from 'node:fs/promises';
const photos={};
const dimensions={table:[512,512],sheet:[1024,512],photo:[768,576],floor:[640,1024]};
for(const [key,name] of Object.entries({table:'table',sheet:'shelf-and-folder',photo:'generated-photo',floor:'floor'}))photos[key]=(await readFile(new URL(`../public/media/assembly/${name}.png`,import.meta.url))).toString('base64');
const themes={a:{ink:'#193a4a',muted:'#536971',line:'#7d9090',paper:'#fffdf8',reuse:'#e6efe9',green:'#285c47',fresh:'#fbf0d4',gold:'#825117',decision:'#f5eddc',accent:'#f3ce76'},c:{ink:'#353064',muted:'#605b77',line:'#9488aa',paper:'#fff',reuse:'#e6efe9',green:'#285c47',fresh:'#efe8fa',gold:'#634897',decision:'#f0edf7',accent:'#d5c6f0'}};
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;');
function render(theme,mobile){
 const c=themes[theme],w=mobile?360:1000,h=mobile?1450:1620;
 const text=(x,y,s,size=22,color=c.ink,weight=400)=>`<text x="${x}" y="${y}" text-anchor="middle" fill="${color}" font-size="${size}" font-weight="${weight}">${escape(s)}</text>`;
 const rect=(x,y,w,h,fill=c.paper,stroke=c.line,r=16)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="1.4"/>`;
 const edge=(d,arrow=true,color=c.line)=>`<path d="${d}" fill="none" stroke="${color}" stroke-width="2" ${arrow?'marker-end="url(#arrow)"':''}/>`;
 const crop=(name,x,y,w,h,v)=>`<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="${v}" preserveAspectRatio="xMidYMid meet"><use href="#asset-${name}"/></svg>`;
 const scene=(x,y,w,h)=>{
  const n=(x,y,s)=>`<circle cx="${x}" cy="${y}" r="14" fill="${c.ink}" stroke="white" stroke-width="2"/>`+text(x,y+5,s,15,'#fff',650);
  return `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="0 0 600 360">`
   +`<rect x="40" y="18" width="420" height="320" rx="5" fill="#4a493a"/>`
   +`<svg x="49" y="30" width="400" height="298" viewBox="0 190 640 824" preserveAspectRatio="none"><use href="#asset-floor"/></svg>`
   +`<path d="M44 24H454M44 24V332" fill="none" stroke="#867963" stroke-width="10"/>`
   +crop('sheet',319,45,95,112,'108 108 300 340')
   +`<svg x="349" y="60" width="34" height="22" viewBox="646 170 240 278" preserveAspectRatio="none"><use href="#asset-sheet"/></svg>`
   +crop('table',128,103,244,244,'0 0 512 512')
   +`<svg x="220" y="199" width="61" height="37" viewBox="0 0 768 576" preserveAspectRatio="none"><use href="#asset-photo"/></svg>`
   +n(157,273,'1')+n(416,134,'2')+n(395,54,'3')+n(291,220,'4')
   +`<path d="M304 220H477V196" fill="none" stroke="${c.gold}" stroke-width="2"/>`
   +rect(473,71,121,125,c.fresh,c.gold,8)+crop('photo',480,79,107,80,'0 0 768 576')+text(533,182,'④ 新照片',15,c.gold,650)
   +'</svg>';
 };
 const badge=(x,y,label,fill)=>`<rect x="${x-20}" y="${y-15}" width="40" height="30" rx="15" fill="${fill}"/>`+text(x,y+5,label,14,c.paper,650);
 const film=(x,y,size=42)=>`<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 0 48 48"><rect x="2" y="7" width="44" height="34" rx="4" fill="${c.ink}"/><g fill="${c.accent}"><path d="M11 15h11v18H11zM26 15h11v18H26z"/><path d="M7 10h4v3H7zM20 10h4v3h-4zM33 10h4v3h-4zM7 35h4v3H7zM20 35h4v3h-4zM33 35h4v3h-4z"/></g></svg>`;
 let s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc"><title id="title">从一张底片开始：素材复用与生成流程图</title><desc id="desc">玩家找到底片，AI 根据调查经历规划照片内容。逐项判断素材是否已有：放大台、木搁架、照片夹等复用已有素材；没有且支持生成的线索照片由图像模型绘制。校验后接入显影玩法，更新游戏并保存。图中使用项目原始透明素材和图像生成原文件，后方用同一批素材组装房间示意。</desc><defs>${Object.entries(photos).map(([name,data])=>`<image id="asset-${name}" href="data:image/png;base64,${data}" width="${dimensions[name][0]}" height="${dimensions[name][1]}"/>`).join('')}<marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10Z" fill="${c.line}"/></marker><pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".7" fill="${c.line}" opacity=".2"/></pattern><pattern id="checker" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="#fff"/><path d="M0 0h8v8H0zM8 8h8v8H8z" fill="#e6ebe8"/></pattern></defs><rect width="${w}" height="${h}" fill="url(#dots)"/><g font-family="-apple-system,BlinkMacSystemFont,'PingFang SC','Microsoft YaHei',sans-serif">`;
 if(!mobile){
  s+=edge('M500 110V152')+edge('M500 248V290')+edge('M350 378H250V508')+edge('M650 378H750V508')+edge('M250 770V811H500',false)+edge('M750 770V811H500V851')+edge('M500 949V991');
  s+=rect(315,14,370,96)+film(347,41,44)+text(527,53,'玩家行动',24,c.ink,650)+text(527,83,'例如：找到底片，继续追查',18,c.muted);
  s+=rect(290,152,420,96,c.ink,c.ink)+text(500,190,'AI 规划后续剧情',25,'#fff',650)+text(500,223,'“根据这段旧事，准备一张线索照片”',18,'#e6e8e6');
  s+=`<path d="M500 291 650 378 500 465 350 378Z" fill="${c.decision}" stroke="${c.line}" stroke-width="1.5"/>`+text(500,370,'所需素材',24,c.ink,600)+text(500,402,'是否已有？',24,c.ink,600);
  s+=`<rect x="227" y="429" width="46" height="32" rx="16" fill="${c.green}"/><rect x="659" y="419" width="182" height="53" rx="10" fill="${c.paper}"/>`+text(250,451,'有',18,'#fff',650)+text(750,439,'没有',19,c.gold,650)+text(750,463,'且在当前生成能力内',15,c.gold);
  s+=rect(65,510,370,260,c.reuse,'#a5c1af',20)+badge(99,544,'复用',c.green)+text(267,551,'直接用，或重新组合',23,c.green,650);
  s+=text(250,582,'从现成的美术素材库里拿',17,c.green);
  for(const [x,name,v,label] of [[99,'table','80 126 350 328','① 放大台'],[205,'sheet','108 108 300 340','② 木搁架'],[311,'sheet','646 170 240 278','③ 照片夹']]){
   s+=rect(x-5,602,92,102,'url(#checker)','#c7d9cd',8)+crop(name,x,608,82,82,v)+text(x+41,727,label,18,c.green,600);
  }
  s+=text(250,752,'原始透明素材 · 灰白格表示去底',14,c.green);
  s+=rect(565,510,370,260,c.fresh,theme==='a'?'#d7bf82':'#c5b2dd',20)+badge(599,544,'生成',c.gold)+text(769,551,'按剧情，画出新发现',23,c.gold,650)+text(750,582,'图像模型生成新的线索照片',17,c.gold);
  s+=rect(661,598,178,136,'#fff','#dfd5bb',3)+crop('photo',668,605,164,123,'0 0 768 576')+text(750,753,'④ 新照片 · 图像模型生成原文件',14,c.gold);
  s+=rect(270,853,460,96)+text(500,889,'校验素材，接入玩法',25,c.ink,650)+text(500,923,'已有暗房 + 新照片 → 你亲手显影',19,c.muted);
  s+=rect(150,994,700,430,c.paper,c.line,20)+text(500,1034,'同一批素材，拼成这一幕',25,c.ink,650)+scene(190,1054,620,320)+text(500,1400,'① 台子摆进房间　② 搁架靠墙　③ 夹子放上架　④ 新照片放上台',16,c.muted);
  s+=edge('M500 1424V1462')+rect(325,1464,350,80,c.ink,c.ink)+text(500,1497,'更新游戏，保存这次旅程',23,'#fff',650)+text(500,1527,'下次回来，接着这个发现继续探索',16,'#e6e8e6');
  s+=text(500,1586,'真实素材组装示意 · 同一场景同时复用旧素材、加入新内容',16,c.muted);
 }else{
  s+=edge('M180 97V128')+edge('M180 215V251')+edge('M76 325H46V428')+edge('M284 325H314V428')+edge('M90 691V734H180',false)+edge('M270 691V734H180V774')+edge('M180 864V902');
  s+=rect(42,13,276,84)+film(57,33,38)+text(199,46,'玩家行动',21,c.ink,650)+text(199,76,'找到底片，继续追查',15,c.muted);
  s+=rect(36,128,288,87,c.ink,c.ink)+text(180,160,'AI 规划后续剧情',21,'#fff',650)+text(180,190,'根据旧事，准备一张线索照片',15,'#e6e8e6');
  s+=`<path d="M180 253 284 325 180 397 76 325Z" fill="${c.decision}" stroke="${c.line}" stroke-width="1.5"/>`+text(180,319,'所需素材',19,c.ink,600)+text(180,346,'是否已有？',19,c.ink,600);
  s+=`<rect x="28" y="372" width="36" height="29" rx="14" fill="${c.green}"/><rect x="265" y="362" width="91" height="50" rx="8" fill="${c.paper}"/>`+text(46,393,'有',16,'#fff',650)+text(311,383,'没有',16,c.gold,650)+text(311,404,'且支持生成',12,c.gold);
  s+=rect(8,430,164,261,c.reuse,'#a5c1af')+text(90,461,'复用 / 重组',19,c.green,650)+text(90,487,'已有素材直接拿来用',13,c.green);
  s+=rect(21,503,63,81,'url(#checker)','#c7d9cd',6)+crop('table',25,507,55,70,'80 126 350 328')+rect(96,503,63,81,'url(#checker)','#c7d9cd',6)+crop('sheet',100,507,55,70,'108 108 300 340');
  s+=text(52,609,'① 台子',16,c.green,600)+text(128,609,'② 搁架',16,c.green,600)+crop('sheet',28,625,32,38,'646 170 240 278')+text(113,649,'③ 照片夹',13,c.green)+text(90,677,'原始透明素材',12,c.green);
  s+=rect(188,430,164,261,c.fresh,theme==='a'?'#d7bf82':'#c5b2dd')+text(270,461,'按需生成',19,c.gold,650)+text(270,487,'AI 画出一张新照片',13,c.gold);
  s+=rect(205,508,130,106,'#fff','#d5c5a2',3)+crop('photo',211,514,118,89,'0 0 768 576')+text(270,639,'④ 新的线索照片',16,c.gold,600)+text(270,674,'生成的图片原文件',12,c.gold);
  s+=rect(32,776,296,88)+text(180,808,'校验素材，接入玩法',21,c.ink,650)+text(180,839,'已有暗房 + 新照片 → 亲手显影',14,c.muted);
  s+=rect(8,904,344,304,c.paper,c.line)+text(180,937,'同一批素材，拼成这一幕',20,c.ink,650)+scene(16,954,328,198)+text(180,1174,'① 台子　② 搁架　③ 夹子　④ 新照片',12,c.muted)+text(180,1196,'真实素材组装示意',12,c.muted);
  s+=edge('M180 1208V1243')+rect(32,1245,296,87,c.ink,c.ink)+text(180,1279,'更新游戏，保存旅程',21,'#fff',650)+text(180,1309,'下次回来，接着这个发现继续玩',14,'#e6e8e6');
  s+=text(180,1373,'独立的物件，组装成可探索的场景',14,c.muted)+text(180,1401,'新照片在相关剧情触发时生成，需要等待',12,c.muted);
 }
 return s+'</g></svg>';
}
for(const theme of ['a','c'])for(const mobile of [false,true])await writeFile(new URL(`../public/media/art-flow-${theme}-${mobile?'mobile':'wide'}.svg`,import.meta.url),render(theme,mobile));
