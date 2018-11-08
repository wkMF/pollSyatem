<template>
    <div class="bank">
        <div style="height:50px"></div>
        <div class="btn">
            <el-button type="success" plain @click="addQuestion">添加</el-button>
            <el-button type="danger" plain @click="batchDelete">批量删除</el-button>
        </div>
        
        <div class="question-content" v-for="q in questions">
             <ul>
                <div class="question-title" >
                    <el-checkbox v-model="ids" :label="q.id" ></el-checkbox>
                    {{q.name}}
                    <el-tag type="success" size='small'>{{q.questionType}}</el-tag>
                </div>
                <div class="question-options" v-for="o in q.options" >
                    <ol v-if="o.questionType!='简答题'">
                        <li ><span>{{o.label}}:</span><span>{{o.name}}</span></li>
                    </ol>
                </div>
                
                <div class="question-btns">
                        <i class="fa fa-edit" @click="changeQuestion(q)"></i>
                        <i class="fa fa-trash" @click="deleteQuestion(q.id)" ></i>
				</div>
                
            </ul>
        </div>
        <el-dialog :title="questionDialog.title" :visible.sync="questionDialog.visible" width="60%">
			
		  <el-form ref="questionForm" :rules='rules' :model="questionDialog.form" label-position='left' size='small'>
		    <el-form-item label="题目名称" label-width="100px" prop="name">
		       <el-input type="textarea" :rows="2" placeholder="请输入题目名称" v-model="questionDialog.form.name"></el-input>
		    </el-form-item>
				<el-form-item label="题目类型" label-width="100px" prop="descriptioin">
		    	<el-select v-model='questionDialog.form.questionType' placeholder=''>
		    		<el-option label='单选题' value='单选题'></el-option>
		    		<el-option label='多选题' value='多选题'></el-option>
		    		<el-option label='简答题' value='简答题'></el-option>
		    	</el-select>
		    </el-form-item>
		    <el-form-item label="题目选项" label-width="100px" > 
           
             <el-table size='mini' border :data="questionDialog.form.options" style="width: 100%">
            <el-table-column label="序号" width="60"> 
                <template slot-scope='scope'>
                    {{scope.$index+1}}
                </template>
            </el-table-column>
            <el-table-column prop="label" label="label" width="60"> 
            </el-table-column>
            <el-table-column label="选项">
                <template slot-scope='scope'>
                    <el-input size='mini' v-model='scope.row.name'></el-input>
                </template>
            </el-table-column>
            <el-table-column label="分值" width="60">
                <template slot-scope='scope'>
                    <el-input size='mini' v-model='scope.row.score'></el-input>
                </template>
            </el-table-column>
            <el-table-column label="操作" width='60' align='center'>
                <template slot-scope='scope'>
                    <i class="fa fa-trash" @click='deleteOption(scope.row)'></i>
                </template>
            </el-table-column>
            </el-table>
                <div style="text-align:right;font-size:1.5em" >
                    <el-button @click='addOption' :disabled="questionDialog.form.options.length>=5"> 
                        <i class="fa fa-plus-circle" ></i>
                    </el-button> 
                </div>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button size='mini' @click='questionDialog.visible=false'>取 消</el-button>
		    <el-button size='mini' type="primary" @click='saveOrUpdateQuestion'>确 定</el-button>
		  </div>
		</el-dialog> 
    </div>
</template>
<script>

import getaxios from '@/http/getaxios'
let axios=getaxios('array')
export default {
     data(){
         return{
             ids:[],
             rules:{},
             questions:[],
             questionDialog:{
                 form:{
                     options:[],
                 },
                 visible:false,
                 title:"",
             },
             value:'',
         }
     },
     created(){
         this.loadQuestion();
     },
     methods:{
         batchDelete(){
             let obj={
                 ids:this.ids.toString(),
             }
             axios.post('/question/batchDeleteQuestion',obj).then(({data:result})=>{
                 this.$notify.success({
                     title:"成功",
                     message:result.message,
                 })
                 this.loadQuestion();
             }).catch()
         },
         deleteQuestion(id){
             axios.get('/question/deleteQuestionById?id='+id).then(({data:result})=>{
                 this.$notify.success({
                     title:"删除成功",
                     message:result.message,
                 })
                 this.loadQuestion();
             }).catch()
         },
         changeQuestion(data){
             this.questionDialog.visible=true;
             this.questionDialog.form=data;
             this.questionDialog.title="修改问题"
         },
         deleteOption(row){
             _.remove(this.questionDialog.form.options,(item)=>{
                 return item==row;
             })
            this.questionDialog.form.options.push({});
			this.questionDialog.form.options.pop();
         },
         addQuestion(){
             this.questionDialog.visible=true;
             this.questionDialog.title="添加问题"
         },
         saveOrUpdateQuestion(){
            axios.post('/question/saveOrUpdateQuestion',this.questionDialog.form).then(({data:result})=>{
                this.$notify.success({
						title:'成功',
						message:result.message
                    })
                this.loadQuestion();
                this.questionDialog.visible=false;
            }).catch((error)=>{
                this.$notify.error({
                    title:'失败',
                    message:error,
                })
            })
         },
         addOption(){
             let option={
                 name:''
             };
             let label='';
             let score=0;
             switch(this.questionDialog.form.options.length){
                case 0:
                    label="A";
                    score=5;
                    break;
                case 1:
                    label="B";
                    score=4;
                    break;
                case 2:
                    label="C";
                    score=3;
                    break;
                case 3:
                    label="D";
                    score=2;
                    break;
                case 4:
                    label="E";
                    score=1;
                    break;
             }
             option.label=label;
             option.score=score;
             this.questionDialog.form.options.push(option)
         },
         loadQuestion(){
             axios.get('/question/findAllQuestionVM').then(({data:result})=>{
                 this.questions=result.data;
             }).catch().finally();
         }
     },
}
</script>
<style>
    .question-content{
        box-sizing:border-box;
        padding:1em 2em;
        font-size: 14px;
        overflow-y: auto;
        position: relative;
        position: 30%;
    }
    .question-options{
        padding: .5em 2em
    }
    .question-title{
        font-size: 20px;
        font-weight:500;
    }
    .bank .btn{
        padding:1em;
        position: absolute;
       top:0
    }
    .bank{
        height:83%;
        overflow-y: auto;
        position: relative;
    }
   
	i.fa {
		cursor: pointer;
		padding: 0 .3em;
	}
	i.fa.fa-trash {
		color: #89969c
	}
    .question-btns {
		position: absolute;
		right: 2em;
		top: 18px;;
	}
    .el-button.el-button--success.is-plain{
         background:#2a5f8b;
         color:white;
         border: 1px solid #2a5f8b;
    }
	.el-button.el-button--success.is-plain:hover{
        background:#8a99a0;
         border: 1px solid #8a99a0;
    }
    .el-button.el-button--danger.is-plain{
        background:#567894;
        color:white;
        border:none;
    }
    .el-button.el-button--danger.is-plain:hover{
         border:none;
         background:#736a7e;
    }
    
</style>


