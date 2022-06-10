'use strict';

import { createI18n } from 'vue-i18n';

function getNamespace(key) {
  const namespace = key.replace(/^(\.\/app\/|\.\/)/, '');
  // 전역
  if (namespace.startsWith('locales')) {
    return '';
  }
  // 지역
  const at = namespace.indexOf('/');
  return namespace.substring(0, at);
}

function asModule(module, defaultModule = {}) {
  return module.default || module || defaultModule;
}

const messages = {};

const context = require.context('@', true, /(\/locales\/).*\.json$/);
const keys = context.keys();
for (const key of keys) {
  const locale = key.replace(/^.+\//, '').replace(/\.\w+$/, '');
  const namespace = getNamespace(key);
  const module = asModule(context(key));
  if (!messages[locale]) {
    messages[locale] = {};
  }
  if (namespace) {
    messages[locale][namespace] = module;
  } else {
    const message = messages[locale];
    messages[locale] = {
      ...message,
      ...module,
    };
  }
}

const i18n = createI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'ko',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'ko',
  messages,
});

const t = i18n.global.t;

export { t };

export default i18n;
