document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const testScreen = document.getElementById('test-screen');
    const resultScreen = document.getElementById('result-screen');
    const startScreen = document.getElementById('start-screen');
    const fullNameInput = document.getElementById('fullName');
    const nextSectionButton = document.getElementById('next-section');
    const finishEarlyButton = document.getElementById('finish-early');
    const resultsTableBody = document.querySelector('#results tbody');
    const retryButton = document.getElementById('retryButton');
    const segmentElement = document.getElementById('segment');
    const timerElement = document.getElementById('timer');
    const questionElement = document.getElementById('question');
    const answerButtons = document.querySelectorAll('.answer-button');
    
    let currentSection = 0;
    let timer;
    let startTime;
    const sections = [];
    let userName = '';

    // Initialize sections
    for (let i = 0; i < 15; i++) {
        sections.push({
            number: i + 1,
            correct: 0,
            incorrect: 0,
            total: 0
        });
    }

    // Function to start the test
    const startTest = () => {
        userName = fullNameInput.value.trim();
        if (userName === '') return;

        startScreen.style.display = 'none';
        testScreen.style.display = 'flex';
        resultScreen.style.display = 'none';

        startSection(currentSection);
    };

    // Function to start a specific section
    const startSection = (sectionIndex) => {
        if (timer) clearInterval(timer);

        currentSection = sectionIndex;
        if (currentSection >= sections.length) {
            showResults();
            return;
        }

        segmentElement.textContent = `Bagian ${currentSection + 1}`;
        startTime = Date.now();
        updateTimer();

        // Generate a question
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        questionElement.textContent = `${num1} + ${num2} = ?`;

        // Reset and enable answer buttons
        answerButtons.forEach(button => {
            button.classList.remove('disabled');
            button.addEventListener('click', () => handleAnswer(button.dataset.answer));
        });

        // Add event listener for keyboard inputs
        document.addEventListener('keydown', handleKeyboardInput);

        // Set up the "Lanjut ke bagian selanjutnya" button
        nextSectionButton.style.display = 'block';
        nextSectionButton.onclick = () => {
            clearInterval(timer);
            startSection(currentSection + 1);
        };

        // Set up the "Selesaikan lebih dulu" button
        finishEarlyButton.style.display = 'block';
        finishEarlyButton.onclick = showResults;
    };

    // Function to handle answer selection
    const handleAnswer = (answer) => {
        const [num1, num2] = questionElement.textContent.split(' + ').map(Number);
        const correctAnswer = (num1 + num2) % 2;
        const isCorrect = (answer == correctAnswer);

        if (isCorrect) {
            sections[currentSection].correct++;
        } else {
            sections[currentSection].incorrect++;
        }
        sections[currentSection].total++;

        if (timer) clearInterval(timer);
        document.querySelectorAll('.answer-button').forEach(button => button.classList.add('disabled'));
        setTimeout(() => startSection(currentSection + 1), 500);
    };

    // Function to handle keyboard input
    const handleKeyboardInput
