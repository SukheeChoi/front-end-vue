<template>
  <ow-panel>
    <template #title> Dummy1 Title </template>
    <ow-container>
      <ow-content>
        <ow-grid>
          <wj-flex-grid :items-source="items" class="ow-grid">
            <ow-check-column :width="30" compare-key="name" v-model="columns" />
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
        </ow-grid>

        <ow-modal type="XS" :once="false" ref="modal"> aa </ow-modal>
        <button type="button" class="ow-btn type-base" @click="openModal">Modal open</button>
        <button type="button" class="ow-btn type-base" @click="openAlert">Alert open</button>
        <button type="button" class="ow-btn type-base" @click="openConfirm">Confirm open</button>
        <button type="button" class="ow-btn type-base" @click="$i18n.locale = 'ko'">ko</button>
        <button type="button" class="ow-btn type-base" @click="$i18n.locale = 'en'">en</button>
      </ow-content>
      <ow-content>
        <ow-select label="items1" :items="items1" v-model="itemsValue"></ow-select>
        <ow-select label="items2" :items="items2" v-model="itemsValue"></ow-select>
        <ow-select label="items3" :items="items3" v-model="itemsValue"></ow-select>
        <ow-input placeholder="asdfsadfasdf"></ow-input>
      </ow-content>
      <ow-content>
        <ow-filter-checkbox :items="checkedItems" v-model="checkedValues"></ow-filter-checkbox>
      </ow-content>
      <ow-content>
        <ow-flex-wrap>
          <ow-flex-item fix style="width: 300px">
            <ow-filter-radio :items="filterItems" v-model="checkedFilterValue"></ow-filter-radio>
            <ow-radio-button :items="radioButtonItems" v-model="checkedRadioButtonValue" light></ow-radio-button>
          </ow-flex-item>
        </ow-flex-wrap>
      </ow-content>
      <ow-content>
        <ow-flex-wrap>
          <ow-flex-item>
            <ow-input-date label="date" ref="before" :after="after" v-model="selectedInputDate1"></ow-input-date>
            <ow-input-date ref="after" :before="before" v-model="selectedInputDate2"></ow-input-date>
          </ow-flex-item>
        </ow-flex-wrap>
      </ow-content>
    </ow-container>
  </ow-panel>
</template>
<script>
import OwPanel from '@/components/common/OwPanel';

import OwRadio from '@/components/common/OwRadio';

import OwCheckColumn from '@@/com/components/wijmo/grid/OwCheckColumn';

import OwModal from '@/components/common/OwModal';
import OwFilterCheckbox from '@/components/common/OwFilterCheckbox';
import OwFilterRadio from '@/components/common/OwFilterRadio';

import { CollectionView } from '@grapecity/wijmo';
import { DataMap } from '@grapecity/wijmo.grid';

export default {
  name: 'Dummy1',
  components: {
    OwPanel,
    OwCheckColumn,
    OwRadio,
    OwModal,
    OwFilterCheckbox,
    OwFilterRadio,
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
      items1: new DataMap(
        [
          { name: '김name', value: 1, etc: '김etc' },
          { name: '이name', value: 2, etc: '이etc' },
          { name: '박name', value: 3, etc: '박etc' },
          { name: '최name', value: 4, etc: '최etc' },
        ],
        'value',
        'name'
      ),
      items2: new CollectionView([
        { name: '김name', value: 1, etc: '김etc' },
        { name: '이name', value: 2, etc: '이etc' },
        { name: '박name', value: 3, etc: '박etc' },
        { name: '최name', value: 4, etc: '최etc' },
      ]),
      items3: [
        { name: '김name', value: 1, etc: '김etc' },
        { name: '이name', value: 2, etc: '이etc' },
        { name: '박name', value: 3, etc: '박etc' },
        { name: '최name', value: 4, etc: '최etc' },
      ],
      itemsValue: 4,
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
      checkedItems: [
        { name: '체크1', value: '체크1' },
        { name: '체크2', value: '체크2', disabled: true },
        { name: '체크3', value: '체크3' },
      ],
      checkedValues: [],
      filterItems: [
        { name: '전체', value: '' },
        { name: '라디오1', value: '라디오1' },
        { name: '라디오2', value: '라디오2' },
        { name: '라디오3', value: '라디오3', disabled: true },
        { name: '라디오4', value: '라디오4' },
        { name: '라디오5', value: '라디오5' },
        { name: '라디오6', value: '라디오6' },
        { name: '라디오7', value: '라디오7' },
        { name: '라디오8', value: '라디오8' },
        { name: '라디오9', value: '라디오9' },
      ],
      checkedFilterValue: '',
      radioButtonItems: [
        { name: '월', value: 'mon' },
        { name: '화', value: 'tue' },
        { name: '수', value: 'wed' },
        { name: '목', value: 'tur' },
        { name: '금', value: 'fri' },
        { name: '토', value: 'sat' },
        { name: '일', value: 'sun' },
      ],
      checkedRadioButtonValue: '월',
      selectedInputDate1: '2021-01-01',
      selectedInputDate2: '2021-01-01',
      links: [
        {
          label: '메인',
          items: [
            {
              name: 'main1',
              value: 'main1',
            },
            {
              name: 'main2',
              value: 'main2',
            },
          ],
          value: '',
        },
        {
          label: '서브',
          items: [],
          value: '',
        },
      ],
      after: undefined,
      before: undefined,
    };
  },
  mounted() {
    console.log('this', this);
    this.before = this.$refs.before;
    this.after = this.$refs.after;
  },
  setup() {},
  methods: {
    items2init: function (combo) {
      console.log('items2init', combo);
      this.asdf = combo;
      console.log('items2init', this.asdf);
    },
    onAccept: function (...args) {
      console.log('onAccept:', args);
    },
    onCancel: function (...args) {
      console.log('onCancel:', args);
    },
    openModal: async function () {
      const ok = await this.$refs.modal.open();
      console.log('modal ok', ok);
    },
    openAlert: async function () {
      // console.log('open alert', this.$refs);
      console.dir('this.$dialog');
      // const ok = await this.$dialog.alert('hi');
      const ok = await this.error(this.$t('hello.world'));
      console.log('dummy ok', ok);
      // this.$dialog.alert();
      // this.$refs.alert.open();
      //this.$store.dispatch('openDialog', { instance: this });
    },
    openConfirm: async function () {
      console.dir('this.$dialog');
      const ok = await this.$dialog.confirm('hi');
      console.log('dummy ok', ok);
    },
  },
  watch: {
    columns: {
      handler(value) {
        console.log('watch column:', value);
      },
      deep: true,
    },
    itemsValue: {
      handler(value) {
        console.log('watch itemsValue', value);
      },
    },
    checkedValues: {
      handler() {},
    },
    selectedInputDate1: {
      handler(value) {
        console.log('watch selectedInputDate1', value);
      },
    },
    selectedInputDate2: {
      handler(value) {
        console.log('watch selectedInputDate2', value);
      },
    },
  },
};
</script>
<style lang="scss" scoped></style>
