<template>
    <template :initialized="initialized">
        <wj-flex-grid-cell-template cellType="ColumnHeader" v-if="all">
            <input type="checkbox" :checked="isAllChecked" @input="onAllCheck($event.target)" />
        </wj-flex-grid-cell-template>
        <wj-flex-grid-cell-template cellType="Cell" v-slot="cell">
            <input type="checkbox" :checked="isChecked(cell)" @input="onCheck(cell, $event.target)" />
        </wj-flex-grid-cell-template>
    </template>
</template>
<script>
import { WjFlexGridColumn } from '@grapecity/wijmo.vue2.grid';
import { reactive, computed } from 'vue';

export default {
    name: 'OwCheckColumn',
    extends: WjFlexGridColumn,
    props: {
        all: {
            type: Boolean,
            default: true,
        },
        modelValue: {
            type: Array,
            default: () => {
                return [];
            },
        },
    },
    setup(props, { emit }) {
        const { value } = computed({
            get: () => props.modelValue,
            set: (value) => emit('update:modelValue', value),
        });

        let column = null;

        const initialized = (col) => {
            column = reactive(col);
        };

        const isAllChecked = computed(() => {
            const { collectionView } = column;
            return (collectionView && collectionView.itemCount) === value.length;
        });

        const isChecked = ({ item }) => {
            return value.indexOf(item) > -1;
        };

        const onAllCheck = ({ checked }) => {
            const { collectionView } = column;

            value.splice(0);

            if (checked) {
                value.push(...collectionView.items);
            }
        };

        const onCheck = ({ item }, { checked }) => {
            const at = value.indexOf(item);
            if (checked) {
                value.push(item);
            } else {
                value.splice(at, 1);
            }
        };

        return {
            initialized,
            isAllChecked,
            isChecked,
            onAllCheck,
            onCheck,
        };
    },
};
</script>
