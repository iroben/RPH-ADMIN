<template>
    <div>
        <Form ref="editForm" :model="formData" :rules="ruleValidate" label-position="right" :label-width="80">
            <Row :gutter="16">
                <Col span="16">
                <Form-item v-if="!isEdit" label="用户名" prop="uname">
                    <Input v-model="formData.uname" placeholder="用户名"></Input>
                </Form-item>
                <Form-item v-if="isEdit" label="用户名" prop="uname">
                    <Alert type="info" style="float:left; margin: 0;">
                        <Icon type="person" style="margin-right: 15px; color: #2d8cf0;"></Icon>{{formData.uname}}
                    </Alert>
                </Form-item>
                <Form-item label="密码" prop="passwd">
                    <Input v-model="formData.passwd" placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="手机号" prop="phone">
                    <Input v-model="formData.phone" placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="角色分配" prop="role">
                    <Select v-model="formData.role">
                        <Option :value="1" :key="1" label="超级管理员"></Option>
                        <Option :value="2" :key="2" label="一般管理员"></Option>
                        <Option :value="3" :key="3" label="物业管理员"></Option>
                    </Select>
                </Form-item>
                <Form-item label="角色" prop="role">
                    <Select v-model="formData.role">
                        <Option :value="1" :key="1" label="超级管理员"></Option>
                        <Option :value="2" :key="2" label="一般管理员"></Option>
                        <Option :value="3" :key="3" label="物业管理员"></Option>
                    </Select>
                </Form-item>
                <Form-item label="冻结" prop="status">
                    <i-switch size="large" v-model="toggleStatus" @on-change="changeStatus">
                        <span slot="open">激活</span>
                        <span slot="close">冻结</span>
                    </i-switch>
                </Form-item>
                <Form-item>
                    <Button :type="isEdit ? 'error' : 'primary'" icon="checkmark-circled" @click="handleSubmit('formData')">提交</Button>
                    <Button type="ghost" icon="refresh" @click="handleReset('formData')" style="margin-left: 8px">重置</Button>
                </Form-item>
                </Col>
                <Col span="8">
                <Form-item label="头像" prop="avatar">
                    <div class="img-long" v-if="formData.avatar">
                        <img :src="formData.avatar">
                    </div>
                    <vue-core-image-upload text="上传头像" cropRatio="25:19" @uploaded="imageuploaded">
                    </vue-core-image-upload>
                    <Input v-model="formData.avatar" disabled placeholder="请选择图片" style="display: none"></Input>
                </Form-item>
                </Col>
            </Row>
        </Form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            adminUser: '',
            editInfor: null,
            toggleStatus: true,
            isSuper: false,
            formData: {
                uname: '',
                passwd: '',
                phone: '',
                role: '',
                avatar: '',
            },
            ruleValidate: {
                uname: [{
                    required: true,
                    message: '请输入用户名'
                }],
                passwd: [{
                    required: true,
                    message: '请输入旧密码'
                }, {
                    validator: this.$rules.validatePass
                }],
                phone: [{
                    required: true,
                    message: '请输入手机号'
                }, {
                    validator: this.$rules.phone
                }],
                role: [{
                    required: true,
                    message: '请分配角色'
                }]
            },
            treeData: []
        }
    },
    computed: {
        isEdit() {
            return this.$route.name == 'system.account.edit';
        },
        adminId() {
            return this.$route.params.adminId;
        }
    },
    created() {
        this.$store.commit('breadcrumb', [{
            name: '账户管理',
            href: 'system/account'
        }]);
        if (this.isEdit) {
            this.$lodash.assignIn(this.formData, {
                uname: '张晓明测试数据',
                passwd: 'qq321321321321',
                phone: '18664357412',
                role: 1,
                avatar: '',
            })
        }
        return false;
        this.$apis.adminInfo({
            id: this.adminId || 0
        }).then(res => {
            let result = res.data;

            if (this.isEdit) {
                this.adminUser = result.user_info.name + '(' + result.user_info.email + ')';
                this.isSuper = result.user_info.super == 1; // 是否为超级管理员
                this.toggleStatus = result.user_info.status == 1;
            } else {
                this.isSuper = false;
                this.toggleStatus = true;
            }

            this.$lodash.forEach(result.tree, (parent) => {
                parent.expand = true;
                if (this.isSuper) {
                    parent.disableCheckbox = true;
                    this.$lodash.forEach(parent.children, (item) => {
                        item.disableCheckbox = true;
                    });
                }
            });

            this.editInfor = result;
            this.$lodash.assignIn(this.formData, this.editInfor);
        });
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        imageuploaded(res) {
            this.formData.new_avatar = res.data.url;
        },
        changeStatus() {
            this.formData.status = this.toggleStatus ? 10 : 20;
        },
        editorChange(contents) {
            this.formData.contents = contents;
        },
        handleSubmit(name) {
            let ids = [];
            let selectedTree = this.$refs['tree'].getCheckedNodes();
            this.$lodash.forEach(selectedTree, (item) => {
                const isInArray = this.$lodash.indexOf(ids, item.parent) > -1;
                ids.push(item.id);
            });
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$apis.adminEdit({
                        id: this.adminId || 0,
                        email: this.formData.email,
                        status: this.toggleStatus ? 1 : 0,
                        menus: ids.join(',')
                    }).then(res => {
                        this.$Message.success('保存成功!');
                        if (this.isEdit) {
                            this.goBack();
                        } else {
                            this.$router.push({
                                name: 'system.admin'
                            });
                        }
                    });
                }
            })
        },
        handleReset() {
            this.$refs['editForm'].resetFields();
        }
    }
}
</script>
<style>
</style>