<template>
  <div class="upload-wrapper">
    <label :for="inputerId" class="upload-label">
      <slot></slot>
    </label>
    <input :id="inputerId" type="file" class="selectAvatar" @change="selectImg">
  </div>
</template>

<script>
  import userRes from '@/api/user'
  import { UploadImg } from '@/api/utils'

  export default {
    props: {
      inputerId: {
        type: String,
        default: 'uploadImg'
      }
    },
    data () {
      return {}
    },
    methods: {
      selectImg (e) {
        const file = e.target.files[0]
        userRes.getSign({action: 'head_img'}).then(data => {
          let {dir, uuid, policy, accessid, signature, host} = data.data
          let formData = new FormData()
          formData.append('key', `${dir}/${uuid}`)
          formData.append('Content-Type', file.type)
          formData.append('policy', policy)
          formData.append('OSSAccessKeyId', accessid)
          formData.append('signature', signature)
          formData.append('file', file)
          formData.append('success_action_status', '201')

          return UploadImg(host, formData)
        }).then(data => {
          let retData = data.data
          let url = retData.slice(retData.indexOf('<Location>') + 10, retData.indexOf('</Location>'))
          this.$emit('imgPath', url)
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .upload-wrapper{
    width: 100%;
    height: 100%;
  }
  .selectAvatar{
    display: none;
  }
  .upload-label{
    position: relative;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
</style>
