import { useState, useEffect } from 'react'
import { getWorkouts } from '../../services/workoutService'
import type { WorkoutWithExercises } from '../../types/WorkoutTypes'

export default function WorkoutList() {
    const [workouts, setWorkouts] = useState<WorkoutWithExercises[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        getWorkouts()
            .then(setWorkouts)
            .catch(() => setError('Failed to load workouts'))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <p className="text-text-muted text-sm">Loading workouts...</p>
    if (error) return <p className="text-red-400 text-sm">{error}</p>
    if (workouts.length === 0) return <p className="text-text-muted text-sm">You have no workouts yet</p>

    return (
        <div className="w-full flex flex-row gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {workouts.map(w => (
                <div key={w.workoutId} className="flex items-start justify-start w-60 font-extrabold italic text-xl bg-gradient-to-br from-[#2a1fff] to-[#1a0aaa] text-accent rounded-3xl p-4 pt-4 flex flex-col gap-2 shrink-0">
                    <h2 className="text-text font-extrabold text-3xl tracking-wide uppercase w-full truncate text-left">{w.name}</h2>
                    <p className="text-text-muted text-sm pb-4">{w.categoryName}</p>
                    <div className='flex flex-row w-full'>
                        <button className='p-2 bg-accent rounded-full w-full font-extrabold text-xl text-text-dark'>START</button>
                        <button></button>
                    </div>
                </div>
            ))}
        </div>
    )
}
