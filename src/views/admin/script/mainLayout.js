import Header from "@/components/Header";
import Menu1_1 from "../menu1_1.vue";
import Menu1_2 from "../menu1_2.vue";
import Menu2_1 from "../menu2_1.vue";
import Menu2_2 from "../menu2_2.vue";
import Menu3_1 from "../menu3_4.vue";
import LoginHistory from "../LoginHistory.vue";
import AccessHistory from "../AccessHistory.vue";
import ExcelHistory from "../ExcelHistory.vue";
import Menu2_3 from "../menu2_3.vue";
import Menu2_4 from "../menu2_4.vue";
import Menu2_5 from "../menu2_5.vue";
import Menu2_6 from "../menu2_6.vue";
import Menu2_7 from "../menu2_7.vue";
import Menu2_8 from "../menu2_8.vue";
import Menu2_9 from "../menu2_9.vue";
import Menu2_10 from "../menu2_10.vue";
import WordMgmt from "../WordMgmt.vue";
import Menu3_3 from "../menu3_3.vue";
import Menu3_4 from "../menu3_4.vue";
import LangCode from "../LangCode.vue";
import TimeZone from "../TimeZone.vue";
import Currency from "../Currency.vue";
import MessageMgmt from "../MessageMgmt.vue";
import CodeMgmt from "../CodeMgmt.vue";
import TemplateMgmt from "../TemplateMgmt.vue";
import SystemConfig from "../SystemConfig.vue";
import PasswordMgmt from "../PasswordMgmt.vue";

