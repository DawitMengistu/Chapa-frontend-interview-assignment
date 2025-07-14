'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/UserContext'
import { toast } from 'sonner'
import { users as mockUsers } from '@/data/user'
import { useState } from 'react'

export default function UserDashboard() {
    const router = useRouter()
    const { role, hydrated } = useUser()
    const [users, setUsers] = useState(mockUsers)


    useEffect(() => {
        if (!hydrated) return // Wait for localStorage to be read

        if (!role) {
            toast.error('Please login first.')
            router.push('/login')
        } else if (role !== 'admin') {
            toast.error('Access denied.')
            router.push(`/dashboard/${role}`)
        }
    }, [role, hydrated, router])

    if (role !== 'admin') return null

    const toggleActive = (id: number) => {
        setUsers(users => users.map(u => u.id === id ? { ...u, active: !u.active } : u))
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Users</h2>
                <table className="w-full max-w-lg bg-white rounded shadow text-left">
                    <thead>
                        <tr className="bg-zinc-100">
                            <th className="p-2">Name</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Total Payments</th>
                            <th className="p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="border-t">
                                <td className="p-2">{user.name}</td>
                                <td className="p-2">{user.active ? 'Active' : 'Inactive'}</td>
                                <td className="p-2">${user.totalPayments}</td>
                                <td className="p-2">
                                    <button
                                        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${user.active ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                                        onClick={() => toggleActive(user.id)}
                                    >
                                        {user.active ? 'Deactivate' : 'Activate'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-8">
                <h2 className="text-lg font-semibold mb-2">User Payment Summary</h2>
                <ul className="bg-zinc-50 rounded-lg p-4">
                    {users.map(user => (
                        <li key={user.id} className="mb-1">
                            {user.name}: <span className="font-mono">${user.totalPayments}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
