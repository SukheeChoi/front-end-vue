<template>
  <div id="edit"></div>
  <button @click="initFroala">Initialize</button>
</template>
<script>
//import VueFroala from 'vue-froala-wysiwyg';
import '@/utils/froala_editor.pkgd.min.css';
import FroalaEditor from '@/utils/froala_editor.pkgd.min.js';

export default {
  name: 'App',
  methods: {
    initFroala() {
      new FroalaEditor('#edit', {
        events: {
          initialized() {
            alert('Froala, meet Vue 3');
          },
        },
      });
    },
  },
};
</script>
