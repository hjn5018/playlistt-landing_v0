"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Music, AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Basic validation
    if (!name || !email || !username || !password || !confirmPassword) {
      setError("All fields are required")
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long")
      setLoading(false)
      return
    }

    if (!agreeTerms) {
      setError("You must agree to the terms and conditions")
      setLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      setSuccess(true)
      setLoading(false)

      // In a real app, you would redirect to the dashboard/home page after successful signup
      setTimeout(() => {
        window.location.href = "/mypage"
      }, 2000)
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Music className="h-6 w-6 text-purple-500" />
              <span className="text-xl font-bold">playlistt</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
              Home
            </Link>
            <Link href="/discover" className="text-sm font-medium hover:underline underline-offset-4">
              Discover
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700 font-bold">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4 md:p-8 bg-gradient-to-b from-purple-50 to-white dark:from-purple-950/20 dark:to-background">
        <Card className="mx-auto max-w-md w-full">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-2">
              <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900">
                <Music className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
            <CardDescription className="text-center">Enter your information to get started</CardDescription>
          </CardHeader>
          <CardContent>
            {success ? (
              <Alert className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-900">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertTitle>Account created successfully!</AlertTitle>
                <AlertDescription>
                  Welcome to Playlistt! You're being redirected to your profile page...
                </AlertDescription>
              </Alert>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      placeholder="Choose a username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">This will be your unique identifier on Playlistt</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">Must be at least 8 characters long</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={agreeTerms}
                      onCheckedChange={(checked) => setAgreeTerms(checked === true)}
                    />
                    <Label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{" "}
                      <Link href="/terms" className="text-purple-600 hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-purple-600 hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={loading}>
                    {loading ? "Creating account..." : "Sign up"}
                  </Button>
                </div>
              </form>
            )}
            {!success && (
              <>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Button variant="outline">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09z" />
                    </svg>
                    Apple
                  </Button>
                  <Button variant="outline">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="#1DB954">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                    Spotify
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="#FF0000">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    YouTube
                  </Button>
                  <Button variant="outline">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="#f50">
                      <path d="M19.98 8.02a40.15 40.15 0 0 0-.65-.89c-.1-.12-.21-.23-.33-.34a4.65 4.65 0 0 0-3.13-1.23c-1.32-.08-2.59.15-3.79.72-.29.14-.57.29-.85.44-.37-.21-.73-.45-1.1-.67-.95-.56-1.92-1.04-2.96-1.29a5.18 5.18 0 0 0-2.93.05c-.78.23-1.4.7-1.91 1.31-.41.48-.72 1.03-.91 1.64-.2.62-.25 1.25-.23 1.9.02.56.11 1.11.28 1.64.24.73.59 1.42.95 2.1.13.24.26.48.39.72l.03.06c.12.22-.16.27-.25.37-.08.09-.17.17-.24.26-.35.43-.67.89-.9 1.4-.28.62-.41 1.28-.34 1.95.07.54.26 1.04.61 1.46.35.41.8.72 1.31.92.44.17.9.27 1.37.32.64.07 1.28.03 1.92-.03.36-.03.72-.1 1.08-.16.2-.03.4-.07.6-.11.82-.16 1.65-.32 2.48-.46.14-.02.29-.05.43-.07.31-.04.61-.05.92-.05.7 0 1.38.13 2.03.35.87.3 1.59.81 2.22 1.47.28.29.53.61.75.95.1.15.19.31.28.47.04.07.11.13.13.21.07.14.07.21-.09.27-.32.12-.64.24-.98.29-.49.07-.98.09-1.48.08-.75-.01-1.5-.09-2.23-.29-.61-.16-1.2-.38-1.76-.67-.1-.05-.21-.09-.32-.11-.12-.02-.25.02-.34.1-.1.09-.17.21-.2.34-.04.14-.02.29.04.42.07.15.19.27.33.35.15.09.3.16.45.24.54.27 1.1.49 1.68.67.67.21 1.35.36 2.05.45.87.12 1.75.15 2.63.1.51-.03 1.01-.11 1.5-.24.43-.11.85-.27 1.25-.48.76-.4 1.3-.99 1.61-1.77.16-.39.24-.8.27-1.22.04-.66-.05-1.29-.26-1.9-.31-.88-.8-1.66-1.31-2.42-.53-.79-1.11-1.53-1.69-2.28-.5-.65-.96-1.32-1.34-2.04-.17-.32-.31-.65-.41-.99-.13-.45-.16-.92-.08-1.38.09-.53.33-.97.71-1.34.4-.39.9-.63 1.46-.73.5-.09 1-.05 1.49.08.51.14.96.39 1.34.75.36.34.62.75.79 1.21.16.42.23.86.24 1.3.01.53-.08 1.05-.19 1.57-.04.19-.09.37-.14.56 0 .02-.01.04-.01.06-.09.37.23.35.46.35.56.01 1.12-.01 1.68-.02.11 0 .22-.01.33-.02.3-.02.6-.05.9-.09.26-.03.38-.17.43-.42.03-.17.05-.35.08-.52.05-.32.09-.64.12-.96.09-.86.11-1.72.05-2.58-.07-.86-.26-1.68-.63-2.44z" />
                    </svg>
                    SoundCloud
                  </Button>
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-purple-600 hover:underline">
                Log in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <Music className="h-5 w-5 text-purple-500" />
            <p className="text-sm text-muted-foreground">© 2024 Playlistt. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Terms
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Privacy
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
