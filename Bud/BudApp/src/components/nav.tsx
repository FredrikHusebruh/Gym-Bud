import { useNavigate } from "react-router-dom";
import HomeIcon from '../assets/home.svg?react';
import FeedIcon from '../assets/feed.svg?react';
import DumbbellIcon from '../assets/dumbbell.svg?react';
import ProfileIcon from '../assets/profile.svg?react';




export default function Nav() {
      const navigate = useNavigate();

    return (
        <div className="flex flex-row w-full h-15 fixed bottom-2 px-2">
            <nav className="flex flex-row rounded-full bg-black w-full h-full  border border-[#F3F3F3]">
                <button onClick={() => navigate("/Home")} className='flex-1 flex items-center justify-center rounded-full text-[#F3F3F3]'><HomeIcon className="w-6 h-6 text-white" /></button>
                <button onClick={() => navigate("/")} className='flex-1 flex items-center justify-center rounded-full text-[#F3F3F3]'><FeedIcon className="w-6 h-6 text-white" /></button>
                <button onClick={() => navigate("/")} className='flex-1 flex items-center justify-center rounded-full text-[#F3F3F3]'><DumbbellIcon className="w-6 h-6 text-white" /></button>
                <button onClick={() => navigate("/")} className='flex-1 flex items-center justify-center rounded-full text-[#F3F3F3]'><ProfileIcon className="w-6 h-6 text-white" /></button>
               
            </nav>

        </div>
    )
}