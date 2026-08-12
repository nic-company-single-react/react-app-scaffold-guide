---
sidebar_position: 1
displayed_sidebar: 'startDocSidebar'
title: '프론트앤드 공통'
---

# 프론트엔드(Scaffold) 담당자 가이드

새 SI 프로젝트가 시작되면 **react-app-scaffold** 를 실제 사이트에 심고, **퍼블리셔와 업무 개발자가 바로 일을 시작할 수 있는 상태**로 만들어 주는 사람이 필요합니다.
이 문서는 그 역할을 맡은 **프론트엔드 공통 개발자(= Scaffold 담당자)** 를 위한 안내서입니다.




## 목차
---

1. [이 가이드는 누구를 위한 것인가요?](#이-가이드는-누구를-위한-것인가요)
2. [전체 작업 흐름 6단계](#전체-작업-흐름-6단계)
3. [1단계 · 반입 전 준비](#1단계--반입-전-준비)
4. [2단계 · 반입](#2단계--반입)
5. [3단계 · 내부망 초기 설정과 정상 동작 확인](#3단계--내부망-초기-설정과-정상-동작-확인)
6. [4단계 · 레이아웃·테마 기반 작업 (퍼블리셔와 함께)](#4단계--레이아웃테마-기반-작업-퍼블리셔와-함께)
7. [5단계 · 프로젝트 구조와 규칙 정리](#5단계--프로젝트-구조와-규칙-정리)
8. [6단계 · 배포 검증](#6단계--배포-검증)
9. [꼭 결정하고 넘어가야 할 것](#꼭-결정하고-넘어가야-할-것)





## 이 가이드는 누구를 위한 것인가요?
---

### 담당자의 역할

프로젝트에 참여하는 사람은 크게 세 종류이고, 이 문서는 그중 **첫 번째 사람**을 위한 것입니다.

| 역할 | 하는 일 | 참고 가이드 |
|------|---------|------------|
| **프론트엔드 공통 개발자** (이 문서) | Scaffold를 사이트에 심고, 설정·레이아웃·규칙을 갖춰 **일할 수 있는 바탕**을 만든다 | 이 페이지 |
| 퍼블리셔 | 그 바탕 위에서 **색상·디자인**을 입힌다 | [퍼블리셔 가이드](../publishing-guide/index.md) |
| 업무 개발자 | 갖춰진 환경에서 **업무 화면**을 만든다 | [개발 가이드](../../documents/dev/create-biz-pages.md) |

한 줄로 요약하면 이렇습니다.

> **"퍼블리셔와 업무 개발자가 투입되는 날, 바로 개발을 시작할 수 있게 미리 다 준비해 두는 사람"**

### 알아두면 좋은 낱말

SI 현장, 특히 금융권에서는 인터넷이 안 되는 망(폐쇄망)에서 개발하는 경우가 많습니다. 이 문서에 자주 나오는 말부터 정리합니다.

| 낱말 | 쉬운 설명 |
|------|----------|
| **폐쇄망(내부망)** | 인터넷이 연결되지 않은 회사 내부 전용 망. `npm install` 같은 인터넷 다운로드가 **안 됩니다**. |
| **반입** | 인터넷이 되는 바깥에서 만든 파일을 심사받고 내부망 안으로 **가지고 들어가는 것**. |
| **node_modules** | 프로젝트가 쓰는 라이브러리가 모여 있는 폴더. 원래는 인터넷에서 받지만, 폐쇄망에서는 **통째로 압축해서 반입**합니다. |
| **무결성 검증** | 반입한 소스가 **빠진 것 없이 잘 동작하는지** 확인하는 작업. |
| **core 불가침** | `src/core/` 폴더는 Scaffold의 엔진이라 **고치지 않는다**는 약속. 바꿀 값은 `.env` 와 `src/config/` 에서만 바꿉니다. |

:::info 이 문서가 기준으로 삼은 전제
- 라이브러리는 **`node_modules` 폴더를 통째로 반입**합니다. (내부망에서 다시 설치 불가)
- 라우터는 **HashRouter 고정** 입니다. (주소에 `#` 이 붙는 방식 → 웹서버 추가 설정이 필요 없음)
- 배포 위치(루트 `/` 인지 하위 경로인지)는 아직 정해지지 않았다고 보고 **양쪽 다 준비**합니다.
:::





## 전체 작업 흐름 6단계
---

Scaffold를 사이트에 적용하는 순서는 아래와 같습니다. **앞 단계가 끝나야 뒤 단계를 할 수 있으므로 순서대로 진행**하세요.

| 단계 | 무엇을 하나 | 어디서 하나 | 끝났다는 기준 |
|:---:|------------|-----------|-------------|
| **1** | 반입 전 준비 | 인터넷 되는 곳(외부망) | 반입할 파일 묶음이 완성됨 |
| **2** | 반입 (신청·심사·전달) | 보안 심사 | 내부망에 파일이 들어옴 |
| **3** | 초기 설정 + 정상 동작 확인 | 내부망 | `npm run dev` / `npm run build` 성공 |
| **4** | 레이아웃·테마 기반 작업 | 내부망 (퍼블리셔와 함께) | 우리 사이트 색·메뉴가 보임 |
| **5** | 구조·규칙 정리 | 내부망 | 업무 개발자가 따라 할 규칙이 문서화됨 |
| **6** | 배포 검증 | 내부망 서버 | 실제 웹서버에서 화면이 정상 표시됨 |

:::tip 걸리는 시간의 대부분은 2단계입니다
1단계 준비가 부실하면 심사에서 반려되고, 다시 신청하느라 며칠이 그냥 지나갑니다.
**1단계에서 빠진 파일이 없는지 꼼꼼히 확인**하는 것이 전체 일정을 좌우합니다.
:::





## 1단계 · 반입 전 준비
---

> **목표**: 인터넷이 되는 곳에서, 내부망에 가지고 들어갈 파일 묶음을 완성한다.
> **장소**: 인터넷이 되는 외부망 PC

내부망에 들어가면 **아무것도 새로 내려받을 수 없습니다.** 그래서 필요한 것은 여기서 전부 챙겨야 합니다.

### 1-1. Node 버전을 먼저 정하기

Scaffold에는 Node 버전을 강제하는 설정(`engines`, `.nvmrc`)이 **아직 없습니다.**
사람마다 다른 버전을 쓰면 "제 PC에서는 되는데요" 문제가 생기므로 **팀이 쓸 버전 하나를 정해 두세요.**

- 검증 기준 버전: **Node <Var k="nodeVersion" plain /> / npm <Var k="npmVersion" plain />**
- 최소 조건: Vite 8 / TypeScript 6 계열을 쓰므로 **Node 20 이상** 필수

:::warning Node 설치 파일도 함께 반입하세요
내부망 PC에는 Node가 없을 수 있습니다. 설치 파일(<Var k="nodeMsiFile" plain /> 또는 <Var k="nodeZipFile" plain />)을 반입 목록에 꼭 넣으세요.
버전 고정을 위해 `.nvmrc` 파일을 추가하거나, 반입 문서에 버전을 적어 두는 것을 권합니다.

→ Node 말고도 **Git·VSCode·Chrome 설치 파일**이 필요합니다. [1-7](#1-7-개발-도구-설치-파일-챙기기) 에서 한 번에 정리합니다.
:::

### 1-2. node_modules 만들기

```bash
# 반드시 ci 를 사용합니다 (install 이 아님)
npm ci
```

:::info 왜 `npm install` 이 아니라 `npm ci` 인가요?
- `npm install` : 상황에 따라 **버전이 바뀔 수 있고** `package-lock.json` 도 함께 수정됩니다.
- `npm ci` : `package-lock.json` 에 적힌 **정확히 그 버전 그대로** 설치합니다.

내부망에서는 다시 설치할 방법이 없으므로, **똑같이 재현되는 `npm ci`** 를 써야 합니다.
:::

설치가 끝나면 `node_modules` 폴더를 **통째로 압축**합니다. (예: `node_modules.zip`)

### 1-3. 디자인 토큰 CSS가 최신인지 확인 (자주 놓치는 부분)

색상·간격 같은 값은 `src/design-tokens/` 의 JSON 파일이 원본이고, 이것을 **CSS로 변환**해서 사용합니다.

```bash
npm run build:tokens   # JSON → CSS 변환
```

:::danger `npm run build` 에는 토큰 변환이 들어있지 않습니다
`build` 명령은 `tsc -b && vite build` 뿐이라 **토큰을 다시 만들지 않습니다.**
변환 결과물(`src/assets/styles/tokens/*.css`)이 저장소에 이미 들어 있어서 빌드는 그냥 통과하지만,
**토큰 JSON을 고쳤는데 `build:tokens` 를 돌리지 않으면 바뀐 색이 배포본에 반영되지 않습니다.**

→ 토큰 JSON을 수정했다면 **`build:tokens` 실행 후 생성된 CSS까지 반드시 커밋**하세요.
:::

### 1-4. 빌드가 되는지 미리 확인

반입한 뒤에 빌드가 안 되면 되돌릴 방법이 없습니다. **나가기 전에 반드시 확인**하세요.

```bash
npm run build:tokens
npm run build
```

### 1-5. 테스트용 브라우저 파일 결정

테스트 도구(Vitest)는 두 종류로 나뉘어 있습니다.

| 종류 | 설명 | 폐쇄망에서 |
|------|------|-----------|
| `unit` | jsdom 기반 일반 테스트 | **정상 동작** |
| `browser` | 실제 Chromium 브라우저로 실행 | 브라우저 파일을 따로 받아야 함 → **그냥 두면 실패** |

둘 중 하나를 선택하세요.

- **(a) 브라우저 캐시 폴더도 함께 반입**
  - Windows: `%USERPROFILE%\AppData\Local\ms-playwright`
  - macOS/Linux: `~/.cache/ms-playwright`
- **(b) 브라우저 테스트는 쓰지 않고 단위 테스트만 운영**
  ```bash
  npx vitest run --project unit
  ```

### 1-6. 가이드 문서도 함께 반입

지금 보고 있는 이 가이드는 **`react-app-scaffold-guide` 라는 별도의 프로젝트**입니다.
내부망에서는 인터넷 주소로 접속할 수 없으므로, **scaffold 프로젝트와 함께 반입**해서 현장에서 직접 띄워 보게 만듭니다.

#### 준비 방법

가이드도 하나의 프로젝트이므로, **1-2 에서 한 것과 똑같이** 준비하면 됩니다.

```bash
# react-app-scaffold-guide 폴더에서
npm ci          # node_modules 생성 → 통째로 압축
npm run build   # 빌드가 되는지 미리 확인
```

#### 현장 값 채워 넣기 (site-config.json)

가이드 안에서 **현장마다 달라지는 값(Node 버전, 파일서버 경로, 저장소 주소 등)은 파일 하나에 모여 있습니다.**

```sh
src/config/site-config.json    # 값의 원본
site-config.json               # 빌드하면 배포 폴더 최상단에 복사됨 (현장에서 고치는 파일)
```

:::tip JSON을 몰라도 값을 고칠 수 있습니다
가이드 사이트의 **`/site-info` 페이지**를 열면 입력창으로 값을 고치고, 완성된 `site-config.json` 을 그대로 내려받을 수 있습니다.
- **runtime 값** : 배포 폴더의 `site-config.json` 만 고치고 새로고침 → **즉시 반영** (다시 빌드할 필요 없음)
- **build 값** : 사이트 주소·상단 메뉴처럼 페이지에 박히는 값 → **다시 빌드해야 반영**

어느 쪽인지는 `/site-info` 페이지의 표에 표시됩니다.
:::

#### 현장에서 문서를 보는 방법 2가지

| 방법 | 하는 일 | 어떻게 보나 | 언제 쓰나 |
|------|--------|-----------|----------|
| **(a) 개발서버에 배포** (권장) | `npm run build` → `build/` 폴더를 개발서버에 올림 | 공유받은 **주소로 접속** | 팀 전체가 같은 문서를 보게 할 때 |
| **(b) 각자 PC에서 띄우기** | 가이드 프로젝트를 내려받아 `npm run start` | 내 PC의 `http://localhost:3002` | 개발서버가 아직 없거나, 문서를 직접 고쳐 볼 때 |

**(a) 개발서버에 배포하기**

```bash
# 가이드 프로젝트 폴더에서
npm run build     # build/ 폴더 생성 → 개발서버 웹 경로에 그대로 복사
```

배포가 끝나면 **주소를 팀 전체에 공유**하세요. 업무 개발자는 브라우저만 있으면 됩니다.

**(b) 각자 PC에서 띄우기**

```bash
# 가이드 프로젝트 폴더에서 (node_modules 가 준비되어 있어야 합니다)
npm run start     # http://localhost:3002 로 열림
```

:::warning 빌드 결과물을 더블클릭해서 열면 화면이 깨집니다
`build/` 폴더의 `index.html` 을 **파일로 직접 열면(`file://`) 동작하지 않습니다.**
반드시 **웹서버를 통해** 열어야 합니다. (위 (a) 또는 (b) 방법 사용)
:::



### 1-7. 개발 도구 설치 파일 챙기기

지금까지는 **프로젝트 파일**만 준비했습니다. 그런데 내부망 PC에는 **개발 도구 자체가 하나도 없을 수 있습니다.**
소스와 `node_modules` 를 아무리 잘 반입해도, **열어 볼 편집기와 실행할 Node 가 없으면 아무것도 못 합니다.**

각 도구의 설치 방법·설정값은 [개발환경구성](../getting-started/set-dev-env-config.md) 페이지에 정리되어 있습니다.
여기서는 **그 페이지가 요구하는 파일들을 반입 목록 관점에서** 모읍니다.

| 도구 | 반입할 파일 | 없으면 생기는 일 |
|------|-----------|----------------|
| **Node.js** | <Var k="nodeMsiFile" plain /> 또는 <Var k="nodeZipFile" plain /> | `npm run dev` 자체가 안 됨 |
| **Git** | <Var k="gitInstallerFile" plain /> | 소스 clone·형상관리 불가. Windows에서 **Git Bash 터미널도 못 씀** |
| **VSCode** | <Var k="vscodeInstallerFile" plain /> | 코드 편집기가 없음 |
| **VSCode 익스텐션** | `*.vsix` 파일 (ESLint / Prettier / GitLens 는 필수) | 저장 시 자동 정리·문법 검사가 안 되어 **코드 스타일이 제각각**이 됨 |
| **Chrome** | <Var k="chromeInstallerFile" plain /> | 개발자 도구로 화면 디버깅 불가 |
| **Chrome 확장** | `*.crx` 파일 (React DevTools / Redux DevTools / TanStack Query DevTools) | 컴포넌트 트리·상태 변화를 볼 수 없음 |

:::danger 익스텐션과 확장 프로그램은 "설치 파일"을 따로 챙겨야 합니다
가장 많이 빠뜨리는 항목입니다. 내부망에서는 **VSCode 마켓플레이스와 Chrome 웹스토어에 접속할 수 없어서**, 도구를 설치해도 익스텐션은 검색조차 되지 않습니다.

- **VSCode 익스텐션** → 외부망에서 **`.vsix` 파일로 내려받아** 반입 (설치 방법은 [개발환경구성 · VSIX 설치](../getting-started/set-dev-env-config.md) 참고)
- **Chrome 확장** → **`.crx` 파일로** 내려받아 반입 후, `chrome://extensions` 에 드래그앤드롭
:::

:::warning 오프라인 설치 시 주의 (설치 중 인터넷을 찾습니다)
- **Node msi** : 설치 중 "Automatically install the necessary tools" 옵션을 체크하면 Chocolatey·Python 등을 인터넷에서 내려받으려 합니다. → **반드시 체크 해제**
- **VSCode** : 설치 후 `update.mode`, `extensions.autoUpdate` 등을 꺼서 **외부 연결 시도를 막는 설정**이 필요합니다. (설정값은 개발환경구성 페이지에 있습니다)
:::

:::tip 반입한 설치 파일은 사내 파일서버에 올려 두세요
개발환경구성 페이지는 설치 파일을 <Var k="fileServerPath" /> 에서 내려받는 것으로 안내합니다.
반입한 파일을 **그 위치에 그대로 올려 두면**, 나중에 합류하는 개발자는 이 가이드만 보고 스스로 세팅할 수 있습니다.
파일서버 경로가 다르다면 `/site-info` 페이지에서 값을 우리 현장 경로로 바꾸세요. (3-3 참고)
:::

### 1-8. 반입 목록 최종 확인

**react-app-scaffold (본 프로젝트)**

- [ ] **소스** (`git bundle` 권장, 또는 zip) — `git bundle` 로 만들면 커밋 이력까지 그대로 옮겨집니다
- [ ] **`node_modules.zip`**
- [ ] (선택) **Playwright 브라우저 캐시**

**react-app-scaffold-guide (가이드 프로젝트)**

- [ ] **소스** (`git bundle` 또는 zip)
- [ ] **`node_modules.zip`** — 개발자가 각자 PC에서 띄워 보려면 필요합니다

**개발 도구 설치 파일** (1-7 참고)

- [ ] **Node.js** — <Var k="nodeMsiFile" plain /> 또는 <Var k="nodeZipFile" plain />
- [ ] **Git** — <Var k="gitInstallerFile" plain />
- [ ] **VSCode** — <Var k="vscodeInstallerFile" plain />
- [ ] **VSCode 익스텐션 `.vsix`** — ESLint / Prettier / GitLens (필수), 그 외 선택 익스텐션
- [ ] **Chrome** — <Var k="chromeInstallerFile" plain />
- [ ] **Chrome 확장 `.crx`** — React DevTools / Redux DevTools / TanStack Query DevTools

**서류 (2단계에서 필요)**

- [ ] **오픈소스 라이선스 목록** — 두 프로젝트 각각 (2-1 참고)

:::tip 폰트는 챙기지 않아도 됩니다
폰트는 이미 프로젝트 안에 포함되어 있습니다. (npm 패키지 + `src/assets/fonts/` 직접 보관)
**외부 CDN을 사용하지 않으므로** 폐쇄망에서도 글꼴이 깨지지 않습니다.
:::





## 2단계 · 반입
---

> **목표**: 보안 심사를 통과해 파일을 내부망 안으로 들여보낸다.
> **장소**: 보안/컴플라이언스 부서

이 단계는 개발이라기보다 **서류 작업**입니다. 회사마다 절차가 다르므로 담당 부서에 먼저 확인하세요.

### 2-1. 오픈소스 라이선스 목록 만들기

금융권에서는 **"이 프로젝트가 어떤 오픈소스를 쓰는지"** 목록 제출이 거의 필수입니다.

```bash
# 예시: 전체 의존성의 라이선스를 파일로 정리
npx license-checker --csv > licenses.csv
```

:::note 가이드 프로젝트도 대상입니다
`react-app-scaffold-guide` 도 라이브러리를 쓰는 프로젝트이므로, **두 프로젝트 각각 목록을 뽑아** 함께 제출하세요.
:::

### 2-2. 보안 검사와 신청서

- [ ] 백신/보안 스캔 통과
- [ ] 반입 신청서 작성 및 승인
- [ ] 승인 후 내부망으로 파일 전달

:::warning 반입은 한 번에 끝난다고 생각하지 마세요
빠진 파일이 있으면 다시 신청해야 하고, 심사에 며칠이 걸리기도 합니다.
1단계의 반입 목록을 **다른 사람과 함께 한 번 더 확인**하는 것이 좋습니다.
:::





## 3단계 · 내부망 초기 설정과 정상 동작 확인
---

> **목표**: 내부망에서 Scaffold가 제대로 도는지 확인하고, 우리 사이트에 맞게 설정값을 바꾼다.
> **장소**: 내부망

### 3-1. 설치와 전개

1. **개발 도구 설치** — 1-7에서 반입한 설치 파일로 **Node · Git · VSCode · Chrome** 을 설치하고, `.vsix` / `.crx` 로 익스텐션·확장까지 올립니다.
   순서와 옵션은 [개발환경구성](../getting-started/set-dev-env-config.md) 페이지를 그대로 따라 하면 됩니다.
   ```bash
   # Node 가 제대로 잡혔는지 확인
   node -v
   npm -v
   ```
2. **소스 전개** (git bundle 이면 clone, zip 이면 압축 해제)
3. **`node_modules.zip` 압축 해제** — 프로젝트 루트에 `node_modules` 폴더가 생기도록 풉니다

:::tip 설치 파일을 파일서버에 먼저 올려 두세요
내 PC에만 설치하고 끝내면, 다음 사람이 올 때마다 똑같은 파일을 다시 찾게 됩니다.
반입한 설치 파일 묶음을 <Var k="fileServerPath" /> 에 올려 두는 것이 **3-5(새 개발자 세팅)의 절반**입니다.
:::

:::danger `npm install` 을 실행하지 마세요
인터넷이 없으므로 실패할 뿐 아니라, 기존 `node_modules` 가 망가질 수 있습니다.
**압축을 푸는 것으로 설치는 끝난 것입니다.**
:::

### 3-2. 정상 동작 확인 (무결성 검증)

아래 4가지가 모두 통과해야 반입이 성공한 것입니다.

```bash
npm run dev        # 1. 개발 서버가 뜨는가
npm run build      # 2. 빌드가 되는가
npm run lint       # 3. 문법 검사가 도는가
npm run test:run   # 4. 테스트가 도는가
```

:::note 알고 있어야 할 두 가지
- **`lint` 는 `.tsx` 파일만 검사합니다.** (`eslint src/**/*.tsx`)
  `.ts` 파일까지 검사하고 싶다면 `package.json` 의 스크립트를 `src/**/*.{ts,tsx}` 로 넓히세요.
- **`test:run` 은 `unit` 과 `browser` 를 모두 실행합니다.**
  1단계에서 브라우저 파일을 반입하지 않았다면 `npx vitest run --project unit` 으로 확인하세요.
:::

### 3-3. 가이드 문서 띄우기

scaffold와 함께 반입한 **`react-app-scaffold-guide`** 도 같은 방법으로 전개합니다.
(소스 전개 → `node_modules.zip` 압축 해제)

그다음 **우리 현장 값을 채워 넣습니다.**

1. 가이드를 띄웁니다.
   ```bash
   npm run start     # http://localhost:3002
   ```
2. **`/site-info` 페이지**로 들어가 입력창에서 값을 고칩니다.
   (사내 저장소 주소, 파일서버 경로, Node 버전, 설치 파일 이름 등)
3. 완성된 `site-config.json` 을 내려받아 **원본(`src/config/site-config.json`)을 덮어쓰고 커밋**합니다.
   → 이후 누가 내려받아 띄우든 우리 현장 값이 그대로 나옵니다.

:::tip 한 번만 채워 두면 모든 문서에 반영됩니다
가이드 문서 곳곳에 적힌 주소·버전은 전부 이 파일 하나를 보고 표시됩니다.
값을 바꾸면 **모든 페이지가 한꺼번에 우리 현장 값으로 바뀝니다.**
사이트 주소·상단 메뉴처럼 페이지에 박히는 값(build 항목)만 다시 빌드하면 됩니다.
:::

**팀에 공유하는 방법을 정하세요.** (1-6 참고)

- **개발서버 배포** — `npm run build` 결과물(`build/`)을 개발서버에 올리고 **주소를 공유**합니다. 업무 개발자는 브라우저만 있으면 되므로 이 방법을 권합니다.
- **각자 PC에서 띄우기** — 개발서버가 아직 없다면, 가이드 프로젝트와 `node_modules` 를 함께 받아 `npm run start` 로 봅니다.

:::note 배포한 뒤에도 값을 고칠 수 있습니다
개발서버에 올린 폴더 최상단에도 `site-config.json` 이 복사되어 있습니다.
이 파일만 고치고 새로고침하면 **다시 빌드하지 않아도 반영**됩니다. (사이트 주소·상단 메뉴 같은 build 항목은 제외)
:::

### 3-4. 형상관리(Git) 옮기기

반입한 소스에는 **원래 저장소 주소가 그대로 남아 있습니다.** 사내 저장소로 바꿔 주세요.
보통은 해당 Scaffold 소스코드는 Git담당자가 레포지토리에 올려 주기도 합니다.

```bash
# 기존 원격 저장소 주소 확인
git remote -v

# 기존 주소 제거 후 사내 GitLab 등으로 변경
git remote remove origin
git remote add origin <사내 저장소 주소>
git push -u origin main
```

이 시점의 소스가 **팀 전체의 공통 기준점**이 됩니다.

:::note 가이드 프로젝트도 똑같이 옮기세요
`react-app-scaffold-guide` 도 사내 저장소로 옮겨 두면, 현장에 맞게 문서를 고쳐 나갈 수 있습니다.
(현장 값 수정, 우리 프로젝트 규칙 추가 등)
:::

### 3-5. 새 개발자에게 node_modules 를 어떻게 줄지 정하기

:::important 이것은 반드시 지금 정해야 합니다
나중에 개발자가 늘어날 때마다 **각자 `npm install` 을 할 수 없습니다.**
아래 중 하나를 미리 정하고, 절차를 문서로 남겨 두세요.

- 사내 파일서버에 `node_modules.zip` 을 올려 두고 내려받게 하기 (예: <Var k="fileServerPath" />)
- 사내 npm 미러(사내 저장소) 구축 — 시간이 걸리지만 가장 편함

같은 자리에 **1-7의 개발 도구 설치 파일(Node·Git·VSCode·Chrome, `.vsix`, `.crx`)도 함께** 올려 두세요.
그래야 새 개발자가 [개발환경구성](../getting-started/set-dev-env-config.md) 페이지만 보고 **처음부터 끝까지 혼자 세팅**할 수 있습니다.
:::

:::tip 가이드를 개발서버에 배포했다면
업무 개발자는 **주소로 문서를 보면 되므로** 가이드 프로젝트의 `node_modules` 까지 나눠 줄 필요가 없습니다.
각자 PC에서 띄우는 방식(1-6의 (b))을 쓸 때만 함께 배포하세요.
:::

### 3-6. 설정값 바꾸기 (가장 중요한 부분)

Scaffold에서 **우리가 고치는 곳은 딱 두 군데**입니다.

```sh
.env / .env.production   ← 환경별 값 (주소, 포트, 키 이름 등)
src/config/*.config.ts   ← 그 값을 앱에 전달하는 설정 파일
```

`src/core/` 는 **고치지 않습니다.**

#### 환경 변수(.env) 정리표

저장소에 들어 있는 env 파일은 `.env`(로컬·개발용) 와 `.env.production`(운영용) 두 개입니다.
사이트마다 다른 비밀값은 `.env.local` 에 넣으세요. (`.gitignore` 가 `*.local` 을 제외하므로 커밋되지 않습니다)

| 변수 | `.env` 기본값 | `.env.production` 기본값 | 해야 할 일 |
|------|--------------|------------------------|-----------|
| `PORT` | `5173` | `5173` | 개발 서버 포트 |
| `VITE_BASE_URL` | `/` | `/axiom/react/` | 배포 경로. **끝 슬래시 필수** |
| `VITE_ROUTER_BASENAME` | `/` | `/` | HashRouter라 **양쪽 다 `/` 로 둡니다** |
| `VITE_API_BASE_URL` | `https://jsonplaceholder.typicode.com` | `/` | ⚠️ **기본값이 외부 인터넷 주소입니다. 내부 API 주소로 반드시 교체** |
| `VITE_SERVER_URL` | `http://localhost:4000` | (빈 값) | 개발 중 API 요청을 넘겨줄 서버 주소 |
| `VITE_LOCALSTORAGE_TOKEN_NAME` | `access_token` | 동일 | 로그인 토큰을 저장할 이름 |
| `VITE_THEME_STORAGE_KEY` | `theme` | 동일 | 라이트/다크 저장 키 |
| `VITE_SPLASH_BG` / `_BG_DARK` / `_ACCENT` / `_LOGO` | `#ffffff` / `#0b0f19` / `#4f46e5` / `logo.ico` | 동일 | 첫 화면 로딩 색. **우리 브랜드 색으로 교체** |

:::danger `VITE_BASE_URL` 의 끝 슬래시
`index.html` 이 `%VITE_BASE_URL%logo.ico` 처럼 값을 그대로 이어 붙입니다.
`/axiom/react` 처럼 슬래시를 빼면 `/axiom/reactlogo.ico` 가 되어 **아이콘이 404** 가 납니다.
:::

:::note `VITE_ROUTER_BASENAME` 은 왜 항상 `/` 인가요?
이 프로젝트는 주소에 `#` 이 붙는 **HashRouter** 를 씁니다.
경로 앞부분(`/axiom/react/`)은 `VITE_BASE_URL` 이 이미 처리하므로,
여기에 또 경로를 넣으면 `#` 뒤 주소와 어긋나서 **화면이 안 나옵니다.**
:::

#### src/config 폴더

각 파일의 자세한 설명은 [앱 설정 개요](../app-config/index.md) 페이지를 참고하세요.

| 파일 | 확인할 것 |
|------|----------|
| `api.config.ts` | API 주소 (`VITE_API_BASE_URL` 을 읽어옴) |
| `auth.config.ts` | 토큰 저장 키, 로그인 경로(`/auth/login`) |
| `query.config.ts` | 캐시 정책. 비어 있으면 기본값 사용 |
| `router.config.ts` | 라우터 옵션 (`basename`) |
| `theme.config.ts` | 테마 저장 키, 기본 테마, 다크 클래스 이름 |

:::warning 로그인 화면은 아직 없습니다
`auth.config.ts` 에 `loginPath: '/auth/login'` 이 적혀 있지만, **그 경로의 화면은 아직 만들어져 있지 않습니다.**
`shared/components/router/ProtectedRoute.tsx` 도 파일만 있고 라우터에 연결되어 있지 않습니다.

→ 로그인·권한 기능이 필요하다면 **로그인 화면 제작과 `ProtectedRoute` 연결이 이 프로젝트의 몫**입니다. 범위를 미리 합의하세요.
:::

#### API 연결 방식 정하기

배포 위치가 정해지지 않았다면 두 가지 경우를 모두 준비해 두세요.

| 경우 | 설정 | 주의점 |
|------|------|-------|
| 화면과 API가 **같은 서버** | `VITE_API_BASE_URL=/` | 가장 간단합니다. HashRouter라 웹서버 추가 설정도 필요 없습니다 |
| API가 **다른 서버** | 전체 주소 입력 (`http://api.내부주소`) | 요청에 인증정보를 같이 보내는 설정(`withCredentials: true`)이 켜져 있어서, **서버 쪽에서 CORS 허용 설정이 필요**합니다 |

### 3-7. 브랜드 자산 교체

- [ ] `index.html` 의 `<title>` — 현재 `react-app-scaffold`
- [ ] `public/logo.ico`, `favicon.svg`, `icons.svg`
- [ ] 첫 화면 로딩 색상 (`VITE_SPLASH_*`)





## 4단계 · 레이아웃·테마 기반 작업 (퍼블리셔와 함께)
---

> **목표**: 우리 사이트의 겉모습(색·레이아웃·메뉴)을 만든다.
> **역할 분담**: **색상 값은 퍼블리셔**, **연결·구조·빌드는 공통 개발자**

:::info 퍼블리셔와 이렇게 나눠서 일합니다
- **퍼블리셔** : 색상 테마 파일을 만들고 값을 채웁니다 → [퍼블리셔 가이드](../publishing-guide/index.md)
- **공통 개발자(나)** : 그 파일을 프로젝트에 **연결하고**, 메뉴를 바꾸고, 빌드가 되게 합니다
:::

### 4-1. 레이아웃·테마 교체는 3곳만 바꾸면 됩니다

새 사이트용 레이아웃을 만들 때는 `src/shared/layouts/default/` 폴더를 **통째로 복사**한 뒤(예: `peoplify`), 아래 3곳만 바꿉니다.

| 순서 | 파일 | 바꾸는 내용 |
|:---:|------|-----------|
| 1 | `src/shared/layouts/index.ts` | `./default` → `./<새이름>` (레이아웃 컴포넌트) |
| 2 | `src/assets/styles/app.css` | `./themes/theme-default.css` → `./themes/theme-<새이름>.css` (색상 테마) |
| 3 | `src/assets/styles/app.css` | `./layout/default/layout.css` → `./layout/<새이름>/layout.css` (레이아웃 CSS) |

```ts title="src/shared/layouts/index.ts"
// ★ 활성 레이아웃 선택 지점
export { default as RootLayout } from './default';
```

```css title="src/assets/styles/app.css (퍼블리셔 수정 구간)"
/* 4. Theme — 색상 테마 스위치 지점 (둘 중 하나만 활성) */
@import './themes/theme-default.css';
/* @import './themes/theme-[project].css'; ← 투입 시 주석 해제 */

/* 5. Layout — 레이아웃 CSS 스위치 지점 */
@import './layout/default/layout.css';
```

:::tip 복사한 레이아웃 폴더는 그 자체로 완성품입니다
`layouts/default/` 안에는 `components` · `config` · `context` · `hooks` · `providers` 가 모두 들어 있습니다.
폴더째 복사해도 다른 곳을 건드릴 필요가 없게 만들어져 있습니다.
:::

### 4-2. 디자인 토큰 흐름 이해하기

```sh
src/design-tokens/primitive/*.json    (색·간격·글자·그림자 원본)
src/design-tokens/semantic/light.json, dark.json
        │
        │  npm run build:tokens
        ▼
src/assets/styles/tokens/primitive.css, theme-light.css, theme-dark.css   ← 자동 생성
```

:::danger 생성된 CSS 파일은 직접 고치지 마세요
`assets/styles/tokens/` 안의 CSS는 **자동으로 만들어지는 파일**입니다.
직접 고쳐도 다음에 `build:tokens` 를 돌리면 **전부 지워집니다.**
값은 반드시 `design-tokens/` 의 **JSON을 고치고 다시 변환**하세요.
:::

### 4-3. 메뉴(내비게이션) 바꾸기

메뉴는 `src/shared/layouts/default/config/navigation.tsx` 한 곳에서 관리합니다.
현재는 Scaffold 예제용 메뉴(Dev Examples / UI Components / API Examples / Utils / Store)가 들어 있으므로 **실제 업무 메뉴로 교체**하세요.

:::warning 같이 정리해야 할 것 2가지
1. **눌러도 안 열리는 메뉴 2개** — `/example/use-client-state-1`, `/example/use-client-state-2` 는 메뉴에만 있고 **화면이 없습니다.** 지우거나 화면을 만들어야 합니다. 
2. **상단 GitHub 버튼** — `AppHeader.tsx` 에 Scaffold 저장소 주소(<Var k="scaffoldRepoUrl" />)가 직접 적혀 있습니다. 내부망에서는 열리지 않으니 **버튼을 없애거나 사내 주소로 교체**하세요.
:::

### 4-4. 다크 모드 정책 정하기

- 다크 모드는 `<html>` 에 `dark` 클래스를 붙이는 방식입니다.
- 사용자의 선택은 `VITE_THEME_STORAGE_KEY` 라는 이름으로 브라우저에 저장됩니다.
- `index.html` 안의 작은 스크립트가 **화면이 그려지기 전에** 이 값을 먼저 읽습니다. → 새로고침할 때 **흰 화면이 번쩍이는 현상(FOUC)을 막아 줍니다.**
- 이 스크립트와 앱이 **같은 키를 쓰기 때문에**, 키 이름을 바꾸면 양쪽이 자동으로 함께 바뀝니다.

퍼블리셔에게는 아래 두 가지 규칙을 꼭 전달하세요.

```css
/* CSS Module 에서 다크 모드 스타일 쓰는 법 */
:global(.dark) .클래스이름 { ... }
```

```css
/* app.css 에 선언된 다크 변형 (Tailwind의 dark: 유틸이 이 규칙으로 동작) */
@custom-variant dark (&:is(.dark *));
```

### 4-5. 퍼블리셔에게 전달할 것

- [ ] [퍼블리셔 가이드](../publishing-guide/index.md) 링크 (반입한 가이드 사이트 주소와 함께)
- [ ] UI 컴포넌트 예제 페이지 (개발 모드 사이드바에서 확인 가능)
- [ ] 토큰 참조표 — `npm run storybook` 으로 띄운 뒤 `DesignTokens` 문서 확인 (인터넷 없이 현장에서 바로 실행됩니다)
- [ ] 위 4-4의 다크 모드 규칙





## 5단계 · 프로젝트 구조와 규칙 정리
---

> **목표**: 업무 개발자가 투입됐을 때 **"어디에 무엇을 만들면 되는지"** 헷갈리지 않게 규칙을 정해 둔다.

### 5-1. 예제 코드를 남길지 지울지 결정하기

Scaffold에는 학습용 예제가 들어 있는데, **두 종류의 동작이 다릅니다.**

| 예제 | 개발 모드 | 운영 빌드 | 설명 |
|------|:--------:|:--------:|------|
| `publishing/example` | 포함 | **제외** | 자동으로 빠지므로 신경 쓸 필요 없음 |
| `example` | 포함 | **포함됨** | ⚠️ **운영 빌드에도 그대로 들어갑니다** |

:::warning `example` 은 명시적으로 결정해야 합니다
`src/shared/router/index.tsx` 를 보면 `/example` 라우터가 **개발/운영 양쪽 모두에 등록**되어 있습니다.

- **남긴다** → 개발자들이 언제든 참고할 수 있음. 대신 **번들 크기가 커지고 외부에 노출**됩니다.
- **지운다** → 운영 쪽 분기에서 `/example` 등록을 제거합니다.

특히 `/example/use-api` 예제는 `VITE_API_BASE_URL` 로 `/posts` 를 호출하므로, **API 주소를 내부용으로 바꾸면 404 에러가 납니다.**
:::

```tsx title="src/shared/router/index.tsx (현재 구조)"
...(import.meta.env.DEV
    ? [
            { path: '/example', element: <RootLayout />, children: ExampleRouter },
            { path: '/publishing/example', element: <RootLayout />, children: (await import('@/publishing/example/router')).default },
        ]
    : [
            // ↓ 운영 빌드에도 example 이 들어 있습니다. 남길지 지울지 결정하세요.
            { path: '/example', element: <RootLayout />, children: ExampleRouter },
        ]),
```

### 5-2. 업무 폴더 구조 정하기

**업무 하나**는 `src/domains/` 아래에 **폴더 하나**로 만듭니다.

```sh
src/domains/<업무이름>/
├── pages/        # 화면 (라우터에 연결되는 단위)
├── components/   # 그 업무 전용 컴포넌트 (pages 구조를 그대로 따라감)
├── store/        # 그 업무 전용 상태
└── router/       # 이 업무의 라우트 목록
```

기본 규칙 두 가지만 지키면 됩니다.

- 페이지 파일 안에서 **보조 컴포넌트를 즉석으로 만들지 않습니다.** → `components/` 에 파일로 분리
- props 타입은 `export interface I<컴포넌트명>Props` 형태로 내보냅니다

### 5-3. 새 화면 추가 3단계 (업무 개발자에게 알려줄 것)

1. `domains/<업무>/pages/` 에 화면 파일 만들기
2. `domains/<업무>/router/index.tsx` 에 등록
   ```tsx
   const MyPage = loadable(() => import('../pages/MyPage'));
   // { path: 'my-page', element: <MyPage />, name: '내 화면' }
   ```
3. `shared/router/index.tsx` 에 도메인 라우터 연결 + `navigation.tsx` 에 메뉴 추가

자세한 내용은 [업무 페이지 만들기](../../documents/dev/create-biz-pages.md) 를 참고하세요.

### 5-4. 상태 관리 위치 규칙

| 어디에 쓰나 | 위치 |
|------------|------|
| 한 업무에서만 | `domains/<업무>/store/` |
| 여러 업무가 공유 | `shared/store/` |
| 앱 전체 공용 | `core/ui/store.ts` |

만드는 방법은 `@axiom/store` 의 `defineStore` / `createStore` 로 통일합니다.

자세한 내용은 [업무 스토어(Store) 만들기](../../documents/dev/create-global-state.md) 를 참고하세요.

### 5-5. 공통 기능 알려주기 (온보딩)

업무 개발자가 바로 쓸 수 있는 것들입니다. 팀에 미리 안내하세요.

| 기능 | 설명 |
|------|------|
| `@axiom/components/ui` | 공통 UI 컴포넌트 모음 (버튼·입력·모달 등) |
| `SmartTable` | 정렬·페이징·엑셀(CSV/XLSX) 내려받기가 되는 표 |
| `useApi` | 서버 데이터 조회용 훅 (react-query 기반) |
| `api-client` | 공통 axios 인스턴스. 토큰이 자동으로 붙습니다 |
| `$util` / `$ui` / `$router` | 어디서나 쓸 수 있는 전역 도구 (`main.tsx` 에서 등록) |

### 5-6. 경로 별칭(alias)

| 별칭 | 가리키는 곳 |
|------|-----------|
| `@/*` | `src/*` |
| `@axiom/components/ui` | 공통 UI 컴포넌트 |
| `@axiom/hooks` | 공통 훅 |
| `@axiom/store` | 상태 관리 도구 |

:::note `@app-types` 는 아직 못 씁니다
`vite.config.ts` 에만 등록되어 있고 `tsconfig` 에는 없어서 타입 검사에서 경로를 찾지 못합니다.
쓰려면 `tsconfig` 의 `paths` 에도 추가해야 합니다.
:::

### 5-7. 코드 스타일 확정

- **ESLint** + **Prettier** (탭 들여쓰기, 한 줄 최대 120자, 작은따옴표)
- `.vscode/settings.json` 에 저장 시 자동 정리가 설정되어 있습니다
- **브랜치 전략과 커밋 규칙**은 팀에서 합의하고 문서로 남기세요

자세한 내용은 [개발 컨벤션](../getting-started/dev-convention.md) 과 [React 스타일 가이드](../getting-started/react-style-guide.md) 를 참고하세요.





## 6단계 · 배포 검증
---

> **목표**: 실제 웹서버에 올렸을 때 문제없이 보이는지 확인한다.

### 6-1. 배포 환경 준비

:::warning 배포 관련 파일은 프로젝트에 들어 있지 않습니다
`Dockerfile`, nginx 설정, CI 스크립트가 **제공되지 않습니다.** 현장 환경에 맞춰 따로 준비해야 합니다.
:::

다행히 어려운 설정은 필요 없습니다.

- 빌드 결과물(`dist/` 폴더)을 **웹서버에 그대로 올리면 끝**입니다.
- **HashRouter 를 쓰기 때문에 웹서버의 URL 재작성(rewrite) 설정이 필요 없습니다.**
  (주소에 `#` 이 있어서 서버는 항상 첫 화면만 주면 되고, 나머지는 브라우저가 알아서 처리합니다)

### 6-2. 두 가지 배포 위치를 모두 확인

배포 경로가 확정되지 않았다면 양쪽 다 테스트해 두세요.

```bash
# (1) 하위 경로 배포 확인  — .env.production 의 VITE_BASE_URL=/axiom/react/
npm run build
npm run preview

# (2) 루트 배포 확인 — VITE_BASE_URL=/ 로 바꾼 뒤
npm run build
npm run preview
```

브라우저에서 아래 항목을 눈으로 확인합니다.

- [ ] 첫 화면이 뜨는가
- [ ] 메뉴를 눌렀을 때 화면이 바뀌는가
- [ ] 이미지·글꼴이 깨지지 않는가
- [ ] API 호출이 되는가
- [ ] 파비콘과 로딩 로고가 보이는가
- [ ] 라이트/다크 전환이 되는가

### 6-3. 운영 빌드 전 최종 점검표

- [ ] `.env.production` 의 `VITE_BASE_URL` 확정 (**끝 슬래시 확인**)
- [ ] `.env.production` 의 `VITE_API_BASE_URL` 이 **내부 주소로 바뀌었는지 확인**
- [ ] `example` 라우터를 운영에 남길지 결정 완료
- [ ] 안 열리는 메뉴 2개 정리 완료. 필요없으면 뺌.
- [ ] 상단 GitHub 버튼 정리 완료. 필요없으면 뺌.
- [ ] 토큰 JSON을 고쳤다면 `build:tokens` 실행 + 생성된 CSS 커밋 완료

### 6-4. 새 개발자 세팅 절차 시연

3단계에서 정한 방법이 **정말 되는지** 직접 해 보세요.

1. **아무것도 깔려 있지 않은 PC**에서 시작 — 파일서버의 설치 파일로 Node·Git·VSCode·Chrome 설치, `.vsix` / `.crx` 적용
2. 사내 저장소에서 소스 clone
3. 배포해 둔 `node_modules.zip` 압축 해제
4. `npm run dev` 실행 → 화면 확인

여기까지 문제없이 되면, **새로 오는 개발자도 같은 순서로 세팅할 수 있습니다.**

### 6-5. 샘플 업무 화면 1개 만들기

업무 개발자가 참고할 **본보기 화면**을 하나 만들어 두면 온보딩이 훨씬 빨라집니다.

- 라우터 등록 → API 호출 → `SmartTable` 로 목록 표시 → 입력 폼까지 한 흐름으로

### 6-6. 테스트 범위 합의

현재 들어 있는 테스트는 `SectionHeader` 관련 2개뿐이며, **"테스트가 이렇게 도는구나"를 보여주는 예시**입니다.
업무 코드에 테스트를 어디까지 작성할지 팀과 합의하고 기준을 정하세요.





## 꼭 결정하고 넘어가야 할 것
---

아래는 **나중에 바꾸기 어렵거나, 안 정하고 넘어가면 반드시 문제가 되는 항목**입니다.

| # | 결정할 것 | 왜 중요한가 | 단계 |
|:--:|----------|-----------|:---:|
| 1 | **Node 버전 고정** | 버전 강제 설정이 없어 사람마다 달라질 수 있음 | 1 |
| 2 | **개발 도구 설치 파일 반입 범위** | Node·Git·VSCode·Chrome 과 `.vsix`·`.crx` 가 빠지면 **내부망에서 도구를 설치할 방법이 없음** | 1 |
| 3 | **Playwright 브라우저 반입 여부** | 반입 안 하면 브라우저 테스트가 실패 | 1 |
| 4 | **토큰 수정 시 `build:tokens` 실행 규칙** | `build` 에 포함되지 않아 **색이 반영 안 된 채 배포**될 수 있음 | 1 / 6 |
| 5 | **새 개발자 세팅 자료 전달 방법** (설치 파일 + `node_modules`) | 인원이 늘 때마다 막힘 | 3 |
| 6 | **`VITE_API_BASE_URL` 교체** | 기본값이 **외부 인터넷 주소**라 내부망에서 동작 안 함 | 3 |
| 7 | **로그인/권한 기능 범위** | 로그인 화면과 `ProtectedRoute` 연결이 **미구현** | 3 |
| 8 | **`example` 라우터 운영 포함 여부** | 그냥 두면 **운영 빌드에 예제가 그대로 들어감** | 5 |
| 9 | **배포 경로(루트 / 하위 경로)와 웹서버 준비** | Dockerfile·nginx 설정이 **제공되지 않음** | 6 |

:::tip 마무리
6단계까지 끝나면 퍼블리셔와 업무 개발자가 **첫날부터 바로 작업을 시작**할 수 있습니다.
진행하면서 정한 값(포트, API 주소, 저장소 주소, node_modules 배포 위치 등)은 **팀 위키나 README 에 꼭 남겨 두세요.**
:::
