<template>
    <div class="teacher">
     <el-select v-model="value" clearable placeholder="请选择">
        <el-option
          v-for="t in teachers" :key="t.index" :label="t.name" :value="t.id">
        </el-option>
      </el-select>
      <div class="btn">
        <el-button type="success" plain @click='addTeacher'>添加</el-button>
        <el-button type="danger" plain @click="batchDelete">批量删除</el-button>
      </div>
      <div style="overflow-y:auto;height:70%">
        <el-table :data="teachers" border style="width: 100%;margin-top:5px" @selection-change=" handleSelectionChange">
          <el-table-column  type="selection" width="55" label="选择">
           </el-table-column>
          <el-table-column prop="name" label="教师姓名" width="180">
          </el-table-column>
          <el-table-column prop="gender" label="性别" width="180">
          </el-table-column>
          <el-table-column prop="birth" label="出生日期" width="280">
          </el-table-column>
          <el-table-column prop="hiredate" label="入职日期" width="280">
          </el-table-column>
          <el-table-column  label="操作" width="100">
            <template slot-scope='{row}'>
              <i class="fa fa-edit" @click="changeTeacher(row)"></i>
              <i class="fa fa-trash" @click="deleteTeacher(row.id)"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog :title="teacherDialog.title" :visible.sync="teacherDialog.visible">
        
        <el-form :model="teacherDialog.form">
          <el-form-item label="教师姓名" label-width="180">
            <el-input v-model="teacherDialog.form.name" autocomplete="off" style="width:300px;"></el-input>
          </el-form-item>
          <el-form-item label="教师性别" label-width="180">
            <template>
            <el-radio v-model="teacherDialog.form.gender" label="男">男</el-radio>
            <el-radio v-model="teacherDialog.form.gender" label="女">女</el-radio>
            </template>
          </el-form-item>
          <el-form-item label="出生日期" label-width="180">
            <el-date-picker v-model="teacherDialog.form.birth" type="date" placeholder="选择日期" style="width:300px;">  
            </el-date-picker>
          </el-form-item>
          <el-form-item label="入职日期" label-width="180">
            <el-date-picker v-model="teacherDialog.form.hiredate" type="date" placeholder="选择日期" style="width:300px;">  
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="teacherDialog.visible=false">取 消</el-button>
          <el-button type="primary" @click="saveOrUpdateTeacher">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import axios from '@/http/axios';
export default {
   data(){
       return{
           teachers:[],
           value:'',
           teacherDialog:{
               form:{},
               visible:false,
               title:"",
           },
           ids:[],
       }
   },
   created(){
       this.loadTeacher();
   },
   methods:{
       loadTeacher(){
           axios.get('/user/findAll').then(({data:result})=>{
               this.teachers=result.data;
           }).catch();
       },
       addTeacher(){
           this.teacherDialog.title=="添加老师信息"
           this.teacherDialog.form={};
           this.teacherDialog.visible=true;
       },
       saveOrUpdateTeacher(){
           axios.post('/user/saveOrUpdate',this.teacherDialog.form).then((result)=>{
               if(this.teacherDialog.title=="修改老师信息"){}
            console.log("老师信息修改成功");
          if(this.teacherDialog.title=="添加老师信息"){
            console.log("老师信息添加成功");
          }
          this.teacherDialog.visible=false;
          this.loadTeacher();
           }).catch()
       },
       changeTeacher(data){
           this.teacherDialog.title=="修改老师信息"
           this.teacherDialog.form=data;
           this.teacherDialog.visible=true;
       },
       deleteTeacher(id){
           axios.get('/user/deleteById?id='+id).then((result)=>{
               console.log("删除成功");
               this.loadTeacher();
           }).catch()
       },
       handleSelectionChange(result){
           this.ids=result.map((item)=>{
               return item.id
           })
       },
       batchDelete(){
           var obj={
               ids:this.ids,
           }
           axios.post('/user/batchDelete',obj).then((result)=>{
               console.log('批量删除成功');
               this.loadTeacher();
           }).catch()
       },

       
   }
    
}
</script>
<style>
.teacher{
    box-sizing: border-box;
    width: 100%;
    height:50%;
    padding: 5px;
  }
  .btn{
    float: right;
  }
  .btn button{
    width: 100px;
     right:80px;
  }
  .grade el-table{
    margin-top: 5px;
    overflow-y: auto;
    height: 100%;
  }
</style>