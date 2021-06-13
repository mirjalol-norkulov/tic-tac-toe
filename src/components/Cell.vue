<template>
  <div
    class="
      cell
      bg-white
      cursor-pointer
      select-none
      shadow-inner
      rounded-lg
      flex
      items-center
      justify-center
    "
    :class="{ 'text-primary': value === 'x', 'text-red-500': value === 'o' }"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <transition
      enter-active-class="transition-opacity transition-transform duration-300"
      enter-class="transform opacity-0 scale-0"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition-all duration-300"
      leave-class="opacity-100 transform scale-100"
      leave-to-class="opacity-0 scale-0"
    >
      <component v-if="icon" :is="icon" class="w-12 h-12" />
    </transition>
  </div>
</template>

<script>
import constants from "@/constants";
import XIcon from "@/assets/icons/x.svg";
import OIcon from "@/assets/icons/o.svg";

export default {
  name: "Cell",
  props: {
    value: {
      type: String,
      required: true,
      validator(value) {
        return Object.values(constants.CELL_VALUE).includes(value);
      },
    },
  },
  components: { XIcon, OIcon },
  computed: {
    icon() {
      switch (this.value) {
        case constants.CELL_VALUE.X:
          return "x-icon";
        case constants.CELL_VALUE.O:
          return "o-icon";
        default:
          return "";
      }
    },
  },
};
</script>

<style lang="scss">
.cell {
  font-family: "Caveat", cursive;
}
</style>
