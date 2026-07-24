'use server'

import { createClient } from '@/lib/supabase/server'
import { eventSchema } from './schema'
import { uploadPoster, deletePoster } from './storage'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

function parseCategories(input?: string) {
  if (!input) return []
    return input.split(',').map((c) => c.trim()).filter(Boolean)
}

function parseForm(formData: FormData) {
  return eventSchema.safeParse({
    name: formData.get('name'),
                               slug: formData.get('slug'),
                               description: formData.get('description'),
                               event_date: formData.get('event_date'),
                               location: formData.get('location'),
                               quota: formData.get('quota'),
                               price: formData.get('price'),
                               categories: formData.get('categories'),
                               status: formData.get('status'),
                               terms: formData.get('terms'),
                               organizer_name: formData.get('organizer_name'),
  })
}

export async function createEvent(formData: FormData) {
  const parsed = parseForm(formData)
  if (!parsed.success) {
    redirect(`/admin/events/new?error=${encodeURIComponent(parsed.error.issues[0].message)}`)
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let posterUrl: string | null = null
  const posterFile = formData.get('poster') as File | null

  if (posterFile && posterFile.size > 0) {
    const result = await uploadPoster(supabase, posterFile)
    if (!result.ok) {
      redirect(`/admin/events/new?error=${encodeURIComponent(result.error)}`)
    }
    posterUrl = result.url
  }

  const { error } = await supabase.from('events').insert({
    name: parsed.data.name,
    slug: parsed.data.slug,
    description: parsed.data.description || null,
    event_date: parsed.data.event_date,
    location: parsed.data.location || null,
    quota: parsed.data.quota,
    price: parsed.data.price,
    categories: parseCategories(parsed.data.categories),
    status: parsed.data.status,
    poster_url: posterUrl,
    terms: parsed.data.terms || null,
    organizer_name: parsed.data.organizer_name || 'Thamrin Run',
    created_by: user?.id,
  })

  if (error) {
    const message = error.code === '23505' ? 'Slug sudah dipakai, gunakan yang lain' : error.message
    redirect(`/admin/events/new?error=${encodeURIComponent(message)}`)
  }

  revalidatePath('/admin/events')
  redirect('/admin/events')
}

export async function updateEvent(id: string, formData: FormData) {
  const parsed = parseForm(formData)
  if (!parsed.success) {
    redirect(`/admin/events/${id}/edit?error=${encodeURIComponent(parsed.error.issues[0].message)}`)
  }

  const supabase = await createClient()
  const currentPosterUrl = (formData.get('current_poster_url') as string) || null

  let posterUrl = currentPosterUrl
  const posterFile = formData.get('poster') as File | null

  if (posterFile && posterFile.size > 0) {
    const result = await uploadPoster(supabase, posterFile)
    if (!result.ok) {
      redirect(`/admin/events/${id}/edit?error=${encodeURIComponent(result.error)}`)
    }
    posterUrl = result.url
    // hapus poster lama supaya storage tidak menumpuk file tak terpakai
    await deletePoster(supabase, currentPosterUrl)
  }

  const { error } = await supabase
  .from('events')
  .update({
    name: parsed.data.name,
    slug: parsed.data.slug,
    description: parsed.data.description || null,
    event_date: parsed.data.event_date,
    location: parsed.data.location || null,
    quota: parsed.data.quota,
    price: parsed.data.price,
    categories: parseCategories(parsed.data.categories),
          status: parsed.data.status,
          poster_url: posterUrl,
  })
  .eq('id', id)

  if (error) {
    const message = error.code === '23505' ? 'Slug sudah dipakai, gunakan yang lain' : error.message
    redirect(`/admin/events/${id}/edit?error=${encodeURIComponent(message)}`)
  }

  revalidatePath('/admin/events')
  redirect('/admin/events')
}

export async function deleteEvent(id: string) {
  const supabase = await createClient()

  const { data: event } = await supabase.from('events').select('poster_url').eq('id', id).single()
  if (event?.poster_url) {
    await deletePoster(supabase, event.poster_url)
  }

  const { error } = await supabase.from('events').delete().eq('id', id)
  if (error) throw new Error(error.message)
    revalidatePath('/admin/events')
}
