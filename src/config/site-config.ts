/**
 * 사이트(SI 현장)마다 달라지는 값의 단일 소스.
 *
 * - 여기에는 "어떤 값이 있는지"와 "기본값(placeholder)"만 정의합니다.
 * - 실제 값은 배포된 `static/site-config.json`을 런타임에 읽어서 덮어씁니다.
 *   따라서 현장 반입 후 값이 바뀌어도 **재빌드 없이** JSON 파일 하나만 고치면 됩니다.
 *
 * 값을 추가하려면
 *   1) 아래 SITE_CONFIG_FIELDS 에 항목을 추가하고
 *   2) static/site-config.json 에 같은 키를 추가한 뒤
 *   3) 문서에서 <Var k="키이름" /> 으로 참조하면 됩니다.
 */

export type SiteConfigKey =
  | "siteName"
  | "fileServerPath"
  | "gitRepoUrl"
  | "nodeVersion"
  | "npmVersion"
  | "nodeZipFile"
  | "nodeMsiFile"
  | "gitInstallerFile"
  | "vscodeInstallerFile"
  | "chromeInstallerFile";

/** 값의 성격. 렌더링 방식(링크/코드/복사버튼)을 결정합니다. */
export type SiteConfigFieldKind = "text" | "path" | "url" | "file" | "version";

/**
 * /site-info 표를 나누는 묶음.
 * - site      : 현장마다 반드시 달라지는 값
 * - installer : 설치 파일 이름/버전. 기본값 그대로 써도 되고,
 *               현장 파일서버에 다른 버전이 올라가 있으면 그때만 교체합니다.
 */
export type SiteConfigGroup = "site" | "installer";

export interface SiteConfigField {
  key: SiteConfigKey;
  /** /site-info 표에 노출되는 이름 */
  label: string;
  /** 이 값이 문서 어디에 쓰이는지 */
  description: string;
  kind: SiteConfigFieldKind;
  group: SiteConfigGroup;
  /** 현장에서 반드시 교체해야 하는 값이면 true (미설정이면 문서에 경고 표시) */
  required: boolean;
  /** 배포 직후의 기본값. */
  placeholder: string;
  /**
   * 기본값(placeholder)을 "아직 현장 값이 안 들어온 상태"로 볼지 여부. (기본 true)
   *
   * 설치 파일 이름처럼 기본값 자체가 이미 정상적으로 쓸 수 있는 값이면 false 로 둡니다.
   * false 면 JSON 에 키가 없어도 경고 배지 없이 기본값이 그대로 표시됩니다.
   */
  warnOnDefault?: boolean;
}

