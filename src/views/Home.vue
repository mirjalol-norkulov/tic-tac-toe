<template>
  <div class="flex flex-col items-center">
    <tic-tac-toe-icon class="w-28" />
    <h1 class="font-bold my-4">Choose your play mode</h1>
    <div>
      <t-radio-btn
        name="mode"
        class="mb-2"
        variant="button"
        :label="MODES.WITH_AI"
        full-width
        v-model="mode"
      >
        With AI
      </t-radio-btn>
      <t-radio-btn
        name="mode"
        :label="MODES.WITH_FRIEND"
        variant="button"
        full-width
        v-model="mode"
      >
        With a friend
      </t-radio-btn>
    </div>
    <t-button
      class="mt-4"
      :disabled="continueBtnDisabled"
      @click="handleContinueClick"
    >
      Continue
    </t-button>
  </div>
</template>

<script>
import TicTacToeIcon from "@/assets/icons/tic-tac-toe.svg";
import TRadioBtn from "@/components/ui/TRadioBtn";
import TButton from "@/components/ui/TButton";
import { MODES } from "@/constants";

export default {
  name: "Home",
  components: { TButton, TRadioBtn, TicTacToeIcon },
  data() {
    return {
      MODES,
      STEPS: Object.freeze({
        MODE: "mode",
        SIDE: "side",
      }),
      currentStep: "mode",
    };
  },
  computed: {
    continueBtnDisabled() {
      return !this.mode;
    },
    mode: {
      get() {
        return this.$store.state.mode;
      },
      set(value) {
        this.$store.commit("SET_MODE", value);
      },
    },
  },
  methods: {
    handleContinueClick() {
      if (this.mode) {
        if (this.mode === MODES.WITH_AI) {
          this.$router.push({ name: "pick-side" });
        } else {
          this.$router.push({ name: "enter-name" });
        }
      }
    },
  },
};
</script>
