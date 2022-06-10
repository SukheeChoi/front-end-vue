<template>  
  <div class="hello">  
    <h1>{{ msg }}</h1>  
    <h2>Here are some Wijmo controls for you to get started:</h2>  
    <div class="App-panel">  
      <wj-flex-grid
        :itemsSource="data">
      </wj-flex-grid>  
      <wj-flex-chart
        :itemsSource="data"  
        bindingX="country">  
        <wj-flex-chart-series name="Sales" binding="sales">  
        </wj-flex-chart-series>  
        <wj-flex-chart-series name="Expenses" binding="expenses">  
        </wj-flex-chart-series>  
        <wj-flex-chart-series name="Downloads" binding="downloads">  
        </wj-flex-chart-series>  
      </wj-flex-chart>  
    </div>  
  </div>  
</template>  

<script>
  // import Wijmo
  // import 'wijmo/wijmo.vue2.grid';
  // import 'wijmo/wijmo.vue2.chart';
  // import { CollectionView } from 'wijmo/wijmo';
  // wijmo의 grid
import "@grapecity/wijmo.vue2.grid";//////
import '@grapecity/wijmo.vue2.chart';
import { CollectionView } from '@grapecity/wijmo';

  // apply Wijmo license key (if you have one)  
  //import { setLicenseKey } from 'wijmo/wijmo';  
  //setLicenseKey('your key goes here');  

  function getData() {  
    var countries = 'US,Germany,UK,Japan,Italy,Greece'.split(','),  
        data = [];  
    for (var i = 0; i < countries.length; i++) {  
      data.push({  
        country: countries[i],  
        sales: Math.random() * 10000,  
        expenses: Math.random() * 5000,  
        downloads: Math.round(Math.random() * 20000),  
      });  
    }  
    return new CollectionView(data);  
  }  

  export default {  
    name: 'HelloWorld',  
    data: function() {  
      return {  
        msg: 'Welcome to Your Vue.js App',  
        data: getData()  
      }  
    }  
  }  
</script>  

<!-- Add "scoped" attribute to limit CSS to this component only -->  
<style scoped>  
  .App-panel {  
    margin: 0 48pt;
    width: 500px;
  }  
  .App-panel .wj-control {  
    display: inline-block;
    vertical-align: top;
    width: 500px;
    height: 300px;
  }  
  .App-panel .wj-flex-grid {
    display: inline-block;
    vertical-align: top;
    width: 500px;
    height: 300px;
  }  
</style>  
