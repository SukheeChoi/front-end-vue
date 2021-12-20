<template>
    <template>
        <wj-flex-grid-cell-template cellType="ColumnHeader" v-slot="cell">
            <!-- <input type="checkbox" v-model="isAllChecked" @click="allCheck(cell.row.collectionView, $event)" /> -->
            <input type="checkbox" :checked="isAllChecked" @click="allCheck(cell.row.collectionView.items, $event)" />
        </wj-flex-grid-cell-template>
        <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
            <!-- <input type="checkbox" :id="cell.row.index + 1" name="checkCol" @click="clickFunc(cell.row.dataItem, $event)" /> -->
            <input type="checkbox" name="checkCol" @click="clickFunc(cell.row.dataItem, $event)" />
        </wj-flex-grid-cell-template>
    </template>
</template>
<script>
import { WjFlexGridColumn } from '@grapecity/wijmo.vue2.grid';
import { nextTick } from 'vue';

export default {
    name: 'OwCheckColumn',
    extends: WjFlexGridColumn,
    computed: {
        isAllChecked() {
            return this.checkedValues.length === this.cellMaxLength;
        },
    },
    data: function () {
        return {
            cellMaxLength: 0,
            checkedValues: [],
        };
    },
    methods: {
        allCheck(data, event) {
            let checkCol = document.getElementsByName('checkCol');
            let isChecked = event.target.checked;

            checkCol.forEach((el) => (el.checked = isChecked));
            this.checkedValues.splice(0);
            if (isChecked) {
                this.checkedValues.push(...data);
            }
            this.$emit('checkedData', this.checkedValues);
        },
        clickFunc(data, event) {
            const isChecked = event.target.checked;
            if (isChecked) {
                this.checkedValues.push(data);
            } else {
                const index = this.checkedValues.indexOf(data);
                this.checkedValues.splice(index, 1);
            }
            this.$emit('checkedData', this.checkedValues);
        },
    },
    mounted() {
        // this.cellMaxLength = document.getElementsByName('checkCol').length;
        //nextTick().then(() => {});
        console.log(this.$refs);
        console.log('최대 길이는 ?? ', this.cellMaxLength);
        debugger;
    },
};
</script>
