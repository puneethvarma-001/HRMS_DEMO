# HRMS Implementation Guide

## Quick Start

### Prerequisites

Ensure you have the following installed:
- Node.js >= 20.0.0
- npm >= 10.0.0

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/puneethvarma-001/HRMS_DEMO.git
cd HRMS_DEMO
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development servers**
```bash
# Run all apps
npm run dev

# Or run specific app
cd apps/hrms-admin
npm run dev
```

4. **Access the applications**
- Admin Portal: http://localhost:3001
- Employee Portal: http://localhost:3002 (when created)
- Outsourcing Portal: http://localhost:3003 (when created)
- AI Console: http://localhost:3004 (when created)

## Project Structure Explained

### Apps vs Packages

**Apps** are deployable applications:
- `hrms-admin`: Admin portal for HR teams
- `hrms-employee`: Self-service portal for employees
- `hrms-outsourcing`: Portal for external contractors
- `ai-console`: AI analytics and insights

**Packages** are shared libraries:
- `design-system`: UI components and theming
- `rbac-engine`: Permission management
- `api-client`: API communication
- `ai-sdk`: AI integration
- `feature-flags`: Feature management
- `utils`: Utility functions

### How They Work Together

1. Apps import packages via workspace dependencies
2. Turborepo builds packages before apps
3. Shared code stays DRY across all apps

## Core Concepts

### 1. RBAC (Role-Based Access Control)

Every feature must check permissions:

```typescript
import { usePermission } from '@hrms/rbac-engine';
import { Resources, Actions } from '@hrms/rbac-engine';

function EditEmployeeButton() {
  const canEdit = usePermission({
    resource: Resources.EMPLOYEE,
    action: Actions.UPDATE,
  });

  if (!canEdit) return null;

  return <Button>Edit</Button>;
}
```

**Key Rules**:
- ❌ Never check roles directly
- ✅ Always check permissions
- ✅ Use policy-based authorization
- ✅ Include conditions when needed

### 2. Design Tokens

Never hardcode styles:

```typescript
// ❌ Bad
<Box sx={{ padding: '16px', color: '#2196f3' }}>

// ✅ Good
import { tokens } from '@hrms/design-system';
<Box sx={{ p: 4, color: 'primary.main' }}>
```

### 3. State Management

Choose the right tool:

**Server State** (API data):
```typescript
import { useQuery } from '@tanstack/react-query';

const { data, isLoading } = useQuery({
  queryKey: ['employees'],
  queryFn: fetchEmployees,
});
```

**Client State** (UI state):
```typescript
import { create } from 'zustand';

const useUIStore = create((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ 
    sidebarOpen: !state.sidebarOpen 
  })),
}));
```

**Form State**:
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const form = useForm({
  resolver: zodResolver(schema),
});
```

### 4. Data Masking

Protect sensitive information:

```typescript
import { maskSensitive, maskEmail } from '@hrms/utils';

const maskedSSN = maskSensitive(employee.ssn, 4); // *****6789
const maskedEmail = maskEmail(employee.email); // j****@example.com
```

## Building Features

### Step 1: Define Types

```typescript
// modules/my-module/types/index.ts
import { z } from 'zod';

export const MyDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  // ...
});

export type MyData = z.infer<typeof MyDataSchema>;
```

### Step 2: Create Service

```typescript
// modules/my-module/services/my.service.ts
import { createApiClient } from '@hrms/api-client';

export class MyService {
  constructor(private apiClient: ReturnType<typeof createApiClient>) {}

  async getData(): Promise<MyData[]> {
    return this.apiClient.get('/my-data');
  }

  async createData(data: MyData): Promise<MyData> {
    return this.apiClient.post('/my-data', data);
  }
}
```

### Step 3: Create Hooks

```typescript
// modules/my-module/hooks/useMyData.ts
import { useQuery } from '@tanstack/react-query';

export function useMyData(service: MyService) {
  return useQuery({
    queryKey: ['my-data'],
    queryFn: () => service.getData(),
  });
}
```

### Step 4: Build Components

```typescript
// modules/my-module/components/MyComponent.tsx
'use client';

import { useMyData } from '../hooks';

export function MyComponent({ service }: { service: MyService }) {
  const { data, isLoading } = useMyData(service);

  if (isLoading) return <div>Loading...</div>;

  return <div>{/* Render data */}</div>;
}
```

### Step 5: Create Page

```typescript
// app/(admin)/my-feature/page.tsx
'use client';

import { MyComponent } from '@/modules/my-module';

export default function MyFeaturePage() {
  return <MyComponent service={myService} />;
}
```

## Common Patterns

### Permission-Aware Components

```typescript
import { PermissionGuard } from '@hrms/design-system';
import { usePermission } from '@hrms/rbac-engine';

