<template>
  <div class="table-scoller">
    <div class="table-scoller-innner" :style="style">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    min: {
      type: Number,
      default: 1250
    }
  },
  computed: {
    style() {
      return { 'min-width': this.min + 'px' };
    }
  }
}

</script>
<style scoped>
/*table-scoller*/

.table-scoller {
  width: 100%;
  overflow: hidden;
  overflow-x: auto;
  border: 1px solid #dddee1;
  border-bottom: none;
}

.table-scoller-innner {
  min-width: 1250px;
}

.table-scoller .ivu-table-wrapper {
  border: none;
}

</style>
