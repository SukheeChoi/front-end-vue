<template>
  <ow-select :options="item" :all="all"></ow-select>
</template>
<script>
import { reactive, onMounted } from 'vue';

import OwSelect from '@/components/commons/OwSelect';

export default {
  name: 'OwCommonSelect',
  components: {
    OwSelect,
  },
  props: {
    all: {
      type: Boolean,
      default: true,
    },
    codeGroup: {
      type: String,
      default: '',
    },
    modelValue: [String, Number],
  },
  setup(props) {
    const { codeGroup } = reactive(props);

    let item = reactive([]);

    if (codeGroup) {
      item.push(
        ...[
          { name: '공통', value: 1 },
          { name: '물류', value: 2 },
        ]
      );
    }

    onMounted(() => {
      console.log('mounted 완료!!');
    });

    return {
      item,
    };
  },
};
</script>
<style lang="scss" scoped></style>
