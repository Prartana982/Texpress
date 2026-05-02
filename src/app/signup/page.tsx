'use client'

import Link from 'next/link'

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create an account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Signup is currently simulated for the demo.
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md bg-blue-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Demo Information</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    For this demo, please use the following credentials on the login page:
                  </p>
                  <ul className="list-disc pl-5 mt-1">
                    <li>Email: <strong>demo@example.com</strong></li>
                    <li>Password: <strong>password</strong></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Link
              href="/login"
              className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-500"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
