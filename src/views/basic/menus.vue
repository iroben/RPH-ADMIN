<template>
  <Menu :mode="mode" :theme="theme" width="auto" :active-name="$route.name" :open-names="openNames" @on-select="goRouter" accordion :ref="name">
    <template v-for="menu in menuList">
      <Submenu :name="menu.url" v-if="menu.children && menu.children.length">
        <template slot="title">
          <Icon :type="menu.icon || 'ios-keypad'"></Icon>
          {{menu.title}}
        </template>
        <Menu-item v-for="submenu in menu.children" :key="menu.url + '.' + submenu.url" :name="menu.url + '.' + submenu.url">{{submenu.title}}</Menu-item>
      </Submenu>
      <Menu-item :name="menu.url + '.index'" :key="menu.url + '.index'" v-if="!menu.children || !menu.children.length">
        <Icon :type="menu.icon || 'ios-keypad'"></Icon>
        {{menu.title}}
      </Menu-item>
    </template>
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
      default: 'light'
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
    }
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
    }
  }
}

</script>
