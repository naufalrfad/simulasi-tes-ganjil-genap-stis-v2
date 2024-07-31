# simulasi-tes-ganjil-genap-stis-v2

Web akan terdiri dari 3 halaman:

1. Halaman awal
   Flow:
   user mengisi nama lengkap, simpan namanya untuk ditampilkan di halaman hasil. Setelah mengisi nama, tekan enter atau klik "Mulai Tes" untuk memulai  dan masuk ke halaman tes
   Tampilan:
   ada judul di tengah "Tes Ganjil-Genap"
   di bawahnya ada kolom Nama Lengkap untuk diisi
   di bawahnya ada tombol "Mulai Tes" berwarna biru untuk lanjut ke halaman tes dan memulai tes

3. Halaman Tes
   Flow:
   ketika user menekan "Mulai Tes", secara otomatis akan tampil soal. Soal adalah penjumlahan dua angka satu digit. Jika jawaban atas penjumlahan itu genap, maka jawabannya nol. Jika jawaban atas penjumlahan itu ganjil, maka jawabannya satu.
   Contoh:
   1+5=6, karena 6 genap, maka kunci jawaban adalah 0
   2+9=11, karena 11 ganjil, maka kunci jawaban adalah 1
   1+3=4, karena 4 genap, maka kunci jawaban adalah 0

    Tes berisi hingga 50 bagian, tiap bagian berisi 100 soal dengan waktu 1 menit. Jika lebih dari satu menit, maka akan langsung beralih ke bagian berikutnya. Soal akan ditampilkan satu per satu. User menjawab dengan menekan tombol 0 atau 1 yang ada di layar atau dengan keyboard. Ketika sudah dijawab, otomatis lanjut ke soal berikutnya. Terdapat tombol "Selesaikan sekarang" untuk langsung menuju ke halaman hasil.
   Tampilan:
   ada judul di tengah "Tes Ganjil-Genap"
   di bawahnya ada timer: "Sisa waktu: x detik"
   di bawahnya, ada soal yang cukup besar
   di bawah soal, ada tombol 0 dan 1 yang dapat diklik
   di kanan bawah, ada tombol "Selesaikan sekarang" berwarna merah, di bawah itu ada tulisan merah kecil "Peringatan, jangan klik sebelum ada instruksi"
   
5. Halaman Hasil
  Ketika user sudah mengklik "Selesaikan sekarang" Akan menuju ke halaman hasil. Hasil akan menunjukkan berapa benar dan salah di tiap bagian serta akurasinya dalam bentuk tabel. Ada tombol coba lagi untuk kembali ke halaman awal
Tampilan:
ada judul di tengah "Tes-Ganjil-Genap"
di bawahnya ada tulisan "Hasil Tes"
di bawahnya ada tabel dengan kolom "Bagian" , "Benar" , "Salah" , "Akurasi"
Benar menyatakan jawaban yang dijawab benar di bagian tersebut
Salah menyatakan jawaban yang dijawab salah di bagian tersebut
Akurasi menyatakan persentase jawaban benar dari soal yang terjawab di bagian tersebut
di bawahnya ada tombol "Coba Lagi" berwarna hijau"
di bawahnya ada tulisan "Hasil anda tidak akan tersimpan, harap melakukan screenshot sebelum klik coba lagi"

Buat dalam file html, css, dan js. Jangan pisahkan tiap halaman, buat 1 code html, 1 code css, dan 1 code js yang saling terhubung
