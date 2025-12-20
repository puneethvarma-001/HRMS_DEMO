# HRMS Enterprise Demo

An enterprise-ready HRMS (Human Resource Management System) frontend scaffold built with Next.js, TypeScript, and Tailwind CSS. This demo application features environment-driven RBAC (Role-Based Access Control), dummy OAuth2 authentication, and mocked backend services.

## Features

### Core Features
* **Authentication:** Secure user authentication with Next-Auth (supports both dummy OAuth2 mode and MongoDB)
* **Environment-Driven RBAC:** Role and permission configuration via environment variables
* **Dashboard:** Role-specific overview of key statistics and information

### Modules
* **Employee Management:** Add, edit, and view employee profiles with role-based access
* **Department/Organization Management:** Create and manage departments and organizational structure
* **Attendance Tracking:** Mark and view employee attendance with geo-location support
* **Leave Management:** Request and approve/reject leave applications
* **Payroll System:** View payroll runs, payslips, and run verification checks
* **Onboarding & Exit:** Manage employee onboarding checklists and exit processes
* **Company Policies:** Policy documents with versioning and acknowledgements
* **Holidays Management:** Define organizational and regional holiday calendars
* **Internal Messaging:** Send and receive messages between employees
* **Audit Logs:** Track important actions performed within the system

### AI Integration Points (Mocked)
* **Resume Analyzer:** AI-powered candidate resume analysis
* **Call Screening:** Automated candidate screening analysis
* **Payroll Verification:** AI anomaly detection in payroll runs

## Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Database:** [MongoDB](https://www.mongodb.com/) (optional in dummy mode)
* **Authentication:** [Next-Auth](https://next-auth.js.org/) with dummy OAuth2 support
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/)
* **State Management:** [SWR](https://swr.vercel.app/)
* **Form Management:** [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/)

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/en/) (v18 or later)
* [pnpm](https://pnpm.io/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/puneethvarma-001/HRMS_DEMO.git
   cd HRMS_DEMO
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
   
   The demo runs in dummy mode by default with `OAUTH2_DUMMY_MODE=true`.

4. Run the development server:
   ```bash
   pnpm dev
   ```

   The application will be available at `http://localhost:3000`.

## Demo Credentials

When running in dummy mode (`OAUTH2_DUMMY_MODE=true`), use these credentials:

| Role | Email | Password |
|------|-------|----------|
| AMP (Admin) | admin@demo.com | admin123 |
| HR | hr@demo.com | hr123 |
| TA (Recruiter) | ta@demo.com | ta123 |
| Manager | manager@demo.com | manager123 |
| Employee | employee@demo.com | employee123 |

## RBAC Configuration

Roles and permissions are configured via the `RBAC_CONFIG` environment variable:

```json
{
  "AMP": ["*"],
  "HR": ["employees.*", "leave.*", "onboard.*", "policies.*", "payroll.review"],
  "TA": ["candidates.*", "resume.analyze", "screening.call"],
  "MANAGER": ["team.view", "team.approve", "leave.approve", "attendance.review"],
  "EMPLOYEE": ["self.view", "leave.apply", "attendance.mark", "payslip.view"]
}
```

### Permission Patterns
- `*` - Full access (wildcard)
- `module.*` - All permissions for a module
- `module.action` - Specific action permission

## Mock API Endpoints

All mock endpoints are available under `/api/mock/`:

### Authentication
- `POST /api/mock/auth/token` - Get authentication token
- `GET /api/mock/auth/authorize` - OAuth2 authorization

### Core Modules
- `GET /api/mock/employees/list` - List employees
- `GET /api/mock/employees/[id]` - Get employee by ID
- `GET /api/mock/leave/list` - List leave records
- `POST /api/mock/leave/apply` - Apply for leave
- `GET /api/mock/attendance/list` - List attendance
- `POST /api/mock/attendance/mark` - Mark attendance
- `GET /api/mock/organization/list` - Get organization structure
- `GET /api/mock/payroll/preview` - Preview payroll run
- `POST /api/mock/payroll/run` - Execute payroll run
- `GET /api/mock/onboard/list` - List onboarding tasks
- `GET /api/mock/policies/list` - List policies
- `GET /api/mock/holidays/list` - List holidays

### AI Endpoints
- `POST /api/mock/ai/resume-analyze` - Analyze candidate resume
- `POST /api/mock/ai/call-screen` - Screen candidate call
- `POST /api/mock/ai/payroll-verify` - Verify payroll for anomalies

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `OAUTH2_ENABLED` | Enable OAuth2 authentication | `true` |
| `OAUTH2_DUMMY_MODE` | Use dummy/mock authentication | `true` |
| `RBAC_CONFIG` | JSON string with role-permission mapping | See above |
| `NEXTAUTH_SECRET` | NextAuth secret key | Required |
| `NEXTAUTH_URL` | Application base URL | `http://localhost:3000` |
| `MONGODB_URI` | MongoDB connection string | Required if not in dummy mode |

## Scripts

* `pnpm dev` - Starts the development server
* `pnpm build` - Builds the application for production
* `pnpm start` - Starts the production server
* `pnpm lint` - Lints the codebase

## Migrating to Production

### Real Authentication
1. Set `OAUTH2_DUMMY_MODE=false`
2. Configure real OAuth2 provider settings
3. Set up MongoDB with `MONGODB_URI`

### Real Services
1. Update API client base URLs via environment variables
2. Replace mock endpoints with real microservice endpoints
3. Add contract tests between frontend DTOs and backend

## License

MIT
