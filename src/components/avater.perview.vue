<template>
  <div class="avatarView">
    <Poptip placement="right" :trigger="trigger" :placement="placement" :width="viewArea[0]">
        <img :src="uri" :style="{width: area[0] + 'px', height: area[1] ? area[1] + 'px': 'auto'}">
        <div class="api" slot="content">
          <img :src="uri" :style="{width: viewArea[0] + 'px', height: viewArea[1] ? viewArea[1] + 'px': 'auto'}">
        </div>
    </Poptip>
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
      default (){
        return [100, 100]
      }
    },
    viewArea: {
      type: Array,
      default (){
        return [200, 200]
      }
    },
    uri: {
      type: String
    }
  }
}
</script>
<style>

</style>
