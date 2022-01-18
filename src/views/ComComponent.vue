<template>
<div></div>
<!-- <component :is="Pass? 'comComponent':''"></component> -->
<!-- <div>{{article}}</div> -->
<!-- <component :is="article"></component> -->
<component :is="true? 'article' : ''" :key="current"></component>
</template>
<script>
import router from '@/routes';
import { useStore } from 'vuex';
import comComponent from '@@/com/views/TheBatchMgmt';

function makePath(path){
  var components = path.split("/");
  console.log(components);
  return '@@/'+components[1] + '/views/The' + components[2];
}

function findChildPath(parentName, menus){
  var path = "";
  for(var i=0;i<menus.length;i++){
    if(menus[i].name === parentName){
      console.log(parentName);
      console.log(menus[i].name)
      return menus[i].children[0].path;
    }

    if(menus[i].children){
      path = findChildPath(parentName, menus[i].children);
    }
  }
  return path;
}

export default{
  functional: true,
  props: ['selectedComp'],
  render(h, ctx){
    console.log(h);
    console.log(ctx);
    return h( () =>import('@@/com/views/TheBatchMgmt'), ctx.data, ctx.children)
    //return h(components[ctx.props.selectedComp], ctx.data, ctx.children)
  },
  components:{
    article : () => import('@@/com/views/The'+this.$route.path)
  },
  beforeCreate: function() {
    
    console.log(this.$route.name);
    console.log(this.$route.path);
    const ll = this.$route.path;
    const store = useStore();
    var componentPath = makePath(this.$route.path);

    try{
      console.log(componentPath);
      console.log(typeof(componentPath));
      console.log(typeof('@@/com/views/TheBatchMgmt'))
      var test = "@@/com/views";
      var test2 = "TheBatchMgmt"
      var paths = this.$route.path.split("/");
      var main = paths[1];
      var sub = paths[2];
      //this.$options.components.article = require('@@/com/views/TheBatchMgmt').default;
      this.$options.components.article = require(`@@/com/views/The${sub}`).default;
    }catch(err){
      console.log(err)
      console.log(this.$route.name);
      var childComponentPath = findChildPath(this.$route.name, store.state.login.menus);
      this.$router.push('/com/'+childComponentPath);
      this.$options.components.article = require(`@@/com/views/The${childComponentPath}`).default;
    }

    
    console.log(store.state.login.menus);
    //var article = mathComponentPath(store.state.login.menus);
    //console.log(test);
    //this.$options.components.article = require('@@/com/views/TheBatchMgmt').default
    
  },
  created: function(){
    console.log("create");
  },
  mounted: function(){
    console.log("mounted");
  },
  components:{
    'com': () => import('@@/com/views/TheBatchMgmt')
  },
  data() {
    return{
      article: this.$route.path,
      //test: require('@@/com/views/TheBatchMgmt')
    }
  },
  computed: {
    page () {
      return this.$route.path;
    }
  },
  methods:{
    foforceRerenderrce(){
      console.log("force");
    }
  }
  //components: {test}
}

/*
export default {
  data(){
    return {
      Pass : true
    }
  },
  setup(){
    const store = useStore();
    console.log(router.options.routes);
    console.log(store.state.login.menus);
  },
  computed:{
    menuInfo(){
      const store = useStore();
      return store.state.login.menus[1];
    }
  },
  components:{'comComponent': () => import('@@/com/views/TheBatchMgmt') }
}
*/
</script>