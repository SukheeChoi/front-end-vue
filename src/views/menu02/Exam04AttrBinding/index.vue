<template>
  <div class="card">
    <div class="card-header">
        Exam04AttrBinding
    </div>
    <div class="card-body">
        <div>
            <a :href="vueHome" class="btn btn-info btn-sm mr-2">Vue Home</a>
            <router-link :to="home" class="btn btn-info btn-sm mr-2">Home</router-link>
        </div>
        <hr/>
        <div>
            <img :src="require(`@/assets/photos/${imgName}`)" height="150"/>
        </div>
        <hr/>
        <div>
            <span class="mr-3 font-weight-bold" :class="className">아름다운 풍경</span>
            <span class="mr-3" :class="['font-weight-bold', className]">아름다운 풍경</span>
            <span class="mr-3 font-weight-bold" :class="{class1: isClass1, class2: isClass2}">아름다운 풍경</span>
        </div>
        <hr/>
        <div>
            <span class="mr-3" style="font-weight:bold; color:green;">아름다운 풍경</span>
            <span class="mr-3" :style="['font-weight:bold', style]">아름다운 풍경</span>
            <span class="mr-3" style="margin-right: 12px;" :style="{'font-weight':'bold', 'color':color}">아름다운 풍경</span>
        </div>
        <hr/>
        <button @click="changeData" class="btn btn-info btn-sm">변경</button>
        <hr/>
        <FallthroughAttributes
            id="myCom"
            class="bg-danger"
            style="color:yellow"
            to="/"
            @click="handleBtn"
        />
    </div>
  </div>
</template>

<script setup>
    import { ref } from "vue";
    import FallthroughAttributes from "./FallthroughAttributes.vue";

    // 반응형 속성 선언
    const vueHome = ref("https://vuejs.org/");
    const home = ref("/");
    const imgName = ref("photo1.jpg");
    const className = ref("class1");
    const isClass1 = ref(false);
    const isClass2 = ref(true);
    const style = ref("color: green");
    const color = ref("green");

    const toggle = ref(true);
    // 메소드 선언
    function changeData() {
        if(toggle.value) {
            imgName.value = "photo2.jpg";
            className.value = "class2";
            isClass1.value = false;
            isClass2.value = true;
            style.value = "color: red;";
            color.value = "red";
        } else {
            imgName.value = "photo1.jpg";
            className.value = "class1";
            isClass1.value = true;
            isClass2.value = false;
            style.value = "color: green;";
            color.value = "green";
        }
        toggle.value = !toggle.value;
    }

    function handleBtn() {
        console.log("handleBtn() 실 행");
    }
</script>

<style scoped>
    .class1 {
        color: green;
    }

    .class2 {
        color: red;
    }
</style>