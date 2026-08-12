import fs from "node:fs/promises";
import path from "node:path";
import { themes as prismThemes } from "prism-react-renderer";
import type { Config, Plugin } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// 현장마다 달라지는 값의 단일 소스.
// 이 파일에 주소를 직접 적지 말고 src/config/site-config.json 을 고치세요.
// (여기서 쓰는 값은 빌드할 때 페이지에 박히므로 수정 후 다시 빌드해야 합니다.
//  문서 본문에 쓰이는 값은 재빌드 없이 JSON 수정만으로 반영됩니다.)
import siteConfig from "./src/config/site-config.json";

const SITE_CONFIG_SOURCE = path.resolve(
  __dirname,
  "src/config/site-config.json",
);

/**
 * 설정 파일을 배포 폴더 최상단(build/site-config.json)에 복사합니다.
 *
 * 소스에서는 설명 파일(site-config.ts)과 같은 폴더에 두어 가이드 담당자가
 * 한 곳만 보게 하고, 배포본에서는 현장 담당자가 찾기 쉬운 최상단에 둡니다.
 * 브라우저는 이 파일을 읽어 문서의 값을 채우므로, 현장에서는 이 파일만
 * 고치면 재빌드 없이 반영됩니다.
 */
function siteConfigRuntimePlugin(): Plugin {
  return {
    name: "site-config-runtime",
    async postBuild({ outDir }) {
      await fs.copyFile(
        SITE_CONFIG_SOURCE,
        path.join(outDir, "site-config.json"),
      );
    },
  };
}

const config: Config = {
  title: "react-app-scaffold",
  tagline:
    "react-app-scaffold는 실무에 즉시 적용 가능한 컴포넌트, 유틸리티, 예제 코드를 제공하여 React 프로젝트의 빠르고 유연한 개발을 돕는 실전형 스타터 프로젝트입니다.",
  favicon: "img/logo.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: siteConfig.siteUrl,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: siteConfig.baseUrl,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "facebook", // Usually your GitHub org/user name.
  projectName: "docusaurus", // Usually your repo name.

  onBrokenLinks: "throw",

  // static       : 모든 빌드에 포함되는 일반 정적 파일
  // static-extra : 용량이 큰 소개 자료(mp4/pdf/pptx, 약 41MB).
  //                개발 서버 배포본에만 포함하고, scaffold 동봉용 번들
  //                (docusaurus.bundle.config.ts)에서는 제외합니다.
  staticDirectories: ["static", "static-extra"],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  markdown: { format: "mdx" },

  plugins: [siteConfigRuntimePlugin],

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "react-app-scaffold",
      logo: {
        alt: "react-app-scaffold Guide",
        src: "img/logo.png",
        // src: 'img/logo.svg',
      },
      items: [
        {
          label: "Getting Started",
          type: "docSidebar",
          position: "left",
          sidebarId: "startDocSidebar",
        },
        {
          label: "Docs",
          type: "docSidebar",
          position: "left",
          sidebarId: "documentDocSidebar",
        },
        {
          label: "Components",
          type: "docSidebar",
          position: "left",
          sidebarId: "componentsDocSidebar",
        },
        {
          label: "API Reference",
          type: "docSidebar",
          position: "left",
          sidebarId: "apiDocSidebar",
        },
        {
          href: siteConfig.exampleAppUrl,
          label: "Example",
          position: "left",
        },
        {
          label: "프로젝트준비(공통영역)",
          type: "docSidebar",
          position: "right",
          sidebarId: "taskDocSidebar",
        },
        {
          href: "/site-info",
          label: "설정",
          position: "right",
        },
        // {
        //   label: 'API',
        //   type: 'docSidebar',
        //   position: 'left',
        //   sidebarId: 'apiDocSidebar',
        // },
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'tutorialSidebar',
        //   position: 'left',
        //   label: 'Tutorial',
        // },
        // {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: siteConfig.scaffoldRepoUrl,
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "소개",
              to: "/docs/started/getting-started/overview",
            },
            {
              label: "개발환경구성",
              to: "/docs/started/getting-started/set-dev-env-config",
            },
            {
              label: "개발구조 및 규칙",
              to: "/docs/started/getting-started/dev-convention",
            },
            {
              label: "코딩 스타일",
              to: "/docs/started/getting-started/react-style-guide",
            },
          ],
        },
        {
          title: "UI Components",
          items: [
            {
              label: "Accordion",
              href: "/docs/components/ui/accordion-component",
            },
            {
              label: "Button",
              href: "/docs/components/ui/button-component",
            },
            {
              label: "Dialog",
              href: "/docs/components/ui/dialog-component",
            },
          ],
        },
        {
          title: "API Reference",
          items: [
            {
              label: "Functions",
              to: "/docs/apis/global-function/hooks/use-api",
            },
            {
              label: "Service Objects",
              href: "/docs/apis/service-objects/ui/alert-ui",
            },
            {
              label: "예제 소스 GitHub",
              href: siteConfig.scaffoldRepoUrl,
            },
            {
              label: "Guide GitHub",
              href: siteConfig.guideRepoUrl,
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} NIC company Project, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
