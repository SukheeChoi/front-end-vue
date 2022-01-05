import OwCheckbox from '@/components/common/OwCheckbox';
import OwDialog from '@/components/common/OwDialog';
import OwFilterCheckbox from '@/components/common/OwFilterCheckbox';
import OwFilterRadio from '@/components/common/OwFilterRadio';
import OwFlexContainer from '@/components/common/OwFlexContainer';
import OwFlexContent from '@/components/common/OwFlexContent';
import OwGridContainer from '@/components/common/OwGridContainer';
import OwGridContent from '@/components/common/OwGridContent';
import OwInput from '@/components/common/OwInput';
import OwModal from '@/components/common/OwModal';
import OwPanel from '@/components/common/OwPanel';
import OwRadio from '@/components/common/OwRadio';
import OwSelect from '@/components/common/OwSelect';
import OwSpinner from '@/components/common/OwSpinner';
import OwTab from '@/components/common/OwTab';

const COMMON_COMPONENTS = {
  OwCheckbox,
  OwDialog,
  OwFilterCheckbox,
  OwFilterRadio,
  OwFlexContainer,
  OwFlexContent,
  OwGridContainer,
  OwGridContent,
  OwInput,
  OwModal,
  OwPanel,
  OwRadio,
  OwSelect,
  OwSpinner,
  OwTab,
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
