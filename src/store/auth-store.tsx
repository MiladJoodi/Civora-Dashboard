"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react"
import { useRouter } from "next/navigation"

// ─── Types ───────────────────────────────────────────────────
export type Role = "admin" | "manager" | "engineer" | "viewer"

export interface User {
  id: string
  name: string
  email: string
  role: Role
  avatar: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
}

// ─── Constants ───────────────────────────────────────────────
const STORAGE_KEY = "civora-auth"
const COOKIE_NAME = "civora-auth-token"

// ─── Context ─────────────────────────────────────────────────
const AuthContext = createContext<AuthState | undefined>(undefined)

// ─── Provider ────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed: User = JSON.parse(stored)
        setUser(parsed)
        setIsAuthenticated(true)
      }
    } catch {
      // Corrupted data — clear it
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  const login = useCallback(
    (newUser: User) => {
      // Persist to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser))

      // Set auth cookie so middleware can read it
      document.cookie = `${COOKIE_NAME}=true; path=/`

      // Update state
      setUser(newUser)
      setIsAuthenticated(true)
    },
    []
  )

  const logout = useCallback(() => {
    // Clear localStorage
    localStorage.removeItem(STORAGE_KEY)

    // Clear cookie by expiring it
    document.cookie = `${COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`

    // Update state
    setUser(null)
    setIsAuthenticated(false)

    // Redirect to login
    router.push("/login")
  }, [router])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// ─── Hook ────────────────────────────────────────────────────
export function useAuth(): AuthState {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth باید درون AuthProvider استفاده شود")
  }
  return context
}
