<template>
    <div id="yktupload">
      <!--  -->
      <div class="spin"><i class="icon">&#xe770;</i></div>
      <input class="owly-upload-input" accept="image/*" type="file" ref="upload" @change="upload">
    </div>
</template>

<script>
/**
 * 选中文件及上传
 * limitSize  单位： MB
 * action     上传接口 * 必须传
 * fileType   文件类型
 * name       文件字段名
 * 事件
 * uploadSuccess 上传成功/结束
 * uploadError   上传错误
 * uploadProgress上传中……
 */
import axios from '@/api/axios.js'
export default {
    name: 'yktupload',
    props: {
        limitSize: {
            type: Number,
            default: 3
        },
        action: {
            type: String,
            default: '/api/upload'
        },
        fileType: {
            type: String,
            default: 'image'
        },
        name: {
            type: String,
            default: 'file'
        },
    },
    data() {
        return {
        }
    },
    created() {
      if (!this.action) console.error(`上传接口 * 必须传, yktUpload组件`);
    },
    methods: {
      upload() {
        let config = {
          onUploadProgress: progressEvent => {
            let complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
            // 抛出进度
            this.$emit('uploadProgress', complete)
          }
        }
        let file = this.$refs['upload']
        let formData = new FormData()
        let uploadfile = file.files[0]
        if (!uploadfile.type.includes(this.fileType)) {
          this.$Message.warning('请选择图片')
          return
        }
        if (uploadfile.size > this.limitSize * 1024 * 1024) {
          this.uploadErr = true
          return
        }
        formData.append(this.name, uploadfile)
        // this.Path.upload
        axios.post(this.action, formData, config).then(res => {
            if (res.code === 1) {
              this.success(res)
            } else {
              this.error(res)
            }
        }).catch(err => {
            this.error(err)
        })
      },
      success(data) {
        this.$emit('uploadSuccess', data)
      },
      error(data) {
        this.$emit('uploadError', data)
      }
    }
}
</script>

<style lang="stylus">
  @import '~@/assets/css/index.styl'
  // 样式
</style>
