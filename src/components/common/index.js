import OwCheckbox from '@/components/common/OwCheckbox';
import OwContainer from '@/components/common/OwContainer';
import OwContent from '@/components/common/OwContent';
import OwDialog from '@/components/common/OwDialog';
import OwFilterCheckbox from '@/components/common/OwFilterCheckbox';
import OwFilterRadio from '@/components/common/OwFilterRadio';
import OwFlexWrap from '@/components/common/OwFlexWrap';
import OwFlexItem from '@/components/common/OwFlexItem';
import OwGrid from '@/components/common/OwGrid';
import OwInput from '@/components/common/OwInput';
import OwModal from '@/components/common/OwModal';
import OwPanel from '@/components/common/OwPanel';
import OwRadio from '@/components/common/OwRadio';
import OwSelect from '@/components/common/OwSelect';
import OwSpinner from '@/components/common/OwSpinner';
import OwTab from '@/components/common/OwTab';

const COMMON_COMPONENTS = {
  OwCheckbox,
  OwContainer,
  OwContent,
  OwDialog,
  OwFilterCheckbox,
  OwFilterRadio,
  OwFlexWrap,
  OwFlexItem,
  OwGrid,
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
