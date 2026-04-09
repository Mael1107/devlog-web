import Link from "next/link";

const NavBar = () => {
    return (
        <nav className="flex justify-between bg-indigo-100 rounded-b-sm p-5">
            <Link href="/" className="bg-indigo-700 p-3 rounded-xl text-4xl font-bold text-white shadow-xl">
                DevLog
            </Link>
            <Link 
            className="p-2 bg-indigo-500 text-white font-bold text-lg rounded-xl hover:bg-indigo-600 hover:text-blue-100 transition-colors shadow-md self-start mt-2" 
            href="/entries/new">
                Add log now!
            </Link>
        </nav>
    )
}

export default NavBar