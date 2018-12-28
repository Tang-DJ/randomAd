<template>
    <el-container>
      <el-header>randomAD</el-header>
      <el-main>
        <el-col :span="12">
          <el-card class="box-card">
            <inputForm @getForm="addAd"/>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card">
            <el-input type="textarea" v-model="dealText" :rows="16"></el-input>
            <el-button type="primary" id="copy" >点击复制</el-button>
          </el-card>
        </el-col>
      </el-main>
      <el-footer>
        write By molu
      </el-footer>
    </el-container>
</template>

<script>
import Clipboard from 'clipboard';
import inputForm from './../components/inputForm'

export default {
  name: 'home',
  components: {
      inputForm
  },
  data(){
    return {
        dealText: '',
    }
  },
  mounted() {
      const that = this;
      //复制工具
      let clipboard = new Clipboard('#copy',{
          text: function () {
              return that.dealText;
          }
      });
      clipboard.on('success', e => {
          that.$message({
              message: '代码已复制到剪切板',
              type: 'success'
          });
      });
      clipboard.on('error', e => {
          that.$message.error('该浏览器不支持自动复制');
      })
  },
  methods: {
      addAd: function (form) {
          let insert;
          if(form.type === '0')
              insert = this.getAverage(form.text.length-1,form.num);
          else if(form.type === '1')
              insert = this.getRandom(form.text.length-1,form.num);
          this.insertToContent(insert,form.text,form.str);
          this.$message({
              message: `原文本共${form.text.length}子长,本次加入${form.num}个'${form.str}'`,
              type: 'success'
          });
      },
      insertToContent: function(insert,content,text){
          let temp = [];
          for(let i = 0;i < insert.length-1;i++){
              temp.push(`${content.slice(insert[i],insert[i+1])}${text}`);
          }
          temp.push(`${content.slice(insert[insert.length-1])}${text}`);
          this.dealText = temp.join('');
      },
      /**
       * 获得len子长中x个随机数
       * @param len 子长
       * @param x 个数
       * @returns {Array}
       */
      getRandom: function (len,x) {
          let ran = [];
          for(let i =0;i<x;i++) {
              let temp = Math.ceil(Math.random()*len)
              if(!ran.includes(temp))
                ran.push(temp);
              else i--;
          }
          ran.pop();//去掉末尾
          ran.unshift(0);//增加头部
          return ran;
      },
      /**
       * 获得len子长中x个平均
       * @param len
       * @param x
       * @returns {Array}
       */
      getAverage: function (len,x) {
          let diff = Math.ceil(len/x);
          let avr = [];
          for(let m = 1;m<=x;m++){
              avr.push(diff*m);
          }
          avr.pop();
          avr.unshift(0);
          return avr;
      }
  }
}
</script>
<style scoped>

</style>