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

export default {
    name: 'OwFlexGridCheckColumn',
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
        setMaxLength(data) {
            this.cellMaxLength = data.length;
            console.log('최대 길이는 ?? ', this.cellMaxLength);
        },
        allCheck(data, event) {
            let checkCol = document.getElementsByName('checkCol');
            let isChecked = event.target.checked;

            checkCol.forEach((el) => (el.checked = isChecked));
            this.checkedValues.splice(0);
            if (isChecked) {
                this.checkedValues.push(...data);
            }
            console.log(this.checkedValues);
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
            console.log(this.checkedValues);
            this.$emit('checkedData', this.checkedValues);
        },
    },
};
</script>
