import { SignIn } from '@clerk/nextjs'

export const metadata = {
    title: 'Sign In',
    description: 'Sign in to your MusicForge account.',
}

export default function SignInPage() {
    return (
        <div className="relative flex min-h-screen items-center justify-center p-4">
            {/* Background effects */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-background" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.12),transparent_60%)]" />
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-3xl" />
            </div>

            <div className="animate-scale-in">
                <SignIn />
            </div>
        </div>
    )
}
