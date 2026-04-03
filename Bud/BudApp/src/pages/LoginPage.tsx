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
        <section className="w-full h-screen flex flex-col items-center justify-center text-white bg-bg font-anton overflow-hidden">
            <div className="flex flex-col gap-8 border border-border bg-surface p-4 rounded-3xl w-[92%] mb-4">
                <h1 className="text-2xl text-text-dim font-extrabold">Login</h1>

                <input
                    className="bg-surface-2 rounded-lg p-2 text-dim focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    className="bg-surface-2 rounded-lg p-2 text-text-dim focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                />
                <button
                    onClick={handleLogin}
                    className="bg-accent text-text-dark rounded-full py-2 font-bold"
                >
                    Login
                </button>
            </div>
            <p className='text-text-muted'>Don't have an acount? <Link className='text-accent underline' to="/Register">Register</Link></p>
        </section>
    </>
    )
}
