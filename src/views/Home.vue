<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">
        <!-- 触发动作看好了 @select -->
        <!-- 在这写一个router直接可以去路由器对相应路径跳转 -->
        <el-menu router>
          <!-- 接下来对下方操作进行简化 直接从路由器中拿 -->
          <el-submenu
            index="1"
            v-for="(item, index) in this.$router.options.routes"
            :key="index"
            v-show="!item.hidden"
          >
            <template slot="title"
              ><i class="el-icon-location"></i> <span>{{ item.name }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                :index="children.path"
                v-for="(children, index_c) in item.children"
                :key="index_c"
                >{{ children.name }}</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main>
        <router-view />
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