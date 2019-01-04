<template>
    <el-container>
      <el-header>randomAD</el-header>
      <el-main>
        <el-col :span="12">
          <el-card class="box-card">
            <inputForm @getForm="textProduct"/>
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
import {writeFile} from './../common/fileCommon'

export default {
  name: 'home',
  components: {
      inputForm
  },
  data(){
    return {
        dealText: '',
        textList: {},
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
      textProduct:function(form,textList){
          this.textList = textList;
          let type = form.type;
          let num = form.num;
          let str = form.str;
          this.addAd(type,num,str);

      },
      addAd: function (type,num,str) {
          console.log('into addAd')

          for(let i in this.textList){
              console.log('234')
              let insert, text = this.textList[i].text;
              if(type === '0')
                  insert = this.getAverage(text.length-1,num);
              else if(type === '1')
                  insert = this.getRandom(text.length-1,num);
              this.insertToContent(insert,text,str);
          }
          console.log(this.textList)
          // this.$message({
          //     message: `原文本共${text.length}子长,本次加入${num}个'${str}'`,
          //     type: 'success'
          // });
      },
      insertToContent: function(insert,text,str){
          let temp = [];
          for(let i = 0;i < insert.length-1;i++){
              temp.push(`${text.slice(insert[i],insert[i+1])}${str}`);
          }
          temp.push(`${text.slice(insert[insert.length-1])}${str}`);
          return temp.join('');
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