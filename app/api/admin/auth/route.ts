import { NextResponse } from "next/server"
import { verifyAdmin, createToken, setAdminCookie, clearAdminCookie, getAdminSession } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    const isValid = await verifyAdmin(email, password)

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    const token = await createToken(email)
    await setAdminCookie(token)

    return NextResponse.json({
      success: true,
      message: "Login successful",
    })
  } catch {
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const session = await getAdminSession()

    if (!session) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      )
    }

    return NextResponse.json({
      authenticated: true,
      email: session.email,
      role: session.role,
    })
  } catch {
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    )
  }
}

export async function DELETE() {
  try {
    await clearAdminCookie()
    return NextResponse.json({
      success: true,
      message: "Logged out successfully",
    })
  } catch {
    return NextResponse.json(
      { error: "Logout failed" },
      { status: 500 }
    )
  }
}
