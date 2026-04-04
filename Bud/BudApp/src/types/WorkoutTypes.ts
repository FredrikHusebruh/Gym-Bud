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
}

export interface WorkoutWithExercises {
    workoutId: number
    name: string
    description: string | null
    categoryId: number
    categoryName: string
    exercises: ExerciseResponse[]
}
