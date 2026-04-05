export interface Category {
    id: number
    category: string
}

export interface MuscleGroup {
    id: number
    muscleGroup: string
}

export interface CreateWorkoutPayload {
    name: string
    description: string
    categoryId: number
}

export interface CreateExercisePayload {
    name: string
    muscleGroupId: number
    workoutId: number
}

export interface WorkoutResponse {
    workoutId: number
    name: string
    description: string | null
    categoryId: number
}

export interface ExerciseResponse {
    exerciseId: number
    exerciseName: string
    exerciseWorkoutId: number
    muscleGroupId: number
    muscleGroupName: string
}

export interface SetEntry {
    weight: number
    reps: number
    saved: boolean
}

export interface SetResponse {
    setId: number
    weight: number
    reps: number
    exerciseId: number
}

export interface LastWorkoutSetsResponse {
    exerciseId: number
    sets: SetResponse[]
}

export interface StartWorkoutResponse {
    workoutId: number
}

export interface LogSetRequest {
    workoutId: number
    exerciseId: number
    weight: number
    reps: number
}

export interface WorkoutWithExercises {
    workoutId: number
    name: string
    description: string | null
    categoryId: number
    categoryName: string
    exercises: ExerciseResponse[]
}
