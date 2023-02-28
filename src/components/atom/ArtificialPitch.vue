<template>
  <div class="artificial-container">
    <!-- <div class="artificial-title">Opmerking</div> -->
    <div>
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Artificial",
  props: { text: String },
};
</script>

<style scoped>
.artificial-container {
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  margin: 25px;
  font-weight: bold;
  color: green;
}
</style>
