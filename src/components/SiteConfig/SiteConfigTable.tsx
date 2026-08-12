import React, {useEffect, useMemo, useState} from 'react';
import clsx from 'clsx';

import {
  SITE_CONFIG_FIELDS,
  SITE_CONFIG_FILENAME,
  SITE_CONFIG_GROUPS,
  isUnsetValue,
  serializeSiteConfig,
  type SiteConfigValues,
} from '@site/src/config/site-config';
import {useSiteConfig} from './context';
import {copyToClipboard, downloadTextFile} from './clipboard';
import styles from './styles.module.css';

/**
 * 현재 이 서버에 주입된 사이트 설정값을 보여 주고, 그 자리에서 고칠 수 있게 합니다.
 *
 * 현장 담당자는 JSON 문법을 몰라도 됩니다. 입력창에 값을 채운 뒤
 * [설정 파일 내려받기] 를 눌러 나온 site-config.json 을 배포 폴더에 덮어쓰면 끝입니다.
 */
export default function SiteConfigTable(): React.ReactElement {
  const {values, status, configUrl, errorMessage} = useSiteConfig();

  /** 편집 중인 값. site-config.json 을 다 읽은 뒤 그 값으로 채웁니다. */
  const [draft, setDraft] = useState<SiteConfigValues>(values);
  const [copied, setCopied] = useState(false);
  const [showJson, setShowJson] = useState(false);

  // 설정 파일을 읽어오면(로딩 완료) 편집값을 서버의 현재 값으로 맞춥니다.
  useEffect(() => {
    setDraft(values);
  }, [values]);

  useEffect(() => {
    if (!copied) return undefined;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const json = useMemo(() => serializeSiteConfig(draft), [draft]);
  const changedKeys = useMemo(
    () => SITE_CONFIG_FIELDS.filter((f) => draft[f.key] !== values[f.key]),
    [draft, values],
  );
  const unsetRequiredCount = SITE_CONFIG_FIELDS.filter(
    (field) => field.required && isUnsetValue(field, values[field.key]),
  ).length;

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
  } else if (status === 'source') {
    banner = (
      <div className={styles.banner}>
        <div className={styles.bannerTitle}>개발 서버 (npm start)</div>
        <div>
          소스의 <code>src/config/{SITE_CONFIG_FILENAME}</code> 값을 그대로
          보여 주고 있습니다. 그 파일을 고치면 이 화면에 바로 반영됩니다.
          배포본에서는 최상단에 복사된 <code>{SITE_CONFIG_FILENAME}</code> 을
          읽습니다.
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
          JSON 문법이 깨졌을 수 있습니다. 아래에서 값을 채운 뒤 설정 파일을 다시
          내려받아 덮어쓰면 복구됩니다.
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
          아래에서 이 현장의 값으로 고친 뒤 설정 파일을 내려받아{' '}
          <code>{configUrl}</code> 위치에 덮어써 주세요.
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

  const disabled = status === 'loading';

  return (
    <div>
      {banner}

      {SITE_CONFIG_GROUPS.map((group) => {
        const fields = SITE_CONFIG_FIELDS.filter((f) => f.group === group.key);
        if (fields.length === 0) return null;

        return (
          <section key={group.key} className={styles.group}>
            <h2 className={styles.groupTitle}>{group.label}</h2>
            <p className={styles.desc}>{group.description}</p>

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.colLabel}>항목</th>
                    <th className={styles.colValue}>값</th>
                    <th className={styles.colState}>상태</th>
                  </tr>
                </thead>
                <tbody>
                  {fields.map((field) => {
                    const current = values[field.key];
                    const edited = draft[field.key] ?? '';
                    const unset = isUnsetValue(field, edited);
                    const changed = edited !== current;

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
                          <div className={styles.key}>
                            <code>{field.key}</code>
                          </div>
                        </td>
                        <td>
                          <input
                            type="text"
                            className={clsx(
                              styles.input,
                              unset && styles.inputUnset,
                              changed && styles.inputChanged,
                            )}
                            value={edited}
                            disabled={disabled}
                            spellCheck={false}
                            aria-label={field.label}
                            onChange={(event) =>
                              setDraft((prev) => ({
                                ...prev,
                                [field.key]: event.target.value,
                              }))
                            }
                          />
                          {changed && (
                            <div className={styles.beforeValue}>
                              현재 서버 값: <code>{current || '(비어 있음)'}</code>
                            </div>
                          )}
                        </td>
                        <td>
                          {field.applyAt === 'build' ? (
                            <span
                              className={styles.applyBuild}
                              title="이 값은 페이지를 만들 때 박히기 때문에, 파일을 고친 뒤 npm run build 로 다시 빌드해야 반영됩니다.">
                              재빌드 필요
                            </span>
                          ) : (
                            <span
                              className={styles.applyRuntime}
                              title="설정 파일만 덮어쓰고 새로고침하면 바로 반영됩니다.">
                              즉시 반영
                            </span>
                          )}
                          <div>
                            {status === 'loading' ? (
                              <span className={styles.desc}>확인 중</span>
                            ) : unset ? (
                              <span className={styles.stateUnset}>
                                {field.required ? '미설정(필수)' : '미설정'}
                              </span>
                            ) : (
                              <span className={styles.stateOk}>설정됨</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}

      <p className={styles.desc}>
        <strong>*</strong> 표시는 현장마다 반드시 교체해야 하는 값입니다.
      </p>

      {/* ── 저장 ─────────────────────────────────────────────── */}
      <section className={styles.saveBox}>
        <div className={styles.bannerTitle}>
          {changedKeys.length > 0
            ? `${changedKeys.length}개 항목을 고쳤습니다`
            : '고친 항목이 없습니다'}
        </div>
        <p className={styles.desc}>
          아래 버튼으로 <code>{SITE_CONFIG_FILENAME}</code> 을 받아, 배포한 정적
          파일 폴더 최상단(<code>{configUrl}</code>)에 덮어쓰면 반영됩니다.
        </p>

        <div className={styles.actions}>
          <button
            type="button"
            className={clsx(styles.btn, styles.btnPrimary)}
            disabled={disabled}
            onClick={() => downloadTextFile(SITE_CONFIG_FILENAME, json)}>
            설정 파일 내려받기
          </button>
          <button
            type="button"
            className={styles.btn}
            disabled={disabled}
            onClick={() => {
              copyToClipboard(json);
              setCopied(true);
            }}>
            {copied ? '복사됨' : '내용 복사'}
          </button>
          <button
            type="button"
            className={styles.btn}
            disabled={disabled || changedKeys.length === 0}
            onClick={() => setDraft(values)}>
            되돌리기
          </button>
          <button
            type="button"
            className={styles.btn}
            onClick={() => setShowJson((prev) => !prev)}>
            {showJson ? '미리보기 닫기' : '파일 내용 미리보기'}
          </button>
        </div>

        {showJson && <pre className={styles.jsonPreview}>{json}</pre>}

        {changedKeys.some((f) => f.applyAt === 'build') && (
          <div className={clsx(styles.banner, styles.bannerWarn)}>
            <div className={styles.bannerTitle}>다시 빌드해야 반영되는 값</div>
            <div>
              {changedKeys
                .filter((f) => f.applyAt === 'build')
                .map((f) => f.label)
                .join(', ')}{' '}
              — 이 값들은 페이지가 만들어질 때 박히므로, 고친 파일을 소스의{' '}
              <code>src/config/{SITE_CONFIG_FILENAME}</code> 에도 넣고{' '}
              <code>npm run build</code> 로 다시 빌드한 뒤 배포해야 합니다.
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
