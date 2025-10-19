const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const exitButton = document.getElementById("exit-btn");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const scoreText = document.getElementById("score");
const timerElement = document.getElementById("timer"); // thêm phần hiển thị thời gian

let shuffledQuestions, currentQuestionIndex, score, timeLeft, timerInterval;

const questions = [
  // HTML
  {
    question: "HTML là viết tắt của gì?",
    answers: [
      { text: "HyperText Markup Language", correct: true },
      { text: "HighText Machine Language", correct: false },
      { text: "Hyperlinks Markup Language", correct: false },
      { text: "Home Tool Markup Language", correct: false },
    ],
  },
  {
    question: "Thẻ nào dùng để chèn ảnh vào HTML?",
    answers: [
      { text: "<image>", correct: false },
      { text: "<img>", correct: true },
      { text: "<src>", correct: false },
      { text: "<picture>", correct: false },
    ],
  },
  {
    question: "Thẻ nào để tạo một liên kết?",
    answers: [
      { text: "<a>", correct: true },
      { text: "<link>", correct: false },
      { text: "<url>", correct: false },
      { text: "<href>", correct: false },
    ],
  },
  {
    question: "Thuộc tính nào của thẻ <a> xác định đường dẫn?",
    answers: [
      { text: "src", correct: false },
      { text: "path", correct: false },
      { text: "href", correct: true },
      { text: "link", correct: false },
    ],
  },

  // CSS
  {
    question: "CSS dùng để làm gì?",
    answers: [
      { text: "Tạo cấu trúc trang web", correct: false },
      { text: "Thêm logic cho web", correct: false },
      { text: "Trang trí và định dạng giao diện", correct: true },
      { text: "Xử lý dữ liệu", correct: false },
    ],
  },
  {
    question: "Cú pháp đúng để đổi màu chữ trong CSS?",
    answers: [
      { text: "font-color: red;", correct: false },
      { text: "text-color: red;", correct: false },
      { text: "color: red;", correct: true },
      { text: "text: red;", correct: false },
    ],
  },
  {
    question: "Thuộc tính nào dùng để căn giữa văn bản?",
    answers: [
      { text: "align: center;", correct: false },
      { text: "text-align: center;", correct: true },
      { text: "font-align: middle;", correct: false },
      { text: "justify: center;", correct: false },
    ],
  },
  {
    question: "File CSS thường có phần mở rộng là gì?",
    answers: [
      { text: ".html", correct: false },
      { text: ".css", correct: true },
      { text: ".js", correct: false },
      { text: ".scss", correct: false },
    ],
  },

  // JavaScript
  {
    question: "JavaScript được dùng để làm gì?",
    answers: [
      { text: "Trang trí giao diện", correct: false },
      { text: "Thêm tương tác cho web", correct: true },
      { text: "Tạo cấu trúc HTML", correct: false },
      { text: "Lưu dữ liệu", correct: false },
    ],
  },
  {
    question: "Cú pháp đúng để in ra console là?",
    answers: [
      { text: "console.write()", correct: false },
      { text: "console.print()", correct: false },
      { text: "console.log()", correct: true },
      { text: "log.console()", correct: false },
    ],
  },
  {
    question: "Kết quả của 2 + '2' trong JavaScript là gì?",
    answers: [
      { text: "4", correct: false },
      { text: "22", correct: true },
      { text: "Error", correct: false },
      { text: "NaN", correct: false },
    ],
  },
  {
    question: "DOM trong JavaScript là gì?",
    answers: [
      { text: "Document Object Model", correct: true },
      { text: "Data Object Management", correct: false },
      { text: "Dynamic Online Model", correct: false },
      { text: "Document Order Method", correct: false },
    ],
  },

  // IT
  {
    question: "Git dùng để làm gì?",
    answers: [
      { text: "Lưu trữ file tạm thời", correct: false },
      { text: "Quản lý phiên bản code", correct: true },
      { text: "Tạo hiệu ứng website", correct: false },
      { text: "Thiết kế cơ sở dữ liệu", correct: false },
    ],
  },
  {
    question: "API là viết tắt của?",
    answers: [
      { text: "Application Programming Interface", correct: true },
      { text: "App Protocol Internet", correct: false },
      { text: "Applied Program Integration", correct: false },
      { text: "Automation Process Input", correct: false },
    ],
  },
  {
    question: "Framework nào sau đây dùng cho Frontend?",
    answers: [
      { text: "Laravel", correct: false },
      { text: "Django", correct: false },
      { text: "ReactJS", correct: true },
      { text: "Spring Boot", correct: false },
    ],
  },
];

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});
exitButton.addEventListener("click", exitGame);

function startGame() {
  startButton.classList.add("hide");
  exitButton.classList.remove("hide");
  scoreText.textContent = "";
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  score = 0;
  questionContainer.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
  startTimer();
}

function showQuestion(question) {
  questionElement.textContent = question.question;
  answerButtons.innerHTML = "";
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    if (answer.correct) button.dataset.correct = true;
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  clearInterval(timerInterval);
  timeLeft = 10;
  timerElement.textContent = `⏰ ${timeLeft}s`;
  nextButton.classList.add("hide");
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `⏰ ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      handleTimeOut();
    }
  }, 1000);
}

function handleTimeOut() {
  Array.from(answerButtons.children).forEach((button) => {
    button.disabled = true;
  });
  timerElement.textContent = "⏳ Hết giờ!";
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.textContent = "Restart";
    startButton.classList.remove("hide");
    scoreText.textContent = `🎉 Điểm của bạn: ${score}/${questions.length}`;
  }
}

function selectAnswer(e) {
  clearInterval(timerInterval);
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  if (correct) {
    score++;
    selectedButton.classList.add("correct");
  } else {
    selectedButton.classList.add("wrong");
  }

  Array.from(answerButtons.children).forEach((button) => {
    button.disabled = true;
    if (button.dataset.correct) button.classList.add("correct");
  });

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.textContent = "Restart";
    startButton.classList.remove("hide");
    scoreText.textContent = `🎯 Điểm của bạn: ${score}/${questions.length}`;
  }
}

function exitGame() {
  clearInterval(timerInterval);
  questionContainer.classList.add("hide");
  startButton.classList.remove("hide");
  nextButton.classList.add("hide");
  exitButton.classList.add("hide");
  scoreText.textContent = "";
  timerElement.textContent = "";
}
