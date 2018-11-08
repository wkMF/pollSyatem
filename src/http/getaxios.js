import axios from 'axios'
import qs from 'qs'

axios.defaults.headers.post['Content-Type'] 
	= 'application/x-www-form-urlencoded';
// axios.defaults.baseURL 
    // = 'http://120.78.90.119:8099';
axios.defaults.baseURL ="http://120.78.164.247:9999";
axios.defaults.withCredentials = true;
export default function(flag){
    let instance=axios.create();
    instance.interceptors.request.use((config)=>{
        if(config.method==='post'){
            if(flag&&flag=="array"){
                config.data=qs.stringify(config.data,{allowDots:true})
            }else{
                config.data=qs.stringify(config.data,{arrayFormat:'repeat'})
            }
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
   return instance
}