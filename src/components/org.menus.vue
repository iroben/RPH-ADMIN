<template>
  <div>
    <div style="margin-top: 20px;">
      <div style="display: none;">{{resultIds}}</div>
      <MchooseLocation class="title-sub" v-model="resource" :max="3" fname="orgTree" placement="bottom"></MchooseLocation>
    </div>
    <ProjectMenus style="margin-top: 20px;" v-model="menuActive" :list="menus"></ProjectMenus>
  </div>
</template>
<script>
export default {
  props: {
    trigger: {
      type: String,
      default: 'hover'
    },
    placement: {
      type: String,
      default: 'bottom'
    },
    area: {
      type: Array,
      default () {
        return [100, 100]
      }
    },
    viewArea: {
      type: Array,
      default () {
        return [200, 200]
      }
    },
    uri: {
      type: String
    }
  },
  data() {
    return {
      menuActive: '',
      menus: [],
      resource: ''
    }
  },
  computed: {
    resultIds() {
      const locationString = this.resource;
      const projectString = this.menuActive;
      let locationIds = [];
      let projectIds = [];
      let type = '3';//basic';
      if (locationIds) {
        locationIds = locationString.split('-');
      }
      if (projectString) {
        projectIds = projectString.split('-');
      }
      if (locationIds.length < 3 && projectIds.length <= 0) {
        type = '3';//basic';
      } else if (locationIds.length >= 3 && projectIds.length <= 0) {
        type = '0';//'area';
      } else if (projectIds.length == 1) {
        type = '1';//'project';
      } else if (projectIds.length >= 2) {
        type = '2';//'floor';
      }
      this.$emit('onchange', {
        ids: this.menuActive ? this.resource + '-' + this.menuActive : this.resource,
        floor: projectIds.length >= 2 ? projectIds[1] : '',
        project: projectIds.length >= 1 ? projectIds[0] : '',
        type: type
      });
    }
  },
  watch: {
    resource(id) {
      this.menuActive = '';
      this.getMenus(id);
    }
  },
  created() {
    this.getMenus();
  },
  methods: {
    getMenus(id) {
      this.$apis.projectSubTree({
        id: id
      }).then(res => {
        this.menus = res.data;
      })
    }
  }
}

</script>
<style>
.title-sub .mchoose-location-view {
  width: 100%;
}

.firstLevel .ivu-menu-item {
  padding: 0 !important;
  border-right: none !important;
}

.firstLevel .stitle {
  color: #2d8cf0;
  font-size: 16px;
}

.secondLevel .ivu-menu-item {
  padding: 14px 14px 14px 44px !important;
}

</style>
