export type Locale = 'en' | 'zh';

export const links = {
  github: 'https://github.com/QianQIUlp',
  verisilo: 'https://verisilo.qiu.works',
} as const;

export const meta = {
  en: {
    title: 'Q Studio · Independent software studio by Qian Qiu',
    description: 'Q Studio is an independent software studio by Qian Qiu, building local-first software and developer tools. Its current product is VeriSilo.',
    image: '/assets/og/developer-en.png',
    imageAlt: 'Q Studio by Qian Qiu — local-first software with explicit boundaries',
  },
  zh: {
    title: 'Q Studio · 由 Qian Qiu 创建的独立软件工作室',
    description: 'Q Studio 是千秋创办的独立软件工作室，构建本地优先的软件产品与开发者工具。当前产品是 VeriSilo。',
    image: '/assets/og/developer-zh.png',
    imageAlt: 'Q Studio by Qian Qiu —— 本地优先、边界清楚的软件',
  },
} as const;
