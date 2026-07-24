'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CurrencyInput } from '@/components/ui/currency-input'
import { PosterUpload } from '@/components/ui/poster-upload'

function slugify(text: string) {
  return text
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9\s-]/g, '')
  .replace(/\s+/g, '-')
  .replace(/-+/g, '-')
}

type EventFormValues = {
  name?: string
  slug?: string
  description?: string
  event_date?: string
  location?: string
  quota?: number
  price?: number
  categories?: string[]
  status?: string
  poster_url?: string | null
  terms?: string | null
  organizer_name?: string | null
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
    <label className="text-xs font-medium uppercase tracking-wide text-muted">{label}</label>
    {children}
    </div>
  )
}

const inputClass =
'w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-soft'

export function EventForm({
  action,
  defaultValues,
  error,
}: {
  action: (formData: FormData) => void
  defaultValues?: EventFormValues
    error?: string
}) {
  const [slug, setSlug] = useState(defaultValues?.slug ?? '')
  const [slugEdited, setSlugEdited] = useState(false)

  return (
    <form action={action} className="mt-6">
    <div className="rounded-xl border border-border bg-surface p-4 sm:p-6 space-y-5">
    {error && (
      <p className="rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-600">{error}</p>
    )}

    <Field label="Poster Event">
    <PosterUpload defaultUrl={defaultValues?.poster_url} />
    <input type="hidden" name="current_poster_url" value={defaultValues?.poster_url ?? ''} />
    </Field>

    <Field label="Nama Event">
    <input
    name="name"
    defaultValue={defaultValues?.name}
    required
    onChange={(e) => {
      if (!slugEdited) setSlug(slugify(e.target.value))
    }}
    className={inputClass}
    placeholder="Thamrin Run 2026"
    />
    </Field>

    <Field label="Slug URL">
    <input
    name="slug"
    value={slug}
    required
    onChange={(e) => {
      setSlugEdited(true)
      setSlug(e.target.value)
    }}
    className={`${inputClass} font-mono text-xs`}
    placeholder="thamrin-run-2026"
    />
    </Field>

    <Field label="Deskripsi">
    <textarea
    name="description"
    defaultValue={defaultValues?.description}
    rows={3}
    className={inputClass}
    placeholder="Ceritakan singkat tentang event ini"
    />
    </Field>

    <Field label="Nama Penyelenggara">
    <input
    name="organizer_name"
    defaultValue={defaultValues?.organizer_name ?? 'Thamrin Run'}
    className={inputClass}
    placeholder="Thamrin Run"
    />
    </Field>

    <Field label="Syarat dan Ketentuan">
    <textarea
    name="terms"
    defaultValue={defaultValues?.terms ?? ''}
    rows={6}
    className={inputClass}
    placeholder={'Contoh:\n1. Tiket yang telah dibeli tidak dapat dibatalkan.\n2. Peserta wajib membawa e-ticket saat check-in.'}
    />
    </Field>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
    <Field label="Tanggal Event">
    <input
    type="date"
    name="event_date"
    defaultValue={defaultValues?.event_date}
    required
    className={inputClass}
    />
    </Field>
    <Field label="Lokasi">
    <input
    name="location"
    defaultValue={defaultValues?.location}
    className={inputClass}
    placeholder="Bundaran HI, Jakarta"
    />
    </Field>
    </div>

    <div className="grid grid-cols-2 gap-4">
    <Field label="Kuota Peserta">
    <input
    type="number"
    name="quota"
    defaultValue={defaultValues?.quota ?? 100}
    required
    min={1}
    className={inputClass}
    />
    </Field>
    <Field label="Harga Pendaftaran">
    <CurrencyInput name="price" defaultValue={defaultValues?.price} required />
    </Field>
    </div>

    <Field label="Kategori (pisahkan dengan koma)">
    <input
    name="categories"
    defaultValue={defaultValues?.categories?.join(', ')}
    placeholder="5K, 10K, Half Marathon"
    className={inputClass}
    />
    </Field>

    <Field label="Status">
    <select
    name="status"
    defaultValue={defaultValues?.status ?? 'draft'}
    className={inputClass}
    >
    <option value="draft">Draft</option>
    <option value="open">Dibuka</option>
    <option value="closed">Ditutup</option>
    <option value="finished">Selesai</option>
    </select>
    </Field>
    </div>

    <div className="mt-4 flex items-center gap-3">
    <button
    type="submit"
    className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:bg-accent-dark"
    >
    Simpan Event
    </button>
    <Link href="/admin/events" className="text-sm font-medium text-muted hover:text-ink">
    Batal
    </Link>
    </div>
    </form>
  )
}
