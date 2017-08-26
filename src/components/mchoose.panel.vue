<template>
    <div v-if="visible">
      <div class="mchoose-head" v-show="chooseAr.length">
        <span class="thead"><Icon type="information-circled" style="margin-right: 5px;"></Icon>已选择:</span>
          <Tag v-if="item" style="margin-right: 10px;" v-for="(item, index) in chooseAr" @on-close="handleClose(item.class, index)" type="border" closable color="blue">{{item.name}}</Tag>
      </div>
      <div class="mchoose-Panel">
          <div class="mchoose-row" v-if="!choose[row.class]" v-for="row in data">
              <div class="mchoose-title">{{row.name}}:</div>
              <div class="mchoose-body clearfix" :style="{'padding-left': labelWidth +'px', 'height' : row._subvisible ? '40px' : 'auto'}">
                  <div class="mchoose-body-inner clearfix" :name="row.class" :style="{'overflow' : row._subvisible ? 'hidden' : 'auto'}">
                      <span class="mchoose-item" v-for="item in row.child" @click="chooseItem(row.class, item)">
                        {{item.name}}
                      </span>
                  </div>
              </div>
              <div class="mchoose-funs">
                  <!-- <span class="mchoose-funs-mult" v-if="row.mult">多选</span> -->
                  <span class="mchoose-funs-more hidden" v-show="row._subvisible" @click="toggleVisible(row, $el)">更多<Icon type="chevron-down"></Icon></span>
                  <span class="mchoose-funs-more2 hidden" v-show="!row._subvisible" @click="toggleVisible(row, $el)">收起<Icon type="chevron-up"></Icon></span>
              </div>
          </div>
      </div>
    </div>
</template>
<script>
import $ from '../jqmin.js';
export default {
    props: {
        labelWidth: {
            type: Number,
            default: 80
        },
        visible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            choose: {},
            chooseAr: [],
            data: [{
                class: 'primary', // 类型会生成一类
                name: '品牌',
                mult: true,
                child: [{ // 类的项目, 如果有二级类Active后显示classSub
                    id: 1,
                    name: '林氏木业'
                }, {
                    id: 2,
                    name: '何仙姑家居'
                }, {
                    id: 2,
                    name: '何仙姑家居'
                }, {
                    id: 2,
                    name: '何仙姑家居'
                }, {
                    id: 2,
                    name: '何仙姑家居'
                }, {
                    id: 2,
                    name: '何仙姑家居'
                }, {
                    id: 2,
                    name: '何仙姑家居'
                }, {
                    id: 2,
                    name: '何仙姑家居'
                }],
                classSub: [{ // 二级类
                    class: 'size', // 类型
                    name: '尺寸',
                    child: [{ // 类的项目, 如果有二级类Active后显示classSub
                        id: 1,
                        name: '较大',
                    }, {
                        id: 1,
                        name: '一般',
                    }],
                    classSub: [{ // 二级类
                        class: 'dtailsize', // 类型
                        name: '具体尺寸',
                        child: [{
                            id: 1,
                            name: '100cm2',
                        }, {
                            id: 1,
                            name: '200cm2',
                        }]
                    }]
                }]
            }, {
                class: 'comfortable',
                name: '环保材料',
                child: [{
                    id: 1,
                    name: 'a材料'
                }, {
                    id: 2,
                    name: 'b材料'
                }]
            }]
        }
    },
    mounted() {
        this.$lodash.forEach(this.data, (row) => {
            this.$set(row, '_subvisible', true);
        });
        this.$nextTick(() => {
            const innerDomList = $('.mchoose-body-inner');
            for (let i = 0; i < innerDomList.length; i++) {
                const high = innerDomList.eq(i).height();
                const body = innerDomList.eq(i).parent();
                const funs = body.siblings('.mchoose-funs');
                const more = funs.find('.mchoose-funs-more');
                const more2 = funs.find('.mchoose-funs-more2');
                if (high > 40) {
                    body.css({ 'padding-right': '120px' })
                    more.removeClass('hidden');
                    more2.removeClass('hidden');
                }
                console.log(funs)
                console.log(high)
            }
        })
    },
    methods: {
        toggleVisible(row, el) {
          el.scrollTop = 0; // 设置scroll未完成
            row._subvisible = !row._subvisible;
        },
        chooseItem(className, item){
          item.class = className;
          this.$set(this.choose, className, item.id);
          this.chooseAr.push(item);
        },
        handleClose(className, index){
          this.chooseAr.splice(index, 1);
          this.choose[className] = null;
        }
    }
}
</script>
<style scoped>
.mchoose-Panel {
    padding: 8px 0 10px;
}
.mchoose-head{
  position: relative;
  padding: 5px 10px 0 70px;
  border-bottom: 1px solid #ddd;
  height: 48px;
}
.mchoose-head .thead{
  position: absolute;
  left: 0;
  line-height: 30px;
  padding-right: 10px;
}
.mchoose-row {
  border-bottom: 1px dotted #ddd;
  position: relative;
}

.mchoose-title {
    position: absolute;
    left: 0;
    top: 9px;
}

.mchoose-funs {
    position: absolute;
    right: 0;
    top: 9px;
}

.mchoose-body {
    height: 40px;
    overflow: hidden;
}
.mchoose-body-inner{
  max-height: 180px;
  overflow-y: auto;
}

.mchoose-item {
  cursor: pointer;;
    float: left;
    margin: 9px 40px 9px 0;
    height: 18px;
    color: #000;
    text-decoration: none;
}

.mchoose-funs span {
    cursor: pointer;
}

.mchoose-funs span:hover {
    color: #2b85e4;
}

.mchoose-funs .ivu-icon {
    margin-left: 5px;
}

.mchoose-funs-mult {
    border: 1px solid #ddd;
    padding: 3px 8px;
}

.mchoose-funs-mult:hover {
    border-color: #2b85e4;
}

.hidden {
    display: none;
}

.mchoose-funs-more,
.mchoose-funs-more2 {

    margin: 0 10px;
}
</style>