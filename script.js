document.addEventListener("DOMContentLoaded", function () {
    const startPage = document.getElementById("start-page");
    const testPage = document.getElementById("test-page");
    const resultPage = document.getElementById("result-page");

    const startTestButton = document.getElementById("start-test");
    const finishNowButton = document.getElementById("finish-now");
    const nextSectionButton = document.getElementById("next-section");
    const retryButton = document.getElementById("retry");

    const fullNameInput = document.getElementById("full-name");
    const timerDisplay = document.getElementById("timer");
    const sectionNumberDisplay = document.getElementById("section-number");
    const questionDisplay = document.getElementById("question");
    const answerButtons = document.querySelectorAll(".answer");

    let fullName = "";
    let currentSection = 1;
    let currentQuestion = 0;
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let timer;
    let results = [];

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
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        questionDisplay.textContent = `${num1} + ${num2}`;
        return (num1 + num2) % 2;
    }

    function nextSection() {
        clearInterval(timer); // Berhenti timer saat beralih ke bagian berikutnya
        results.push({
            section: currentSection,
            correct: correctAnswers,
            wrong: wrongAnswers,
            accuracy: ((correctAnswers / (correctAnswers + wrongAnswers)) * 100).toFixed(2) + "%"
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
                if (parseInt(button.id.split('-')[1]) === correctAnswer) {
                    correctAnswers++;
                } else {
                    wrongAnswers++;
                }
                nextQuestion();
            }
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
        fullName = fullNameInput.value;
        if (fullName) {
            startPage.style.display = "none";
            testPage.style.display = "block";
            startTimer(60);
            nextQuestion();
        } else {
            alert("Harap isi nama lengkap Anda.");
        }
    }

    finishNowButton.onclick = showResults;

    nextSectionButton.onclick = nextSection;

    retryButton.onclick = () => {
        location.reload();
    }

    fullNameInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            startTestButton.click();
        }
    });

    document.addEventListener("keydown", function (e) {
        if (testPage.style.display === "block") {
            if (e.key === "0" || e.key === "1") {
                document.getElementById(`answer-${e.key}`).click();
            }
        }
    });
});
