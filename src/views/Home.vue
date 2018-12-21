<template>
    <el-container>
      <el-header>randomAD</el-header>
      <el-main>
        <el-col :span="12">
          <el-card class="box-card">
            <el-form ref="form" :model="form" label-width="80px" :rules="rules">
              <el-form-item label="添加文本" prop="str">
                <el-input v-model="form.str"></el-input>
              </el-form-item>
              <el-form-item label="规则" prop="rule">
                <el-radio-group v-model="form.rule">
                  <el-radio label="0">共加入X个文本</el-radio>
                  <el-radio label="1">每X子长加入一个文本</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="num" prop="num">
                <el-input-number v-model="form.num" :min="0"></el-input-number>
              </el-form-item>
              <el-form-item label="替换方式" prop="type">
                <el-radio-group v-model="form.type">
                  <el-radio label="0">平均</el-radio>
                  <el-radio label="1" :disabled="form.rule==='1'">随机</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="文本" prop="text">
                <el-input type="textarea" v-model="form.text"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="addAd('form')">立即添加</el-button>
              </el-form-item>
            </el-form>
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

export default {
  name: 'home',
  components: {

  },
  data(){
    return{
        address: '',//txt地址
        str: '',//替换字符串
        rule: '0',//
        form:{
            address:'',
            str:'',
            rule: '',
            num: '',
            type: '',
            text: ''
        },
        x: 0,
        dealText:'',
        rules: {
            str: [
                { required: true, message: '请输入添加文本', trigger: 'blur' },
            ],
            rule: [
                { required: true, message: '请选择规则', trigger: 'blur' }
            ],
            num: [
                { required: true, message: '请输入num', trigger: 'blur' }
            ],
            type: [
                { required: true, message: '请选择替换方式', trigger: 'blur' }
            ],
            text: [
                { required: true, message: '请输入原文本', trigger: 'change' }
            ]
        }
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
      addAd: function (ref) {
          this.$refs[ref].validate((valid) => {
              if (!valid) {
                  return false;
              }
          });
          let insert;
          if(this.form.type === '0')
              insert = this.getAverage(this.form.text.length-1,this.form.num);
          else if(this.form.type === '1')
              insert = this.getRandom(this.form.text.length-1,this.form.num);
          this.insertToContent(insert,this.form.text,this.form.str);
          this.$message({
              message: `原文本共${this.form.text.length}子长,本次加入${this.form.num}个'${this.form.str}'`,
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