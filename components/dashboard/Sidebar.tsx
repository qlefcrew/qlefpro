'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignOutButton, useUser } from '@clerk/nextjs'
import { LayoutDashboard, Library, UploadCloud, BarChart2, FileText, Settings, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Catalog', href: '/catalog', icon: Library },
    { label: 'Upload', href: '/upload', icon: UploadCloud },
    { label: 'Analytics', href: '/analytics', icon: BarChart2 },
    { label: 'Transparency', href: '/transparency', icon: FileText },
]

export function Sidebar() {
    const pathname = usePathname()
    const { user } = useUser()

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 h-screen fixed top-0 left-0 bg-background border-r overflow-y-auto">
                <div className="p-6">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold">
                            MF
                        </div>
                        <span className="text-xl font-bold">MusicForge</span>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                                    isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-muted"
                                )}
                            >
                                <Icon size={20} />
                                <span>{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t mt-auto">
                    {user && (
                        <div className="flex items-center gap-3 mb-4">
                            <Avatar>
                                <AvatarImage src={user.imageUrl} />
                                <AvatarFallback>{user.firstName?.charAt(0) || 'U'}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-medium truncate">{user.fullName}</p>
                                <p className="text-xs text-muted-foreground truncate">{user.primaryEmailAddress?.emailAddress}</p>
                            </div>
                        </div>
                    )}
                    <Link
                        href="/settings"
                        className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-md mb-2 transition-colors",
                            pathname === '/settings' ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                        )}
                    >
                        <Settings size={20} />
                        <span>Settings</span>
                    </Link>
                    <SignOutButton>
                        <button className="flex items-center gap-3 px-3 py-2 rounded-md w-full text-left text-muted-foreground hover:bg-muted transition-colors">
                            <LogOut size={20} />
                            <span>Sign Out</span>
                        </button>
                    </SignOutButton>
                </div>
            </aside>

            {/* Mobile Bottom Nav */}
            <div className="md:hidden fixed bottom-0 left-0 w-full bg-background border-t flex items-center justify-around p-3 z-50 pb-safe">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center gap-1 p-2 rounded-md",
                                isActive ? "text-primary" : "text-muted-foreground"
                            )}
                        >
                            <Icon size={24} />
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </Link>
                    )
                })}
            </div>
        </>
    )
}
