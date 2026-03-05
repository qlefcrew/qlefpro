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
            <aside className="hidden md:flex flex-col w-[260px] h-screen fixed top-0 left-0 bg-card/60 backdrop-blur-2xl border-r border-white/[0.06] overflow-y-auto z-40">
                {/* Logo */}
                <div className="px-5 py-5 border-b border-white/[0.06]">
                    <Link href="/dashboard" className="flex items-center gap-2.5" id="sidebar-logo">
                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                            <span className="text-black font-extrabold text-sm tracking-tighter">Q</span>
                        </div>
                        <span className="text-[16px] font-semibold tracking-tight">
                            qlef<span className="font-bold">Pro</span>
                        </span>
                    </Link>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-4 space-y-0.5">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                id={`sidebar-${item.label.toLowerCase()}`}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-200",
                                    isActive
                                        ? "bg-white/[0.08] text-white"
                                        : "text-white/40 hover:text-white/70 hover:bg-white/[0.04] active:bg-white/[0.06]"
                                )}
                            >
                                <Icon size={18} className={cn(isActive ? "text-white" : "text-white/40")} />
                                <span>{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>

                {/* User */}
                <div className="p-3 border-t border-white/[0.06] mt-auto space-y-0.5">
                    {user && (
                        <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/[0.03] mb-2">
                            <Avatar className="w-8 h-8 ring-1 ring-white/10">
                                <AvatarImage src={user.imageUrl} />
                                <AvatarFallback className="bg-white/10 text-white/70 text-xs font-medium">
                                    {user.firstName?.charAt(0) || 'U'}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-[13px] font-medium truncate">{user.fullName}</p>
                                <p className="text-[11px] text-white/30 truncate">{user.primaryEmailAddress?.emailAddress}</p>
                            </div>
                        </div>
                    )}
                    <Link
                        href="/settings"
                        id="sidebar-settings"
                        className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all duration-200",
                            pathname === '/settings'
                                ? "bg-white/[0.08] text-white"
                                : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
                        )}
                    >
                        <Settings size={18} />
                        <span>Settings</span>
                    </Link>
                    <SignOutButton>
                        <button
                            id="sidebar-signout"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-left text-[14px] font-medium text-white/40 hover:text-red-400 hover:bg-red-500/[0.06] transition-all duration-200 active:bg-red-500/[0.1]"
                        >
                            <LogOut size={18} />
                            <span>Sign Out</span>
                        </button>
                    </SignOutButton>
                </div>
            </aside>

            {/* Mobile Bottom Nav */}
            <div className="md:hidden fixed bottom-0 left-0 w-full bg-card/80 backdrop-blur-2xl border-t border-white/[0.06] flex items-center justify-around px-1 pt-2 pb-safe z-50">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            id={`mobile-nav-${item.label.toLowerCase()}`}
                            className={cn(
                                "flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl min-w-[52px] transition-all duration-200 active:scale-90",
                                isActive
                                    ? "text-white"
                                    : "text-white/30"
                            )}
                        >
                            <Icon size={22} strokeWidth={isActive ? 2.2 : 1.5} />
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </Link>
                    )
                })}
            </div>
        </>
    )
}
