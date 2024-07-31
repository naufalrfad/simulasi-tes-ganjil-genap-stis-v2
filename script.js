document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('startButton');
    const fullNameInput = document.getElementById('fullName');
    const timerElement = document.getElementById('timer');
    const questionElement = document.getElementById('question');
    const sectionElement = document.getElementById('section');
    const resultSection = document.getElementById('resultSection');
    const resultsTable = document.getElementById('resultsTable');
    const finishEarlyButton = document.getElementById('finishEarly');
    const tryAgainButton = document.getElementById('tryAgain');

    let currentSection = 1;
    let currentQuestion = 0;
    let currentSum;
    let timer;
    const sectionsCount = 50;
    const questionsPerSection = 100;
    const results = Array.from({ length: sectionsCount }, () => ({
        correct: 0,
        incorrect: 0,
        total: 0,
    }));

    if (startButton) {
        startButton.addEventListener('click', function () {
            const fullName = fullNameInput.value.trim();
            if (fullName) {
                showSection('testSection');
                startTest();
            }
        });
    }

    if (finishEarlyButton) {
        finishEarlyButton.addEventListener('click', function () {
            showResults();
        });
    }

    if (tryAgainButton) {
        tryAgainButton.addEventListener('click', function () {
            location.reload();
        });
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === '0' || event.key === '1') {
            checkAnswer(Number(event.key));
        }
    });

    function showSection(sectionId) {
        document.querySelectorAll('.section').forEach(section => {
            section.style.display = 'none';
        });
        document.getElementById(sectionId).style.display = 'block';
    }

    function startTest() {
        currentSection = 1;
        currentQuestion = 0;
        startTimer();
        generateQuestion();
    }

    function startTimer() {
        let timeLeft = 60;
        timerElement.textContent = `Sisa waktu: ${timeLeft} detik`;
        timer = setInterval(function () {
            timeLeft--;
            timerElement.textContent = `Sisa waktu: ${timeLeft} detik`;
            if (timeLeft <= 0) {
                goToNextSection();
            }
        }, 1000);
    }

    function goToNextQuestion() {
        currentQuestion++;
        if (currentQuestion < questionsPerSection) {
            generateQuestion();  // Panggil generateQuestion di sini
        } else {
            goToNextSection();
        }
    }

    function goToNextSection() {
        clearInterval(timer); // Hentikan timer saat berpindah bagian
        currentSection++;
        if (currentSection <= sectionsCount) {
            currentQuestion = 0;
            startTimer();
            generateQuestion();
            sectionElement.textContent = `Bagian ${currentSection}`;
        } else {
            showResults();
        }
    }

    function generateQuestion() {
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        currentSum = num1 + num2;  // Simpan sum ke currentSum
        questionElement.textContent = `${num1} + ${num2} = ?`;
    }

    function checkAnswer(userAnswer) {
        const correctAnswer = (currentSum % 2 === 0) ? 0 : 1;
        if (userAnswer === correctAnswer) {
            results[currentSection - 1].correct++;
        } else {
            results[currentSection - 1].incorrect++;
        }
        results[currentSection - 1].total++;
        goToNextQuestion();  // Pindahkan ke soal berikutnya setelah menjawab
    }

    function showResults() {
        showSection('resultSection');
        resultsTable.innerHTML = '';  // Kosongkan tabel sebelum diisi
        results.forEach((result, index) => {
            if (result.total > 0) {
                const row = document.createElement('tr');
                const sectionCell = document.createElement('td');
                sectionCell.textContent = index + 1;
                const correctCell = document.createElement('td');
                correctCell.textContent = result.correct;
                const incorrectCell = document.createElement('td');
                incorrectCell.textContent = result.incorrect;
                const accuracyCell = document.createElement('td');
                accuracyCell.textContent = ((result.correct / result.total) * 100).toFixed(2) + '%';
                row.appendChild(sectionCell);
                row.appendChild(correctCell);
                row.appendChild(incorrectCell);
                row.appendChild(accuracyCell);
                resultsTable.appendChild(row);
            }
        });
    }
});
