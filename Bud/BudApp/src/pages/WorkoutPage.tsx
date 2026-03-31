import { useNavigate } from "react-router-dom";
import Getstarted from '../components/workout/Getstarted'
import Nav from '../components/nav'
import Calendar from "../components/Calendar";

function Workout() {
  const navigate = useNavigate();

  return (
    <>
      <section className="w-full h-full min-h-screen flex flex-col items-center gap-4 justify-start bg-black font-anton p-4">
        <Calendar />
        <p>You have no workout available</p>
        <Nav />
      </section>
    </>
  )
}

export default Workout