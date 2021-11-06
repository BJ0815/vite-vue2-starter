<template>
  <div class="Index">
    <h1 class="text-36 text-gray-900">{{ msg }}</h1>
  </div>
</template>

<script>
import { ref, defineComponent } from "@vue/composition-api";
export default defineComponent({
  name: "Index",
  setup() {
    const msg = ref("Hello world");

    return { msg };
  },
});
</script>

<style lang="scss">
.Index {
}

// xxl | xl | lg | md | sm
// @include screen (xl) {}
</style>
