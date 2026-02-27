# Civora Dashboard

A comprehensive construction project management SaaS dashboard with a fully RTL Persian UI, 37 routes, interactive charts, team management CRUD, and skeleton loading states.

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)](https://www.typescriptlang.org/)

---

## About

Civora is a full-featured admin dashboard built for construction teams. It includes fake authentication, contracts management, warehouse inventory, daily operations, technical office documents, reporting with comparison charts, team chat, news, and complete user settings with CRUD. All pages feature Persian (Farsi) text, Jalali dates, Persian numerals, and right-to-left layout.

## Key Features

- **Dashboard** — Interactive charts (revenue/expenses, project status pie), KPI cards with trends, activity feed, transaction table
- **Contracts** — Active, pending, and completed contract lists with search, sorting, pagination, and detail dialogs
- **Warehouse** — Inventory management, order tracking, supplier directory
- **Operations** — Daily operations log and maintenance task tracking
- **Technical Office** — Project management, document library, quality inspections
- **Reports** — Daily, weekly, and monthly reports with comparison bar/area charts
- **Team Chat** — Channel-based messaging and direct messages
- **News** — Company and industry news with card grid layout
- **Settings** — Profile editing, system preferences, full team member CRUD (create, edit, delete with form validation)
- **AI Assistant** — AI chat interface and help desk ticketing system
- **Authentication** — Role-based login, route protection via Next.js Proxy

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| [Next.js](https://nextjs.org/) | 16 | React framework with App Router |
| [React](https://react.dev/) | 19 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Utility-first styling |
| [Radix UI](https://www.radix-ui.com/) | — | Headless primitives (Dialog, Select, Switch, Tabs, Tooltip, ...) |
| [Recharts](https://recharts.org/) | 3 | Interactive charts (Area, Bar, Pie) |
| [Lucide React](https://lucide.dev/) | — | Icons |
| [Sonner](https://sonner.emilkowal.ski/) | 2 | Toast notifications |
| [CVA](https://cva.style/) | — | Component variant management |

## Project Structure

```
src/
├── app/                        # Pages (App Router)
│   ├── layout.tsx              # Root layout (font, auth, toast)
│   ├── page.tsx                # Main dashboard
│   ├── login/                  # Login page
│   ├── contracts/              # Contracts (active, pending, completed)
│   ├── warehouse/              # Warehouse (inventory, orders, suppliers)
│   ├── operations/             # Operations (daily, maintenance)
│   ├── technical-office/       # Technical office (projects, docs, quality)
│   ├── reports/                # Reports (daily, weekly, monthly)
│   ├── team-chat/              # Team chat (channels, direct)
│   ├── news/                   # News (company, industry)
│   ├── settings/               # Settings (profile, system, permissions)
│   ├── assistant/              # Assistant (ai-chat, help-desk)
│   └── projects/[id]/          # Project detail
│
├── components/
│   ├── ui/                     # Base UI components (Button, Dialog, Table, ...)
│   ├── shared/                 # Shared components
│   │   ├── DataTable/          # Generic data table with search, sort, pagination
│   │   ├── Sidebar/            # Navigation sidebar
│   │   ├── GlobalHeader/       # Top header bar
│   │   ├── Skeletons/          # Page loading skeletons (6 variants)
│   │   ├── PageHeader/         # Standard page header
│   │   ├── StatsGrid/          # Statistics grid
│   │   ├── StatusBadge.tsx     # Colored status badge
│   │   ├── ConfirmDialog.tsx   # Danger action confirmation dialog
│   │   └── EmptyState.tsx      # Empty state with icon and message
│   ├── Dashboard/              # Dashboard components (charts, activity feed)
│   ├── Contracts/              # Contract management components
│   ├── Warehouse/              # Warehouse components
│   ├── Operations/             # Operations components
│   ├── TechnicalOffice/        # Technical office components
│   ├── Reports/                # Reporting components
│   ├── TeamChat/               # Chat components
│   ├── News/                   # News components
│   ├── Settings/               # Settings & user CRUD components
│   └── Login/                  # Authentication components
│
├── data/mock/                  # Mock data
│   ├── users.ts                # 150+ team members
│   ├── transactions.ts         # 200+ financial records
│   ├── contracts.ts            # 40+ contracts
│   ├── warehouse.ts            # Inventory, orders, suppliers
│   ├── operations.ts           # Daily operations & maintenance
│   ├── technical.ts            # Projects, documents, inspections
│   ├── reports.ts              # Daily reports
│   ├── revenue.ts              # Revenue/expense data (12 months)
│   ├── chat.ts                 # Channels, contacts, messages
│   ├── news.ts                 # 24 news articles
│   ├── activity-log.ts         # Activity log entries
│   └── kpi.ts                  # KPI metrics
│
├── store/
│   └── auth-store.tsx          # Auth context provider
│
├── lib/
│   ├── utils.ts                # cn() and general utilities
│   ├── ToPersianNumber.ts      # Number to Persian converter
│   ├── constants.ts            # Status labels, color maps
│   └── mock-helpers.ts         # Mock data helper functions
│
└── proxy.ts                    # Route protection (auth check)
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or higher
- [npm](https://www.npmjs.com/), [pnpm](https://pnpm.io/), or [yarn](https://yarnpkg.com/)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/civora-dashboard.git
cd civora-dashboard

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The dev server runs at [http://localhost:3000](http://localhost:3000).

## Usage

### Authentication

The login page (`/login`) includes 4 preset demo users with different roles. Any email/password combination is accepted:

| Name | Role | Email |
|------|------|-------|
| Ali Mohammadi | Project Manager | ali@civora.com |
| Sara Ahmadi | Civil Engineer | sara@civora.com |
| Reza Karimi | Site Supervisor | reza@civora.com |
| Maryam Hosseini | Accountant | maryam@civora.com |

### Design Patterns

- **Hub pages** — Each section has a landing page with stats overview and quick links to sub-pages
- **List pages** — Use the shared `DataTable` component with search, column sorting, and pagination
- **CRUD** — User management in Settings includes create, edit, and delete with form dialogs and validation
- **Loading skeletons** — All pages have `loading.tsx` files with shimmer animation matching their layout type

### Shared Components

| Component | Purpose |
|-----------|---------|
| `DataTable<T>` | Generic table with search, column sorting, pagination, row click, header actions |
| `PageHeader` | Standard page header with title, description, and icon |
| `StatsGrid` | Statistics cards grid for hub pages |
| `StatusBadge` | Colored badge mapping status strings to labels |
| `ConfirmDialog` | Confirmation dialog for destructive actions |
| `EmptyState` | Empty state placeholder with icon and message |

### Skeleton Variants

| Skeleton | Used By |
|----------|---------|
| `DashboardSkeleton` | Main dashboard |
| `HubSkeleton` | Section hub pages (contracts, warehouse, operations, ...) |
| `TableSkeleton` | List/table pages |
| `ChatSkeleton` | Chat and messaging pages |
| `FormSkeleton` | Settings and form pages |
| `CardGridSkeleton` | News and card-based pages |

## Technical Conventions

- **RTL** — Full right-to-left layout with `dir="rtl"` and CSS logical properties (`ps-`, `pe-`, `start-`, `end-`)
- **Persian numerals** — All numbers pass through `toPersianNumber()` utility
- **Jalali dates** — Dates displayed in Solar Hijri (Jalali) calendar format
- **Theme** — Orange/amber accent color throughout
- **Font** — [Vazirmatn](https://github.com/rastikerdar/vazirmatn) loaded via `next/font/google`
- **Data** — Mock data is immutable in files, mutable in components via `useState`
- **Auth** — React Context + localStorage + Cookie + Next.js Proxy

## Routes (37 total)

```
/                           Main dashboard
/login                      Login page
/contracts                  Contracts hub
/contracts/active           Active contracts
/contracts/pending          Pending contracts
/contracts/completed        Completed contracts
/warehouse                  Warehouse hub
/warehouse/inventory        Inventory management
/warehouse/orders           Orders tracking
/warehouse/suppliers        Supplier directory
/operations                 Operations hub
/operations/daily           Daily operations
/operations/maintenance     Maintenance tasks
/technical-office           Technical office hub
/technical-office/projects  Project management
/technical-office/docs      Technical documents
/technical-office/quality   Quality inspections
/reports                    Reports hub
/reports/daily              Daily reports
/reports/weekly             Weekly reports with charts
/reports/monthly            Monthly KPIs and overview
/team-chat                  Team chat hub
/team-chat/channels         Channel messaging
/team-chat/direct           Direct messages
/news                       News hub
/news/company               Company news
/news/industry              Industry news
/settings                   Settings hub
/settings/profile           Profile editing
/settings/system            System preferences
/settings/permissions       User management & permissions
/assistant                  Assistant hub
/assistant/ai-chat          AI chat
/assistant/help-desk        Help desk ticketing
/projects/[id]              Project detail
```

## License

MIT

---

Built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/)
