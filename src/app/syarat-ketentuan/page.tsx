import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function SyaratKetentuanPage() {
    return (
        <div className="min-h-screen bg-canvas">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-muted transition hover:text-ink"
        >
        <ArrowLeft size={16} />
        Kembali ke beranda
        </Link>

        <h1 className="text-3xl font-bold text-ink sm:text-4xl">Syarat & Ketentuan</h1>
        <p className="mt-2 text-sm text-muted">Terakhir diperbarui: 1 Januari 2025</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted">

        <section>
        <h2 className="text-base font-semibold text-ink">1. Ketentuan Umum</h2>
        <p className="mt-3">
        Dengan mendaftar pada event yang diselenggarakan oleh Thamrin Run, Peserta menyatakan telah membaca, memahami, dan menyetujui seluruh syarat dan ketentuan yang berlaku. Syarat dan ketentuan ini merupakan perjanjian yang mengikat antara Peserta dan Penyelenggara. Penyelenggara berhak mengubah syarat dan ketentuan ini sewaktu-waktu tanpa pemberitahuan terlebih dahulu. Perubahan akan berlaku efektif sejak dipublikasikan di website ini.
        </p>
        </section>

        <section>
        <h2 className="text-base font-semibold text-ink">2. Persyaratan Peserta</h2>
        <p className="mt-3">
        Peserta wajib berusia sesuai ketentuan kategori yang dipilih. Peserta wajib dalam kondisi sehat dan fit untuk melakukan aktivitas lari. Peserta dengan riwayat penyakit jantung, hipertensi berat, diabetes tipe 1 yang tidak terkontrol, atau kondisi medis lain yang berisiko tinggi dianjurkan untuk berkonsultasi dengan dokter sebelum mendaftar. Peserta di bawah usia 18 tahun wajib mendapatkan persetujuan tertulis dari orang tua atau wali.
        </p>
        </section>

        <section>
        <h2 className="text-base font-semibold text-ink">3. Proses Pendaftaran</h2>
        <p className="mt-3">
        Pendaftaran dibuka secara online melalui website resmi Thamrin Run. Data yang diisi pada formulir pendaftaran harus benar dan sesuai dengan identitas resmi Peserta. Penyelenggara tidak bertanggung jawab atas kesalahan data yang diinput oleh Peserta. Satu akun email hanya dapat digunakan untuk mendaftar satu peserta per event. Pendaftaran dianggap sah setelah pembayaran berhasil diverifikasi oleh sistem dan konfirmasi diterima oleh Peserta melalui email.
        </p>
        </section>

        <section>
        <h2 className="text-base font-semibold text-ink">4. Pembayaran</h2>
        <p className="mt-3">
        Biaya pendaftaran harus dibayarkan secara lunas dalam waktu yang ditentukan pada halaman pembayaran. Jika pembayaran tidak diselesaikan dalam batas waktu tersebut, pendaftaran akan otomatis dibatalkan oleh sistem. Biaya pendaftaran yang telah dibayarkan tidak dapat dipindahkan ke peserta lain kecuali dengan persetujuan tertulis dari Penyelenggara. Penyelenggara berhak memberikan diskon atau promo tanpa pemberitahuan sebelumnya, dan ketentuan promo tersebut berlaku terpisah dari syarat dan ketentuan umum ini.
        </p>
        </section>

        <section>
        <h2 className="text-base font-semibold text-ink">5. Pembatalan dan Pengembalian Dana</h2>
        <p className="mt-3">
        Pembatalan oleh Peserta mengikuti ketentuan berikut: pembatalan yang dilakukan lebih dari 14 hari sebelum hari H akan mendapatkan pengembalian dana sebesar 75% dari total biaya pendaftaran; pembatalan yang dilakukan dalam rentang 7 hingga 14 hari sebelum hari H akan mendapatkan pengembalian dana sebesar 50%; pembatalan yang dilakukan kurang dari 7 hari sebelum hari H tidak mendapatkan pengembalian dana. Pengembalian dana akan diproses melalui metode pembayaran asal dalam waktu 5 hingga 7 hari kerja. Biaya administrasi bank atau payment gateway (jika ada) akan dipotong dari total pengembalian.
        </p>
        </section>

        <section>
        <h2 className="text-base font-semibold text-ink">6. Perubahan Jadwal dan Lokasi</h2>
        <p className="mt-3">
        Penyelenggara berhak mengubah jadwal, lokasi, rute, atau format event karena alasan yang dipandang perlu, termasuk namun tidak terbatas pada kondisi keamanan, cuaca ekstrem, perizinan pemerintah, atau force majeure. Perubahan akan diinformasikan melalui website dan email terdaftar paling lambat 48 jam sebelum waktu start yang semula dijadwalkan. Jika Peserta tidak dapat mengikuti event pada jadwal baru, Peserta berhak mengajukan pengembalian dana penuh atau perpindahan ke event berikutnya.
        </p>
        </section>

        <section>
        <h2 className="text-base font-semibold text-ink">7. Kewajiban dan Larangan Peserta</h2>
        <p className="mt-3">
        Peserta wajib memakai bib number yang telah disediakan di dada depan selama mengikuti event. Peserta wajib mengikuti rute yang telah ditentukan dan mematuhi instruksi dari marshal, petugas keamanan, dan medis yang bertugas. Peserta dilarang membawa senjata tajam, bahan berbahaya, dan barang terlarang. Peserta dilarang menggunakan alat bantu roda yang tidak diizinkan (skateboard, rollerblade, sepeda) kecuali wheelchair dan stroller sesuai ketentuan kategori. Peserta dilarang mendaftar menggunakan identitas orang lain. Pelanggaran terhadap larangan ini dapat mengakibatkan diskualifikasi tanpa pengembalian dana.
        </p>
        </section>

        <section>
        <h2 className="text-base font-semibold text-ink">8. Perlindungan Data Pribadi</h2>
        <p className="mt-3">
        Data pribadi yang dikumpulkan selama proses pendaftaran akan digunakan untuk keperluan administrasi event, penerbitan bib number, sertifikat, dan komunikasi terkait event. Penyelenggara berkomitmen untuk melindungi data pribadi Peserta sesuai dengan Kebijakan Privasi yang berlaku. Data tidak akan dijual atau disewakan kepada pihak ketiga untuk tujuan komersial tanpa persetujuan Peserta, kecuali diwajibkan oleh hukum.
        </p>
        </section>

        <section>
        <h2 className="text-base font-semibold text-ink">9. Pembebasan Tanggung Jawab</h2>
        <p className="mt-3">
        Peserta memahami dan menyadari bahwa kegiatan lari memiliki risiko tertentu termasuk namun tidak terbatas pada cedera fisik, kelelahan, dehidrasi, dan dalam kasus ekstrem dapat mengancam jiwa. Dengan mendaftar, Peserta membebaskan Penyelenggara, sponsor, panitia, dan seluruh pihak yang terlibat dari segala tuntutan hukum, gugatan, atau klaim kerugian yang timbul akibat keikutsertaan Peserta dalam event, kecuali jika kerugian tersebut terbukti disebabkan oleh kelalaian berat Penyelenggara.
        </p>
        </section>

        <section>
        <h2 className="text-base font-semibold text-ink">10. Hak Kekayaan Intelektual</h2>
        <p className="mt-3">
        Seluruh konten di website ini termasuk namun tidak terbatas pada teks, gambar, logo, desain, dan kode program merupakan hak kekayaan intelektual milik Penyelenggara atau pihak yang berwenang. Peserta memberikan hak kepada Penyelenggara untuk menggunakan foto, video, dan rekaman yang memuat Peserta selama event untuk keperluan dokumentasi, promosi, dan publikasi di seluruh media tanpa memerlukan persetujuan tambahan dan tanpa kompensasi.
        </p>
        </section>

        <section>
        <h2 className="text-base font-semibold text-ink">11. Penyelesaian Sengketa</h2>
        <p className="mt-3">
        Apabila terjadi perselisihan terkait syarat dan ketentuan ini, kedua belah pihak sepakat untuk menyelesaikannya secara musyawarah mufakat. Jika musyawarah tidak mencapai kesepakatan, sengketa akan diselesaikan melalui Pengadilan Negeri Jakarta Pusat sesuai dengan hukum yang berlaku di Republik Indonesia.
        </p>
        </section>

        </div>
        </div>
        </div>
    )
}
