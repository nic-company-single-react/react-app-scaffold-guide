/**
 * 사이트(SI 현장)마다 달라지는 값의 **단일 소스는 옆의 `site-config.json` 입니다.**
 *
 * 이 파일에는 값이 들어있지 않습니다. "어떤 값이 있고, 그 값이 무슨 뜻이며,
 * 언제 반영되는지"만 정의합니다. 실제 값은 두 경로로 들어옵니다.
 *
 *   1) 빌드 시   : 옆의 site-config.json 을 그대로 import → 기본값
 *                  (빌드가 끝나면 배포 폴더 최상단에도 그대로 복사됩니다)
 *   2) 브라우저 : 배포된 site-config.json 을 fetch → 위 기본값을 덮어씀
 *
 * 덕분에 현장에서는 배포 폴더의 JSON 파일 하나만 고치면 되고,
 * 같은 값을 소스 여러 곳에 중복해서 적을 필요가 없습니다.
 *
 * ── 새 설정값을 추가하는 방법 (이 폴더 안에서 다 끝납니다) ─────
 *   1) 옆의 site-config.json 에 "키": "값" 을 넣습니다.
 *   2) 아래 SITE_CONFIG_FIELDS 에 같은 키로 설명을 추가합니다.
 *      - applyAt 은 그 값을 어디서 쓰느냐로 정합니다.
 *          문서 본문에서만 쓴다        → "runtime" (재빌드 없이 즉시 반영)
 *          docusaurus.config.ts 에서도 → "build"   (다시 빌드해야 반영)
 *   3) 문서에서 <Var k="키이름" /> 또는 <VarCode> 안의 {{키이름}} 으로 씁니다.
 *   4) npm start 후 /site-info 에서 새 항목이 보이는지 확인합니다.
 *
 *   키 목록(SiteConfigKey)은 JSON 에서 자동으로 만들어지므로 따로 손댈 필요가
 *   없고, 2) 를 빠뜨리면 컴파일 오류로 알려 줍니다. 오타를 내면 타입이 맞지
 *   않아 <Var k="..." /> 에서 바로 잡힙니다.
 */

import rawSiteConfig from "./site-config.json";

/**
 * 설정 키 목록. **site-config.json 에서 자동으로 만들어집니다.**
 * 여기에 손으로 키를 추가할 필요가 없습니다. JSON 에 키를 넣으면 바로 생깁니다.
 *
 * 단, `_readme` 처럼 설명을 적어 두는 키는 설정값이 아니므로 제외합니다.
 * JSON 에 설명/구분용 줄을 넣을 때는 반드시 `_` 나 `//` 로 시작하는 키를 쓰세요.
 */
export type SiteConfigKey = Exclude<
  keyof typeof rawSiteConfig,
  `_${string}` | `//${string}`
>;

/** 값의 성격. 렌더링 방식(링크/코드/복사버튼)을 결정합니다. */
export type SiteConfigFieldKind = "text" | "path" | "url" | "file" | "version";

/**
 * 값을 고쳤을 때 언제 반영되는지.
 * - runtime : site-config.json 만 고치고 새로고침 → 즉시 반영
 * - build   : 페이지가 만들어질 때 박히는 값이라 다시 빌드해야 반영
 */
export type SiteConfigApplyAt = "runtime" | "build";

/** /site-info 표를 나누는 묶음 */
export type SiteConfigGroup =
  | "site"
  | "installer"
  | "download"
  | "link"
  | "deploy";

export interface SiteConfigField {
  key: SiteConfigKey;
  /** /site-info 표에 노출되는 이름 */
  label: string;
  /** 이 값이 문서 어디에 쓰이는지 */
  description: string;
  kind: SiteConfigFieldKind;
  group: SiteConfigGroup;
  applyAt: SiteConfigApplyAt;
  /** 현장에서 반드시 교체해야 하는 값이면 true */
  required: boolean;
  /**
   * "아직 아무도 현장 값으로 안 고쳤다"를 감지하기 위한 표식 값.
   * 현재 값이 이 문자열과 같으면 문서에 '사이트 설정 필요' 경고를 띄웁니다.
   * 기본값 자체가 이미 쓸 수 있는 값인 항목(설치 파일 이름 등)은 비워 둡니다.
   */
  unsetValue?: string;
}

