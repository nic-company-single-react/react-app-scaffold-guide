import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

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
        'started/getting-started/overview',
        'started/getting-started/set-dev-env-config',
        'started/getting-started/dev-convention',
        'started/getting-started/react-style-guide',
      ],
    },
    {
      type: "category",
      label: "◉ 참조",
      collapsed: false,
      collapsible: true,
      items: [
        'started/getting-started/overview',
      ],
    },
  ],
  documentDocSidebar: [
    {
      type: 'category',
      label: '◉ 개발 가이드',
      collapsed: false,
      collapsible: true,
      items: [
        'assets-docs/dev/create-biz-pages',
        'assets-docs/dev/navigating-pages',
        'assets-docs/dev/use-rest-api',
        'assets-docs/dev/update-data-with-rest-api',
        'assets-docs/dev/using-ui-component',
        'assets-docs/dev/create-domain-common-function',
        {
          type: 'category',
          label: '• Form 전송 방법',
          collapsed: true,
          collapsible: true,
          items: [
            'assets-docs/dev/submit-form/server-action',
            'assets-docs/dev/submit-form/client-action',
            'assets-docs/dev/submit-form/client-useformaction',
            'assets-docs/dev/submit-form/client-routehandler',
            'assets-docs/dev/submit-form/server-zod-reacthookform',
          ],
        },
        {
          type: 'category',
          label: '• Dialog 띄우기',
          collapsed: true,
          collapsible: true,
          items: [
            'assets-docs/dev/dialog/client-dialog',
            'assets-docs/dev/dialog/intercepting-modal',
          ],
        },
        'assets-docs/dev/use-debuging',
        'assets-docs/dev/use-build',
      ],
    },
  ],
  componentsDocSidebar: [
    'assets-components/index',
    {
      type: 'category',
      label: '◉ Components',
      collapsed: false,
      collapsible: true,
      items: [
        'assets-components/component/accordion-component',
        'assets-components/component/alert-component',
        'assets-components/component/alert-dialog-component',
        'assets-components/component/badge-component',
        'assets-components/component/button-component',
        'assets-components/component/calendar-component',
        'assets-components/component/checkbox-component',
        'assets-components/component/dialog-component',
        'assets-components/component/icon-component',
        'assets-components/component/input-component',
        'assets-components/component/select-component',
        'assets-components/component/spinner-component',
        'assets-components/component/table-component',
      ],
    },
  ],
  apiDocSidebar: [
    'assets-api/index',
    {
      type: 'category',
      label: '◉ Functions',
      collapsed: false,
      collapsible: true,
      items: [
        {
          type: 'category',
          label: '• Hooks',
          collapsed: false,
          collapsible: true,
          items: [
            'assets-api/global-function/hooks/use-api',
            'assets-api/global-function/hooks/use-api-data',
            'assets-api/global-function/hooks/use-api-mutation',
          ],
        },
        {
          type: 'category',
          label: '• Common',
          collapsed: false,
          collapsible: true,
          items: [
            'assets-api/global-function/common/server-api',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '◉ Objects',
      collapsed: false,
      collapsible: true,
      items: [
        {
          type: 'category',
          label: '• $router',
          collapsed: false,
          collapsible: true,
          items: [
            'assets-api/global-object/$router/router-push',
            'assets-api/global-object/$router/router-replace',
            'assets-api/global-object/$router/router-back',
          ],
        },
        {
          type: 'category',
          label: '• $ui',
          collapsed: false,
          collapsible: true,
          items: [
            'assets-api/global-object/$ui/ui-alert',
            'assets-api/global-object/$ui/ui-confirm',
            'assets-api/global-object/$ui/ui-dialog',
          ],
        },
        {
          type: 'category',
          label: '• $utils',
          collapsed: false,
          collapsible: true,
          items: [
            'assets-api/global-object/$utils/utils-date',
            'assets-api/global-object/$utils/utils-format',
            'assets-api/global-object/$utils/utils-string',
          ],
        },
      ],
    },
  ],
  nextjsTrainingSidebar: [
    'nextjs-training/index',
    {
      type: 'category',
      label: '◉ Next.js Training',
      collapsed: false,
      collapsible: false,
      items: [
        'nextjs-training/training-1/folder-file-convention',
        'nextjs-training/training-1/next-image',
      ],
    },
    {
      type: 'category',
      label: '◉ Next.js Training(Practice)',
      collapsed: false,
      collapsible: false,
      items: [
          'nextjs-training/training-practice/create-layout-page',
          'nextjs-training/training-practice/navigating-page',
      ],
    },
  ],
  taskDocSidebar: [
    'task/intro',
    {
      type: 'category',
      label: '◉ React 프로젝트 준비',
      collapsed: true,
      collapsible: true,
      items: [
        'task/react-assets/config-task/first-set-proj',
        'task/react-assets/config-task/set-layout-template',
        'task/react-assets/config-task/first-set-tanstack-query',
      ],
    },
    {
      type: 'category',
      label: '◉ Git 관련',
      collapsed: true,
      collapsible: true,
      items: [
        'task/git/command-list',
      ],
    },
    {
      type: 'category',
      label: '◉ 기타 참조용',
      collapsed: true,
      collapsible: true,
      items: [
        'task/etc/api-communication',
      ],
    },
  ],
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

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
