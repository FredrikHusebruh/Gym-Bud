
import Calendar from '../components/Calendar'
import LogoutButton from '../components/LogOutButton'
import Nav from '../components/nav'
import Getstarted from '../components/workout/Getstarted'

function HomePage() {

  return (
    <>
      <section className=" w-full h-full flex-col min-h-screen flex items-center p-4 justify-start bg-black font-anton">
        <Calendar />
        <Getstarted />
        <Nav />
      </section>
    </>
  )
}

export default HomePage