export const SITE_CONFIG_FIELDS: SiteConfigField[] = [
  {
    key: "siteName",
    label: "사이트 명",
    description: "이 가이드가 배포된 프로젝트(현장) 이름",
    kind: "text",
    group: "site",
    required: false,
    placeholder: "(사이트 미설정)",
  },
  {
    key: "fileServerPath",
    label: "설치파일 제공 경로",
    description:
      "Node.js / Git / VSCode / Chrome 등 오프라인 설치 파일이 올라가 있는 파일서버 경로",
    kind: "path",
    group: "site",
    required: true,
    placeholder: "/aaaa/bbbbb/Frontend",
  },
  {
    key: "gitRepoUrl",
    label: "Git 레포지토리 주소",
    description:
      "개발 코드를 내려받는 Git 저장소 주소. 폐쇄망에서는 사내 GitLab 등 내부 주소로 교체합니다.",
    kind: "url",
    group: "site",
    required: true,
    placeholder: "Scaffold 레포지토리 주소",
  },

  // ── 설치 파일 / 버전 ───────────────────────────────────────
  // 개발환경구성 문서에 적히는 파일 이름은 전부 아래 값에서 나옵니다.
  // 파일서버에 올라간 파일이 바뀌면 site-config.json 에서 이 값만 고치면 됩니다.
  {
    key: "nodeVersion",
    label: "Node.js 버전",
    description: "scaffold 가 최종 테스트한 Node.js LTS 버전 (v 접두사 제외)",
    kind: "version",
    group: "installer",
    required: false,
    placeholder: "24.14.0",
    warnOnDefault: false,
  },
  {
    key: "npmVersion",
    label: "npm 버전",
    description: "위 Node.js 버전에 포함된 npm 버전 (`npm -v` 확인 값)",
    kind: "version",
    group: "installer",
    required: false,
    placeholder: "11.9.0",
    warnOnDefault: false,
  },
  {
    key: "nodeZipFile",
    label: "Node.js 설치 파일 (zip)",
    description: "오프라인 설치용 Node.js 압축 파일 이름",
    kind: "file",
    group: "installer",
    required: false,
    placeholder: "node-v24.14.0-win-x64.zip",
    warnOnDefault: false,
  },
  {
    key: "nodeMsiFile",
    label: "Node.js 설치 파일 (msi)",
    description: "오프라인 설치용 Node.js 인스톨러 파일 이름",
    kind: "file",
    group: "installer",
    required: false,
    placeholder: "node-v24.14.0-x64.msi",
    warnOnDefault: false,
  },
  {
    key: "gitInstallerFile",
    label: "Git 설치 파일",
    description: "오프라인 설치용 Git 인스톨러 파일 이름",
    kind: "file",
    group: "installer",
    required: false,
    placeholder: "Git-2.53.0.2-64-bit.exe",
    warnOnDefault: false,
  },
  {
    key: "vscodeInstallerFile",
    label: "VSCode 설치 파일",
    description: "오프라인 설치용 Visual Studio Code 인스톨러 파일 이름",
    kind: "file",
    group: "installer",
    required: false,
    placeholder: "VSCodeUserSetup-x64-1.114.0.exe",
    warnOnDefault: false,
  },
  {
    key: "chromeInstallerFile",
    label: "Chrome 설치 파일",
    description: "오프라인 설치용 Chrome 브라우저 인스톨러 파일 이름",
    kind: "file",
    group: "installer",
    required: false,
    placeholder: "GoogleChromeStandaloneEnterprise64.msi",
    warnOnDefault: false,
  },
];

/** 표 머리글에 쓰는 묶음 이름 */
export const SITE_CONFIG_GROUPS: {key: SiteConfigGroup; label: string; description: string}[] =
  [
    {
      key: "site",
      label: "현장(사이트) 값",
      description: "현장마다 반드시 이 서버의 실제 값으로 교체해야 하는 항목입니다.",
    },
    {
      key: "installer",
      label: "설치 파일 / 버전",
      description:
        "개발환경구성 문서에 표시되는 설치 파일 이름과 버전입니다. 파일서버에 다른 버전을 올렸을 때만 교체하면 됩니다.",
    },
  ];

export type SiteConfigValues = Record<SiteConfigKey, string>;

/** static/ 하위에 배포되는 런타임 설정 파일 이름 */
export const SITE_CONFIG_FILENAME = "site-config.json";

/** site-config.json 을 읽기 전(또는 읽기 실패 시) 사용하는 기본값 */
export const DEFAULT_SITE_CONFIG: SiteConfigValues = SITE_CONFIG_FIELDS.reduce(
  (acc, field) => {
    acc[field.key] = field.placeholder;
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
 * 비어 있거나 배포 직후 기본값 그대로면 "아직 현장 값이 안 들어온 것"으로 봅니다.
 * 단, warnOnDefault 가 false 인 항목(설치 파일 이름 등)은 기본값도 정상 값으로 봅니다.
 */
export function isUnsetValue(field: SiteConfigField, value: string): boolean {
  const trimmed = (value ?? "").trim();
  if (trimmed === "") {
    return true;
  }
  if (field.warnOnDefault === false) {
    return false;
  }
  return trimmed === field.placeholder;
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
