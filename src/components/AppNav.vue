<template>
  <nav class="content_tab">
    <b-tabs nav-wrapper-class="nav-tabs-wrap">
      <b-tab title="메뉴1" />
      <b-tab title="메뉴2" />
      <b-tab title="메뉴3" />
      <b-tab title="메뉴4" />
      <!-- <b-tab v-for="tab in tabs" :key="tab" :title="tab" lazy>
        <template #title>
          <strong>{{ tab }}</strong>
        </template>
      </b-tab> -->
    </b-tabs>
  </nav>
</template>
<script>
export default {
  name: 'AppNav',
};
</script>
