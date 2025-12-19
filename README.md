# Enterprise HRMS Frontend

A modern, enterprise-grade HRMS (Human Resource Management System) frontend built with the most trending tech stack of 2025. Designed to scale to 100,000+ users with deep RBAC, multi-tenant administration, outsourcing onboarding, and AI-first UX.

## 🏗️ Architecture Overview

### Monorepo Structure

This project uses **Turborepo** for efficient monorepo management with the following structure:

```
hrms-demo/
├── apps/
│   ├── hrms-admin/         # Admin portal application
│   ├── hrms-employee/      # Employee self-service portal
│   ├── hrms-outsourcing/   # Outsourcing user portal
│   └── ai-console/         # AI insights and analytics
├── packages/
│   ├── design-system/      # Shared UI components and design tokens
│   ├── rbac-engine/        # Policy-based RBAC with ABAC support
│   ├── api-client/         # Permission-aware API client
│   ├── ai-sdk/             # AI integration utilities
│   ├── feature-flags/      # Feature flag management
│   └── utils/              # Shared utilities
└── turbo.json
```

## 🚀 Tech Stack

### Core Framework
- **Next.js 14+** with App Router, Server Components, and Partial Prerendering
- **TypeScript 5.7+** with strict mode and exactOptionalPropertyTypes enabled
- **Turborepo** for monorepo orchestration

### UI & Styling
- **MUI v6** as the base component library
- **Radix UI** for headless accessible components
- **CSS Variables** + MUI sx props + Tailwind utilities
- **Design Tokens** for theming and consistency

### State Management
- **TanStack Query v5** for server state management
- **Zustand** for client state (with selectors and persist)
- **React Hook Form** + **Zod** for form management and validation
- **TanStack Table v8** with virtualization for large datasets

### Authentication & Security
- **JWT + Refresh Token** flow
- **httpOnly cookies** for secure token storage
- **Server-validated sessions** with middleware guards
- **CSP enforcement** and field-level data masking

### AI Integration
- **Streaming AI via Server Actions**
- **Edge functions** for background processing
- **AI Copilot side panel** pattern
- **RBAC-aware AI** features with audit logging

## 🔐 RBAC System

### Policy-Based RBAC with ABAC

Our RBAC system implements a sophisticated policy-based model with Attribute-Based Access Control support:

#### Core Principles
1. **No role-only checks** - All authorization must be permission-based
2. **Policy-first architecture** - Permissions defined as reusable policies
3. **Context-aware** - Permissions can consider user attributes, tenant, time, etc.
4. **Zero UI flash** - Authorization enforced at middleware level

#### Permission Structure
```typescript
{
  resource: "employee",           // Resource type
  action: "update",               // Action to perform
  conditions: {                   // Optional context-aware rules
    tenantId: "tenant-123",
    department: "engineering"
  }
}
```

#### Usage Example
```typescript
import { usePermission } from '@hrms/rbac-engine';

function EmployeeEditButton() {
  const canEdit = usePermission({
    resource: 'employee',
    action: 'update'
  });

  if (!canEdit) return null;

  return <Button>Edit Employee</Button>;
}
```

### Outsourcing Model

Special handling for non-employee external users:

- **Contract-based permissions** - Time-bound access
- **Restricted resources** - No payroll visibility, read-only org data
- **Limited AI insights** - Basic features only
- **Full audit trail** - All actions logged

## 🎨 Design System

### Design Tokens

Six core token categories:
1. **Colors** - Brand, semantic, and theme colors
2. **Spacing** - 8px grid system
3. **Typography** - Font families, sizes, weights
4. **Radius** - Border radius values
5. **Motion** - Animation durations and easings
6. **Shadows** - Elevation system

### Component Layers (Atomic Design)

1. **Atoms** - Basic building blocks (Button, Input, etc.)
2. **Molecules** - Simple combinations (FormField, SearchBar)
3. **Organisms** - Complex components (DataTable, NavigationBar)
4. **Layouts** - Page layouts and templates
5. **Patterns** - Reusable patterns (AI Copilot, Permission Guards)

### Theming Features

- **Tenant-specific color overrides**
- **Dark mode by default**
- **Density modes** (compact, comfortable)
- **CSS variables** for runtime theme switching

## 📦 Key Modules

### Core HR Modules
1. **Employee Lifecycle** - Onboarding, profile, offboarding
2. **Attendance & Leave** - Time tracking, leave management
3. **Payroll** - Salary, payslips, tax management
4. **Performance** - Reviews, goals, feedback
5. **Recruitment** - Job postings, candidates, interviews
6. **Documents** - Document management and e-signatures
7. **Compliance** - Audit logs, policies
8. **Assets** - IT asset management
9. **IT Requests** - Access requests and provisioning

