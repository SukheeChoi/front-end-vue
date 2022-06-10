<template>
  <div id="grid" class="container-fluid">
    <wj-flex-grid :itemsSource="dataArray">
    <wj-flex-grid-column @click="handleClick" :header="'Country'" :binding="'id'" width="2*" />
      <wj-flex-grid-column :header="'Country'" :binding="'country'" width="2*" />
      <wj-flex-grid-column :header="'Sales'" :binding="'sales'" width="*" format="n2" />
      <wj-flex-grid-column :header="'Expenses'" :binding="'expenses'" width="*" format="n2" />
    </wj-flex-grid>
    <p v-html="selectedItem" id="sectedItemInfo"></p>
  </div>
</template>

<script setup>
import "@grapecity/wijmo.vue2.grid";
import { ref } from "vue";
import { FlexGrid } from "@grapecity/wijmo.grid"
//import * as wjcGrid from "@grapecity/wijmo.grid";

let countries = "US,Germany,UK,Japan,Italy,Greece,Korea".split(",");
//let flexGrid = FlexGrid();

function getData(){
let data = [];
for(let i=0; i<countries.length; i++){
  data.push({
    id:i,
    country:countries[i],
    sales: Math.random() * 10000,
    expenses: Math.random() * 5000
  });
  console.log('data: ' + data);
  console.log('data[0]: ' + data[0]);
}
  return data;
}
let dataArray = [];
dataArray = getData();

console.log("=========dataArray=========")
console.log('dataArray : ' + dataArray);
console.log('dataArray[0] : ' + dataArray[0]);
console.log('dataArray["id"] : ' + dataArray['id']);
console.log('dataArray[0]["id"] : ' + dataArray[0]['id']);
console.log('dataArray[0]["country"] : ' + dataArray[0]['country']);
console.log('dataArray[0]["sales"] : ' + dataArray[0]['sales']);
console.log('dataArray[0]["expenses"] : ' + dataArray[0]['expenses']);

// let selectedItem = ref(wjcCore.format(
//     "Country: <b>{data.country}</b>, Sales: <b>{data.sales}</b> Expenses: <b>{data.expenses}</b>", data
// ));

 let selectedItem = '';
  selectedItem = `Country: <b>${dataArray.country}</b>, Sales: <b>${dataArray.sales}</b> Expenses: <b>${dataArray.expenses}</b>`
 ;
  if(selectedItem !== '') {
    let sectedItemInfoTag = document.getElementById('sectedItemInfo');
    sectedItemInfoTag.innerHTML = selectedItem;
  }


// function flexInitialized(flexGrid){
//   console.log("이게 찍힌다고??");
//   console.log(flexGrid);
//   flexGrid.
// }

// const grid = new wjcGrid.FlexGrid("#grid", {

// })
function handleClick(event) {
  
}
</script>