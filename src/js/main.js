/* ═══════════════════════════════════════════
   IN SEARCH OF MEANING — main.js
   Tab switching + Reflection Quiz
   ═══════════════════════════════════════════ */


function showPhil(index, btn) {

  document.querySelectorAll('.phil-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));


  document.getElementById('panel-' + index).classList.add('active');
  btn.classList.add('active');
}

/* ── QUIZ Questions ── */
const questions = [
  {
    eyebrow: 'On choice',
    text: 'When you face a major decision, what bothers you most?',
    options: [
      { text: 'That no one can make it for me, and I am fully responsible for the outcome.', thinker: 'sartre' },
      { text: 'That it might not matter either way, and nothing I choose will fill the silence.', thinker: 'camus' },
      { text: 'That I might choose based on habit or crowd rather than what I actually believe.', thinker: 'heidegger' },
      { text: 'That reason will never be enough, and at some point I just have to leap.', thinker: 'kierkegaard' }
    ]
  },
  {
    eyebrow: 'On meaning',
    text: 'Which of these feels most true to you?',
    options: [
      { text: 'Meaning is something I create through my choices, and it does not exist until I make it.', thinker: 'sartre' },
      { text: 'Meaning may not exist at all, but that does not stop me from living fully.', thinker: 'camus' },
      { text: 'Meaning comes from living authentically, and not from what others expect of me.', thinker: 'heidegger' },
      { text: 'Meaning is reached only through deep personal commitment, and it cannot be argued into existence.', thinker: 'kierkegaard' }
    ]
  },
  {
    eyebrow: 'On mortality',
    text: 'How does the fact that you will die affect the way you live?',
    options: [
      { text: 'It does not define me, but what defines me is what I choose to do with the time I have.', thinker: 'sartre' },
      { text: 'It clarifies the absurdity of everything, and that feeling is freeing.', thinker: 'camus' },
      { text: 'It is the sharpest reminder to stop drifting and start living deliberately.', thinker: 'heidegger' },
      { text: 'It pushes me toward commitment, and I cannot afford to stay on the edge forever.', thinker: 'kierkegaard' }
    ]
  },
  {
    eyebrow: 'On others',
    text: 'What is your relationship to the expectations of the people around you?',
    options: [
      { text: 'They are a trap, and I must define myself and not let others define me through their eyes.', thinker: 'sartre' },
      { text: 'I recognize we are all in the same absurd situation, and that creates a kind of solidarity.', thinker: 'camus' },
      { text: 'The crowd pulls me toward inauthenticity, and I have to resist the force of what "one does."', thinker: 'heidegger' },
      { text: 'The most important relationships are deeply personal, and not defined by social norms.', thinker: 'kierkegaard' }
    ]
  },
  {
    eyebrow: 'On living',
    text: 'What does it look like to live well, in your view?',
    options: [
      { text: 'To act with full awareness of your freedom and take responsibility for every choice.', thinker: 'sartre' },
      { text: 'To revolt against meaninglessness, and to love life intently in spite of the silence.', thinker: 'camus' },
      { text: 'To own your existence, and to live deliberately rather than being swept along by the world.', thinker: 'heidegger' },
      { text: 'To make the leap, and to commit fully to something even without guarantee of certainty.', thinker: 'kierkegaard' }
    ]
  }
];

const thinkerData = {
  sartre: {
    name: 'Jean-Paul Sartre',
    concept: 'Radical freedom & bad faith',
    text: 'Your responses point toward Sartre\'s world: You are completely free, and there is no escaping that. You do not blame your situations and every choice you make is yours truly, and the weight of those decisions you make sits entirely on your shoulders.'
  },
  camus: {
    name: 'Albert Camus',
    concept: 'The absurd & revolt',
    text: 'Your responses echo Camus\'s conviction that meaning is not something you find lying around, one must build it themselves. You have looked at the fact that life has no guaranteed purpose and that truth did not break you, but made things clearer.'
  },
  heidegger: {
    name: 'Martin Heidegger',
    concept: 'Authenticity & being-toward-death',
    text: 'Your responses resonate with Heidegger\'s call to own your existence. You notice how easy it is to just go along with what the crowd does, But thinking about death helps remind you what actually matters and you choose your own path knowing that.'
  },
  kierkegaard: {
    name: 'Søren Kierkegaard',
    concept: 'The leap of faith & commitment',
    text: 'Your responses align with Kierkegaard\'s emphasis that the things that matter most in life can not be figure out by thinking alone. You know that at some point, no matter how long you analyze something, you will never feel ready. But you still commit to it without knowing the certainty awaiting for you after.'
  }
};


let currentQ = 0;
let selectedOption = null;
let scores = { sartre: 0, camus: 0, heidegger: 0, kierkegaard: 0 };


function startQuiz() {
  currentQ = 0;
  selectedOption = null;
  scores = { sartre: 0, camus: 0, heidegger: 0, kierkegaard: 0 };

  switchScreen('screen-question');
  renderQuestion();
}

function renderQuestion() {
  const q = questions[currentQ];

  // Update progress
  const progress = ((currentQ) / questions.length) * 100;
  document.getElementById('prog-fill').style.width = progress + '%';
  document.getElementById('prog-label').textContent =
    'Question ' + (currentQ + 1) + ' of ' + questions.length;


  document.getElementById('q-eyebrow').textContent = q.eyebrow;
  document.getElementById('q-text').textContent = q.text;


  const container = document.getElementById('options-container');
  container.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt.text;
    btn.dataset.thinker = opt.thinker;
    btn.addEventListener('click', () => selectOption(btn, opt.thinker));
    container.appendChild(btn);
  });


  const nextBtn = document.getElementById('btn-next');
  nextBtn.disabled = true;
  selectedOption = null;
}

function selectOption(btn, thinker) {

  document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));

  btn.classList.add('selected');
  selectedOption = thinker;

  document.getElementById('btn-next').disabled = false;
}

function nextQuestion() {
  if (!selectedOption) return;


  scores[selectedOption]++;

  currentQ++;

  if (currentQ < questions.length) {
    renderQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  // Fill progress bar to 100%
  document.getElementById('prog-fill').style.width = '100%';

  // Sort thinkers by score descending
  const sorted = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .filter(([, score]) => score > 0);

  // Build result cards
  const container = document.getElementById('results-container');
  container.innerHTML = '';

  sorted.forEach(([thinker]) => {
    const data = thinkerData[thinker];
    const card = document.createElement('div');
    card.className = 'result-card';
    card.dataset.t = thinker;
    card.innerHTML = `
      <p class="result-thinker">${data.name}</p>
      <p class="result-concept">${data.concept}</p>
      <p class="result-text">${data.text}</p>
    `;
    container.appendChild(card);
  });

  switchScreen('screen-results');
}

function restartQuiz() {
  startQuiz();
}

function switchScreen(id) {
  document.querySelectorAll('.quiz-screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}
