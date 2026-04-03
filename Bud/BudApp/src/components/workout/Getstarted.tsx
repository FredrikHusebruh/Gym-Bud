import BoxerinactionImg from '../../assets/PixExtender-1774883479687.png'
import { useNavigate } from "react-router-dom";

export default function GetStarted() {
      const navigate = useNavigate();

    return (
       <div className='flex flex-col items-center rounded-3xl justify-start bg-surface gap-2 h-auto w-full border border-border overflow-hidden m-4 p-2'>
            <img src={BoxerinactionImg} alt="Header" className=" max-w-full h-auto rounded-3xl " />
            <h1 className='text-accent text-sm font-normal leading-snug my-0'>BUILD IT. TRACK IT. CRUSH IT.</h1>
            <h1 className='text-xl font-bold text-text-dim leading-snug my-0'>The hardest part is starting. Now it's time show everyone.</h1>
            <button onClick={() => navigate("/Workout")} className='p-2 w-full h-full rounded-full font-extrabold italic text-xl bg-cta text-text-dim'>Get started now</button>
        </div>
    )
}
