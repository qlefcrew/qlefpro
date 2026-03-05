import { Sidebar } from '@/components/dashboard/Sidebar'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { userId } = await auth()

    if (!userId) {
        redirect('/sign-in')
    }

    return (
        <div className="flex min-h-screen bg-background text-foreground">
            <Sidebar />
            <main className="flex-1 md:ml-64 pb-24 md:pb-0 overflow-y-auto relative">
                {/* Subtle gradient at the top of the main content area */}
                <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-violet-600/[0.03] to-transparent pointer-events-none" />
                <div className="relative container mx-auto p-5 md:p-8 max-w-6xl animate-fade-in">
                    {children}
                </div>
            </main>
        </div>
    )
}
