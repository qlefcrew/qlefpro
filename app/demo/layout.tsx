import { DemoSidebar } from '@/components/demo/DemoSidebar'

export default function DemoLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-background">
            <DemoSidebar />
            <main className="md:ml-[260px] min-h-screen">
                <div className="p-5 pb-24 md:pb-8 md:p-8 max-w-5xl animate-fade-in">
                    {children}
                </div>
            </main>
        </div>
    )
}
