<template>
  <div class="card">
    <div class="card-header">
        Exam08View
    </div>
    <div class="card-body">
        <div>kind:{{route.params.kind}}</div>
        <div>color:{{route.params.color}}</div>
        <hr/>
        <div>kind:{{route.query.kind}}</div>
        <div>color:{{route.query.color}}</div>
    </div>
  </div>
</template>

<script setup>
    import {useRoute} from "vue-router";
    const route = useRoute();

    import {toRaw} from "vue";
    console.log(route);
    console.log('----------------------------------');
    console.log(toRaw(route));
    console.log('----------------------------------');
    console.log( JSON.parse( JSON.stringify(route) ) );
    console.log('----------------------------------');
    console.log('kind: ' + route.params.kind);
    console.log('color: ' + route.params.color);
    console.log('----------------------------------');
    console.log('kind: ' + route.query.kind);
    console.log('color: ' + route.query.color);
</script>

<style scoped>
</style>