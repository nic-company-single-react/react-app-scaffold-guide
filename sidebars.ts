import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  startDocSidebar: [
    {
      type: "category",
      label: "◉ 시작하기",
      collapsed: false,
      collapsible: true,
      items: [
        "started/getting-started/overview",
        "started/getting-started/set-dev-env-config",
        "started/getting-started/dev-convention",
        "started/getting-started/react-style-guide",
      ],
    },
    {
      type: "category",
      label: "◉ Scaffold 설정",
      collapsed: false,
      collapsible: true,
      items: ["started/app-config/index"],
    },
    {
      type: "category",
      label: "◉ Frontend담당(공통) 가이드",
      collapsed: false,
      collapsible: true,
      items: ["started/frontend-common/index"],
    },
    {
      type: "category",
      label: "◉ 퍼블리셔 가이드",
      collapsed: false,
      collapsible: true,
      items: ["started/publishing-guide/index"],
    },
  ],
  documentDocSidebar: [
    {
      type: "category",
      label: "◉ 개발 가이드",
      collapsed: false,
      collapsible: true,
      items: [
        "documents/dev/create-biz-pages",
        "documents/dev/navigating-pages",
        "documents/dev/use-rest-api",
        "documents/dev/using-ui-component",
        "documents/dev/create-domain-common-function",
        "documents/dev/create-global-state",
        "documents/dev/create-module-css",
        "documents/dev/set-i18n-project",
      ],
    },
    {
      type: "category",
      label: "◉ 디자인 시스템",
      collapsed: false,
      collapsible: true,
      items: ["documents/design-system/create-design-tokens"],
    },
    {
      type: "category",
      label: "◉ 기타 가이드",
      collapsed: false,
      collapsible: true,
      items: [
        "documents/etc/how-to-storybook",
        "documents/etc/component-documentation",
        "documents/etc/test-automation",
        "documents/etc/seo-optimization",
      ],
    },
    {
      type: "category",
      label: "◉ AI-assisted development ",
      collapsed: false,
      collapsible: true,
      items: ["documents/ai/what-rag", "documents/ai/axiom-ai-reg-flow"],
    },
  ],
  componentsDocSidebar: [
    "components/index",
    {
      type: "category",
      label: "◉ UI Components",
      collapsed: false,
      collapsible: true,
      items: [
        "components/ui/accordion-component",
        "components/ui/alert-component",
        "components/ui/avatar-component",
        "components/ui/badge-component",
        "components/ui/breadcrumb-component",
        "components/ui/button-component",
        "components/ui/button-group-component",
        "components/ui/calendar-component",
        "components/ui/card-component",
        "components/ui/carousel-component",
        "components/ui/checkbox-component",
        "components/ui/combobox-component",
        "components/ui/dialog-component",
        "components/ui/drawer-component",
        "components/ui/input-component",
        "components/ui/inputgroup-component",
        "components/ui/native-select-component",
        "components/ui/pagination-component",
        "components/ui/spinner-component",
        "components/ui/switch-component",
        "components/ui/toast-component",
      ],
    },
  ],
  apiDocSidebar: [
    "apis/index",
    {
      type: "category",
      label: "◉ Functions",
      collapsed: false,
      collapsible: true,
      items: [
        {
          type: "category",
          label: "• Hooks",
          collapsed: false,
          collapsible: true,
          items: [
            "apis/global-function/hooks/use-api",
            "apis/global-function/hooks/use-client-state",
          ],
        },
        {
          type: "category",
          label: "• Factories",
          collapsed: false,
          collapsible: true,
          items: ["apis/global-function/factories/define-store"],
        },
      ],
    },
    {
      type: "category",
      label: "◉ Service Objects(작업중)",
      collapsed: false,
      collapsible: true,
      items: [
        {
          type: "category",
          label: "• $router",
          collapsed: false,
          collapsible: true,
          items: ["apis/service-objects/router/index"],
        },
        {
          type: "category",
          label: "• $ui",
          collapsed: false,
          collapsible: true,
          items: [
            "apis/service-objects/ui/alert-ui",
            "apis/service-objects/ui/confirm-ui",
            "apis/service-objects/ui/dialog-ui",
          ],
        },
        {
          type: "category",
          label: "• $util",
          collapsed: false,
          collapsible: true,
          items: [
            "apis/service-objects/util/array-util",
            "apis/service-objects/util/date-util",
            "apis/service-objects/util/finance-util",
            "apis/service-objects/util/number-util",
            "apis/service-objects/util/object-util",
            "apis/service-objects/util/string-util",
          ],
        },
      ],
    },
  ],
  taskDocSidebar: [
    "task/intro",
    {
      type: "category",
      label: "◉ React 프로젝트 준비",
      collapsed: true,
      collapsible: true,
      items: [
        "task/react-assets/config-task/first-set-proj",
        "task/react-assets/config-task/set-layout-template",
        "task/react-assets/config-task/first-set-tanstack-query",
        "task/react-assets/config-task/first-set-storybook",
      ],
    },
    {
      type: "category",
      label: "◉ Git 관련",
      collapsed: true,
      collapsible: true,
      items: ["task/git/command-list"],
    },
  ],
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [{ type: "autogenerated", dirName: "." }],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;
