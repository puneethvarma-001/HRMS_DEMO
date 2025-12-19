# HRMS Architecture Documentation

## System Architecture

### Overview

The HRMS frontend is built as a **Turborepo monorepo** with multiple applications and shared packages, following a **domain-driven design** pattern with **policy-first RBAC** at its core.

## Monorepo Structure

```
hrms-demo/
├── apps/                        # Applications
│   ├── hrms-admin/             # Admin portal (Next.js 14+)
│   ├── hrms-employee/          # Employee self-service
│   ├── hrms-outsourcing/       # Outsourcing user portal
│   └── ai-console/             # AI insights dashboard
│
├── packages/                    # Shared packages
│   ├── design-system/          # Design tokens + components
│   ├── rbac-engine/            # Policy-based RBAC
│   ├── api-client/             # HTTP client
│   ├── ai-sdk/                 # AI integration
│   ├── feature-flags/          # Feature management
│   └── utils/                  # Shared utilities
│
├── turbo.json                  # Turborepo configuration
├── package.json                # Root package.json
└── tsconfig.json               # Base TypeScript config
```

## Package Details

### @hrms/rbac-engine

**Purpose**: Policy-based RBAC with ABAC support

**Key Features**:
- Policy-based permission evaluation
- Attribute-Based Access Control (ABAC)
- Outsourcing user time-bound access
- Context-aware condition evaluation
- Zero role-only checks

**Core Classes**:
- `RBACEngine`: Main permission evaluation engine
- `Policy`: Permission policy definition
- `UserContext`: User session with attributes

**Usage**:
```typescript
import { rbacEngine, Resources, Actions } from '@hrms/rbac-engine';

const hasPermission = rbacEngine.hasPermission(userContext, {
  resource: Resources.EMPLOYEE,
  action: Actions.UPDATE,
  conditions: { department: 'engineering' }
});
```

### @hrms/design-system

**Purpose**: Shared UI components and design tokens

**Structure**:
- `tokens/`: Design tokens (colors, spacing, typography, etc.)
- `theme/`: MUI theme configuration
- `components/`: Atomic design components
  - `atoms/`: Basic components (Button, Input)
  - `molecules/`: Composed components
  - `organisms/`: Complex components
  - `layouts/`: Page layouts

**Features**:
- Dark mode by default
- Tenant-specific theming
- Density modes (compact, comfortable)
- Permission-aware components

**Usage**:
```typescript
import { ThemeProvider, Button } from '@hrms/design-system';

<ThemeProvider defaultConfig={{ mode: 'dark' }}>
  <Button variant="contained">Click me</Button>
</ThemeProvider>
```

### @hrms/api-client

**Purpose**: Permission-aware HTTP client

**Features**:
- Automatic JWT token handling
- 401/403 error handling
- Type-safe API calls
- Request/response interceptors

**Usage**:
```typescript
import { createApiClient } from '@hrms/api-client';

const client = createApiClient({
  baseUrl: 'https://api.hrms.example.com',
  getToken: async () => getAccessToken(),
  onUnauthorized: () => redirectToLogin(),
});

const employees = await client.get('/employees');
```

### @hrms/ai-sdk

**Purpose**: AI integration with RBAC enforcement

**Features**:
- RBAC-aware AI queries
- Streaming responses
- Audit logging
- Explainable AI

**Usage**:
```typescript
import { createAIClient } from '@hrms/ai-sdk';

const aiClient = createAIClient('https://api.hrms.example.com');

const response = await aiClient.query({
  query: 'Show me payroll anomalies',
  userId: 'user-123',
  tenantId: 'tenant-123',
  permissions: ['payroll:read', 'analytics:read']
});
```

### @hrms/feature-flags

**Purpose**: Feature flag management

**Features**:
- Global feature toggles
- Tenant-specific features
- Gradual rollout support

