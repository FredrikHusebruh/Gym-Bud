import { apiFetch } from './apiClient'
import type { Category, MuscleGroup, CreateWorkoutPayload, CreateExercisePayload, WorkoutResponse } from '../types/WorkoutTypes'

export async function getCategories(): Promise<Category[]> {
    const res = await fetch('/api/workout/category')
    if (!res.ok) throw new Error('Failed to fetch categories')
    return res.json()
}

export async function getMuscleGroups(): Promise<MuscleGroup[]> {
    const res = await fetch('/api/exercise/musclegroup')
    if (!res.ok) throw new Error('Failed to fetch muscle groups')
    return res.json()
}

export async function createWorkout(payload: CreateWorkoutPayload): Promise<WorkoutResponse> {
    const res = await apiFetch('/api/workout', {
        method: 'POST',
        body: JSON.stringify(payload)
    })
    if (!res.ok) throw new Error('Failed to create workout')
    return res.json()
}

export async function createExercise(payload: CreateExercisePayload): Promise<void> {
    const res = await apiFetch('/api/exercise', {
        method: 'POST',
        body: JSON.stringify(payload)
    })
    if (!res.ok) throw new Error('Failed to create exercise')
}
