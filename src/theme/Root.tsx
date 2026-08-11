import React from 'react';
import {SiteConfigProvider} from '@site/src/components/SiteConfig/context';

/**
 * Docusaurus가 앱 전체를 감싸주는 지점입니다.
 * 여기서 사이트별 설정(site-config.json)을 한 번만 읽어 모든 문서에 공급합니다.
 */
export default function Root({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return <SiteConfigProvider>{children}</SiteConfigProvider>;
}
