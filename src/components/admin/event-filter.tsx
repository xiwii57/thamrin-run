'use client'

export function EventFilter({
    events,
    selectedEventId,
}: {
    events: { id: string; name: string }[]
    selectedEventId?: string
}) {
    return (
        <form method="GET">
        <select
        name="event"
        defaultValue={selectedEventId ?? ''}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className="rounded-lg border border-border bg-surface px-3 py-2.5 text-sm outline-none focus:border-accent"
        >
        <option value="">Semua Event</option>
        {events.map((e) => (
            <option key={e.id} value={e.id}>{e.name}</option>
        ))}
        </select>
        </form>
    )
}
