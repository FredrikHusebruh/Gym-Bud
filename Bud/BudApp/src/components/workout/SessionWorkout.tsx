import { useState, useEffect } from 'react'
import { logSet, getLastWorkoutSets } from '../../services/workoutService'
import type { ExerciseResponse, SetEntry, LastWorkoutSetsResponse } from '../../types/WorkoutTypes'

interface Props {
    workoutId: number
    templateId: number
    exercises: ExerciseResponse[]
}

export default function SessionWorkout({ workoutId, templateId, exercises }: Props) {
    const [sets, setSets] = useState<Record<number, SetEntry[]>>({})

    useEffect(() => {
        getLastWorkoutSets(templateId, workoutId)
            .then((last: LastWorkoutSetsResponse[]) => {
                const prefilled: Record<number, SetEntry[]> = {}
                for (const e of exercises) {
                    const match = last.find(l => l.exerciseId === e.exerciseId)
                    prefilled[e.exerciseId] = match && match.sets.length > 0
                        ? match.sets.map(s => ({ weight: s.weight, reps: s.reps, saved: false }))
                        : [{ weight: 0, reps: 0, saved: false }]
                }
                setSets(prefilled)
            })
            .catch(() => {
                const empty: Record<number, SetEntry[]> = {}
                for (const e of exercises) empty[e.exerciseId] = [{ weight: 0, reps: 0, saved: false }]
                setSets(empty)
            })
    }, [templateId, exercises])

    function updateSet(exerciseId: number, index: number, field: 'weight' | 'reps', value: number) {
        setSets(prev => ({
            ...prev,
            [exerciseId]: prev[exerciseId].map((s, i) => i === index ? { ...s, [field]: value, saved: false } : s)
        }))
    }

    function addSet(exerciseId: number) {
        setSets(prev => ({
            ...prev,
            [exerciseId]: [...(prev[exerciseId] ?? []), { weight: 0, reps: 0, saved: false }]
        }))
    }

    function removeSet(exerciseId: number, index: number) {
        setSets(prev => ({
            ...prev,
            [exerciseId]: prev[exerciseId].filter((_, i) => i !== index)
        }))
    }

    async function confirmSet(exerciseId: number, index: number) {
        const s = sets[exerciseId]?.[index]
        if (!s) return
        try {
            await logSet({ workoutId, exerciseId, weight: s.weight, reps: s.reps })
            setSets(prev => ({
                ...prev,
                [exerciseId]: prev[exerciseId].map((s, i) => i === index ? { ...s, saved: true } : s)
            }))
        } catch {
            console.error('Failed to save set')
        }
    }

    return (
        <div className="w-full flex flex-col gap-4">
            {exercises.map(e => (
                <div key={e.exerciseId} className="w-full rounded-3xl p-4 border border-border bg-surface flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <p className="text-text-dim text-start font-extrabold text-lg uppercase">{e.exerciseName}</p>
                        <p className="text-text-muted font-bold rounded-full bg-surface-2 px-3 py-1 text-xs uppercase w-fit">{e.muscleGroupName}</p>
                    </div>

                    <div className="flex flex-row text-text-muted text-xs uppercase px-1 gap-2">
                        <span className="w-6 shrink-0 text-center">#</span>
                        <span className="flex-1 text-center">KG</span>
                        <span className="flex-1 text-center">REPS</span>
                        <span className="w-16 shrink-0 text-center"></span>
                    </div>

                    {(sets[e.exerciseId] ?? []).map((s, i) => (
                        <div key={i} className={`flex flex-row items-center gap-2 rounded-xl p-1 transition-colors ${s.saved ? 'bg-accent/10' : ''}`}>
                            <span className="text-text-muted text-sm w-6 shrink-0 text-center">{i + 1}</span>
                            <input
                                type="number"
                                value={s.weight === 0 ? '' : s.weight}
                                placeholder="0"
                                onChange={ev => updateSet(e.exerciseId, i, 'weight', Number(ev.target.value))}
                                className="flex-1 min-w-0 bg-surface-2 border border-border rounded-xl p-2 text-text text-center focus:outline-none focus:ring-2 focus:ring-accent"
                            />
                            <input
                                type="number"
                                value={s.reps === 0 ? '' : s.reps}
                                placeholder="0"
                                onChange={ev => updateSet(e.exerciseId, i, 'reps', Number(ev.target.value))}
                                className="flex-1 min-w-0 bg-surface-2 border border-border rounded-xl p-2 text-text text-center focus:outline-none focus:ring-2 focus:ring-accent"
                            />
                            <button
                                onClick={() => confirmSet(e.exerciseId, i)}
                                className={`w-8 h-8 shrink-0 rounded-full text-sm font-bold flex items-center justify-center ${s.saved ? 'bg-accent text-text-dark' : 'bg-surface-2 border border-border text-text-muted'}`}
                            >✓</button>
                            <button
                                onClick={() => removeSet(e.exerciseId, i)}
                                className="w-6 h-8 shrink-0 flex items-center justify-center text-text-muted text-sm"
                            >✕</button>
                        </div>
                    ))}

                    <button
                        onClick={() => addSet(e.exerciseId)}
                        className="w-full text-text-muted text-sm bg-surface-2 border border-border rounded-xl p-2"
                    >+ Add set</button>
                </div>
            ))}
        </div>
    )
}
