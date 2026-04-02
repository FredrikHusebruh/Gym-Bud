import BoxerinactionImg from '../../assets/PixExtender-1774883479687.png'
import { useNavigate } from "react-router-dom";

export default function GetStarted() {
      const navigate = useNavigate();

    return (
       <div className='flex flex-col items-center rounded-3xl justify-start bg-[#131313] gap-4 h-auto w-full  border border-[#272727] overflow-hidden m-4 p-2'>
            <img src={BoxerinactionImg} alt="Header" className=" max-w-full h-auto rounded-3xl " />
            <h1 className='text-[#EFFF00] text-sm font-normal my-0'>BUILD IT. TRACK IT. CRUSH IT.</h1>
            <h1 className='text-xl font-bold text-[#F3F3F3] my-0'>The hardest part is starting. The second hardest part is not telling everyone you started.</h1>
            <button onClick={() => navigate("/Workout")} className='p-4 w-full h-full rounded-full font-extrabold italic text-xl bg-[#3E25F6] text-[#F3F3F3]'>Get started now</button>
        </div>
    )
}
       
