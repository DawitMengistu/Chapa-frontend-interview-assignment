"use client"

import type React from "react"
import { useUser } from '@/context/UserContext'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { toast } from "sonner"


export default function LoginPage() {
    const { setRole } = useUser()
    const router = useRouter()



    const [isLoading, setIsLoading] = useState(false)
    const [selectedRole, setSelectedRole] = useState<'user' | 'admin' | 'superadmin' | null>(null)



    // if (status === "loading") {
    //     return (
    //         <div className="flex items-center justify-center h-screen bg-black">
    //             <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
    //         </div>
    //     )
    // }


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!selectedRole) {
            toast.error("Please select a role to continue")
            return
        }

        setIsLoading(true)
        setTimeout(() => {
            toast.success(`Logged in as ${selectedRole}`)
            setRole(selectedRole)
            setIsLoading(false)
            router.push('/dashboard')
        }, 1000)
    }
    return (
        <div className="flex min-h-screen items-center justify-center bg-white p-4">
            <div className="flex justify-center mb-2 absolute left-0 top-0 m-5">
                <div className="rounded-full p-3 flex gap-3 items-center hover:cursor-pointer" onClick={() => { router.push("/login") }}>
                    <Image
                        src="/Chapa-Logo.png"
                        alt="Telegram Icon"
                        width={200}
                        height={200}
                    />
                </div>
            </div>

            <Card className="w-full max-w-md border-zinc-100 bg-white text-zinc-900">
                <CardHeader className="space-y-1 text-left mb-4">
                    <CardTitle className="text-2xl">Welcome,
                        Let's get you Paid!</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin}>
                        <div className="grid gap-4">
                            <div className="grid w-full max-w-sm items-center gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" id="email" value={"youmusthireme@gmail.com"} disabled />
                            </div>

                            <div className="flex flex-col gap-2 my-4">
                                <Label className="mb-1">Select Role</Label>
                                <div className="grid grid-cols-1 gap-2">
                                    {['user', 'admin', 'superadmin'].map((role) => (
                                        <button
                                            key={role}
                                            type="button"
                                            onClick={() => setSelectedRole(role as typeof selectedRole)}
                                            className={`cursor-pointer w-full px-4 py-1 rounded border transition-colors font-medium
                                                ${selectedRole === role ? 'bg-[#a1cc5a] text-white border-[#AAD959]' : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-100'}`}
                                        >
                                            {role.charAt(0).toUpperCase() + role.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="cursor-pointer w-full bg-[#AAD959] text-white hover:bg-[#98c84d] mt-4 focus-visible:ring-[#AAD959] focus-visible:ring-2 focus-visible:ring-offset-2"
                                disabled={isLoading}
                            >
                                {isLoading ? "Processing..." : "Login"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center border-t border-zinc-200 pt-4">
                    <p className="text-sm text-zinc-500 flex gap-2">Seamless Payments , Endless Opportunities!</p>
                </CardFooter>
            </Card>

        </div >
    )
}
