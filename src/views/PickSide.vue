<template>
  <div class="flex flex-col items-center justify-center">
    <h1 class="font-bold text-lg text-center">Pick your side</h1>
    <div class="grid grid-cols-2 gap-x-10 mt-10">
      <div class="flex flex-col items-center">
        <x-icon class="w-20 h-20" />
        <t-radio-btn
          class="mt-12"
          name="side"
          :label="CELL_VALUE.X"
          v-model="side"
        />
      </div>
      <div class="flex flex-col items-center">
        <o-icon class="w-20 h-20" />
        <t-radio-btn
          class="mt-12"
          name="side"
          :label="CELL_VALUE.O"
          v-model="side"
        />
      </div>
    </div>
    <div class="text-center mt-12">
      <t-button :disabled="!side" @click="handleContinue">Continue</t-button>
    </div>
  </div>
</template>

<script>
import XIcon from "@/assets/icons/x.svg";
import OIcon from "@/assets/icons/o.svg";
import TRadioBtn from "@/components/ui/TRadioBtn";
import TButton from "@/components/ui/TButton";
import { CELL_VALUE } from "@/constants";

export default {
  name: "PickSide",
  components: { TButton, TRadioBtn, XIcon, OIcon },
  data() {
    return {
      CELL_VALUE,
    };
  },
  computed: {
    side: {
      get() {
        return this.$store.state.playerSide;
      },
      set(value) {
        this.$store.commit("SET_PLAYER_SIDE", value);
      },
    },
  },
  methods: {
    handleContinue() {
      this.$router.push({
        name: "enter-name",
      });
    },
  },
};
</script>

<style scoped></style>
