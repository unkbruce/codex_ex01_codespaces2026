# Express 자동차 REST API + React CRUD 실습

## 프로젝트 소개

이 프로젝트는 Codespaces + Codex 환경에서 Express 백엔드와 Vite 기반 React 프론트엔드를 함께 실습하기 위한 자동차 CRUD 예제입니다.

백엔드는 데이터베이스를 사용하지 않고 메모리 배열 `carList`에 자동차 데이터를 저장합니다. 프론트엔드는 Vite 프록시를 통해 Express API에 요청하고, 자동차 목록 조회, 추가, 수정, 삭제 기능을 화면에서 실행합니다. React 화면 스타일은 Tailwind CSS를 적용해 관리자 화면 형태로 구성했습니다.

## Codespaces 실행 환경

이 프로젝트는 Node.js 20 기반 Codespaces Dev Container에서 실행하도록 설정되어 있습니다.

`.devcontainer/devcontainer.json`은 `mcr.microsoft.com/devcontainers/javascript-node:1-20-bookworm` 이미지를 사용합니다. 이 이미지에는 Node.js와 npm이 포함되어 있어 루트 Express 서버와 `frontend`의 Vite React 앱을 실행할 수 있습니다.

Dev Container 설정을 처음 추가했거나 수정한 뒤에는 Codespaces에서 반드시 컨테이너를 다시 빌드해야 합니다.

1. VS Code Command Palette를 엽니다.
2. `Codespaces: Rebuild Container` 또는 `Dev Containers: Rebuild Container`를 실행합니다.
3. Rebuild가 끝난 뒤 새 터미널에서 `node -v`와 `npm -v`를 확인합니다.


## 폴더 구조

```text
.
├── package.json              # Express 서버 의존성 및 실행 스크립트
├── package-lock.json
├── README.md
├── src
│   └── server.js             # Express 서버와 자동차 CRUD REST API
└── frontend
    ├── index.html
    ├── package.json          # React/Vite 의존성 및 실행 스크립트
    ├── vite.config.js        # /api 요청을 Express 서버로 전달하는 프록시 설정
    └── src
        ├── App.jsx           # 자동차 CRUD 화면
        ├── App.css           # Tailwind CSS import 및 기본 스타일
        └── main.jsx
```

## 백엔드 실행 방법

루트 폴더에서 의존성을 설치하고 Express 서버를 실행합니다.

Dev Container가 새로 만들어질 때 `postCreateCommand`가 루트와 `frontend` 의존성을 설치합니다. 이미 설치되어 있다면 `npm install`은 생략할 수 있습니다.

```bash
npm install
npm start
```

서버는 기본적으로 `http://localhost:3000`에서 실행됩니다.

다른 포트를 사용하려면 `PORT` 환경변수를 지정할 수 있습니다.

```bash
PORT=4000 npm start
```

## Tailwind CSS 적용 내용

프론트엔드에는 Tailwind CSS가 적용되어 있습니다.

- `frontend/package.json`에 `tailwindcss`와 `@tailwindcss/vite` 의존성을 추가했습니다.
- `frontend/vite.config.js`에서 Tailwind Vite 플러그인을 React 플러그인과 함께 사용합니다.
- `frontend/src/App.css`는 `@import "tailwindcss";`를 중심으로 정리하고, 화면 스타일은 `frontend/src/App.jsx`의 Tailwind 유틸리티 클래스로 적용합니다.

## 프론트엔드 실행 방법

새 터미널을 열고 `frontend` 폴더에서 의존성을 설치한 뒤 Vite 개발 서버를 실행합니다.

Dev Container 생성 후 의존성이 이미 설치되어 있다면 `npm install`은 생략할 수 있습니다.

```bash
cd frontend
npm install
npm run dev
```

Vite 개발 서버는 기본적으로 `http://localhost:5173`에서 실행됩니다.

## 백엔드와 프론트엔드 동시 실행 방법

터미널 2개를 열어 백엔드와 프론트엔드를 동시에 실행합니다.

첫 번째 터미널에서는 루트 폴더에서 Express 서버를 실행합니다.

```bash
npm start
```

두 번째 터미널에서는 `frontend` 폴더에서 Vite 개발 서버를 실행합니다.

```bash
cd frontend
npm run dev
```

브라우저에서는 `http://localhost:5173`으로 접속합니다. React는 계속 `/api/cars`로 요청하고, Vite 프록시가 Express 서버의 `/cars`로 전달합니다.

## API 목록

자동차 데이터 형식은 다음 필드를 사용합니다.

