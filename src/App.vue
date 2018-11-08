<template>
  <div id="app">
   <div class="header">
     <div class="header-nav">
       <div class="header-write" >
         <p>智慧校园 课调系统</p>
       </div>
     </div>
   </div>
   <div class="content">
     <div class="left-nav">
       <ul>
         <li><router-link to='/basicdata'>基础数据</router-link></li>
         <li><router-link to='/questionbank'>问卷管理</router-link></li>
         <li><router-link to='/coursesur'>课调管理</router-link></li>
         <li><router-link to='/count'>课调统计</router-link></li>
         <li><router-link to='/setting'>系统管理</router-link></li>
       </ul>
     </div>
     <div class="right-content">
         <router-view ></router-view>
     </div>
   </div>
   <div class="footer">
     <p>追求卓越,因而不凡,智慧校园,就是不一般</p>
   </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
  html {
    font: normal normal 18px '微软雅黑','Microsoft YaHei';
    color: #666;
    overflow-y: hidden;
  }
  *{
    padding: 0;
    margin: 0;
  }
  li{
    list-style: none;
  }
  a{
    color:white;
    text-decoration: none;
  }
  .header{
    width:100%;
    height: 150px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    background-image: url(./pages/images/header.jpg);
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
  }
  .header .header-nav{
    padding:20px;
  }
  .header .header-nav .header-write{
    font-size: 40px;
    font-weight: 600;
    color: black;
    line-height: 110px;
  }
  .content{
    width:100%;
    height: 100%;
    position: absolute;
    top: 150px;
    bottom: 0;
  }
  .content .left-nav{
    width: 150px;
    font-size: 16px;
    color:white;
    background: #5e809c;
    position: absolute;
    top:0;
    bottom: 0;
  }
  .content .left-nav li router-link{
    color:white;
  }
  .content .left-nav li{
    list-style: none;
    width: 100%;
    height: 50px;
     text-align: center;
    line-height: 50px;
    cursor: pointer;
    border-bottom: 1px solid white;
  }
   .content .left-nav li:hover{
     background: #7c8c97;
   }
   .right-content{
     height: 80%;
     box-sizing: border-box;
     margin-left:150px;
   }
   .right-header{
     height: 50px;
     box-sizing: border-box;
     overflow: hidden;
     border-top: 1px solid black;
     border-bottom: 1px solid black;
   }
   .right-header li{
      color:#666;
     float: left;
     width: 150px;
     height: 30px;
     margin: 10px;
     border-right: 2px solid #4f7393;
     text-align: center;
     line-height:30px; 
   }
   .right-header li a{
      color:#666;
   }
  .footer{
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    background:white;
    position: absolute;
    bottom: 0;
    text-align: center;
    line-height: 50px;
    border: 1px solid black;
  }
   i.fa {
	
		cursor: pointer;
     font-size:18px;
	}
	i.fa.fa-trash {
		color: #F56C6C;
	}
  .el-dialog__header{
    background: #3d6a91;
    color:white;
    text-align: center;
  }
 .el-button.el-button--primary{
   background: #3d6a91
 }
 .btn{
   float:right;
 }
.el-tag.el-tag--success.el-tag--small{
  background:#6f8199;
  color: white
}
.el-input__inner{
   border:1px solid #2c608f;
}
.el-input__inner:focus{
    border:1px solid #376690;
}
.el-dialog__title{
  color:white;
  
}
</style>
