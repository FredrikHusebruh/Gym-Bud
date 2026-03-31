import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function RegisterPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()

    async function handleRegister() {
        if (!username.trim()) {
            alert('Username is required')
            return
        }
        if (!email.trim()) {
            alert('Email is required')
            return
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address')
            return
        }
        if (password.length < 8) {
            alert('Password must be at least 8 characters')
            return
        }
        if (!/[A-Z]/.test(password)) {
            alert('Password must contain at least one uppercase letter')
            return
        }
        if (!/[0-9]/.test(password)) {
            alert('Password must contain at least one number')
            return
        }
        if (password !== confirmPassword) {
            alert('Passwords do not match')
            return
        }

        // Check if username is already taken
        const { data: existing } = await supabase
            .from('profiles')
            .select('id')
            .eq('username', username.trim())
            .maybeSingle()

        if (existing) {
            alert('Username is already taken')
            return
        }

        const { data, error } = await supabase.auth.signUp({ email, password })

        if (error) {
            alert(error.message)
            return
        }

        const { error: profileError } = await supabase
            .from('profiles')
            .insert({ id: data.user!.id, username: username.trim() })

        if (profileError) {
            alert('Failed to create profile: ' + profileError.message)
            return
        }

        navigate('/Login')
    }

    return (
        <section className="w-full h-screen flex flex-col items-center justify-center text-white bg-black font-anton overflow-hidden">
            <div className="flex flex-col gap-8 border-2 border-[#181818] p-4 rounded-3xl w-[92%] mb-4">
                <h1 className="text-2xl text-[#F3F3F3] font-extrabold">Register</h1>
                <input
                    className="bg-[#1a1a1a] rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#EFFF00]"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    className="bg-[#1a1a1a] rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#EFFF00]"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    className="bg-[#1a1a1a] rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#EFFF00]"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <input
                    className="bg-[#1a1a1a] rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#EFFF00]"
                    placeholder="Confirm password"
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                />
                <button
                    onClick={handleRegister}
                    className="bg-[#EFFF00] text-[#181818] rounded-full py-2 font-bold"
                >
                    Register
                </button>
            </div>
            <p className='text-[#9a9a9a]'>Already have an acount? <Link className='text-[#b8c400] underline' to="/Login">Login</Link></p>
        </section>
    )
}

export default RegisterPage
