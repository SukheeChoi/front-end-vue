<template>
  <div class="ow-input" ref="root">
    <wj-input-date
      class="ow-calendar"
      :id="unique"
      :format="format"
      :initialized="initialized"
      :text-changed="textChanged"
    ></wj-input-date>
  </div>
</template>
<script>
import { Globalize } from '@grapecity/wijmo';
import { ref, watch, onMounted, inject } from 'vue';
import { expando } from '@/utils';
export default {
  name: 'OwInputDate',
  props: {
    label: String,
    unique: {
      type: String,
      default: () => {
        return expando('ow-input');
      },
    },
    format: {
      type: String,
      default: 'yyyy-MM-dd',
    },
    link: Object,
    modelValue: {
      type: String,
      default: ({ format }) => {
        return Globalize.format(new Date(), format);
      },
    },
  },
  setup(props, { emit, root: r }) {
    const root = ref(null);

    const $moment = inject('$moment');

    const control = ref({ text: props.modelValue });
    const initialized = (calendar) => {
      if ($moment(control.value.text, props.format).isValid()) {
        calendar.value = control.value.text;
      } else {
        calendar.value = Globalize.format(new Date(), props.format);
      }
      control.value = calendar;
    };

    const textChanged = (calendar) => {
      control.value.text = calendar.text;
    };

    const setText = (text) => {
      control.value.text = text;
    };

    watch(
      () => props.modelValue,
      () => (control.value.text = props.modelValue)
    );

    watch(
      () => control.value.text,
      () => emit('update:modelValue', control.value.text)
    );

    watch(
      () => props.link,
      () => {
        console.log('props.link', props.link);
      }
    );

    onMounted(() => {
      if (props.label) {
        const label = document.createElement('label');
        label.setAttribute('for', props.unique);
        label.classList.add('t');
        label.textContent = props.label;
        root.value.parentNode.insertBefore(label, root.value);
      }
      console.log('r', r);
    });

    return {
      root,
      initialized,
      textChanged,
      setText,
      r,
    };
  },
};
</script>
