<template>
  <!-- header -->
  <header class="headline-wrap">
    <h1 class="h1">부재 설정</h1>
  </header>
  <!-- //header -->

  <!-- 상세 table -->
  <table class="ow-table-type-info mt-10">
    <colgroup>
      <col style="width: 150px" />
      <col style="width: 600px" />
      <col style="width: 150px" />
      <col style="width: " />
    </colgroup>
    <tr>
      <th>부재기간</th>
      <td>
        <div class="datapicker-wrap">
          <div class="ow-input type-button">
            <date-picker id="dateTimeInput1" v-model="date" :config="options"></date-picker>
            <label for="dateTimeInput1" class="btn-calendar"></label>
          </div>
          <div class="mark">~</div>
          <div class="ow-input type-button">
            <date-picker id="dateTimeInput2" v-model="date" :config="options"></date-picker>
            <label for="dateTimeInput2" class="btn-calendar"></label>
          </div>
        </div>
      </td>
      <th>부재유형</th>
      <td>
        <div class="ow-select" style="width: var(--input-w-150)">
          <select>
            <option value="">출장</option>
            <option value="">휴직</option>
          </select>
        </div>
      </td>
    </tr>
    <tr>
      <th>부재사유</th>
      <td colspan="3">
        <textarea name="" id="" cols="90" rows="5" placeholder="중국 지사 해외출장(장비 AS)"></textarea>
      </td>
    </tr>
    <tr>
      <th>위임자</th>
      <td colspan="3">
        <button class="ow-btn type-flat-del">정재원 사원</button>
        <button class="ow-btn type-flat-base"><span class="mr-10">+</span> 위임자 추가</button>
      </td>
    </tr>
    <tr>
      <th>부재자동해제</th>
      <td colspan="3">
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
        </div>
      </td>
    </tr>
    <tr>
      <th>알림수신</th>
      <td colspan="3">
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
        </div>
      </td>
    </tr>
  </table>

  <!-- //상세 table -->

  <!-- header -->
  <header class="headline-wrap">
    <h1 class="h1">부재 해제</h1>
  </header>
  <!-- //header -->
  <!-- 상세 table -->
  <table class="tbl-tpye-2 mt-10">
    <colgroup>
      <col style="width: 150px" />
      <col style="width: 600px" />
      <col style="width: 150px" />
      <col style="width: " />
    </colgroup>
    <tr>
      <th>부재해제일자</th>
      <td>
        <div class="datapicker-wrap">
          <div class="ow-input type-button">
            <date-picker id="dateTimeInput1" v-model="date" :config="options"></date-picker>
            <label for="dateTimeInput1" class="btn-calendar"></label>
          </div>
        </div>
      </td>
      <th>부재해제</th>
      <td>
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
        </div>
      </td>
    </tr>
    <tr>
      <th>부재해제사유</th>
      <td colspan="3">
        <textarea name="" id="" cols="90" rows="5" placeholder="AS 조기 조치"></textarea>
      </td>
    </tr>
    <tr>
      <th>부재해제알림</th>
      <td colspan="3">
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
        </div>
      </td>
    </tr>
    <tr>
      <th>알림메세지</th>
      <td colspan="3">
        <textarea name="" id="" cols="90" rows="5" placeholder=""></textarea>
      </td>
    </tr>
  </table>

  <!-- //상세 table -->
</template>

<script>
export default {
  name: 'Menu',
  components: {},

  data: function () {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
