"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  CalendarDays,
  LogOut,
  ChefHat,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const navItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Bookings",
    href: "/admin/bookings",
    icon: CalendarDays,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" })
      router.push("/admin/login")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
            <ChefHat className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-[var(--font-playfair)] text-foreground tracking-wider">
              AURUM
            </h1>
            <p className="text-xs text-muted-foreground font-[var(--font-cormorant)]">
              Admin Panel
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                  "font-[var(--font-cormorant)] text-base",
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.title}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start gap-3 px-4 py-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 font-[var(--font-cormorant)]"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </Button>
        <div className="mt-4 px-4">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-primary transition-colors font-[var(--font-cormorant)]"
          >
            View Restaurant Site
          </Link>
        </div>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-border text-foreground"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-40 w-64 bg-card border-r border-border flex flex-col transition-transform duration-300",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <SidebarContent />
      </aside>
    </>
  )
}
