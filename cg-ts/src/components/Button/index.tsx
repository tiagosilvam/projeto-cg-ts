export function Button({name, type, icon, onClick}: any) {
    return (
        <button
            className='bg-blue-600 rounded font-semibold text-white h-10 hover:bg-blue-700 mt-4 px-5 py-2.5 text-center inline-flex items-center justify-center'
            type={type}
            onClick={onClick}
        >
            {icon}
            {name}
        </button>
    )
}