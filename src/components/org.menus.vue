<template>
    <div> 
        <div style="margin-top: 20px;">
            <MchooseLocation class="title-sub" v-model="resource" :max="3" fname="subTree" placement="bottom"></MchooseLocation>
        </div>
        <Menu theme="light" @on-select="menusClick" :open-names="['213']" width="auto" :accordion="true">
            <Menu class="secondLevel" theme="light" width="auto" :accordion="true">
                <Submenu :name="item.id" v-for="item in menus">
                    <template slot="title">
                        <Icon type="flag"></Icon>
                        {{item.name}}
                    </template>
                    <Menu-item :name="item.id + '-' + sub.id" v-for="sub in item.child">{{sub.name}}</Menu-item>
                </Submenu>
            </Menu>
        </Menu>
    </div>
</template>
<script>
export default {
    props: {
        trigger: {
            type: String,
            default: 'hover'
        },
        placement: {
            type: String,
            default: 'bottom'
        },
        area: {
            type: Array,
            default () {
                return [100, 100]
            }
        },
        viewArea: {
            type: Array,
            default () {
                return [200, 200]
            }
        },
        uri: {
            type: String
        }
    },
    data() {
        return {
            menus: [],
            resource: ''
        }
    },
    watch: {
        resource(id) {
            this.getMenus(id);
        }
    },
    created() {
        this.getMenus();
    },
    methods: {
        getMenus(id) {
            this.$lodash.api(this, 'thirdTee', {
                id: id || ''
            }).then(res => {
                this.menus = res.data;
            })
        },
        menusClick(){
            alert(1)
        }
    }
}
</script>
<style>
.title-sub .mchoose-location-view {
    width: 100%;
}

.firstLevel .ivu-menu-item {
    padding: 0 !important;
    border-right: none !important;
}

.firstLevel .stitle {
    color: #2d8cf0;
    font-size: 16px;
}

.secondLevel .ivu-menu-item {
    padding: 14px 14px 14px 44px !important;
}
</style>