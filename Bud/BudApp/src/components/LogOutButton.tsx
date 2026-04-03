
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function LogoutButton() {
    const navigate = useNavigate()

    async function handleLogout() {
        await supabase.auth.signOut()
        navigate('/')
    }

    return (
        <button onClick={handleLogout}>
            Logout now
        </button>
    )
}