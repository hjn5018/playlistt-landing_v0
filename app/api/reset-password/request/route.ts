import { NextResponse } from "next/server"
import crypto from "crypto"

// 실제 구현에서는 데이터베이스 연결이 필요합니다
const mockUserDB = [
  { id: 1, email: "user@example.com", username: "user1" },
  // 더 많은 사용자...
]

// 토큰 저장소 (실제로는 데이터베이스에 저장해야 함)
const resetTokens = new Map()

export async function POST(request: Request) {
  try {
    const { identifier } = await request.json()

    // 이메일 또는 사용자명으로 사용자 찾기
    const user = mockUserDB.find((u) => u.email === identifier || u.username === identifier)

    if (!user) {
      // 사용자가 존재하지 않더라도 같은 응답을 반환하여 사용자 열거 공격 방지
      return NextResponse.json({
        success: true,
        message: "비밀번호 재설정 링크가 이메일로 전송되었습니다(존재하는 경우).",
      })
    }

    // 보안 토큰 생성 (유효 시간: 1시간)
    const resetToken = crypto.randomBytes(32).toString("hex")
    const expiry = Date.now() + 3600000 // 1시간 후 만료

    // 토큰 저장 (실제로는 데이터베이스에 저장)
    resetTokens.set(resetToken, {
      userId: user.id,
      expiry,
      used: false,
    })

    // 이메일 전송 로직 (실제 구현 필요)
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${resetToken}`
    console.log(`Reset link for ${user.email}: ${resetLink}`)

    // 실제로는 이메일 전송 서비스 사용
    // await sendEmail(user.email, "비밀번호 재설정", `비밀번호를 재설정하려면 다음 링크를 클릭하세요: ${resetLink}`);

    return NextResponse.json({
      success: true,
      message: "비밀번호 재설정 링크가 이메일로 전송되었습니다.",
    })
  } catch (error) {
    console.error("Password reset request error:", error)
    return NextResponse.json({ success: false, message: "요청 처리 중 오류가 발생했습니다." }, { status: 500 })
  }
}
