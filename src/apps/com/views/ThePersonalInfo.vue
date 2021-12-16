<template>
  <!-- header -->
  <header class="headline-wrap">
    <h1 class="h1">개인정보 설정</h1>
  </header>
  <!-- //header -->

  <!-- 상세 table -->
  <div class="row mt-10">
    <div class="col-6">
      <table class="ow-table-type-info">
        <colgroup>
          <col style="width: 20%" />
          <col style="width: " />
        </colgroup>
        <tr>
          <th>이름</th>
          <td>
            <div class="ow-input" style="width: var(--input-w-200)">
              <input type="text" />
            </div>
          </td>
        </tr>
        <tr>
          <th>소속</th>
          <td>
            <div class="ow-input" style="width: var(--input-w-200)">
              <input type="text" />
            </div>
          </td>
        </tr>
        <tr>
          <th>부서</th>
          <td>
            <div class="ow-input" style="width: var(--input-w-200)">
              <input type="text" />
            </div>
          </td>
        </tr>
        <tr>
          <th>직위</th>
          <td>
            <div class="ow-input" style="width: var(--input-w-200)">
              <input type="text" />
            </div>
          </td>
        </tr>
        <tr>
          <th>직급</th>
          <td>
            <div class="ow-input" style="width: var(--input-w-200)">
              <input type="text" />
            </div>
          </td>
        </tr>
        <tr>
          <th>IP폰</th>
          <td>
            <div class="ow-input" style="width: var(--input-w-200)">
              <input type="text" />
            </div>
          </td>
        </tr>
        <tr class="br-top">
          <th>전화번호</th>
          <td>
            <div class="ow-input" style="width: var(--input-w-200)">
              <input type="text" />
            </div>
          </td>
        </tr>
        <tr>
          <th>핸드폰번호</th>
          <td>
            <div class="ow-input" style="width: var(--input-w-200)">
              <input type="text" />
            </div>
          </td>
        </tr>
        <tr>
          <th>이메일</th>
          <td>
            <div class="ow-input" style="width: var(--input-w-200)">
              <input type="text" />
            </div>
          </td>
        </tr>
        <tr>
          <th>담당업무</th>
          <td>
            <textarea name="" id="" cols="80" rows="5" class="form-style" placeholder="소프트웨어 개발"></textarea>
            <span class="comment">* 담당업무를 간략하게 300자 이내로 작성해 주세요.</span>
          </td>
        </tr>
        <tr>
          <th>페이지당 표시 개수</th>
          <td>
            <div class="ow-select" style="width: var(--input-w-150)">
              <select>
                <option value="">20</option>
                <option value="">10</option>
                <option value="">1</option>
              </select>
            </div>
            <span class="inB ml-05 inH-2">개의 건수 표기</span>
          </td>
        </tr>
        <tr>
          <th>언어설정</th>
          <td>
            <div class="ow-select" style="width: var(--input-w-150)">
              <select>
                <option value="">None</option>
                <option value="">en</option>
                <option value="">ko</option>
              </select>
            </div>
            <span class="inB ml-05 inH-2 comment">* 설정하지 않으면 소속기관 언어셋 설정이 적용됩니다.</span>
          </td>
        </tr>
        <tr>
          <th>TIMEZONE</th>
          <td>
            <div class="ow-select" style="width: var(--input-w-400)">
              <select>
                <option value="">오스템임플란트(주) (GMT+09:00)</option>
              </select>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div class="col-6">
      <div class="profile"></div>
    </div>
  </div>

  <div class="align-center mt-30 ml-200">
    <button class="ow-btn type-reference">변경</button>
    <button class="ow-btn type-state">취소</button>
  </div>
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
