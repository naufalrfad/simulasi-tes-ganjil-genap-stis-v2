document.addEventListener('DOMContentLoaded', () => {
    let currentSection = 1;
    let timer;
    const totalSections = 50;
    let results = Array.from({ length: totalSections }, () => ({ correct: 0, incorrect: 0, total: 0 }));
    
    // Mengubah tampilan halaman
    function showSection(sectionId) {
        document.querySelectorAll('div[id$="-page"]').forEach(page => {
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
        startTimer();
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
            // Simpan jawaban
            // Pergi ke soal berikutnya
            goToNextQuestion();
        });
    });

    // Pergi ke soal berikutnya
    function goToNextQuestion() {
        // Logika untuk menampilkan soal berikutnya
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
                resultsTableBody.innerHTML += `
                    <tr>
                        <td>Bagian ${index + 1}</td>
                        <td>${result.correct}</td>
                        <td>${result.incorrect}</td>
                        <td>${accuracy}%</td>
                    </tr>
                `;
            }
        });
    }

    // Coba lagi
    document.getElementById('try-again').addEventListener('click', () => {
        showSection('start-page');
        // Reset hasil dan timer jika perlu
    });
});
