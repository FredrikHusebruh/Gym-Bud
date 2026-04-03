import { useState } from 'react'
import Exercise from './Exercise'

interface Props {
    onClose: () => void
}

export default function NewWorkout({ onClose }: Props) {
    const [exercises, setExercises] = useState<number[]>([])

    function addExercise() {
        setExercises(prev => [...prev, Date.now()])
    }

    function removeExercise(id: number) {
        setExercises(prev => prev.filter(e => e !== id))
    }

    return (
        <div className='w-full flex flex-col gap-4 items-center bg-surface border border-border rounded-3xl p-4'>
            <h1 className='text-text w-full font-bold text-xl text-start tracking-wide'>NEW WORKOUT TEMPLATE</h1>
            <div className='flex flex-row justify-between gap-2 items-center w-full'>
                <input
                    className="w-full bg-surface-2 rounded-lg p-2 text-text-muted focus:outline-none focus:ring-2 border border-border focus:ring-inset focus:ring-accent"
                    placeholder="Name"
                />
                <select className="w-full bg-surface-2 rounded-lg p-2 text-text-muted border border-border focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent">
                    <option value="" disabled selected>Select category</option>
                </select>
            </div>
            <input
                className="w-full bg-surface-2 rounded-lg p-2 text-text-muted focus:outline-none focus:ring-2 border border-border focus:ring-inset focus:ring-accent"
                placeholder="Description"
            />
            <div className="w-full border-t border-border"></div>

            {exercises.map((id, index) => (
                <Exercise key={id} index={index} onRemove={() => removeExercise(id)} />
            ))}

            <button onClick={addExercise} className='text-text-muted text-sm bg-surface-2 p-2 rounded-full border border-border w-full'>
                Add new exercise
            </button>

            <div className="flex flex-row w-full h-auto justify-between pt-4">
                <button onClick={onClose} className='text-text-dark w-20 text-sm bg-accent p-2 rounded-lg border border-border'>Save</button>
                <button onClick={() => { if (window.confirm('Discard new workout?')) onClose() }} className='text-text-muted w-20 text-sm bg-surface-2 p-2 rounded-lg border border-border'>Cancel</button>
            </div>
        </div>
    )
}
