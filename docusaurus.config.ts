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
    "react-app-scaffold는 실무에 즉시 적용 가능한 UI 컴포넌트, 유틸리티, 예제, 가이드 등을 패키지로 제공하여 React 프로젝트의 빠르고 유연한 개발을 돕는 실전형 스타터 프로젝트입니다.",
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
          title: "Getting Started",
          items: [
            {
              label: "개요",
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
            {
              label: "프로젝트 설정",
              to: "/docs/started/app-config/",
            },
            {
              label: "프로젝트 기반 다지기",
              to: "/docs/started/frontend-common/",
            },
            {
              label: "퍼블리셔 가이드",
              to: "/docs/started/publishing-guide/",
            },
          ],
        },
        {
          title: "Docs",
          items: [
            {
              label: "페이지 만들기",
              to: "/docs/documents/dev/create-biz-pages",
            },
            {
              label: "페이지 이동하기",
              to: "/docs/documents/dev/navigating-pages",
            },
            {
              label: "REST API 데이터 활용",
              to: "/docs/documents/dev/use-rest-api",
            },
            {
              label: "UI 컴포넌트 사용하기",
              to: "/docs/documents/dev/using-ui-component",
            },
            {
              label: "업무 전용 공통함수 만들기",
              to: "/docs/documents/dev/create-domain-common-function",
            },
            {
              label: "업무 스토어(Store) 만들기",
              to: "/docs/documents/dev/create-global-state",
            },
            {
              label: "컴포넌트 전용 스타일 만들기",
              to: "/docs/documents/dev/create-module-css",
            },
            {
              label: "내장 인증 함수 사용",
              to: "/docs/documents/jwt-certi/set-jwt-certi-biz",
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
              label: "Alert",
              href: "/docs/components/ui/alert-component",
            },
            {
              label: "Avatar",
              href: "/docs/components/ui/avatar-component",
            },
            {
              label: "Badge",
              href: "/docs/components/ui/badge-component",
            },
            {
              label: "Breadcrumb",
              href: "/docs/components/ui/breadcrumb-component",
            },
            {
              label: "Button",
              href: "/docs/components/ui/button-component",
            },
            {
              label: "Button Group",
              href: "/docs/components/ui/button-group-component",
            },
            {
              label: "Calendar",
              href: "/docs/components/ui/calendar-component",
            },
            {
              label: "Card",
              href: "/docs/components/ui/card-component",
            },
            {
              label: "Carousel",
              href: "/docs/components/ui/carousel-component",
            },
            {
              label: "Checkbox",
              href: "/docs/components/ui/checkbox-component",
            },
            {
              label: "Combobox",
              href: "/docs/components/ui/combobox-component",
            },
            {
              label: "Dialog",
              href: "/docs/components/ui/dialog-component",
            },
            {
              label: "Drawer",
              href: "/docs/components/ui/drawer-component",
            },
            {
              label: "Input",
              href: "/docs/components/ui/input-component",
            },
            {
              label: "InputGroup",
              href: "/docs/components/ui/inputgroup-component",
            },
            {
              label: "Native Select",
              href: "/docs/components/ui/native-select-component",
            },
            {
              label: "Pagination",
              href: "/docs/components/ui/pagination-component",
            },
            {
              label: "Progress",
              href: "/docs/components/ui/progress-component",
            },
            {
              label: "RadioGroup",
              href: "/docs/components/ui/radio-group-component",
            },
            {
              label: "Select",
              href: "/docs/components/ui/select-component",
            },
            {
              label: "Skeleton",
              href: "/docs/components/ui/skeleton-component",
            },
            {
              label: "Slider",
              href: "/docs/components/ui/slider-component",
            },
            {
              label: "SmartTable",
              href: "/docs/components/ui/smart-table-component",
            },
            {
              label: "Spinner",
              href: "/docs/components/ui/spinner-component",
            },
            {
              label: "Switch",
              href: "/docs/components/ui/switch-component",
            },
            {
              label: "Table",
              href: "/docs/components/ui/table-component",
            },
            {
              label: "Tabs",
              href: "/docs/components/ui/tabs-component",
            },
            {
              label: "Textarea",
              href: "/docs/components/ui/textarea-component",
            },
            {
              label: "Toast",
              href: "/docs/components/ui/toast-component",
            },
            {
              label: "Toggle",
              href: "/docs/components/ui/toggle-component",
            },
            {
              label: "Tooltip",
              href: "/docs/components/ui/tooltip-component",
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
              href: "/docs/apis/service-objects/router/",
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
