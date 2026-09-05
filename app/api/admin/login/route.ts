import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  // Compare with admin password from env
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (password === adminPassword) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json(
    { error: 'Invalid password' },
    { status: 401 }
  );
}
