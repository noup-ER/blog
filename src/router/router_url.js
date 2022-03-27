import content from "@/views/blogview/content"

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
        name: 'home',
        component: ()=>import("@/views/blogview/home")
    },
    {
        path: '/computerknowledge',
        name: 'ck',
        component: ()=>import("@/views/blogview/content")
    },
    {
        path: '/expriences',
        name: 'ex',
        component: ()=>import("@/views/blogview/content")
    },
    {
        path: '/about',
        name: 'about',
        component: ()=>import("@/views/blogview/about")
    }
]
