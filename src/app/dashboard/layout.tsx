'use client'

import { useUser } from '@/context/UserContext'
import { useRouter } from 'next/navigation'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { setRole } = useUser()
    const router = useRouter()

    const handleLogout = () => {
        setRole(null)
        router.push('/login')
    }

    return (
        <div className="flex min-h-screen">
            <aside className="w-56 bg-zinc-100 border-r border-zinc-200 flex flex-col p-6">
                <nav className="flex-1">
                    <ul className="space-y-4">
                        <li><a href="/dashboard/user" className="text-zinc-700 hover:text-[#AAD959] font-medium transition-colors">User Dashboard</a></li>
                        <li><a href="/dashboard/admin" className="text-zinc-700 hover:text-[#AAD959] font-medium transition-colors">Admin Dashboard</a></li>
                        <li><a href="/dashboard/superadmin" className="text-zinc-700 hover:text-[#AAD959] font-medium transition-colors">Super Admin Dashboard</a></li>
                    </ul>
                </nav>
                <button
                    onClick={handleLogout}
                    className="cursor-pointer mt-auto w-full py-2 px-4 rounded bg-zinc-200 text-zinc-600 hover:bg-zinc-300 hover:text-zinc-800 transition-colors font-semibold"
                >
                    Logout
                </button>
            </aside>
            <main className="flex-1 p-8 bg-white">
                {children}
            </main>
        </div>
    )
}
