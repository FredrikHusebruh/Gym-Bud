interface Props {
    index: number
    onRemove: () => void
}

export default function Exercise({ index, onRemove }: Props) {
    return (
        <div className='w-full flex flex-col gap-2'>
            <div className='flex flex-row justify-between items-center'>
                <span className='text-text-muted text-xs'>Exercise {index + 1}</span>
                <button onClick={onRemove} className='text-text-muted text-xs'>Remove</button>
            </div>
            <input
                className="w-full bg-surface-2 rounded-lg p-2 text-text-muted focus:outline-none focus:ring-2 border border-border focus:ring-inset focus:ring-accent"
                placeholder="Exercise name"
            />
            <select className="w-full bg-surface-2 rounded-lg p-2 text-text-muted border border-border focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent">
                <option value="" disabled selected>Select muscle group</option>
            </select>
            <div className="w-full border-t border-border mt-2"></div>
        </div>
    )
}
