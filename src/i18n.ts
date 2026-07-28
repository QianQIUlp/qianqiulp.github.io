export type Lang = 'zh' | 'en';

export const defaultLang: Lang = 'zh';

export function localizedPath(path: string, lang: Lang): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const withoutEnglishPrefix = normalized.replace(/^\/en(?=\/|$)/, '') || '/';
  return lang === 'en'
    ? `/en${withoutEnglishPrefix === '/' ? '/' : withoutEnglishPrefix}`
    : withoutEnglishPrefix;
}

export const siteCopy = {
  zh: {
    htmlLang: 'zh-CN',
    locale: 'zh_CN',
    skip: '跳到主要内容',
    brand: 'Qiu 的小屋',
    brandSubtitle: '千秋的构建、写作与生活',
    brandAria: 'Qiu 的小屋首页',
    navAria: '主导航',
    nav: { home: '首页', blog: '文章', projects: '作品' },
    themeAria: '切换深浅色模式',
    day: '昼',
    night: '夜',
    languageLabel: 'EN',
    languageAria: 'Switch to English',
    footer: '© 2026 千秋 · Qiu 的小屋',
    defaultImageAlt: 'Qiu 的小屋封面图',
  },
  en: {
    htmlLang: 'en',
    locale: 'en_US',
    skip: 'Skip to main content',
    brand: "Qiu's Room",
    brandSubtitle: "Qianqiu's building, writing, and life",
    brandAria: "Qiu's Room home",
    navAria: 'Main navigation',
    nav: { home: 'Home', blog: 'Writing', projects: 'Projects' },
    themeAria: 'Switch color theme',
    day: 'Day',
    night: 'Night',
    languageLabel: '中文',
    languageAria: '切换到中文',
    footer: "© 2026 Qianqiu · Qiu's Room",
    defaultImageAlt: "Qiu's Room cover image",
  },
} as const;
