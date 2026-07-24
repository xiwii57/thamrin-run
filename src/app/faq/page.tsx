import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const faqs = [
    {
        q: 'Bagaimana cara mendaftar event?',
        a: 'Pilih event yang diinginkan dari halaman utama, klik "Detail", lalu isi formulir pendaftaran dengan data yang benar. Setelah data terisi lengkap, Anda akan diarahkan ke halaman pembayaran. Setelah pembayaran berhasil, e-ticket dan bib number akan dikirimkan ke email yang didaftarkan.',
    },
{
    q: 'Metode pembayaran apa saja yang tersedia?',
    a: 'Kami menerima pembayaran melalui QRIS (GoPay, OVO, DANA, ShopeePay, LinkAja), kartu kredit/debit (Visa, Mastercard), virtual account (BCA, BNI, BRI, Mandiri, Permata), dan gerai retail (Indomaret, Alfamart). Semua transaksi diproses secara aman melalui Midtrans.',
},
{
    q: 'Apakah bisa mengganti kategori setelah mendaftar?',
    a: 'Perubahan kategori bisa dilakukan paling lambat 7 hari sebelum hari H dengan menghubungi panitia melalui email. Perubahan hanya bisa dilakukan jika kuota kategori tujuan masih tersedia. Selisih biaya (jika ada) akan dikenakan atau dikembalikan sesuai kebijakan yang berlaku.',
},
{
    q: 'Bagaimana jika saya ingin membatalkan pendaftaran?',
    a: 'Pembatalan pendaftaran mengikuti kebijakan berikut: pembatalan lebih dari 14 hari sebelum hari H mendapat pengembalian dana 75%; pembatalan 7-14 hari sebelum hari H mendapat pengembalian 50%; pembatalan kurang dari 7 hari sebelum hari H tidak mendapat pengembalian dana. Pengembalian dana diproses dalam 5-7 hari kerja.',
},
{
    q: 'Kapan saya menerima bib number?',
    a: 'Bib number digital akan dikirimkan ke email terdaftar paling lambat 2 hari sebelum hari H. Untuk event tertentu yang menyediakan bib number fisik, pengambilan bisa dilakukan di lokasi race pack collection yang informasinya akan disampaikan melalui email dan media sosial.',
},
{
    q: 'Apakah ada batasan usia untuk mengikuti event?',
    a: 'Untuk kategori 5K, peserta minimal berusia 13 tahun. Untuk kategori 10K, peserta minimal berusia 16 tahun. Untuk kategori half marathon (21K), peserta minimal berusia 17 tahun. Peserta di bawah usia 18 tahun wajib melampirkan surat persetujuan orang tua pada saat race pack collection.',
},
{
    q: 'Bagaimana cara mendapatkan sertifikat digital?',
    a: 'Sertifikat digital akan otomatis tersedia di halaman "Cek Status Pendaftaran" setelah hasil timing resmi dipublikasikan, biasanya dalam waktu 1x24 jam setelah event berakhir. Anda cukup memasukkan nomor pendaftaran atau email yang didaftarkan untuk mengakses dan mengunduh sertifikat.',
},
{
    q: 'Apakah ada cut-off time di setiap kategori?',
    a: 'Ya, setiap kategori memiliki cut-off time: 5K memiliki waktu maksimal 1 jam 30 menit, 10K memiliki waktu maksimal 2 jam 30 menit, dan 21K memiliki waktu maksimal 4 jam. Peserta yang melewati batas waktu di titik checkpoint tertentu akan diminta untuk naik kendaraan sweep.',
},
{
    q: 'Bagaimana jika cuaca buruk pada hari H?',
    a: 'Keputusan mengenai pembatalan atau penundaan event karena cuaca buruk akan diumumkan paling lambat 2 jam sebelum start melalui website, email, dan media sosial. Jika event dibatalkan sepenuhnya oleh panitia, peserta akan mendapat opsi refund 100% atau transfer ke event berikutnya.',
},
{
    q: 'Bolehkah membawa stroller atau headphone saat lari?',
    a: 'Penggunaan stroller diperbolehkan hanya di kategori 5K dan harus berada di zona start paling belakang. Headphone diperbolehkan namun sangat disarankan untuk tetap waspada terhadap instruksi dari marshal dan kondisi di sekitar. Panitia tidak bertanggung jawab atas insiden yang terjadi akibat penggunaan headphone.',
},
{
    q: 'Apakah tersedia fasilitas bagasi?',
    a: 'Ya, tersedia area bagasi gratis di lokasi start. Peserta wajib menggunakan tas yang disediakan panitia atau tas dengan ukuran maksimal yang ditentukan. Penitipan bagasi dibuka 1,5 jam sebelum start dan harus diambil paling lambat 1 jam setelah cut-off time kategori terakhir berakhir. Panitia tidak bertanggung jawab atas kehilangan atau kerusakan barang.',
},
{
    q: 'Bagaimana cara menghubungi panitia?',
    a: 'Anda bisa menghubungi panitia melalui email info@thamrinrun.com pada hari kerja pukul 09.00-17.00 WIB. Untuk pertanyaan yang bersifat mendesak pada hari H, tersedia help desk di lokasi event yang ditandai dengan papan informasi. Kami juga aktif di Instagram @thamrinrun untuk pertanyaan umum.',
},
]

export default function FAQPage() {
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

        <h1 className="text-3xl font-bold text-ink sm:text-4xl">FAQ</h1>
        <p className="mt-2 text-sm text-muted">
        Pertanyaan yang sering diajukan seputar pendaftaran dan pelaksanaan event.
        </p>

        <div className="mt-10 space-y-0 divide-y divide-border">
        {faqs.map((faq, i) => (
            <div key={i} className="py-6 first:pt-0 last:pb-0">
            <h2 className="text-base font-semibold text-ink">{faq.q}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{faq.a}</p>
            </div>
        ))}
        </div>
        </div>
        </div>
    )
}
