# 基于Vite+Vue3的跨平台开发能力

[中文](readme.md)|[英文](readme-eng.md)

## 概述
- 跨平台开发（Cross-Platform Development）有许多优点，这些优点使得它在现代应用程序开发中越来越受欢迎。
  1. **成本效益：** 一次开发，多平台部署可以显著降低开发和维护成本。开发人员只需编写一次代码，就可以在多个平台上运行，而不必为每个平台单独开发应用。
  2. **时间效率：** 跨平台开发加速了应用程序发布的速度，因为你可以同时为多个平台构建应用，而不需要分别为每个平台开发应用。
  3. **维护简单：** 由于代码库是共享的，因此在所有平台上进行更新和修复非常容易。这降低了维护工作的复杂性和工作量。
  4. **一致的用户体验：** 跨平台开发有助于确保用户在不同平台上获得相似的用户体验。这有助于维护品牌一致性和用户满意度。
  5. **可扩展性：** 跨平台框架通常提供了丰富的库和插件，可以轻松扩展应用的功能，而无需重新编写特定平台的代码。
  6. **跨团队协作：** 跨平台开发可以促进多个团队（如前端和后端开发人员）之间更紧密的协作，因为他们可以共享同一代码库。
  7. **跨设备兼容性：** 应用程序可以在不同类型的设备上运行，包括移动设备（iOS和Android）、Web浏览器、桌面操作系统等。
  8. **快速迭代：** 跨平台开发支持快速迭代和实验，因为更容易在多个平台上测试新功能和改进。
  9. **广泛的开发社区：** 跨平台开发框架通常有庞大的开发社区，提供支持、教程和第三方库，有助于开发人员更容易获得所需的资源。
  10. **市场覆盖：** 跨平台开发允许应用程序覆盖更广泛的市场，因为它们可以在多个平台上推出，满足不同用户群体的需求。

## 引言
- 基于Vite项目的开发环境，采用uniapp的hbuilder编译器打包成为apk文件，其采用的架构方式为基于网页容器webView。

## 快速入门
- 克隆项目
  - git clone https://github.com/LayFz/Vite2Android.git

- 安装依赖
  - npm install

- 运行项目
  - npm run dev


## 核心功能
- 项目包含的主要依赖
  
  ```package.js
    "dependencies": {
      "axios": "^1.2.0",
      "vant": "^4.7.2",
      "vue": "^3.3.4",
      "vite-plugin-style-import": "^1.4.1",
      "vue-router": "^4.1.6"
    },
  ```
  
  
  
- 请求封装
  
  - 项目采用axios封装请求
  
    ```aixos.js
    import axios from "axios";
    import router from '../router/router'
    
    // export const baseURL = "http://api.staraid.cn:8088/";
    const baseURL = "https:/localhost:8088";
    
    //创建一个axios实例
    const service = axios.create({
      baseURL,
    });
    
    //请求拦截
    
    service.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token')
        config.headers['Authorization'] = token
        return config;
      }
      // error => {
      //   return Promise.reject("出错啦");
      // }
    );
    
    //响应拦截
    /**
     * 根据后端的开发规范进行相应的操作
     * 
     */
    service.interceptors.response.use(
      (response) => {
        //根据返回不同的状态码来做后续处理
        // console.log("返回的数据", response);
        if (response.data.code !== '00000') {
            localStorage.clear()
            router.push('/login')
        }
        return response;
      },
      error => {
          if (error.response.data.code === 'A1871') {
              localStorage.clear()
              router.push('/login')
          }
        return Promise.reject(error);
      }
    );
    export default service;
    
    ```
  
    如上的代码中可以自定义守卫路由等相关的功能。

## vite端开发注意事项

- 在vue.config.js文件中要注意打包的相对路径，否则会出现路径不匹配的错误

  ​	<img src="https://gitee.com/LayFz/Vite2Android/raw/main/img/2.png" with="60%">

  <span id="care">在其defineConfig节点中声明,使其打包时不会产生相对路径错误的问题</span>


  ```js
  base: './'
  ```

- 在index.html 中含有如下的代码

