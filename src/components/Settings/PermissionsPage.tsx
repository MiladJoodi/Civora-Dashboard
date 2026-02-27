"use client"

import { useState, useMemo } from "react"
import PageHeader from "@/components/shared/PageHeader/PageHeader"
import { StatsGrid } from "@/components/shared/StatsGrid/StatsGrid"
import { DataTable, Column } from "@/components/shared/DataTable/DataTable"
import { StatusBadge } from "@/components/shared/StatusBadge"
import { ConfirmDialog } from "@/components/shared/ConfirmDialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { teamMembers, TeamMember } from "@/data/mock/users"
import { roleLabels, departmentLabels } from "@/lib/constants"
import { toPersianNumber } from "@/lib/ToPersianNumber"
import { Shield, Users, UserCheck, UserX, Plus, Filter } from "lucide-react"
import { CreateMemberDialog } from "./CreateMemberDialog"
import { EditMemberDialog } from "./EditMemberDialog"

export function PermissionsPage() {
  const [members, setMembers] = useState<TeamMember[]>(() => [...teamMembers])
  const [createOpen, setCreateOpen] = useState(false)
  const [editMember, setEditMember] = useState<TeamMember | null>(null)
  const [deleteMember, setDeleteMember] = useState<TeamMember | null>(null)
  const [filterRole, setFilterRole] = useState<string>("all")
  const [filterDept, setFilterDept] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const filteredMembers = useMemo(() => {
    let result = members
    if (filterRole !== "all") result = result.filter((m) => m.role === filterRole)
    if (filterDept !== "all") result = result.filter((m) => m.department === filterDept)
    if (filterStatus !== "all") result = result.filter((m) => m.status === filterStatus)
    return result
  }, [members, filterRole, filterDept, filterStatus])

  const activeCount = members.filter((m) => m.status === "active").length
  const onLeaveCount = members.filter((m) => m.status === "on-leave").length
  const inactiveCount = members.filter((m) => m.status === "inactive").length

  const stats = [
    { title: "کل اعضا", value: members.length, icon: Users, color: "text-blue-500" },
    { title: "فعال", value: activeCount, icon: UserCheck, color: "text-green-500" },
    { title: "مرخصی", value: onLeaveCount, icon: Users, color: "text-yellow-500" },
    { title: "غیرفعال", value: inactiveCount, icon: UserX, color: "text-red-500" },
  ]

  const uniqueRoles = useMemo(() => [...new Set(members.map((m) => m.role))], [members])
  const uniqueDepts = useMemo(() => [...new Set(members.map((m) => m.department))], [members])

  function handleCreate(member: TeamMember) {
    setMembers((prev) => [member, ...prev])
  }

  function handleEdit(updated: TeamMember) {
    setMembers((prev) => prev.map((m) => (m.id === updated.id ? updated : m)))
    setEditMember(null)
  }

  function handleDelete() {
    if (!deleteMember) return
    setMembers((prev) => prev.filter((m) => m.id !== deleteMember.id))
    setDeleteMember(null)
  }

  const columns: Column<TeamMember>[] = [
    {
      key: "avatar",
      header: "",
      className: "w-12",
      render: (item) => (
        <div className="h-9 w-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 text-sm font-bold">
          {item.avatar}
        </div>
      ),
    },
    {
      key: "name",
      header: "نام",
      sortable: true,
      render: (item) => (
        <div>
          <p className="font-medium text-gray-900 text-sm">{item.name}</p>
          <p className="text-xs text-gray-500 mt-0.5" dir="ltr">{item.email}</p>
        </div>
      ),
    },
    {
      key: "role",
      header: "نقش",
      sortable: true,
      render: (item) => (
        <Badge variant="outline" className="text-xs">
          {item.role}
        </Badge>
      ),
    },
    {
      key: "department",
      header: "بخش",
      sortable: true,
      render: (item) => (
        <span className="text-sm text-gray-700">{item.department}</span>
      ),
    },
    {
      key: "phone",
      header: "تلفن",
      render: (item) => (
        <span className="text-sm text-gray-600" dir="ltr">{item.phone}</span>
      ),
    },
    {
      key: "joinDate",
      header: "تاریخ عضویت",
      sortable: true,
      render: (item) => (
        <span className="text-sm text-gray-600">{toPersianNumber(item.joinDate)}</span>
      ),
    },
    {
      key: "status",
      header: "وضعیت",
      sortable: true,
      render: (item) => <StatusBadge status={item.status} />,
    },
    {
      key: "actions",
      header: "عملیات",
      className: "w-36",
      render: (item) => (
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            onClick={() => setEditMember(item)}
          >
            ویرایش
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => setDeleteMember(item)}
          >
            حذف
          </Button>
        </div>
      ),
    },
  ]

  const filterActions = (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-1.5">
        <Filter className="h-4 w-4 text-gray-400 hidden sm:block" />
        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger className="h-9 w-32 text-xs">
            <SelectValue placeholder="نقش" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه نقش‌ها</SelectItem>
            {uniqueRoles.map((role) => (
              <SelectItem key={role} value={role}>{role}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Select value={filterDept} onValueChange={setFilterDept}>
        <SelectTrigger className="h-9 w-28 text-xs">
          <SelectValue placeholder="بخش" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">همه بخش‌ها</SelectItem>
          {uniqueDepts.map((dept) => (
            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filterStatus} onValueChange={setFilterStatus}>
        <SelectTrigger className="h-9 w-28 text-xs">
          <SelectValue placeholder="وضعیت" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">همه</SelectItem>
          <SelectItem value="active">فعال</SelectItem>
          <SelectItem value="on-leave">مرخصی</SelectItem>
          <SelectItem value="inactive">غیرفعال</SelectItem>
        </SelectContent>
      </Select>

      <Button
        onClick={() => setCreateOpen(true)}
        className="h-9 bg-orange-500 hover:bg-orange-600 text-white text-xs"
      >
        <Plus className="ml-1 h-4 w-4" />
        عضو جدید
      </Button>
    </div>
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="مدیریت کاربران و مجوزها"
        description="افزودن، ویرایش و حذف اعضای تیم و تنظیم سطح دسترسی"
        Icon={Shield}
      />

      <StatsGrid stats={stats} />

      <DataTable<TeamMember>
        data={filteredMembers}
        columns={columns}
        searchable
        searchPlaceholder="جستجوی نام، ایمیل یا نقش..."
        searchKeys={["name", "email", "role", "department"]}
        pageSize={12}
        emptyTitle="عضوی یافت نشد"
        emptyDescription="با تغییر فیلترها یا عبارت جستجو دوباره تلاش کنید"
        emptyIcon={Users}
        headerActions={filterActions}
      />

      <CreateMemberDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreated={handleCreate}
      />

      {editMember && (
        <EditMemberDialog
          open={!!editMember}
          onOpenChange={(open) => !open && setEditMember(null)}
          member={editMember}
          onSaved={handleEdit}
        />
      )}

      <ConfirmDialog
        open={!!deleteMember}
        onOpenChange={(open) => !open && setDeleteMember(null)}
        title="حذف عضو تیم"
        description={`آیا از حذف "${deleteMember?.name}" اطمینان دارید؟ این عملیات قابل بازگشت نیست.`}
        confirmLabel="حذف"
        onConfirm={handleDelete}
        variant="danger"
      />
    </div>
  )
}
