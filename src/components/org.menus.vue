<template>
    <Menu theme="light" active-name="213" :open-names="['213']" width="auto" :accordion="true">
        <Submenu class="firstLevel" name="213">
            <span slot="title" class="stitle">
                        <Icon type="ios-navigate"></Icon>
                        <strong>宝安区</strong>
                    </span>
            <Menu-item name="1-1">
                <Menu class="secondLevel" theme="light" width="auto" :accordion="true">
                    <Submenu name="1">
                        <template slot="title">
                            <Icon type="flag"></Icon>
                            伴山家园
                        </template>
                        <Menu-item name="1-1">A栋111</Menu-item>
                        <Menu-item name="1-2">B栋211</Menu-item>
                        <Menu-item name="1-3">C栋311</Menu-item>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="flag"></Icon>
                            青年公寓
                        </template>
                        <Menu-item name="1-1">A111</Menu-item>
                        <Menu-item name="1-2">B211</Menu-item>
                        <Menu-item name="1-3">C311</Menu-item>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="flag"></Icon>
                            四海新城
                        </template>
                        <Menu-item name="1-1">A栋111</Menu-item>
                        <Menu-item name="1-2">B栋211</Menu-item>
                        <Menu-item name="1-3">C栋311</Menu-item>
                    </Submenu>
                </Menu>
            </Menu-item>
        </Submenu>
    </Menu>
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
    }
}
</script>
<style>
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