import type { Role } from "@/store/auth-store"

export interface DemoUser {
  id: string
  name: string
  email: string
  role: Role
  avatar: string
}

export const demoUsers: DemoUser[] = [
  { id: "1", name: "میلاد جودی", email: "milad@civora.ir", role: "admin" as const, avatar: "م" },
  { id: "2", name: "سارا احمدی", email: "sara@civora.ir", role: "manager" as const, avatar: "س" },
  { id: "3", name: "علی رضایی", email: "ali@civora.ir", role: "engineer" as const, avatar: "ع" },
  { id: "4", name: "مریم حسینی", email: "maryam@civora.ir", role: "viewer" as const, avatar: "م" },
]

export const roleLabels: Record<string, string> = {
  admin: "مدیر سیستم",
  manager: "مدیر پروژه",
  engineer: "مهندس",
  viewer: "ناظر",
}
