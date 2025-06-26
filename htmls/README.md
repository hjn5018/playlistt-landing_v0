# Playlistt - 음악 플레이리스트 공유 플랫폼

## 📋 프로젝트 개요

Playlistt는 사용자들이 음악 플레이리스트를 만들고, 공유하고, 발견할 수 있는 웹 애플리케이션입니다. 이 프로젝트는 순수 HTML, CSS, JavaScript로 작성되어 GitHub Pages에서 바로 배포할 수 있습니다.

## 🚀 GitHub Pages 배포 방법

### 1. GitHub 저장소 생성
1. GitHub에서 새 저장소를 생성합니다
2. 저장소 이름을 `playlistt-landing`으로 설정합니다

### 2. 파일 업로드
1. 이 `htmls` 폴더의 모든 파일을 GitHub 저장소에 업로드합니다
2. 또는 Git을 사용하여 파일을 푸시합니다:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/playlistt-landing.git
git push -u origin main
```

### 3. GitHub Pages 활성화
1. GitHub 저장소 페이지에서 **Settings** 탭으로 이동
2. 왼쪽 사이드바에서 **Pages** 클릭
3. **Source** 섹션에서 **Deploy from a branch** 선택
4. **Branch**를 `main`으로 설정하고 **Save** 클릭

### 4. 배포 확인
- 몇 분 후 `https://yourusername.github.io/playlistt-landing`에서 사이트를 확인할 수 있습니다

## 📁 파일 구조

```
htmls/
├── index.html          # 메인 랜딩 페이지
├── discover.html       # 플레이리스트 탐색 페이지
├── login.html          # 로그인 페이지
├── signup.html         # 회원가입 페이지
├── mypage.html         # 마이페이지
├── profile.html        # 프로필 페이지
├── playlist-create.html # 플레이리스트 생성 페이지
├── finding-pwd.html    # 비밀번호 찾기 페이지
└── README.md           # 이 파일
```

## 🎨 주요 기능

### 1. **랜딩 페이지** (`index.html`)
- 트렌딩 플레이리스트 표시
- 플레이리스트 카드 형태로 시각적 표현
- 모달을 통한 플레이리스트 미리보기

### 2. **플레이리스트 탐색** (`discover.html`)
- 카테고리별 필터링 (팝, 락, 일렉트로닉 등)
- 플랫폼별 필터링 (Spotify, Apple Music, Melon)
- 실시간 검색 기능

### 3. **사용자 인증**
- **로그인** (`login.html`): 이메일/사용자명으로 로그인
- **회원가입** (`signup.html`): 새로운 계정 생성
- **비밀번호 찾기** (`finding-pwd.html`): 이메일을 통한 비밀번호 재설정

### 4. **사용자 페이지**
- **마이페이지** (`mypage.html`): 사용자의 플레이리스트 관리
- **프로필** (`profile.html`): 계정 설정 및 프로필 관리

### 5. **플레이리스트 관리**
- **플레이리스트 생성** (`playlist-create.html`): 새로운 플레이리스트 만들기

## 🛠 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: 
  - Flexbox 및 Grid 레이아웃
  - 반응형 디자인
  - CSS 변수 및 커스텀 속성
  - 애니메이션 및 전환 효과
- **JavaScript (ES6+)**:
  - DOM 조작
  - 이벤트 처리
  - 폼 검증
  - 모달 및 드롭다운 기능

## 🎯 디자인 특징

- **모던한 UI**: 깔끔하고 직관적인 인터페이스
- **보라색 브랜딩**: Playlistt의 일관된 브랜드 컬러
- **그라데이션 카드**: 플레이리스트를 시각적으로 매력적으로 표현
- **반응형 디자인**: 모바일부터 데스크톱까지 최적화
- **접근성**: 키보드 네비게이션 및 스크린 리더 지원

## 📱 반응형 지원

- **데스크톱**: 1200px 이상
- **태블릿**: 768px - 1199px
- **모바일**: 480px - 767px
- **소형 모바일**: 480px 미만

## 🔧 커스터마이징

### 색상 변경
CSS 변수를 수정하여 브랜드 색상을 변경할 수 있습니다:

```css
:root {
  --primary-color: #8b5cf6;
  --primary-hover: #7c3aed;
}
```

### 플레이리스트 데이터 수정
각 페이지의 JavaScript 섹션에서 플레이리스트 데이터를 수정할 수 있습니다.

## 🚀 성능 최적화

- **이미지 최적화**: SVG 아이콘 사용
- **CSS 최적화**: 불필요한 스타일 제거
- **JavaScript 최적화**: 이벤트 위임 사용
- **로딩 최적화**: 인라인 CSS/JS로 외부 요청 최소화

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 📞 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 이슈를 생성해주세요.

---

**Playlistt** - 음악을 공유하고 발견하세요 🎵 