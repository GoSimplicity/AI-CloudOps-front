import { join } from 'node:path';
import { defineConfig } from '@umijs/max';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV = 'dev' } = process.env;

const PUBLIC_PATH: string = '/';

const config = defineConfig({
  hash: true,
  publicPath: PUBLIC_PATH,
  routes,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV as keyof typeof proxy],
  fastRefresh: true,
  model: {},
  initialState: {},
  title: 'AI CloudOps',
  layout: {
    locale: false,
    ...defaultSettings,
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    baseNavigator: false,
  },
  antd: {
    appConfig: {},
    configProvider: {
      theme: {
        cssVar: true,
        token: {
          fontFamily: 'AlibabaSans, sans-serif',
        },
      },
    },
  },
  request: {},
  access: {},
  headScripts: [{ src: join(PUBLIC_PATH, 'scripts/loading.js'), async: true }],
  presets: ['umi-presets-pro'],
  mako: {},
  esbuildMinifyIIFE: true,
}) as Record<string, unknown>;

export default config;
