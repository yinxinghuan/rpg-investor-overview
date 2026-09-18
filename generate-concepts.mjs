import {createHash} from 'node:crypto';
import {translate,assertEnglish} from './design/english.mjs';
import {readFile,writeFile} from 'node:fs/promises';

const content=await readFile(new URL('./design/content.html',import.meta.url),'utf8');
const output=new URL('./public/',import.meta.url);
const names={a:'蓝金探索版',c:'创作平台版'};
function languageSwitch(key){
  const file=key==='a'?'index':'concept-c';
  return `<nav class="language-switch" aria-label="Language"><a class="locale-link" lang="zh-CN" href="./${file}.html" aria-current="page">中文</a><a class="locale-link" lang="en" href="./${file}-en.html">English</a></nav>`;
}
function reorder(html,order){
  const matches=[...html.matchAll(/    <section class="chapter (\w+)"/g)];
  const mainEnd=html.indexOf('  </main>');
  const sections=Object.fromEntries(matches.map((m,i)=>[m[1],html.slice(m.index,matches[i+1]?.index??mainEnd)]));
  if(order.some(k=>!sections[k])||order.length!==matches.length)throw Error('Incomplete concept sections');
  return html.slice(0,matches[0].index)+order.map(k=>sections[k]).join('')+html.slice(mainEnd);
}
const decorations='<svg class="route-stroke" viewBox="0 0 480 580" preserveAspectRatio="none" aria-hidden="true"><path d="M22 517 C110 500 82 416 178 398 S243 289 352 276 S360 159 449 58"/></svg>';
const tickets='<div class="map-ticket ticket-left"><span>样板起点</span><strong>一封旧街的信</strong></div><div class="map-ticket ticket-right"><span>产品方向</span><strong>下一集，由 AI 延展</strong></div>';
const studio='<div class="creator-studio"><div class="studio-header">你的游戏工作台<span>未来概念</span></div><div class="studio-body"><div class="studio-tabs" role="group" aria-label="查看未来游戏创作示例"><button type="button" data-idea="science" aria-pressed="true">科学探索</button><button type="button" data-idea="classroom" aria-pressed="false">课堂教学</button><button type="button" data-idea="language" aria-pressed="false">语言学习</button></div><span class="studio-label">我想做一个游戏</span><p class="studio-prompt" id="idea-prompt">带着学生去火星，查出基地为什么缺水。</p><div class="studio-result"><span>这个想法可以变成</span><h3 id="idea-title">火星基地的水去哪了？</h3><div class="studio-route" id="idea-route"><span>进入基地</span><span>收集线索</span><span>修复供水</span></div><p id="idea-description">用调查任务，把水的循环与资源管理知识串成一段冒险。</p></div><p class="studio-note">预设示例切换，不调用 AI；用户自行生成整款游戏是未来目标，尚未上线。</p></div><div class="studio-bottom">一个想法 → 故事与场景 → 可以走进去玩的游戏</div></div>';
for(const key of ['a','c']){
  let html=content.replaceAll('ART_THEME',key).replace('<body>','<body data-concept="'+key+'">');
  html=html.replace('  </header>',languageSwitch(key)+'  </header>');
  html=html.replace('<link rel="stylesheet" href="./style.css">','<link rel="stylesheet" href="./base.css">\n  <link rel="stylesheet" href="./theme-'+key+'.css">');
  html=html.replace('</head>','  <link rel="stylesheet" href="./art-flow.css">\n  <link rel="stylesheet" href="./multiplayer.css">\n  <link rel="stylesheet" href="./engine.css">\n  <link rel="stylesheet" href="./localization.css">\n</head>');
  html=html.replace('<title>','<title>'+key.toUpperCase()+' · '+names[key]+'｜');
  if(key==='a'){
    html=html.replace('<figure class="hero-shot">',decorations+'<figure class="hero-shot">');
    html=html.replace('</figcaption></figure>','</figcaption></figure>'+tickets);
  }
  if(key==='c'){
    html=html.replace('你继续玩，<br>AI 接着造。','说一个想法，<br>开启你的冒险。');
    html=html.replace('想象一款玩不完的游戏','未来目标：人人都能生成自己的游戏');
    html=html.replace('我们想让<strong>游戏的下一集，为你而生。</strong>','我们想让<strong>每个人的想象，都有一个能走进去的世界。</strong>');
    html=html.replace('你发现一封信，AI 写出信背后的秘密；你追着线索走，新的地方、新的发现接着出现。我们想做的，就是一个越玩越大的游戏世界。','说出想玩的故事、想学的知识，AI 帮你把它变成场景和任务。今天，我们先用一款旧街 RPG 验证：怎样让 AI 写的内容成为真正能玩的游戏。');
    html=html.replace(/<figure class="hero-shot">[\s\S]*?<\/figure>/,studio);
    html=html.replace('class="primary-action" href="#growth"','class="primary-action" href="#future"').replace('这到底怎么玩？','看看未来能做什么');
    html=html.replace(/      <div class="creation-example">[\s\S]*?<\/div>/,'');
    html=reorder(html,['future','multiplayer','sample','growth','value','engine','technology','status']);
  }
  const filename=key==='a'?'index':'concept-c';
  html=html.replace('</head>',`  <link rel="alternate" hreflang="en" href="./${filename}-en.html">\n</head>`);
  await writeFile(new URL(filename+'.html',output),html);
  let en=translate(html).replaceAll('<br>','<br> ').replace('lang="zh-CN"','lang="en"').replace('src="./main.js"','src="./main-en.js"');
  en=en.replaceAll('./index.html','./index-en.html').replaceAll('./concept-c.html','./concept-c-en.html').replaceAll('./compare.html','./compare-en.html');
  en=en.replace(/<nav class="language-switch"[\s\S]*?<\/nav>/,`<nav class="language-switch" aria-label="Language"><a class="locale-link" lang="zh-CN" href="./${filename}.html">中文</a><a class="locale-link" lang="en" href="./${filename}-en.html" aria-current="page">English</a></nav>`);
  en=en.replaceAll(`art-flow-${key}-mobile.svg`,`art-flow-${key}-mobile-en.svg`).replaceAll(`art-flow-${key}-wide.svg`,`art-flow-${key}-wide-en.svg`);
  en=en.replace(`hreflang="en" href="./${filename}-en.html"`,`hreflang="zh-CN" href="./${filename}.html"`);
  // Captures remain faithful to the prototype; all surrounding explanations are translated.
  en=en.replace('Actual gameplay · Local prototype','Actual gameplay · Original in-game UI');
  assertEnglish(en,filename+'-en.html');
  await writeFile(new URL(filename+'-en.html',output),en);
}

