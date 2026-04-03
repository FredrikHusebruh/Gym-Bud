import { useState } from 'react'
import type { MuscleGroup } from '../../types/WorkoutTypes'

interface ExerciseData {
    name: string
    muscleGroupId: number
}

interface Props {
    index: number
    onRemove: () => void
    muscleGroups: MuscleGroup[]
    onChange: (data: ExerciseData) => void
}

export default function Exercise({ index, onRemove, muscleGroups, onChange }: Props) {
    const [name, setName] = useState('')
    const [muscleGroupId, setMuscleGroupId] = useState(0)

    function handleNameChange(value: string) {
        setName(value)
        onChange({ name: value, muscleGroupId })
    }

    function handleMuscleGroupChange(value: number) {
        setMuscleGroupId(value)
        onChange({ name, muscleGroupId: value })
    }

    return (
        <div className='w-full flex flex-col gap-2'>
            <div className='flex flex-row justify-between items-center'>
                <span className='text-text-muted text-xs'>Exercise {index + 1}</span>
                <button onClick={onRemove} className='text-text-muted text-xs'>Remove</button>
            </div>
            <input
                className="w-full bg-surface-2 rounded-lg p-2 text-text-muted focus:outline-none focus:ring-2 border border-border focus:ring-inset focus:ring-accent"
                placeholder="Exercise name"
                value={name}
                onChange={e => handleNameChange(e.target.value)}
            />
            <select
                className="w-full bg-surface-2 rounded-lg p-2 text-text-muted border border-border focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
                value={muscleGroupId}
                onChange={e => handleMuscleGroupChange(Number(e.target.value))}
            >
                <option value={0} disabled>Select muscle group</option>
                {muscleGroups.map(mg => (
                    <option key={mg.id} value={mg.id}>{mg.muscleGroup}</option>
                ))}
            </select>
            <div className="w-full border-t border-border mt-2"></div>
        </div>
    )
}
