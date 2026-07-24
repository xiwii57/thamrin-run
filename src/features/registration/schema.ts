import { z } from 'zod'

export const registrationSchema = z.object({
    name: z.string().min(3, 'Nama minimal 3 karakter'),
                                           email: z.string().email('Email tidak valid'),
                                           phone: z.string().min(8, 'Nomor HP tidak valid'),
                                           dob: z.string().min(1, 'Tanggal lahir wajib diisi'),
                                           gender: z.enum(['male', 'female'], { message: 'Pilih jenis kelamin' }),
                                           category: z.string().optional(),
})
