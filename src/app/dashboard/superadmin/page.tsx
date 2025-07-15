'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/UserContext'
import { toast } from 'sonner'
import { users as mockUsers } from '@/data/user'
import { systemStats } from '@/data/stats'
import { useState } from 'react'
import { useRequireRole } from '@/lib/useRequireRole'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function SuperAdminDashboard() {
    const router = useRouter()
    const { role, hydrated } = useUser()
    const canRender = useRequireRole('superadmin')
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

    if (!canRender) return null

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
        <div className="max-h-screen pb-14 overflow-scroll scrollbar-hidden">

            <h1 className="text-2xl font-bold mb-4">Super Admin Dashboard</h1>

            {/* Chart Section */}
            <div className="my-6">
                <h3 className="text-md font-semibold mb-2">Payments per User (Chart)</h3>
                <div className="bg-white rounded shadow p-4">
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={users} margin={{ left: 12, right: 12 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
                            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                            <Tooltip />
                            <Bar dataKey="totalPayments" fill="#AAD959" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Users Table Section */}
            <div className='my-8'>
                <h2 className="text-lg font-semibold mb-2">Users</h2>
                <table className="w-full bg-white rounded shadow text-left">
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

            {/* Side-by-side section for System Stats and Admins */}
            <div className="mb-6 flex flex-col md:flex-row gap-6">
                {/* System Stats */}
                <div className="flex-1 bg-zinc-50 rounded-lg p-4 mb-4 md:mb-0">
                    <h2 className="text-lg font-semibold mb-2">System Stats</h2>
                    <ul>
                        <li>Total Payments: <span className="font-mono">${systemStats.totalPayments}</span></li>
                        <li>Total Users: <span className="font-mono">{systemStats.totalUsers}</span></li>
                        <li>Active Users: <span className="font-mono">{systemStats.activeUsers}</span></li>
                    </ul>
                </div>
                {/* Admins */}
                <div className="flex-1 bg-zinc-50 rounded-lg p-4">
                    <h2 className="text-lg font-semibold mb-2">Admins</h2>
                    <form onSubmit={addAdmin} className="flex gap-2 mb-2">
                        <input
                            className="border rounded px-2 py-1 flex-1"
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
            </div>

            {/* User Payment Summary Table */}
            <div className="mt-8">
                <h2 className="text-lg font-semibold mb-2">User Payment Summary</h2>
                <table className="w-full bg-zinc-50 rounded-lg p-4">
                    <thead>
                        <tr>
                            <th className="text-left p-2">Name</th>
                            <th className="text-left p-2">Email</th>
                            <th className="text-left p-2">Total Payments</th>
                            <th className="text-left p-2">Last Payment Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td className="p-2">{user.name}</td>
                                <td className="p-2">{user.email}</td>
                                <td className="p-2 font-mono">${user.totalPayments}</td>
                                <td className="p-2">{user.lastPaymentDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
