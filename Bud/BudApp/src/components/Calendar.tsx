import CoachFredrik from "./workout/Coach"

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

function getWeekDays() {
    const today = new Date()
    const dayOfWeek = today.getDay()
    const monday = new Date(today)
    monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7))

    return Array.from({ length: 7 }, (_, i) => {
        const date = new Date(monday)
        date.setDate(monday.getDate() + i)
        return {
            label: DAY_LABELS[date.getDay()],
            date: date.getDate(),
            isToday: date.toDateString() === today.toDateString(),
        }
    })
}

export default function Calendar() {
    const days = getWeekDays()

    return (
        <div className="flex flex-col items-start justify-center gap-2 w-full">
            <div className="p-2 w-full h-full flex flex-col gap-4 rounded-3xl bg-surface border border-border">
                <div className='w-full flex flex-row gap-2 h-20'>
                    {days.map((day, i) => (
                        <div
                            key={i}
                            className={`flex-1 flex flex-col rounded-full items-center justify-center ${
                                day.isToday
                                    ? 'bg-accent text-text-dark'
                                    : 'bg-surface-2'
                            }`}
                        >
                            <div className={`flex justify-center items-center font-bold w-10 h-8 ${day.isToday ? 'text-gray-700' : 'text-gray-400'}`}>
                                {day.label}
                            </div>
                            <div className={`flex justify-center items-center font-bold w-10 h-8 ${day.isToday ? 'text-text-dark' : 'text-text-dim'}`}>
                                {day.date}
                            </div>
                        </div>
                    ))}
                </div>
                <CoachFredrik />
            </div>
        </div>
    )
}
