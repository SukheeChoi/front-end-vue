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
      type: [String, Number],
      default: 300,
    },
    height: {
      type: [String, Number],
      default: 300,
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

    let ctx,
      rect,
      drawable = false;

    onMounted(() => {
      const { value: canvas } = root;
      ctx = canvas.getContext('2d');
      ctx.lineWidth = line();
      ctx.lineCap = 'round';
      rect = canvas.getBoundingClientRect();
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

    const draw = ({ type, pageX: X, pageY: Y }) => {
      const { x, y } = rect;
      switch (type) {
        case 'mousedown':
          drawable = true;
          ctx.beginPath();
          ctx.moveTo(X - x, Y - y);
          break;
        case 'mousemove':
          if (drawable) {
            ctx.lineTo(X - x, Y - y);
            ctx.stroke();
          }
          break;
        case 'mouseup':
        case 'mouseleave':
          drawable = false;
          ctx.closePath();
      }
    };

    const toBase64 = (mime = 'png') => {
      const { value: canvas } = root;
      return canvas.toDataURL(getMimeType(mime));
    };

    const clear = () => {
      const { value: canvas } = root;
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
<style lang="scss" scoped></style>
