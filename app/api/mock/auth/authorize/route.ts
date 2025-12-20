import { NextRequest, NextResponse } from 'next/server';

/**
 * Mock OAuth2 Authorize Endpoint
 * 
 * GET /api/mock/auth/authorize
 * 
 * In dummy mode, this simulates the OAuth2 authorization flow by
 * redirecting to the callback URL with a demo authorization code.
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const redirectUri = searchParams.get('redirect_uri') || '/api/auth/callback';
  const state = searchParams.get('state') || '';
  const responseType = searchParams.get('response_type') || 'code';
  const clientId = searchParams.get('client_id');
  const scope = searchParams.get('scope') || 'openid profile email';

  // Validate required parameters
  if (responseType !== 'code') {
    return NextResponse.json(
      { error: 'unsupported_response_type', message: 'Only code response type is supported' },
      { status: 400 }
    );
  }

  // In demo mode, generate a demo authorization code
  // The code includes a default demo user email for the token exchange
  const demoCode = `demo:employee@demo.com:${Date.now()}`;

  // Construct the redirect URL with the authorization code
  const callbackUrl = new URL(redirectUri, request.nextUrl.origin);
  callbackUrl.searchParams.set('code', demoCode);
  if (state) {
    callbackUrl.searchParams.set('state', state);
  }

  return NextResponse.redirect(callbackUrl);
}

/**
 * POST /api/mock/auth/authorize
 * 
 * Alternative method for authorization - returns JSON response with code
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Generate authorization code for the specified user
    const demoCode = `demo:${email || 'employee@demo.com'}:${Date.now()}`;

    return NextResponse.json({
      code: demoCode,
      expires_in: 300, // 5 minutes
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'server_error', message: 'Failed to generate authorization code' },
      { status: 500 }
    );
  }
}
