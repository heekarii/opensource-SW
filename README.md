# ForkCup - 식당 리뷰 서비스

ForkCup은 사용자가 식당을 검색하고, 지도에서 위치를 확인하며, 메뉴 정보와 리뷰를 조회/작성하고, 마음에 드는 식당을 찜할 수 있는 웹 기반 식당 리뷰 서비스입니다.

### 본 서비스는 웹서버 상에 배포되어 있는 서비스입니다.
FrontEnd(Vercel) : https://opensource-sw.vercel.app
BackEnd(Render) : https://opensource-sw.onrender.com
Swagger : https://opensource-sw.onrender.com/swagger-ui/index.html

## 1. 프로젝트 소개

이 프로젝트는 React 기반 프론트엔드와 Spring Boot 기반 백엔드로 구성된 풀스택 웹 애플리케이션입니다.

주요 기능은 다음과 같습니다.

* 회원가입 및 로그인
* JWT 기반 사용자 인증
* 식당 목록 조회 및 검색
* 식당 상세 정보 조회
* 식당 위치 지도 표시
* 메뉴 정보 조회
* 리뷰 작성 및 조회
* 맛, 가격, 서비스 평점 등록
* 식당 찜 기능
* 카테고리별 식당 분류

## 2. 기술 스택

### Frontend

* React
* Vite
* JavaScript
* Tailwind CSS
* Leaflet
* React Leaflet
* Lucide React

### Backend

* Java 21
* Spring Boot 3
* Spring Web
* Spring Data JPA
* Spring Security
* JWT
* MySQL
* Lombok
* SpringDoc OpenAPI / Swagger

### Database

* MySQL

## 3. 프로젝트 구조

```bash
opensource-SW/
├── backend/
│   ├── src/
│   ├── build.gradle
│   ├── gradlew
│   ├── gradlew.bat
│   ├── Dockerfile
│   └── restaurant_review_init.sql
│
└── frontend/
    ├── public/
    ├── src/
    ├── package.json
    ├── vite.config.js
    └── .env.example
```

## 4. 실행 전 준비 사항

다음 프로그램이 설치되어 있어야 합니다.

* Git
* Java 21
* Node.js
* npm
* MySQL 8.x 이상 권장

## 5. 레포지토리 클론

```bash
git clone https://github.com/heekarii/opensource-SW.git
cd opensource-SW
```

## 6. 데이터베이스 설정

MySQL에 접속한 뒤 `backend/restaurant_review_init.sql` 파일을 실행합니다.

```bash
mysql -u root -p < backend/restaurant_review_init.sql
```

해당 SQL 파일은 다음 테이블을 생성합니다.

* `users`
* `categories`
* `restaurants`
* `menus`
* `reviews`
* `favorites`

또한 식당명, 카테고리, 위치, 리뷰, 찜 조회를 위한 인덱스를 생성합니다.

## 7. Backend 실행 방법

### 7.1 backend 폴더로 이동

```bash
cd backend
```

### 7.2 환경 변수 또는 설정 파일 준비

백엔드는 MySQL 연결 정보와 JWT 설정이 필요합니다.

예시 설정은 다음과 같습니다.

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/restaurant_review
spring.datasource.username=root
spring.datasource.password=비밀번호

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

server.port=7000

