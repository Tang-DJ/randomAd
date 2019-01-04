<template>
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="插入文本" prop="str">
            <el-input type="input" v-model="form.str"></el-input>
        </el-form-item>
        <el-form-item label="选取文件" prop="file">
            <el-upload
                    class="upload-demo"
                    action=""
                    :auto-upload="false"
                    :on-change="handleAdd"
                    :on-remove="handleRemove"
            >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传txt文件</div>
            </el-upload>
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
        <el-form-item label="插入方式" prop="type">
            <el-radio-group v-model="form.type">
                <el-radio label="0">平均</el-radio>
                <el-radio label="1" :disabled="form.rule==='1'">随机</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="addAd('form')">立即添加</el-button>
        </el-form-item>
    </el-form>
</template>

<script>

    export default {
        name: "inputForm",
        data(){
            let validFile = (rule, value, callback) => {
                if (Object.keys(this.fileList).length === 0) {
                    callback(new Error('请上传文件'));
                } else {
                    callback();
                }
            };
            return{
                fileList:{},//文件列表
                textList: {},//文件内容提取之后的列表
                str: '',//替换字符串
                rule: '0',//
                form:{
                    str:'',
                    rule: '',
                    num: '',
                    type: '',
                },
                x: 0,
                rules: {
                    str: [
                        { required: true, message: '请输入插入文本', trigger: 'change' }
                    ],
                    file: [
                        { validator: validFile, message: '请上传文件', trigger: 'blur' },
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
                },


            }
        },
        methods: {
            addAd: function (ref) {
                let valid;
                this.$refs[ref].validate((va) => {valid = va;});
                if (!valid) {
                    return false;
                }
                this.dealList(this.fileList);
                this.$emit('getForm', this.form ,this.textList)
            },
            handleAdd: function (file) {
                this.fileList[file.uid] = file;
            },
            handleRemove(file) {
                delete this.fileList[file.uid];
            },
            /**
             * 对文件列表进行处理
             */
            dealList: function (fileList) {
                for(let i in fileList){
                    let fileReader = new FileReader();
                    fileReader.readAsText(fileList[i].raw);
                    let that = this;
                    fileReader.onload = function(e){
                        that.textList[i] ={
                            text: this.result,
                            title: fileList[i].name
                        }
                    };
                }
            },
        }
    }
</script>

<style scoped>

</style>