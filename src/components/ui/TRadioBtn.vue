<template>
  <div
    class="t-radio-btn"
    :class="[`t-radio-btn--${variant}`, fullWidth ? 't-radio-btn--full' : '']"
  >
    <input
      type="radio"
      :name="name"
      :value="label"
      :checked="label === value"
      @change="$emit('input', label)"
      class="hidden"
      :id="inputId"
    />
    <label
      :for="inputId"
      class="t-radio-btn__label"
      v-hammer:tap="(e) => $emit('click', e)"
    >
      <slot />
    </label>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  name: "TRadioBtn",
  props: {
    label: {
      type: String,
      default: "",
    },
    variant: {
      type: String,
      default: "default",
      validator(value) {
        return ["default", "button"].includes(value);
      },
    },
    value: {
      type: [String, Number],
      default: undefined,
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: undefined,
    },
  },
  computed: {
    inputId() {
      return this.$attrs.id || uuidv4();
    },
  },
};
</script>

<style lang="scss">
.t-radio-btn {
  @apply flex;

  &--full {
    @apply w-full;
  }

  &__label {
    @apply cursor-pointer;
  }

  &--default {
    @apply w-6 h-6;

    .t-radio-btn__label {
      @apply flex items-center justify-center w-full h-full rounded-full
      border-2 border-primary border-solid;

      &::before {
        content: "";
        @apply rounded-full w-3.5 h-3.5 bg-primary transform scale-0
        transition-all duration-300;
      }
    }

    input:checked + .t-radio-btn__label::before {
      @apply scale-100;
    }
  }

  &--button {
    .t-radio-btn__label {
      @apply w-full text-center text-sm px-8 py-1.5 bg-white rounded-3xl
      shadow-inner border border-solid transition-colors duration-300;
    }

    input:checked + .t-radio-btn__label {
      @apply text-white bg-primary;
    }
  }
}
</style>
