<template>
  <ow-panel>
    <template #title> Dummy1 Title </template>
    <ow-container>
      <ow-content>
        <wj-flex-grid :items-source="items">
          <ow-check-column :width="30" compare-key="name" v-model="columns" />
          <wj-flex-grid-column header="셀렉트" :width="100">
            <wj-flex-grid-cell-template cellType="Cell">
              <ow-select :items="selectItems" v-model="selectedValue">
                <option value="">전체</option>
              </ow-select>
            </wj-flex-grid-cell-template>
          </wj-flex-grid-column>
          <wj-flex-grid-column header="라디오" :width="200">
            <wj-flex-grid-cell-template cellType="Cell">
              <ow-radio :items="radioItems" v-model="checkedValue" />
            </wj-flex-grid-cell-template>
          </wj-flex-grid-column>
          <wj-flex-grid-column header="이미지">
            <wj-flex-grid-cell-template cellType="Cell">
              <img src="@/assets/images/logo.png" />
            </wj-flex-grid-cell-template>
          </wj-flex-grid-column>
          <wj-flex-grid-column header="이름" binding="name" />
        </wj-flex-grid>
        <wj-flex-grid :items-source="items">
          <ow-check-column :width="30" compare-key="name" v-model="columns" />
          <wj-flex-grid-column header="셀렉트" :width="100">
            <wj-flex-grid-cell-template cellType="Cell">
              <ow-select :items="selectItems" v-model="selectedValue">
                <option value="">전체</option>
              </ow-select>
            </wj-flex-grid-cell-template>
          </wj-flex-grid-column>
          <wj-flex-grid-column header="라디오" :width="200">
            <wj-flex-grid-cell-template cellType="Cell">
              <ow-radio :items="radioItems" v-model="checkedValue" />
            </wj-flex-grid-cell-template>
          </wj-flex-grid-column>
          <wj-flex-grid-column header="이미지">
            <wj-flex-grid-cell-template cellType="Cell">
              <img src="@/assets/images/logo.png" />
            </wj-flex-grid-cell-template>
          </wj-flex-grid-column>
          <wj-flex-grid-column header="이름" binding="name" />
        </wj-flex-grid>

        <ow-modal type="XS" :once="false" ref="modal"> aa </ow-modal>
        <button type="button" class="ow-btn type-base" @click="openModal">
          Modal open
        </button>
        <ow-alert message="오류가 발생했습니다." ref="alert" />
        <button type="button" class="ow-btn type-base" @click="openAlert">
          Alert open
        </button>
        <ow-confirm message="동의합니까?" ref="confirm" />
        <button type="button" class="ow-btn type-base" @click="openConfirm">
          Confirm open
        </button>
      </ow-content>
    </ow-container>
  </ow-panel>
</template>
<script>
import OwContainer from '@/components/common/OwContainer';
import OwContent from '@/components/common/OwContent';
import OwPanel from '@/components/common/OwPanel';

import OwSelect from '@/components/common/OwSelect';
import OwRadio from '@/components/common/OwRadio';

import OwCheckColumn from '@@/com/components/wijmo/grid/OwCheckColumn';

import OwModal from '@/components/common/OwModal';
import OwAlert from '@/components/common/OwAlert';
import OwConfirm from '@/components/common/OwConfirm';

export default {
  name: 'Dummy1',
  components: {
    OwPanel,
    OwCheckColumn,
    OwSelect,
    OwRadio,
    OwModal,
    OwAlert,
    OwConfirm,
    OwContainer,
    OwContent,
  },
  data() {
    return {
      items: [
        {
          name: '김',
        },
        {
          name: '이',
        },
        {
          name: '박',
        },
        {
          name: '최',
        },
      ],
      columns: [{ name: '박' }],
      selectItems: [
        { name: '셀렉트1', value: '셀렉트1' },
        { name: '셀렉트2', value: '셀렉트2' },
        { name: '셀렉트3', value: '셀렉트3' },
      ],
      selectedValue: '',
      radioItems: [
        { name: '전체', value: '' },
        { name: '라디오1', value: '라디오1' },
        { name: '라디오2', value: '라디오2' },
        { name: '라디오3', value: '라디오3' },
      ],
      checkedValue: '',
    };
  },
  mounted() {
    console.log(this.columns);
  },
  methods: {
    onAccept: function (...args) {
      console.log('onAccept:', args);
    },
    onCancel: function (...args) {
      console.log('onCancel:', args);
    },
    openModal: function () {
      this.$refs.modal.open();
    },
    openAlert: function () {
      console.log('open alert', this.$refs);
      this.$refs.alert.open();
    },
    openConfirm: function () {
      console.log('open confirm', this.$refs);
      this.$refs.confirm.open();
    },
  },
  watch: {
    columns: {
      handler(value) {
        console.log('watch column:', value);
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped></style>
