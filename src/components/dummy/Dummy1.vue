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
        <ow-filter-radio :items="radioItems" v-model="checkedValue"></ow-filter-radio>
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
        { name: '체크2', value: '체크2' },
        { name: '체크3', value: '체크3' },
      ],
      checkedValues: [],
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
    };
  },
  mounted() {
    console.log('this', this);
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
  },
};
</script>
<style lang="scss" scoped></style>
