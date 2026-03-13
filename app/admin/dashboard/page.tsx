import { redirect } from "next/navigation"
import { getAdminSession } from "@/lib/auth"
import { bookingStore } from "@/lib/bookings"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Users, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import Link from "next/link"

export default async function AdminDashboardPage() {
  const session = await getAdminSession()
  
  if (!session) {
    redirect("/admin/login")
  }

  // Get statistics
  const totalBookings = bookingStore.getTotalCount()
  const todayBookings = bookingStore.getTodayCount()
  const totalCustomers = bookingStore.getUniqueCustomers()
  const pendingBookings = bookingStore.getPendingCount()
  const confirmedBookings = bookingStore.getConfirmedCount()

  // Get recent bookings
  const recentBookings = bookingStore.getAll().slice(0, 5)

  const stats = [
    {
      title: "Total Bookings",
      value: totalBookings,
      description: "All time reservations",
      icon: CalendarDays,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Today's Bookings",
      value: todayBookings,
      description: "Reservations for today",
      icon: Clock,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Total Customers",
      value: totalCustomers,
      description: "Unique customers",
      icon: Users,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "Pending",
      value: pendingBookings,
      description: "Awaiting confirmation",
      icon: AlertCircle,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      title: "Confirmed",
      value: confirmedBookings,
      description: "Confirmed reservations",
      icon: CheckCircle2,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":")
    const hour = parseInt(hours, 10)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour > 12 ? hour - 12 : hour
    return `${displayHour}:${minutes} ${ampm}`
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-[var(--font-playfair)] text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground font-[var(--font-cormorant)] text-lg mt-1">
          Welcome back, {session.email}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground font-[var(--font-cormorant)]">
                    {stat.title}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Bookings */}
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-[var(--font-playfair)] text-foreground">
              Recent Bookings
            </CardTitle>
            <CardDescription className="font-[var(--font-cormorant)]">
              Latest reservation requests
            </CardDescription>
          </div>
          <Link
            href="/admin/bookings"
            className="text-primary hover:text-primary/80 text-sm font-[var(--font-cormorant)] transition-colors"
          >
            View All
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentBookings.length === 0 ? (
              <p className="text-center text-muted-foreground py-8 font-[var(--font-cormorant)]">
                No bookings yet
              </p>
            ) : (
              recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-semibold">
                        {booking.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{booking.name}</p>
                      <p className="text-sm text-muted-foreground font-[var(--font-cormorant)]">
                        {booking.guests} guests • {formatDate(booking.booking_date)} at {formatTime(booking.booking_time)}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      booking.status === "confirmed"
                        ? "bg-emerald-500/10 text-emerald-500"
                        : booking.status === "pending"
                        ? "bg-amber-500/10 text-amber-500"
                        : "bg-red-500/10 text-red-500"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
