<template>
    <Menu :mode="mode" :theme="theme" width="auto" :active-name="$route.name" :open-names="openNames" @on-select="goRouter" accordion :ref="name">
        <div class="layout-logo">
            <img src="../../logo.png">
        </div>
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
        <Dropdown class="layer-account" placement="bottom-end" @on-click="dropDownClick">
            <Alert style="float:left" type="success" show-icon>用户: {{userEmail}}</Alert>
            <Dropdown-menu slot="list">
                <Dropdown-item name="home">首页</Dropdown-item>
                <Dropdown-item name="modify.passwd">修改密码</Dropdown-item>
                <Dropdown-item name="logout">退出系统</Dropdown-item>
            </Dropdown-menu>
        </Dropdown>
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
    width: 100px;
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

.layout-nav {
    width: 520px;
    margin: 0 auto;
}

.layer-account{
  float: right;
  position: relative;
  top: 12px;
  right: 10px;
}
</style>