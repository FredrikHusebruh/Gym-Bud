import BoxerinactionImg from '../assets/PixExtender-1774883479687.png'
import LogoutButton from '../components/LogOutButton'
import Nav from '../components/nav'

function HomePage() {

  return (
    <>
      <section className=" w-full h-full flex-col min-h-screen flex items-center p-4 justify-start bg-black font-anton">
        <div className="flex flex-col items-start justify-center gap-2 w-full">
            <div className='w-full p-2 flex flex-row text-black rounded-3xl gap-2 w-[100%] h-25 border border-[#EFFF00]'>
                <div className='flex-1 flex flex-col bg-[#EFFF00] text-[#181818] rounded-full items-center justify-center'>
                    <div className='flex justify-center text-gray-700 items-center font-bold w-10 h-10'>M</div>
                <div className='flex justify-center items-center font-bold w-10 h-10'>30</div>
                </div>
                <div className='flex-1 flex flex-col border border-[#EFFF00] rounded-full items-center justify-center'>
                    <div className='flex justify-center items-center text-gray-400 font-bold w-10 h-10'>T</div>
                    <div className='flex justify-center text-[#F3F3F3] items-center font-bold w-10 h-10'>31</div>
                </div>
                <div className='flex-1 flex flex-col border border-[#EFFF00] rounded-full items-center justify-center'>
                    <div className='flex justify-center items-center text-gray-400 font-bold w-10 h-10'>W</div>
                    <div className='flex justify-center text-[#F3F3F3] items-center font-bold w-10 h-10'>1</div>
                </div>
                <div className='flex-1 flex flex-col border border-[#EFFF00] rounded-full items-center justify-center'>
                    <div className='flex justify-center items-center text-gray-400 font-bold w-10 h-10'>T</div>
                    <div className='flex justify-center text-[#F3F3F3] items-center font-bold w-10 h-10'>2</div>
                </div>
                <div className='flex-1 flex flex-col border border-[#EFFF00] rounded-full items-center justify-center'>
                    <div className='flex justify-center items-center text-gray-400 font-bold w-10 h-10'>F</div>
                    <div className='flex justify-center text-[#F3F3F3] items-center font-bold w-10 h-10'>3</div>
                </div>
                <div className='flex-1 flex flex-col border border-[#EFFF00] rounded-full items-center justify-center'>
                    <div className='flex justify-center items-center text-gray-400 font-bold w-10 h-10'>S</div>
                    <div className='flex justify-center text-[#F3F3F3] items-center font-bold w-10 h-10'>4</div>
                </div>
                <div className='flex-1 flex flex-col border border-[#EFFF00] rounded-full items-center justify-center'>
                    <div className='flex justify-center items-center text-gray-400 font-bold w-10 h-10'>S</div>
                    <div className='flex justify-center text-[#F3F3F3] items-center font-bold w-10 h-10'>5</div>
                </div>
            </div>
        </div>
        <div className='flex flex-col items-center justify-center gap-4 h-auto w-full overflow-hidden rounded-3xl mt-4 border-2 border-[#181818]'>
             <img src={BoxerinactionImg} alt="Header" className=" max-w-full h-auto" />
            <h1 className='font-extrabold italic underline text-2xl text-[#F3F3F3]'>Get started now</h1>
            <p className='font-normal text-sm italic text-[#F3F3F3]'>Start planning your first workout or get inspired by others</p>
        </div>
        <Nav />
      </section>
      <LogoutButton />
    </>
  )
}

export default HomePage