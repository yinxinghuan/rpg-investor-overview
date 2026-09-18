const stops = {
  street: {
    count: 'Prototype 01 / 04', title: 'Start on an old street',
    lead: 'Collect a letter, meet residents and search for clues. AI uses these experiences to prepare the next investigation.',
    action: 'We build the street, characters and core mechanics. You step inside and begin the adventure.',
    outcome: 'Knowing what has already happened gives AI a basis for continuing the story.',
    alt: 'The authored Old Street starting map, with the player outside the photo studio.'
  },
  archive: {
    count: 'Prototype 02 / 04', title: 'Let AI create an investigation',
    lead: 'AI uses earlier clues to write investigation materials and suggest where tables and shelves should go. The game turns a suitable proposal into a room you can search.',
    action: 'AI proposes the content. The game checks the puzzle and routes, then adds them to play.',
    outcome: 'Examine the materials AI prepared. This screenshot shows the archive activity; bounded room generation has also been tested separately.',
    alt: 'Actual archive gameplay showing the activity that hosts generated investigation materials.'
  },
  roof: {
    count: 'Prototype 03 / 04', title: 'Follow the clue to the rooftop',
    lead: 'The archive reveals where a negative is hidden. Climb to the roof, lay a plank, open the cabinet and bring it back.',
    action: 'An AI-created investigation connects to our existing rooftop and plank-crossing mechanics.',
    outcome: 'A new story can lead to concrete actions. The rooftop and plank mechanics are currently authored in advance.',
    alt: 'The authored rooftop activity follows the investigation: the player crosses a plank to recover the negative.'
  },
  develop: {
    count: 'Prototype 04 / 04', title: 'Turn a past event into a photograph',
    lead: 'The events you investigated become the basis for a new photo. AI plans its content, generates the image and adds it to the darkroom.',
    action: 'AI prepares the photo. You adjust focus and exposure to reveal its details.',
    outcome: 'Written clues lead to a visual discovery, and the photo is saved with this journey.',
    alt: 'Actual darkroom gameplay: a generated photo connected to focus and exposure controls.'
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
  science:{prompt:'Take students to Mars to find out why the base is running out of water.',title:'Where did the base’s water go?',route:['Enter the base','Gather clues','Restore the water'],description:'Connect the water cycle and resource management through an investigation adventure.'},
  classroom:{prompt:'Turn this water-cycle lesson into an investigation of a town’s water shortage.',title:'The town’s rainwater journey',route:['Find the source','Follow the water','Explain the findings'],description:'Teachers provide the curriculum and learning goals. Students practise explaining what they learn through an investigation.'},
  language:{prompt:'Make a travel game at my English level to practise directions and hotel check-in.',title:'A day of travel in English',route:['Ask for directions','Order at a café','Check in at a hotel'],description:'Complete tasks through contextual conversations. Future versions could adapt the language and hints to the learner.'}
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
 missing:{facts:'You are at the door, but there is no key in your bag.',verdict:'Blocked · Key missing',result:'The door stays locked.',detail:'AI can suggest where to look for the key. Writing “the door opens” cannot give you access.'},
 ready:{facts:'You are at the door, have the key, and have permission to enter.',verdict:'Approved · Conditions met',result:'The door opens. Your progress is saved.',detail:'The open door and related quest progress are saved together. AI can describe your arrival, and later actions continue from this new state.'},
 retry:{facts:'The same action ID arrives again. Its receipt shows that it has already succeeded.',verdict:'Already handled · Return the saved result',result:'No second action. No duplicate effects.',detail:'The system recognizes the action and returns its existing receipt. Any costs or rewards attached to it are not applied again.'}
};
document.querySelectorAll('[data-rule-case]').forEach(button=>button.addEventListener('click',()=>{
 const state=ruleCases[button.dataset.ruleCase];
 document.querySelectorAll('[data-rule-case]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
 for(const key of ['facts','verdict','result','detail'])document.querySelector('#rule-'+key).textContent=state[key];
}));
