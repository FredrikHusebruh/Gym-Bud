import { useState, useEffect } from 'react'
import Exercise from './Exercise'
import { getCategories, getMuscleGroups, createWorkout, createExercise } from '../../services/workoutService'
import type { Category, MuscleGroup } from '../../types/WorkoutTypes'

interface ExerciseEntry {
    id: number
    name: string
    muscleGroupId: number
}

interface Props {
    onClose: () => void
}

export default function NewWorkout({ onClose }: Props) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [categoryId, setCategoryId] = useState(0)
    const [exercises, setExercises] = useState<ExerciseEntry[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [muscleGroups, setMuscleGroups] = useState<MuscleGroup[]>([])
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        getCategories().then(setCategories).catch(console.error)
        getMuscleGroups().then(setMuscleGroups).catch(console.error)
    }, [])

    function addExercise() {
        setExercises(prev => [...prev, { id: Date.now(), name: '', muscleGroupId: 0 }])
    }

    function removeExercise(id: number) {
        setExercises(prev => prev.filter(e => e.id !== id))
    }

    function updateExercise(id: number, data: { name: string; muscleGroupId: number }) {
        setExercises(prev => prev.map(e => e.id === id ? { ...e, ...data } : e))
    }

    async function handleSave() {
        if (!name.trim()) { setError('Workout name is required'); return }
        if (categoryId === 0) { setError('Please select a category'); return }

        setSaving(true)
        setError(null)
        try {
            const workout = await createWorkout({ name, description, categoryId })
            const validExercises = exercises.filter(e => e.name.trim() && e.muscleGroupId !== 0)
            const results = await Promise.allSettled(
                validExercises.map(e => createExercise({
                    name: e.name,
                    muscleGroupId: e.muscleGroupId,
                    workoutId: workout.workoutId
                }))
            )
            const failed = results.filter(r => r.status === 'rejected')
            if (failed.length > 0) {
                console.error('Some exercises failed to save:', failed)
                setError(`Workout saved but ${failed.length} exercise(s) failed. Please try again.`)
                return
            }
            onClose()
        } catch (err) {
            console.error('Failed to save workout:', err)
            setError('Failed to save workout. Please try again.')
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className='w-full flex flex-col gap-4 items-center bg-surface border border-border rounded-3xl p-4'>
            <h1 className='text-text w-full font-bold text-xl text-start tracking-wide'>NEW WORKOUT</h1>
            {error && <p className='text-red-400 text-sm w-full'>{error}</p>}
            <div className='flex flex-row justify-between gap-2 items-center w-full'>
                <input
                    className="w-full bg-surface-2 rounded-lg p-2 text-text-muted focus:outline-none focus:ring-2 border border-border focus:ring-inset focus:ring-accent"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <select
                    className="w-full bg-surface-2 rounded-lg p-2 text-text-muted border border-border focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
                    value={categoryId}
                    onChange={e => setCategoryId(Number(e.target.value))}
                >
                    <option value={0} disabled>Select category</option>
                    {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.category}</option>
                    ))}
                </select>
            </div>
            <input
                className="w-full bg-surface-2 rounded-lg p-2 text-text-muted focus:outline-none focus:ring-2 border border-border focus:ring-inset focus:ring-accent"
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <div className="w-full border-t border-border"></div>

            {exercises.map((ex, index) => (
                <Exercise
                    key={ex.id}
                    index={index}
                    muscleGroups={muscleGroups}
                    onRemove={() => removeExercise(ex.id)}
                    onChange={data => updateExercise(ex.id, data)}
                />
            ))}

            <button onClick={addExercise} className='text-text-muted text-sm bg-surface-2 p-2 rounded-full border border-border w-full'>
                Add new exercise
            </button>

            <div className="flex flex-row w-full h-auto justify-between pt-4">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className='text-text-dark w-20 text-sm bg-accent p-2 rounded-lg border border-border disabled:opacity-50'
                >
                    {saving ? 'Saving...' : 'Save'}
                </button>
                <button
                    onClick={() => { if (window.confirm('Discard new workout?')) onClose() }}
                    className='text-text-muted w-20 text-sm bg-surface-2 p-2 rounded-lg border border-border'
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}
