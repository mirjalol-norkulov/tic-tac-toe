<template>
  <button
    class="
      px-4
      py-2
      text-sm
      uppercase
      tracking-wider
      rounded
      transition-all
      outline-none
      focus:outline-none
      duration-200
      text-black
      disabled:bg-gray-300 disabled:cursor-default
    "
    :class="{
      'border border-solid ring-offset-2 ring-transparent ring-1 active:ring-primary':
        variant === VARIANTS.DEFAULT,
      'bg-white': color === 'default',
      'bg-primary text-white': color === 'primary',
      'rounded-3xl': rounded,
      'hover:bg-gray-primary': variant === VARIANTS.TEXT,
    }"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "TButton",
  props: {
    variant: {
      type: String,
      default: "default",
    },
    color: {
      type: String,
      default: "default",
    },
    rounded: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      VARIANTS: {
        DEFAULT: "default",
        TEXT: "text",
      },
    };
  },
};
</script>

<style scoped></style>
