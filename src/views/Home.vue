<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">
          <!-- 触发动作看好了 @select -->
          <!-- 在这写一个router直接可以去路由器对相应路径跳转 -->
        <el-menu router>
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-location"></i>导航一</template
            >
            <el-menu-item-group>
                <!-- 跟普通的嵌套路由不太一样 -->
              <el-menu-item index="/Home/test1">选项1</el-menu-item>
              <el-menu-item index="/Home/test2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    menuClick(index) {
      this.$router.push(index);
    },
  },
};
</script>

<style>
</style>