function MyComponent() {
  const canEdit = usePermission({
    resource: 'employee',
    action: 'update',
  });

  return (
    <PermissionGuard hasPermission={canEdit}>
      <Button>Edit</Button>
    </PermissionGuard>
  );
}
```

### Feature Flags

```typescript
import { featureFlagManager } from '@hrms/feature-flags';

function MyComponent() {
  const aiEnabled = featureFlagManager.isEnabled('AI_COPILOT', tenantId);

  return (
    <div>
      {aiEnabled && <AICopilot />}
    </div>
  );
}
```

### AI Integration

```typescript
import { createAIClient } from '@hrms/ai-sdk';

const aiClient = createAIClient('https://api.hrms.example.com');

async function queryAI() {
  const response = await aiClient.query({
    query: 'Analyze employee retention',
    userId: user.id,
    tenantId: user.tenantId,
    permissions: ['employee:read', 'analytics:read'],
  });

  console.log(response.content);
}
```

## Module Development

### Creating a New Module

1. **Create directory structure**
```bash
mkdir -p src/modules/my-module/{components,hooks,services,types}
```

2. **Define types**
```typescript
// types/index.ts
export * from './my-types';
```

3. **Create service**
```typescript
// services/my.service.ts
export class MyService { ... }
```

4. **Create hooks**
```typescript
// hooks/useMyFeature.ts
export function useMyFeature() { ... }
```

5. **Build components**
```typescript
// components/MyComponent.tsx
export function MyComponent() { ... }
```

6. **Export everything**
```typescript
// index.ts
export * from './types';
export * from './services';
export * from './hooks';
export * from './components';
```

## Testing

### Unit Tests

```typescript
import { describe, it, expect } from 'vitest';
import { rbacEngine } from '@hrms/rbac-engine';

describe('RBAC Engine', () => {
  it('should grant permission to admin', () => {
    const hasPermission = rbacEngine.hasPermission(adminContext, {
      resource: 'employee',
      action: 'update',
    });

    expect(hasPermission).toBe(true);
  });
});
```

### Integration Tests

Test API integration:
```typescript
import { EmployeeService } from './services';

describe('EmployeeService', () => {
  it('should fetch employees', async () => {
    const service = new EmployeeService(mockApiClient);
    const employees = await service.getEmployees();

    expect(employees).toHaveLength(10);
  });
});
```

## Deployment

### Building for Production

```bash
# Build all apps and packages
npm run build

# Build specific app
cd apps/hrms-admin
npm run build
```

### Environment Variables

Create `.env.local` files:

```env
# apps/hrms-admin/.env.local
NEXT_PUBLIC_API_URL=https://api.hrms.example.com
NEXT_PUBLIC_AI_URL=https://ai.hrms.example.com
```

### Running Production Build

```bash
cd apps/hrms-admin
npm run start
```

## Troubleshooting

### Common Issues

**1. Build Errors**

If you get TypeScript errors:
```bash
# Clean and rebuild
npm run clean
npm run build
```

**2. Package Not Found**

If a package isn't found:
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

**3. Port Already in Use**

Change the port:
```bash
# In package.json
"dev": "next dev -p 3005"
```

## Best Practices

### DO ✅

- Use TypeScript strict mode
- Check permissions for all actions
- Use design tokens for styling
- Mask sensitive data
- Log AI interactions
- Write composable components
- Document complex logic
- Use Server Components where possible

### DON'T ❌

- Check roles instead of permissions
- Hardcode colors or spacing
- Create monolithic components
- Bypass RBAC system
- Store secrets in code
- Use inline styles
- Ignore TypeScript errors

## Advanced Topics

### Tenant Customization

```typescript
import { ThemeProvider } from '@hrms/design-system';

<ThemeProvider
  defaultConfig={{
    mode: 'dark',
    density: 'comfortable',
    tenantColors: {
      primary: tenant.brandColor,
    }
  }}
>
  {children}
</ThemeProvider>
```

### Virtual Scrolling

For large datasets:
```typescript
import { useVirtualizer } from '@tanstack/react-virtual';

const virtualizer = useVirtualizer({
  count: 100000,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 50,
});
```

### Server Actions

```typescript
'use server';

import { requirePermission } from '@/lib/auth';

export async function updateEmployee(id: string, data: Partial<Employee>) {
  await requirePermission({
    resource: 'employee',
    action: 'update',
  });

  // Update logic
}
```

## Resources

- **Next.js Docs**: https://nextjs.org/docs
- **MUI Docs**: https://mui.com/material-ui/
- **TanStack Query**: https://tanstack.com/query/latest
- **Zod**: https://zod.dev
- **Turborepo**: https://turbo.build/repo

## Getting Help

1. Check the documentation
2. Review existing code examples
3. Ask in team chat
4. Create an issue on GitHub

## Contributing

1. Create a feature branch
2. Follow coding standards
3. Write tests
4. Update documentation
5. Submit pull request

---

**Happy coding! 🚀**
