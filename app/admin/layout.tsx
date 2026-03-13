import { redirect } from "next/navigation"
import { getAdminSession } from "@/lib/auth"
import { AdminSidebar } from "@/components/admin/sidebar"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if we're on the login page
  // This is a workaround since we can't easily check the path in layout
  // The login page will handle its own auth check
  
  return (
    <div className="min-h-screen bg-background flex">
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </div>
  )
}

async function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession()
  
  // Get the current path from the children - if it's the login page, don't show sidebar
  const isLoginPage = false // We'll handle this with a separate layout for login
  
  if (!session && !isLoginPage) {
    // For protected routes, we'll check auth in the page components
    // This allows the login page to work without redirect loops
  }
  
  return (
    <>
      <AdminSidebar />
      <main className="flex-1 lg:ml-0 min-h-screen overflow-auto">
        {children}
      </main>
    </>
  )
}
