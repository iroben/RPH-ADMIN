<template>
  <div class="org-menus">
    <dl class="projectMenus" v-for="menu in list">
      <dt :class="{active: activeId == menu.id}" @click="toggleMenus(menu)">
        <Icon type="flag" style="margin-right: 15px;"></Icon>{{menu.name}}
        <Icon class="project-icon" :type="menu.visible_ ? 'chevron-up' : 'chevron-down'"></Icon>
      </dt>
      <dd :class="{active: activeId == submenu.id}" @click="handleClick(submenu, menu)" v-if="menu.visible_ && menu.child && menu.child.length > 0" v-for="submenu in menu.child">{{submenu.name}}</dd>
    </dl>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String
    },
    list: {
      type: Array
    }
  },
  data() {
    return {
      activeId: ''
    }
  },
  methods: {
    toggleMenus(item) {
      this.$set(item, 'visible_', !item.visible_);
      this.chooseItem(item);
    },
    chooseItem(item, pitem) {
      if (item.id != this.activeId) {

        if (pitem) {
          const ids = item.id + '-' + pitem.id;
          this.$emit("onchange", item.id + '-' + pitem.id);
          this.$emit("input", ids);
        } else {
          this.$emit("onchange", item.id);
          this.$emit("input", item.id);
        }

        this.activeId = item.id;
      }
    },
    handleClick(item, pitem) {
      this.chooseItem(item, pitem);
    }
  }
}

</script>
<style scoped>
.projectMenus {
  border: 1px solid #e9eaec;
  margin-top: -1px;
}

.projectMenus .active,
.projectMenus .active .project-icon {
  color: #fff;
}

.projectMenus .active {
  border-top-color: #2d8cf0;
  background-color: #2d8cf0;
}

.projectMenus dt,
.projectMenus dd {
  transition: all 0.2s;
  cursor: pointer;
  font-size: 14px;
  padding: 12px 15px;
}

.projectMenus dt:hover,
.projectMenus dd:hover {
  color: #fff;
  background-color: #5cadff;
}


.projectMenus dt {
  position: relative;
  background-color: #fafafa;
}

.projectMenus dd {
  border-top: 1px solid #e9eaec;
  padding-left: 40px;
}

.projectMenus .project-icon {
  position: absolute;
  right: 15px;
  top: 18px;
  font-size: 12px;
  color: #999;
}

.org-menus {}

</style>
