import { useNavigate, useLocation } from "react-router-dom";
import HomeIcon from '../assets/home.svg?react';
import FeedIcon from '../assets/feed.svg?react';
import DumbbellIcon from '../assets/dumbbell.svg?react';
import ProfileIcon from '../assets/profile.svg?react';

export default function Nav() {
    const navigate = useNavigate();
    const location = useLocation();

    const active = (path: string) =>
        location.pathname === path
            ? 'bg-[#EFFF00] text-[#3a3a3a]'
            : 'bg-[#131313] text-[#F3F3F3]'

    return (
        <div className="flex flex-row w-full h-15 fixed bottom-2 px-2">
            <nav className="flex flex-row rounded-full bg-[#131313] w-full h-full border border-[#272727]">
                <button onClick={() => navigate("/Home")} className={`flex-1 flex items-center justify-center rounded-full ${active("/Home")}`}><HomeIcon className="w-6 h-6" /></button>
                <button onClick={() => navigate("/Feed")} className={`flex-1 flex items-center justify-center rounded-full ${active("/Feed")}`}><FeedIcon className="w-6 h-6" /></button>
                <button onClick={() => navigate("/Workout")} className={`flex-1 flex items-center justify-center rounded-full ${active("/Workout")}`}><DumbbellIcon className="w-6 h-6" /></button>
                <button onClick={() => navigate("/Profile")} className={`flex-1 flex items-center justify-center rounded-full ${active("/Profile")}`}><ProfileIcon className="w-6 h-6" /></button>
            </nav>
        </div>
    )
}
