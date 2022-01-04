<template>
  <div class="ow-filter">
    <ul class="ow-filter-list">
      <li>
        <input type="radio" id="btn-rd-1" name="btn-rd-group" checked /><label
          class="ow-filter-button"
          for="btn-rd-1"
          >전체</label
        >
      </li>
      <li>
        <input type="radio" id="btn-rd-2" name="btn-rd-group" /><label
          class="ow-filter-button"
          for="btn-rd-2"
          >입금대기 <span>2</span>건</label
        >
      </li>
      <li>
        <input type="radio" id="btn-rd-3" name="btn-rd-group" /><label
          class="ow-filter-button"
          for="btn-rd-3"
          >주문완료 <span>3</span>건</label
        >
      </li>
      <li>
        <input type="radio" id="btn-rd-4" name="btn-rd-group" /><label
          class="ow-filter-button"
          for="btn-rd-4"
          >배송준비 <span>4</span>건 <strong>(1건)</strong></label
        >
      </li>
      <li>
        <input type="radio" id="btn-rd-5" name="btn-rd-group" /><label
          class="ow-filter-button"
          for="btn-rd-5"
          >배송중 <span>6</span>건</label
        >
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'OwFilterRadio',
  setup() {},
};
</script>
