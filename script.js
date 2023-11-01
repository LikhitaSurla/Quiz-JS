
const questions = [
    {
      question: "Jimmys's father has 3 sons.Paul1 and Paul2.Can you guess the name of third son?",
      answers: [
        { text: 'Paul3', correct: false },
        { text: 'Jimmy', correct: true },
        { text: 'PaulIII', correct: false },
        { text: 'Paul', correct: false }, 
      ],
    },
    {
      question: 'You are in third place now in a race.What place will you be in when you pass the person in second place?',
      answers: [
        { text: 'first', correct: false },
        { text: 'second', correct: true },
        { text: 'third', correct: false },
        { text: 'fourth', correct: false },
      ],
    },
    {
      question: "How many months have 28 days?",
      answers: [
        { text: 'February', correct: false },
        { text: 'march', correct: false },
        { text: 'All', correct: true },
        { text: 'None', correct: false },
      ],
    },
    {
      question: 'How many 0.5cm slices can you cut from a bread that is 25cm long?',
      answers: [
        { text: '48', correct: false },
        { text: '50', correct: true },
        { text: '200', correct: false },
        { text: '25', correct: false },
      ],
    },
    {
      question: "Divide 30 by half and add 10 ?",
      answers: [
        { text: '25', correct: false },
        { text: '50', correct: false },
        { text: '70', correct: true },
        { text: 'None', correct: false },
      ],
    },
  ];



const startQuizBtn = document.getElementById('startQuizBtn');

function pressQuiz() {
  const modal = document.getElementById('quizModal');
  document.body.removeChild(modal);
}

startQuizBtn.addEventListener('click', pressQuiz);

const questionElements = document.getElementById('question');
const highscore = document.getElementById('highscore');
const attempts = document.getElementById('attempts');
const answerBtn = document.getElementById('answer-btns');
const nxtBtn = document.getElementById('nxt-btn');
let currentQuestionIdx = 0;
let score = 0;
let attempt = 0;
let currentHighscore = 0;

function startQuiz() {
  currentQuestionIdx = 0;
  score = 0;
  nxtBtn.textContent = 'Next';
  showQuestions();
}

function showQuestions() {
  resetQuestion();
  let currentQuestion = questions[currentQuestionIdx];
  let questionNo = currentQuestionIdx + 1;
  questionElements.innerHTML =
    questionNo + '. ' + questions[currentQuestionIdx].question;
  currentQuestion.answers.forEach(answer => {
    const btn = document.createElement('button');
    btn.textContent = answer.text;
    btn.classList.add('btn');
    answerBtn.appendChild(btn);
    if (answer.correct) {
      btn.dataset.correct = answer.correct;
    }
    btn.addEventListener('click', selectedAnswer);
  });
}

function selectedAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === 'true';
  if (isCorrect) {
    selectedBtn.classList.add('correct');
    score++;
  } else {
    selectedBtn.classList.add('incorrect');
  }

  Array.from(answerBtn.children).forEach(button => {
    if (button.dataset.correct == 'true') {
      button.classList.add('correct');
    }
    button.disabled = true;
  });

  nxtBtn.style.display = 'block';
}

nxtBtn.addEventListener('click', () => {
  if (currentQuestionIdx < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

function handleNextButton() {
  currentQuestionIdx++;
  if (currentQuestionIdx < questions.length) {
    showQuestions();
  } else {
    showScore();
  }
}

function resetQuestion() {
  nxtBtn.style.display = 'none';

  while (answerBtn.firstChild) {
    answerBtn.removeChild(answerBtn.firstChild);
  }
}

function showScore() {
  resetQuestion();
  questionElements.textContent = `You  scored  ${score} out of ${questions.length}`; //template literals
  nxtBtn.textContent = 'Play Again';
  nxtBtn.style.display = 'block';
  if (score > currentHighscore) {
    highscore.textContent = `HighScore : ${score}`;
  }
  attempt++;
  attempts.textContent = `Attempts : ${attempt}`;
}
startQuiz();
