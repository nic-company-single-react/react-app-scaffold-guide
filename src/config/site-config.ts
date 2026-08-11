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

export type SiteConfigKey = "siteName" | "fileServerPath" | "gitRepoUrl";

/** 값의 성격. 렌더링 방식(링크/코드/복사버튼)을 결정합니다. */
export type SiteConfigFieldKind = "text" | "path" | "url";

export interface SiteConfigField {
  key: SiteConfigKey;
  /** /site-info 표에 노출되는 이름 */
  label: string;
  /** 이 값이 문서 어디에 쓰이는지 */
  description: string;
  kind: SiteConfigFieldKind;
  /** 현장에서 반드시 교체해야 하는 값이면 true (미설정이면 문서에 경고 표시) */
  required: boolean;
  /** 배포 직후의 기본값. 이 값 그대로면 "미설정"으로 간주합니다. */
  placeholder: string;
}

export const SITE_CONFIG_FIELDS: SiteConfigField[] = [
  {
    key: "siteName",
    label: "사이트 명",
    description: "이 가이드가 배포된 프로젝트(현장) 이름",
    kind: "text",
    required: false,
    placeholder: "(사이트 미설정)",
  },
  {
    key: "fileServerPath",
    label: "설치파일 제공 경로",
    description:
      "Node.js / Git / VSCode / Chrome 등 오프라인 설치 파일이 올라가 있는 파일서버 경로",
    kind: "path",
    required: true,
    placeholder: "/aaaa/bbbbb/Frontend",
  },
  {
    key: "gitRepoUrl",
    label: "Git 레포지토리 주소",
    description:
      "개발 코드를 내려받는 Git 저장소 주소. 폐쇄망에서는 사내 GitLab 등 내부 주소로 교체합니다.",
    kind: "url",
    required: true,
    placeholder: "Scaffold 레포지토리 주소",
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

/** 비어 있거나 배포 직후 기본값 그대로면 "아직 현장 값이 안 들어온 것"으로 봅니다. */
export function isUnsetValue(field: SiteConfigField, value: string): boolean {
  const trimmed = (value ?? "").trim();
  return trimmed === "" || trimmed === field.placeholder;
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
