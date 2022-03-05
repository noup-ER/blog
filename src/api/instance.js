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
    return response;
},error => {
    return Promise.reject(error);
})

export {
    instance
}
