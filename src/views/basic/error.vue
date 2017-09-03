<template>
  <div style="test-align: center">
    <Row>
      <Col span="8" offset="8">
      <Alert type="error" show-icon style="margin-top: 60px">
        <h2 style="font-size: 24px">{{error.code || '404'}}</h2>
        <Icon type="bug" slot="icon"></Icon>
        <span slot="desc" style="font-size: 18px">
              {{error.msg || '页面错误'}}
          </span>
      </Alert>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  computed: {
    error() {
      return this.$store.getters.error || {};
    }
  },
  mounted() {
    console.log(this.$store.getters)
  },
  methods: {}
}

</script>
