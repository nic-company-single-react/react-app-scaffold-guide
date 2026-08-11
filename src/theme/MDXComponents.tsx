import MDXComponents from '@theme-original/MDXComponents';
import Var from '@site/src/components/SiteConfig/Var';
import SiteConfigTable from '@site/src/components/SiteConfig/SiteConfigTable';

/**
 * 모든 md / mdx 문서에서 import 없이 바로 쓸 수 있는 전역 컴포넌트입니다.
 *
 *   <Var k="fileServerPath" />   사이트별 설정값 출력
 *   <SiteConfigTable />          현재 사이트 설정 전체 표
 */
export default {
  ...MDXComponents,
  Var,
  SiteConfigTable,
};
