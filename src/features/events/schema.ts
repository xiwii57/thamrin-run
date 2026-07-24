import { z } from 'zod'

export const eventSchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter'),
  slug: z
    .string()
    .min(3, 'Slug minimal 3 karakter')
    .regex(/^[a-z0-9-]+$/, 'Slug hanya boleh huruf kecil, angka, dan strip'),
  description: z.string().optional(),
  event_date: z.string().min(1, 'Tanggal wajib diisi'),
  location: z.string().optional(),
  quota: z.coerce.number().int().min(1, 'Kuota minimal 1'),
  price: z.coerce.number().min(0, 'Harga tidak boleh negatif'),
  categories: z.string().optional(),
  status: z.enum(['draft', 'open', 'closed', 'finished']).default('draft'),
  terms: z.string().optional(),
  organizer_name: z.string().optional(),
})

export type EventInput = z.infer<typeof eventSchema>
