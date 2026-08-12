import React, {useEffect, useRef} from 'react';

import {useSiteConfigValue} from './SiteConfig/context';

/**
 * 개발 서버(npm start)에서는 개발자 PC에 띄운 Storybook 을 봅니다.
 * 배포본에서는 site-config.json 의 storybookUrl 을 사용합니다.
 */
const LOCAL_STORYBOOK_URL = 'http://localhost:6006';

export type AutoHeightStorybookIframeProps = {
  /**
   * Storybook 스토리 경로. 예) "/docs/ui-components-accordion--docs"
   * 앞의 도메인은 site-config.json 의 storybookUrl 에서 자동으로 붙습니다.
   */
  storyPath?: string;
  /** 주소 전체를 직접 지정할 때만 사용합니다. (storyPath 보다 우선) */
  src?: string;
  title: string;
  /** 초기/폴백 높이 (px) */
  minHeight?: number;
  style?: React.CSSProperties;
  className?: string;
};

export default function AutoHeightStorybookIframe({
  storyPath,
  src,
  title,
  minHeight = 400,
  style,
  className,
}: AutoHeightStorybookIframeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const storybookUrl = useSiteConfigValue('storybookUrl');

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const data = event.data;
      if (data?.type !== 'loaded') return;

      const iframe = iframeRef.current;
      if (!iframe) return;

      iframe.style.height = Number(data.height) + 'px';
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const base = (
    process.env.NODE_ENV === 'production' ? storybookUrl : LOCAL_STORYBOOK_URL
  ).replace(/\/$/, '');
  const resolvedSrc =
    src ??
    (storyPath
      ? `${base}/?path=${storyPath}&nav=0&hideDocsToc=1`
      : `${base}/`);

  return (
    <div style={{border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden'}}>
      <iframe
        ref={iframeRef}
        src={resolvedSrc}
        title={title}
        width="100%"
        className={className}
        style={{
          minHeight,
          overflow: 'hidden',
          display: 'block',
          ...style,
        }}
      />
    </div>
  );
}
