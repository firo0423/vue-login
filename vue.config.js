module.exports = {
  devServer: {
    host: "localhost",
    port: 8080,
    proxy: {
      "/": {
        target: "http://localhost:4000",
        ws: false,
        //  请求头地址会设置成target的
        changeOrigin: true,
        pathRewrite: {
          "^/": "/",
        },
      },
    },
  },
};
