import { useState } from "react";
import Calendar from "../components/Calendar";
import NewWorkout from "../components/workout/NewWorkout";

function Workout() {
    const [showNew, setShowNew] = useState(false)

    return (
        <>
            <section className="w-full h-full min-h-screen flex flex-col items-center gap-4 justify-start bg-black font-anton p-4">
                <Calendar />

                {showNew && <NewWorkout />}
                <p className="text-text-muted">You have no workout available</p>
                    <button onClick={() => setShowNew(v => !v)} className='p-2 w-full h-auto rounded-full font-extrabold italic text-xl bg-cta text-text-dim'>
                    {showNew ? 'Cancel' : 'Create new workout'}
                </button>
            </section>
        </>
    )
}

export default Workout
