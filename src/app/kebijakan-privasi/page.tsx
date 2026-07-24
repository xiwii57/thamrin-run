import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function KebijakanPrivasiPage() {
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

        <h1 className="text-3xl font-bold text-ink sm:text-4xl">Kebijakan Privasi</h1>
        <p className="mt-2 text-sm text-muted">Terakhir diperbarui: 1 Januari 2025</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted">

        <section>
        <h2 className="text-base font-semibold text-ink">1. Pendahuluan</h2>
        <p className="mt-3">
        Thamrin Run berkomitmen untuk melindungi privasi dan data pribadi setiap pengguna website dan peserta event. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, melindungi, dan membagikan informasi pribadi Anda. Dengan mengakses website ini atau mendaftar pada event kami, Anda menyetujui praktik pengumpulan dan penggunaan data yang dijelaskan dalam kebijakan ini.
        </p>
        </section>

        <section>
        <h2 className="text-base font-semibold text-ink">2. Data yang Dikumpulkan</h2>
        <p className="mt-3">
        Kami mengumpulkan beberapa kategori data sebagai berikut. Data identitas: nama lengkap, tanggal lahir, jenis kelamin, nomor identitas (KTP/SIM/Paspor). Data kontak: alamat email, nomor telepon, alamat tempat tinggal. Data event: kategori yang dipilih, ukuran jersey, riwayat pendaftaran, hasil timing. Data transaksi: metode pembayaran, nominal pembayaran, status transaksi. Data teknis: alamat IP, jenis browser, sistem operasi, halaman yang dikunjungi, waktu akses, dan data cookies.
        </p>
        </section>

        <section>
        <h2 className="text-base font-semibold text-ink">3. Cara Pengumpulan Data</h2>
        <p className="mt-3">
        Data dikumpulkan secara langsung saat Anda mengisi formulir pendaftaran event, membuat akun, atau menghubungi kami melalui email. Data teknis dikumpulkan secara otomatis melalui cookies dan teknologi pelacakan serupa saat Anda mengakses website kami. Data dari pihak ketiga mungkin kami terima dari mitra pembayaran (Midtrans) terkait status transaksi, atau dari timing provider terkait hasil lari Anda.
        </p>
        </section>

        <section>
        <h2 className="text-base font-semibold text-ink">4. Tujuan Penggunaan Data</h2>
        <p className="mt-3">
        Data pribadi yang dikumpulkan digunakan untuk: memproses pendaftaran dan pembayaran event; menerbitkan bib number dan sertifikat digital; mengirimkan konfirmasi pendaftaran, e-ticket, dan informasi penting terkait event melalui email; mengelola hasil timing dan peringkat peserta; menyediakan layanan "Cek Status Pendaftaran"; menganalisis data untuk meningkatkan kualitas event dan pengalaman pengguna; mengirimkan informasi tentang event mendatang jika Anda tidak berlangganan untuk berhenti menerima; mematuhi kewajiban hukum dan peraturan yang berlaku; menangani pengaduan, pertanyaan, dan permintaan dari peserta.
        </p>
        </section>

        <section>
        <h2 className="text-base font-semibold text-ink">5. Pembagian Data kepada Pihak Ketiga</h2>
        <p className="mt-3">
        Kami tidak menjual data pribadi Anda kepada pihak ketiga. Data dapat dibagikan dalam kondisi berikut: kepada penyedia layanan pembayaran (Midtrans) sejauh diperlukan untuk memproses transaksi; kepada penyedia layanan timing untuk keperluan pencatatan hasil lari; kepada pihak medis di lokasi event jika terjadi keadaan darurat yang mengancam keselamatan Anda; kepada pihak berwenang jika diwajibkan oleh hukum atau perintah pengadilan; kepada pihak yang Anda berikan izin secara eksplisit.
        </p>
        </section>

        <section>
        <h2 className="text-base font-semibold text-ink">6. Penyimpanan dan Keamanan Data</h2>
        <p className="mt-3">
        Data pribadi disimpan dalam server yang dilindungi dengan protokol keamanan standar industri termasuk enkripsi SSL/TLS untuk transmisi data dan enkripsi at-rest untuk penyimpanan data. Akses terhadap data pribadi dibatasi hanya untuk personel yang membutuhkan untuk menjalankan tugasnya. Data pendaftaran event disimpan selama 5 tahun setelah event terkait dilaksanakan untuk keperluan audit dan dokumentasi. Setelah periode penyimpanan berakhir, data akan dihapus atau dianonimkan secara permanen.
        </p>
        </section>

        <section>
        <h2 className="text-base font-semibold text-ink">7. Penggunaan Cookies</h2>
        <p className="mt-3">
        Website kami menggunakan cookies untuk meningkatkan pengalaman pengguna. Cookies esensial digunakan untuk menjaga sesi login dan preferensi bahasa. Cookies analitik digunakan untuk memahami bagaimana pengunjung berinteraksi dengan website. Anda dapat mengatur preferensi cookies melalui pengaturan browser. Namun, menonaktifkan cookies tertentu dapat mempengaruhi fungsionalitas website.
        </p>
        </section>

        <section>
        <h2 className="text-base font-semibold text-ink">8. Hak Anda</h2>
        <p className="mt-3">
        Anda memiliki hak untuk: mengakses dan mendapatkan salinan data pribadi yang kami simpan tentang Anda; meminta perbaikan atas data yang tidak akurat atau tidak lengkap; meminta penghapusan data pribadi Anda, kecuali jika penyimpanan diperlukan untuk memenuhi kewajiban hukum; menarik persetujuan atas pemrosesan data tertentu; mengajukan keluhan kepada otoritas perlindungan data yang berwenang jika Anda merasa data Anda diproses secara tidak sah. Untuk mengajukan permintaan terkait hak-hak di atas, silakan hubungi kami melalui email info@thamrinrun.com.
        </p>
        </section>

        <section>
        <h2 className="text-base font-semibold text-ink">9. Perubahan Kebijakan Privasi</h2>
        <p className="mt-3">
        Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan material akan diinformasikan melalui email atau pemberitahuan di website paling lambat 30 hari sebelum berlaku efektif. Penggunaan berkelanjutan atas layanan kami setelah perubahan berlaku dianggap sebagai persetujuan Anda terhadap kebijakan yang diperbarui. Kami menyarankan Anda untuk meninjau halaman ini secara berkala.
        </p>
        </section>

        <section>
        <h2 className="text-base font-semibold text-ink">10. Kontak</h2>
        <p className="mt-3">
        Jika Anda memiliki pertanyaan, permintaan, atau keluhan terkait praktik privasi kami, silakan hubungi: Thamrin Run — Data Protection Officer, email: info@thamrinrun.com, alamat: Jl. M.H. Thamrin No. 1, Jakarta Pusat 10310.
        </p>
        </section>

        </div>
        </div>
        </div>
    )
}
