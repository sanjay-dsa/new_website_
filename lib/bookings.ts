// Booking model and in-memory store
// In production, replace with database (e.g., Supabase, PostgreSQL)

export interface Booking {
  id: string
  name: string
  email: string
  phone: string
  guests: number
  booking_date: string
  booking_time: string
  message?: string
  status: "pending" | "confirmed" | "cancelled"
  createdAt: string
  updatedAt: string
}

// In-memory store for demo purposes
// In production, use a proper database
class BookingStore {
  private bookings: Map<string, Booking> = new Map()

  constructor() {
    // Initialize with some demo data
    this.seedDemoData()
  }

  private seedDemoData() {
    const demoBookings: Booking[] = [
      {
        id: "bk_001",
        name: "John Smith",
        email: "john.smith@email.com",
        phone: "+1 (555) 123-4567",
        guests: 4,
        booking_date: new Date().toISOString().split("T")[0],
        booking_time: "19:00",
        message: "Anniversary dinner, please prepare a special dessert",
        status: "confirmed",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: "bk_002",
        name: "Emily Johnson",
        email: "emily.j@email.com",
        phone: "+1 (555) 987-6543",
        guests: 2,
        booking_date: new Date().toISOString().split("T")[0],
        booking_time: "20:30",
        message: "Window table if possible",
        status: "pending",
        createdAt: new Date(Date.now() - 43200000).toISOString(),
        updatedAt: new Date(Date.now() - 43200000).toISOString(),
      },
      {
        id: "bk_003",
        name: "Michael Brown",
        email: "m.brown@company.com",
        phone: "+1 (555) 456-7890",
        guests: 6,
        booking_date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
        booking_time: "18:30",
        message: "Business dinner, need private area",
        status: "confirmed",
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: "bk_004",
        name: "Sarah Williams",
        email: "sarah.w@email.com",
        phone: "+1 (555) 321-0987",
        guests: 3,
        booking_date: new Date(Date.now() + 172800000).toISOString().split("T")[0],
        booking_time: "19:30",
        message: "One guest has gluten allergy",
        status: "pending",
        createdAt: new Date(Date.now() - 7200000).toISOString(),
        updatedAt: new Date(Date.now() - 7200000).toISOString(),
      },
      {
        id: "bk_005",
        name: "David Lee",
        email: "david.lee@email.com",
        phone: "+1 (555) 654-3210",
        guests: 2,
        booking_date: new Date().toISOString().split("T")[0],
        booking_time: "21:00",
        message: "",
        status: "confirmed",
        createdAt: new Date(Date.now() - 259200000).toISOString(),
        updatedAt: new Date(Date.now() - 172800000).toISOString(),
      },
    ]

    demoBookings.forEach((booking) => {
      this.bookings.set(booking.id, booking)
    })
  }

  getAll(): Booking[] {
    return Array.from(this.bookings.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }

  getById(id: string): Booking | undefined {
    return this.bookings.get(id)
  }

  create(data: Omit<Booking, "id" | "createdAt" | "updatedAt">): Booking {
    const id = `bk_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const now = new Date().toISOString()
    const booking: Booking = {
      ...data,
      id,
      createdAt: now,
      updatedAt: now,
    }
    this.bookings.set(id, booking)
    return booking
  }

  update(id: string, data: Partial<Booking>): Booking | null {
    const existing = this.bookings.get(id)
    if (!existing) return null

    const updated: Booking = {
      ...existing,
      ...data,
      id: existing.id, // Prevent ID change
      createdAt: existing.createdAt, // Prevent createdAt change
      updatedAt: new Date().toISOString(),
    }
    this.bookings.set(id, updated)
    return updated
  }

  updateStatus(id: string, status: Booking["status"]): Booking | null {
    return this.update(id, { status })
  }

  delete(id: string): boolean {
    return this.bookings.delete(id)
  }

  // Statistics
  getTotalCount(): number {
    return this.bookings.size
  }

  getTodayCount(): number {
    const today = new Date().toISOString().split("T")[0]
    return Array.from(this.bookings.values()).filter(
      (b) => b.booking_date === today
    ).length
  }

  getUniqueCustomers(): number {
    const emails = new Set(Array.from(this.bookings.values()).map((b) => b.email))
    return emails.size
  }

  getPendingCount(): number {
    return Array.from(this.bookings.values()).filter(
      (b) => b.status === "pending"
    ).length
  }

  getConfirmedCount(): number {
    return Array.from(this.bookings.values()).filter(
      (b) => b.status === "confirmed"
    ).length
  }
}

// Singleton instance
export const bookingStore = new BookingStore()
