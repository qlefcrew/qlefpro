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
            <main className="flex-1 md:ml-64 pb-20 md:pb-0 overflow-y-auto">
                <div className="container mx-auto p-4 md:p-8 max-w-6xl">
                    {children}
                </div>
            </main>
        </div>
    )
}