export const SITE_CONFIG_FIELDS = [
  // ── 현장(사이트) 값 ─────────────────────────────────────────
  {
    key: "siteName",
    label: "사이트 명",
    description: "이 가이드가 배포된 프로젝트(현장) 이름",
    kind: "text",
    group: "site",
    applyAt: "runtime",
    required: false,
    unsetValue: "(사이트 미설정)",
  },
  {
    key: "fileServerPath",
    label: "설치파일 제공 경로",
    description:
      "Node.js / Git / VSCode / Chrome 등 오프라인 설치 파일이 올라가 있는 파일서버 경로",
    kind: "path",
    group: "site",
    applyAt: "runtime",
    required: true,
    unsetValue: "/aaaa/bbbbb/Frontend",
  },
  {
    key: "gitRepoUrl",
    label: "Git 레포지토리 주소",
    description:
      "개발 코드를 내려받는(git clone) 저장소 주소. 폐쇄망에서는 사내 GitLab 등 내부 주소로 교체합니다.",
    kind: "url",
    group: "site",
    applyAt: "runtime",
    required: true,
    unsetValue: "Scaffold 레포지토리 주소",
  },

  // ── 설치 파일 / 버전 ───────────────────────────────────────
  // 개발환경구성 문서에 적히는 파일 이름은 전부 아래 값에서 나옵니다.
  {
    key: "nodeVersion",
    label: "Node.js 버전",
    description: "scaffold 가 최종 테스트한 Node.js LTS 버전 (v 접두사 제외)",
    kind: "version",
    group: "installer",
    applyAt: "runtime",
    required: false,
  },
  {
    key: "npmVersion",
    label: "npm 버전",
    description: "위 Node.js 버전에 포함된 npm 버전 (npm -v 확인 값)",
    kind: "version",
    group: "installer",
    applyAt: "runtime",
    required: false,
  },
  {
    key: "nodeZipFile",
    label: "Node.js 설치 파일 (zip)",
    description: "오프라인 설치용 Node.js 압축 파일 이름",
    kind: "file",
    group: "installer",
    applyAt: "runtime",
    required: false,
  },
  {
    key: "nodeMsiFile",
    label: "Node.js 설치 파일 (msi)",
    description: "오프라인 설치용 Node.js 인스톨러 파일 이름",
    kind: "file",
    group: "installer",
    applyAt: "runtime",
    required: false,
  },
  {
    key: "gitInstallerFile",
    label: "Git 설치 파일",
    description: "오프라인 설치용 Git 인스톨러 파일 이름",
    kind: "file",
    group: "installer",
    applyAt: "runtime",
    required: false,
  },
  {
    key: "vscodeInstallerFile",
    label: "VSCode 설치 파일",
    description: "오프라인 설치용 Visual Studio Code 인스톨러 파일 이름",
    kind: "file",
    group: "installer",
    applyAt: "runtime",
    required: false,
  },
  {
    key: "chromeInstallerFile",
    label: "Chrome 설치 파일",
    description: "오프라인 설치용 Chrome 브라우저 인스톨러 파일 이름",
    kind: "file",
    group: "installer",
    applyAt: "runtime",
    required: false,
  },

  // ── 온라인 설치(다운로드) 주소 ──────────────────────────────
  // 개발환경구성 문서의 "온라인 설치" 링크는 전부 아래 값에서 나옵니다.
  // 폐쇄망이라 외부 다운로드가 막혀 있으면 사내 파일서버 주소로 바꿔 두면 됩니다.
  {
    key: "nodeDownloadUrl",
    label: "Node.js 다운로드 주소",
    description: "개발환경구성 문서의 Node.js 온라인 설치 링크",
    kind: "url",
    group: "download",
    applyAt: "runtime",
    required: false,
  },
  {
    key: "gitDownloadUrl",
    label: "Git 다운로드 주소",
    description: "개발환경구성 문서의 Git 온라인 설치 링크",
    kind: "url",
    group: "download",
    applyAt: "runtime",
    required: false,
  },
  {
    key: "vscodeDownloadUrl",
    label: "VSCode 다운로드 주소",
    description: "개발환경구성 문서의 Visual Studio Code 온라인 설치 링크",
    kind: "url",
    group: "download",
    applyAt: "runtime",
    required: false,
  },
  {
    key: "chromeDownloadUrl",
    label: "Chrome 다운로드 주소",
    description: "개발환경구성 문서의 Chrome 브라우저 온라인 설치 링크",
    kind: "url",
    group: "download",
    applyAt: "runtime",
    required: false,
  },
  {
    key: "reactDevtoolsUrl",
    label: "React Developer Tools 주소",
    description: "크롬 웹스토어의 React Developer Tools 확장 프로그램 주소",
    kind: "url",
    group: "download",
    applyAt: "runtime",
    required: false,
  },
  {
    key: "reduxDevtoolsUrl",
    label: "Redux DevTools 주소",
    description: "크롬 웹스토어의 Redux DevTools 확장 프로그램 주소",
    kind: "url",
    group: "download",
    applyAt: "runtime",
    required: false,
  },
  {
    key: "tanstackQueryDevtoolsUrl",
    label: "TanStack Query DevTools 주소",
    description:
      "크롬 웹스토어의 TanStack Query(React Query) DevTools 확장 프로그램 주소",
    kind: "url",
    group: "download",
    applyAt: "runtime",
    required: false,
  },

  // ── 연결되는 사이트 주소 ────────────────────────────────────
  {
    key: "exampleAppUrl",
    label: "Example 앱 주소",
    description: "상단 메뉴 'Example' 이 열어 주는 데모 앱 주소",
    kind: "url",
    group: "link",
    applyAt: "build",
    required: false,
  },
  {
    key: "storybookUrl",
    label: "Storybook 주소",
    description:
      "컴포넌트 인터랙티브 예제(Storybook) 주소. 폐쇄망이면 사내에 올린 정적 Storybook 주소로 교체합니다.",
    kind: "url",
    group: "link",
    applyAt: "build",
    required: false,
  },
  {
    key: "scaffoldRepoUrl",
    label: "Scaffold 저장소 (웹)",
    description: "상단 메뉴 'GitHub' 과 하단 링크가 여는 scaffold 저장소 주소",
    kind: "url",
    group: "link",
    applyAt: "build",
    required: false,
  },
  {
    key: "guideRepoUrl",
    label: "가이드 저장소 (웹)",
    description: "이 가이드 문서 저장소 주소 (하단 링크)",
    kind: "url",
    group: "link",
    applyAt: "build",
    required: false,
  },
  {
    key: "styleDictionaryUrl",
    label: "Style Dictionary (웹)",
    description: "디자인 토큰을 플랫폼으로 내보내는 기능",
    kind: "url",
    group: "link",
    applyAt: "build",
    required: false,
  },
  {
    key: "zustandUrl",
    label: "Zustand (웹)",
    description:
      "개발환경구성 문서에서 함께 고려해 보라고 안내하는 상태 관리 라이브러리 Zustand 사이트 주소",
    kind: "url",
    group: "link",
    applyAt: "runtime",
    required: false,
  },


  // ── 이 가이드가 배포되는 주소 ───────────────────────────────
  {
    key: "siteUrl",
    label: "가이드 배포 도메인",
    description:
      "이 가이드가 올라가는 서버 주소. 예) http://guide.mycompany.co.kr (경로는 제외)",
    kind: "url",
    group: "deploy",
    applyAt: "build",
    required: false,
  },
  {
    key: "baseUrl",
    label: "가이드 배포 하위 경로",
    description:
      "도메인 뒤에 붙는 경로. 최상단에 배포하면 '/', 하위 폴더면 '/react-guide/' 처럼 앞뒤에 슬래시를 넣습니다.",
    kind: "path",
    group: "deploy",
    applyAt: "build",
    required: false,
  },
] satisfies SiteConfigField[];

