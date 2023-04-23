<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎您 : {{ name }}</div>
    <div class="dashboard-text">
      您的身份是 : <span v-for="role in roles" :key="role">{{ role }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name", "roles"]),
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    min-height: calc(100vh - 50px);
    background: url("https://inory.oss-cn-shanghai.aliyuncs.com/trace.jpg");
    background-size: cover;
    padding: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
