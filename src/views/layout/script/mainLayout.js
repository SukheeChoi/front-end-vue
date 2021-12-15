import Header from "@/components/Header";
import LayoutVue from "@/views/LayoutVue";
import Dashboard from "@/views/Dashboard";
import { widgets, useTiles } from "@/views/layout/script/tiles";
import axios from "axios";

export default {
    name: "mainLayout",
    components: {
        Header,
        LayoutVue,
        Dashboard,
    },
    data() {
        return {
            param: {},
            tabIdx: 0,
            tabs: ["LayoutVue", "menu2", "menu3"],
            DocuTabs: ["대기", "진행", "완료", "반려"],
            currentTab: 0,
            currentDocuTab: 0,
            toastShow: false,
            sidebarShow: false,
            selectedComponent: "LayoutVue",
        };
    },
    methods: {
        changeComponent: function(componentName) {
            console.log("##### tabClick ##### ==>", this.tabIdx);
            this.selectedComponent = componentName;
        },
        sidebarShowUpdate() {
            this.toastShow = false;
            this.sidebarShow = !this.sidebarShow;
        },
        userinfo() {
            console.log(localStorage.getItem("userInfo"));
            return localStorage.getItem("userInfo");
        },
    },
    watch: {
        tabIdx: function() {
            console.log("활성화된 TabIdx==>", this.tabIdx);
        },
    },
    setup() {
        const { tiles, addTile, ...other } = useTiles(true);

        for (let i = 0; i <= widgets.length - 1; i++) {
            addTile(widgets[i].id);
        }

        return {
            widgets,
            tiles,
            addTile,
            ...other,
        };
    },
};