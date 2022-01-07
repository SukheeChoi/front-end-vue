export default {
    namespace: true,
    state: {
        useYn: [
            { name: 'Y', value: 'Y' },
            { name: 'N', value: 'N' },
        ],
        system: [
            { value: 'CMG', name: '공통' },
            { value: 'PAL', name: 'PAL' },
            { value: 'SEI', name: 'SEI' },
            { value: 'SAM', name: 'SAM' },
        ],
        bizCd: [
            { biz: 0, value: 'CMG', name: 'CIF' },
            { biz: 1, value: 'CMG', name: 'COM' },
            { biz: 2, value: 'CMG', name: 'OXF' },
            { biz: 3, value: 'CMG', name: 'EAP' },
            { biz: 4, value: 'CMG', name: 'TSK' },
            { biz: 5, value: 'PAL', name: 'LIF' },
            { biz: 5, value: 'PAL', name: 'LCM' },
            { biz: 5, value: 'PAL', name: 'LOG' },
            { biz: 5, value: 'PAL', name: 'PAT' },
            { biz: 5, value: 'PAL', name: 'MAL' },
            { biz: 5, value: 'PAL', name: 'MEM' },
            { biz: 6, value: 'SEI', name: 'EIF' },
            { biz: 7, value: 'SEI', name: 'SVC' },
            { biz: 8, value: 'SEI', name: 'OIC' },
            { biz: 8, value: 'SEI', name: 'INT' },
            { biz: 8, value: 'SEI', name: 'JOB' },
            { biz: 9, value: 'SAM', name: 'SIF' },
            { biz: 10, value: 'SAM', name: 'SAL' },
        ],
    },
    getters: {
        // getUseYn: function(state) {
        //     return state.useYn;
        // },
    },
    mutations: {},
};