// Layout.tsx
import Nav from './components/nav'
import { Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <div className="flex flex-col items-center min-h-screen bg-black">
            <div className="w-full max-w-screen-sm min-h-screen flex flex-col">
                <Outlet />
                <Nav />
            </div>
        </div>
    )
}
