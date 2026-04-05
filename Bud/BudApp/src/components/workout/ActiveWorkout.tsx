import type { WorkoutWithExercises } from '../../types/WorkoutTypes'
import BackIcon from '../../assets/back.svg?react'
import PlayIcon from '../../assets/play.svg?react'

interface Props {
    workout: WorkoutWithExercises
    onClose: () => void
}

export default function ActiveWorkout({ workout, onClose }: Props) {
    return (
        <div className="w-full flex flex-col bg-gradient-to-br from-[#2a1fff] to-[#1a0aaa]">
            <div className="sticky top-0 flex flex-col text-text justify-start p-4 gap-2 items-start bg-gradient-to-br from-[#2a1fff] to-[#1a0aaa]">
                <button onClick={onClose} className="pb-4 flex flex-row items-center gap-1 text-text">
                    <BackIcon className="w-4 h-4" />
                    BACK
                </button>
                <h1 className="text-accent font-extrabold italic text-4xl text-start tracking-wide uppercase">{workout.name}</h1>
                <p className="text-text rounded-full bg-[#5A53EB] px-3 py-1 text-sm">{workout.categoryName}</p>
                <p className="text-text-dim text-start text-normal">{workout.description}</p>
            </div>
            <div className="w-full h-auto p-4 pb-32 flex flex-col gap-3 bg-black">
                {workout.exercises.map(e => (
                    <div key={e.exerciseId} className="flex flex-col w-auto rounded-3xl p-4 border border-border bg-surface flex flex-col gap-1">
                        <p className="text-text-dim text-start font-extrabold text-normal uppercase">{e.exerciseName}</p>
                        <p className="text-text-dim rounded-full bg-surface-2 px-3 py-1 text-sm border border-border w-fit">{e.muscleGroupName}</p>
                    </div>
                ))}
            </div>
            <div className="fixed w-full bottom-0 left-0 right-0 flex justify-center px-4 pb-8">
                <button className="flex items-center justify-center font-extrabold italic text-xl text-text-dark w-full bg-accent gap-2 rounded-full p-4">
                    <PlayIcon className="w-8 h-8" />START WORKOUT
                </button>
            </div>
        </div>
    )
}
