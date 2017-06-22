<style scoped>
.layout {
  background: #f5f7f9;
  position: relative;
  overflow: hidden;
  height: 100vh;
}

.layout-breadcrumb {
  padding: 10px 15px 0;
}

.layout-content {
  min-height: 200px;
  margin: 15px;
  overflow: hidden;
  background: #fff;
  border-radius: 4px;
}

.layout-content-main {
  padding: 10px;
}

.layout-copy {
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
}

.layout-menu-left {
  background: #1c2438;
}

.layout-header {
  height: 60px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
}

.layout-logo-left {
  width: 90%;
  height: 30px;
  text-align: center;
  font-size: 22px;
  margin: 15px auto;
}

.layout-ceiling-main a {
  color: #9ba7b5;
}

.layout-hide-text .layout-text {
  display: none;
}

.ivu-col {
  transition: width .2s ease-in-out;
}
</style>
<template>
  <div class="layout">
    <Row type="flex" style="height:100%">
      <i-col span="4" class="layout-menu-left">
        <Menu theme="dark" width="auto" :active-name="$route.name" :open-names="openNames" @on-select="selectMenu" accordion ref="mainManu">
          <div class="layout-logo-left">PRHousing</div>
          <Menu-item name="housing.resource">
            <Icon type="ios-home"></Icon>
            房源管理
          </Menu-item>
          <Menu-item name="members">
            <Icon type="person-stalker"></Icon>
            人员管理
          </Menu-item>
          <Submenu name="business">
            <template slot="title">
              <Icon type="ios-keypad"></Icon>
              业务管理
            </template>
            <Menu-item name="business.menbers">人员审核</Menu-item>
            <Menu-item name="business.repair">维修处理</Menu-item>
            <Menu-item name="business.renew">续租审批</Menu-item>
            <Menu-item name="business.checkout">退房审批</Menu-item>
            <Menu-item name="business.complaint">投诉建议</Menu-item>
          </Submenu>
          <Submenu name="system">
            <template slot="title">
              <Icon type="ios-analytics"></Icon>
              系统管理
            </template>
            <Menu-item name="system.role">角色管理</Menu-item>
            <Menu-item name="system.user">用户管理</Menu-item>
            <Menu-item name="system.statistics">统计管理</Menu-item>
            <Menu-item name="system.msg">消息管理</Menu-item>
            <Menu-item name="system.lock">门锁管理</Menu-item>
          </Submenu>
        </Menu>
      </i-col>
      <i-col span="20">
        <div class="layout-header">
        </div>
        <div class="layout-content">
          <div class="layout-content-main">
            <router-view></router-view>
          </div>
        </div>
        <div class="layout-copy">
          2011-2016 &copy; TalkingData
        </div>
      </i-col>
    </Row>
  </div>
</template>
<script>
export default {
  mounted() {
      // 根据路由名称展开上级菜单 如:business.menbers 展开对应name="business" 的菜单
      setTimeout(() => {
        this.$nextTick(function() {
          this.$refs.mainManu.updateOpened()
        });
      }, 500);
    },
    beforeDestroy() {

    },
    data() {
      return {
        search: ''
      }
    },
    computed: {
      title() {
        return this.$route.meta.title || 'PRHousing';
      },
      openNames() {
        return [this.$route.name ? this.$route.name.split('.')[0] : ['']];
      }
    },
    methods: {
      selectMenu(name) {
        this.$router.push({
          name: name
        })
      }
    }
}
</script>
