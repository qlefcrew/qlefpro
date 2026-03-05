import { Sidebar } from '@/components/dashboard/Sidebar'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { userId } = await auth()
    if (!userId) redirect('/sign-in')

    return (
        <div className="min-h-screen bg-background">
            <Sidebar />
            <main className="md:ml-[260px] min-h-screen">
                <div className="p-5 pb-24 md:pb-8 md:p-8 max-w-5xl animate-fade-in">
                    {children}
                </div>
            </main>
        </div>
    )
}
