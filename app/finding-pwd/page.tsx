"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Music, CheckCircle, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function FindingPwdPage() {
  const [identifier, setIdentifier] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [method, setMethod] = useState("email")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (identifier && (identifier.includes("@") || identifier.length > 3)) {
        setSubmitted(true)
        setError(false)
      } else {
        setError(true)
        setSubmitted(false)
      }
      setLoading(false)
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
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <Card className="mx-auto max-w-md w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Reset Your Password</CardTitle>
            <CardDescription>Choose a method to reset your password</CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <Alert className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-900">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertTitle>Password Reset Email Sent</AlertTitle>
                <AlertDescription>
                  We've sent instructions to {method === "email" ? identifier : "your registered email"}. Please check
                  your inbox and follow the link to reset your password.
                </AlertDescription>
              </Alert>
            ) : (
              <Tabs defaultValue="email" className="w-full" onValueChange={setMethod}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="username">Username</TabsTrigger>
                </TabsList>
                <TabsContent value="email">
                  <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    {error && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>Please enter a valid email address.</AlertDescription>
                      </Alert>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your registered email"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={loading}>
                      {loading ? "Processing..." : "Send Reset Link"}
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="username">
                  <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    {error && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>Please enter a valid username.</AlertDescription>
                      </Alert>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        placeholder="Enter your username"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={loading}>
                      {loading ? "Processing..." : "Send Reset Link"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              Remember your password?{" "}
              <Link href="/login" className="text-purple-600 hover:underline">
                Log in
              </Link>
            </div>
            <div className="text-sm text-center text-muted-foreground">
              Forgot your ID?{" "}
              <Link href="/finding-id" className="text-purple-600 hover:underline">
                Find your ID
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
