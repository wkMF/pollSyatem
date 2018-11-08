<template>
    <div class="basicdata">
      <div class="right-header">
          <ul>
            <li>
               <router-link to="/basicdata/school">校园信息</router-link>
            </li>
            <li>
              <router-link to="/basicdata/grade">年纪管理</router-link>
            </li>
            <li>
              <router-link to="/basicdata/class">班级管理</router-link>
            </li>
            <li>
              <router-link to="/basicdata/course">课程管理</router-link>
            </li>
            <li>
              <router-link to="/basicdata/teacher">教师管理</router-link>
            </li>
          </ul>
      </div>
      <router-view></router-view>
    </div>
</template>
<script>
export default {
   data(){
     return{}
   }
}
</script>
<style>
.basicdata{
  height: 100%;
  width: 100%;
}
.basicdata>div:nth-child(2){
  height: 100%;
 
}
</style>