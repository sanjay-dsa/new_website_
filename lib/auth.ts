import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-super-secret-key-change-in-production"
)

// Demo admin credentials (in production, store hashed passwords in database)
const ADMIN_CREDENTIALS = {
  email: "admin@aurum.com",
  password: "admin123", // In production, use bcrypt to hash passwords
}

export interface AdminPayload {
  email: string
  role: "admin"
  iat: number
  exp: number
}

export async function verifyAdmin(email: string, password: string): Promise<boolean> {
  return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password
}

export async function createToken(email: string): Promise<string> {
  const token = await new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(JWT_SECRET)
  
  return token
}

export async function verifyToken(token: string): Promise<AdminPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as unknown as AdminPayload
  } catch {
    return null
  }
}

export async function getAdminSession(): Promise<AdminPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("admin_token")?.value
  
  if (!token) return null
  
  return verifyToken(token)
}

export async function setAdminCookie(token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  })
}

export async function clearAdminCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete("admin_token")
}
