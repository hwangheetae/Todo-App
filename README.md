# 📋Todo App 프로젝트

## 프로젝트 시작 이유와 목적

프론트엔드 개발자가 되기 위해 필요한 기술들을 학습하는 과정에서, 단순히 이론과 예제만을 따라 하는 것이 아닌, 실제 프로젝트를 통해 각 기술의 필요성과 사용 이유를 깊이 이해하고자 이 프로젝트를 시작했습니다.

## 프로젝트 목표

- 기본적인 HTML, CSS, JavaScript를 활용한 Todo 앱 구현
- 각 기술의 필요성과 사용 이유를 직접 체감하며 학습
- 프론트엔드 개발의 기본 원리와 최신 기술 트렌드 습득

## Todo 앱 발전 과정

<details>
  <summary>Vanilla JavaScript로 시작</summary>

- 초기 Todo 앱은 기본적인 HTML, CSS, JavaScript를 사용하여 작성
- `localStorage`를 사용하여 데이터를 저장하고 불러오는 기능을 구현
- 기본적인 CRUD(생성, 읽기, 업데이트, 삭제) 기능을 구현
- 체크박스를 클릭하면 완료 상태로 변경되고, 삭제 버튼을 클릭하면 항목이 삭제되는 기능을 추가
- `blur` 이벤트와 `Enter` 키 입력으로 항목을 저장하는 기능을 구현

**느낀 불편함**

- DOM 조작이 어렵다
- CSS 관리가 힘들다.
- 특히, 상태가 변경될 때마다 DOM을 직접 조작하는 것이 비효율적이라고 생각했습니다.
</details>

<details>
  <summary>Vanilla JavaScript로 SPA 구현</summary>

- Vanilla JavaScript로 SPA(Single Page Application) 구현
- 페이지 이동 없이 URL만 변경하여 다양한 페이지를 보여줄 수 있도록 설계
- history.pushState와 popstate 이벤트를 사용하여 페이지 전환 구현
- Home 페이지와 Todo 페이지를 나누어 사용자가 Home에서 Todo로 네비게이션할 수 있도록 구현
- [참고한 블로그 ](https://velog.io/@eunddodi/Vanilla-Javascript%EB%A1%9C-SPA-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-%EC%87%BC%ED%95%91%EB%AA%B0-SPA).

**느낀 불편함**

- 라이브러리를 사용하지 않고 SPA를 구현하는데 어려움을 느낌
- 코드 작성이 비효율적
</details>

<details>
  <summary>React로 전환</summary>

- 앱을 React로 마이그레이션하여 컴포넌트를 분리
- `useState`와 `useEffect`를 사용하여 상태 관리 및 사이드 이펙트를 처리
- `localStorage`를 사용하여 상태를 저장하고 복원
- `button` 과 같이 컴포넌트의 재사용이 쉬워짐

**느낀 불편함**

- 페이지 간 이동 및 라우팅이 어렵다는 문제를 느꼈습니다. SPA 구현이 복잡하고, URL 관리가 불편했습니다.
</details>

<details>
  <summary>React Router를 사용한 SPA(Single Page Application) 구현</summary>

- `react-router-dom`을 사용하여 여러 페이지를 구현
- Home 페이지와 Todo 페이지를 나누어 사용자가 Home에서 Todo로 네비게이션할 수 있도록 구현

**느낀 불편함**

- CSS 관리가 어렵고, 스타일링의 일관성을 유지하는 것이 힘들다고 느꼈습니다. 또한, 컴포넌트별로 CSS를 관리하는 것이 번거로웠습니다.
</details>

<details>
  <summary>CSS 라이브러리 적용</summary>

- Tailwind CSS를 사용하여 스타일을 관리
- 기존 CSS를 Tailwind CSS 클래스로 변환하여 유지보수성과 일관성을 높임

**느낀 불편함**

- 타입 안전성이 부족하고, 코드의 가독성이 떨어진다고 느낌
- 특히, JavaScript의 동적 타입 특성으로 인해 런타임 오류가 발생하기 쉬웠습니다.
</details>

<details>
  <summary>TypeScript로 전환</summary>

- 코드베이스를 TypeScript로 마이그레이션하여 타입 안전성을 높임
- 각 컴포넌트와 함수에 타입을 정의하여 코드의 가독성과 오류를 사전에 방지

**느낀 불편함**

- 상태 관리가 중앙 집중화되지 않아 여러 컴포넌트에서 상태를 상속받는 과정에서 코드가 지저분해짐
</details>

<details>
  <summary>Zustand를 사용한 상태 관리</summary>

- Zustand를 사용하여 상태 관리를 구현
- 상태 관리 로직을 중앙 집중화하여 컴포넌트 간 상태 공유를 쉽게 함

**느낀 불편함**

- 상태 관리가 개선되었지만, 불필요한 렌더링이 발생하여 성능 최적화가 필요하다고 느꼈습니다.
</details>

<details>
  <summary>React.memo와 useCallback을 사용한 최적화</summary>

- `React.memo`와 `useCallback`을 사용하여 불필요한 렌더링을 방지하고 성능을 최적화
- 입력 필드에 디바운싱을 적용하여 성능을 더욱 향상

**느낀 불편함**

- 데이터의 영구 저장이 필요하다고 느꼈습니다. 로컬 스토리지에만 의존하면 데이터 손실 가능성이 존재합니다.
</details>

<details>
  <summary>데이터 영구 저장을 위한 서버 도입</summary>

- Node.js와 Express를 사용하여 간단한 서버를 구축
- 서버와 클라이언트 간에 Axios를 사용하여 HTTP 요청을 처리
- 서버를 TypeScript로 변환하여 타입 안전성을 높임
- JSON 파일을 데이터베이스로 사용하여 데이터를 영구적으로 저장

**느낀 불편함**

- 네트워크 요청의 최적화가 필요하다고 느꼈습니다. 특히, 서버와 클라이언트 간의 데이터 동기화와 캐싱이 부족했습니다.
</details>

<details>
  <summary>Tanstack Query(React Query) 적용</summary>

- Tanstack Query를 사용하여 데이터 패칭, 캐싱, 동기화, 자동 리트라이 등의 기능을 구현
- 데이터 상태를 관리하고 네트워크 요청을 최적화
</details>

## 각 단계의 주요 변화 요약

- ![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=black) **Vanilla JavaScript**: 기본 CRUD 기능, `localStorage` 사용
- ![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=React&logoColor=black) **React 전환**: 컴포넌트화, 상태 관리
- ![React Router](https://img.shields.io/badge/-React_Router-CA4245?style=flat-square&logo=React-Router&logoColor=white) **React Router 도입**: SPA 구현
- ![TailwindCSS](https://img.shields.io/badge/-TailwindCSS-06B6D4?style=flat-square&logo=Tailwind-CSS&logoColor=white) **Tailwind CSS 적용**: 스타일 관리
- ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white) **TypeScript 전환**: 타입 안전성 향상
- ![Zustand](https://img.shields.io/badge/-Zustand-000000?style=flat-square&logo=Zustand&logoColor=white) **Zustand 사용**: 상태 관리 개선
- ![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=React&logoColor=black) **최적화**: `React.memo`, `useCallback`, 디바운싱
- ![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=Node.js&logoColor=white) ![Express](https://img.shields.io/badge/-Express-000000?style=flat-square&logo=Express&logoColor=white) **서버 도입**: 영구 저장, Node.js, Express, Axios
- ![React Query](https://img.shields.io/badge/-React_Query-FF4154?style=flat-square&logo=React-Query&logoColor=white) **Tanstack Query**: 데이터 패칭, 캐싱, 동기화
