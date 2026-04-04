import BoxerinactionImg from '../assets/Boxerinaction.png'
import { useNavigate } from "react-router-dom";

export default function GetStarted() {
    const navigate = useNavigate();

    return (
        <div className='relative w-full rounded-3xl overflow-hidden'>
            <img src={BoxerinactionImg} alt="Header" className="w-full h-auto block" />

            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.3) 15%, rgba(0,0,0,0.92) 100%)' }} />


            <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-3">
                <p className="text-accent text-xs text-start font-bold tracking-widest uppercase m-0">Build it. Track it. Crush it.</p>
                <p className="text-text font-extrabold text-xl text-start leading-snug m-0">The hardest part is starting.<br />Now show everyone.</p>
                <button
                    onClick={() => navigate("/Workout")}
                    className="w-full p-3 rounded-full font-extrabold text-sm bg-cta text-text tracking-wide"
                >
                    GET STARTED NOW
                </button>
            </div>
        </div>
    )
}