## 🤖 AI-First UX

### Core AI Patterns

- **Context-aware AI Copilot** embedded across screens
- **Natural language HR queries**
- **Payroll anomaly detection**
- **Resume and candidate scoring**
- **Performance summaries**
- **Risk and compliance insights**

### AI Constraints

- ✅ AI must respect RBAC permissions
- ✅ All AI actions are auditable
- ✅ AI responses must be explainable

## ⚡ Performance

### Optimization Strategies

- **Route-level code splitting** for optimal bundle sizes
- **Virtualized tables** handling 100k+ rows
- **Server Components** for read-heavy views
- **Edge caching** for global performance
- **Web workers** for heavy computation

### Performance Targets

- **Users**: 100,000+ concurrent users
- **Tables**: 100k+ rows with smooth scrolling
- **TTI**: < 2 seconds on 3G
- **FCP**: < 1 second

## 🛡️ Security

### Frontend Security Measures

- **CSP enforcement** via headers
- **Permission-aware API client**
- **Field-level masking** for sensitive data (SSN, bank accounts)
- **Secure document previews**
- **XSS protection** via React and input sanitization
- **CSRF tokens** for state-changing operations

## 📊 Observability

### Tracked Events

- Permission denials
- Admin overrides
- AI decisions and recommendations
- Outsourcing user actions
- Performance metrics

### Tools Integration

- **Sentry** - Error tracking and monitoring
- **Datadog** - Performance and user analytics

## 🚦 Getting Started

### Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0

### Installation

```bash
# Install dependencies
npm install

# Run all apps in development mode
npm run dev

# Build all apps
npm run build

# Type checking
npm run type-check

# Format code
npm run format
```

### Individual App Commands

```bash
# Run specific app
cd apps/hrms-admin
npm run dev

# Build specific app
npm run build

# Start production server
npm run start
```

## 📁 Package Documentation

### @hrms/rbac-engine

Policy-based RBAC engine with:
- Permission checking hooks
- Policy management
- ABAC condition evaluation
- Outsourcing user support

### @hrms/design-system

Complete design system with:
- Design tokens (colors, spacing, typography, etc.)
- Atomic components (Button, Input, etc.)
- Theme provider with tenant customization
- Dark mode support

### @hrms/api-client

Permission-aware HTTP client:
- Automatic JWT token handling
- Permission denial handling
- Type-safe API calls

### @hrms/utils

Shared utilities:
- Date formatting
- Data masking
- Validation helpers
- Common functions

## 🏛️ Architecture Principles

### Domain-Driven Design

- **Modular structure** - Each module is self-contained
- **Clear boundaries** - Well-defined interfaces between modules
- **Shared kernel** - Common utilities in shared packages

### Code Quality Standards

✅ **DO:**
- Use TypeScript strict mode
- Follow permission-based authorization
- Use design tokens for styling
- Write composable, reusable components
- Document complex logic

❌ **DON'T:**
- Use role-only authorization checks
- Hardcode colors or spacing
- Create monolithic components
- Bypass RBAC system
- Store sensitive data in localStorage

## 🗺️ Routing Strategy

### Route Groups

```
apps/hrms-admin/src/app/
├── (auth)/          # Authentication pages
├── (admin)/         # Admin-only pages
├── (employee)/      # Employee pages
├── (outsourcing)/   # Outsourcing user pages
└── (ai)/            # AI console pages
```

### Middleware Guards

- Session validation
- Permission checks
- Zero UI flash for unauthorized access
- Redirect to appropriate pages

## 📝 Development Guidelines

### Component Development

1. Start with design tokens
2. Build permission-aware from the start
3. Support dark mode
4. Make it responsive
5. Add proper TypeScript types

### Adding New Features

1. Define permissions in RBAC engine
2. Create/update API client methods
3. Build UI components
4. Add server actions if needed
5. Update documentation

## 🤝 Contributing

This is an enterprise-grade system. All contributions must:

1. Follow TypeScript strict mode
2. Use the RBAC system correctly
3. Match existing code style
4. Include proper documentation
5. Pass all type checks and lints

## 📄 License

Proprietary - All rights reserved

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [MUI Documentation](https://mui.com/material-ui/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Turborepo](https://turbo.build/repo)

---

**Built with ❤️ for modern enterprise HR management**