/**
 * site-config.json 에는 있는데 위 SITE_CONFIG_FIELDS 에 설명을 빠뜨린 키가 있으면
 * 여기서 컴파일 오류가 납니다. (오류 메시지에 빠진 키 이름이 나옵니다)
 *
 * 설명이 없는 키는 /site-info 표에도 안 나오고 <Var> 로도 쓸 수 없어서,
 * 조용히 누락되지 않도록 이렇게 막아 둡니다.
 */
type MissingFieldKeys = Exclude<
  SiteConfigKey,
  (typeof SITE_CONFIG_FIELDS)[number]["key"]
>;
const _assertEveryKeyIsDescribed: [MissingFieldKeys] extends [never]
  ? true
  : MissingFieldKeys = true;
void _assertEveryKeyIsDescribed;

/** 표 머리글에 쓰는 묶음 정보 */
export const SITE_CONFIG_GROUPS: {
  key: SiteConfigGroup;
  label: string;
  description: string;
}[] = [
  {
    key: "site",
    label: "현장(사이트) 값",
    description:
      "현장마다 반드시 이 서버의 실제 값으로 교체해야 하는 항목입니다.",
  },
  {
    key: "installer",
    label: "설치 파일 / 버전",
    description:
      "개발환경구성 문서에 표시되는 설치 파일 이름과 버전입니다. 파일서버에 다른 버전을 올렸을 때만 교체하면 됩니다.",
  },
  {
    key: "download",
    label: "온라인 설치(다운로드) 주소",
    description:
      "개발환경구성 문서의 '온라인 설치' 링크가 여는 주소입니다. 외부 인터넷이 막힌 현장이면 사내 배포 주소로 교체합니다.",
  },
  {
    key: "link",
    label: "연결되는 사이트 주소",
    description:
      "상단 메뉴·하단 링크·컴포넌트 예제가 여는 외부 주소입니다. 폐쇄망에서는 사내 주소로 교체합니다.",
  },
  {
    key: "deploy",
    label: "이 가이드가 배포되는 주소",
    description:
      "가이드 자체가 어느 주소에 올라가는지입니다. 보통 처음 반입할 때 한 번만 정하면 됩니다.",
  },
];

