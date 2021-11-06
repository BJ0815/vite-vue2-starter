<template>
  <div class="Index">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      msg: "104_20210718",
    };
  },
};
</script>

<style lang="scss">
.Index {
  // re
  color: #000;
}

// xxl | xl | lg | md | sm
// @include screen (xl) {}
</style>
