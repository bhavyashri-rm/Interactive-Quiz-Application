
const questions = [
    {
        question: "Which language is primarily used for web page structure?",
        options: ["Python", "HTML", "Java", "C"],
        answer: "HTML"
    },
    {
        question: "What does CPU stand for?",
        options: [
            "Central Processing Unit",
            "Computer Personal Unit",
            "Central Program Utility",
            "Control Processing User"
        ],
        answer: "Central Processing Unit"
    },
    {
        question: "Which of the following is a JavaScript framework?",
        options: ["React", "MySQL", "HTML", "C++"],
        answer: "React"
    },
    {
        question: "Which data structure follows FIFO?",
        options: ["Stack", "Queue", "Tree", "Graph"],
        answer: "Queue"
    },
    {
        question: "Which symbol is used for comments in JavaScript (single line)?",
        options: ["<!-- -->", "//", "##", "**"],
        answer: "//"
    },
    {
        question: "Which company developed the Java programming language?",
        options: ["Microsoft", "Google", "Sun Microsystems", "Apple"],
        answer: "Sun Microsystems"
    },
    {
        question: "What does SQL stand for?",
        options: [
            "Structured Query Language",
            "Simple Question Language",
            "System Query Logic",
            "Sequential Query List"
        ],
        answer: "Structured Query Language"
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        answer: "<a>"
    },
    {
        question: "Which sorting algorithm repeatedly compares adjacent elements?",
        options: [
            "Binary Search",
            "Merge Sort",
            "Bubble Sort",
            "Quick Sort"
        ],
        answer: "Bubble Sort"
    },
    {
        question: "Which database language is used to retrieve data?",
        options: ["SELECT", "UPDATE", "DELETE", "INSERT"],
        answer: "SELECT"
    }
];

const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const questionCount = document.getElementById("question-count");
const scoreDisplay = document.getElementById("score-display");
const progressBar = document.getElementById("progress-bar");
const feedback = document.getElementById("feedback");
const nextButton = document.getElementById("next-btn");

let currentQuestion = 0;
let score = 0;
let answered = false;

// START QUIZ

document.getElementById("start-btn").addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;

    welcomeScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    showQuestion();
});

// DISPLAY QUESTION

function showQuestion() {
    answered = false;

    const current = questions[currentQuestion];

    questionElement.textContent = current.question;

    questionCount.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    scoreDisplay.textContent = `Score: ${score}`;

    progressBar.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    feedback.textContent = "";
    nextButton.classList.add("hidden");

    optionsContainer.innerHTML = "";

    current.options.forEach(option => {
        const button = document.createElement("button");

        button.className = "option-btn";
        button.textContent = option;

        button.addEventListener("click", () => {
            checkAnswer(button, option);
        });

        optionsContainer.appendChild(button);
    });
}

// CHECK ANSWER

function checkAnswer(selectedButton, selectedOption) {
    if (answered) return;

    answered = true;

    const correctAnswer = questions[currentQuestion].answer;

    const allOptions = document.querySelectorAll(".option-btn");

    allOptions.forEach(button => {
        button.disabled = true;

        if (button.textContent === correctAnswer) {
            button.classList.add("correct");
        }
    });

    if (selectedOption === correctAnswer) {
        score++;
        feedback.textContent = "Correct Answer! Great Job!";
        feedback.style.color = "#2ecc71";
    } else {
        selectedButton.classList.add("wrong");
        feedback.textContent = `Incorrect! Correct answer: ${correctAnswer}`;
        feedback.style.color = "#ff7777";
    }

    scoreDisplay.textContent = `Score: ${score}`;

    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "View Results"
            : "Next Question";

    nextButton.classList.remove("hidden");
}

// NEXT QUESTION

nextButton.addEventListener("click", () => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
});

// SHOW FINAL RESULTS

function showResults() {
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    const percentage = Math.round(
        (score / questions.length) * 100
    );

    document.getElementById("final-score").textContent =
        `${score}/${questions.length}`;

    document.getElementById("percentage").textContent =
        `Your score: ${percentage}%`;

    let message;

    if (percentage === 100) {
        message = "Perfect Score! Excellent!";
    } else if (percentage >= 70) {
        message = "Great Work! Keep it up!";
    } else if (percentage >= 40) {
        message = "Good Try! Keep Practicing!";
    } else {
        message = "Don't Give Up! Try Again!";
    }

    document.getElementById("result-message").textContent = message;
}

// RESTART QUIZ

document.getElementById("restart-btn").addEventListener("click", () => {
    resultScreen.classList.add("hidden");
    welcomeScreen.classList.remove("hidden");
});
