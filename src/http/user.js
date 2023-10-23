import axios from "./axios";
/**
 * 这是用户的测试实例，可以根据对应的接口编写接口文档
 */
//post方式
export function updatePassword(data) {
  return axios({
    url: "/api",
    method: "post",
    data,
  });
}
//post 传参数的实例
/**
const pwdLogin = () => {
    const param = {
      account: account.value,
      password: password.value,
    };
    Login(param).then((res) => {
      if (res.data.code === '200') {
        //成功的例子
      }
    }).catch(error => {
      // Toast({
      //   message: error.response.data.message,
      // });
      Toast.fail(error.response.data.message);
    });
**/

//get方式
export function getUserInfo() {
  return axios({
    url: "/api/user",
    method: "get",
  });
}
