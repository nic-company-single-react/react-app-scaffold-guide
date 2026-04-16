---
sidebar_position: 4
displayed_sidebar: "assetsDocSidebar"
title: "빌드하기"
---

# 빌드

:::info 내용
- 개발이 완료된 후 실제 서비스에 배포하기 위해 소스 코드를 빌드해야 합니다.
- `npm run build` 명령어를 실행하면, 최적화된 정적 파일들이 `build` 폴더에 생성됩니다.
- 빌드 과정에서는 코드 압축, 환경 변수 적용, 번들링 등이 자동으로 처리됩니다.
- 빌드된 파일들은 웹 서버(예: Nginx, AWS S3 등)에 업로드하여 배포할 수 있습니다.
:::


## 빌드 진행 방법

1. **의존성 설치**  
   혹시 의존성 패키지 설치가 되지 않았다면, 프로젝트 루트 디렉토리에서 아래 명령어로 필요한 패키지를 먼저 설치합니다.
   ```bash
   npm install
   ```

2. **환경 변수 설정**
   `.env.local`, `.env.development`, `.env.production` 등의 환경 변수 파일을 필요에 따라 설정합니다.<br />
   (예시: API_ENDPOINT, PUBLIC_URL 등)

3. **프로덕션 빌드 실행**
   로컬 PC에서 아래 명령어를 실행하여 빌드를 진행해 봅니다. 만약 빌드 오류가 발생한다면, 오류 메시지를 확인하여 문제를 해결합니다.
   ```bash
   npm run build
   ```

   - 실행 결과, `.next/` 폴더가 생성되고, 빌드된 서버·클라이언트 아티팩트와 정적 파일들이 이곳에 위치합니다.
   - Next.js에서는 코드 난독화, 압축, 번들링, 환경 변수 주입 등이 자동으로 처리되며, CRA(Create React App)와는 빌드 구조와 동작 방식에 차이가 있습니다.

4. **프로덕션 배포**
   - Next.js는 `build` 폴더가 아닌 `.next` 폴더에 빌드 결과물이 생성되며, 일반적으로 빌드된 `.next` 폴더와 함께 프로젝트의 소스 코드(예: `package.json`, `next.config.js` 등)를 포함하여 서버에 배포합니다.
   - Vercel, Netlify, AWS EC2, 컨테이너(Docker 등)와 같은 다양한 서버에 배포할 수 있으며, 각 플랫폼의 방법에 맞게 배포를 진행합니다.
   - S3와 같은 정적 호스팅의 경우 Next.js의 정적 export 기능(`next export`)을 이용해야 하나, 대부분의 경우 SSR/ISR 기능을 제대로 활용하려면 Node.js 런타임이 지원되는 서버 환경 배포가 필요합니다.
   - 만약 프로젝트의 CI/CD 파이프라인이 있다면, GIT push 후 자동으로 빌드 및 배포가 진행됩니다.

## 추가 안내

- 빌드 에러 발생 시, 터미널 오류 로그를 보고 빠진 의존성 또는 환경 변수, 코드 오류 등을 점검하세요.
- `build` 폴더는 자동 생성되는 결과물이므로, 보통 Git 등 형상관리에서는 무시(.gitignore)하는 것이 일반적입니다.
- 필요에 따라 `serve` 같은 정적 파일 서버 도구를 사용하여 로컬에서도 빌드 결과물을 테스트할 수 있습니다.
  ```bash
  npm run start
  ```

## 참고

- [Next.js 공식 빌드 및 배포 가이드](https://nextjs.org/docs/app/building-your-application/deploying)
- 프로젝트 구조나 빌드 방식에 따라 약간의 차이가 있을 수 있습니다.


