import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectDB } from "./mongodb"
import { findUserByEmail } from "./mock-data"

// Check if running in dummy mode
const isDummyMode = process.env.OAUTH2_DUMMY_MODE === 'true'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required")
        }

        // In dummy mode, use mock data
        if (isDummyMode) {
          const mockUser = findUserByEmail(credentials.email)
          
          if (!mockUser || mockUser.password !== credentials.password) {
            throw new Error("Invalid credentials")
          }

          return {
            id: mockUser.id,
            email: mockUser.email,
            name: `${mockUser.firstName} ${mockUser.lastName}`,
            role: mockUser.role,
            roles: mockUser.roles,
            department: mockUser.orgUnitId,
          }
        }

        // Production mode - use MongoDB
        const db = await connectDB()
        if (!db) {
          throw new Error("Database connection failed")
        }

        // Dynamic import for User model only when needed
        const { User } = await import("./models/User")
        const user = await User.findOne({ email: credentials.email }).populate("department")

        if (!user) {
          throw new Error("Invalid credentials")
        }

        const isPasswordValid = await user.comparePassword(credentials.password)

        if (!isPasswordValid) {
          throw new Error("Invalid credentials")
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          department: user.department?._id?.toString(),
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.roles = (user as any).roles
        token.department = user.department
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.roles = token.roles as string[]
        session.user.department = token.department as string
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || 'dummy-secret-for-development',
}