**Usage**:
```typescript
import { featureFlagManager } from '@hrms/feature-flags';

if (featureFlagManager.isEnabled('AI_COPILOT', tenantId)) {
  // Show AI features
}
```

### @hrms/utils

**Purpose**: Shared utility functions

**Modules**:
- `date`: Date formatting and manipulation
- `masking`: Sensitive data masking
- `validation`: Input validation
- `helpers`: Common utilities

**Usage**:
```typescript
import { maskSensitive, formatDate } from '@hrms/utils';

const maskedSSN = maskSensitive('123-45-6789', 4); // *****6789
const formattedDate = formatDate(new Date()); // 12/19/2025
```

## Application Architecture

### Next.js App Structure

Each Next.js app follows this structure:

```
apps/hrms-admin/
├── src/
│   ├── app/                    # App Router
│   │   ├── (auth)/            # Auth route group
│   │   │   └── login/
│   │   ├── (admin)/           # Admin route group
│   │   │   └── dashboard/
│   │   ├── (employee)/        # Employee route group
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Landing page
│   │   └── providers.tsx      # Client providers
│   │
│   ├── lib/                   # Utilities
│   │   └── auth/             # Auth utilities
│   │
│   └── middleware.ts          # Auth middleware
│
├── next.config.js
├── package.json
└── tsconfig.json
```

### Route Groups

Route groups organize routes without affecting URL structure:

1. **(auth)**: Public authentication pages
   - `/login`, `/signup`, `/forgot-password`

2. **(admin)**: Admin-only pages
   - `/dashboard`, `/employees`, `/settings`

3. **(employee)**: Employee self-service pages
   - `/profile`, `/leaves`, `/payslips`

4. **(outsourcing)**: Outsourcing user pages
   - Limited access based on contract

5. **(ai)**: AI console and insights
   - `/ai/analytics`, `/ai/chat`

## RBAC Implementation

### Policy Structure

```typescript
interface Policy {
  id: string;
  name: string;
  effect: 'allow' | 'deny';
  resource: string;           // e.g., 'employee', 'payroll'
  actions: string[];          // e.g., ['read', 'update']
  conditions?: {              // Optional ABAC conditions
    roles?: string[];
    tenantId?: string;
    allowOutsourcing?: boolean;
  };
  priority: number;           // Higher = evaluated first
}
```

### Permission Evaluation Flow

1. User makes a request
2. Middleware validates session
3. Get user context (roles, tenant, attributes)
4. RBAC engine evaluates applicable policies
5. Policies sorted by priority
6. First matching policy determines access
7. Default deny if no match

### Outsourcing User Handling

Outsourcing users have special restrictions:

```typescript
const policy = {
  id: 'outsourcing-deny-payroll',
  effect: 'deny',
  resource: Resources.PAYROLL,
  actions: ['*'],
  conditions: { allowOutsourcing: false },
  priority: 90  // High priority to override allows
};
```

Time-bound access:
```typescript
if (context.isOutsourcing && context.contractEndDate) {
  const contractEnd = new Date(context.contractEndDate);
  if (contractEnd < new Date()) {
    return false; // Contract expired
  }
}
```

## Design System Architecture

### Token-Based Theming

Design tokens are the single source of truth:

```typescript
const tokens = {
  colors: { primary, secondary, neutral, semantic },
  spacing: { 0, 1, 2, 3, 4, ... },
  typography: { fontFamily, fontSize, fontWeight },
  radius: { none, sm, base, md, lg },
  motion: { duration, easing },
  shadows: { none, sm, base, md, lg },
};
```

### Theme Creation

Themes are generated from tokens:

```typescript
const theme = createAppTheme({
  mode: 'dark',
  density: 'comfortable',
  tenantColors: {
    primary: '#2196f3',
    secondary: '#9c27b0'
  }
});
```

### Component Hierarchy

