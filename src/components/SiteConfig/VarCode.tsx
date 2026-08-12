import React from 'react';
import CodeBlock from '@theme/CodeBlock';

import {
  SITE_CONFIG_FIELDS,
  type SiteConfigKey,
} from '@site/src/config/site-config';
import {useSiteConfig} from './context';

export interface VarCodeProps {
  /** 코드블록 언어 (```sh 의 sh 와 같은 값) */
  language?: string;
  /** 코드블록 제목 */
  title?: string;
  /** ```js showLineNumbers 처럼 줄번호 표시 */
  showLineNumbers?: boolean;
  /** 본문. 안에 {{설정키}} 를 쓰면 site-config.json 값으로 치환됩니다. */
  children: string;
}

const KNOWN_KEYS = new Set<string>(SITE_CONFIG_FIELDS.map((field) => field.key));

/** {{nodeVersion}} 형태의 자리표시자를 실제 설정값으로 바꿉니다. */
function interpolate(
  source: string,
  values: Record<SiteConfigKey, string>,
): string {
  return source.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, key: string) =>
    // 정의되지 않은 키는 손대지 않고 그대로 둡니다. (오타를 눈으로 확인할 수 있도록)
    KNOWN_KEYS.has(key) ? values[key as SiteConfigKey] : match,
  );
}

/**
 * 코드블록 안에서 사이트 설정값을 쓰기 위한 컴포넌트입니다.
 *
 * 마크다운 ``` 코드블록 안에서는 <Var /> 같은 컴포넌트가 렌더되지 않고
 * 글자 그대로 출력되기 때문에, 코드 예시에 버전·파일명을 넣어야 할 때 사용합니다.
 *
 *   <VarCode language="sh">{`node -v
 *   # {{nodeVersion}}`}</VarCode>
 */
export default function VarCode({
  language,
  title,
  showLineNumbers,
  children,
}: VarCodeProps): React.ReactElement {
  const {values} = useSiteConfig();

  return (
    <CodeBlock language={language} title={title} showLineNumbers={showLineNumbers}>
      {interpolate(String(children), values)}
    </CodeBlock>
  );
}
