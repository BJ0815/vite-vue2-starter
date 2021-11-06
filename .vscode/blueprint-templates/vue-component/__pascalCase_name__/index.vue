<template>
  <div class="{{ pascalCase name }}">
    {{ pascalCase name }}
  </div>
</template>

<script>
import {} from '@vue/composition-api'

export default {
  name: '{{ pascalCase name }}',
  setup (props, context) {
  }
}
</script>

<style lang="scss">
.{{ pascalCase name }} {
}

// xxl | xl | lg | md | sm
// @include screen (xl) {}
</style>
