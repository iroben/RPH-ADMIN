<template>
    <Menu :mode="mode" :theme="theme" width="auto" :active-name="$route.name" :open-names="openNames" @on-select="goRouter" accordion :ref="name">
        <a href="#/" class="layout-logo">
            <!-- <img src="../../logo.png"> -->
            <span>公租房管理系统</span>
        </a>
        <div class="layout-nav">
            <template v-for="menu in menuList">
                <Submenu :name="menu.name" v-if="menu.children && menu.children.length">
                    <template slot="title">
                        <Icon :type="menu.icon || 'ios-keypad'"></Icon>
                        {{menu.title}}
                    </template>
                    <Menu-item v-for="submenu in menu.children" :key="menu.name + '.' + submenu.name" :name="menu.name + '.' + submenu.name">{{submenu.title}}</Menu-item>
                </Submenu>
                <Menu-item :name="menu.name + '.index'" :key="menu.name + '.index'" v-if="!menu.children || !menu.children.length">
                    <Icon :type="menu.icon || 'ios-keypad'"></Icon>
                    {{menu.title}}
                </Menu-item>
            </template>
        </div>
        
        <Dropdown class="layer-account layer-account-set" placement="bottom-end" @on-click="dropDownClick">
            <div class="layer-account-set-icon">
                <Icon type="ios-cog" size="24"></Icon>
            </div>
            <Dropdown-menu slot="list">
                <Dropdown-item name="home">首页</Dropdown-item>
                <Dropdown-item name="modify.passwd">修改密码</Dropdown-item>
                <Dropdown-item name="logout">退出系统</Dropdown-item>
            </Dropdown-menu>
        </Dropdown>
        <Alert class="layer-account" type="success" show-icon>用户: {{userEmail}}</Alert>
    </Menu>
</template>
<script>
export default {
    props: {
        name: {
            type: String,
            default: 'menu'
        },
        theme: {
            type: String,
            default: 'dark'
        },
        mode: {
            type: String,
            default: 'horizontal'
        }
    },
    computed: {
        menuList() {
            return this.$store.getters.menus;
        },
        routeName() {
            return this.$route.name;
        },
        openNames() {
            const oname = this.mode == 'vertical' ? this.$route.name ? [this.$route.name.split('.')[0]] : [''] : [''];
            return oname;
        },
        menuComponent() {
            return this.$refs[this.name];
        },
        userEmail() {
            return this.$store.getters.userEmail;
        },
        routeName() {
            return this.$route.name;
        },
    },
    methods: {
        uptedeOpend() {
            if (!this.menuComponent) {
                return;
            }

            this.$nextTick(function() {
                this.menuComponent.updateOpened();
            });
        },
        goRouter(name) { // 选中菜单, 跳转到指定路由
            this.$router.push({
                name: name
            })
        },
        dropDownClick(name) {
            if (name == 'logout') {
                this.logout();
            } else {
                this.goRouter(name);
            }
        },
        logout() { // 退出登录
            this.$apis.logout().then(res => {
                this.goRouter('login');
                this.$store.commit('menus', []);
                this.$cookie.delete('uemail');
            });
        },
        goRouter(name) { // 选中菜单, 跳转到指定路由
            this.$router.push({
                name: name
            })
        }
    }
}
</script>
<style>
.layout-logo {
    vertical-align: middle;
    height: 30px;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
    line-height: 0;
}

.layout-logo img {
    height: 100%;
}
.layout-logo span{
    color: #f0f6ff;
    position: relative;
    top: 14px;
    font-size: 22px;
    font-weight: 700;
}

.layout-nav {
    width: 600px;
    margin: 0 auto;
}

.layer-account{
    color: #dadee6;
  float: right;
  position: relative;
  top: 12px;
  margin-right: 15px;
}
.layer-account-set{
    cursor: pointer;
}
.layer-account-set-icon{
    background-color: #495165;
    width: 34px;
    height: 34px;
    line-height: 40px;
    text-align: center;
    border-radius: 4px;
    background-color: rgba(0, 0,0, 0.2);
}

.layer-account-set-icon:hover{
    color: #fff;
    background-color: #19be6b;
}
.ucorg-admin .ivu-menu-dark{
    background-color: #333b50;
    background: -webkit-linear-gradient(45deg, hsla(238, 54%, 49%, 1) 0%, hsla(238, 54%, 49%, 0) 70%), -webkit-linear-gradient(315deg, hsla(186, 100%, 57%, 1) 10%, hsla(186, 100%, 57%, 0) 80%), -webkit-linear-gradient(225deg, hsla(227, 72%, 48%, 1) 10%, hsla(227, 72%, 48%, 0) 80%), -webkit-linear-gradient(135deg, hsla(224, 73%, 55%, 1) 100%, hsla(224, 73%, 55%, 0) 70%);
  background: linear-gradient(45deg, hsla(238, 54%, 49%, 1) 0%, hsla(238, 54%, 49%, 0) 70%), linear-gradient(135deg, hsla(186, 100%, 57%, 1) 10%, hsla(186, 100%, 57%, 0) 80%), linear-gradient(225deg, hsla(227, 72%, 48%, 1) 10%, hsla(227, 72%, 48%, 0) 80%), linear-gradient(315deg, hsla(224, 73%, 55%, 1) 100%, hsla(224, 73%, 55%, 0) 70%);
}

.layer-account.ivu-alert-success{
    border-radius: 3px;
    border: 1px solid #fff;
    border: none;
    background-color: #495165;
    background-color: rgba(0, 0,0, 0.2);
    color: #fff;
}
</style>