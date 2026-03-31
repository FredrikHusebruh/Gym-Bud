import { useState, useEffect } from "react";
import Calendar from "../components/Calendar";
import Nav from "../components/nav";

const messages = [
    "This feature is not available yet...",
    "Working hard or hardly working...",
    "Under construction...",
    "This page is in its bulking season. Results coming soon...",
    "404: Gains not found...",
]

function Feed() {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(i => (i + 1) % messages.length)
        }, 4000)
        return () => clearInterval(interval)
    }, [])

    return (
        <>
            <section className="w-full h-full min-h-screen flex flex-col items-center gap-4 justify-start bg-black font-anton p-4">
                <Calendar />
                <p className="text-white">{messages[index]}</p>
                <Nav />
            </section>
        </>
    )
}

export default Feed
