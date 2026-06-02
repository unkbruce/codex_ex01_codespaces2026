# Car CRUD Admin

Express REST API와 React 화면을 연결해 자동차 정보를 조회, 추가, 수정, 삭제할 수 있는 풀스택 CRUD 실습 프로젝트입니다.

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000000)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=ffffff)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=ffffff)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=000000)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=ffffff)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=ffffff)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=000000)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=ffffff)

## 배포 주소

| 구분 | 주소 |
| --- | --- |
| Frontend | [https://car-crud-frontend.onrender.com](https://car-crud-frontend.onrender.com) |
| Backend API | [https://car-crud-api-ue60.onrender.com](https://car-crud-api-ue60.onrender.com) |
| Health Check | [https://car-crud-api-ue60.onrender.com/health](https://car-crud-api-ue60.onrender.com/health) |
| Cars API | [https://car-crud-api-ue60.onrender.com/cars](https://car-crud-api-ue60.onrender.com/cars) |

## 화면 미리보기

![Car CRUD Admin 화면 미리보기](docs/images/car-admin-preview.png)

## 프로젝트 문서

| 문서 | Markdown | PDF |
| --- | --- | --- |
| 요구사항 정의서 | [보기](docs/requirements/requirements.md) | [보기](docs/requirements/requirements.pdf) |
| 와이어프레임 | [보기](docs/wireframe/wireframe.md) | [보기](docs/wireframe/wireframe.pdf) |

## 주요 기능

- 자동차 목록 조회
- 자동차 추가
- 자동차 수정
- 자동차 삭제
- React 화면과 Express API 연동
- Tailwind CSS 기반 관리자 UI
- Render를 이용한 백엔드/프론트엔드 배포
- GitHub Actions를 이용한 CI 구성

## 기술 스택

| 영역 | 기술 |
| --- | --- |
| Frontend | React, Vite, Tailwind CSS |
| Backend | Node.js, Express |
| Data | 메모리 배열 |
| Deploy | Render |
| CI | GitHub Actions |
| Version Control | Git, GitHub |

## 프로젝트 구조

```text
.
├── package.json              # Express 백엔드 실행 스크립트와 의존성
├── package-lock.json
├── README.md                 # 프로젝트 설명 문서
├── src
│   └── server.js             # Express 서버와 자동차 CRUD REST API
├── frontend
│   ├── index.html
│   ├── package.json          # React/Vite 실행 스크립트와 의존성
│   ├── package-lock.json
│   ├── vite.config.js        # 개발 환경에서 /api 요청을 백엔드로 전달하는 프록시 설정
│   └── src
│       ├── App.jsx           # 자동차 관리 CRUD 화면
│       ├── App.css           # Tailwind CSS import 및 기본 스타일
│       └── main.jsx
├── docs
│   ├── images
│   │   └── car-admin-preview.png
│   ├── requirements
│   │   ├── requirements.md   # 요구사항 정의서 Markdown 원본
│   │   ├── requirements.html # 요구사항 정의서 PDF 생성용 HTML
│   │   └── requirements.pdf  # 요구사항 정의서 PDF
│   └── wireframe
│       ├── wireframe.md      # 화면 와이어프레임 Markdown 원본
│       ├── wireframe.html    # 와이어프레임 PDF 생성용 HTML
│       └── wireframe.pdf     # 와이어프레임 PDF
└── .github
    └── workflows
        └── ci.yml            # GitHub Actions CI 워크플로우
```

## API 명세

| Method | Endpoint | 설명 |
| --- | --- | --- |
| GET | `/health` | 서버 상태를 확인합니다. |
| GET | `/cars` | 자동차 목록 전체를 조회합니다. |
| GET | `/cars/:id` | 특정 ID의 자동차 정보를 조회합니다. |
| POST | `/cars` | 새 자동차 정보를 추가합니다. |
| PUT | `/cars/:id` | 특정 ID의 자동차 정보를 수정합니다. |
| DELETE | `/cars/:id` | 특정 ID의 자동차 정보를 삭제합니다. |

자동차 데이터는 데이터베이스가 아니라 Express 서버의 메모리 배열에 저장됩니다. 서버를 재시작하면 데이터는 초기값으로 돌아갑니다.

## 로컬 실행 방법

백엔드와 프론트엔드는 각각 다른 터미널에서 실행합니다.

### 1. 백엔드 실행

프로젝트 루트 폴더에서 의존성을 설치하고 Express 서버를 실행합니다.

```bash
npm install
npm start
```

백엔드 서버는 기본적으로 `http://localhost:3000`에서 실행됩니다.

확인 명령어:

```bash
curl http://localhost:3000/health
curl http://localhost:3000/cars
```

### 2. 프론트엔드 실행

새 터미널을 열고 `frontend` 폴더에서 Vite 개발 서버를 실행합니다.

```bash
cd frontend
npm install
npm run dev
```

프론트엔드는 기본적으로 `http://localhost:5173`에서 실행됩니다.

개발 환경에서는 React가 `/api/cars`로 요청하고, Vite proxy가 이 요청을 Express 서버의 `/cars`로 전달합니다.

```text
React fetch('/api/cars')
  -> Vite dev server proxy
  -> http://localhost:3000/cars
```

## 프론트엔드 빌드

정적 배포용 파일은 `frontend` 폴더에서 빌드합니다.

```bash
cd frontend
npm run build
```

빌드 결과물은 `frontend/dist` 폴더에 생성됩니다.

## 배포 구조

이 프로젝트는 Render에서 백엔드와 프론트엔드를 분리해서 배포했습니다.

| 영역 | Render 서비스 | 설명 |
| --- | --- | --- |
| Backend | Web Service | Express REST API 서버를 실행합니다. |
| Frontend | Static Site | Vite로 빌드한 정적 파일을 배포합니다. |

백엔드는 Render Web Service에서 `npm start`로 실행됩니다. Express 서버는 `process.env.PORT || 3000`을 사용하므로 Render가 제공하는 `PORT` 환경변수에 맞춰 실행됩니다.

프론트엔드는 Render Static Site로 배포되며, 정적 배포 환경에서는 Vite 개발 프록시가 동작하지 않습니다. 따라서 Render Static Site의 Rewrite 설정을 통해 `/api/*` 요청을 백엔드 API로 연결합니다.

| 항목 | 설정값 |
| --- | --- |
| Source Path | `/api/*` |
| Destination Path | `https://car-crud-api-ue60.onrender.com/*` |
| Action | `Rewrite` |

이 설정을 적용하면 프론트엔드에서 보내는 `/api/cars` 요청이 백엔드의 `/cars` API로 전달됩니다.

```text
https://car-crud-frontend.onrender.com/api/cars
  -> Render Static Site Rewrite (/api/*)
  -> https://car-crud-api-ue60.onrender.com/cars
```

## GitHub Actions CI

`.github/workflows/ci.yml`은 `main` 브랜치에 push되면 자동으로 실행됩니다.

CI에서 확인하는 내용은 다음과 같습니다.

1. 백엔드 의존성 설치 확인
2. Express 서버 실행 후 `/health` 응답 확인
3. 프론트엔드 의존성 설치 확인
4. 프론트엔드 `npm run build` 실행 확인

GitHub Actions 결과에 초록 체크가 표시되면 기본 설치와 빌드가 정상적으로 완료된 것입니다.

## 학습 포인트

- Express에서 REST API를 구성하는 방법
- React에서 fetch API로 백엔드와 통신하는 방법
- Vite proxy와 Render Rewrite 설정의 차이
- GitHub Actions를 통한 기본 CI 구성
- Render를 이용한 백엔드/프론트엔드 분리 배포

## 향후 개선사항

- 실제 데이터베이스 연동
- 로그인 기능 추가
- 자동차 검색/필터 기능 추가
- 목록 페이지네이션 적용
- 배포 환경변수 관리 개선
