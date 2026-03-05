'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignOutButton, useUser } from '@clerk/nextjs'
import { LayoutDashboard, Library, UploadCloud, BarChart2, FileText, Settings, LogOut, Disc3 } from 'lucide-react'
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
            <aside className="hidden md:flex flex-col w-64 h-screen fixed top-0 left-0 bg-card/80 backdrop-blur-xl border-r border-white/5 overflow-y-auto z-40">
                {/* Logo */}
                <div className="p-6 border-b border-white/5">
                    <Link href="/dashboard" className="flex items-center gap-3 group" id="sidebar-logo">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-violet-600/20 group-hover:shadow-violet-600/40 transition-shadow">
                            <Disc3 className="w-5 h-5" />
                        </div>
                        <span className="text-lg font-bold tracking-tight">
                            Music<span className="text-violet-400">Forge</span>
                        </span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-4 space-y-1">
                    <p className="px-3 mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                        Menu
                    </p>
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                id={`sidebar-${item.label.toLowerCase()}`}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                                    isActive
                                        ? "bg-gradient-to-r from-violet-600/20 to-indigo-600/10 text-violet-300 shadow-sm"
                                        : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
                                )}
                            >
                                <Icon size={18} className={cn(isActive && "text-violet-400")} />
                                <span>{item.label}</span>
                                {isActive && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                                )}
                            </Link>
                        )
                    })}
                </nav>

                {/* User Section */}
                <div className="p-3 border-t border-white/5 mt-auto space-y-1">
                    {user && (
                        <div className="flex items-center gap-3 px-3 py-3 rounded-xl glass mb-2">
                            <Avatar className="w-8 h-8 ring-2 ring-violet-500/20">
                                <AvatarImage src={user.imageUrl} />
                                <AvatarFallback className="bg-violet-600/20 text-violet-300 text-xs">
                                    {user.firstName?.charAt(0) || 'U'}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-medium truncate">{user.fullName}</p>
                                <p className="text-[11px] text-muted-foreground truncate">{user.primaryEmailAddress?.emailAddress}</p>
                            </div>
                        </div>
                    )}
                    <Link
                        href="/settings"
                        id="sidebar-settings"
                        className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                            pathname === '/settings'
                                ? "bg-gradient-to-r from-violet-600/20 to-indigo-600/10 text-violet-300"
                                : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
                        )}
                    >
                        <Settings size={18} />
                        <span>Settings</span>
                    </Link>
                    <SignOutButton>
                        <button
                            id="sidebar-signout"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-left text-sm font-medium text-muted-foreground hover:text-red-400 hover:bg-red-500/[0.06] transition-all duration-200"
                        >
                            <LogOut size={18} />
                            <span>Sign Out</span>
                        </button>
                    </SignOutButton>
                </div>
            </aside>

            {/* Mobile Bottom Nav */}
            <div className="md:hidden fixed bottom-0 left-0 w-full bg-card/90 backdrop-blur-xl border-t border-white/5 flex items-center justify-around p-2 z-50 pb-safe">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            id={`mobile-nav-${item.label.toLowerCase()}`}
                            className={cn(
                                "flex flex-col items-center gap-1 p-2 rounded-xl min-w-[56px] transition-all duration-200",
                                isActive
                                    ? "text-violet-400 bg-violet-500/10"
                                    : "text-muted-foreground"
                            )}
                        >
                            <Icon size={20} />
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </Link>
                    )
                })}
            </div>
        </>
    )
}
