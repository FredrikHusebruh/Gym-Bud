import { apiFetch } from './apiClient'
import type { Category, MuscleGroup, CreateWorkoutPayload, CreateExercisePayload, WorkoutResponse, WorkoutWithExercises, StartWorkoutResponse, LogSetRequest, SetResponse, LastWorkoutSetsResponse } from '../types/WorkoutTypes'

export async function getCategories(): Promise<Category[]> {
    const res = await fetch(`${import.meta.env.VITE_API_URL ?? ''}/api/workout/category`)
    if (!res.ok) throw new Error('Failed to fetch categories')
    return res.json()
}

export async function getMuscleGroups(): Promise<MuscleGroup[]> {
    const res = await fetch(`${import.meta.env.VITE_API_URL ?? ''}/api/exercise/musclegroup`)
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

export async function getWorkouts(): Promise<WorkoutWithExercises[]> {
    const res = await apiFetch('/api/workout')
    if (!res.ok) throw new Error('Failed to fetch workouts')
    return res.json()
}

export async function startWorkout(templateId: number): Promise<StartWorkoutResponse> {
    const res = await apiFetch('/api/workout/start', {
        method: 'POST',
        body: JSON.stringify({ templateId })
    })
    if (!res.ok) throw new Error('Failed to start workout')
    return res.json()
}

export async function logSet(payload: LogSetRequest): Promise<SetResponse> {
    const res = await apiFetch('/api/workout/set', {
        method: 'POST',
        body: JSON.stringify(payload)
    })
    if (!res.ok) throw new Error('Failed to log set')
    return res.json()
}

export async function getLastWorkoutSets(templateId: number, excludeWorkoutId: number): Promise<LastWorkoutSetsResponse[]> {
    const res = await apiFetch(`/api/workout/template/${templateId}/last?excludeWorkoutId=${excludeWorkoutId}`)
    if (!res.ok) throw new Error('Failed to fetch last workout sets')
    return res.json()
}
