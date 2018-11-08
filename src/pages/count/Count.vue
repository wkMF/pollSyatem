<template>
    <div class="count">
      <div class="right-header">
          <ul>
            <li>
               <router-link to="/count/countall">全部统计</router-link>
            </li>
            <li>
              <router-link to="/count/countanalysis">统计分析</router-link>
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