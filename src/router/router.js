import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
    { 
        path: "/", component: () => import("../views/index.vue") 
    }

];


const router = createRouter({
    history: createWebHashHistory("/"),
    routes,
});

// 路由守卫
//   router.beforeEach((to, from, next) => {
//     // to 即将进入的路由
//     // from 在哪个路由进入的
//     // next 放行
//     //   console.log(to); //打印的是页面要跳转到的路由,例如：它下面的path：为"/login"
//     let token = localStorage.getItem("token") || ""; //在本地存储中获取token
//     if (token) {
//       //判断是否有token
//       next();
//     } else {
//       //在没有token的前提下，to下面的path是否为/login，如果不是则页面跳转到登录页面
//       if (to.path == "/login") {
//         next();
//       } else {
//         next({ path: "/login" }); //跳转页面到login页
//       }
//     }
//   })
  
  // router.beforeEach((to, from,next ) => {
  //   console.log(to, from , next , '分发单反')
  //   const token = localStorage.getItem('token')
  //   if (to.path !== '/login' && token) {
  //     next()
  //     return
  //   } else {
  //     next('/login')
  //     return
  //   }
  //   next()
//   })
  
  export default router;
  
