
import Calendar from '../components/Calendar'
import Getstarted from '../components/Getstarted'

function HomePage() {

  return (
    <>
      <section className=" w-full h-full flex-col min-h-screen gap-4 flex items-center p-4 justify-start bg-black font-anton">
        <Calendar />
        <Getstarted />
      </section>
    </>
  )
}

export default HomePage