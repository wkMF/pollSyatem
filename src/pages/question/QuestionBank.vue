<template>
    <div class="qbank">
        <div class="right-header">
          <ul>
            <li>
               <router-link to="/questionbank/bank">题库管理</router-link>
            </li>
            <li>
              <router-link to="/questionbank/question">问卷管理</router-link>
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
  .qbank{
    height: 100%;
  }
</style>