# TRD - Portfolio Main Desktop

**Project**: Portfolio Website\
**Page**: Main Desktop\
**Version**: 1.0

------------------------------------------------------------------------

# Purpose

본 문서는 메인 Desktop 페이지의 기술 구현 기준을 정의한다.

PRD의 디자인 요구사항을 기반으로 구현하며, 기술 스택은 성능과
유지보수성을 고려하여 선택한다.

------------------------------------------------------------------------

# Technical Stack

-   HTML5
-   CSS3
-   Vanilla JavaScript (ES6+)
-   GSAP (필요한 애니메이션에 한해 사용)

단순한 Hover 및 Transition은 CSS를 우선 사용한다.

복잡한 Timeline 애니메이션과 Section 이동은 GSAP 사용을 권장한다.

불필요하게 모든 애니메이션을 GSAP으로 구현하지 않는다.

------------------------------------------------------------------------

# Fullpage Scroll

-   전체 사이트는 Fullpage Scroll 구조를 사용한다.
-   한 번의 스크롤마다 하나의 Section만 이동한다.
-   일반적인 연속 스크롤은 허용하지 않는다.
-   휠 및 터치패드 모두 동일한 UX를 제공한다.
-   각 Section은 Viewport 전체를 차지한다.

------------------------------------------------------------------------

# Folder Navigation

Desktop Folder 클릭 시 해당 Section으로 이동한다.

Profile → Profile

Web Publishing → Web Publishing

UI/UX Design → UI/UX Design

Graphic Design → Graphic Design

이동은 부드럽고 자연스럽게 처리한다.

------------------------------------------------------------------------

# Live Clock

우측 상단 Menu Bar 시계는 실제 현재 시간을 표시한다.

요구사항

-   시스템 시간 사용
-   1초마다 갱신
-   요일 + 시간 표시
-   브라우저 Locale 사용

------------------------------------------------------------------------

# Center Typography Animation

KO KAEUN은 항상 고정한다.

Role Text만 자동 순환한다.

순환 목록

-   UX/UI Designer
-   Web Publisher
-   Frontend Developer
-   Creative Thinker

요구사항

-   자연스러운 전환
-   Blur
-   Fade
-   Vertical Motion
-   무한 반복
-   사용자의 집중을 방해하지 않는 속도

------------------------------------------------------------------------

# Initial Load Animation

Desktop 최초 진입 시

Top Menu

↓

Sticky Note

↓

Desktop Icons

↓

Center Typography

↓

Dock

순서대로 자연스럽게 등장한다.

과도한 연출은 사용하지 않는다.

------------------------------------------------------------------------

# Desktop Icon Hover

Hover 시

-   Scale
-   TranslateY
-   Shadow

선택되었다는 피드백만 제공한다.

------------------------------------------------------------------------

# Dock

Dock은 Glass Style을 사용한다.

Hover 시

-   Scale
-   TranslateY
-   Tooltip

macOS와 유사한 인터랙션을 제공한다.

------------------------------------------------------------------------

# Sticky Note

애니메이션을 적용하지 않는다.

고정된 내용만 표시한다.

장식 요소로만 사용한다.

------------------------------------------------------------------------

# Background

Background Color

#0F0F10

Noise Texture 적용

-   Opacity 2\~3%
-   매우 작은 입자
-   성능을 저하시키지 않는 방식 사용

------------------------------------------------------------------------

# Top Menu

Hover Feedback 제공

Menu Bar는 항상 상단에 고정한다.

------------------------------------------------------------------------

# Responsive

Desktop 우선 제작

Tablet, Mobile에서도 레이아웃이 깨지지 않아야 한다.

------------------------------------------------------------------------

# Performance

-   CSS Transition 우선 사용
-   Transform 기반 애니메이션 사용
-   Layout Thrashing 최소화
-   불필요한 Repaint 방지
-   애니메이션 성능 최적화

------------------------------------------------------------------------

# Assets

기존 프로젝트 구조를 유지한다.

다음 경로를 변경하지 않는다.

-   asset/icons/
-   asset/images/
-   css/
-   js/

아이콘은 반드시

asset/icons/

폴더의 기존 리소스를 사용한다.

새로운 아이콘 라이브러리를 추가하지 않는다.

------------------------------------------------------------------------

# Implementation Rules

-   현재 프로젝트 구조를 유지한다.
-   새로운 Framework를 추가하지 않는다.
-   CSS, Vanilla JavaScript, GSAP을 상황에 맞게 조합한다.
-   단순한 효과는 CSS를 우선 사용한다.
-   복잡한 Timeline 기반 애니메이션만 GSAP 사용을 권장한다.
-   유지보수성과 성능을 우선 고려한다.

------------------------------------------------------------------------

# Success Criteria

-   Fullpage Scroll이 자연스럽게 동작한다.
-   Folder 클릭 시 정확한 Section으로 이동한다.
-   Menu Bar 시계가 실시간으로 동작한다.
-   Center Typography가 부드럽게 순환한다.
-   Dock Hover가 macOS처럼 자연스럽다.
-   Noise Texture가 은은한 질감을 제공한다.
-   성능 저하 없이 모든 인터랙션이 동작한다.
