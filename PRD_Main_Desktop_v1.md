# PRD - Portfolio Main Desktop

**Project**: Portfolio Website\
**Page**: Main Desktop\
**Version**: 1.0

------------------------------------------------------------------------

# Overview

메인 페이지는 **macOS Desktop**에서 영감을 받은 인터랙티브
포트폴리오이다.

실제 macOS를 그대로 복제하는 것이 아니라, macOS의 미니멀한 디자인과
자연스러운 인터랙션을 재해석한 브랜드 경험을 목표로 한다.

첫 화면은 Desktop(Home)이며, 사용자가 Desktop을 시작점으로 각 섹션을
탐색하는 **Fullpage Portfolio** 구조를 사용한다.

------------------------------------------------------------------------

# Design Goal

현재 디자인을 유지하면서 완성도를 높인다.

새로운 디자인을 만드는 것이 아니라 현재 레이아웃과 컨셉을 더욱 세련되게
개선한다.

Desktop 컨셉은 반드시 유지한다.

------------------------------------------------------------------------

# Design Keywords

-   Minimal
-   Premium
-   Interactive
-   Calm
-   Elegant
-   Modern
-   macOS Inspired

------------------------------------------------------------------------

# Non-Negotiable Rules

-   현재 macOS Desktop 컨셉을 유지한다.
-   기존 레이아웃 구조를 변경하지 않는다.
-   랜딩페이지 형태로 재구성하지 않는다.
-   새로운 UI 컴포넌트를 임의로 추가하지 않는다.
-   여백을 적극적으로 활용한다.
-   Apple Human Interface Guideline의 절제된 디자인 철학을 참고한다.
-   과도한 장식 요소를 추가하지 않는다.
-   현재 디자인을 다듬는 방향으로만 수정한다.

------------------------------------------------------------------------

# Background

Background Color

`#0F0F10`

배경에는 이미지나 오브젝트를 추가하지 않는다.

매우 약한 Noise Texture를 적용한다.

-   Opacity : 2\~3%
-   작은 입자
-   균일한 분포
-   존재감이 거의 느껴지지 않는 수준

배경은 차분하고 프리미엄한 분위기를 유지한다.

------------------------------------------------------------------------

# Top Menu

-   macOS Menu Bar를 참고한다.
-   심플한 디자인을 유지한다.
-   화면 최상단에 고정한다.

------------------------------------------------------------------------

# Desktop Icons

우측에 세로 정렬한다.

구성

-   Profile
-   Web Publishing
-   UI/UX Design
-   Graphic Design

Hover 시 선택 피드백만 제공한다.

과도한 애니메이션은 사용하지 않는다.

------------------------------------------------------------------------

# Navigation

전체 사이트는 Fullpage Scroll 구조를 사용한다.

Desktop(Home)

↓

Profile

↓

Web Publishing

↓

UI/UX Design

↓

Graphic Design

각 섹션은 Viewport 전체를 사용한다.

------------------------------------------------------------------------

## Desktop Folder Navigation

Desktop 폴더는 Navigation 역할을 수행한다.

Profile → Profile Section

Web Publishing → Web Publishing Section

UI/UX Design → UI/UX Design Section

Graphic Design → Graphic Design Section

폴더를 클릭하면 해당 섹션으로 자연스럽게 이동한다.

------------------------------------------------------------------------

## Scroll Navigation

마우스 휠 또는 터치패드 스크롤은

**한 번에 하나의 섹션만 이동**한다.

중간에서 멈추는 일반 스크롤은 사용하지 않는다.

각 섹션은 독립적인 페이지처럼 느껴져야 한다.

------------------------------------------------------------------------

# Main Typography

화면 정중앙 배치

## Name

KO KAEUN

-   Size : 60\~72px
-   Weight : Bold
-   Color : #F5F5F5
-   Letter Spacing : 약간 넓게

이름은 항상 고정한다.

------------------------------------------------------------------------

## Role

아래 텍스트만 자동으로 변경된다.

-   UX/UI Designer

-   Web Publisher

-   Frontend Developer

-   Creative Thinker

-   Size : 18\~20px

-   Weight : Regular

-   Color : #B8B8B8

------------------------------------------------------------------------

# Motion Direction

Role 텍스트만 자연스럽게 변경된다.

Apple 제품 페이지에서 느껴지는 부드럽고 절제된 Motion을 참고한다.

부드럽고 프리미엄한 인상을 제공해야 한다.

------------------------------------------------------------------------

# Sticky Note

Desktop 좌측 상단

Color

`#FFF2CD`

내용

Hi! 👋

Thanks for visiting\
my portfolio :)

-   Kaeun

내용은 변경하지 않는다.

애니메이션을 적용하지 않는다.

Desktop 분위기를 완성하는 장식 요소이다.

------------------------------------------------------------------------

# Dock

화면 하단 중앙

macOS Glass Style

구성

-   Finder
-   Figma
-   VS Code
-   Photoshop
-   Illustrator
-   Contact

Hover 시 자연스럽고 절제된 피드백을 제공한다.

------------------------------------------------------------------------

# Color Palette

  Element          Color
  ---------------- ------------------------
  Background       #0F0F10
  Primary Text     #F5F5F5
  Secondary Text   #B8B8B8
  Sticky Note      #FFF2CD
  Glass Border     rgba(255,255,255,0.08)

------------------------------------------------------------------------

# White Space

콘텐츠를 억지로 채우지 않는다.

여백 또한 디자인 요소로 활용한다.

Desktop 특유의 공간감을 유지한다.

------------------------------------------------------------------------

# UX Principles

사용자는 Desktop을 탐색하는 경험을 하게 된다.

Hover / Click / Scroll에 자연스럽고 직관적인 피드백을 제공한다.

------------------------------------------------------------------------

# Assets

프로젝트에서 사용하는 아이콘은 반드시 기존 Asset을 사용한다.

사용 경로

`asset/icons/`

새로운 아이콘 라이브러리나 외부 SVG를 추가하지 않는다.

------------------------------------------------------------------------

# Asset Rules

기존 프로젝트 폴더 구조를 유지한다.

다음 경로는 변경하지 않는다.

-   asset/icons/
-   asset/images/
-   css/
-   js/

파일 이동 및 폴더 구조 변경은 허용하지 않는다.

------------------------------------------------------------------------

# Figma MCP Instructions

현재 Figma 파일을 기준으로 수정한다.

레이아웃을 새롭게 제작하지 않는다.

현재 구조를 유지하면서

-   컬러
-   타이포그래피
-   여백
-   정렬
-   비율
-   UI 디테일

만 개선한다.

프로젝트 내부 Asset을 우선 사용한다.

아이콘은 반드시 `asset/icons/` 폴더의 기존 리소스를 사용한다.

------------------------------------------------------------------------

# Success Criteria

-   macOS Desktop 컨셉이 명확하게 전달된다.
-   Desktop Folder 클릭 시 해당 Section으로 이동한다.
-   Fullpage Scroll은 항상 한 화면씩 이동한다.
-   Typography가 페이지 중심 역할을 한다.
-   Sticky Note는 분위기 연출 역할을 수행한다.
-   Dock은 가장 완성도 높은 UI 요소이다.
-   Background는 Noise Texture로 은은한 질감을 제공한다.
-   전체적으로 절제되고 프리미엄한 사용자 경험을 제공한다.
