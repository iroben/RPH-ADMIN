<template>
    <div>
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
                    <MchooseLocation v-model="formData.location" :max="4"></MchooseLocation>
                </Form-item>
                </Col>
            </Row>
            <Row style="text-align: center; padding: 20px">
                <Button size="large" type="primary" icon="checkmark-circled" @click="handleSubmit('formData')">提交</Button>
                <Button size="large" type="ghost" icon="refresh" @click="handleReset('formData')" style="margin-left: 8px">重置</Button>
            </Row>
        </Form>
    </div>
</template>
<script>
export default {
    data() {
        return {
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
                passwod: [{
                    required: true,
                    message: '请填写密码'
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
        }
    },
    computed: {
        paramsFilter() { // 表单提交字段
            return ['id', 'door_number', 'primary', 'box_number', 'passwod', 'location', 'start_time', 'end_time'];
        }
    },
    created() {
        this.$store.commit('breadcrumb', [{
            name: '门锁管理',
            href: '/doorlock'
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
        // 返回上一页
        goBack() {
            this.$router.push({
                name: 'doorlock.index'
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
        // 提交表单
        handleSubmit(name) {
            // 验证通过
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let params = this.$lodash.filterValue(this.formData, this.paramsFilter);
                    params.location = params.location.replace(/\-/g, ',');
                    this.$lodash.api(this, 'doorlockAdd', params).then(res => {
                        this.goBack();
                        this.$Message.success('添加成功!');
                    });
                }
            })
        },
        // 重置表单
        handleReset(name) {
            this.$refs.date.handleClear();
            this.$refs[name].resetFields();
        }
    }
}
</script>