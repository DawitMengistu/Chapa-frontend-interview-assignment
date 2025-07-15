'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/UserContext'
import { toast } from 'sonner'
import { users as mockUsers } from '@/data/user'
import { useState } from 'react'
import { useRequireRole } from '@/lib/useRequireRole'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function UserDashboard() {
    const router = useRouter()
    const { role, hydrated } = useUser()
    const canRender = useRequireRole('admin')
    const [users, setUsers] = useState(mockUsers)


    useEffect(() => {
        if (!hydrated) return

        if (!role) {
            toast.error('Please login first.')
            router.push('/login')
        } else if (role !== 'admin') {
            toast.error('Access denied.')
            router.push(`/dashboard/${role}`)
        }
    }, [role, hydrated, router])

    if (!canRender) return null

    const toggleActive = (id: number) => {
        setUsers(users => users.map(u => u.id === id ? { ...u, active: !u.active } : u))
    }

    return (
        <div className="h-screen pb-20 overflow-scroll scrollbar-hidden">

            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Users</h2>

                <div className="mt-6">
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

                <div className='my-8'>

                    <h3 className="text-md font-semibold my-4">Actions</h3>
                    <table className="w-full  bg-white rounded shadow text-left">
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

            </div>
            <div className="mt-8 mb-8">
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
