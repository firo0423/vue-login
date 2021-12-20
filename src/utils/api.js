// axios 处理
import axios from "axios";
// 单独引用element-ui
import { Message } from "element-ui";
// 路由配置
import router from "../router";

// 拦截器 - 响应 在前端处 处理
// success 表示成功调用后端接口
axios.interceptors.response.use(
  (success) => {
    // 业务逻辑判断
    if (success.status && success == 200) {
      // data 中包含想要的数据 以下是业务逻辑错误情况
      if (
        success.data.code == 500 ||
        success.data.code == 401 ||
        success.data.code == 403
      ) {
        Message.error({ message: success.data.message });
        // 只用给错误提示
        return;
      }
      // 业务逻辑成功
      if (success.data.message) {
        Message.success({ message: success.data.message });
      }
    }
    // 返回对象
    return success.data;
  },
  //  接口访问失败 500 401 403
  (error) => {
    if (error.response.code == 504 || error.response.code == 404) {
      Message.error({ message: "服务器被吃掉了" });
    } else if (error.response.code == 403) {
      Message.error({ message: "权限不足请联系管理员" });
      router.replace("/");
    } else {
      if (error.response.data.message) {
        Message.error({ message: error.response.data.message });
      } else {
        Message.error({ message: "未知错误" });
      }
    }
    return;
  }
);

let base = ``
// 开始写请求 上边是拦截器
// 传送json格式的post请求
export const postRequest = (url, params)=>{
    return axios({
        method:'post',
        url:`${base}${url}`,
        data:params
    })
}