export type SiteConfigValues = Record<SiteConfigKey, string>;

/** static/ 하위에 배포되는 런타임 설정 파일 이름 */
export const SITE_CONFIG_FILENAME = "site-config.json";

/**
 * static/site-config.json 을 그대로 읽어 온 기본값입니다.
 * 브라우저에서 같은 파일을 다시 fetch 해 덮어쓰므로, 배포 후 값을 바꾸면
 * (runtime 항목은) 재빌드 없이 바로 반영됩니다.
 */
export const DEFAULT_SITE_CONFIG: SiteConfigValues = SITE_CONFIG_FIELDS.reduce(
  (acc, field) => {
    const value = (rawSiteConfig as Record<string, unknown>)[field.key];
    acc[field.key] = typeof value === "string" ? value : "";
    return acc;
  },
  {} as SiteConfigValues,
);

export function getSiteConfigField(
  key: SiteConfigKey,
): SiteConfigField | undefined {
  return SITE_CONFIG_FIELDS.find((field) => field.key === key);
}

/**
 * 비어 있거나, 표식 값(unsetValue) 그대로면 "아직 현장 값이 안 들어온 것"으로 봅니다.
 */
export function isUnsetValue(field: SiteConfigField, value: string): boolean {
  const trimmed = (value ?? "").trim();
  if (trimmed === "") {
    return true;
  }
  return field.unsetValue !== undefined && trimmed === field.unsetValue;
}

/**
 * site-config.json 의 내용을 기본값 위에 병합합니다.
 * 정의되지 않은 키와 문자열이 아닌 값은 무시하므로, 운영자가 JSON을 잘못 고쳐도
 * 화면이 깨지지 않고 기본값으로 표시됩니다.
 */
export function mergeSiteConfig(raw: unknown): SiteConfigValues {
  const merged: SiteConfigValues = { ...DEFAULT_SITE_CONFIG };
  if (!raw || typeof raw !== "object") {
    return merged;
  }

  const source = raw as Record<string, unknown>;
  SITE_CONFIG_FIELDS.forEach((field) => {
    const value = source[field.key];
    if (typeof value === "string" && value.trim() !== "") {
      merged[field.key] = value.trim();
    }
  });

  return merged;
}

/**
 * 편집 결과를 다시 site-config.json 파일 내용으로 만들어 줍니다.
 * (설명용 _readme 와 구분 주석은 원본 그대로 유지해서, 다음 사람이 열었을 때도
 *  똑같은 안내를 볼 수 있게 합니다.)
 */
export function serializeSiteConfig(values: SiteConfigValues): string {
  const source = rawSiteConfig as Record<string, unknown>;
  const output: Record<string, unknown> = {};

  // 원본 파일의 키 순서(주석 포함)를 그대로 따라가며 값만 갈아 끼웁니다.
  Object.keys(source).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(values, key)) {
      output[key] = values[key as SiteConfigKey];
    } else {
      output[key] = source[key];
    }
  });

  // 원본에 없던 새 키(코드에는 있는데 JSON에 빠진 경우)도 뒤에 붙여 줍니다.
  SITE_CONFIG_FIELDS.forEach((field) => {
    if (!(field.key in output)) {
      output[field.key] = values[field.key];
    }
  });

  return `${JSON.stringify(output, null, 2)}\n`;
}
