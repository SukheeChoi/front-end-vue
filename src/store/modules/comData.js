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
            { linkValue: 'CMG', value: 'CIF', name: '업무공통 인터페이스' },
            { linkValue: 'CMG', value: 'COM', name: '업무공통' },
            { linkValue: 'CMG', value: 'OXF', name: '프레임워크' },
            { linkValue: 'CMG', value: 'EAP', name: '전자결재' },
            { linkValue: 'CMG', value: 'TSK', name: '할일관리' },
            { linkValue: 'PAL', value: 'LIF', name: '생산물류 인터페이스' },
            { linkValue: 'PAL', value: 'LCM', name: '생산물류 공통' },
            { linkValue: 'PAL', value: 'LOG', name: '생산물류 업무처리' },
            { linkValue: 'PAL', value: 'PAT', name: '협력사 포털' },
            { linkValue: 'PAL', value: 'MAL', name: '이커머스' },
            { linkValue: 'PAL', value: 'MEM', name: '통합회원관리' },
            { linkValue: 'SEI', value: 'EIF', name: '서비스교육 인터페이스' },
            { linkValue: 'SEI', value: 'SVC', name: '서비스' },
            { linkValue: 'SEI', value: 'OIC', name: '교육' },
            { linkValue: 'SEI', value: 'INT', name: '인테리어' },
            { linkValue: 'SEI', value: 'JOB', name: '덴잡' },
            { linkValue: 'SAM', value: 'SIF', name: '영업마케팅 인터페이스' },
            { linkValue: 'SAM', value: 'SAL', name: '국내영업' },
        ],
    },
    getters: {
        // getUseYn: function(state) {
        //     return state.useYn;
        // },
    },
    mutations: {},
};