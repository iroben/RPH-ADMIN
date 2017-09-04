<template>
    <div>
        <div class="tableFuncs">
            <Button-group shape="circle">
                <Button type="ghost" icon="ios-undo" @click="goBack">
                    <span>返回</span>
                </Button>
            </Button-group>
        </div>
        <Affix style="float:left">
            <Menu :active-name="active" @on-select="menuSelect" style="width: 180px">
                <MenuGroup :title="'编号:' + formData.door_number">
                    <MenuItem name="info">
                    <Icon type="document-text"></Icon>
                    基本信息
                    </MenuItem>
                    <MenuItem name="source">
                    <Icon type="ios-navigate"></Icon>
                    房源信息
                    </MenuItem>
                    <MenuItem name="lock">
                    <Icon type="clock"></Icon>
                    门锁记录
                    </MenuItem>
                </MenuGroup>
            </Menu>
        </Affix>
        <div style="margin-left: 200px;" v-if="active == 'info'">
            <Form ref="formData" :model="formData" :rules="ruleValidate" :label-width="100">
                <Row :gutter="16">
                    <Col span="14" offset="5">
                    <div class="form-title">
                        <Icon type="locked"></Icon>基本信息:
                    </div>
                    <Form-item label="门锁序号" prop="door_number">
                        <Input v-model="formData.door_number" placeholder="请输入"></Input>
                    </Form-item>
                    <Form-item label="门锁品牌" prop="primary">
                        <Input v-model="formData.primary" placeholder="请输入"></Input>
                    </Form-item>
                    <div class="form-title">
                        <Icon type="ios-gear"></Icon>门锁设置:
                    </div>
                    <Form-item label="有效日期" prop="start_time">
                        <Input v-model="formData.start_time" placeholder="请输入" style="display: none"></Input>
                        <Date-picker ref="dateRange" v-model="dateRangeValue" type="daterange" format="yyyy-MM-dd" @on-ok="dateChange" @on-clear="dateClear" confirm placement="bottom-start" placeholder="有效时间" style="width: 200px"></Date-picker>
                    </Form-item>
                    <Form-item label="选择通讯盒" prop="box_number">
                        <Select v-model="formData.box_number" placeholder="请选择身份">
                            <Option :value="1">盒子1</Option>
                            <Option :value="2">盒子2</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="门锁密码" prop="passwod">
                        <Input v-model="formData.passwod" placeholder="请输入"></Input>
                    </Form-item>
                    <div class="form-title">
                        <Icon type="ios-navigate"></Icon>房源设置:
                    </div>
                    <Form-item label="位置" prop="location">
                        <MchooseLocation v-if="formData.location" v-model="formData.location" :max="4"></MchooseLocation>
                    </Form-item>
                    </Col>
                </Row>
                <Row style="text-align: center; padding: 20px">
                    <Button size="large" type="primary" icon="checkmark-circled" @click="handleSubmit('formData')">提交</Button>
                    <Button size="large" type="ghost" icon="refresh" @click="handleReset('formData')" style="margin-left: 8px">重置</Button>
                </Row>
            </Form>
        </div>
        <div style="margin-left: 200px;" v-if="active == 'source'">
            <TableScoller>
                <Table ref="tableA" :columns="columnsA" @on-row-dblclick="goDoorLockEdit" :data="tableSource" stripe border></Table>
            </TableScoller>
        </div>
        <div style="margin-left: 200px;" v-if="active == 'lock'">
            <Table ref="tableB" :columns="columnsB" :data="tableLock" stripe border></Table>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            active: '0',
            dateRangeValue: [], // 日历控件
            editInfor: {}, // 表单详情
            formData: {
                id: '',
                door_number: '',
                primary: '',
                box_number: '',
                passwod: '',
                location: '',
                start_time: '',
                end_time: '',
            },
            ruleValidate: {
                door_number: [{
                    required: true,
                    message: '请输入门锁序号'
                }],
                primary: [{
                    required: true,
                    message: '请填写品牌'
                }],
                box_number: [{
                    required: true,
                    message: '请选择身份'
                }],
                location: [{
                    required: true,
                    message: '请选择位置'
                }],
                start_time: [{
                    required: true,
                    message: '请选择有效日期'
                }]
            },
            locations: [],
            tableSource: [],
            tableLock: [],
            columnsA: [{
                type: 'selection',
                width: 60,
                align: 'center'
            }, {
                title: '项目',
                key: 'project',
                width: 140
            }, {
                title: '楼栋',
                key: 'floor',
                align: 'center',
                className: 'avatarImg',
                width: 130
            }, {
                title: '房号',
                key: 'house_number',
                align: 'center',
                width: 80
            }, {
                title: '面积',
                key: 'area',
                width: 110,
                align: 'center'
            }, {
                title: '户型',
                key: 'house_type',
                width: 120,
                align: 'center'
            }, {
                title: '入住人数',
                key: 'count',
                width: 90,
                align: 'center'
            }, {
                title: '租期',
                key: 'rent_date',
                align: 'center',
                width: 120,
            }, {
                title: '门锁编号',
                key: 'door_number',
                align: 'center'
            }, {
                title: '通信盒编号',
                key: 'door_box_number',
                align: 'center'
            }, {
                title: '房租',
                key: 'rent_pirce',
                align: 'center'
            }, {
                title: '操作',
                key: 'address',
                width: 100,
                align: 'center',
                render: (h, params) => {
                    const row = params.row;
                    const isSuper = row.super == 1;
                    return h('ButtonGroup', [
                        h('Button', {
                            props: {
                                type: 'ghost',
                                icon: 'edit',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    this.goEdit(params.row.id);
                                }
                            }
                        })
                    ]);
                }
            }],
            columnsB: [{
                title: '姓名',
                key: 'name'
            }, {
                title: '操作时间',
                key: 'open_time'
            }, {
                title: '操作',
                key: 'status',
                width: 140,
                align: 'center',
                render: (h, params) => {
                    const row = params.row;
                    const isActive = row.status == 1;
                    return h('Tag', {
                        props: {
                            type: 'border',
                            color: isActive ? 'green' : 'red'
                        }
                    }, row.status_msg);
                }
            }, {
                title: '操作方式',
                key: 'way',
                width: 140,
                align: 'center',
                render: (h, params) => {
                    const row = params.row;
                    const isActive = row.status == 1;
                    return h('Tag', {
                        props: {
                            type: 'border',
                            color: 'red'
                        }
                    }, row.way);
                }
            }]
        }
    },
    computed: {
        uid() {
            return this.$route.params.id;
        },
        paramsFilter() { // 表单提交字段
            return ['id', 'name', 'relation', 'resource', 'gender', 'card_id', 'sugestion', 'birth', 'phone', 'org'];
        }
    },
    watch: {
        active(name) {
            if (name == 'info') {
                this.getInfo();
            } else if (name == 'source') {
                this.getSource();
            } else if (name == 'lock') {
                this.getLock();
            }
        },
    },
    created() {
        this.active = 'info';
        this.$store.commit('breadcrumb', [{
            name: '人员管理',
            href: '/members'
        }]);
    },
    methods: {
        // 清除日历控件
        dateClear() {
            this.daterangeValue = [];
            this.formData.start_time = '';
            this.formData.end_time = '';
            this.getData(1);
        },
        // 日历改变
        dateChange(dateRange) {
            const curDateRange = this.$refs.dateRange.formattingDate(this.dateRangeValue);
            this.formData.start_time = curDateRange[0];
            this.formData.end_time = curDateRange[1];
        },
        menuSelect(name) {
            this.active = name;
        },
        getInfo() {
            this.$lodash.api(this, 'doorlockInfo', {
                uid: this.uid
            }).then(res => {
                this.editInfor = res.data;
                this.dateRangeValue = [this.editInfor.start_time, this.editInfor.end_time];
                this.$lodash.assign(this.formData, this.editInfor);
            })
        },
        goDoorLockEdit(row) {
            this.$router.push({
                'name': 'resource.edit',
                'params': {
                    id: row.id
                }
            });
        },
        getSource() {
            this.$lodash.api(this, 'doorlockSource', {
                uid: this.uid
            }).then(res => {
                this.tableSource = res.data.data || [];
            })
        },
        getLock() {
            this.$lodash.api(this, 'doorlockHistory', {
                uid: this.uid
            }).then(res => {
                this.tableLock = res.data.data || [];
            })
        },
        locationEdit(location) {
            this.$lodash.api(this, 'membersLocationEdit', {
                uid: this.uid,
                location
            }).then(res => {
                this.$Message.success('编辑成功');
            })
        },
        // 返回上一页
        goBack() {
            this.$router.go(-1);
        },
        // 提交成功后返回
        submitBack() {
            this.$router.push({
                name: 'members.index'
            });
        },
        // 图片上传成功
        imageUploaded(url) {
            this.formData.avatar = url;
        },
        // 清除日历控件
        dateClear() {
            this.formData.birth = '';
        },
        // 日历改变
        dateChange(dateRange) {
            const curDateRange = this.$refs.date.formattingDate(this.dateValue);
            this.formData.birth = curDateRange;
        },
        // 提交表单
        handleSubmit(name) {
            // 验证通过
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let params = this.$lodash.filterValue(this.formData, this.paramsFilter);
                    params.resource = params.resource.replace(/\-/g, ',');
                    this.$lodash.api(this, 'addMembers', params).then(res => {
                        this.submitBack();
                        this.$Message.success('编辑成功');
                    });
                }
            })
        },
        // 重置表单
        handleReset(name) {
            this.$refs.date.handleClear();
            this.$refs[name].resetFields();
            this.$lodash.assign(this.formData, this.editInfor);
        }
    }
}
</script>
<style scoped>
.ivu-menu-item-group-title {
    display: none;
}
</style>