const quizQuestions = [
  {
    question:
      "Which component is responsible for temporary data storage while the computer is running?",
    options: [
      "Hard Disk Drive",
      "RAM (Random Access Memory)",
      "GPU",
      "Power Supply",
    ],
    correctAnswer: "RAM (Random Access Memory)",
    timeLimit: 10,
  },
  {
    question: "Which device is used to output sound from a computer?",
    options: ["Keyboard", "Monitor", "Speaker", "Mouse"],
    correctAnswer: "Speaker",
    timeLimit: 12,
  },
  {
    question: "What does the CPU primarily do in a computer system?",
    options: [
      "Stores all files",
      "Performs arithmetic and logic operations",
      "Renders graphics only",
      "Manages internet connections",
    ],
    correctAnswer: "Performs arithmetic and logic operations",
    timeLimit: 15,
  },
];

let currentQuestionIndex = 0;
let userScore = 0;
let timer;
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

function beginQuiz() {
  console.log(" WELCOME TO THE TRIVIA QUESTIONS CLI GAME!");

  console.log(`You will answer ${quizQuestions.length} questions.\n`);
  presentQuestion();
}

function presentQuestion() {
  if (currentQuestionIndex >= quizQuestions.length) {
    endGame();
    return;
  }

  const currentQ = quizQuestions[currentQuestionIndex];
  console.log(
    `\n QUESTION ${currentQuestionIndex + 1}/${quizQuestions.length}`
  );
  console.log("=".repeat(40));
  console.log(`${currentQ.question}`);
  console.log("-".repeat(40));

  currentQ.options.forEach((option, index) => {
    console.log(`${index + 1}. ${option}`);
  });

  console.log(`\n⏰ Time Limit: ${currentQ.timeLimit} seconds`);
  console.log("Enter the NUMBER of your answer (1-4):");
  startTimer(currentQ.timeLimit);
  waitForAnswer(currentQ);
}

function startTimer(timeLimit) {
  let timeLeft = timeLimit;
  timer = setInterval(() => {
    timeLeft--;
    process.stdout.write(`\r⏳ Time remaining: ${timeLeft}s `);
    if (timeLeft <= 0) {
      clearInterval(timer);
      console.log("\n\n⏰ TIME'S UP!");
      currentQuestionIndex++;
      presentQuestion();
    }
  }, 1000);
}

function captureAnswer(question) {
  readline.question("", (userInput) => {
    clearInterval(timer);
    const answerIndex = parseInt(userInput) - 1;

    if (
      isNaN(answerIndex) ||
      answerIndex < 0 ||
      answerIndex >= question.options.length
    ) {
      console.log("❌ Invalid input.");
      currentQuestionIndex++;
      presentQuestion();
      return;
    }

    const userAnswer = question.options[answerIndex];
    const isCorrect = userAnswer === question.correctAnswer;

    if (isCorrect) {
      userScore++;
      console.log(`CORRECT Answer`);
    } else {
      console.log(`Wrong answer. Correct: "${question.correctAnswer}"`);
    }

    currentQuestionIndex++;
    setTimeout(() => {
      presentQuestion();
    }, 1500);
  });
}

function showResults() {
  console.log("\n" + "=".repeat(50));
  console.log("You've completed the quiz!");
  console.log("=".repeat(50));

  const totalQuestions = quizQuestions.length;
  const scorePercentage = (userScore / totalQuestions) * 100;

  console.log(`YOUR score is:`);
  console.log(`   Correct: ${userScore}/${totalQuestions}`);
  console.log(`   Score: ${scorePercentage.toFixed(1)}%`);

  if (scorePercentage >= 80) console.log(" EXCELLENT WORK!");
  else if (scorePercentage >= 60) console.log(" GOOD JOB!");
  else if (scorePercentage >= 40) console.log(" NOT BAD!");
  else console.log(" BETTER LUCK NEXT TIME!");
  readline.close();
}

// Start the game
beginQuiz();
