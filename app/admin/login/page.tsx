"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Lock, Mail, ChefHat } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Login failed")
      }

      router.push("/admin/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-card via-background to-background" />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a962' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
      </div>

      <Card className="w-full max-w-md relative z-10 bg-card/95 backdrop-blur-sm border-border shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
            <ChefHat className="w-8 h-8 text-primary" />
          </div>
          <div>
            <CardTitle className="text-3xl font-[var(--font-playfair)] text-foreground tracking-wide">
              AURUM
            </CardTitle>
            <CardDescription className="text-muted-foreground font-[var(--font-cormorant)] text-lg mt-2">
              Admin Portal
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive" className="border-destructive/50 bg-destructive/10">
                <AlertDescription className="text-destructive">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-[var(--font-cormorant)] text-base">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@aurum.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11 py-6 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-[var(--font-cormorant)] text-base">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11 py-6 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-primary"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-[var(--font-cormorant)] text-lg tracking-wider"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            <div className="pt-4 border-t border-border">
              <p className="text-center text-muted-foreground text-sm font-[var(--font-cormorant)]">
                Demo Credentials
              </p>
              <div className="mt-2 p-3 bg-secondary/50 rounded-md text-center">
                <p className="text-foreground/80 text-sm font-mono">
                  Email: admin@aurum.com
                </p>
                <p className="text-foreground/80 text-sm font-mono">
                  Password: admin123
                </p>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
