import OwCheckbox from '@/components/common/OwCheckbox';
import OwContainer from '@/components/common/OwContainer';
import OwContent from '@/components/common/OwContent';
import OwDialog from '@/components/common/OwDialog';
import OwInput from '@/components/common/OwInput';
import OwModal from '@/components/common/OwModal';
import OwPanel from '@/components/common/OwPanel';
import OwRadio from '@/components/common/OwRadio';
import OwSelect from '@/components/common/OwSelect';
import OwSpinner from '@/components/common/OwSpinner';

const COMMON_COMPONENTS = {
  OwCheckbox,
  OwContainer,
  OwContent,
  OwDialog,
  OwInput,
  OwModal,
  OwPanel,
  OwRadio,
  OwSelect,
  OwSpinner,
};

export function registerOwComponents(app) {
  for (const [name, component] of Object.entries(COMMON_COMPONENTS)) {
    app.component(name, component);
  }
}

export function registerOwDialog(app) {
  const $dialog = {
    alert: () => {},
    confirm: () => {},
  };
  app.provide('$dialog', (app.config.globalProperties.$dialog = $dialog));
}
