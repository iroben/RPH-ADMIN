<template>
    <div>
        <div class="tableFuncs">
            <Button-group shape="circle">
                <Button type="ghost" icon="ios-undo" @click="goBack">
                    <span>返回</span>
                </Button>
            </Button-group>
        </div>
        <Form ref="formData" :model="formData" :rules="ruleValidate" :label-width="100">
            <Row :gutter="16">
                <Col span="12" offset="6">
                <div class="form-title">
                    <Icon type="person"></Icon>基本信息:</div>
                <Form-item label="姓名" prop="name">
                    <Input v-model="formData.name" placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="性别" prop="gender">
                    <Radio-group v-model="formData.gender">
                        <Radio label="1">男</Radio>
                        <Radio label="2">女</Radio>
                    </Radio-group>
                </Form-item>
                <Form-item label="身份证号码" prop="card_id">
                    <Input v-model="formData.card_id" placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="出生日期" prop="birth">
                    <Date-picker style="width: 100%; " ref="date" v-model="dateValue" type="date" format="yyyy-MM-dd" @on-ok="dateChange" @on-clear="dateClear" confirm placement="bottom-start" placeholder="选择出生日期"></Date-picker>
                </Form-item>
                <Form-item label="身份" prop="relation">
                    <Select v-model="formData.relation" placeholder="请选择身份">
                        <Option value="0">本人</Option>
                        <Option value="1">配偶</Option>
                        <Option value="2">子女</Option>
                        <Option value="3">父母</Option>
                    </Select>
                </Form-item>
                <Form-item label="手机号码" prop="phone">
                    <Input v-model="formData.phone" placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="工作单位" prop="org">
                    <Input v-model="formData.org" placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="审核意见" prop="sugestion">
                    <Input v-model="formData.sugestion" type="textarea" :autosize="{minRows: 5,maxRows: 8}" placeholder="请输入..."></Input>
                </Form-item>
                <Form-item label="用户头像" class="avatar-list">
                    <div class="img-long" v-if="formData.avatar">
                        <img :src="formData.avatar">
                    </div>
                    <vue-core-image-upload text="上传头像" cropRatio="1:1" @uploaded="imageUploaded">
                    </vue-core-image-upload>
                </Form-item>
                <div class="form-title">
                    <Icon type="ios-navigate"></Icon>房源位置:
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
            dateValue: '', // 日历控件
            editInfor: {}, // 表单详情
            formData: {
                name: '',
                relation: '',
                location: '',
                gender: 1,
                card_id: '',
                sugestion: '',
                birth: '',
                phone: '',
                org: ''
            },
            ruleValidate: {
                name: [{
                    required: true,
                    message: '请输入姓名'
                }],
                location: [{
                    required: true,
                    message: '请选择位置'
                }],
                relation: [{
                    required: true,
                    message: '请选择身份'
                }],
                card_id: [{
                    required: true,
                    message: '请填写身份证号码'
                }],
                phone: [{
                    required: true,
                    validator: this.$rules.phone,
                    message: '请填写手机号码'
                }]
            },
        }
    },
    computed: {
        paramsFilter() { // 表单提交字段
            return ['name', 'relation', 'location', 'gender', 'card_id', 'sugestion', 'birth', 'phone', 'org'];
        }
    },
    created() {
        this.$store.commit('breadcrumb', [{
          name: '人员管理',
          href: '/members'
        },{
          name: '添加人员',
          href: ''
        }]);
    },
    methods: {
        // 返回上一页
        goBack() {
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
                    params.location = params.location.replace(/\-/g, ',');
                    this.$lodash.api(this, 'addMembers', params).then(res => {
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