document.addEventListener('DOMContentLoaded', function() {
    const startPage = document.getElementById('start-page');
    const testPage = document.getElementById('test-page');
    const resultsPage = document.getElementById('results-page');
    const fullNameInput = document.getElementById('full-name');
    const startTestButton = document.getElementById('start-test');
    const finishTestButton = document.getElementById('finish-test');
    const retryTestButton = document.getElementById('retry-test');
    const timerElement = document.getElementById('timer');
    const timeElement = document.getElementById('time');
    const questionElement = document.getElementById('question');
    const answers = document.querySelectorAll('.answer');
    const resultsTableBody = document.querySelector('#results-table tbody');
    const warningElement = document.getElementById('warning');
    
    let currentSection = 0;
    let correctAnswers = 0;
    let totalQuestions = 0;
    let sectionResults = [];
    let timer;
    let timeLeft = 60;

    function startTest() {
        startPage.classList.add('hidden');
        testPage.classList.remove('hidden');
        startTimer();
        loadQuestion();
    }

    function startTimer() {
        timeLeft = 60;
        timeElement.textContent = timeLeft;
        timer = setInterval(() => {
            timeLeft--;
            timeElement.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                nextSection();
            }
        }, 1000);
    }

    function loadQuestion() {
        // Generate a random question
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        const correctAnswer = (num1 + num2) % 2;
        questionElement.textContent = `${num1} + ${num2} = ?`;
        questionElement.dataset.correctAnswer = correctAnswer;
    }

    function handleAnswer(answer) {
        if (answer === parseInt(questionElement.dataset.correctAnswer)) {
            correctAnswers++;
        }
        totalQuestions++;
        loadQuestion();
    }

    function nextSection() {
        clearInterval(timer);
        sectionResults.push({
            section: currentSection + 1,
            correct: correctAnswers,
            incorrect: totalQuestions - correctAnswers,
            accuracy: (correctAnswers / totalQuestions * 100).toFixed(2)
        });
        correctAnswers = 0;
        totalQuestions = 0;
        currentSection++;
        if (currentSection >= 50) {
            showResults();
        } else {
            startTimer();
            loadQuestion();
        }
    }

    function showResults() {
        testPage.classList.add('hidden');
        resultsPage.classList.remove('hidden');
        resultsTableBody.innerHTML = '';
        sectionResults.forEach(result => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${result.section}</td>
                <td>${result.correct}</td>
                <td>${result.incorrect}</td>
                <td>${result.accuracy}%</td>
            `;
            resultsTableBody.appendChild(row);
        });
    }

    startTestButton.addEventListener('click', startTest);

    finishTestButton.addEventListener('click', function() {
        clearInterval(timer);
        nextSection();
    });

    retryTestButton.addEventListener('click', function() {
        location.reload();
    });

    answers.forEach(button => {
        button.addEventListener('click', function() {
            handleAnswer(parseInt(this.id.split('-')[1]));
        });
    });

    fullNameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            startTest();
        }
    });
});
