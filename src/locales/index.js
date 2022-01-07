import { createI18n } from 'vue-i18n';

import ko from '@/locales/ko';
import en from '@/locales/en';

const messages = {
  ko,
  en,
};

function loadMessage() {
  const context = require.context('@/app', true, /(\/locales\/).*\.json$/);
  for (const key of context.keys()) {
    const unit = key.match(/[a-z]+/).at(0);
    const locale = key
      .match(/([A-Za-z0-9-_]+)\./)
      .filter((locale) => !locale.endsWith('.'))
      .at(0);
    if (locale) {
      if (typeof messages[locale] === 'undefined') {
        messages[locale] = {};
      }
      messages[locale][unit] = context(key) || {};
    }
  }
}

loadMessage();

export default createI18n({
  locale: process.env.VUE_APP_I18N_LOCALE,
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE,
  messages,
});
