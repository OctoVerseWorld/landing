export default function PageHeader () {
    return (
        <div
            className="w-full h-[58px] bg-[black]/20 fixed top-0 z-50 border border-[white]/20"
            style={{backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)'}}
        >
            <div className="text-[white] text-2xl">bebra</div>
        </div>
    )
}