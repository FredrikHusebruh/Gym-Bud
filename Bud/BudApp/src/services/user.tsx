import { apiFetch } from './apiClient'

export async function getUsers() {
    const res = await apiFetch('/api/user')
    return res.json()
}