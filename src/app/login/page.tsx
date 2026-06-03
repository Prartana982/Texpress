'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else {
        router.push('/')
        router.refresh()
      }
    } catch (err) {
      setError('An error occurred during login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-120px)] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="text-center">
          <div className="inline-block border-4 border-black bg-white px-6 py-2 shadow-neo -rotate-2 mb-6">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-black">
              Welcome Back
            </h2>
          </div>
          <p className="text-lg font-bold text-black/60 uppercase tracking-widest">
            Identity verification required.
          </p>
        </div>

        <div className="border-4 border-black bg-white p-8 shadow-neo-lg rotate-1">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-100 border-2 border-red-600 text-red-600 px-4 py-2 font-black uppercase text-xs animate-bounce">
                {error}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest mb-1 ml-1 opacity-50">Email Stream</label>
                <input
                  type="email"
                  required
                  className="block w-full border-4 border-black px-4 py-3 font-bold placeholder:text-black/20 focus:outline-none focus:bg-neo-green/10 transition-colors"
                  placeholder="name@nexus.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest mb-1 ml-1 opacity-50">Access Key</label>
                <input
                  type="password"
                  required
                  className="block w-full border-4 border-black px-4 py-3 font-bold placeholder:text-black/20 focus:outline-none focus:bg-neo-green/10 transition-colors"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full neo-button bg-black text-white text-lg py-4 hover:bg-neo-green hover:text-black transition-all disabled:opacity-50"
            >
              {loading ? 'INITIATING...' : 'ESTABLISH CONNECTION'}
            </button>
          </form>

          <div className="mt-6 text-center border-t-2 border-black/10 pt-6">
            <Link 
              href="/signup" 
              className="text-[10px] font-black uppercase tracking-widest hover:underline decoration-4 decoration-neo-green underline-offset-4"
            >
              New entity? Register your sequence
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
