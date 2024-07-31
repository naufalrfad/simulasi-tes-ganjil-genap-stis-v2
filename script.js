document.addEventListener('DOMContentLoaded', () => {
    let currentSection = 1;
    let currentQuestion = 0;
    let timer;
    const totalSections = 50;
    const questionsPerSection = 100;
    let results = Array.from({ length: totalSections }, () => ({ correct: 0, incorrect: 0, total: 0 }));

    // Mengubah tampilan halaman
    function showSection(sectionId) {
        document.querySelectorAll('div.page').forEach(page => {
            if (page.id === sectionId) {
                page.classList.remove('hidden');
            } else {
                page.classList.add('hidden');
            }
        });
    }

    // Mulai tes
    document.getElementById('start-test').addEventListener('click', () => {
        showSection('test-page');
        document.getElementById('section-number').textContent = `Bagian ${currentSection}`;
        startTimer();
        generateQuestion();
    });

    // Timer
    function startTimer() {
        let timeLeft = 60;
        document.getElementById('timer-count').textContent = `Sisa waktu: ${timeLeft} detik`;
        timer = setInterval(() => {
            timeLeft--;
            document.getElementById('timer-count').textContent = `Sisa waktu: ${timeLeft} detik`;
            if (timeLeft <= 0) {
                clearInterval(timer);
                goToNextSection();
            }
        }, 1000);
    }

    // Menangani klik jawaban
    document.querySelectorAll('.answer-btn').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            checkAnswer(parseInt(value));
            goToNextQuestion();
        });
    });

    // Pergi ke soal berikutnya
    function goToNextQuestion() {
        currentQuestion++;
        if (currentQuestion < questionsPerSection) {
            generateQuestion();
        } else {
            goToNextSection();
        }
    }

    // Pergi ke bagian berikutnya
    function goToNextSection() {
        currentSection++;
        currentQuestion = 0;
        if (currentSection <= totalSections) {
            document.getElementById('section-number').textContent = `Bagian ${currentSection}`;
            startTimer();
            generateQuestion();
        } else {
            showSection('results-page');
            displayResults();
        }
    }

    // Memeriksa jawaban
    function checkAnswer(userAnswer) {
        const question = generateQuestion();
        const correctAnswer = (question.sum % 2 === 0) ? 0 : 1;
        if (userAnswer === correctAnswer) {
            results[currentSection - 1].correct++;
        } else {
            results[currentSection - 1].incorrect++;
        }
        results[currentSection - 1].total++;
    }

    // Menghasilkan soal baru
    function generateQuestion() {
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        const sum = num1 + num2;
        document.getElementById('question').textContent = `${num1} + ${num2} = ?`;
        return { sum };
    }

    // Selesaikan tes
    document.getElementById('finish-test').addEventListener('click', () => {
        showSection('results-page');
        displayResults();
    });

    // Tampilkan hasil
    function displayResults() {
        const resultsTableBody = document.querySelector('#results-table tbody');
        resultsTableBody.innerHTML = '';
        results.forEach((result, index) => {
            if (result.total > 0) {
                const accuracy = (result.correct / result.total * 100).toFixed(2);
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>Bagian ${index + 1}</td>
                    <td>${result.correct}</td>
                    <td>${result.incorrect}</td>
                    <td>${accuracy}%</td>
                `;
                resultsTableBody.appendChild(row);
            }
        });
    }

    // Coba lagi
    document.getElementById('try-again').addEventListener('click', () => {
        currentSection = 1;
        currentQuestion = 0;
        results = Array.from({ length: totalSections }, () => ({ correct: 0, incorrect: 0, total: 0 }));
        showSection('start-page');
    });
});
