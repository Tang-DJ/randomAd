<template>
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="添加文本" prop="str">
            <el-input v-model="form.str"></el-input>
        </el-form-item>
        <el-form-item label="选取文件">
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
</template>

<script>
    export default {
        name: "inputForm",
        data(){
            return{
                fileList:{},
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
        methods: {
            addAd: function (ref) {
                this.$refs[ref].validate((valid) => {
                    if (!valid) {
                        return false;
                    }
                });
                this.$emit('getForm', this.form)
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
            dealList: function () {
                // const fileReader = new FileReader();
                // fileReader.readAsText(file.raw);
                // fileReader.onload = function(e){
                //     //console.log(this.result)
                // }
            },
            



        }
    }
</script>

<style scoped>

</style>