export default {
    name: "adminMainLayout",
    components: {
        Header,
        Menu1_1,
        Menu1_2,
        Menu2_1,
        Menu2_2,
        Menu3_1,
        LoginHistory,
        AccessHistory,
        ExcelHistory,
        Menu2_3,
        Menu2_4,
        Menu2_5,
        Menu2_6,
        Menu2_7,
        Menu2_8,
        Menu2_9,
        Menu2_10,
        WordMgmt,
        Menu3_3,
        Menu3_4,
        LangCode,
        TimeZone,
        Currency,
        MessageMgmt,
        CodeMgmt,
        TemplateMgmt,
        SystemConfig,
        PasswordMgmt,
    },
    data() {
        return {
            tabIdx: 0,
            showSubTab: false,
            subTabIdx: 0,
            tabs: [
                { tab: "Menu1_1", title: "배치관리", subMenuYN: "Y" },
                { tab: "Menu2_1", title: "권한관리", subMenuYN: "Y" },
                { tab: "Menu3_1", title: "데이터표준", subMenuYN: "Y" },
                { tab: "LoginHistory", title: "보고서", subMenuYN: "Y" },
                { tab: "Menu5_1", title: "설정", subMenuYN: "Y" },
                { tab: "Menu6_1", title: "인터페이스", subMenuYN: "Y" },
                { tab: "Menu7_1", title: "개인화 설정", subMenuYN: "Y" },
                { tab: "Menu8_1", title: "협력사", subMenuYN: "Y" },
                { tab: "Menu9_1", title: "보고용", subMenuYN: "Y" },
            ],
            subTabs1: [
                { tab: "Menu1_1", title: "배치스케줄" },
                { tab: "Menu1_2", title: "배치결과" },
                { tab: "Menu1_3", title: "담당자" },
            ],
            subTabs2: [
                { tab: "Menu2_1", title: "사용자관리" },
                { tab: "Menu2_2", title: "도급/협력사 사용자관리" },
                { tab: "Menu2_3", title: "업무그룹관리" },
                { tab: "Menu2_4", title: "부서별 업무그룹관리" },
                { tab: "Menu2_5", title: "화면관리" },
                { tab: "Menu2_6", title: "메뉴관리" },
                { tab: "Menu2_7", title: "업무그룹별 메뉴관리" },
                { tab: "Menu2_8", title: "개인별 업무그룹 관리" },
                { tab: "Menu2_9", title: "부서별 메인화면 관리" },
                { tab: "Menu2_10", title: "부서별 Dashboard 화면 관리" },
                // { tab: "", title: "권한그룹" },
                // { tab: "Menu2_2", title: "사용자권한" },
                // { tab: "Menu2_3", title: "그룹권한" },
                // { tab: "Menu2_4", title: "권한그룹/조직매핑" },
                // { tab: "Menu2_6", title: "권한그룹" },
            ],
            subTabs3: [
                { tab: "WordMgmt", title: "표준단어" },
                { tab: "Menu3_2", title: "금칙어" },
                { tab: "Menu3_3", title: "표준용어" },
                { tab: "Menu3_4", title: "표준도메인" },
                { tab: "Menu3_5", title: "공통코드" },
            ],
            subTabs4: [
                { tab: "LoginHistory", title: "사용자로그인 이력" },
                { tab: "AccessHistory", title: "화면접속 이력" },
                { tab: "ExcelHistory", title: "엑셀다운로드 이력" }
            ],
            subTabs5: [
                { tab: "LangCode", title: "언어코드" },
                { tab: "TimeZone", title: "타임존" },
                { tab: "Currency", title: "통화코드" },
                { tab: "MessageMgmt", title: "메세지소스" },
                { tab: "CodeMgmt", title: "공통코드" },
                { tab: "TemplateMgmt", title: "메세지템플릿" },
                { tab: "SystemConfig", title: "시스템설정" },
                { tab: "PasswordMgmt", title: "비밀번호변경" },
            ],
            // tabs: [
            //     {
            //         id: 'Menu1_1',
            //         name: '배치관리',
            //         child: [
            //             {
            //                 id: 'Menu1_1',
            //                 name: '배치작업',
            //             },
            //             {
            //                 id: 'Menu1_2',
            //                 name: '배치결과',
            //             },
            //             {
            //                 id: 'Menu1_3',
            //                 name: '배치변경이력',
            //             },
            //         ]
            //     },
            //     {
            //         id: 'Menu2_1',
            //         name: '권한관리',
            //         child: [
            //             {
            //                 id: 'Menu2_1',
            //                 name: '사용자',
            //             },
            //             {
            //                 id: 'Menu2_2',
            //                 name: '사용자권한',
            //             },
            //             {
            //                 id: 'Menu2_3',
            //                 name: '그룹권한',
            //             },
            //             {
            //                 id: 'Menu2_4',
            //                 name: '권한그룹/조직매핑',
            //             },
            //             {
            //                 id: 'Menu2_5',
            //                 name: '화면관리',
            //             },
            //             {
            //                 id: 'Menu2_6',
            //                 name: '권한그룹',
            //             },
            //         ]
            //     },
            //     {
            //         id: 'Menu3_1',
            //         name: '데이터표준',
            //         child: [
            //             {
            //                 id: 'Menu3_1',
            //                 name: '표준단어',
            //             },
            //             {
            //                 id: 'Menu3_2',
            //                 name: '금칙어',
            //             },
            //             {
            //                 id: 'Menu3_3',
            //                 name: '표준용어',
            //             },
            //             {
            //                 id: 'Menu3_4',
            //                 name: '표준도메인',
            //             },
            //             {
            //                 id: 'Menu3_5',
            //                 name: '코드',
            //             },
            //         ]
            //     },
            // ],
            selectedComponent: "",
        };
    },
    methods: {
        changeComponent: function(componentName) {
            console.log("##### tabClick ##### ==>", this.tabIdx, componentName);
            this.selectedComponent = componentName;
        },
        // changeComponent(componentName) {
        //     console.log("##### tabClick ##### ==>", this.tabIdx);
        //     this.selectedComponent = componentName;

        //     // 2depth 생성
        //     this.showSubTab = !this.showSubTab;
        //     let tabs = this.tabs;

        //     this.$nextTick(function() {
        //         tabs.forEach(function(id) {
        //             if (id.id === componentName) {
        //                 let subButtonUl = document.createElement("ul");
        //                 subButtonUl.classList.add("nav");
        //                 subButtonUl.classList.add("nav-tabs");

        //                 document
        //                     .querySelector("#sub-btn-wrap")
        //                     .insertAdjacentHTML(
        //                         "beforeend",
        //                         subButtonUl.outerHTML
        //                     );
        //                 // child 탐색
        //                 let list = id.child;

        //                 list.forEach(function(item) {
        //                     let subButtonLi = document.createElement("li");
        //                     subButtonLi.classList.add("nav-item");

        //                     let subButton = document.createElement("a");
        //                     subButton.classList.add("nav-link");
        //                     subButton.innerHTML = item.name;

        //                     document
        //                         .querySelector("#sub-btn-wrap ul")
        //                         .insertAdjacentHTML(
        //                             "beforeend",
        //                             subButtonLi.outerHTML
        //                         );

        //                     document
        //                         .querySelector("#sub-btn-wrap li")
        //                         .insertAdjacentHTML(
        //                             "beforeend",
        //                             subButton.outerHTML
        //                         );
        //                 });
        //             }
        //         });
        //     });
        // },
    },
    watch: {
        tabIdx: function() {
            console.log("활성화된 TabIdx==>", this.tabIdx);
        },
    },
};