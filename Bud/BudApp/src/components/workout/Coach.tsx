import { useState } from 'react'
import coachFredrikImg from '../../assets/coachFredrik.png'

const messages = [
    "Even the calendar gave up on you.",
    "Rest day? Or regret day?",
    "You really committed to not committing",
    "Consistency… just not the good kind.",
    "Elite level skipping.",
    "Going for a PR on leg rests?",
    "Working hard or hardly working?",
    "Do you even lift brah?",

]

export default function CoachFredrik() {
    const [message] = useState(() => messages[Math.floor(Math.random() * messages.length)])

    return (
        <div className="w-full h-auto items-center gap-2 justify-between flex flex-row p-2 rounded-2xl bg-surface-2 border border-border">
            <div className='h-12 w-12 shrink-0 rounded-full overflow-hidden'>
                <img src={coachFredrikImg} className="w-full h-full object-cover" />
            </div>
            <div className='flex flex-col w-full justify-center text-start'>
                <div className='text-accent text-[12px] leading-snug'>COACH FREDRIK</div>
                <div className='text-[13px] text-text-muted leading-snug'>{message}</div>
            </div>
        </div>
    )
}
