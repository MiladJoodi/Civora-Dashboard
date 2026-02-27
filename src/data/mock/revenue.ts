export interface MonthlyRevenue {
  month: string
  revenue: number
  expense: number
  profit: number
}

export const monthlyRevenue: MonthlyRevenue[] = [
  {
    month: "فروردین",
    revenue: 62_000_000_000,
    expense: 48_000_000_000,
    profit: 14_000_000_000,
  },
  {
    month: "اردیبهشت",
    revenue: 78_000_000_000,
    expense: 65_000_000_000,
    profit: 13_000_000_000,
  },
  {
    month: "خرداد",
    revenue: 95_000_000_000,
    expense: 82_000_000_000,
    profit: 13_000_000_000,
  },
  {
    month: "تیر",
    revenue: 110_000_000_000,
    expense: 98_000_000_000,
    profit: 12_000_000_000,
  },
  {
    month: "مرداد",
    revenue: 88_000_000_000,
    expense: 72_000_000_000,
    profit: 16_000_000_000,
  },
  {
    month: "شهریور",
    revenue: 125_000_000_000,
    expense: 105_000_000_000,
    profit: 20_000_000_000,
  },
  {
    month: "مهر",
    revenue: 142_000_000_000,
    expense: 118_000_000_000,
    profit: 24_000_000_000,
  },
  {
    month: "آبان",
    revenue: 130_000_000_000,
    expense: 112_000_000_000,
    profit: 18_000_000_000,
  },
  {
    month: "آذر",
    revenue: 98_000_000_000,
    expense: 85_000_000_000,
    profit: 13_000_000_000,
  },
  {
    month: "دی",
    revenue: 75_000_000_000,
    expense: 68_000_000_000,
    profit: 7_000_000_000,
  },
  {
    month: "بهمن",
    revenue: 85_000_000_000,
    expense: 74_000_000_000,
    profit: 11_000_000_000,
  },
  {
    month: "اسفند",
    revenue: 105_000_000_000,
    expense: 92_000_000_000,
    profit: 13_000_000_000,
  },
]

export const totalRevenue = monthlyRevenue.reduce((sum, m) => sum + m.revenue, 0)
export const totalExpense = monthlyRevenue.reduce((sum, m) => sum + m.expense, 0)
export const totalProfit = monthlyRevenue.reduce((sum, m) => sum + m.profit, 0)
