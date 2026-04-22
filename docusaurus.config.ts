import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'react-app-scaffold',
  tagline: 'react-app-scaffold는 실무에 즉시 적용 가능한 컴포넌트, 유틸리티, 예제 코드를 제공하여 React 프로젝트의 빠르고 유연한 개발을 돕는 실전형 스타터 프로젝트입니다.',
  favicon: 'img/logo.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'http://redsky0212.dothome.co.kr',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/axiom/react-guide/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'react-app-scaffold',
      logo: {
        alt: 'react-app-scaffold Guide',
        src: 'img/logo.png',
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
          label: 'Docs',
          type: 'docSidebar',
          position: 'left',
          sidebarId: 'documentDocSidebar',
        },
        {
          label: 'Components',
          type: 'docSidebar',
          position: 'left',
          sidebarId: 'componentsDocSidebar',
        },
        {
          label: 'API Reference',
          type: 'docSidebar',
          position: 'left',
          sidebarId: 'apiDocSidebar',
        },
        {
          href: 'http://redsky0212.dothome.co.kr/2026/react/single-guide/example',
          label: 'Example',
          position: 'left',
        },
        {
          label: '프로젝트준비(공통영역)',
          type: 'docSidebar',
          position: 'right',
          sidebarId: 'taskDocSidebar',
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
          href: 'https://github.com/nic-company-single-react/react-app-scaffold',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: '소개',
              to: '/docs/started/getting-started/overview',
            },
            {
              label: '개발환경구성',
              to: '/docs/started/getting-started/set-dev-env-config',
            },
            {
              label: '개발구조 및 규칙',
              to: '/docs/started/getting-started/dev-convention',
            },
            {
              label: '코딩 스타일',
              to: '/docs/started/getting-started/react-style-guide',
            },
          ],
        },
        {
          title: 'UI Components',
          items: [
            {
              label: 'Accordion',
              href: '/docs/components/ui/accordion-component',
            },
            {
              label: 'Button',
              href: '/docs/components/ui/button-component',
            },
            {
              label: 'Dialog',
              href: '/docs/components/ui/dialog-component',
            },
          ],
        },
        {
          title: 'API Reference',
          items: [
            {
              label: 'Functions',
              to: '/docs/apis/global-function/hooks/use-api',
            },
            {
              label: 'Service Objects',
              href: '/docs/apis/service-objects/ui/alert-ui',
            },
            {
              label: '예제 소스 GitHub',
              href: 'https://github.com/nic-company-single-react/react-app-scaffold',
            },
            {
              label: 'Guide GitHub',
              href: 'https://github.com/nic-company-single-react/react-app-scaffold-guide',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Redsky Project, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
