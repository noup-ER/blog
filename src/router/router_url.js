export default [
    // {
    //   path:'/index',
    //   name:'index',
    //   component: resolve=>(require(["@/components/testDirectories/t10"],resolve)),
    // },
    {
      path: "/",
      redirect:"/Home"
    },
    {
        path:'/Home',
        name: 'Home',
        component: ()=>import("@/views/blogview/home")
    },
    {
        path: '/computerknowledge',
        name: '计算机知识',
        component: ()=>import("@/views/blogview/content")
    },
    {
        path: '/expriences',
        name: '经历感悟',
        component: ()=>import("@/views/blogview/content")
    },
    {
        path: '/about',
        name: '关于',
        component: ()=>import("@/views/blogview/about")
    }
]
