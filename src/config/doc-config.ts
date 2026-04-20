export const DOC_CONFIG = {
    STORYBOOK_URL: process.env.NODE_ENV === 'production'
    ? 'http://redsky0212.dothome.co.kr/axiom/storybook/'
    : 'http://localhost:6006',
}