<template>
  <template v-for="link in links" :key="link">
    <ow-select
      :label="link.label"
      :items="link.items"
      v-model="link.value"
    ></ow-select>
  </template>
</template>
<script>
import { computed, watch } from '@vue/runtime-core';

const subs = {
  main1: [
    {
      name: 'sub1-1',
      value: 'sub1-1',
    },
    {
      name: 'sub1-2',
      value: 'sub1-2',
    },
    {
      name: 'sub1-3',
      value: 'sub1-3',
    },
  ],
  main2: [
    {
      name: 'sub2-1',
      value: 'sub2-1',
    },
    {
      name: 'sub2-2',
      value: 'sub2-2',
    },
    {
      name: 'sub2-3',
      value: 'sub2-3',
    },
  ],
};

export default {
  name: 'OwLinkedSelect',
  props: {
    links: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  setup(props) {
    const items = computed(() => props.links.map((link) => link.items));
    const selectedValues = computed(() =>
      props.links.map((link) => link.value)
    );
    watch(selectedValues, () => {
      let linkedKey = '';
      for (
        let i = 0, length = selectedValues.value.length;
        i < length;
        i += 1
      ) {
        const selectedValue = selectedValues.value[i];
        if (linkedKey) {
          items.value[i].splice(0);
          items.value[i].push(...subs[linkedKey]);
        }
        linkedKey = selectedValue;
      }
    });

    return {};
  },
};
</script>
