<template>
  <canvas
    :width="width"
    :height="height"
    @mousedown="draw"
    @mousemove="draw"
    @mouseup="draw"
    @mouseleave="draw"
    ref="root"
  ></canvas>
</template>
<script>
import { onMounted, ref } from 'vue';
import { getMimeType } from '@/utils';
export default {
  name: 'OwSignature',
  props: {
    width: {
      type: String,
      default: '300',
    },
    height: {
      type: String,
      default: '300',
    },
    thin: {
      type: Boolean,
      default: false,
    },
    light: {
      type: Boolean,
      default: false,
    },
    regular: {
      type: Boolean,
      default: true,
    },
    medium: {
      type: Boolean,
      default: false,
    },
    bold: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const root = ref(null);

    let ctx;

    onMounted(() => {
      const { value: canvas } = root;
      ctx = canvas.getContext('2d');
      ctx.font = 'Spoqa Han Sans Neo';
      ctx.lineWidth = line();
      ctx.lineCap = 'round';
    });

    const line = () => {
      if (props.bold) {
        return 9;
      } else if (props.medium) {
        return 7;
      } else if (props.regular) {
        return 5;
      } else if (props.light) {
        return 3;
      } else if (props.thin) {
        return 1;
      } else {
        return 1;
      }
    };

    const draw = (e) => {
      const { type, buttons, pageX: x1, pageY: y1 } = e;
      const { x: x2, y: y2 } = ctx.canvas.getBoundingClientRect();
      switch (type) {
        case 'mousedown':
          ctx.beginPath();
          ctx.moveTo(x1 - x2, y1 - y2);
          break;
        case 'mousemove':
          if (buttons === 1) {
            ctx.lineTo(x1 - x2, y1 - y2);
            ctx.stroke();
          }
          break;
        case 'mouseup':
        case 'mouseleave':
          ctx.closePath();
      }
    };

    const toBase64 = (mime = 'png') => {
      const { canvas } = ctx;
      return canvas.toDataURL(getMimeType(mime));
    };

    const clear = () => {
      const { canvas } = ctx;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return toBase64();
    };

    return {
      root,
      draw,
      toBase64,
      clear,
    };
  },
};
</script>
