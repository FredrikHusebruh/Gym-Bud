// src/components/ProtectedRoute.tsx
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false)

        useEffect(() => {
            const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
                setLoggedIn(!!session)
                setLoading(false)
            })
            return () => subscription.unsubscribe()
        }, [])

    if (loading) return <p>Loading...</p>
    if (!loggedIn) return <Navigate to="/login" />

    return <>{children}</>
}