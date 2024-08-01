document.addEventListener("DOMContentLoaded", () => {
    const namaInput = document.getElementById('nama-lengkap');
    const mulaiTesBtn = document.getElementById('mulai-tes-btn');
    const lanjutBtn = document.getElementById('lanjut-btn');
    const selesaiBtn = document.getElementById('selesai-btn');
    const cobaLagiBtn = document.getElementById('coba-lagi-btn');
    const soalText = document.getElementById('soal');
    const timerText = document.getElementById('waktu');
    const bagianText = document.getElementById('bagian-num');
    const hasilTableBody = document.querySelector('#hasil-table tbody');
    
    let bagian = 1;
    let waktuSisa = 60;
    let soalIndex = 0;
    let benarCount = 0;
    let salahCount = 0;
    let hasilData = [];
    let timerInterval;

    const jawabanBtns = document.querySelectorAll('.jawaban-btn');

    function tampilkanHalaman(halamanId) {
        document.querySelectorAll('.page').forEach(page => {
            page.style.display = 'none';
        });
        document.getElementById(halamanId).style.display = 'flex';
    }

    function resetTest() {
        bagian = 1;
        soalIndex = 0;
        benarCount = 0;
        salahCount = 0;
        hasilData = [];
        waktuSisa = 60;
        clearInterval(timerInterval);
    }

    function startTimer() {
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            waktuSisa--;
            timerText.textContent = waktuSisa;
            if (waktuSisa <= 0) {
                lanjutKeBagianBerikutnya();
            }
        }, 1000);
    }

    function generateSoal() {
        const angka1 = Math.floor(Math.random() * 10);
        const angka2 = Math.floor(Math.random() * 10);
        const hasil = angka1 + angka2;
        const kunciJawaban = hasil % 2 === 0 ? '0' : '1';
        soalText.textContent = `${angka1} + ${angka2} = ?`;

        jawabanBtns.forEach(btn => {
            btn.classList.remove('selected');
            btn.onclick = () => {
                if (btn.getAttribute('data-value') === kunciJawaban) {
                    benarCount++;
                } else {
                    salahCount++;
                }
                soalIndex++;
                if (soalIndex < 100) {
                    generateSoal();
                } else {
                    lanjutKeBagianBerikutnya();
                }
            };
        });
    }

    function lanjutKeBagianBerikutnya() {
        hasilData.push({ bagian, benar: benarCount, salah: salahCount, akurasi: (benarCount / (benarCount + salahCount)) * 100 });
        bagian++;
        soalIndex = 0;
        benarCount = 0;
        salahCount = 0;
        waktuSisa = 60;
        if (bagian <= 50) {
            bagianText.textContent = bagian;
            generateSoal();
            startTimer();
        } else {
            tampilkanHalaman('halaman-hasil');
            tampilkanHasil();
        }
    }

    function tampilkanHasil() {
        hasilTableBody.innerHTML = '';
        hasilData.forEach(data => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>Bagian ke-${data.bagian}</td>
                <td>${data.benar}</td>
                <td>${data.salah}</td>
                <td>${data.akurasi.toFixed(2)}%</td>
            `;
            hasilTableBody.appendChild(row);
        });
    }

    mulaiTesBtn.addEventListener('click', () => {
        if (namaInput.value.trim() !== '') {
            tampilkanHalaman('halaman-tes');
            bagianText.textContent = bagian;
            generateSoal();
            startTimer();
        } else {
            alert('Mohon masukkan nama lengkap Anda.');
        }
    });

    lanjutBtn.addEventListener('click', lanjutKeBagianBerikutnya);

    selesaiBtn.addEventListener('click', () => {
        clearInterval(timerInterval);
        tampilkanHalaman('halaman-hasil');
        tampilkanHasil();
    });

    cobaLagiBtn.addEventListener('click', () => {
        resetTest();
        tampilkanHalaman('halaman-awal');
    });

    tampilkanHalaman('halaman-awal');
});
