import { z } from 'zod'

export const registrationSchema = z.object({
    name: z.string().min(3, 'Nama minimal 3 karakter'),
                                           email: z.string().email('Email tidak valid'),
                                           phone: z
                                           .string()
                                           .regex(
                                                    /^(?:\+?62|0)?8[1-9][0-9]{6,10}$/,
                                                    'Nomor HP tidak valid. Gunakan format 8xxx, 08xxx, atau 62xxx'
                                                  ),
                                           dob: z.string().min(1, 'Tanggal lahir wajib diisi'),
                                           gender: z.enum(['male', 'female'], { message: 'Pilih jenis kelamin' }),
                                           category: z.string().optional(),
})
