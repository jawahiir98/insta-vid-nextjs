'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { CircleUser, PanelsTopLeft, PlusCircleIcon, ShieldPlusIcon } from 'lucide-react'

const menuOptions = [
    { id: 1, name: 'Dashboard', path: '/dashboard', icon: PanelsTopLeft },
    { id: 2, name: 'Create New', path: '/dashboard/create-new', icon: PlusCircleIcon },
    { id: 3, name: 'Upgrade', path: '/upgrade', icon: ShieldPlusIcon },
    { id: 4, name: 'Account', path: '/account', icon: CircleUser },
]

export const SideNav = () => {
    const pathname = usePathname()

    return (
        <div className="w-64 h-screen shadow-md p-5">
            <div>
                {menuOptions.map((item) => {
                    const isActive = pathname === item.path

                    return (
                        <Link href={item.path} key={item.id}>
                            <div
                                className={`flex items-center my-[4px] gap-3 p-3 rounded cursor-pointer transition-all duration-300 ease-in-out hover:bg-primary hover:text-primary-foreground hover:scale-105 ${
                                    isActive ? 'bg-primary text-primary-foreground scale-105' : ''
                                }`}
                            >
                                <item.icon />
                                <h2>{item.name}</h2>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
