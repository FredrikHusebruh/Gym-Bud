import type { NewUser } from '../types/NewUserTypes'

export async function getNewUser(): Promise<NewUser[]> {
    const res = await fetch('/api/NewUser')
    return res.json()
}