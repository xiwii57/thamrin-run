export type CheckinResult =
| { status: 'success'; name: string; category: string | null; bibNumber: string | null; eventName: string }
| { status: 'already_checked_in'; name: string; checkedInAt: string }
| { status: 'not_paid'; name: string }
| { status: 'invalid' }
