<template>
  <div class="card">
    <div class="card-header">
      ChildA
    </div>
    <div class="card-body">
      <div>
        <p>prop1: {{$attrs.prop1}}</p>
        <p>prop2: {{$attrs.prop2}}</p>
        <p>productNo: {{$attrs.productNo}}</p>
        <p>productKind: {{$attrs["product-kind"]}}</p>
        <p>productPrice: {{$attrs.productPrice}}</p>
      </div>
      <hr/>
      <div>
        <p>prop1: {{prop1}}</p>
        <p>prop2: {{prop2}}</p>
        <p>productNo: {{productNo}}</p>
        <p>productKind: {{productKind}}</p>
        <p>productPrice: {{productPrice}}</p>
      </div>


    </div>
  </div>
</template>

<script setup>
  import { propsToAttrMap } from "@vue/shared";
import { defineProps, onScopeDispose } from "vue";
  const props = defineProps(['prop1', 'prop2', 'productNo', 'productKind', 'productPrice']);
  console.log('prop1: ' + props.prop1);
</script>

<style scoped>
</style>