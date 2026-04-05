import { useState } from "react";
import Calendar from "../components/Calendar";
import NewWorkout from "../components/workout/NewWorkout";
import WorkoutList from "../components/workout/WorkoutList";

function Workout() {
    const [showNew, setShowNew] = useState(false)

    return (
        <>
            <section className="w-full min-h-screen flex flex-col items-center gap-4 justify-start bg-black font-anton p-4 pb-24">
                <Calendar />
                <div className="flex flex-col gap-4 w-full h-auto pb-4">
                  {!showNew && <>
                    <h1 className="text-text-dim w-full text-start font-bold text-xl tracking-wide">MY WORKOUTS</h1>
                    <WorkoutList />
                  </>}
                  {showNew
                      ? <NewWorkout onClose={() => setShowNew(false)} />
                      : <button onClick={() => setShowNew(true)} className='p-2 w-full h-auto rounded-full font-extrabold italic text-xl bg-cta text-text-dim'>
                          Create new workout
                        </button>
                  }
                </div>

                
            </section>
        </>
    )
}

export default Workout
