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

        const { error: profileError } = await supabase.rpc('create_profile', {
            user_id: data.user!.id,
            user_name: username.trim()
        })

        if (profileError) {
            alert('Failed to create profile: ' + profileError.message)
            return
        }

        navigate('/Login')
    }

    return (
        <section className="w-full h-screen flex flex-col items-center justify-center text-text-dim bg-bg font-anton overflow-hidden">
            <div className="flex flex-col gap-8 border bg-surface border-border p-4 rounded-3xl w-[92%] mb-4">
                <h1 className="text-2xl text-textdim font-extrabold">Register</h1>
                <input
                    className="bg-surface-2 rounded-lg p-2 text-text-dim focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    className="bg-surface-2 rounded-lg p-2 text-text-dim focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    className="bg-surface-2 rounded-lg p-2 text-text-dim focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <input
                    className="bg-surface-2 rounded-lg p-2 text-text-dim focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
                    placeholder="Confirm password"
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                />
                <button
                    onClick={handleRegister}
                    className="bg-accent text-text-dark rounded-full py-2 font-bold"
                >
                    Register
                </button>
            </div>
            <p className='text-text-muted'>Already have an acount? <Link className='text-accent underline' to="/Login">Login</Link></p>
        </section>
    )
}

export default RegisterPage
