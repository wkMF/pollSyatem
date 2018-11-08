<template>
    <div class="c-manager">
        <div style="height:50px;"></div>
        <div class="btn">
            <el-button type="success" plain  @click='toAddSurvey'>添加</el-button>
            <el-button type="danger" plain @click='batchDeleteSurveys'>批量删除</el-button>
        </div>
      <div v-loading='loading'>
        <el-table :border='true' :data="surveys" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" fixed></el-table-column>
          <el-table-column prop="clazzVM.grade.name" label="年级" width="100"></el-table-column>
          <el-table-column prop="clazzVM.name" label="班级" width="100"></el-table-column>
          <el-table-column prop="course.name" label="课程" width="160"></el-table-column>
          <el-table-column prop="user.name" label="讲师" width="100"></el-table-column>
          <el-table-column prop="qnVM.description" label="问卷"></el-table-column>
          <el-table-column prop="surveydate" label="创建时间" width="160"></el-table-column>
          <el-table-column label="操作" width='120' fixed="right" align='center'>
            <template slot-scope='{row}'>
              <i class="fa fa-trash" @click='deleteSurvey(row.id)'></i>
              <i class="fa fa-pencil" @click='toUpdateSurvey(row)'></i>
            </template>
          </el-table-column>
        </el-table>
		  </div>

      <!-- 模态框 -->
      <el-dialog :title="surveyDialog.title" :visible.sync="surveyDialog.visible">
         <el-form ref="surveyForm" :rules='rules' :model="surveyDialog.form" label-position='left' size='small'>
		    <el-form-item label="班级" label-width="100px" prop="name">
		      <el-select v-model="surveyDialog.form.clazzId">
            <el-option v-for="v in clazzes" :key="v.id" :value="v.id" :label="v.name"></el-option>
          </el-select>
		    </el-form-item>
        <el-form-item label="课程" label-width="100px" prop="descriptioin">
          <el-select v-model="surveyDialog.form.courseId">
            <el-option v-for="v in courses" :key="v.id" :value="v.id" :label="v.name"></el-option>
          </el-select>
		    </el-form-item>
        <el-form-item label="问卷" label-width="100px" prop="descriptioin">
		     <el-select v-model="surveyDialog.form.questionnaireId">
            <el-option v-for="v in questionnaires" :key="v.id" :value="v.id" :label="v.name"></el-option>
          </el-select>
		    </el-form-item>
        <el-form-item label="讲师" label-width="100px" prop="descriptioin">
         <el-select v-model="surveyDialog.form.userId">
            <el-option v-for="v in users" :key="v.id" :value="v.id" :label="v.name"></el-option>
          </el-select>
		    </el-form-item>
		  </el-form>


      </el-dialog>
    </div>
</template>
<script>
	import getAxios from '@/http/getaxios'
	let axios = getAxios();
	export default {
		data(){
			return {
				loading:false,
				surveys:[],
				rules:{
				},
				multipleSelection:[],
				surveyDialog:{
					title:'',
					visible:false,
					form:{}
        },
        clazzes:[],
        courses:[],
        users:[],
        questionnaires:[],
			}
		},
		created(){
      this.findAllSurveys();
      this.findAllUsers();
      this.findAllCourses();
      this.findAllClazzes();
      this.findAllQuestionnaires();
		},
		methods:{
      findAllQuestionnaires(){
				axios.get('/questionnaire/findAllQuestionnaire')
				.then(({data:result})=>{
					this.questionnaires = result.data;
				})
			},
      findAllUsers(){
				axios.get('/user/findAll')
				.then(({data:result})=>{
					this.users = result.data;
				})
			},
      findAllCourses(){
			
				axios.get('/course/findAllCourse')
				.then(({data:result})=>{
					this.courses = result.data;
				})
			},
       findAllClazzes(){
			
				axios.get('/clazz/findAllVM')
				.then(({data:result})=>{
					this.clazzes = result.data;
				})
			},
			findAllSurveys(){
				this.loading = true;
				axios.get('/survey/findAllSurveyVM')
				.then(({data:result})=>{
					this.surveys = result.data;
				})
				.finally(()=>{
					this.loading = false;
				});
			},
			toAddSurvey(){
				this.surveyDialog.title = '添加课调';
				this.surveyDialog.visible = true;
			},
			closeSurveyDialog(){
				this.surveyDialog.visible = false;
				this.surveyDialog.form = {};
				this.$refs.surveyForm.resetFields();
			},
			saveOrUpdateSurvey(){
				this.$refs.surveyForm.validate((valid)=>{
					if(valid){
						axios.post('/survey/saveOrUpdateSurvey',this.surveyDialog.form)
						.then(({data:result})=>{
							this.findAllSurveys();
							this.closeSurveyDialog();
							this.$notify.success({title:'成功',message:result.message})
						})
						.catch(()=>{
							this.$notify.error({title:'错误',message:'服务器异常'})
						})		
					}
				});
			},
			toUpdateSurvey(row){
				this.surveyDialog.title = '修改课调';
				this.surveyDialog.visible = true;
				this.surveyDialog.form = row;
			},
			batchDeleteSurveys(){
				this.$confirm('此操作将永久删除该数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
        	let ids = this.multipleSelection.map((item)=>{
						return item.id;
					})
					axios.post('/survey/batchDeleteSurveyById',{ids})
					.then(({data:result})=>{
						this.findAllSurveys();
						this.$notify.success({title:'成功',message:result.message})
					})
					.catch(()=>{
						this.$notify.error({title:'错误',message:'服务器异常'})
					})
        })
			},
			handleSelectionChange(val){
				this.multipleSelection = val;
			},
			deleteSurvey(id){
				this.$confirm('此操作将永久删除该数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
        	axios.get('/survey/deleteSurveyById?id='+id)
					.then(({data:result})=>{
						this.findAllSurveys();
						this.$notify.success({title:'成功',message:result.message})
					})
					.catch(()=>{
						this.$notify.error({title:'错误',message:'服务器异常'})
					})
        })
			}
		}
	}
</script>
<style>
    .c-manager{
        position: relative;
        padding: 5px;
    }
    .c-manager .btn{
        position: absolute;
        top:5px;
        left:20px;
    }
</style>