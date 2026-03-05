import { SignUp } from '@clerk/nextjs'

export const metadata = {
    title: 'Sign Up',
    description: 'Create your qlefPro account and start distributing your music.',
}

export default function SignUpPage() {
    return (
        <div className="relative flex min-h-screen items-center justify-center p-5">
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-background" />
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/[0.06] rounded-full blur-[120px]" />
            </div>
            <div className="animate-scale-in w-full flex justify-center">
                <SignUp />
            </div>
        </div>
    )
}
