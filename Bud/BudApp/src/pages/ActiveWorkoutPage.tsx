import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getWorkouts } from '../services/workoutService'
import ActiveWorkout from '../components/workout/ActiveWorkout'
import type { WorkoutWithExercises } from '../types/WorkoutTypes'

export default function ActiveWorkoutPage() {
    const { workoutId } = useParams()
    const navigate = useNavigate()
    const [workout, setWorkout] = useState<WorkoutWithExercises | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        getWorkouts()
            .then(workouts => {
                const found = workouts.find(w => w.workoutId === Number(workoutId))
                if (!found) setError('Workout not found')
                else setWorkout(found)
            })
            .catch(() => setError('Failed to load workout'))
    }, [workoutId])

    if (error) return <p className="text-red-400 text-sm p-4">{error}</p>
    if (!workout) return <p className="text-text-muted text-sm p-4">Loading...</p>

    return (
        <section className="w-full min-h-screen flex flex-col items-center gap-4 justify-start bg-black font-anton pb-24">
            <ActiveWorkout workout={workout} onClose={() => navigate('/Workout')} />
        </section>
    )
}
