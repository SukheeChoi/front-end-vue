<template>
  <div class="card">
    <div class="card-header">
        Exam03View
    </div>
    <div class="card-body">
        <SubAComponent class="mt-3"/>
        <SubBComponent class="mt-3"/>
        <SubCComponent class="mt-3"/>
        <SubDComponent class="mt-3"/>
    </div>
  </div>
</template>

<script setup>
    import SubAComponent from '@/components/menu01/SubAComponent.vue';
    import SubBComponent from '@/components/menu01/SubBComponent.vue';
    import SubCComponent from '@/components/menu01/SubCComponent.vue';
    import SubDComponent from './SubDComponent.vue';
</script>

<style scoped>
</style>