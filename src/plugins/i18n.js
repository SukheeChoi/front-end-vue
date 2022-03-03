'use strict';

import { createI18n } from 'vue-i18n/index';

import ko from '@/locales/ko';
import en from '@/locales/en';

const messages = {
  ko,
  en,
};

function loadMessage() {
  const context = require.context('@@', true, /(\/locales\/).*\.json$/);
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

const i18n = createI18n({
  locale: process.env.VUE_APP_I18N_LOCALE,
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE,
  messages,
});

const { global } = i18n;
const { t } = global;

export { t };

export default i18n;
