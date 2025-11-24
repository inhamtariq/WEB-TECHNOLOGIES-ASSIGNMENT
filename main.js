// Questions array (MCQs + True/False)
const questions = [
  { text: "HTML stands for?", options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"], answer: 0 },
  { text: "CSS Flexbox helps in responsiveness.", options: ["True", "False"], answer: 0 },
  { text: "Which method adds a click listener?", options: ["addEventListener", "onClick()", "listenClick()", "bindEvent()"], answer: 0 },
  { text: "JavaScript can change HTML content.", options: ["True", "False"], answer: 0 },
  { text: "DOM stands for?", options: ["Document Object Model", "Data Object Method", "Desktop Object Management"], answer: 0 }
];

let current = 0;
let score = 0;

// DOM elements
const welcomeScreen = document.getElementById("welcome");
const quizScreen = document.getElementById("quiz");
const resultScreen = document.getElementById("result");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const progressEl = document.getElementById("progress");
const scoreEl = document.getElementById("score");
const finalScoreEl = document.getElementById("finalScore");
const finalMessageEl = document.getElementById("finalMessage");

// Show screen
function showScreen(screen) {
  [welcomeScreen, quizScreen, resultScreen].forEach(s => s.classList.remove("active"));
  screen.classList.add("active");
}

// Load question
function loadQuestion() {
  feedbackEl.textContent = "";
  nextBtn.disabled = true;
  const q = questions[current];
  questionEl.textContent = q.text;
  progressEl.textContent = `Question ${current + 1} of ${questions.length}`;
  scoreEl.textContent = `Score: ${score}`;
  optionsEl.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("div");
    btn.className = "option";
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(i);
    optionsEl.appendChild(btn);
  });
}

// Check answer
function checkAnswer(selected) {
  const correct = questions[current].answer;
  if (selected === correct) {
    feedbackEl.textContent = "Correct!";
    feedbackEl.className = "feedback correct";
    score++;
  } else {
    feedbackEl.textContent = "Wrong!";
    feedbackEl.className = "feedback wrong";
  }
  scoreEl.textContent = `Score: ${score}`;
  nextBtn.disabled = false;
  // Auto next after 1s
  setTimeout(() => goNext(), 1000);
}

// Next question
function goNext() {
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

// Show result
function showResult() {
  showScreen(resultScreen);
  finalScoreEl.textContent = `Your score: ${score} / ${questions.length}`;
  if (score >= 4) {
    finalMessageEl.textContent = "Great Job!";
  } else if (score >= 2) {
    finalMessageEl.textContent = "Good effort, keep practicing!";
  } else {
    finalMessageEl.textContent = "Try Again!";
  }
}

// Event listeners
startBtn.addEventListener("click", () => {
  current = 0;
  score = 0;
  showScreen(quizScreen);
  loadQuestion();
});

nextBtn.addEventListener("click", () => goNext());

restartBtn.addEventListener("click", () => {
  showScreen(welcomeScreen);
});