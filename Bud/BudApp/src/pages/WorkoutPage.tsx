import { useState } from "react";
import Calendar from "../components/Calendar";
import NewWorkout from "../components/workout/NewWorkout";

function Workout() {
    const [showNew, setShowNew] = useState(false)

    return (
        <>
            <section className="w-full min-h-screen flex flex-col items-center gap-4 justify-start bg-black font-anton p-4 pb-24">
                <Calendar />
                {showNew
                    ? <NewWorkout onClose={() => setShowNew(false)} />
                    : <button onClick={() => setShowNew(true)} className='p-2 w-full h-auto rounded-full font-extrabold italic text-xl bg-cta text-text-dim'>
                        Create new workout
                      </button>
                }
                <p className="text-text-muted">You have no workout available</p>
            </section>
        </>
    )
}

export default Workout
