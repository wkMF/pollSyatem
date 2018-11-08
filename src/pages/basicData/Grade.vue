<template>
    <div class="grade">
      <el-input   
        placeholder="请输入搜索内容"  
        v-model="value"  
        clearable style="width:400px;">
      </el-input>
      <div class="btn">
        <el-button type="success" plain @click="addGrade">添加</el-button>
        <el-button type="danger" plain>批量删除</el-button>
      </div>
      <div style="overflow-y:auto;height:100%">
        <el-table :data="grades" border style="width: 100%;margin-top:5px" >
          <el-table-column prop="name" label="名称"  width="180">
          </el-table-column>
          <el-table-column prop="descriptioin" label="简介" width="580">
          </el-table-column>
          <el-table-column  label="操作" width="100">
            <template slot-scope='{row}'>
              <i class="fa fa-edit"></i>
              <i class="fa fa-trash" @click="deleteGrade(row.id)"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 模态框 -->
      <el-dialog :title="gradesDialog.title" :visible.sync="gradesDialog.visible">
        {{gradesDialog.form}}
        <el-form :model="gradesDialog.form">
          <el-form-item label="年级名称" label-width="180">
            <el-input v-model="gradesDialog.form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="年级介绍" label-width="180">
            <el-input v-model="gradesDialog.form.descriptioin" autocomplete="off" type="textarea" :rows="2"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="">取 消</el-button>
          <el-button type="primary" @click="saveOrUpdateGrade">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import axios from '@/http/axios';
export default {
     data(){
       return{
         grades:[],
         gradesDialog:{
           form:{},
           visible:false,
           title:""
         },
         value:''
       }
     },
     created(){
       this.loadGrades();
     },
     methods:{
       loadGrades(){
         axios.get('http://120.78.164.247:9999/grade/findAll').then(({data:result})=>{
           this.grades=result.data;
          
         }).catch()
       },
       addGrade(){
         this.gradesDialog.visible=true;
       },
       saveOrUpdateGrade(){
         axios.post('http://120.78.164.247:9999/grade/saveOrUpdate',this.gradesDialog.form).then((result)=>{
           console.log("添加成功",result);
           this.loadGrades();
           this.gradesDialog.visible=false;
         }).catch()
       },
       deleteGrade(id){
         axios.get('http://120.78.164.247:9999/grade/deleteById?id='+id).then((result)=>{
           console.log("删除成功",result);
           this.loadGrades();
         }).catch();
       }
     },
}
</script>
<style>
  .grade{
    box-sizing: border-box;
    width: 100%;
    height:100%;
    padding: 5px;
  }
  .btn button{
    width: 100px;
     right:80px;
  }
  .grade el-table{
    margin-top: 5px;
    overflow-y: hidden;
    height: 100%;
  }
</style>