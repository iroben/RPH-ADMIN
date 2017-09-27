<template>
  <avatarUpload ref="cropper" class="ivu-btn ivu-btn-circle" style="cursor: pointer" crop="server" :url="docUrl" :data="uploadData" :cropRatio="cropRatio" :max-file-size="maxFileSize" :crop="true" :cropBtn="cropBtn" :text="text" @imageuploaded="imageuploaded" @errorhandle="errorhandle">
    <Icon type="upload" style="margin-right:5px;"></Icon>{{text}}
  </avatarUpload>
</template>
<script>
import uploadUrl from '../store/apiurl.js';
import avatarUpload from 'vue-core-image-upload';
export default {
  data() {
    return {
      docUrl: uploadUrl.upload,
      uploadData: {
        type: 'org',
        crop: 1
      }
    }
  },
  components: {
    avatarUpload
  },
  props: {
    cropBtn: {
      type: Object,
      default () {
        return {
          ok: '确认',
          'cancel': '取消'
        }
      }
    },
    text: {
      type: String,
      default: '上传图片'
    },
    maxFileSize: {
      type: Number,
      default: 10485760
    },
    cropRatio: {
      type: String,
      default: '1:1'
    }
  },
  methods: {
    imageuploaded(res) {
      if (res.code == 1) {
        this.$emit('uploaded', res.data.url);
      } else {
        this.$Message.warning(res.msg || '上传失败!');
      }

    },
    errorhandle() {
      this.$Message.error('上传失败!');
    }
  }
}

</script>
<style>


</style>
