import Calendar from "../components/Calendar";
import LogoutButton from "../components/LogOutButton";
import Nav from "../components/nav";

function Profile() {

  return (
    <>
      <section className="w-full h-full min-h-screen flex flex-col items-center gap-4 justify-start bg-black font-anton p-4">
        <Calendar />
        <LogoutButton />
      </section>
    </>
  )
}

export default Profile