1. **Atoms**: Button, Input, Checkbox
2. **Molecules**: FormField, SearchBar
3. **Organisms**: DataTable, NavigationBar
4. **Layouts**: DashboardLayout, AuthLayout
5. **Patterns**: AI Copilot, Permission Guards

## State Management

### Server State (TanStack Query)

For API data:
```typescript
const { data, isLoading } = useQuery({
  queryKey: ['employees'],
  queryFn: () => apiClient.get('/employees'),
});
```

### Client State (Zustand)

For UI state:
```typescript
const useUIStore = create((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ 
    sidebarOpen: !state.sidebarOpen 
  })),
}));
```

### Form State (React Hook Form + Zod)

For forms:
```typescript
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const { register, handleSubmit } = useForm({
  resolver: zodResolver(schema),
});
```

## Performance Optimization

### Code Splitting

- Route-level splitting via Next.js App Router
- Component-level splitting with `dynamic()`
- Package splitting in Turborepo

### Virtualization

For large datasets:
```typescript
import { useVirtualizer } from '@tanstack/react-virtual';

const virtualizer = useVirtualizer({
  count: 100000,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 50,
});
```

### Server Components

Use Server Components for:
- Static content
- Data fetching
- SEO-critical pages

Use Client Components for:
- Interactivity
- Browser APIs
- State management

## Security Architecture

### Authentication Flow

1. User enters credentials
2. API validates and returns JWT + refresh token
3. Tokens stored in httpOnly cookies
4. Middleware validates on each request
5. Expired tokens auto-refreshed

### CSP Headers

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
```

### Data Masking

Sensitive fields are masked:
```typescript
import { maskSensitive } from '@hrms/utils';

const maskedSSN = maskSensitive(employee.ssn, 4);
// Output: *****6789
```

## AI Integration

### AI Request Flow

1. User query in UI
2. Check user permissions
3. Send query with permission context
4. AI respects RBAC
5. Log interaction for audit
6. Return explainable response

### AI Audit Trail

```typescript
{
  id: 'audit-123',
  userId: 'user-123',
  query: 'Show payroll anomalies',
  response: 'Found 3 anomalies...',
  permissionsChecked: ['payroll:read'],
  wasAllowed: true,
  timestamp: '2025-12-19T21:00:00Z'
}
```

## Build & Deploy

### Development

```bash
npm install
npm run dev
```

### Building

```bash
npm run build
```

Turborepo builds packages in dependency order.

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

## Module Structure

Each HR module follows this pattern:

```
modules/
├── employee-lifecycle/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── types.ts
│   └── index.ts
```

## Best Practices

### DO ✅

- Use TypeScript strict mode
- Follow RBAC for all permissions
- Use design tokens for styling
- Write composable components
- Document complex logic
- Use Server Components where possible
- Mask sensitive data
- Log AI interactions

### DON'T ❌

- Use role-only checks
- Hardcode colors/spacing
- Create monolithic components
- Bypass RBAC
- Store secrets in code
- Use client components unnecessarily
- Expose sensitive data

## Testing Strategy

### Unit Tests
- Test RBAC policy evaluation
- Test utility functions
- Test component logic

### Integration Tests
- Test API integration
- Test auth flow
- Test RBAC middleware

### E2E Tests
- Test critical user flows
- Test permission boundaries
- Test outsourcing restrictions

## Monitoring

### Metrics to Track

- Permission denials
- Admin overrides
- AI query patterns
- Outsourcing actions
- Performance metrics
- Error rates

### Tools

- **Sentry**: Error tracking
- **Datadog**: Performance monitoring
- Custom audit logs for RBAC and AI

## Future Enhancements

1. **GraphQL Integration**: Replace REST with GraphQL
2. **Real-time Updates**: WebSocket for live data
3. **Offline Support**: PWA capabilities
4. **Mobile Apps**: React Native integration
5. **Advanced AI**: More AI features
6. **Multi-language**: i18n support

---

This architecture is designed for scale, security, and maintainability.