- ```index.html
  <!doctype html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Music Applicaition</title>
  </head>
  
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
    <script>
      // 禁用缩放
      function addMeta() {
        document
          .getElementsByTagName('head')[0]
          .append(
            '<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />'
          )
      }
      setTimeout(addMeta, 3000)
  
      // 禁用双指放大
      document.documentElement.addEventListener(
        'touchstart',
        function (event) {
          if (event.touches.length > 1) {
            event.preventDefault()
          }
        },
        {
          passive: false,
        }
      )
  
      // 禁用双击放大
      var lastTouchEnd = 0
      document.documentElement.addEventListener(
        'touchend',
        function (event) {
          var now = Date.now()
          if (now - lastTouchEnd <= 300) {
            event.preventDefault()
          }
          lastTouchEnd = now
        },
        {
          passive: false,
        }
      )
    </script>
  
    <script>
      document.addEventListener('plusready', function () {
        var first = null;
        var webview = plus.webview.currentWebview();
        plus.key.addEventListener('backbutton', function () {
          webview.canBack(function (e) {
            if (e.canBack) {
              webview.back(); //这里不建议修改自己跳转的路径  
            } else {
              //首次按键，提示‘再按一次退出应用’  
              if (!first) {
                first = new Date().getTime(); //获取第一次点击的时间戳  
                // console.log('再按一次退出应用');//用自定义toast提示最好  
                // toast('双击返回键退出应用'); //调用自己写的吐丝提示 函数  
                plus.nativeUI.toast("再按一次退出应用", {
                  duration: 'short'
                }); //通过H5+ API 调用Android 上的toast 提示框  
                setTimeout(function () {
                  first = null;
                }, 1000);
              } else {
                if (new Date().getTime() - first < 1000) { //获取第二次点击的时间戳, 两次之差 小于 1000ms 说明1s点击了两次,  
                  plus.runtime.quit(); //退出应用  
                }
              }
            }
          })
        });
      });
    </script>
  </body>
  </html>
  ```

  以上代码的js部分详细的写出了配置安卓端退出的详细方法，以及一些路由守卫权限的相关存储，用户可根据自生需求进行取舍。其最后是否退出在安卓端的呈现方式如下所示，代码中会判断用户在一秒内是否重复的操作了相关的退出接口。

  <img src="https://gitee.com/LayFz/Vite2Android/raw/main/img/1.png" with="60%">

  

## 如何打包

- 第一步

  - 执行npm run build

    - <img src="https://gitee.com/LayFz/Vite2Android/raw/main/img/3.png" with="60%">

      此时可以得到打包好的dist目录

    - <img src="https://gitee.com/LayFz/Vite2Android/raw/main/img/4.png" with="60%">

      此时一定要核对项目所引用的文件是否符合相对路径的规则，如果导出文件不对应，会出现白屏的情况，请仔细核对[注意事项](#care)

- 第二步

  - 打开Huilder，新建一个h5+项目

    <img src="https://gitee.com/LayFz/Vite2Android/raw/main/img/6.png" with="60%">

  - 此时的目录结构如下

    <img src="https://gitee.com/LayFz/Vite2Android/raw/main/img/8.png" with="60%">

  - 我们需要删除所有的文件，除了mainifest.json

    <img src="https://gitee.com/LayFz/Vite2Android/raw/main/img/9.png" with="60%">

  - <img src="https://gitee.com/LayFz/Vite2Android/raw/main/img/10.png" with="60%">

  - <img src="https://gitee.com/LayFz/Vite2Android/raw/main/img/11.png" with="60%">


​				以上包含了你的应用所需要的图标以及权限相关的配置，具体可以创建一个自行尝试。

- 第三步
  - 将打包的dist文件内内的所有内容复制到h5+的主目录中，如下图所示。
  - <img src="https://gitee.com/LayFz/Vite2Android/raw/main/img/12.png" with="60%">
- 第四步
  - 点击   发行-> 云打包
  - <img src="https://gitee.com/LayFz/Vite2Android/raw/main/img/13.png" with="60%">
  - <img src="https://gitee.com/LayFz/Vite2Android/raw/main/img/14.png" with="60%">
  - 如上图，根据你的需要，进行打包即可，过程可能需要几分钟，需要注意的是，在校验过程中最好是采用原生android生成的密钥，如果仅仅是测试，则不需要，一般情况下也可以使用android studio来进行原生环境的打包。
  - <img src="https://gitee.com/LayFz/Vite2Android/raw/main/img/15.png" with="60%">
  - 以上是等待打包后的最后效果，会产生unpackage目录下的apk路径如图所示，此时可以通过安卓系统安装测试。

## 参考资料

- [UniApp](https://uniapp.dcloud.io/)
- [Vite | 下一代的前端工具链 (vitejs.dev)](https://cn.vitejs.dev/)
- [Vue.js - 渐进式 JavaScript 框架 | Vue.js ](https://cn.vuejs.org/)
- [Vant 4 - 轻量、可定制的移动端 Vue 组件库](https://vant-ui.github.io/vant/#/en-US)

