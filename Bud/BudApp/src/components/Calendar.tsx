const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

function getWeekDays() {
    const today = new Date()
    const dayOfWeek = today.getDay() // 0 = Sunday
    const monday = new Date(today)
    monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7)) // rewind to Monday

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
            <div className='w-full p-2 flex flex-row text-black rounded-3xl gap-2 w-[100%] h-25 bg-[#131313] border border-[#272727]'>
                {days.map((day, i) => (
                    <div
                        key={i}
                        className={`flex-1 flex flex-col rounded-full items-center justify-center ${
                            day.isToday
                                ? 'bg-[#EFFF00] text-[#181818]'
                                : 'bg-[#212121]'
                        }`}
                    >
                        <div className={`flex justify-center items-center font-bold w-10 h-7 ${day.isToday ? 'text-gray-700' : 'text-gray-400'}`}>
                            {day.label}
                        </div>
                        <div className={`flex justify-center items-center font-bold w-10 h-7 ${day.isToday ? 'text-[#181818]' : 'text-[#F3F3F3]'}`}>
                            {day.date}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
