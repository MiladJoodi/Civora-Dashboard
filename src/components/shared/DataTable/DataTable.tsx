"use client"

import { useState, useMemo } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DataTablePagination } from "./DataTablePagination"
import { DataTableSearch } from "./DataTableSearch"
import { EmptyState } from "@/components/shared/EmptyState"
import { toPersianNumber } from "@/lib/ToPersianNumber"
import { cn } from "@/lib/utils"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface Column<T> {
  key: string
  header: string
  sortable?: boolean
  className?: string
  render?: (item: T, index: number) => React.ReactNode
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  searchable?: boolean
  searchPlaceholder?: string
  searchKeys?: string[]
  pageSize?: number
  emptyIcon?: LucideIcon
  emptyTitle?: string
  emptyDescription?: string
  onRowClick?: (item: T) => void
  headerActions?: React.ReactNode
  className?: string
}

type SortDirection = "asc" | "desc" | null

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  searchable = true,
  searchPlaceholder = "جستجو...",
  searchKeys = [],
  pageSize = 10,
  emptyIcon,
  emptyTitle,
  emptyDescription,
  onRowClick,
  headerActions,
  className,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)

  // Filter data by search
  const filteredData = useMemo(() => {
    if (!search.trim()) return data

    const term = search.toLowerCase()
    const keys = searchKeys.length > 0 ? searchKeys : columns.map((c) => c.key)

    return data.filter((item) =>
      keys.some((key) => {
        const value = item[key]
        if (value == null) return false
        return String(value).toLowerCase().includes(term)
      })
    )
  }, [data, search, searchKeys])

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortKey || !sortDirection) return filteredData

    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]

      if (aVal == null && bVal == null) return 0
      if (aVal == null) return 1
      if (bVal == null) return -1

      const comparison = String(aVal).localeCompare(String(bVal), "fa")
      return sortDirection === "asc" ? comparison : -comparison
    })
  }, [filteredData, sortKey, sortDirection])

  // Paginate
  const totalPages = Math.ceil(sortedData.length / pageSize)
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  // Reset page on search/sort change
  const handleSearch = (value: string) => {
    setSearch(value)
    setCurrentPage(1)
  }

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDirection === "asc") setSortDirection("desc")
      else if (sortDirection === "desc") {
        setSortKey(null)
        setSortDirection(null)
      }
    } else {
      setSortKey(key)
      setSortDirection("asc")
    }
    setCurrentPage(1)
  }

  const SortIcon = ({ columnKey }: { columnKey: string }) => {
    if (sortKey !== columnKey) return <ArrowUpDown className="h-3.5 w-3.5 text-gray-400" />
    if (sortDirection === "asc") return <ArrowUp className="h-3.5 w-3.5 text-orange-500" />
    return <ArrowDown className="h-3.5 w-3.5 text-orange-500" />
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header: Search + Actions */}
      {(searchable || headerActions) && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {searchable && (
            <DataTableSearch
              value={search}
              onChange={handleSearch}
              placeholder={searchPlaceholder}
            />
          )}
          {headerActions && (
            <div className="flex items-center gap-2 shrink-0">
              {headerActions}
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/80">
                {columns.map((col) => (
                  <TableHead
                    key={col.key}
                    className={cn(
                      "text-right whitespace-nowrap",
                      col.sortable && "cursor-pointer select-none hover:bg-gray-100 transition-colors",
                      col.className
                    )}
                    onClick={col.sortable ? () => handleSort(col.key) : undefined}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{col.header}</span>
                      {col.sortable && <SortIcon columnKey={col.key} />}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-48">
                    <EmptyState
                      icon={emptyIcon}
                      title={emptyTitle}
                      description={emptyDescription}
                    />
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((item, index) => (
                  <TableRow
                    key={String(item["id"] ?? index)}
                    className={cn(
                      "transition-colors",
                      onRowClick && "cursor-pointer hover:bg-orange-50/50"
                    )}
                    onClick={onRowClick ? () => onRowClick(item) : undefined}
                  >
                    {columns.map((col) => (
                      <TableCell key={col.key} className={cn("text-sm", col.className)}>
                        {col.render
                          ? col.render(item, (currentPage - 1) * pageSize + index)
                          : toPersianNumber(item[col.key] as string | number)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <DataTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={sortedData.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  )
}
