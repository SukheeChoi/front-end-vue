<template>
    <div id="main">
        <Header />
        <!-- wrap -->
        <div id="wrap" class="wrap">
            <!-- content -->
            <div class="content">
                <div class="content_tab">
                    <b-tabs nav-wrapper-class="ow-tabs" v-model="tabIdx">
                        <b-tab
                            v-for="{ tab, title } in tabs"
                            :key="tab"
                            :title="title"
                            lazy
                            @click="
                                changeComponent(tab);
                                subTabIdx = 0;
                            "
                        >
                            <template #title>
                                <strong>{{ title }}</strong>
                            </template>
                        </b-tab>
                    </b-tabs>
                </div>

                <div class="content_tab" v-if="tabIdx === 0">
                    <b-tabs
                        nav-wrapper-class="ow-tabs"
                        v-model="subTabIdx"
                    >
                        <b-tab
                            v-for="{ tab, title } in subTabs1"
                            :key="tab"
                            :title="title"
                            lazy
                            @click="changeComponent(tab)"
                        >
                            <template #title>
                                <strong>{{ title }}</strong>
                            </template>
                        </b-tab>
                    </b-tabs>
                </div>

                <div class="content_tab" v-if="tabIdx === 1">
                    <b-tabs
                        nav-wrapper-class="ow-tabs"
                        v-model="subTabIdx"
                    >
                        <b-tab
                            v-for="{ tab, title } in subTabs2"
                            :key="tab"
                            :title="title"
                            lazy
                            @click="changeComponent(tab)"
                        >
                            <template #title>
                                <strong>{{ title }}</strong>
                            </template>
                        </b-tab>
                    </b-tabs>
                </div>

                <div class="content_tab" v-if="tabIdx === 2">
                    <b-tabs
                        nav-wrapper-class="ow-tabs"
                        v-model="subTabIdx"
                    >
                        <b-tab
                            v-for="{ tab, title } in subTabs3"
                            :key="tab"
                            :title="title"
                            lazy
                            @click="changeComponent(tab)"
                        >
                            <template #title>
                                <strong>{{ title }}</strong>
                            </template>
                        </b-tab>
                    </b-tabs>
                </div>
                <div class="content_tab" v-if="tabIdx === 3">
                    <b-tabs
                        nav-wrapper-class="ow-tabs"
                        v-model="subTabIdx"
                    >
                        <b-tab
                            v-for="{ tab, title } in subTabs4"
                            :key="tab"
                            :title="title"
                            lazy
                            @click="changeComponent(tab)"
                        >
                            <template #title>
                                <strong>{{ title }}</strong>
                            </template>
                        </b-tab>
                    </b-tabs>
                </div>

                <div class="content_tab" v-if="tabIdx === 4">
                    <b-tabs
                        nav-wrapper-class="ow-tabs"
                        v-model="subTabIdx"
                    >
                        <b-tab
                            v-for="{ tab, title } in subTabs5"
                            :key="tab"
                            :title="title"
                            lazy
                            @click="changeComponent(tab)"
                        >
                            <template #title>
                                <strong>{{ title }}</strong>
                            </template>
                        </b-tab>
                    </b-tabs>
                </div>

                <div class="content_body">
                    <div class="container-fluid">
                        <keep-alive>
                            <component
                                v-bind:is="selectedComponent"
                            ></component>
                        </keep-alive>
                    </div>
                </div>
            </div>
            <!-- //content -->

            <!-- content -->
            <!-- <div class="content">
        <div class="content_tab">
            <b-tabs nav-wrapper-class="ow-tabs" v-model="tabIdx">
                <b-tab
                    v-for="tab in tabs"
                    :key="tab"
                    :title="tab"
                    lazy
                    @click="changeComponent(tab.id)"
                >
                    <template #title>
                        <strong>{{ tab.name }}</strong>
                    </template>
                </b-tab>
            </b-tabs>
            <template v-if="showSubTab">
              <div id="sub-btn-wrap" class="ow-tabs"></div>
            </template>
        </div>
        <div class="content_body" ref="content_body">
          <div class="container-fluid">
            <div class="row ow-gutter">
              <div class="col">
                <keep-alive>
                  <component v-bind:is="selectedComponent"></component> 
                </keep-alive>
              </div>
            </div>
          </div>
        </div>
      </div> -->
            <!-- //content -->
        </div>
        <!-- //wrap -->
    </div>
</template>

<script src="./script/mainLayout.js" />

<style lang="sass">
@import '@/assets/ow-admin.scss'
</style>
