'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Lock, User, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function DemoLoginPage() {
    const router = useRouter()
    const [username, setUsername] = useState('demo')
    const [password, setPassword] = useState('demo1')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (username === 'demo' && password === 'demo1') {
            setLoading(true)
            // Simulate network request
            setTimeout(() => {
                router.push('/demo')
            }, 1500)
        } else {
            setError('Invalid demo credentials. Use demo / demo1')
        }
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center p-5 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 -z-10 bg-background" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/[0.05] rounded-full blur-[100px] pointer-events-none" />

            {/* Login Card */}
            <div className="w-full max-w-[400px] animate-slide-up">
                <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl shadow-2xl relative overflow-hidden">
                    {/* Subtle top highlight */}
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                    <div className="text-center mb-8">
                        <Link href="/" className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white mb-6">
                            <span className="text-black font-extrabold text-xl tracking-tighter">Q</span>
                        </Link>
                        <h1 className="text-[24px] font-bold tracking-tight mb-2">Welcome Back</h1>
                        <p className="text-[14px] text-white/50">Enter your demo credentials to continue.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[13px] font-medium text-white/70 ml-1">Username</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <User className="w-4 h-4 text-white/40" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-white placeholder:text-white/20"
                                    placeholder="demo"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[13px] font-medium text-white/70 ml-1">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <Lock className="w-4 h-4 text-white/40" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-white placeholder:text-white/20"
                                    placeholder="demo1"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-[13px] text-red-400 text-center">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 mt-2 rounded-xl bg-white text-black font-semibold text-[14px] hover:bg-white/90 transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-[0_0_20px_-5px_rgba(255,255,255,0.2)] disabled:opacity-70 disabled:pointer-events-none"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Authenticating...
                                </>
                            ) : (
                                <>
                                    Sign In to Demo
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/[0.06] text-center">
                        <p className="text-[12px] text-white/40">
                            Demo Credentials:
                            <br />
                            Username: <span className="text-white/80 font-mono bg-white/5 px-1.5 py-0.5 rounded ml-1">demo</span> |
                            Password: <span className="text-white/80 font-mono bg-white/5 px-1.5 py-0.5 rounded ml-1">demo1</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
