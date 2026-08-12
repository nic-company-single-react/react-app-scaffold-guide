import React from 'react';
import clsx from 'clsx';

import {
  getSiteConfigField,
  isUnsetValue,
  type SiteConfigKey,
} from '@site/src/config/site-config';
import {useSiteConfig} from './context';
import styles from './styles.module.css';

export interface VarLinkProps {
  /** src/config/site-config.ts 에 정의된 설정 키 (주소 값) */
  k: SiteConfigKey;
  /** 링크에 보일 글자. 없으면 주소를 그대로 보여 줍니다. */
  children?: React.ReactNode;
  /** 글자 뒤에 실제 주소도 함께 보여 줄지 여부 */
  showUrl?: boolean;
}

/**
 * 설정에 들어 있는 주소로 링크를 겁니다.
 *
 *   <VarLink k="nodeDownloadUrl" showUrl>설치링크</VarLink>
 *   → 설치링크 (https://nodejs.org)   ← 글자 전체가 링크
 *
 * <Var k="..." /> 는 주소를 그대로 노출하는 반면, 이 컴포넌트는 문서에서
 * 쓰던 안내 문구("Chrome 브라우저 설치 링크")를 그대로 두고 주소만
 * site-config.json 에서 가져오고 싶을 때 씁니다.
 *
 * 주소가 비어 있으면 링크를 만들지 않고 경고 배지를 띄웁니다.
 * (누르면 아무 데도 가지 않는 링크가 생기지 않도록)
 */
export default function VarLink({
  k,
  children,
  showUrl = false,
}: VarLinkProps): React.ReactElement {
  const {values, status} = useSiteConfig();
  const field = getSiteConfigField(k);

  if (!field) {
    return <code className={styles.unset}>알 수 없는 설정 키: {k}</code>;
  }

  const value = values[k];
  // site-config.json 을 읽기 전에는 경고를 띄우지 않습니다. (첫 렌더 깜빡임 방지)
  const unset = status !== 'loading' && isUnsetValue(field, value);

  if (unset) {
    return (
      <span className={styles.var}>
        <code className={clsx(styles.value, styles.unset)}>
          {children ?? field.label}
        </code>
        <span
          className={styles.badge}
          title={`${field.label} 값이 아직 이 현장 값으로 교체되지 않았습니다. 배포 폴더의 site-config.json 을 확인하세요.`}>
          사이트 설정 필요
        </span>
      </span>
    );
  }

  return (
    <a href={value} target="_blank" rel="noreferrer">
      {children ?? <code className={styles.value}>{value}</code>}
      {children && showUrl && (
        <>
          {' '}
          (<code className={styles.value}>{value}</code>)
        </>
      )}
    </a>
  );
}
