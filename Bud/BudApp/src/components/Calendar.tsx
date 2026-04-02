import coachFredrikImg from '../assets/coachFredrik.png'

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
            <div className="p-2 w-full h-full flex flex-col gap-4 rounded-3xl bg-[#131313] border border-[#272727]">
                <div className='w-full flex flex-row text-black gap-2 h-20'>
                    {days.map((day, i) => (
                        <div
                            key={i}
                            className={`flex-1 flex flex-col rounded-full items-center justify-center ${
                                day.isToday
                                    ? 'bg-[#EFFF00] text-[#181818]'
                                    : 'bg-[#212121]'
                            }`}
                        >
                            <div className={`flex justify-center items-center font-bold w-10 h-8 ${day.isToday ? 'text-gray-700' : 'text-gray-400'}`}>
                                {day.label}
                            </div>
                            <div className={`flex justify-center items-center font-bold w-10 h-8 ${day.isToday ? 'text-[#181818]' : 'text-[#F3F3F3]'}`}>
                                {day.date}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-full h-auto items-center gap-4 justify-between flex flex-row p-2 rounded-2xl bg-[#212121] border border-[#272727]">
                    <div className='h-12 w-12 shrink-0 rounded-full overflow-hidden'>
                        <img src={coachFredrikImg} className="w-full h-full object-cover" />
                    </div>
                    <div className='flex flex-col w-full h-full text-start'>
                        <div className='text-[#EFFF00] text-sm'>COACH FREDRIK SAYS:</div>
                        <div className='font-bold text-sm text-[#F3F3F3]'>You have no workouts scheduled today</div>
                    </div>
                </div>
            </div>

        </div>
    )
}
