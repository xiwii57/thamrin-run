export function Hero() {
    return (
        <section className="relative overflow-hidden bg-accent">
        {/* Blok warna tegas, bukan blend lembut — split diagonal dua nada biru */}
        <div
        className="absolute inset-0"
        style={{
            background:
            'linear-gradient(100deg, var(--color-accent-dark) 0%, var(--color-accent) 45%, var(--color-accent) 70%, var(--color-accent-light) 100%)',
        }}
        />

        {/* Speed lines, lebih tegas dari versi sebelumnya */}
        <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
            backgroundImage:
            'repeating-linear-gradient(100deg, white 0px, white 2px, transparent 2px, transparent 28px)',
        }}
        />

        {/* Lingkaran besar dekoratif, dipotong di tepi kanan */}
        <div className="pointer-events-none absolute -right-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full border-[40px] border-white/[0.06] sm:h-[560px] sm:w-[560px]" />
        <div className="pointer-events-none absolute -right-10 top-1/2 hidden h-72 w-72 -translate-y-[65%] rounded-full bg-white/[0.05] lg:block" />

        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 pt-24 pb-32 sm:px-6 sm:pt-32 sm:pb-40 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8 lg:pt-36 lg:pb-48">
        {/* Teks */}
        <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
        Event Lari Terbuka
        </p>

        <h1 className="font-display mt-5 max-w-xl text-5xl leading-[1.05] text-white sm:text-6xl lg:text-7xl">
        Lari bareng,
        <br />
        <span className="text-white/60">cerita bareng.</span>
        </h1>

        <p className="mt-6 max-w-md text-base leading-relaxed text-white/80 sm:text-lg">
        Daftar mudah, bib number otomatis, sertifikat digital setelah finish.
        Terbuka untuk semua.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">

        <a href="#events"
        className="rounded-full bg-white px-7 py-3.5 text-center text-sm font-semibold text-accent transition hover:bg-white/90"
        >
        Lihat Event
        </a>

        <a href="/check-status"
        className="rounded-full border border-white/30 px-7 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-white/10"
        >
        Cek Status Pendaftaran
        </a>
        </div>
        </div>

        {/* Elemen grafis kanan: kartu bib mengambang, mengisi ruang kosong */}
        <div className="relative hidden lg:block">
        <div className="mx-auto w-56 rotate-3 rounded-2xl bg-white p-6 text-center shadow-2xl transition duration-500 hover:rotate-0">
        <p className="font-display text-xs tracking-[0.15em] text-accent/50">THAMRIN RUN</p>
        <p className="font-display mt-3 text-7xl leading-none text-accent">10K</p>
        <div className="mt-5 flex items-center justify-center gap-2 border-t border-dashed border-accent/20 pt-4">
        <span className="rounded-full bg-accent-soft px-3 py-1 text-[11px] font-semibold text-accent">
        #1042
        </span>
        </div>
        </div>
        <div className="absolute -bottom-6 -left-6 -z-10 w-48 -rotate-6 rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
        <div className="h-24" />
        </div>
        </div>
        </div>

        {/* Wave divider */}
        <div className="absolute inset-x-0 bottom-0 leading-none">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="h-16 w-full sm:h-24 lg:h-28">
        <path
        d="M0,64 C240,110 480,10 720,40 C960,70 1200,110 1440,50 L1440,120 L0,120 Z"
        fill="var(--color-canvas)"
        />
        </svg>
        </div>
        </section>
    )
}
