import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail } from '@/lib/mock-data';

/**
 * Mock OAuth2 Token Endpoint
 * 
 * POST /api/mock/auth/token
 * 
 * In dummy mode, this validates credentials against mock data and returns
 * a demo JWT-like token (not cryptographically signed in demo mode).
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, code, grant_type } = body;

    // Handle authorization code grant (OAuth2 flow)
    if (grant_type === 'authorization_code' && code) {
      // In demo mode, the code contains the email
      const [, userEmail] = code.split(':');
      const user = findUserByEmail(userEmail || email);
      
      if (!user) {
        return NextResponse.json(
          { error: 'invalid_grant', message: 'Invalid authorization code' },
          { status: 400 }
        );
      }

      return generateTokenResponse(user);
    }

    // Handle password grant (direct login)
    if (!email || !password) {
      return NextResponse.json(
        { error: 'invalid_request', message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = findUserByEmail(email);

    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: 'invalid_credentials', message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    return generateTokenResponse(user);
  } catch (error) {
    console.error('Token endpoint error:', error);
    return NextResponse.json(
      { error: 'server_error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}

function generateTokenResponse(user: {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  jobTitle: string;
  orgUnitId: string;
}) {
  const now = Math.floor(Date.now() / 1000);
  const expiresIn = 3600; // 1 hour

  // Create demo token payload (not cryptographically signed in demo mode)
  const tokenPayload = {
    iss: 'https://dummy-auth.local',
    sub: user.id,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    roles: user.roles,
    org: {
      id: 'org-demo-001',
      name: 'Demo Corp',
    },
    iat: now,
    exp: now + expiresIn,
    scopes: ['openid', 'profile', 'email'],
  };

  // Create a base64-encoded "token" (demo only - not secure for production)
  const accessToken = btoa(JSON.stringify(tokenPayload));
  const idToken = btoa(JSON.stringify({
    ...tokenPayload,
    aud: 'demo-client-id',
  }));

  return NextResponse.json({
    access_token: accessToken,
    id_token: idToken,
    token_type: 'Bearer',
    expires_in: expiresIn,
    user: tokenPayload,
  });
}
