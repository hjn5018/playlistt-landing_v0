"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Music, AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ResetPasswordPage({ params }: { params: { token: string } }) {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tokenValid, setTokenValid] = useState(true)

  // 토큰 유효성 검사 (실제 구현에서는 API 호출)
  useEffect(() => {
    // 토큰 형식 검사 (간단한 예시)
    if (!params.token || params.token.length < 32) {
      setTokenValid(false)
      setError("유효하지 않은 비밀번호 재설정 링크입니다.")
    }

    // 실제 구현에서는 토큰 유효성을 서버에서 확인
    // const verifyToken = async () => {
    //   try {
    //     const response = await fetch('/api/reset-password/check-token', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({ token: params.token })
    //     });
    //     const data = await response.json();
    //     if (!data.valid) {
    //       setTokenValid(false);
    //       setError(data.message);
    //     }
    //   } catch (err) {
    //     setTokenValid(false);
    //     setError("토큰 확인 중 오류가 발생했습니다.");
    //   }
    // };
    // verifyToken();
  }, [params.token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // 기본 유효성 검사
    if (!password || !confirmPassword) {
      setError("모든 필드를 입력해주세요.")
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.")
      setLoading(false)
      return
    }

    if (password.length < 8) {
      setError("비밀번호는 최소 8자 이상이어야 합니다.")
      setLoading(false)
      return
    }

    try {
      // 실제 API 호출 (여기서는 시뮬레이션)
      // const response = await fetch('/api/reset-password/verify', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ token: params.token, newPassword: password })
      // });
      // const data = await response.json();

      // if (!data.success) {
      //   setError(data.message);
      //   setLoading(false);
      //   return;
      // }

      // 성공 시뮬레이션
      setTimeout(() => {
        setSuccess(true)
        setLoading(false)

        // 로그인 페이지로 리디렉션
        setTimeout(() => {
          router.push("/login")
        }, 3000)
      }, 1500)
    } catch (err) {
      setError("비밀번호 재설정 중 오류가 발생했습니다.")
      setLoading(false)
    }
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
      <main className="flex-1 flex items-center justify-center p-4 md:p-8 bg-gradient-to-b from-purple-50 to-white dark:from-purple-950/20 dark:to-background">
        <Card className="mx-auto max-w-md w-full">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-2">
              <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900">
                <Music className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">비밀번호 재설정</CardTitle>
            <CardDescription className="text-center">새로운 비밀번호를 입력해주세요</CardDescription>
          </CardHeader>
          <CardContent>
            {!tokenValid ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>유효하지 않은 링크</AlertTitle>
                <AlertDescription>
                  {error || "이 비밀번호 재설정 링크는 유효하지 않거나 만료되었습니다."}
                </AlertDescription>
              </Alert>
            ) : success ? (
              <Alert className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-900">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertTitle>비밀번호 재설정 완료!</AlertTitle>
                <AlertDescription>
                  비밀번호가 성공적으로 변경되었습니다. 잠시 후 로그인 페이지로 이동합니다.
                </AlertDescription>
              </Alert>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>오류</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="password">새 비밀번호</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="새 비밀번호 입력"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">비밀번호는 최소 8자 이상이어야 합니다</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">비밀번호 확인</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="비밀번호 다시 입력"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={loading}>
                    {loading ? "처리 중..." : "비밀번호 재설정"}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-sm text-center text-muted-foreground">
              <Link href="/login" className="text-purple-600 hover:underline">
                로그인 페이지로 돌아가기
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
