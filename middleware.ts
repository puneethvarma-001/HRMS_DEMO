import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"
import { parseRBACConfig, hasPermission } from "@/lib/rbac"
import type { Role } from "@/types/auth"

// Parse RBAC config from environment
const rbacConfig = parseRBACConfig(process.env.RBAC_CONFIG || process.env.NEXT_PUBLIC_RBAC_CONFIG)

// Define route permission requirements
const routePermissions: Record<string, { roles?: Role[]; permissions?: string[] }> = {
  "/admin": { roles: ["AMP"] },
  "/hr": { roles: ["AMP", "HR"] },
  "/employees": { permissions: ["employees.read"] },
  "/leave": { permissions: ["leave.apply", "leave.read"] },
  "/attendance": { permissions: ["attendance.mark", "attendance.view"] },
  "/payroll": { permissions: ["payroll.view", "payslip.view"] },
  "/onboard": { permissions: ["onboard.view"] },
  "/policies": { permissions: ["policies.view"] },
  "/holidays": { permissions: ["holidays.read"] },
}

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname
    const userRole = token?.role as Role | undefined
    const userRoles = (token?.roles as Role[]) || (userRole ? [userRole] : [])

    // Check route permissions
    for (const [route, requirements] of Object.entries(routePermissions)) {
      if (path.startsWith(route)) {
        // Check role-based access
        if (requirements.roles) {
          const hasRequiredRole = requirements.roles.some(role => 
            userRoles.includes(role) || userRole === role
          )
          if (!hasRequiredRole) {
            return NextResponse.redirect(new URL("/dashboard", req.url))
          }
        }

        // Check permission-based access
        if (requirements.permissions) {
          const hasRequiredPermission = requirements.permissions.some(permission =>
            hasPermission(rbacConfig, userRoles, permission)
          )
          if (!hasRequiredPermission && !hasPermission(rbacConfig, userRoles, "*")) {
            return NextResponse.redirect(new URL("/dashboard", req.url))
          }
        }

        break
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
)

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login).*)"],
}
