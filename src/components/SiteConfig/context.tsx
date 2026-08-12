import React, {createContext, useContext, useEffect, useState} from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

import {
  DEFAULT_SITE_CONFIG,
  SITE_CONFIG_FILENAME,
  mergeSiteConfig,
  type SiteConfigKey,
  type SiteConfigValues,
} from '@site/src/config/site-config';

/**
 * loading : 아직 site-config.json 을 읽기 전 (SSR 결과 + 첫 렌더)
 * loaded  : 배포된 site-config.json 을 정상적으로 읽음
 * source  : 개발 서버(npm start) — 소스의 src/config/site-config.json 을 그대로 사용 중
 * missing : 파일이 없음(404) → 기본값 사용
 * error   : 파일은 있으나 JSON 파싱 실패 등 → 기본값 사용
 */
export type SiteConfigStatus =
  | 'loading'
  | 'loaded'
  | 'source'
  | 'missing'
  | 'error';

interface SiteConfigContextValue {
  values: SiteConfigValues;
  status: SiteConfigStatus;
  /** 운영자가 수정해야 할 설정 파일의 실제 URL */
  configUrl: string;
  /** 실패했을 때의 원인 메시지 */
  errorMessage?: string;
}

const SiteConfigContext = createContext<SiteConfigContextValue>({
  values: DEFAULT_SITE_CONFIG,
  status: 'loading',
  configUrl: `/${SITE_CONFIG_FILENAME}`,
});

export function SiteConfigProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  // baseUrl(/axiom/react-guide/)이 붙은 실제 경로. 서브 폴더 배포에서도 정상 동작합니다.
  const configUrl = useBaseUrl(`/${SITE_CONFIG_FILENAME}`);

  const [state, setState] = useState<
    Pick<SiteConfigContextValue, 'values' | 'status' | 'errorMessage'>
  >({
    values: DEFAULT_SITE_CONFIG,
    status: 'loading',
  });

  useEffect(() => {
    let cancelled = false;

    // 개발 서버에서는 배포용 복사본이 없습니다. (빌드할 때 만들어집니다)
    // 대신 소스의 src/config/site-config.json 을 그대로 쓰므로, 값을 고치면
    // 새로고침 없이 바로 화면에 반영됩니다.
    if (process.env.NODE_ENV !== 'production') {
      setState({values: DEFAULT_SITE_CONFIG, status: 'source'});
      return undefined;
    }

    // no-store: 운영자가 서버에서 JSON을 고쳤을 때 캐시 때문에 옛 값이 보이는 것을 막습니다.
    fetch(configUrl, {cache: 'no-store'})
      .then(async (response) => {
        if (!cancelled && response.status === 404) {
          setState({values: DEFAULT_SITE_CONFIG, status: 'missing'});
          return;
        }
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const raw = await response.json();
        if (!cancelled) {
          setState({values: mergeSiteConfig(raw), status: 'loaded'});
        }
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        setState({
          values: DEFAULT_SITE_CONFIG,
          status: 'error',
          errorMessage: error instanceof Error ? error.message : String(error),
        });
      });

    return () => {
      cancelled = true;
    };
  }, [configUrl]);

  return (
    <SiteConfigContext.Provider value={{...state, configUrl}}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig(): SiteConfigContextValue {
  return useContext(SiteConfigContext);
}

export function useSiteConfigValue(key: SiteConfigKey): string {
  return useSiteConfig().values[key];
}
