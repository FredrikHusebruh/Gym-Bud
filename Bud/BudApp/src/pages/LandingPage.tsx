import headerImg from '../assets/Header.png'
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <section className="w-full h-full min-h-screen flex items-start justify-center bg-bg font-anton">
        <div className="m-2 flex flex-col items-start justify-center gap-2">
          <div className="relative flex items-center justify-center rounded-3xl overflow-hidden">
            <img src={headerImg} alt="Header" className="max-w-full h-auto" />
            <h1 className='absolute font-extrabold top-14 left-4 text-4xl text-accent'>GYM BUD</h1>
            <p className='absolute font-extrabold top-24 left-4 text-normal italic text-accent'>"GROW BIG OR GO HOME"</p>

            <div className='flex flex-row items-center justify-center absolute font-bold left-4 bottom-4 gap-4'>
              <button onClick={() => navigate("/Login")} className='bg-accent rounded-full w-24 py-2 text-text-dark text-center'>Log in</button>
              <div className='text-text-dim'>or</div>
              <button onClick={() => navigate("/Register")} className='bg-accent rounded-full w-24 py-2 text-text-dark text-center'>Register</button>
            </div>
          </div>
          <div className='flex flex-col items-center justify-center gap-4 h-auto w-full rounded-3xl mt-4 bg-surface border border-border p-8'>
            <h1 className='font-extrabold italic text-2xl text-text-dim'>DREAM IT, PLAN IT, DO IT</h1>
            <p className='font-normal text-sm italic text-text-dim'>Working out has never benn easier. <span className="font-bold">PLAN</span>, <span className="font-bold">TRACK</span>, <span className="font-bold">SHARE</span> and get <span className="font-bold">INSPIRED</span>, all in one place.</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default LandingPage