jwt.secret=충분히_긴_비밀키를_입력하세요
```

실제 비밀번호나 JWT secret은 GitHub에 올리지 말고 로컬 환경 변수나 별도 설정 파일로 관리하는 것을 권장합니다.

### 7.3 실행 권한 부여

macOS 또는 Linux에서는 처음 실행 전 Gradle wrapper에 실행 권한을 줍니다.

```bash
chmod +x gradlew
```

### 7.4 백엔드 실행

```bash
./gradlew bootRun
```

Windows에서는 다음 명령어를 사용합니다.

```bash
gradlew.bat bootRun
```

정상 실행되면 백엔드는 다음 주소에서 실행됩니다.

```bash
http://localhost:7000
```

## 8. Backend 빌드 방법

```bash
./gradlew clean build
```

테스트를 제외하고 빌드하려면 다음 명령어를 사용합니다.

```bash
./gradlew clean build -x test
```

빌드 결과물은 다음 경로에 생성됩니다.

```bash
backend/build/libs/
```

JAR 파일을 직접 실행하려면 다음과 같이 실행합니다.

```bash
java -jar build/libs/*.jar
```

## 9. Docker로 Backend 실행하기

backend 폴더에서 다음 명령어를 실행합니다.

```bash
docker build -t forkcup-backend .
docker run -p 7000:7000 forkcup-backend
```

단, Docker 실행 시에도 MySQL 연결 정보가 필요합니다. 로컬 MySQL을 사용하는 경우 컨테이너 내부에서 `localhost`는 컨테이너 자신을 의미하므로 DB 주소를 별도로 맞춰야 합니다.

예를 들어 외부 DB를 사용할 경우 환경 변수를 함께 넘길 수 있습니다.

```bash
docker run -p 7000:7000 \
  -e DB_URL=jdbc:mysql://host.docker.internal:3306/restaurant_review \
  -e DB_USERNAME=root \
  -e DB_PASSWORD=비밀번호 \
  forkcup-backend
```

## 10. Frontend 실행 방법

### 10.1 frontend 폴더로 이동

```bash
cd frontend
```

### 10.2 패키지 설치

```bash
npm install
```

### 10.3 환경 변수 설정

`frontend/.env.example` 파일을 참고하여 `.env` 파일을 생성합니다.

```bash
cp .env.example .env
```

`.env` 파일 내용은 다음과 같이 설정합니다.

```env
VITE_API_URL=http://localhost:7000
```

배포 환경에서는 백엔드 배포 주소로 변경합니다.

```env
VITE_API_URL=https://your-backend-url.com
```

### 10.4 프론트엔드 개발 서버 실행

```bash
npm run dev
```

정상 실행되면 브라우저에서 다음 주소로 접속합니다.

```bash
http://localhost:5173
```

## 11. Frontend 빌드 방법

```bash
npm run build
```

빌드 결과물은 다음 폴더에 생성됩니다.

```bash
frontend/dist/
```

빌드 결과를 미리 확인하려면 다음 명령어를 사용합니다.

```bash
npm run preview
```

## 12. 사용 방법

### 12.1 회원가입

사용자는 이메일, 비밀번호, 닉네임 등의 정보를 입력하여 회원가입할 수 있습니다.

### 12.2 로그인

가입한 계정으로 로그인하면 JWT 토큰을 기반으로 인증이 처리됩니다. 로그인 후 리뷰 작성, 찜 기능 등 사용자 인증이 필요한 기능을 사용할 수 있습니다.

### 12.3 식당 조회

메인 화면에서 식당 목록을 확인할 수 있습니다. 식당은 이름, 카테고리, 위치 정보 등을 기준으로 조회할 수 있습니다.

### 12.4 지도 확인

식당의 위도와 경도 정보를 기반으로 지도에서 식당 위치를 확인할 수 있습니다.

### 12.5 메뉴 확인

식당 상세 페이지에서 해당 식당의 메뉴, 가격, 설명, 대표 메뉴 여부 등을 확인할 수 있습니다.

### 12.6 리뷰 작성

로그인한 사용자는 식당에 대해 리뷰를 작성할 수 있습니다.

리뷰에는 다음 항목이 포함됩니다.

* 맛 평점
* 가격 평점
* 서비스 평점
* 리뷰 내용
* 이미지 URL

각 평점은 1점부터 5점 사이의 값으로 입력됩니다.

### 12.7 찜 기능

사용자는 마음에 드는 식당을 찜 목록에 추가하거나 삭제할 수 있습니다.

## 13. 주요 데이터베이스 테이블 설명

### users

서비스 사용자의 계정 정보를 저장합니다.

주요 컬럼:

* `user_id`
* `email`
* `password`
* `nickname`
* `profile_image_url`
* `created_at`
* `updated_at`

### categories

식당 카테고리를 저장합니다.

예시 카테고리:

* 한식
* 중식
* 일식
* 양식
* 분식
* 카페
* 패스트푸드

### restaurants

식당 정보를 저장합니다.

주요 컬럼:

* `restaurant_id`
* `category_id`
* `name`
* `address`
* `phone`
* `description`
* `latitude`
* `longitude`
* `opening_hours`
* `image_url`

### menus

식당별 메뉴 정보를 저장합니다.

주요 컬럼:

* `menu_id`
* `restaurant_id`
* `name`
* `price`
* `description`
* `image_url`
* `is_representative`

### reviews

사용자가 작성한 식당 리뷰를 저장합니다.

주요 컬럼:

* `review_id`
* `user_id`
* `restaurant_id`
* `taste_score`
* `price_score`
* `service_score`
* `content`
* `image_url`

### favorites

사용자의 식당 찜 정보를 저장합니다.

주요 컬럼:

* `favorite_id`
* `user_id`
* `restaurant_id`
* `created_at`

## 14. API 문서

백엔드가 정상적으로 실행된 상태에서 SpringDoc Swagger UI를 사용할 수 있습니다.

```bash
http://localhost:7000/swagger-ui/index.html
```

API 명세를 확인하고 직접 요청을 테스트할 수 있습니다.

## 15. 개발용 명령어 정리

### Backend

```bash
cd backend
./gradlew bootRun
./gradlew clean build
./gradlew clean build -x test
```

### Frontend

```bash
cd frontend
npm install
npm run dev
npm run build
npm run preview
npm run lint
npm run format
npm run format:check
```

## 16. 실행 순서 요약

처음 실행하는 경우 다음 순서로 진행합니다.

```bash
git clone https://github.com/heekarii/opensource-SW.git
cd opensource-SW
```

DB 생성:

```bash
mysql -u root -p < backend/restaurant_review_init.sql
```

Backend 실행:

```bash
cd backend
chmod +x gradlew
./gradlew bootRun
```

Frontend 실행:

```bash
cd ../frontend
npm install
cp .env.example .env
npm run dev
```

브라우저 접속:

```bash
http://localhost:5173
```

## 17. 문제 해결

### 백엔드에서 DB 연결 오류가 발생하는 경우

다음 항목을 확인합니다.

* MySQL 서버가 실행 중인지 확인
* DB 이름이 `restaurant_review`인지 확인
* DB 사용자명과 비밀번호가 올바른지 확인
* `spring.datasource.url` 값이 올바른지 확인

### 프론트엔드에서 API 요청이 실패하는 경우

다음 항목을 확인합니다.

* 백엔드 서버가 `http://localhost:7000`에서 실행 중인지 확인
* `frontend/.env`의 `VITE_API_URL` 값이 올바른지 확인
* 백엔드 CORS 설정에서 프론트엔드 주소를 허용했는지 확인

### `gradlew: Permission denied` 오류가 발생하는 경우

다음 명령어로 실행 권한을 부여합니다.

```bash
chmod +x gradlew
```

### 포트 충돌이 발생하는 경우

기본 포트는 다음과 같습니다.

* Backend: `7000`
* Frontend: `5173`

이미 사용 중인 포트가 있다면 실행 중인 프로세스를 종료하거나 설정 파일에서 포트를 변경합니다.

## 18. 배포 참고

Frontend는 Vercel, Netlify 등의 정적 배포 플랫폼에 배포할 수 있습니다.

Backend는 Render, Railway, Fly.io, AWS EC2 등의 서버 환경에 배포할 수 있습니다.

배포 시에는 다음 환경 변수를 반드시 설정해야 합니다.

* DB URL
* DB 사용자명
* DB 비밀번호
* JWT Secret
* Frontend API URL

