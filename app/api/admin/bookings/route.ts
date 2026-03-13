import { NextResponse } from "next/server"
import { getAdminSession } from "@/lib/auth"
import { bookingStore } from "@/lib/bookings"

// GET /api/admin/bookings - Get all bookings
export async function GET() {
  try {
    const session = await getAdminSession()
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const bookings = bookingStore.getAll()

    return NextResponse.json({
      success: true,
      bookings,
      total: bookings.length,
    })
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    )
  }
}
