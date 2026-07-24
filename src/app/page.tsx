import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { EventsSection } from '@/components/events-section'
import { SiteFooter } from '@/components/site-footer'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas">
    <SiteHeader />
    <main>
    <Hero />
    <EventsSection />
    </main>
    <SiteFooter />
    </div>
  )
}