for(const file of ['main','compare']){
 let en=translate(await readFile(new URL(`./public/${file}.js`,import.meta.url),'utf8'));
 if(file==='compare')en=en.replaceAll('./index.html','./index-en.html').replaceAll('./concept-c.html','./concept-c-en.html');
 assertEnglish(en,file+'-en.js');
 await writeFile(new URL(`${file}-en.js`,output),en);
}
let compare=await readFile(new URL('./design/compare.html',import.meta.url),'utf8');
const langNav='<nav class="language-switch" aria-label="Language"><a class="locale-link" lang="zh-CN" href="./compare.html" aria-current="page">中文</a><a class="locale-link" lang="en" href="./compare-en.html">English</a></nav>';
compare=compare.replace('</header>',langNav+'</header>').replace('</head>','<link rel="stylesheet" href="./localization.css"></head>');
await writeFile(new URL('compare.html',output),compare);
let compareEn=translate(compare).replaceAll('<br>','<br> ').replace('lang="zh-CN"','lang="en"').replaceAll('./index.html','./index-en.html').replaceAll('./concept-c.html','./concept-c-en.html').replace('./compare.js','./compare-en.js');
compareEn=compareEn.replace(/<nav class="language-switch"[\s\S]*?<\/nav>/,'<nav class="language-switch" aria-label="Language"><a class="locale-link" lang="zh-CN" href="./compare.html">中文</a><a class="locale-link" lang="en" href="./compare-en.html" aria-current="page">English</a></nav>');
assertEnglish(compareEn,'compare-en.html');
await writeFile(new URL('compare-en.html',output),compareEn);

// Content hashes prevent a cached script or stylesheet from lagging behind its page.
for(const name of ['index','index-en','concept-c','concept-c-en','compare','compare-en']){
 const url=new URL(name+'.html',output);
 let page=await readFile(url,'utf8');
 for(const match of [...page.matchAll(/(?:src|href)="(\.\/[^"?]+\.(?:css|js))"/g)]){
  const asset=match[1],bytes=await readFile(new URL(asset,output));
  const hash=createHash('sha256').update(bytes).digest('hex').slice(0,10);
  page=page.replaceAll('"'+asset+'"','"'+asset+'?v='+hash+'"');
 }
 page=page.replace(/(<iframe[^>]*src=")([^"?]+)(")/g,'$1$2?v=hybrid-v1$3');
 await writeFile(url,page);
}
