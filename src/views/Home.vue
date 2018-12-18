<template>
  <div>
    <el-header>randomAD</el-header>
    <el-container>
      <el-upload
              class="upload-demo"
              drag
              action= "https://jsonplaceholder.typicode.com/posts/"
              multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传txt文件</div>
      </el-upload>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {

  },
  data(){

  },
  methods: {
      uploadTxt: function (val) {
         console.log(val);
      }
  }
}
</script>