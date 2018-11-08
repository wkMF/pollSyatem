<template>
    <div class="class">
      <el-select v-model="value" clearable placeholder="请选择">
        <el-option
          v-for="g in grades" :key="g.index" :label="g.name" :value="g.gradeId">
        </el-option>
      </el-select>
      <div class="btn">
        <el-button type="success" plain @click="addClazz">添加</el-button>
        <el-button type="danger" plain>批量删除</el-button>
      </div>
      <div style="overflow-y:auto;height:100%">
        <el-table :data="clazz" border style="width: 100%;margin-top:5px">
          <el-table-column prop="id"  label="编号"  width="50">
          </el-table-column>
          <el-table-column prop="name" label="班级名称" width="180">
          </el-table-column>
          <el-table-column prop="description" label="班级简介" width="580">
          </el-table-column>
          <el-table-column prop="charge.name" label="班主任" width="180">
          </el-table-column>
          <el-table-column  label="操作" width="100">
            <template slot-scope='{row}'>
              <i class="fa fa-edit" @click="changeClazz(row)"></i>
              <i class="fa fa-trash" @click="deleteClazz(row.id)"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 模态框 -->
      <el-dialog :title="clazzDialog.title" :visible.sync="clazzDialog.visible">
        {{clazzDialog.form}}
        <el-form :model="clazzDialog.form">
          <el-form-item label="所属年级" label-width="180">
            <el-select v-model="clazzDialog.form.gradeId" clearable placeholder="请选择">
              <el-option
                v-for="g in grades" :key="g.index" :label="g.name" :value="g.gradeId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级名称" label-width="180">
            <el-input v-model="clazzDialog.form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="班主任" label-width="180">
            <el-select v-model="clazzDialog.form.chargeId" clearable placeholder="请选择">
              <el-option
                v-for="c in charge" :key="c.index" :label="c.name" :value="c.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级介绍" label-width="180">
            <el-input v-model="clazzDialog.form.description" autocomplete="off" type="textarea" :rows="2"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="clazzDialog.visible=false">取 消</el-button>
          <el-button type="primary" @click="saveOrUpdateClazz">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import axios from '@/http/axios'
export default {
   data(){
     return{
       options:[],
       clazz:[],
       value:undefined,
       grades:[],
       charge:[],
       clazzDialog:{
         form:{},
         visible:false,
         title:''
       }
     }
   },
   created(){
     this.loadClass();
     this.loadGrade()
   },
   methods:{
     loadGrade(){
       axios.get('http://120.78.164.247:9999/clazz/findAll').then(({data:result})=>{
         this.grades=result.data;
       }).catch();
     },
      loadClass(){
        axios.get('http://120.78.164.247:9999/clazz/findAllVM').then(({data:result})=>{
          this.clazz=result.data;
          this.charge=result.data.map((item,index)=>{
            return item.charge?item.charge:"---";
          })
        }).catch();
      },
      addClazz(){
        this.clazzDialog.visible=true;
        this.clazzDialog.title="添加班级信息"
      },
      saveOrUpdateClazz(){
        axios.post('http://120.78.164.247:9999/clazz/saveOrUpdateClazz',this.clazzDialog.form).then((result)=>{
          if(this.clazzDialog.title=="修改班级信息"){}
          console.log("班级信息修改成功");
          if(this.clazzDialog.title=="添加班级信息"){
            console.log("班级信息添加成功");
          }
          this.clazzDialog.visible=false;
          this.loadClass();
        }).catch((result)=>{
          console.log("修改失败",result)
        });
      },
      deleteClazz(id){
        axios.get('http://120.78.164.247:9999/clazz/deleteClazzById?id='+id).then(
          (result)=>{
            console.log("删除信息成功");
            this.loadClass();
          }
        ).catch()
      },
      changeClazz(data){
        this.clazzDialog.title="修改班级信息";
        this.clazzDialog.form=data;
        this.clazzDialog.form.chargeId=data.charge.id;
        this.clazzDialog.form.gradeId=data.grade.id;
        this.clazzDialog.visible=true;
      }
   }
}
</script>
<style>
 .class{
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