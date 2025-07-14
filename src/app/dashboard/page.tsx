'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/UserContext'
import { toast } from 'sonner'

export default function Dashboard() {
    const { role } = useUser()
    const router = useRouter()

    useEffect(() => {
        if (!role) {
            toast.error('No role selected. Please login.')
            router.push('/login')
        } else {
            router.replace(`/dashboard/${role}`)
        }
    }, [role, router])

    return <p>Redirecting...</p>
}
