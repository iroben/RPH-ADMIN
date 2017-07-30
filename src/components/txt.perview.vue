<template>
  <div class="txtView">
    <span v-if="!content">-</span>
    <Poptip v-if="content && type != 'tool'" :placement="placement" :trigger="trigger">
      {{previewTxt}}
      <div class="api" slot="content">
        {{content}}
      </div>
    </Poptip>
    <Tooltip v-if="content && type == 'tool'" :placement="placement" :content="content">
      {{previewTxt}}
    </Tooltip>
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: 'tool'
    },
    trigger: {
      type: String,
      default: 'hover'
    },
    placement: {
      type: String,
      default: 'right'
    },
    content: {
      type: String
    },
    max: {
      type: Number,
      default: 30,
    }
  },
  computed: {
    previewTxt() {
      return this.content.length > this.max ? this.content.substr(0, this.max) + '...' : this.content;
    }
  }
}

</script>
<style>


</style>
