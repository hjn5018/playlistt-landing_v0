import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

// 토큰 저장소 참조 (실제로는 데이터베이스에서 조회)
// 이 예제에서는 위의 request 라우트에서 설정한 resetTokens를 사용한다고 가정
const resetTokens = new Map()

export async function POST(request: Request) {
  try {
    const { token, newPassword } = await request.json()

    // 토큰 유효성 검사
    const tokenData = resetTokens.get(token)

    if (!tokenData) {
      return NextResponse.json({ success: false, message: "유효하지 않거나 만료된 토큰입니다." }, { status: 400 })
    }

    // 토큰 만료 확인
    if (tokenData.expiry < Date.now()) {
      resetTokens.delete(token)
      return NextResponse.json(
        { success: false, message: "토큰이 만료되었습니다. 다시 요청해주세요." },
        { status: 400 },
      )
    }

    // 토큰 사용 여부 확인
    if (tokenData.used) {
      return NextResponse.json({ success: false, message: "이미 사용된 토큰입니다." }, { status: 400 })
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // 실제로는 데이터베이스에서 사용자 비밀번호 업데이트
    console.log(`Updating password for user ID ${tokenData.userId}`)

    // 토큰을 사용됨으로 표시
    tokenData.used = true
    resetTokens.set(token, tokenData)

    // 보안을 위해 일정 시간 후 토큰 삭제 (예: 15분 후)
    setTimeout(
      () => {
        resetTokens.delete(token)
      },
      15 * 60 * 1000,
    )

    return NextResponse.json({
      success: true,
      message: "비밀번호가 성공적으로 재설정되었습니다.",
    })
  } catch (error) {
    console.error("Password reset verification error:", error)
    return NextResponse.json({ success: false, message: "요청 처리 중 오류가 발생했습니다." }, { status: 500 })
  }
}
