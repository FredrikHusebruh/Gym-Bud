

export default function Calendar() {

    return (
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
    )
}
       


