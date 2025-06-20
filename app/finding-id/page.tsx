"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Music, CheckCircle, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Header } from "@/components/header"

export default function FindingIdPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (email && email.includes("@")) {
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
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} showSearch={true} />
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <Card className="mx-auto max-w-md w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Find Your ID</CardTitle>
            <CardDescription>Enter your email address and we'll send you your username</CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <Alert className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-900">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>
                  We've sent an email to {email} with your username information. Please check your inbox.
                </AlertDescription>
              </Alert>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={loading}>
                    {loading ? "Processing..." : "Find My ID"}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              Remember your ID?{" "}
              <Link href="/login" className="text-purple-600 hover:underline">
                Log in
              </Link>
            </div>
            <div className="text-sm text-center text-muted-foreground">
              Forgot your password?{" "}
              <Link href="/finding-pwd" className="text-purple-600 hover:underline">
                Reset password
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
