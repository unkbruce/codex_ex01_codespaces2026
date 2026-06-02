# codex_ex01_codespaces2026

## 프로젝트 개요

이 저장소는 Express 기반 자동차 REST API와 Vite 기반 React 프론트엔드를 함께 실습하는 프로젝트입니다.

## 프로젝트 구조

```text
.
├── .devcontainer
│   └── devcontainer.json
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
├── frontend
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src
│       ├── App.css
│       ├── App.jsx
│       └── main.jsx
└── src
    └── server.js
```

### 파일 설명

- `.devcontainer/devcontainer.json`: Dev Container 설정 파일입니다. 현재 파일 내용은 비어 있습니다.
- `.gitignore`: Node.js 및 일반적인 JavaScript 프로젝트 산출물을 제외하기 위한 ignore 설정입니다.
- `package.json`: Express API 서버의 메타데이터, 의존성, 실행 스크립트를 정의합니다.
- `package-lock.json`: Express API 서버의 npm 의존성 버전을 고정합니다.
- `src/server.js`: Express 서버 엔트리포인트이며 REST API 라우트를 정의합니다.
- `frontend/package.json`: React 프론트엔드의 의존성과 Vite 실행 스크립트를 정의합니다.
- `frontend/vite.config.js`: `/api` 요청을 Express 서버로 전달하는 Vite 프록시 설정입니다.
- `frontend/src/App.jsx`: `GET /cars` API를 호출하고 자동차 목록을 표로 표시하는 React 컴포넌트입니다.

## API

### `GET /health`

서버 상태를 확인하는 엔드포인트입니다.

응답 예시:

```json
{
  "status": "ok"
}
```

### `GET /cars`

자동차 목록을 조회하는 엔드포인트입니다.

응답 예시:

```json
[
  {
    "id": 1,
    "name": "Sonata",
    "manufacturer": "Hyundai",
    "year": 2023,
    "price": 32000000
  }
]
```

## 실행 방법

### 1. Express API 서버 실행

루트 폴더에서 의존성을 설치하고 서버를 실행합니다.

```bash
npm install
npm start
```

서버는 기본적으로 `http://localhost:3000`에서 실행됩니다. 다른 포트를 사용하려면 `PORT` 환경변수를 지정하세요.

```bash
PORT=4000 npm start
```

API 동작은 다음 명령으로 확인할 수 있습니다.

```bash
curl http://localhost:3000/health
curl http://localhost:3000/cars
```

### 2. React 프론트엔드 실행

새 터미널을 열고 `frontend` 폴더에서 의존성을 설치한 뒤 Vite 개발 서버를 실행합니다.

```bash
cd frontend
npm install
npm run dev
```

Vite 개발 서버는 기본적으로 `http://localhost:5173`에서 실행됩니다.

### 3. 프록시 동작 방식

React 코드는 `/api/cars`로 요청합니다. Vite 개발 서버가 이 요청을 Express 서버의 `/cars`로 전달하므로, 기존 Express API 경로는 변경하지 않아도 됩니다.

```text
React fetch('/api/cars') -> Vite proxy -> Express GET /cars
```

## 현재 상태 확인

저장소에 포함된 파일은 다음 명령으로 확인할 수 있습니다.

```bash
find . -maxdepth 4 -type f -not -path './.git/*' -not -path './node_modules/*' -not -path './frontend/node_modules/*'
```
