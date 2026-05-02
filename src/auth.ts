import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // This is a mock authentication for demonstration.
        // In a real app, you would verify against a database.
        const mockUser = { id: "1", name: "Demo User", email: "demo@example.com" }
        
        if (credentials?.email === "demo@example.com" && credentials?.password === "password") {
          return mockUser
        }
        
        return null
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      // Only protect the dashboard/news if needed, but here we want to allow the Landing page at '/'
      // Actually, if we want '/' to show DIFFERENT content based on auth, we shouldn't block '/' here.
      
      return true // Let the page component handle the conditional rendering
    },
  },
})
