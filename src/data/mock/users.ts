import {
  generateId,
  randomPersianName,
  randomItem,
  randomInt,
  randomJalaliDate,
  getInitials,
} from "@/lib/mock-helpers"

export interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  department: string
  status: "active" | "inactive" | "on-leave"
  joinDate: string
  avatar: string
  phone: string
}

const roles = [
  "مهندس عمران",
  "مهندس معمار",
  "سرکارگر",
  "اپراتور جرثقیل",
  "تکنسین برق",
  "جوشکار",
  "نقشه‌بردار",
  "حسابدار",
  "مسئول ایمنی",
  "مدیر پروژه",
  "ناظر",
  "کارگر ساده",
  "راننده",
  "انباردار",
  "مهندس مکانیک",
]

const departments = [
  "مهندسی",
  "عملیات",
  "انبار",
  "مالی",
  "ایمنی",
  "دفتر فنی",
  "مدیریت",
  "نگهداری",
]

const statuses: TeamMember["status"][] = ["active", "inactive", "on-leave"]

const emailDomains = [
  "civora.ir",
  "construction.ir",
  "project.ir",
]

function transliterate(name: string): string {
  const map: Record<string, string> = {
    "ا": "a", "آ": "a", "ب": "b", "پ": "p", "ت": "t", "ث": "s",
    "ج": "j", "چ": "ch", "ح": "h", "خ": "kh", "د": "d", "ذ": "z",
    "ر": "r", "ز": "z", "ژ": "zh", "س": "s", "ش": "sh", "ص": "s",
    "ض": "z", "ط": "t", "ظ": "z", "ع": "a", "غ": "gh", "ف": "f",
    "ق": "gh", "ک": "k", "گ": "g", "ل": "l", "م": "m", "ن": "n",
    "و": "v", "ه": "h", "ی": "i", "ي": "i", "ئ": "e", "ة": "h",
    " ": ".", "\u200c": "",
  }
  return name
    .split("")
    .map((c) => map[c] ?? "")
    .join("")
    .toLowerCase()
}

function generateEmail(name: string, index: number): string {
  const transliterated = transliterate(name)
  const domain = randomItem(emailDomains)
  return `${transliterated}${index}@${domain}`
}

function generatePhone(): string {
  const prefixes = ["0912", "0913", "0914", "0915", "0916", "0917", "0918", "0919", "0935", "0936", "0937", "0938", "0939", "0901", "0902", "0903"]
  const prefix = randomItem(prefixes)
  const rest = String(randomInt(1000000, 9999999))
  return `${prefix}${rest}`
}

function generateTeamMembers(count: number): TeamMember[] {
  const members: TeamMember[] = []
  for (let i = 0; i < count; i++) {
    const name = randomPersianName()
    const statusWeight = Math.random()
    let status: TeamMember["status"]
    if (statusWeight < 0.72) {
      status = "active"
    } else if (statusWeight < 0.88) {
      status = "inactive"
    } else {
      status = "on-leave"
    }

    members.push({
      id: generateId(),
      name,
      email: generateEmail(name, i),
      role: randomItem(roles),
      department: randomItem(departments),
      status,
      joinDate: randomJalaliDate(1401, 1403),
      avatar: getInitials(name),
      phone: generatePhone(),
    })
  }
  return members
}

export const teamMembers: TeamMember[] = generateTeamMembers(160)

export const teamMembersByDepartment = departments.reduce(
  (acc, dept) => {
    acc[dept] = teamMembers.filter((m) => m.department === dept)
    return acc
  },
  {} as Record<string, TeamMember[]>
)

export const activeMembers = teamMembers.filter((m) => m.status === "active")
export const inactiveMembers = teamMembers.filter((m) => m.status === "inactive")
export const onLeaveMembers = teamMembers.filter((m) => m.status === "on-leave")
