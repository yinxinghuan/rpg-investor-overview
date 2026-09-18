const stops = {
  street: {
    count: '样板 01 / 04', title: '从一条旧街开始',
    lead: '你先在旧街里取信、认识居民、寻找线索。AI 会参考这些经历，接着准备后面的调查。',
    action: '我们先做好街道、人物和基本玩法，你走进去开始冒险。',
    outcome: 'AI 知道前面发生过什么，才有依据把后面的故事接上。',
    alt: '作者搭建的旧街起始地图，玩家站在照相馆门前。'
  },
  archive: {
    count: '样板 02 / 04', title: '让 AI 出一道调查题',
    lead: 'AI 根据前面的线索写出调查材料，也会建议桌子和资料架怎么摆。程序把合适的方案搭成房间，你进去寻找答案。',
    action: 'AI 想内容，程序检查题目和路线，再把它放进游戏。',
    outcome: '你能亲手查阅 AI 准备的材料。这里展示档案玩法；房间生成也已做过单独验证。',
    alt: '样板档案空间的运行截图，展示生成材料所接入的调查玩法。'
  },
  roof: {
    count: '样板 03 / 04', title: '跟着线索，爬上屋顶',
    lead: '档案告诉你底片藏在哪里。你沿路去屋顶，搭起木板、打开柜子，把它拿回来。',
    action: 'AI 准备的调查接上我们已做好的屋顶与搭板玩法。',
    outcome: '新故事真的能带着你去做事。这个屋顶和搭板玩法目前由我们预先制作。',
    alt: '预先制作的屋顶玩法承接调查线索，主角越过木板寻找底片。'
  },
  develop: {
    count: '样板 04 / 04', title: '把旧事，变成一张照片',
    lead: '你查清的往事，会成为新照片的创作依据。AI 设计照片内容，再把图片生成出来，放到暗房里。',
    action: 'AI 准备照片，你动手调焦、调曝光，把细节看清。',
    outcome: '前面的文字线索有了后续的图像发现，照片也会随这段旅程保存下来。',
    alt: '暗房实际运行截图，生成照片接入焦距和曝光操作。'
  }
};

const tabs = [...document.querySelectorAll('.journey-stop')];
const panel = document.querySelector('#journey-panel');
function chooseStop(tab, focus = false) {
  const key = tab.dataset.shot;
  const stop = stops[key];
  if (!stop) return;
  tabs.forEach((item) => {
    const active = item === tab;
    item.classList.toggle('active', active);
    item.setAttribute('aria-selected', String(active));
    item.tabIndex = active ? 0 : -1;
  });
  const image = document.querySelector('#journey-image');
  image.src = './media/' + key + '.png';
  image.alt = stop.alt;
  document.querySelector('#journey-count').textContent = stop.count;
  document.querySelector('#journey-title').textContent = stop.title;
  document.querySelector('#journey-lead').textContent = stop.lead;
  document.querySelector('#journey-action').textContent = stop.action;
  document.querySelector('#journey-outcome').textContent = stop.outcome;
  panel.setAttribute('aria-labelledby', tab.id);
  if (focus) tab.focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => chooseStop(tab));
  tab.addEventListener('keydown', (event) => {
    let next;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else return;
    event.preventDefault();
    chooseStop(tabs[next], true);
  });
});

const ideaExamples={
  science:{prompt:'带着学生去火星，查出基地为什么缺水。',title:'火星基地的水去哪了？',route:['进入基地','收集线索','修复供水'],description:'用调查任务，把水的循环与资源管理知识串成一段冒险。'},
  classroom:{prompt:'把这节水循环课，做成一场小镇缺水调查。',title:'小镇的雨水之旅',route:['寻找水源','追踪雨水','解释发现'],description:'老师提供教材和学习目标，学生在调查过程中练习解释所学知识。'},
  language:{prompt:'做一个适合我英语水平的旅行游戏，练习问路和入住。',title:'用英语，开启旅行的一天',route:['车站问路','咖啡馆点单','酒店入住'],description:'在情境对话中完成任务，未来希望根据学习程度调整表达与提示。'}
};
document.querySelectorAll('[data-idea]').forEach(button=>{
  button.addEventListener('click',()=>{
    const idea=ideaExamples[button.dataset.idea];
    document.querySelectorAll('[data-idea]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
    document.querySelector('#idea-prompt').textContent=idea.prompt;
    document.querySelector('#idea-title').textContent=idea.title;
    document.querySelector('#idea-description').textContent=idea.description;
    document.querySelector('#idea-route').replaceChildren(...idea.route.map(label=>{
      const span=document.createElement('span');span.textContent=label;return span;
    }));
  });
});

// Language changes preserve the current section in the same presentation.
document.querySelectorAll('.locale-link').forEach(link=>link.addEventListener('click',()=>{
 const destination=new URL(link.href);destination.hash=location.hash;link.href=destination.href;
}));

const ruleCases={
 missing:{facts:'你就在门前，但背包里没有钥匙。',verdict:'未通过 · 缺少钥匙',result:'门还是锁着的。',detail:'AI 可以提示你去哪里找钥匙，但不能只写一句“门开了”就替你放行。'},
 ready:{facts:'你就在门前，持有钥匙，也已获准进入。',verdict:'通过 · 条件满足',result:'门打开了，进度也记住了。',detail:'开门和相关任务进展一起写入。此后，AI 可以描述你走进档案室，后续行动也从这个新状态继续。'},
 retry:{facts:'同一个动作编号再次送达；记录显示，它已经成功处理。',verdict:'已处理 · 返回原结果',result:'不会再开一次，也不会再结算一次。',detail:'系统认出这是同一次行动，返回已有回执。即使这次行动涉及消耗或奖励，也不会重复扣除或发放。'}
};
document.querySelectorAll('[data-rule-case]').forEach(button=>button.addEventListener('click',()=>{
 const state=ruleCases[button.dataset.ruleCase];
 document.querySelectorAll('[data-rule-case]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
 for(const key of ['facts','verdict','result','detail'])document.querySelector('#rule-'+key).textContent=state[key];
}));
