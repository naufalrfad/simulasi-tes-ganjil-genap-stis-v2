document.addEventListener("DOMContentLoaded", function () {
    const startPage = document.getElementById("start-page");
    const testPage = document.getElementById("test-page");
    const resultPage = document.getElementById("result-page");

    const startTestButton = document.getElementById("start-test");
    const finishNowButton = document.getElementById("finish-now");
    const nextSectionButton = document.getElementById("next-section");
    const retryButton = document.getElementById("retry");

    const timerDisplay = document.getElementById("timer");
    const sectionNumberDisplay = document.getElementById("section-number");
    const questionDisplay = document.getElementById("question");
    const answerButtons = document.querySelectorAll(".answer");

    let currentSection = 1;
    let currentQuestion = 0;
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let timer;
    let results = [];

    function stopTimer() {
        clearInterval(timer);
    }

    function startTimer(duration) {
        let timeRemaining = duration;
        timerDisplay.textContent = `Sisa waktu: ${timeRemaining} detik`;

        timer = setInterval(() => {
            timeRemaining--;
            timerDisplay.textContent = `Sisa waktu: ${timeRemaining} detik`;

            if (timeRemaining <= 0) {
                clearInterval(timer);
                nextSection();
            }
        }, 1000);
    }

    function generateQuestion() {
        const num1 = Math.floor(Math.random() * 9) + 1;
        const num2 = Math.floor(Math.random() * 9) + 1;
        questionDisplay.textContent = `${num1} + ${num2}`;
        return (num1 + num2) % 2;
    }

    function recordAnswer(isCorrect) {
        if (isCorrect) {
            correctAnswers++;
        } else {
            wrongAnswers++;
        }
    }

    function nextSection() {
        stopTimer();

        results.push({
            section: currentSection,
            correct: correctAnswers,
            wrong: wrongAnswers,
            accuracy: (correctAnswers + wrongAnswers > 0) ? 
                ((correctAnswers / (correctAnswers + wrongAnswers)) * 100).toFixed(2) + "%" : "-"
        });

        if (currentSection >= 50) {
            showResults();
            return;
        }

        currentSection++;
        currentQuestion = 0;
        correctAnswers = 0;
        wrongAnswers = 0;
        sectionNumberDisplay.textContent = `Bagian ke-${currentSection}`;
        startTimer(60);
        nextQuestion();
    }

    function nextQuestion() {
        if (currentQuestion >= 100) {
            nextSection();
            return;
        }
        currentQuestion++;
        const correctAnswer = generateQuestion();
        answerButtons.forEach(button => {
            button.onclick = () => {
                recordAnswer(parseInt(button.id.split('-')[1]) === correctAnswer);
                nextQuestion();
            };
        });
    }

    function showResults() {
        testPage.style.display = "none";
        resultPage.style.display = "block";

        const resultsTable = document.getElementById("results-table");
        resultsTable.innerHTML = "";

        results.forEach(result => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${result.section}</td>
                <td>${result.correct}</td>
                <td>${result.wrong}</td>
                <td>${result.accuracy}</td>
            `;
            resultsTable.appendChild(row);
        });
    }

    startTestButton.onclick = () => {
        // Langsung pindah ke halaman tes, mulai timer dan pertanyaan
        startPage.style.display = "none";
        testPage.style.display = "block";
        startTimer(60);
        nextQuestion();
    };

    finishNowButton.onclick = () => {
        stopTimer();
        results.push({
            section: currentSection,
            correct: correctAnswers,
            wrong: wrongAnswers,
            accuracy: (correctAnswers + wrongAnswers > 0) ? 
                ((correctAnswers / (correctAnswers + wrongAnswers)) * 100).toFixed(2) + "%" : "-"
        });
        showResults();
    };

    nextSectionButton.onclick = nextSection;

    retryButton.onclick = () => {
        location.reload();
    };

    document.addEventListener("keydown", function (e) {
        if (testPage.style.display === "block") {
            if (e.key === "0" || e.key === "1") {
                document.getElementById(`answer-${e.key}`).click();
            }
        }
    });
});
