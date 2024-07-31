document.addEventListener('DOMContentLoaded', () => {
    const startPage = document.getElementById('start-page');
    const testPage = document.getElementById('test-page');
    const resultsPage = document.getElementById('results-page');
    const startTestButton = document.getElementById('start-test');
    const finishTestButton = document.getElementById('finish-test');
    const tryAgainButton = document.getElementById('try-again');
    const timerElement = document.getElementById('timer-count');
    const questionElement = document.getElementById('question');
    const resultsTable = document.getElementById('results-table');
    const fullNameInput = document.getElementById('full-name');
    const answerButtons = document.querySelectorAll('.answer-btn');
    const warningElement = document.getElementById('warning');

    let currentSection = 0;
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let totalQuestions = 0;
    let timer;
    let questions = [];
    let sectionData = [];

    function showSection(section) {
        startPage.classList.add('hidden');
        testPage.classList.add('hidden');
        resultsPage.classList.add('hidden');

        if (section === 'start') {
            startPage.classList.remove('hidden');
        } else if (section === 'test') {
            testPage.classList.remove('hidden');
        } else if (section === 'results') {
            resultsPage.classList.remove('hidden');
        } else {
            console.error('Unknown section:', section);
        }
    }

    function startTest() {
        showSection('test');
        resetTimer();
        loadQuestions();
        showQuestion();
    }

    function finishTest() {
        clearInterval(timer);
        showSection('results');
        showResults();
    }

    function resetTimer() {
        let timeLeft = 60;
        timerElement.textContent = timeLeft;
        timer = setInterval(() => {
            timeLeft--;
            timerElement.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                nextSection();
            }
        }, 1000);
    }

    function loadQuestions() {
        questions = [];
        for (let i = 0; i < 100; i++) {
            let a = Math.floor(Math.random() * 10);
            let b = Math.floor(Math.random() * 10);
            questions.push({ question: `${a} + ${b} = ?`, answer: (a + b) % 2 });
        }
    }

    function showQuestion() {
        if (questions.length > 0) {
            let q = questions.shift();
            questionElement.textContent = q.question;
            totalQuestions++;
        } else {
            nextSection();
        }
    }

    function handleAnswer(value) {
        let currentQuestion = questionElement.textContent.split(' ')[0];
        let answer = (parseInt(currentQuestion.split('+')[0]) + parseInt(currentQuestion.split('+')[1])) % 2;
        if (parseInt(value) === answer) {
            correctAnswers++;
        } else {
            incorrectAnswers++;
        }
        showQuestion();
    }

    function nextSection() {
        clearInterval(timer);
        sectionData.push({ correct: correctAnswers, incorrect: incorrectAnswers, accuracy: (correctAnswers / totalQuestions) * 100 });
        if (currentSection < 49) {
            currentSection++;
            correctAnswers = 0;
            incorrectAnswers = 0;
            totalQuestions = 0;
            resetTimer();
            loadQuestions();
            showQuestion();
        } else {
            finishTest();
        }
    }

    function showResults() {
        resultsTable.innerHTML = '';
        sectionData.forEach((section, index) => {
            let row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${section.correct}</td>
                <td>${section.incorrect}</td>
                <td>${section.accuracy.toFixed(2)}%</td>
            `;
            resultsTable.appendChild(row);
        });
    }

    startTestButton.addEventListener('click', () => {
        if (fullNameInput.value.trim()) {
            showSection('test');
            startTest();
        } else {
            alert('Harap isi nama lengkap.');
        }
    });

    finishTestButton.addEventListener('click', finishTest);

    tryAgainButton.addEventListener('click', () => {
        location.reload();
    });

    answerButtons.forEach(button => {
        button.addEventListener('click', () => handleAnswer(button.dataset.value));
    });
});
