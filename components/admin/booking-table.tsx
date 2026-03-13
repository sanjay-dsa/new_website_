"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Booking } from "@/lib/bookings"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import {
  MoreHorizontal,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  Trash2,
  Loader2,
  Mail,
  Phone,
  Users,
  Calendar,
  MessageSquare,
} from "lucide-react"

interface BookingTableProps {
  bookings: Booking[]
}

export function BookingTable({ bookings: initialBookings }: BookingTableProps) {
  const router = useRouter()
  const [bookings, setBookings] = useState(initialBookings)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingAction, setLoadingAction] = useState<string | null>(null)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":")
    const hour = parseInt(hours, 10)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour > 12 ? hour - 12 : hour
    return `${displayHour}:${minutes} ${ampm}`
  }

  const getStatusBadge = (status: Booking["status"]) => {
    const statusConfig = {
      confirmed: {
        variant: "default" as const,
        className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
        icon: CheckCircle,
      },
      pending: {
        variant: "secondary" as const,
        className: "bg-amber-500/10 text-amber-500 border-amber-500/20",
        icon: Clock,
      },
      cancelled: {
        variant: "destructive" as const,
        className: "bg-red-500/10 text-red-500 border-red-500/20",
        icon: XCircle,
      },
    }

    const config = statusConfig[status]
    const Icon = config.icon

    return (
      <Badge variant={config.variant} className={config.className}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const handleStatusChange = async (id: string, newStatus: Booking["status"]) => {
    setLoadingAction(`status-${id}`)
    try {
      const response = await fetch(`/api/admin/bookings/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
        )
        router.refresh()
      }
    } catch (error) {
      console.error("Failed to update status:", error)
    } finally {
      setLoadingAction(null)
    }
  }

  const handleDelete = async () => {
    if (!selectedBooking) return
    setIsLoading(true)

    try {
      const response = await fetch(`/api/admin/bookings/${selectedBooking.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setBookings((prev) => prev.filter((b) => b.id !== selectedBooking.id))
        setIsDeleteDialogOpen(false)
        setSelectedBooking(null)
        router.refresh()
      }
    } catch (error) {
      console.error("Failed to delete booking:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const openViewDialog = (booking: Booking) => {
    setSelectedBooking(booking)
    setIsViewDialogOpen(true)
  }

  const openDeleteDialog = (booking: Booking) => {
    setSelectedBooking(booking)
    setIsDeleteDialogOpen(true)
  }

  return (
    <>
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/30 hover:bg-secondary/30">
              <TableHead className="font-[var(--font-cormorant)] text-foreground">Customer</TableHead>
              <TableHead className="font-[var(--font-cormorant)] text-foreground">Contact</TableHead>
              <TableHead className="font-[var(--font-cormorant)] text-foreground">Date & Time</TableHead>
              <TableHead className="font-[var(--font-cormorant)] text-foreground text-center">Guests</TableHead>
              <TableHead className="font-[var(--font-cormorant)] text-foreground">Status</TableHead>
              <TableHead className="font-[var(--font-cormorant)] text-foreground text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                  No bookings found
                </TableCell>
              </TableRow>
            ) : (
              bookings.map((booking) => (
                <TableRow key={booking.id} className="hover:bg-secondary/20">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-semibold text-sm">
                          {booking.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{booking.name}</p>
                        <p className="text-xs text-muted-foreground font-mono">{booking.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm text-foreground flex items-center gap-2">
                        <Mail className="w-3 h-3 text-muted-foreground" />
                        {booking.email}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Phone className="w-3 h-3" />
                        {booking.phone}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm text-foreground">{formatDate(booking.booking_date)}</p>
                      <p className="text-sm text-muted-foreground">{formatTime(booking.booking_time)}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="inline-flex items-center gap-1 text-foreground">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      {booking.guests}
                    </span>
                  </TableCell>
                  <TableCell>{getStatusBadge(booking.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          disabled={loadingAction === `status-${booking.id}`}
                        >
                          {loadingAction === `status-${booking.id}` ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <MoreHorizontal className="h-4 w-4" />
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => openViewDialog(booking)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel className="text-xs text-muted-foreground">
                          Update Status
                        </DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(booking.id, "confirmed")}
                          disabled={booking.status === "confirmed"}
                        >
                          <CheckCircle className="w-4 h-4 mr-2 text-emerald-500" />
                          Mark Confirmed
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(booking.id, "pending")}
                          disabled={booking.status === "pending"}
                        >
                          <Clock className="w-4 h-4 mr-2 text-amber-500" />
                          Mark Pending
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(booking.id, "cancelled")}
                          disabled={booking.status === "cancelled"}
                        >
                          <XCircle className="w-4 h-4 mr-2 text-red-500" />
                          Mark Cancelled
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => openDeleteDialog(booking)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-lg bg-card border-border">
          <DialogHeader>
            <DialogTitle className="font-[var(--font-playfair)] text-xl text-foreground">
              Booking Details
            </DialogTitle>
            <DialogDescription className="font-[var(--font-cormorant)]">
              Full information about this reservation
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold text-xl">
                    {selectedBooking.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{selectedBooking.name}</h3>
                  {getStatusBadge(selectedBooking.status)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                    <Mail className="w-3 h-3" /> Email
                  </p>
                  <p className="text-foreground">{selectedBooking.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                    <Phone className="w-3 h-3" /> Phone
                  </p>
                  <p className="text-foreground">{selectedBooking.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                    <Calendar className="w-3 h-3" /> Date
                  </p>
                  <p className="text-foreground">{formatDate(selectedBooking.booking_date)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                    <Clock className="w-3 h-3" /> Time
                  </p>
                  <p className="text-foreground">{formatTime(selectedBooking.booking_time)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                    <Users className="w-3 h-3" /> Party Size
                  </p>
                  <p className="text-foreground">{selectedBooking.guests} Guests</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    Booking ID
                  </p>
                  <p className="text-foreground font-mono text-sm">{selectedBooking.id}</p>
                </div>
              </div>

              {selectedBooking.message && (
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                    <MessageSquare className="w-3 h-3" /> Special Request
                  </p>
                  <p className="text-foreground bg-secondary/30 p-3 rounded-lg">
                    {selectedBooking.message}
                  </p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsViewDialogOpen(false)}
              className="border-border"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Delete Booking?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the booking
              {selectedBooking && ` for ${selectedBooking.name}`}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-border">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
