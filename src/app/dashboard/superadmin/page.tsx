'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/UserContext'
import { toast } from 'sonner'
import { users as mockUsers } from '@/data/user'
import { systemStats } from '@/data/stats'
import { useState } from 'react'

export default function SuperAdminDashboard() {
    const router = useRouter()
    const { role, hydrated } = useUser()
    const [users, setUsers] = useState(mockUsers)
    const [admins, setAdmins] = useState(['Alice'])
    const [newAdmin, setNewAdmin] = useState('')


    useEffect(() => {
        if (!hydrated) return

        if (!role) {
            toast.error('Please login first.')
            router.push('/login')
        } else if (role !== 'superadmin') {
            toast.error('Access denied.')
            router.push(`/dashboard/${role}`)
        }
    }, [role, hydrated, router])

    if (role !== 'superadmin') return null

    const toggleActive = (id: number) => {
        setUsers(users => users.map(u => u.id === id ? { ...u, active: !u.active } : u))
    }

    const addAdmin = (e: React.FormEvent) => {
        e.preventDefault()
        if (newAdmin && !admins.includes(newAdmin)) {
            setAdmins([...admins, newAdmin])
            setNewAdmin('')
        }
    }
    const removeAdmin = (name: string) => {
        setAdmins(admins.filter(a => a !== name))
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Super Admin Dashboard</h1>
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">System Stats</h2>
                <ul className="bg-zinc-50 rounded-lg p-4 mb-4">
                    <li>Total Payments: <span className="font-mono">${systemStats.totalPayments}</span></li>
                    <li>Total Users: <span className="font-mono">{systemStats.totalUsers}</span></li>
                    <li>Active Users: <span className="font-mono">{systemStats.activeUsers}</span></li>
                </ul>
            </div>
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Admins</h2>
                <form onSubmit={addAdmin} className="flex gap-2 mb-2">
                    <input
                        className="border rounded px-2 py-1"
                        placeholder="Admin name"
                        value={newAdmin}
                        onChange={e => setNewAdmin(e.target.value)}
                    />
                    <button type="submit" className="bg-[#AAD959] text-white rounded px-4 py-1">Add</button>
                </form>
                <ul className="flex gap-2 flex-wrap">
                    {admins.map(admin => (
                        <li key={admin} className="bg-zinc-200 rounded px-3 py-1 flex items-center gap-2">
                            {admin}
                            <button onClick={() => removeAdmin(admin)} className="text-red-500 hover:underline">Remove</button>
                        </li>
                    ))}
                </ul>
            </div>
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
