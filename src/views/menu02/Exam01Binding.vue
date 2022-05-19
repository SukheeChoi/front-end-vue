<template>
  <div class="card">
    <div class="card-header">
        Exam01Binding
    </div>
    <div class="card-body">
        <p>번호: {{no}}</p>
        <p>이름: {{name}}</p>
        <p>회사: {{company}}</p>
        <p>가격: {{getPrice()}}</p>
        <p>판매: {{detail.sale? "판매":"품절"}}</p>
        <hr/>
        <p v-html="detail.info"></p>
        <hr/>
        <p>
            <img src="@/assets/products/minibag-black.png" class="mr-2" height="150"/>
            <img v-bind:src="require(`@/assets/products/${image}`)" height="150"/>
            <span v-if="!detail.sale"><img src="@/assets/products/soldout.jpg" width="100"/></span>
            <span v-show="true"><img src="@/assets/products/soldout.jpg" width="100"/></span>
        </p>
        <hr/>
        <button @click="changeData" class="btn btn-info btn-sm">데이터 변경(UI가 변경되지 않음)</button>
    </div>
  </div>
</template>

<script setup>
    // 컴포넌트 속성 선언
    let no = 1;
    let name = "미니백";
    let company = "클레인";
    let price = 300000;
    let image = "minibag-black.png";
    let detail = {
        info: `
                <div>
                    시그니처 Cecyle Lock 마그네틱 클로저가 특징입니다.
                </div>
        `
        , sale: false,
    };

    // 메소드 선언
    function getPrice() {
        return price;
    }

    function changeData() {
        no = 2;
        name = "핸드백";
        console.log(no);
        console.log(name);
    }
</script>

<style scoped>
</style>