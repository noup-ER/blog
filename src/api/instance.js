import axios from "axios";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


NProgress.configure({ showSpinner: false });

const instance = axios.create({
    baseURL:"/dataAccess"
});

instance.interceptors.request.use(config=>{
    NProgress.start();
    return config;
},error => {
    return Promise.reject(error);
})

instance.interceptors.response.use(response=>{
    NProgress.done();
    const code = response.data.code;
    switch (code){
        case 200:
            return response;
        case 404:
            throw "服务器获取失败";
        case 601:
            throw "该文章不存在！"
        default:
            throw "发生了错误！！"
    }
},error => {
    return Promise.reject(error);
})

export {
    instance
}
