<template>
    <div class="coursesur">
      <div class="right-header">
          <ul>
            <li>
               <router-link to="/coursesur/coursecontrol">课程控制</router-link>
            </li>
            <li>
              <router-link to="/coursesur/coursemanager">课程管理</router-link>
            </li>
             <li>
              <router-link to="/coursesur/courseshenhe">课程审核</router-link>
            </li>
          </ul>
         </div>
         <div>
           <router-view></router-view>
         </div>
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

</style>