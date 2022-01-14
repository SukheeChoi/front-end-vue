import { registerCore } from '@grapecity/wijmo.vue2.core';
import { registerInput } from '@grapecity/wijmo.vue2.input';
import { registerGrid } from '@grapecity/wijmo.vue2.grid';
import { registerGridDetail } from '@grapecity/wijmo.vue2.grid.detail';
import { registerGridFilter } from '@grapecity/wijmo.vue2.grid.filter';
import { registerGridGrouppanel } from '@grapecity/wijmo.vue2.grid.grouppanel';
import { registerNav } from '@grapecity/wijmo.vue2.nav';

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
import OwInputDate from '@/components/common/OwInputDate';
import OwInputNumber from '@/components/common/OwInputNumber';
import OwModal from '@/components/common/OwModal';
import OwPanel from '@/components/common/OwPanel';
import OwRadio from '@/components/common/OwRadio';
import OwRadioButton from '@/components/common/OwRadioButton';
import OwSelect from '@/components/common/OwSelect';
import OwCommonSelect from '@/components/common/OwCommonSelect';
import OwSpinner from '@/components/common/OwSpinner';
import OwSwitch from '@/components/common/OwSwitch';
import OwTab from '@/components/common/OwTab';

export function registerWijmo(app) {
    registerCore(app);
    registerInput(app);
    registerGrid(app);
    registerGridDetail(app);
    registerGridFilter(app);
    registerGridGrouppanel(app);
    registerNav(app);
}

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
    OwInputDate,
    OwInputNumber,
    OwModal,
    OwPanel,
    OwRadio,
    OwRadioButton,
    OwSelect,
    OwCommonSelect,
    OwSpinner,
    OwSwitch,
    OwTab,
};

export function registerOwComponents(app) {
    for (const [name, component] of Object.entries(COMMON_COMPONENTS)) {
        app.component(name, component);
    }
}