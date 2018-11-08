<template>
    <div class="course">
       <el-select v-model="value" clearable placeholder="请选择">
        <el-option
          v-for="g in courses" :key="g.index" :label="g.name" :value="g.id">
        </el-option>
      </el-select>
      <div class="btn">
        <el-button type="success" plain @click="addCourse">添加</el-button>
        <el-button type="danger" plain @click="batchDelete">批量删除</el-button>
      </div>
      <div style="overflow-y:auto;height:70%">
        <el-table :data="courses" border style="width: 100%;margin-top:5px"  @selection-change="handleSelectionChange">
          <el-table-column  type="selection" width="55" label="选择">
           </el-table-column>
          <el-table-column prop="name" label="课程名称" width="180">
          </el-table-column>
          <el-table-column prop="period" label="课程周期" width="180">
          </el-table-column>
          <el-table-column prop="description" label="课程简介" width="580">
          </el-table-column>
          <el-table-column  label="操作" width="100">
            <template slot-scope='{row}'>
              <i class="fa fa-edit" @click="changeCourse(row)"></i>
              <i class="fa fa-trash" @click="deleteCourse(row.id)"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog :title="courseDialog.title" :visible.sync="courseDialog.visible">
        
        <el-form :model="courseDialog.form">
          <el-form-item label="课程名称" label-width="180">
            <el-input v-model="courseDialog.form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="课程周期" label-width="180">
            <el-select v-model="courseDialog.form.period" clearable placeholder="请选择">
              <el-option
                v-for="(c,index) in courses" :key="c.index" :label="c.period" :value="c.period">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="课程简介" label-width="180">
            <el-input v-model="courseDialog.form.description" autocomplete="off" type="textarea" :rows="2"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="courseDialog.visible=false">取 消</el-button>
          <el-button type="primary" @click="saveOrUpdateCourse">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import axios from '@/http/axios'
export default {
     data(){
       return{
         courses:[],
         value:'',
         ids:[],
         courseDialog:{
           form:{},
           title:'',
           visible:false,
         }
       }
     },
     created(){
       this.loadCourse();
     },
     methods:{
       loadCourse(){
         axios.get('http://120.78.164.247:9999/course/findAllCourse').then(({data:result})=>{
           this.courses=result.data;
         }).catch();
       },
       addCourse(){
         this.courseDialog.title="添加课程信息"
         this.courseDialog.visible=true;
         this.courseDialog.form={};
       },
       saveOrUpdateCourse(){
         axios.post('http://120.78.164.247:9999/course/saveOrUpdate',this.courseDialog.form).then((result)=>{
          if(this.courseDialog.title=="修改课程信息"){}
            console.log("课程信息修改成功");
          if(this.courseDialog.title=="添加课程信息"){
            console.log("课程信息添加成功");
          }
          this.courseDialog.visible=false;
          this.loadCourse();
         }).catch();
       },
       changeCourse(data){
         this.courseDialog.title="修改课程信息"
        this.courseDialog.form=data;
        this.courseDialog.visible=true;
       },
       deleteCourse(id){
         axios.get('http://120.78.164.247:9999/course/deleteById?id='+id).then((result)=>{
           console.log("删除课程信息成功")
           this.loadCourse();
         }).catch();
       },
       handleSelectionChange(data){

         this.ids=data.map((item)=>{
           return item.id
         })
       },
        batchDelete(){
          var obj={
            ids:this.ids,
          }
          axios.post('http://120.78.164.247:9999/course/batchDelete',obj).then((result)=>{
            console.log("批量删除成功")
            this.loadCourse();
          }).catch()
        }
     }
}
</script>
<style>
 .course{
    box-sizing: border-box;
    width: 100%;
    height:50%;
    padding: 5px;
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