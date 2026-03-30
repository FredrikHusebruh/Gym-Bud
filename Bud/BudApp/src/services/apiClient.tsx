import { supabase } from '../lib/supabase'

export async function apiFetch(url: string, options?: RequestInit) {
    const { data } = await supabase.auth.getSession()
    const token = data.session?.access_token

    const baseUrl = import.meta.env.VITE_API_URL ?? ''

    return fetch(`${baseUrl}${url}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            ...options?.headers
        }
    })
}