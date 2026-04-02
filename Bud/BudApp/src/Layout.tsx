// Layout.tsx
import Nav from './components/nav'
import { Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <>
            <Outlet />
            <Nav />
        </>
    )
}
