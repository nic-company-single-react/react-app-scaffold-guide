import React from 'react';
import Layout from '@theme/Layout';
import styles from './component-showcase.module.css';

// 개별 컴포넌트 링크 아이템
function ComponentItem({ title, description, linkUrl, imageUrl }) {
  return (
    <a href={linkUrl} className={styles.componentItem}>
      {imageUrl && (
        <div className={styles.componentImageContainer}>
          <img src={imageUrl} alt={title} className={styles.componentImage} />
        </div>
      )}
      <div className={styles.componentContent}>
        <h3 className={styles.componentTitle}>{title}</h3>
        {description && <p className={styles.componentDescription}>{description}</p>}
      </div>
    </a>
  );
}

// 카테고리 섹션 컴포넌트
function CategorySection({ category, components, imageUrl }) {
  return (
    <section className={styles.categorySection}>
      <h2 className={styles.categoryTitle}>{category}</h2>
      <div className={styles.componentList}>
        {components.map((component, idx) => (
          <ComponentItem key={idx} {...component} imageUrl={imageUrl} />
        ))}
      </div>
    </section>
  );
}

// 카테고리별 컴포넌트 데이터
const componentsByCategory = [
  {
    category: 'Inputs',
    components: [
      {
        title: 'Button',
        description: '다양한 스타일의 버튼을 제공합니다.',
        linkUrl: '/docs/components/button',
      },
      {
        title: 'Checkbox',
        description: '체크박스 입력 컴포넌트입니다.',
        linkUrl: '/docs/components/checkbox',
      },
      {
        title: 'Radio Group',
        description: '라디오 버튼 그룹 컴포넌트입니다.',
        linkUrl: '/docs/components/radio',
      },
      {
        title: 'Select',
        description: '선택 드롭다운 컴포넌트입니다.',
        linkUrl: '/docs/components/select',
      },
      {
        title: 'Text Field',
        description: '텍스트 입력 필드 컴포넌트입니다.',
        linkUrl: '/docs/components/textfield',
      },
    ],
  },
  {
    category: 'Data display',
    components: [
      {
        title: 'Card',
        description: '콘텐츠를 그룹화하는 데 사용됩니다.',
        linkUrl: '/docs/components/card',
      },
      {
        title: 'Table',
        description: '데이터를 표 형태로 표시합니다.',
        linkUrl: '/docs/components/table',
      },
      {
        title: 'List',
        description: '리스트 형태로 데이터를 표시합니다.',
        linkUrl: '/docs/components/list',
      },
      {
        title: 'Typography',
        description: '텍스트 스타일링 컴포넌트입니다.',
        linkUrl: '/docs/components/typography',
      },
    ],
  },
  {
    category: 'Feedback',
    components: [
      {
        title: 'Alert',
        description: '알림 메시지를 표시합니다.',
        linkUrl: '/docs/components/alert',
      },
      {
        title: 'Dialog',
        description: '모달 다이얼로그 컴포넌트입니다.',
        linkUrl: '/docs/components/dialog',
      },
      {
        title: 'Progress',
        description: '진행 상태를 표시합니다.',
        linkUrl: '/docs/components/progress',
      },
      {
        title: 'Snackbar',
        description: '간단한 알림 메시지를 표시합니다.',
        linkUrl: '/docs/components/snackbar',
      },
    ],
  },
  {
    category: 'Navigation',
    components: [
      {
        title: 'Tabs',
        description: '탭 네비게이션 컴포넌트입니다.',
        linkUrl: '/docs/components/tabs',
      },
      {
        title: 'Menu',
        description: '메뉴 컴포넌트입니다.',
        linkUrl: '/docs/components/menu',
      },
      {
        title: 'Breadcrumbs',
        description: '브레드크럼 네비게이션입니다.',
        linkUrl: '/docs/components/breadcrumbs',
      },
    ],
  },
  {
    category: 'Layout',
    components: [
      {
        title: 'Grid',
        description: '그리드 레이아웃 컴포넌트입니다.',
        linkUrl: '/docs/components/grid',
      },
      {
        title: 'Stack',
        description: '스택 레이아웃 컴포넌트입니다.',
        linkUrl: '/docs/components/stack',
      },
      {
        title: 'Container',
        description: '컨테이너 레이아웃 컴포넌트입니다.',
        linkUrl: '/docs/components/container',
      },
    ],
  },
];

// 메인 페이지 컴포넌트
export default function ComponentShowcase() {
  const imageUrl = `/entec/react_assets/guide/img/showcase/button-preview.png`;

  return (
    <Layout
      title="컴포넌트 목록"
      description="사이트에서 사용 가능한 React 컴포넌트 목록입니다."
    >
      <div className={styles.pageWrapper}>
        <aside className={styles.sidebarContainer}>
          <div className={styles.sidebar}>
            <nav className="theme-doc-sidebar-container">
              <div className="theme-doc-sidebar-menu">
                <ul className="theme-doc-sidebar-menu">
                  <li className="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1">
                    <a
                      href="/docs/assets-components/index"
                      className="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1 menu__link"
                    >
                      Components
                    </a>
                  </li>
                  <li className="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-1">
                    <div className="menu__list-item-collapsible">
                      <a
                        className="menu__link menu__link--sublist"
                        href="#"
                      >
                        ◉ Components List
                      </a>
                    </div>
                    <ul className="theme-doc-sidebar-menu">
                      <li className="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2">
                        <a
                          href="/docs/assets-components/component/accordion-component"
                          className="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__link"
                        >
                          Accordion
                        </a>
                      </li>
                      <li className="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2">
                        <a
                          href="/docs/assets-components/component/alert-dialog-component"
                          className="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__link"
                        >
                          Alert Dialog
                        </a>
                      </li>
                      <li className="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2">
                        <a
                          href="/docs/assets-components/component/alert-component"
                          className="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__link"
                        >
                          Alert
                        </a>
                      </li>
                      <li className="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2">
                        <a
                          href="/docs/assets-components/component/badge-component"
                          className="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__link"
                        >
                          Badge
                        </a>
                      </li>
                      <li className="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2">
                        <a
                          href="/docs/assets-components/component/button-component"
                          className="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__link"
                        >
                          Button
                        </a>
                      </li>
                      <li className="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2">
                        <a
                          href="/docs/assets-components/component/checkbox-component"
                          className="theme-doc-sidebar-item-link theme-doc-sidebar-item-link-level-2 menu__link"
                        >
                          Checkbox
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </aside>
        <main className={styles.mainContainer}>
          <div className={`container ${styles.contentContainer}`}>
            <header className={styles.pageHeader}>
              <h1 className={styles.pageTitle}>컴포넌트 목록</h1>
              <p className={styles.pageDescription}>
                사용 가능한 모든 컴포넌트를 둘러보세요. 각 컴포넌트는 카테고리별로 분류되어 있습니다.
              </p>
            </header>
            
            <div className={styles.categoriesContainer}>
              {componentsByCategory.map((categoryData, idx) => (
                <CategorySection
                  key={idx}
                  category={categoryData.category}
                  components={categoryData.components}
                  imageUrl={imageUrl}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}