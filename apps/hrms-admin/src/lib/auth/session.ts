/**
 * Authentication utilities for session management
 * Uses JWT + Refresh Token with httpOnly cookies
 */

export interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
  tenantId: string;
  isOutsourcing: boolean;
  contractEndDate?: string;
}

export interface Session {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

/**
 * Decode JWT token (basic implementation)
 * In production, use a proper JWT library
 */
export function decodeToken(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = parts[1];
    if (!payload) return null;

    const decoded = Buffer.from(payload, 'base64').toString('utf-8');
    return JSON.parse(decoded) as Record<string, unknown>;
  } catch {
    return null;
  }
}

/**
 * Check if token is expired
 */
export function isTokenExpired(token: string): boolean {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;

  const exp = decoded.exp as number;
  return Date.now() >= exp * 1000;
}

/**
 * Get session from cookies (server-side)
 */
export function getServerSession(cookies: {
  get: (name: string) => { value: string } | undefined;
}): Session | null {
  const accessToken = cookies.get('accessToken')?.value;
  const refreshToken = cookies.get('refreshToken')?.value;

  if (!accessToken || !refreshToken) {
    return null;
  }

  // Check if access token is expired
  if (isTokenExpired(accessToken)) {
    // In production, attempt to refresh the token
    return null;
  }

  const decoded = decodeToken(accessToken);
  if (!decoded) return null;

  const user: User = {
    id: decoded.userId as string,
    email: decoded.email as string,
    name: decoded.name as string,
    roles: (decoded.roles as string[]) || [],
    tenantId: decoded.tenantId as string,
    isOutsourcing: decoded.isOutsourcing as boolean || false,
    contractEndDate: decoded.contractEndDate as string | undefined,
  };

  return {
    user,
    accessToken,
    refreshToken,
    expiresAt: (decoded.exp as number) * 1000,
  };
}

/**
 * Mock login function (for demo purposes)
 */
export async function login(email: string, password: string): Promise<Session> {
  // In production, this would call an API
  // For demo, return a mock session
  const mockUser: User = {
    id: 'user-123',
    email,
    name: 'Demo User',
    roles: ['admin'],
    tenantId: 'tenant-123',
    isOutsourcing: false,
  };

  const mockToken = 'mock-jwt-token';
  const expiresAt = Date.now() + 3600 * 1000; // 1 hour

  return {
    user: mockUser,
    accessToken: mockToken,
    refreshToken: 'mock-refresh-token',
    expiresAt,
  };
}

/**
 * Logout function
 */
export async function logout(): Promise<void> {
  // In production, would call API to invalidate tokens
  // Clear cookies on client side
  if (typeof window !== 'undefined') {
    document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
}
