import React from 'react';
import Layout from '@theme/Layout';

import SiteConfigTable from '@site/src/components/SiteConfig/SiteConfigTable';
import {SITE_CONFIG_FILENAME} from '@site/src/config/site-config';

export default function SiteInfo(): React.ReactElement {
  return (
    <Layout
      title="사이트 설정 정보"
      description="이 서버에 배포된 가이드가 사용 중인 현장(사이트)별 설정값">
      <main className="container margin-vert--lg">
        <h1>사이트 설정 정보</h1>
        <p>
          이 가이드 문서에서 현장마다 달라지는 값(설치 파일 경로, 설치 파일 이름
          등)은 문서 본문에 직접 적혀 있지 않고, 배포된{' '}
          <code>{SITE_CONFIG_FILENAME}</code> 파일에서 읽어옵니다. 아래에서 지금
          이 서버에 어떤 값이 들어가 있는지 확인할 수 있습니다.
        </p>

        <SiteConfigTable />

        <h2>값을 바꾸는 방법</h2>
        <ol>
          <li>
            배포한 정적 파일 폴더 최상단의 <code>{SITE_CONFIG_FILENAME}</code>{' '}
            파일을 엽니다. (메모장으로도 충분합니다)
          </li>
          <li>해당 현장의 실제 값으로 문자열을 수정하고 저장합니다.</li>
          <li>
            브라우저에서 이 페이지를 새로고침하여 <strong>설정됨</strong> 으로
            바뀌었는지 확인합니다.
          </li>
        </ol>
        <p>
          <strong>다시 빌드하거나 재배포할 필요가 없습니다.</strong> 이 JSON
          파일 하나만 고치면 가이드 문서 전체에 즉시 반영됩니다.
        </p>

        <h2>주의</h2>
        <ul>
          <li>
            JSON 문법이 깨지면(따옴표·쉼표 누락 등) 값을 읽지 못하고 모두
            기본값으로 표시됩니다. 저장 후 이 페이지에서 꼭 확인하세요.
          </li>
          <li>
            <strong>현장(사이트) 값</strong> 이 기본값 그대로면 문서 본문에{' '}
            <span style={{fontWeight: 700}}>사이트 설정 필요</span> 배지가
            표시되어, 개발자가 잘못된 경로를 따라 하지 않도록 알려 줍니다.
          </li>
          <li>
            <strong>설치 파일 / 버전</strong> 항목은 기본값도 정상적으로 쓸 수
            있는 값이라 경고가 뜨지 않습니다. 파일서버에 올려 둔 설치 파일이
            문서에 적힌 이름과 다를 때만 수정하면, 개발환경구성 문서의 파일
            이름이 한 번에 모두 바뀝니다.
          </li>
        </ul>
      </main>
    </Layout>
  );
}
