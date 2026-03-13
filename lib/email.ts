import nodemailer from "nodemailer"
import { Booking } from "./bookings"

// Email configuration
// In production, set these environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
  },
})

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@aurum.com"
const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@aurum.com"

// Format date for display
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Format time for display
function formatTime(time: string): string {
  const [hours, minutes] = time.split(":")
  const hour = parseInt(hours, 10)
  const ampm = hour >= 12 ? "PM" : "AM"
  const displayHour = hour > 12 ? hour - 12 : hour
  return `${displayHour}:${minutes} ${ampm}`
}

// Send email to admin when new booking is made
export async function sendAdminNotification(booking: Booking): Promise<boolean> {
  // Skip if email is not configured
  if (!process.env.SMTP_USER) {
    console.log("[Email] SMTP not configured, skipping admin notification")
    return true
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Georgia', serif; background-color: #0a0a0a; color: #f5f5f0; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #121212; border: 1px solid #262626; border-radius: 8px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #1a1a1a, #262626); padding: 30px; text-align: center; border-bottom: 1px solid #c9a962; }
        .header h1 { color: #c9a962; margin: 0; font-size: 28px; letter-spacing: 2px; }
        .content { padding: 30px; }
        .booking-details { background-color: #1a1a1a; border: 1px solid #262626; border-radius: 8px; padding: 20px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #262626; }
        .detail-row:last-child { border-bottom: none; }
        .label { color: #a3a3a3; font-size: 14px; }
        .value { color: #f5f5f0; font-weight: bold; }
        .status { display: inline-block; padding: 5px 15px; border-radius: 20px; font-size: 12px; text-transform: uppercase; background-color: #c9a962; color: #0a0a0a; }
        .footer { text-align: center; padding: 20px; border-top: 1px solid #262626; color: #a3a3a3; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>AURUM</h1>
          <p style="color: #a3a3a3; margin-top: 10px;">New Booking Received</p>
        </div>
        <div class="content">
          <p>A new reservation has been made at Aurum Restaurant:</p>
          <div class="booking-details">
            <div class="detail-row">
              <span class="label">Guest Name</span>
              <span class="value">${booking.name}</span>
            </div>
            <div class="detail-row">
              <span class="label">Email</span>
              <span class="value">${booking.email}</span>
            </div>
            <div class="detail-row">
              <span class="label">Phone</span>
              <span class="value">${booking.phone}</span>
            </div>
            <div class="detail-row">
              <span class="label">Date</span>
              <span class="value">${formatDate(booking.booking_date)}</span>
            </div>
            <div class="detail-row">
              <span class="label">Time</span>
              <span class="value">${formatTime(booking.booking_time)}</span>
            </div>
            <div class="detail-row">
              <span class="label">Party Size</span>
              <span class="value">${booking.guests} ${booking.guests === 1 ? "Guest" : "Guests"}</span>
            </div>
            ${booking.message ? `
            <div class="detail-row">
              <span class="label">Special Request</span>
              <span class="value">${booking.message}</span>
            </div>
            ` : ""}
            <div class="detail-row">
              <span class="label">Status</span>
              <span class="status">${booking.status}</span>
            </div>
          </div>
          <p style="color: #a3a3a3;">Please review and confirm this booking in the admin dashboard.</p>
        </div>
        <div class="footer">
          <p>Aurum Restaurant | Fine Dining Excellence</p>
        </div>
      </div>
    </body>
    </html>
  `

  try {
    await transporter.sendMail({
      from: `"Aurum Restaurant" <${FROM_EMAIL}>`,
      to: ADMIN_EMAIL,
      subject: `New Booking: ${booking.name} - ${formatDate(booking.booking_date)}`,
      html,
    })
    console.log("[Email] Admin notification sent successfully")
    return true
  } catch (error) {
    console.error("[Email] Failed to send admin notification:", error)
    return false
  }
}

// Send confirmation email to customer
export async function sendCustomerConfirmation(booking: Booking): Promise<boolean> {
  // Skip if email is not configured
  if (!process.env.SMTP_USER) {
    console.log("[Email] SMTP not configured, skipping customer confirmation")
    return true
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Georgia', serif; background-color: #0a0a0a; color: #f5f5f0; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #121212; border: 1px solid #262626; border-radius: 8px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #1a1a1a, #262626); padding: 40px; text-align: center; border-bottom: 1px solid #c9a962; }
        .header h1 { color: #c9a962; margin: 0; font-size: 32px; letter-spacing: 3px; }
        .header p { color: #f5f5f0; margin-top: 15px; font-size: 18px; }
        .content { padding: 30px; }
        .booking-card { background: linear-gradient(135deg, #1a1a1a, #262626); border: 1px solid #c9a962; border-radius: 8px; padding: 30px; margin: 20px 0; text-align: center; }
        .booking-card h2 { color: #c9a962; margin: 0 0 20px 0; font-size: 24px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px; }
        .info-item { text-align: center; }
        .info-label { color: #a3a3a3; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px; }
        .info-value { color: #f5f5f0; font-size: 18px; font-weight: bold; }
        .confirmation-number { background-color: #c9a962; color: #0a0a0a; padding: 10px 20px; border-radius: 4px; display: inline-block; margin-top: 20px; font-family: monospace; }
        .footer { text-align: center; padding: 30px; border-top: 1px solid #262626; }
        .footer p { color: #a3a3a3; font-size: 14px; margin: 5px 0; }
        .social-links { margin-top: 15px; }
        .social-links a { color: #c9a962; text-decoration: none; margin: 0 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>AURUM</h1>
          <p>Your Reservation is Confirmed</p>
        </div>
        <div class="content">
          <p>Dear ${booking.name},</p>
          <p>Thank you for choosing Aurum. We are delighted to confirm your reservation.</p>
          
          <div class="booking-card">
            <h2>Reservation Details</h2>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Date</div>
                <div class="info-value">${formatDate(booking.booking_date)}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Time</div>
                <div class="info-value">${formatTime(booking.booking_time)}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Party Size</div>
                <div class="info-value">${booking.guests} ${booking.guests === 1 ? "Guest" : "Guests"}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Status</div>
                <div class="info-value" style="color: #c9a962;">${booking.status.toUpperCase()}</div>
              </div>
            </div>
            <div class="confirmation-number">
              Confirmation: ${booking.id}
            </div>
          </div>

          ${booking.message ? `
          <p><strong>Special Request:</strong> ${booking.message}</p>
          ` : ""}

          <p style="margin-top: 20px;">If you need to modify or cancel your reservation, please contact us at least 24 hours in advance.</p>
          
          <p>We look forward to welcoming you.</p>
          
          <p style="margin-top: 30px; color: #c9a962; font-style: italic;">Warm regards,<br>The Aurum Team</p>
        </div>
        <div class="footer">
          <p><strong>Aurum Restaurant</strong></p>
          <p>123 Culinary Avenue, Gourmet District</p>
          <p>Tel: +1 (555) 123-4567</p>
          <div class="social-links">
            <a href="#">Instagram</a> | <a href="#">Facebook</a> | <a href="#">Twitter</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `

  try {
    await transporter.sendMail({
      from: `"Aurum Restaurant" <${FROM_EMAIL}>`,
      to: booking.email,
      subject: `Reservation Confirmed - ${formatDate(booking.booking_date)} at ${formatTime(booking.booking_time)}`,
      html,
    })
    console.log("[Email] Customer confirmation sent successfully")
    return true
  } catch (error) {
    console.error("[Email] Failed to send customer confirmation:", error)
    return false
  }
}

// Send status update email to customer
export async function sendStatusUpdateEmail(booking: Booking): Promise<boolean> {
  // Skip if email is not configured
  if (!process.env.SMTP_USER) {
    console.log("[Email] SMTP not configured, skipping status update email")
    return true
  }

  const statusMessages = {
    confirmed: "Great news! Your reservation has been confirmed.",
    pending: "Your reservation is pending confirmation.",
    cancelled: "Your reservation has been cancelled.",
  }

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Georgia', serif; background-color: #0a0a0a; color: #f5f5f0; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #121212; border: 1px solid #262626; border-radius: 8px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #1a1a1a, #262626); padding: 30px; text-align: center; border-bottom: 1px solid #c9a962; }
        .header h1 { color: #c9a962; margin: 0; font-size: 28px; letter-spacing: 2px; }
        .content { padding: 30px; text-align: center; }
        .status-badge { display: inline-block; padding: 10px 30px; border-radius: 30px; font-size: 16px; text-transform: uppercase; letter-spacing: 2px; margin: 20px 0; }
        .status-confirmed { background-color: #22c55e; color: #ffffff; }
        .status-pending { background-color: #eab308; color: #0a0a0a; }
        .status-cancelled { background-color: #ef4444; color: #ffffff; }
        .booking-info { background-color: #1a1a1a; border: 1px solid #262626; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: left; }
        .info-row { padding: 10px 0; border-bottom: 1px solid #262626; }
        .info-row:last-child { border-bottom: none; }
        .footer { text-align: center; padding: 20px; border-top: 1px solid #262626; color: #a3a3a3; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>AURUM</h1>
          <p style="color: #a3a3a3; margin-top: 10px;">Reservation Update</p>
        </div>
        <div class="content">
          <p>Dear ${booking.name},</p>
          <p>${statusMessages[booking.status]}</p>
          <div class="status-badge status-${booking.status}">${booking.status}</div>
          <div class="booking-info">
            <div class="info-row"><strong>Date:</strong> ${formatDate(booking.booking_date)}</div>
            <div class="info-row"><strong>Time:</strong> ${formatTime(booking.booking_time)}</div>
            <div class="info-row"><strong>Party Size:</strong> ${booking.guests} Guests</div>
            <div class="info-row"><strong>Confirmation:</strong> ${booking.id}</div>
          </div>
          <p>If you have any questions, please contact us.</p>
        </div>
        <div class="footer">
          <p>Aurum Restaurant | Fine Dining Excellence</p>
        </div>
      </div>
    </body>
    </html>
  `

  try {
    await transporter.sendMail({
      from: `"Aurum Restaurant" <${FROM_EMAIL}>`,
      to: booking.email,
      subject: `Reservation ${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)} - Aurum Restaurant`,
      html,
    })
    console.log("[Email] Status update email sent successfully")
    return true
  } catch (error) {
    console.error("[Email] Failed to send status update email:", error)
    return false
  }
}
