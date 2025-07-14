'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type Role = 'user' | 'admin' | 'superadmin' | null

interface UserContextType {
    role: Role
    setRole: (role: Role) => void
    hydrated: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [role, setRoleState] = useState<Role>(null)
    const [hydrated, setHydrated] = useState(false)

    useEffect(() => {
        const storedRole = localStorage.getItem('role') as Role
        if (storedRole) setRoleState(storedRole)
        setHydrated(true)
    }, [])

    const setRole = (newRole: Role) => {
        setRoleState(newRole)
        if (newRole) localStorage.setItem('role', newRole)
        else localStorage.removeItem('role')
    }

    return (
        <UserContext.Provider value={{ role, setRole, hydrated }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext)
    if (!context) throw new Error('useUser must be used inside UserProvider')
    return context
}
