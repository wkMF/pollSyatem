<template>
    <div class="questionB">
      <el-input   
        placeholder="请输入搜索内容"  
        v-model="questionBsDialog.form.name"  
        clearable style="width:300px;">
      </el-input>
      <div class="btn">
        <el-button type="success" plain >添加</el-button>
        <el-button type="danger" plain>批量删除</el-button>
      </div>
      <div>
        <el-table :data="questionBs" border style="width: 100%;margin-top:5px" >
          <el-table-column  type="selection" width="55" label="选择">
           </el-table-column>
          <el-table-column prop="description" label="问卷名称" width="580">
          </el-table-column>
           <el-table-column prop="name" label="创建时间"  width="180">
          </el-table-column>
          <el-table-column  label="操作" width="150">
            <template slot-scope='{row}'>
              <b @click="ylquestion(row.id)">预览</b>
              <b  @click="changeQuestion(row)">修改</b>
              <b>删除</b>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 预览模态框 -->
        <div class="yl-dialog">
        <el-dialog :title="ylQuestion.form.name" :visible.sync="ylQuestion.visible">
            <div class="yl-header">{{ylQuestion.form.description}}</div>
            <div v-for="(y,index) in ylQuestion.form.questionVMs" class="yl-dialog-question">
                <ul>
                    <li><span>{{index+1}}、</span>{{y.name}}</li>
                </ul>
                <ol>
                    <li v-for="o in y.options"><span>{{o.label}}</span>:<span>{{o.name}}</span> </li>
                </ol>
            </div>
      </el-dialog>
        </div>
        <!-- 修改问卷 -->
        <div class="xg-dialog">
            <el-dialog :title="changeQuestionDialog.title" :visible.sync="changeQuestionDialog.visible" width="60%">
			{{changeQuestionDialog.form}}
		  <el-form :model="changeQuestionDialog.form" label-position='left' size='small'>
		    <el-form-item label="问卷名称" label-width="100px" prop="name">
		       <el-input type="text" v-model="changeQuestionDialog.form.name"></el-input>
		    </el-form-item>

		    <el-form-item label="问卷描述" label-width="100px" prop="description"> 
                <el-input type="text" v-model="changeQuestionDialog.form.description"></el-input>
            </el-form-item>

             <el-form-item label="题目列表" label-width="100px"> 
                 <el-button  @click="selectQuestionDialog(changeQuestionDialog.form.id)">点击选择</el-button>
            </el-form-item>
            <div v-for='(i,index) in ids'>
                <ul >
                    <li><span>{{index+1}}、</span>{{i.name}}</li>
                </ul>
                <ol>
                    <li v-for="o in i.options"><span>{{o.label}}</span>:<span>{{o.name}}</span> </li>
                </ol>
            </div>

		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button size='mini' @click='changeQuestionDialog.visible=false'>取 消</el-button>
		    <el-button size='mini' type="primary">确 定</el-button>
		  </div>
		</el-dialog> 
            <!-- 选择模态框 -->
        <div class="xz-dialog">
        <el-dialog :title="selectquestionDialog.title" :visible.sync="selectquestionDialog.visible" width="50%">
         
          <el-form :model="selectquestionDialog.form" label-position='left' size='small'>
              <ul v-for="s in ylQuestion.form.questionVMs">
                   <el-checkbox v-model="ids" :label="s" @change="changed"></el-checkbox>
                   {{s.name}}
                  <li></li>
              </ul>
               
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button size='mini' @click='changeQuestionDialog.visible=false'>取 消</el-button>
		    <el-button size='mini' type="primary">确 定</el-button>
		  </div>
		</el-dialog> 

            </div>

        </div>
    </div>
</template>
<script>
import axios from "@/http/axios"
export default {
       data(){
           return{
               ids:[],
               idss:[],
               selectquestionDialog:{
                   form:{},
                   title:"",
                   visible:false,
               },
               changeQuestionDialog:{
                   form:{
                       questionVMs:[],
                   },
                   visible:false,
                   title:"",
               },
               ylQuestion:{
                   form:{},
                   title:'',
                   visible:false,
               },
               questionBs:[],
               questionBsDialog:{
                   form:{},
                   title:'',
                   visible:false,
               }
           }
       },
       created(){
           this.loadQuestionBs();
       },
       methods:{
           changed(){
                // this.changeQuestionDialog.form.questionVMs=this.ids;
                this.idss=this.ids.map((item)=>{
                    return item.id;
                })
                this.changeQuestionDialog.form.questionIds=this.idss;
           },
           selectQuestionDialog(id){
               this.findAllQuestion(id)
               this.selectquestionDialog.title="选择问题"
               this.selectquestionDialog.visible=true;
           },
           changeQuestion(data){
               this.findAllQuestion(data.id)
                console.log(JSON.stringify(this.ylQuestion.form))
               this.changeQuestionDialog.title="修改问卷"
               this.changeQuestionDialog.form=data;
               this.changeQuestionDialog.visible=true;
               this.ids=this.ylQuestion.form.questionVMs;
           },
           loadQuestionBs(){
               axios.get('/questionnaire/findAllQuestionnaire').then(({data:result})=>{
                   this.questionBs=result.data;
               }).catch()
           },
            ylquestion(id){
                this.findAllQuestion(id)
                this.ylQuestion.visible=true;
            },
           findAllQuestion(id){
               axios.get('/questionnaire/findQuestionnaireVMById?id='+id).then(({data:result})=>{
                   this.ylQuestion.form=result.data;
               }).catch();
           }
       }
}
</script>
<style>
.questionB{
    position: relative;
    padding: 5px;
}
.questionB .btn{
    position: absolute;
    top:5px;
    left:320px;
}
.questionB b{
    margin-left:10px;
    font-weight:500;
    cursor: pointer;
}
.questionB b:nth-of-type(1){
  color:#34648d;
  font-weight:600;
}
.yl-dialog .el-dialog__body{
    padding:.5em;
    height: 400px;
    overflow-y: auto;
}
.yl-dialog-question{
    width: 100%;
    height:140px;
    box-sizing: border-box;
    border: 1px solid #34648d;
    border-bottom:none;
}
.yl-dialog-question ol{
    margin-left:1em;
    padding-top:.5em;
}
.yl-dialog-question ul{
    font-size: 16px;
    padding-top:.5em;
}
.yl-dialog-question:last-child{
    border-bottom:1px solid #34648d;
}
.yl-header{
    margin:.5em 2em;
}

</style>