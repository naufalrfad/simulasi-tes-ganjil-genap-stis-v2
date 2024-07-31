document.addEventListener('DOMContentLoaded', () => {
    let currentSection = 1;
    let timer;
    let score = Array(15).fill({correct: 0, incorrect: 0});
    let questionData = {};

    function startTimer() {
        let timeLeft = 60;
        document.getElementById('timer').innerText = `Sisa waktu: ${timeLeft} detik`;
        timer = setInterval(() => {
            timeLeft--;
            document.getElementById('timer').innerText = `Sisa waktu: ${timeLeft} detik`;
            if (timeLeft <= 0) {
                clearInterval(timer);
                nextSection();
            }
        }, 1000);
    }

    function showTestSection() {
        document.getElementById('nameSection').style.display = 'none';
        document.getElementById('resultsSection').style.display = 'none';
        document.getElementById('testSection').style.display = 'block';
        startTimer();
        loadQuestion();
    }

    function showResultsSection() {
        document.getElementById('testSection').style.display = 'none';
        document.getElementById('resultsSection').style.display = 'block';
        displayResults();
    }

    function loadQuestion() {
        const a = Math.floor(Math.random() * 10);
        const b = Math.floor(Math.random() * 10);
        const correctAnswer = (a + b) % 2 === 0 ? 0 : 1;
        questionData = {a, b, correctAnswer};
        document.getElementById('question').innerText = `${a} + ${b} = ?`;

        document.querySelectorAll('#answers .answer').forEach(button => {
            button.onclick = () => {
                checkAnswer(button.dataset.value);
                loadQuestion();
            };
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === '0' || e.key === '1') {
                checkAnswer(e.key);
                loadQuestion();
            }
        });
    }

    function checkAnswer(answer) {
        if (answer === questionData.correctAnswer.toString()) {
            score[currentSection - 1].correct++;
        } else {
            score[currentSection - 1].incorrect++;
        }
    }

    function nextSection() {
        clearInterval(timer);
        currentSection++;
        if (currentSection > 15) {
            showResultsSection();
        } else {
            document.getElementById('sectionNumber').innerText = `Bagian ${currentSection}`;
            showTestSection();
        }
    }

    function displayResults() {
        const tbody = document.querySelector('#resultsTable tbody');
        tbody.innerHTML = '';
        score.forEach((section, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>Bagian ${index + 1}</td>
                <td>${section.correct}</td>
                <td>${section.incorrect}</td>
                <td>${(section.correct / (section.correct + section.incorrect) * 100).toFixed(2)}%</td>
            `;
            tbody.appendChild(row);
        });
    }

    document.getElementById('startTest').onclick = showTestSection;
    document.getElementById('finishNow').onclick = showResultsSection;
    document.getElementById('nextSection').onclick = nextSection;
    document.getElementById('retryTest').onclick = () => location.reload();
});
