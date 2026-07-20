import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Docs',
    Svg: require('@site/static/img/app_documents.svg').default,
    description: (
      <>
        페이지 생성, 라우터 연결, API 호출, UI 컴포넌트 사용법, Store 관리 등 프론트엔드 개발에 필요한 전 과정을 단계별 가이드로 제공합니다. 처음 온보딩하는 개발자도 가이드만 따라가면 바로 개발을 시작할 수 있습니다.
      </>
    ),
  },
  {
    title: 'UI Components',
    Svg: require('@site/static/img/ui_component.svg').default,
    description: (
      <>
        SmartTable, Dialog, Select, Calendar, Combobox 등 업무 화면에 최적화된 UI 컴포넌트를 Props 명세, 사용 예제, 실전 코드 스니펫과 함께 제공합니다. 컴포넌트 조합만으로 복잡한 화면도 빠르게 구현할 수 있습니다.
      </>
    ),
  },
  {
    title: 'API Reference',
    Svg: require('@site/static/img/api_reference.svg').default,
    description: (
      <>
        커스텀 Hook, 서비스 객체, 유틸리티 함수 등 react-app-scaffold 내장 API의 시그니처, 파라미터, 반환값, 사용 예제를 체계적으로 정리한 레퍼런스 문서입니다.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