```json
{
  "_id": 1,
  "name": "Sonata",
  "company": "Hyundai",
  "year": 2023,
  "price": 32000000
}
```

### `GET /health`

Express 서버 상태를 확인합니다.

```bash
curl http://localhost:3000/health
```

### `GET /cars`

자동차 목록을 조회합니다.

```bash
curl http://localhost:3000/cars
```

### `GET /cars/:id`

특정 자동차를 조회합니다.

```bash
curl http://localhost:3000/cars/1
```

### `POST /cars`

자동차를 추가합니다.

```bash
curl -X POST http://localhost:3000/cars \
  -H "Content-Type: application/json" \
  -d '{"name":"Avante","company":"Hyundai","year":2024,"price":25000000}'
```

### `PUT /cars/:id`

자동차 정보를 수정합니다.

```bash
curl -X PUT http://localhost:3000/cars/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Sonata Hybrid","company":"Hyundai","year":2024,"price":37000000}'
```

### `DELETE /cars/:id`

자동차를 삭제합니다.

```bash
curl -X DELETE http://localhost:3000/cars/1
```

## 프록시 구조 설명

Express 서버의 실제 API 경로는 `/cars`입니다. React 코드에서는 Vite 개발 서버 기준으로 `/api/cars`에 요청합니다.

`frontend/vite.config.js`의 proxy rewrite 설정이 `/api` 접두사를 제거해서 Express 서버로 전달합니다.

```text
React fetch('/api/cars')
  -> Vite dev server proxy
  -> http://localhost:3000/cars
```

예를 들어 React에서 `DELETE /api/cars/1`을 호출하면 Express 서버에는 `DELETE /cars/1`로 전달됩니다.

## 화면 구성 설명

React 화면은 Tailwind CSS로 다음과 같이 구성되어 있습니다.

- 상단 헤더: 자동차 관리 화면의 제목과 설명을 표시합니다.
- 자동차 입력 카드: 이름, 제조사, 연식, 가격을 입력하고 자동차를 추가하거나 수정합니다.
- 수정 모드 표시: 목록의 수정 버튼을 누르면 폼 제목과 배지가 수정 모드로 바뀝니다.
- 자동차 목록 테이블: 자동차 데이터를 표 형태로 보여주며 수정 버튼과 삭제 버튼을 구분된 색상으로 제공합니다.
- 반응형 처리: 작은 화면에서는 입력 폼이 세로로 배치되고, 테이블은 가로 스크롤로 확인할 수 있습니다.

## CRUD 사용 흐름

1. 백엔드 서버를 `npm start`로 실행합니다.
2. 프론트엔드 서버를 `cd frontend && npm run dev`로 실행합니다.
3. 브라우저에서 `http://localhost:5173`을 엽니다.
4. 화면이 처음 열리면 React가 `GET /api/cars`로 자동차 목록을 불러옵니다.
5. 입력 폼에 자동차 이름, 제조사, 연식, 가격을 입력하고 자동차를 추가합니다.
6. 목록의 `수정` 버튼을 누르면 선택한 자동차 정보가 폼에 채워지고, `수정 저장`으로 변경 내용을 저장합니다.
7. 목록의 `삭제` 버튼을 누르면 선택한 자동차가 메모리 배열에서 삭제됩니다.

## 테스트 방법

백엔드는 `curl`로 각 API를 직접 확인할 수 있습니다.

```bash
curl http://localhost:3000/health
curl http://localhost:3000/cars
```

프론트엔드는 브라우저에서 `http://localhost:5173`에 접속한 뒤 추가, 수정, 삭제 버튼을 눌러 동작을 확인합니다.

메모리 배열을 사용하므로 Express 서버를 재시작하면 자동차 데이터는 초기값으로 돌아갑니다.

## Codespaces에서 다음 실행 순서

1. Codespaces에서 `Rebuild Container`를 실행합니다.
2. Rebuild가 끝난 뒤 터미널에서 `node -v`와 `npm -v`를 확인합니다.
3. 루트 폴더에서 `npm install`을 실행합니다. Dev Container가 이미 설치했다면 생략할 수 있습니다.
4. 루트 폴더에서 `npm start`로 Express 서버를 실행합니다.
5. 새 터미널에서 `cd frontend`로 이동합니다.
6. `npm install`을 실행합니다. Dev Container가 이미 설치했다면 생략할 수 있습니다.
7. `npm run dev`로 Vite React 개발 서버를 실행합니다.
8. 브라우저에서 `http://localhost:5173`에 접속합니다.
