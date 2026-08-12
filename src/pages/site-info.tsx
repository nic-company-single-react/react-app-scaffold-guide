import React from "react";
import Layout from "@theme/Layout";

import SiteConfigTable from "@site/src/components/SiteConfig/SiteConfigTable";
import { SITE_CONFIG_FILENAME } from "@site/src/config/site-config";

export default function SiteInfo(): React.ReactElement {
  return (
    <Layout
      title="사이트 설정 정보"
      description="이 서버에 배포된 가이드가 사용 중인 현장(사이트)별 설정값"
    >
      <main className="container margin-vert--lg">
        <h1>사이트 설정 정보</h1>
        <p>
          이 가이드에서 현장마다 달라지는 값(설치 파일 경로·파일 이름, 저장소
          주소, 연결되는 사이트 주소 등)은 문서 본문에 직접 적혀 있지 않고,
          배포된 <code>{SITE_CONFIG_FILENAME}</code> <strong>파일 하나</strong>{" "}
          에서 읽어옵니다. 아래에서 지금 이 서버의 값을 확인하고, 그대로 고칠 수
          있습니다.
        </p>

        <h2>고치는 방법</h2>
        <ol>
          <li>아래 입력창에서 이 현장의 값으로 고칩니다.</li>
          <li>
            <strong>[설정 파일 내려받기]</strong> 를 누릅니다. 완성된{" "}
            <code>{SITE_CONFIG_FILENAME}</code> 이 받아집니다.
          </li>
          <li>
            받은 파일을 배포한 정적 파일 폴더 최상단에 덮어씁니다. (src/config/
            {SITE_CONFIG_FILENAME})
          </li>
          <li>브라우저를 새로고침해 값이 바뀌었는지 확인합니다.</li>
        </ol>
        <p>
          이 화면에서 값을 고치는 것만으로는 저장되지 않습니다. 반드시 파일을
          내려받아 서버에 덮어써야 합니다. 브라우저에서 직접 서버 파일을 쓸 수는
          없기 때문입니다.
        </p>

        <h2>반영 시점 두 가지</h2>
        <ul>
          <li>
            <strong>즉시 반영</strong> — 파일만 덮어쓰고 새로고침하면 끝입니다.
            다시 빌드할 필요가 없습니다. 문서 본문에 쓰이는 값 대부분이 여기
            해당합니다.
          </li>
          <li>
            <strong>재빌드 필요</strong> — 사이트 주소나 상단 메뉴 링크처럼
            페이지를 만들 때 박히는 값입니다. 소스의{" "}
            <code>src/config/{SITE_CONFIG_FILENAME}</code> 을 같은 내용으로
            바꾸고 <code>npm run build</code> 로 다시 빌드해야 반영됩니다.
          </li>
        </ul>

        <SiteConfigTable />

        <h2>주의</h2>
        <ul>
          <li>
            메모장으로 <code>{SITE_CONFIG_FILENAME}</code> 을 직접 고쳐도
            됩니다. 다만 쉼표나 따옴표가 빠지면 값을 전혀 읽지 못하고 모두
            기본값으로 표시되니, 저장 후 이 페이지에서 꼭 확인하세요. 이
            화면에서 고쳐 내려받으면 그런 실수가 나지 않습니다.
          </li>
          <li>
            필수 값이 아직 기본값이면 문서 본문에{" "}
            <span style={{ fontWeight: 700 }}>사이트 설정 필요</span> 배지가
            표시되어, 개발자가 잘못된 경로를 따라 하지 않도록 알려 줍니다.
          </li>
          <li>
            <strong>설치 파일 / 버전</strong> 항목은 기본값도 정상적으로 쓸 수
            있는 값이라 경고가 뜨지 않습니다. 파일서버에 올려 둔 설치 파일이
            문서에 적힌 이름과 다를 때만 고치면 됩니다.
          </li>
        </ul>
      </main>
    </Layout>
  );
}
