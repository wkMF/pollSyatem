import axios from 'axios'
import qs from 'qs'

axios.defaults.headers.post['Content-Type'] 
	= 'application/x-www-form-urlencoded';
// axios.defaults.baseURL 
    // = 'http://120.78.90.119:8099';
    //axios.defaults.baseURL ="http://120.78.164.247:9999";
    axios.defaults.baseURL ="http://120.78.90.119:9999";

axios.interceptors.request.use((config) => {
    if (config.method === 'post') {
      config.data = qs.stringify(config.data,{arrayFormat: 'repeat' });
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


export default axios;