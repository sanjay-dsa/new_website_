import { redirect } from "next/navigation"
import { getAdminSession } from "@/lib/auth"
import { bookingStore } from "@/lib/bookings"
import { BookingTable } from "@/components/admin/booking-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function AdminBookingsPage() {
  const session = await getAdminSession()
  
  if (!session) {
    redirect("/admin/login")
  }

  const bookings = bookingStore.getAll()

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-[var(--font-playfair)] text-foreground">
          Booking Management
        </h1>
        <p className="text-muted-foreground font-[var(--font-cormorant)] text-lg mt-1">
          View and manage all restaurant reservations
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-foreground">{bookings.length}</p>
                <p className="text-sm text-muted-foreground font-[var(--font-cormorant)]">
                  Total Bookings
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-emerald-500">
                  {bookings.filter(b => b.status === 'confirmed').length}
                </p>
                <p className="text-sm text-muted-foreground font-[var(--font-cormorant)]">
                  Confirmed
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-amber-500">
                  {bookings.filter(b => b.status === 'pending').length}
                </p>
                <p className="text-sm text-muted-foreground font-[var(--font-cormorant)]">
                  Pending
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-red-500">
                  {bookings.filter(b => b.status === 'cancelled').length}
                </p>
                <p className="text-sm text-muted-foreground font-[var(--font-cormorant)]">
                  Cancelled
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bookings Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl font-[var(--font-playfair)] text-foreground">
            All Reservations
          </CardTitle>
          <CardDescription className="font-[var(--font-cormorant)]">
            Click on actions to view details, update status, or delete bookings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BookingTable bookings={bookings} />
        </CardContent>
      </Card>
    </div>
  )
}
