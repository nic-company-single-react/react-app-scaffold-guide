import React from 'react';
import clsx from 'clsx';

import {
  SITE_CONFIG_FIELDS,
  SITE_CONFIG_FILENAME,
  isUnsetValue,
} from '@site/src/config/site-config';
import {useSiteConfig} from './context';
import styles from './styles.module.css';

/**
 * 현재 이 서버에 주입된 사이트 설정값을 한눈에 보여줍니다.
 * 현장 반입 후 "설정이 제대로 들어갔는지"를 1분 안에 검증하는 용도입니다.
 */
export default function SiteConfigTable(): React.ReactElement {
  const {values, status, configUrl, errorMessage} = useSiteConfig();

  const unsetFields = SITE_CONFIG_FIELDS.filter((field) =>
    isUnsetValue(field, values[field.key]),
  );
  const unsetRequiredCount = unsetFields.filter((field) => field.required).length;

  let banner: React.ReactElement;
  if (status === 'loading') {
    banner = (
      <div className={styles.banner}>
        <div className={styles.bannerTitle}>설정을 읽는 중…</div>
        <div>
          <code>{configUrl}</code> 파일을 확인하고 있습니다.
        </div>
      </div>
    );
  } else if (status === 'missing') {
    banner = (
      <div className={clsx(styles.banner, styles.bannerDanger)}>
        <div className={styles.bannerTitle}>
          설정 파일을 찾을 수 없습니다 (404)
        </div>
        <div>
          <code>{configUrl}</code> 이 배포되지 않았습니다. 아래 값은 모두
          기본값이며, 이 서버의 실제 값이 아닙니다.
        </div>
      </div>
    );
  } else if (status === 'error') {
    banner = (
      <div className={clsx(styles.banner, styles.bannerDanger)}>
        <div className={styles.bannerTitle}>설정 파일을 읽지 못했습니다</div>
        <div>
          <code>{configUrl}</code> — {errorMessage ?? '알 수 없는 오류'}
          <br />
          JSON 문법이 깨졌을 수 있습니다. 아래 값은 모두 기본값입니다.
        </div>
      </div>
    );
  } else if (unsetRequiredCount > 0) {
    banner = (
      <div className={clsx(styles.banner, styles.bannerWarn)}>
        <div className={styles.bannerTitle}>
          필수 항목 {unsetRequiredCount}개가 아직 기본값입니다
        </div>
        <div>
          <code>{configUrl}</code> 을 이 현장의 값으로 수정해 주세요. 수정 후
          브라우저 새로고침만 하면 반영됩니다. (다시 빌드할 필요 없음)
        </div>
      </div>
    );
  } else {
    banner = (
      <div className={clsx(styles.banner, styles.bannerOk)}>
        <div className={styles.bannerTitle}>사이트 설정이 적용되어 있습니다</div>
        <div>
          <code>{configUrl}</code> 의 값을 사용 중입니다.
        </div>
      </div>
    );
  }

  return (
    <div>
      {banner}

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>항목</th>
              <th>설정 키</th>
              <th>현재 값</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {SITE_CONFIG_FIELDS.map((field) => {
              const value = values[field.key];
              const unset = isUnsetValue(field, value);

              return (
                <tr key={field.key}>
                  <td>
                    <div>
                      <strong>{field.label}</strong>
                      {field.required && (
                        <span className={styles.stateUnset}> *</span>
                      )}
                    </div>
                    <div className={styles.desc}>{field.description}</div>
                  </td>
                  <td className={styles.key}>
                    <code>{field.key}</code>
                  </td>
                  <td>
                    <code className={clsx(unset && styles.unset)}>{value}</code>
                  </td>
                  <td>
                    {status === 'loading' ? (
                      <span>확인 중</span>
                    ) : unset ? (
                      <span className={styles.stateUnset}>
                        {field.required ? '미설정(필수)' : '미설정'}
                      </span>
                    ) : (
                      <span className={styles.stateOk}>설정됨</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className={styles.desc}>
        <strong>*</strong> 표시는 현장마다 반드시 교체해야 하는 값입니다. 설정
        파일 이름은 <code>{SITE_CONFIG_FILENAME}</code> 이며, 배포한 정적 파일
        폴더의 최상단에 있습니다.
      </p>
    </div>
  );
}
