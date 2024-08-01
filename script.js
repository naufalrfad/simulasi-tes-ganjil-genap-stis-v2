document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const testScreen = document.getElementById('test-screen');
    const resultScreen = document.getElementById('result-screen');
    const startButton = document.getElementById('start-button');
    const nextSectionButton = document.getElementById('next-section-button');
    const finishButton = document.getElementById('finish-button');
    const retryButton = document.getElementById('retry-button');
    const fullNameInput = document.getElementById('full-name');
    const resultName = document.getElementById('result-name');
    const timerElement = document.getElementById('timer');
    const questionElement = document.getElementById('question');
    const answerButtons = Array.from(document.getElementsByClassName('answer-button'));
    const resultTableBody = document.querySelector('#result-table tbody');

    let currentSection = 1;
    let currentQuestion = 0;
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let timer;
    let testName;

    function startTimer() {
        let timeLeft = 60;
        timerElement.textContent = `Sisa waktu: ${timeLeft} detik`;
        timer = setInterval(() => {
            timeLeft--;
            timerElement.textContent = `Sisa waktu: ${timeLeft} detik`;
            if (timeLeft <= 0) {
                nextSection();
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timer);
    }

    function generateQuestion() {
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        const answer = (num1 + num2) % 2;
        questionElement.textContent = `${num1} + ${num2} = ?`;
        return answer;
    }

    function nextQuestion() {
        currentQuestion++;
        if (currentQuestion > 100) {
            nextSection();
            return;
        }
        const correctAnswer = generateQuestion();
        answerButtons.forEach(button => {
            button.onclick = () => {
                if (parseInt(button.getAttribute('data-answer')) === correctAnswer) {
                    correctAnswers++;
                } else {
                    wrongAnswers++;
                }
                nextQuestion();
            };
        });
    }

    function nextSection() {
        stopTimer();
        saveResults();
        currentSection++;
        if (currentSection > 50) {
            showResults();
            return;
        }
        resetSection();
    }

    function resetSection() {
        currentQuestion = 0;
        correctAnswers = 0;
        wrongAnswers = 0;
        startTimer();
        nextQuestion();
    }

    function saveResults() {
        const row = document.createElement('tr');
        const accuracy = ((correctAnswers / (correctAnswers + wrongAnswers)) * 100).toFixed(2);
        row.innerHTML = `
            <td>Bagian ${currentSection}</td>
            <td>${correctAnswers}</td>
            <td>${wrongAnswers}</td>
            <td>${accuracy}%</td>
        `;
        resultTableBody.appendChild(row);
    }

    function showResults() {
        testScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');
        resultName.textContent = `Nama: ${testName}`;
    }

    startButton.onclick = () => {
        testName = fullNameInput.value;
        if (!testName) {
            alert('Mohon isi nama lengkap');
            return;
        }
        startScreen.classList.add('hidden');
        testScreen.classList.remove('hidden');
        resetSection();
    };

    nextSectionButton.onclick = nextSection;
    finishButton.onclick = showResults;
    retryButton.onclick = () => {
        resultScreen.classList.add('hidden');
        startScreen.classList.remove('hidden');
        resultTableBody.innerHTML = '';
        currentSection = 1;
    };
});
