<template>
  <input
    type="text"
    :value="value"
    @input="$emit('input', $event.target.value)"
    class="
      shadow-inner
      rounded
      inline-block
      bg-white
      outline-none
      px-4
      py-2
      transition-all
      duration-300
      focus:ring-1 focus:ring-primary
    "
    :class="{ 'w-full': fullWidth }"
    v-bind="attributes"
    v-on="listeners"
  />
</template>

<script>
export default {
  name: "TInput",
  props: {
    value: {
      type: String,
      default: undefined,
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    attributes() {
      return Object.entries(this.$attrs)
        .filter(([attr]) => attr !== "value")
        .reduce((res, [key, value]) => ({ ...res, [key]: value }), {});
    },
    listeners() {
      return Object.entries(this.$listeners)
        .filter(([attr]) => attr !== "input")
        .reduce((res, [key, value]) => ({ ...res, [key]: value }), {});
    },
  },
};
</script>

<style scoped></style>
