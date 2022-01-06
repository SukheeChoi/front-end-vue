import { createI18n } from 'vue-i18n';

import ko from '@/locales/ko';

const messages = {
  ko,
};

export default createI18n({
  locale: process.env.VUE_APP_I18N_LOCALE,
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE,
  messages,
});
