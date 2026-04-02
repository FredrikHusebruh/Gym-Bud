
import Calendar from '../components/Calendar'
import Getstarted from '../components/workout/Getstarted'

function HomePage() {

  return (
    <>
      <section className=" w-full h-full flex-col min-h-screen flex items-center p-4 justify-start bg-black font-anton">
        <Calendar />
        <Getstarted />
      </section>
    </>
  )
}

export default HomePage