import {instance} from "./instance";

export const getArticleById = function (id){
    return instance({
        url:"getArticleById",
        method:"get",
        params:{
            id
        }
    })
}

export const getClassifyTwoList = function (classify_one){
    return instance({
        url:"getClassifyTwoList",
        method:"get",
        params:{
            classify_one
        }
    })
}

export const getArticleList = function (classify_one,classify_two){
    return instance({
        url:"getArticleList",
        method:"get",
        params:{
            classify_one,
            classify_two
        }
    })
}