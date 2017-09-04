<template>
  <Row :gutter="15">
    <Col span="8">
    <Card class="box">
      <div class="box-header">
        <Icon type="ios-lightbulb" size="20" style="margin-right: 10px;"></Icon>配套设置</div>
      <div class="box-content">
        <div class="box-item" v-for="(item, index) in facilities">
          <div class="box-item-txt" @click="showEdit(item)">
            {{item.name}} {{index}}
            <Button @click.stop.prevent="delItem(facilities, index)" class="trash" type="primary" size="small">删除</Button>
          </div>
          <div class="box-item-input" v-if="item.edit">
            <Input class="box-item-input-l" type="text" placeholder="请输入..."></Input>
            <div class="box-item-input-r" shape="circle">
              <Button type="text" icon="arrow-return-left"></Button>
            </div>
          </div>
        </div>
        <div class="box-item-input">
          <Input v-model="facilitiesModel" class="box-item-input-l" type="text" placeholder="请输入..."></Input>
          <Button-group class="box-item-input-r">
            <Button type="dashed" icon="refresh" @click="resetModel('facilities')"></Button>
            <Button type="primary" icon="plus" @click="addItem('facilities')">新增</Button>
          </Button-group>
        </div>
      </div>
    </Card>
    </Col>
    <Col span="8">
    <Card class="box green-box">
      <div class="box-header">
        <Icon type="android-contacts" size="20" style="margin-right: 10px;"></Icon>
        与申请人的关系</div>
      <div class="box-content">
        <div class="box-item" v-for="(item, index) in relations">
          <div class="box-item-txt" @click="showEdit(item)">
            {{item.name}} {{index}}
            <Button @click.stop.prevent="delItem(relations, index)" class="trash" type="success" size="small">删除</Button>
          </div>
          <div class="box-item-input" v-if="item.edit">
            <Input class="box-item-input-l" type="text" placeholder="请输入..."></Input>
            <div class="box-item-input-r" shape="circle">
              <Button type="text" icon="arrow-return-left"></Button>
            </div>
          </div>
        </div>
        <div class="box-item-input">
          <Input v-model="relationsModel" class="box-item-input-l" type="text" placeholder="请输入..."></Input>
          <Button-group class="box-item-input-r">
            <Button type="dashed" icon="refresh" @click="resetModel('relations')"></Button>
            <Button type="success" icon="plus" @click="addItem('relations')">新增</Button>
          </Button-group>
        </div>
      </div>
    </Card>
    </Col>
    <Col span="8">
    <Card class="box red-box">
      <div class="box-header">
        <Icon type="android-map" size="20" style="margin-right: 10px;"></Icon>
        户型设置
      </div>
      <div class="box-content">
        <div class="box-item" v-for="(item, index) in unit">
          <div class="box-item-txt" @click="showEdit(item)">
            {{item.name}} {{index}}
            <Button @click.stop.prevent="delItem(unit, index)" class="trash" type="error" size="small">删除</Button>
          </div>
          <div class="box-item-input" v-if="item.edit">
            <Input class="box-item-input-l" type="text" placeholder="请输入..."></Input>
            <div class="box-item-input-r" shape="circle">
              <Button type="text" icon="arrow-return-left"></Button>
            </div>
          </div>
        </div>
        <div class="box-item-input">
          <Input v-model="unitModel" class="box-item-input-l" type="text" placeholder="请输入..."></Input>
          <Button-group class="box-item-input-r">
            <Button type="dashed" icon="refresh" @click="resetModel('unit')"></Button>
            <Button type="error" icon="plus" @click="addItem('unit')">新增</Button>
          </Button-group>
        </div>
      </div>
    </Card>
    </Col>
  </Row>
</template>
<script>
export default {
  data() {
    return {
      unitModel: '',
      facilitiesModel: '',
      relationsModel: '',
      unit: [],
      facilities: [],
      relations: [],
    }
  },
  mounted() {
    this.unit = this.$lodash.testData({
      id: 1,
      edit: false,
      name: '一室一厅'
    }, 5);
    this.facilities = this.$lodash.testData({
      id: 1,
      edit: false,
      name: '沙发'
    }, 5);
    this.relations = this.$lodash.testData({
      id: 1,
      edit: false,
      name: '父母'
    }, 5);
  },
  methods: {
    resetModel(type) {
      this[type + 'Model'] = '';
    },
    addItem(type) {
      this[type].push({
        id: 22,
        name: this[type + 'Model']
      });
    },
    delItem(list, index) {
      this.$Modal.confirm({
        title: '确定删除',
        content: list[index].name + '?',
        onOk: () => {
          list.splice(index, 1);
        }
      })
    },

    showEdit(item) {
      item.edit = !item.edit;
    },
    handleSubmit() {

    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    handleRemove(index) {
      this.formDynamic.items.splice(index, 1);
    }
  }
}
</script>
<style scoped>
.box-header {
  padding: 40px;
  text-align: center;
  font-size: 18px;
  border-radius: 6px;
  color: #fff;
  background-color: #2d8cf0;
}
.red-box .box-header{
    background-color: #ed3f14;
}
.green-box .box-header{
  background-color: #19be6b;
}

.box-content {
  text-align: center;
  font-size: 16px;
  padding: 20px 0 0;
}

.box-item {
  position: relative;
  margin-bottom: 10px;
}

.box-item-txt {
  font-size: 14px;
  border-radius: 3px;
  background-color: #f8f8f9;
  border: 1px solid #fff;
  height: 30px;
  line-height: 30px;
  margin-bottom: 10px;
}

.box-item-input {
  position: relative;
}

.box-item-txt:hover {
  color: #fff;
  background-color: #5cadff;
  border: 1px solid #5cadff;
}
.red-box .box-item-txt:hover{
  background-color: #ed3f14;
  border: 1px solid #ed3f14;
}

.green-box .box-item-txt:hover{
  background-color: #19be6b;
  border: 1px solid #19be6b;
}
.box-item-txt .trash {
  display: none;
}

.box-item-txt:hover .trash {
  display: inline-block;
}

.box-item .trash {
  position: absolute;
  right: 3px;
  top: 3px;
}

.box-item-input-l {
  padding-right: 0px;
}

.box-item-input-r {
  position: absolute;
  right: 0;
  top: 0;
}
</style>