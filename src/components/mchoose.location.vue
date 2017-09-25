<template>
    <div class="mchoose-location">
        <Button type="primary" class="mchoose-location-view" @click="togglePanle">{{activeNames}}
            <Icon :type="visible ? 'arrow-up-b' : 'arrow-down-b'" style="margin-left: 8px;"></Icon>
        </Button>
        <div class="mchoose-location-panel" v-show="visible" :style="styles">
            <div class="mchoose-location-panel-tab">
                <span :class="{'mchoose-location-panel-tab-active': curPanel == key}" v-for="(value, key) in tabs" @click="tabClick(key, value)">{{value}}</span>
            </div>
            <div class="mchoose-location-panel-body clearfix">
                <div class="clearfix" v-if="curPanel == key" v-for="(panel, key) in panels">
                    <span :class="{active: isAcitveItem(item)}" v-if="panel.list" v-for="item in panel.list" @click="chooseItem(item)">
                      {{item.name}}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        value: {
            type: String
        },
        fname: {
            type: String,
            default: 'projectTree'
        },
        max: {
            type: Number
        },
        placement: {
            type: String,
            default: 'bottom',
        },
        trigger: {
            type: String,
            default: 'click'
        }
    },
    data() {
        return {
            visible: false,
            active: '0', // 当前选中的对象
            curPanel: '0', // 当前显示的pabelID
            panels: {},
            activeItem: {},
            styles: {},
            data: []
        }
    },
    computed: {
        tabs() {
            if (!this.active && this.panels) {
                return {
                    '0': this.panels['0']['className']
                }
            }
            this.styles[this.placement == 'top' ? 'bottom' : 'top'] = '34px';
            const ids = ('0-' + this.active).split('-');
            const tabs = {};
            for (var i = 0; i <= ids.length; i++) {
                var oname = ids.slice(0, i).join('-');
                if (i == ids.length && this.activeItem && !this.activeItem.hasChild) {
                    break;
                }
                if (oname && this.panels[oname]) {
                    tabs[oname] = this.panels[oname].className
                }
            }
            return tabs;
        },
        activeIds() {
            return '0-' + this.active;
        },
        activeNames() {
            if (this.activeItem && this.activeItem.name) {
                const str = this.activeItem.pnames + '-' + this.activeItem.name;
                return str.replace(/^0\-/, '');
            } else {
                return '请选择';
            }
        }
    },
    created() {
        this.$apis[this.fname]().then(res => {
            this.data = res.data;
            this.formatPanels(this.data);
        })
        
        const default_ = this.value || '0';
        const str = default_.replace(/\,/g, '-');
        this.active = str;
        let ar = ('0,' + default_).split(',');
        this.curPanel = ar.slice(0, ar.length - 1).join('-');
    },
    watch: {
        value(val) {
            this.active = val || '';
            if (this.max && this.active.split('-').length >= this.max) {
                this.visible = false;
            }
        }
    },
    methods: {
        togglePanle() {
            this.visible = !this.visible;
        },
        isAcitveItem(item) {
            if (this.activeIds == item.pid + '-' + item.id) {
                this.activeItem = item;
                return true;
            } else {
                return false;
            }
        },
        formatPanels(list, pid, pnames) {
            if (this.$lodash.isArray(list) && list.length > 0) {
                const first = list[0];
                const key = pid || 0;
                pnames = pnames || 0;
                const curclassName = first['className'];

                this.$set(this.panels, key, {
                    className: curclassName,
                    list
                })
                this.$lodash.forEach(list, (item) => {
                    item.pid = key;
                    item.pnames = pnames;
                    item.hasChild = item.child ? item.child.length > 0 : false;
                    if (item.hasChild) {
                        this.formatPanels(item.child, key + '-' + item.id, pnames + '-' + item.name);
                    }
                });
            }
        },
        chooseItem(item) {
            if(item.id == 0){
                this.visible = false;
            }
            const ids = item.pid + '-' + item.id;
            this.activeItem = item;
            this.active = ids.replace(/^0\-/, '');
            this.curPanel = item.hasChild ? ids : item.pid;
            this.$emit("input", this.active);
        },
        tabClick(ids) {
            this.curPanel = ids;
        }
    }
}
</script>
<style scoped>
.mchoose-location {
    position: relative;
}

.mchoose-location-panel {
    position: absolute;
    z-index: 20;
    min-width: 400px;
    background-color: #fff;
}

.mchoose-location-view {
    /*margin-bottom: 10px;*/
}

.mchoose-location-panel-tab {
    height: 30px;
}

.mchoose-location-panel-tab span {
    padding: 0 15px;
    display: inline-block;
    border: 1px solid #e9eaec;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    border-bottom-width: 1px;
    border-bottom-color: #fff;
    position: relative;
    z-index: 0;
    min-width: 70px;
    text-align: center;
    font-size: 14px;
    font-weight: 700;
    background: #f8f8f9;
}

.mchoose-location-panel-tab-active {
    z-index: 2 !important;
    border-width: 1px !important;
    border-color: #2d8cf0 !important;
    /*border-bottom-color: #fff !important;*/
    color: #fff !important;
    background: #2d8cf0 ! important;
}

.mchoose-location-panel-body {
    padding: 10px 0;
    background-color: #fff;
    box-shadow: 0 3px 3px 0 rgba(0,0,0,0.2);
}

.mchoose-location-panel-body span {
    cursor: pointer;
    width: 25%;
    display: block;
    text-align: left;
    line-height: 30px;
    float: left;
}

.mchoose-location-panel-body {
    padding: 15px;
    border: 1px solid #2d8cf0;
    border-top-width: 1px;
    /*border-top-color: #2d8cf0;*/
    position: relative;
    top: -1px;
}

.mchoose-location-panel-body .active {
    color: #2d8cf0;
}
</style>