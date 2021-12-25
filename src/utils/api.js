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
    console.log(success);
    // 业务逻辑判断
    if (success.status && success.status == 200) {
      // data 中包含想要的数据 以下是业务逻辑错误情况
      if (
        success.data.code == 500 ||
        success.data.code == 401 ||
        success.data.code == 403
      ) {
        console.log('api');
        Message.error({ message: success.data.message });
        this.$router.replace("/");
        // 只用给错误提示
        return;
      }
      // 业务逻辑成功
      if (success.data.message) {
        Message.success({ message: success.data.message });
      }
    }
    // 返回对象 不然拿不到数据
    return success.data;
  },
  //  接口访问失败 500 401 403
  (error) => {
    // console.log(error.response);
    if (error.response.status == 504 || error.response.status == 404) {
      Message.error({ message: "服务器被吃掉了" });
    } else if (error.response.status == 403) {
      Message.error({ message: "权限不足请联系管理员" });
      router.replace("/");
    } else if (error.response.status == 401) {
      Message.error({ message: error.response.data.message });
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

// 请求拦截器用来携带token验证
//请求拦截器
axios.interceptors.request.use(
  (config) => {
    //如果存在token请求携带token
    if (window.localStorage.getItem("tokenStr")) {
      config.headers["Authorization"] = window.localStorage.getItem("tokenStr");
    }
    return config;
  },
  (error) => {
    console.log(error);
  }
);

let base = ``;
// 开始写请求 上边是拦截器
// 传送json格式的post请求
export const postRequest = (url, params) => {
  return axios({
    method: "post",
    url: `${base}${url}`,
    data: params,
  });
};

export const getRequest = (url) => {
  return axios({
    method: "get",
    url: `${base}${url}`,
  });
};
