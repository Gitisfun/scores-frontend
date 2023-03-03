<template>
  <div class="scores-loader-box">
    <i id="scores-loader" class="bx bx-loader-alt bx-spin"></i>
  </div>
</template>

<script>
export default {
  name: "Loader",
};
</script>

<style scoped>
#scores-loader {
  font-size: 2rem;
}
.scores-loader-box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
