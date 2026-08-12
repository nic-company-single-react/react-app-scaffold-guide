import React, {useEffect, useState} from 'react';
import clsx from 'clsx';

import {
  getSiteConfigField,
  isUnsetValue,
  type SiteConfigKey,
} from '@site/src/config/site-config';
import {useSiteConfig} from './context';
import {copyToClipboard} from './clipboard';
import styles from './styles.module.css';

export interface VarProps {
  /** src/config/site-config.ts 에 정의된 설정 키 */
  k: SiteConfigKey;
  /** 코드 스타일 없이 일반 텍스트로 출력 */
  plain?: boolean;
  /** 복사 버튼 표시 여부 (기본: 경로(path) 값일 때만 표시) */
  copy?: boolean;
}

/**
 * 사이트마다 달라지는 값을 문서 본문에 표시합니다.
 *
 *   node.js 설치 파일을 <Var k="fileServerPath" /> 위치에서 받습니다.
 *
 * 값이 아직 현장 값으로 교체되지 않았으면 경고 배지를 함께 노출해서,
 * 개발자가 잘못된 경로를 그대로 따라 하는 것을 막습니다.
 */
export default function Var({
  k,
  plain = false,
  copy,
}: VarProps): React.ReactElement {
  const {values, status} = useSiteConfig();
  const field = getSiteConfigField(k);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const timer = window.setTimeout(() => setCopied(false), 1500);
    return () => window.clearTimeout(timer);
  }, [copied]);

  if (!field) {
    return <code className={styles.unset}>알 수 없는 설정 키: {k}</code>;
  }

  const value = values[k];
  // site-config.json 을 읽기 전에는 경고를 띄우지 않습니다. (첫 렌더 깜빡임 방지)
  const unset = status !== 'loading' && isUnsetValue(field, value);
  const showCopy = copy ?? field.kind === 'path';

  let body: React.ReactElement;
  if (plain) {
    body = <span className={styles.value}>{value}</span>;
  } else if (field.kind === 'url' && !unset) {
    body = (
      <a href={value} target="_blank" rel="noreferrer">
        <code className={styles.value}>{value}</code>
      </a>
    );
  } else {
    body = (
      <code className={clsx(styles.value, unset && styles.unset)}>{value}</code>
    );
  }

  return (
    <span className={styles.var}>
      {body}
      {unset && (
        <span
          className={styles.badge}
          title={`${field.label} 값이 아직 이 현장 값으로 교체되지 않았습니다. 배포 폴더의 site-config.json 을 확인하세요.`}>
          사이트 설정 필요
        </span>
      )}
      {showCopy && !unset && (
        <button
          type="button"
          className={styles.copyBtn}
          onClick={() => {
            copyToClipboard(value);
            setCopied(true);
          }}
          title={`${field.label} 복사`}>
          {copied ? '복사됨' : '복사'}
        </button>
      )}
    </span>
  );
}
