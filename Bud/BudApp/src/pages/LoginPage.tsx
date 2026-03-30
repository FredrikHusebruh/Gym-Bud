
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    async function handleLogin() {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            alert(error.message)
            return
        }

        console.log('Logged in:', data.user)
        navigate('/Home')
    }

    return (
        <>
        <section className="w-full h-screen flex flex-col items-center justify-center text-white bg-black font-anton overflow-hidden">
            <div className="flex flex-col gap-8 border-2 border-[#181818] p-4 rounded-3xl w-[92%] mb-4">
                <h1 className="text-2xl text-[#F3F3F3] font-extrabold">Login</h1>

                <input
                    className="bg-[#1a1a1a] rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#EFFF00]"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    className="bg-[#1a1a1a] rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#EFFF00]"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}       
                    type="password"         
                />
                <button
                    onClick={handleLogin}
                    className="bg-[#EFFF00] text-[#181818] rounded-full py-2 font-bold"
                >
                    Login
                </button>
            </div>
            <p className='text-[#9a9a9a]'>Don't have an acount? <Link className='text-[#b8c400] underline' to="/Register">Register</Link></p>



        </section>
    </>
    )
}