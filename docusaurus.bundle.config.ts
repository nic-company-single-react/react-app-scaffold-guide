import type { Config } from "@docusaurus/types";
import baseConfig from "./docusaurus.config";

/**
 * scaffold 프로젝트 동봉용 빌드 설정.
 *
 * 개발 서버 배포본(docusaurus.config.ts)과 다른 점은 두 가지뿐입니다.
 *   1) baseUrl 이 '/'         — 개발자 PC에서 http://localhost:4000/ 으로 바로 열기 위함
 *   2) static-extra 를 제외   — mp4/pdf/pptx 약 41MB 를 빼서 저장소 용량을 줄임
 *
 * 나머지 값(메뉴 링크·저장소 주소 등)은 baseConfig 를 통해
 * static/site-config.json 에서 그대로 따라옵니다.
 * 아래 url / baseUrl 만 "이 번들은 로컬에서 여는 용도"라서 일부러 덮어씁니다.
 *
 * 빌드:  npm run build:bundle   →  build-bundle/
 * 사용:  build-bundle/ 을 react-app-scaffold/guide/ 로 복사
 */
const bundleConfig: Config = {
  ...baseConfig,

  baseUrl: "/",

  // 용량이 큰 소개 자료(static-extra)를 제외합니다.
  staticDirectories: ["static"],

  // 로컬에서만 여는 번들본이라 검색엔진 메타는 의미가 없습니다.
  url: "http://localhost:4000",
};

export default bundleConfig;
