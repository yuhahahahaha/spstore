import axios from 'axios'
export function request(config){
    const instance = axios.create({
        baseURL:'http://152.136.185.210:7878/api/hy66',
        timeout:5000
    })
    instance.interceptors.request.use(config=>{
        return config
    },
    err=>{
        console.log(err);
    })
    instance.interceptors.response.use(res=>{
        // 用完也是要返回
        // 一般我们只要拿到的还是数据，所以只返回data
        // console.log(res);
        return res.data
    },err=>{
        console.log(err);
    })
    // 默认返回的就是一个promise
    return  instance(config)  
}