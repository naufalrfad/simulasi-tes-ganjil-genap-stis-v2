document.addEventListener('DOMContentLoaded', () => {
    const sections = 15;
    let currentSection = 1;
    let timer;
    let score = Array(sections).fill({correct: 0, incorrect: 0});
    const questionsPerSection = 100;
    let questionIndex = 0;
    
    const startButton = document.getElementById('start-test');
    const testScreen = document.getElementById('test-screen');
    const startScreen = document.getElementById('start-screen');
    const resultScreen = document.getElementById('result-screen');
    const nextButton = document.getElementById('next-section');
    const skipButton = document.getElementById('skip-section');
    const resultTableBody = document.getElementById('result-body');
    const retryButton = document.getElementById('retry-test');
    const timerDisplay = document.getElementById('time-left');
    const sectionNumberDisplay = document.getElementById('section-number');
    const resultName = document.getElementById('result-name');
    const questionContainer = document.getElementById('question-container');
    const questionText = document.getElementById('question');
    
    startButton.addEventListener('click', () => {
        startScreen.style.display = 'none';
        testScreen.style.display = 'block';
        startSection(currentSection);
    });
    
    nextButton.addEventListener('click', () => {
        nextSection();
    });
    
    skipButton.addEventListener('click', () => {
        finishTest();
    });
    
    retryButton.addEventListener('click', () => {
        location.reload();
    });
    
    function startSection(section) {
        questionIndex = 0;
        sectionNumberDisplay.textContent = section;
        startTimer();
        loadQuestion();
    }
    
    function startTimer() {
        let timeLeft = 60;
        timerDisplay.textContent = timeLeft;
        timer = setInterval(() => {
            timeLeft -= 1;
            timerDisplay.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                nextSection();
            }
        }, 1000);
    }
    
    function loadQuestion() {
        if (questionIndex >= questionsPerSection) {
            nextSection();
            return;
        }
        const num1 = Math.floor(Math.random() * 9) + 1;
        const num2 = Math.floor(Math.random() * 9) + 1;
        questionText.textContent = `${num1} + ${num2} = ?`;
        
        questionContainer.querySelectorAll('.answer-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                handleAnswer(btn.dataset.answer);
            });
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === '0' || e.key === '1') {
                handleAnswer(e.key);
            }
        });
    }
    
    function handleAnswer(answer) {
        const num1 = parseInt(questionText.textContent.split(' ')[0]);
        const num2 = parseInt(questionText.textContent.split(' ')[2]);
        const correctAnswer = (num1 + num2) % 2 === 0 ? '0' : '1';
        if (answer === correctAnswer) {
            score[currentSection - 1].correct += 1;
        } else {
            score[currentSection - 1].incorrect += 1;
        }
        questionIndex += 1;
        loadQuestion();
    }
    
    function nextSection() {
        clearInterval(timer);
        if (currentSection < sections) {
            currentSection += 1;
            startSection(currentSection);
        } else {
            finishTest();
        }
    }
    
    function finishTest() {
        testScreen.style.display = 'none';
        resultScreen.style.display = 'block';
        resultName.textContent = document.getElementById('full-name').value;
        displayResults();
    }
    
    function displayResults() {
        resultTableBody.innerHTML = '';
        score.forEach((section, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${section.correct}</td>
                <td>${section.incorrect}</td>
            `;
            resultTableBody.appendChild(row);
        });
    }
});
