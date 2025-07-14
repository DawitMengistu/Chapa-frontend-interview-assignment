'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/UserContext'
import { toast } from 'sonner'
import { transactions } from '@/data/transaction'
import { useState } from 'react'

export default function UserDashboard() {
    const router = useRouter()
    const { role, hydrated } = useUser()
    const [amount, setAmount] = useState('')
    const [to, setTo] = useState('')
    const [sending, setSending] = useState(false)


    useEffect(() => {
        if (!hydrated) return

        if (!role) {
            toast.error('Please login first.')
            router.push('/login')
        } else if (role !== 'user') {
            toast.error('Access denied.')
            router.push(`/dashboard/${role}`)
        }
    }, [role, hydrated, router])

    if (role !== 'user') return null

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
            <div className="mb-6 p-4 bg-[#AAD959] text-white rounded-lg w-full max-w-xs">
                <div className="text-lg font-semibold">Wallet Balance</div>
                <div className="text-2xl font-bold">$1,250.00</div>
            </div>
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
                <ul className="divide-y divide-zinc-200 bg-zinc-50 rounded-lg">
                    {transactions.map(tx => (
                        <li key={tx.id} className="flex justify-between px-4 py-2">
                            <span>{tx.to}</span>
                            <span className="font-mono">${tx.amount}</span>
                            <span className="text-xs text-zinc-500">{tx.date}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <form
                className="bg-white p-4 rounded-lg shadow w-full max-w-xs flex flex-col gap-2"
                onSubmit={e => {
                    e.preventDefault();
                    setSending(true);
                    setTimeout(() => {
                        setSending(false);
                        setAmount('');
                        setTo('');
                        toast.success('Transaction sent! (simulated)');
                    }, 1000);
                }}
            >
                <h2 className="text-lg font-semibold mb-2">Send Money</h2>
                <input
                    className="border rounded px-2 py-1"
                    placeholder="Recipient"
                    value={to}
                    onChange={e => setTo(e.target.value)}
                    required
                />
                <input
                    className="border rounded px-2 py-1"
                    placeholder="Amount"
                    type="number"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="bg-[#AAD959] text-white rounded px-4 py-2 mt-2 disabled:opacity-50"
                    disabled={sending}
                >
                    {sending ? 'Sending...' : 'Send'}
                </button>
            </form>
        </div>
    )
}
