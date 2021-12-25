<template>
  <div>
    111111111111111111111
    <br />
    <el-button type="primary" size="default" @click="testProtected"
      >点击测试加密端口</el-button
    >
  </div>
</template>

<script>
export default {
  methods: {
    testProtected() {
      this.getRequest(this.HOST + "/api/protected").then((res) => {
        this.$message({
          showClose: true,
          message: "恭喜你，请求成功",
          type: "success",
        });
        this.$router.replace("/");
      });
    },
    checktoken() {
      this.getRequest(this.HOST + "/api/protected").then((res) => {
        console.log(1);
      });
    },
  },
  mounted: function(){
    this.checktoken()
  },
};
</script>

<style>
</style>