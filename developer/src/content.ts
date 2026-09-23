export type Locale = 'en' | 'zh';

export const links = {
  github: 'https://github.com/QianQIUlp',
  verisilo: 'https://verisilo.qiu.works',
} as const;

export const meta = {
  en: {
    title: 'Q Studio · Independent software studio by Qian Qiu',
    description: 'Q Studio is an independent, self-funded software studio founded and operated by Qian Qiu, building local-first and inspectable software including VeriSilo.',
    image: '/assets/og/developer-en.png',
    imageAlt: 'Q Studio by Qian Qiu — local-first software with explicit boundaries',
  },
  zh: {
    title: 'Q Studio · 由 Qian Qiu 创建的独立软件工作室',
    description: 'Q Studio 是由 Qian Qiu 独立创建和运营的自筹软件工作室，构建本地优先、可检查的软件，包括已可下载的 VeriSilo 公开预发布版本。',
    image: '/assets/og/developer-zh.png',
    imageAlt: 'Q Studio by Qian Qiu —— 本地优先、边界清楚的软件',
  },
} as const;
