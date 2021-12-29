import OwAlert from '@/components/common/OwAlert';
import OwCheckbox from '@/components/common/OwCheckbox';
import OwConfirm from '@/components/common/OwConfirm';
import OwContainer from '@/components/common/OwContainer';
import OwContent from '@/components/common/OwContent';
import OwInput from '@/components/common/OwInput';
import OwModal from '@/components/common/OwModal';
import OwPanel from '@/components/common/OwPanel';
import OwRadio from '@/components/common/OwRadio';
import OwSelect from '@/components/common/OwSelect';
import OwSpinner from '@/components/common/OwSpinner';

const COMMON_COMPONENTS = {
  OwAlert,
  OwCheckbox,
  OwConfirm,
  OwContainer,
  OwContent,
  OwInput,
  OwModal,
  OwPanel,
  OwRadio,
  OwSelect,
  OwSpinner,
};

function registerOwComponents(app) {
  for (const [name, component] of Object.entries(COMMON_COMPONENTS)) {
    app.component(name, component);
  }
}

export { registerOwComponents };
