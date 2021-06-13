<template>
  <form
    action="#"
    class="flex flex-col items-center"
    @submit.prevent="handleStart"
  >
    <h1 class="text-lg font-bold text-center mb-4">{{ title }}</h1>
    <t-input full-width :placeholder="placeholder" v-model="player1Name" />
    <t-input
      full-width
      class="mt-4"
      v-if="showSecondInput"
      placeholder="Second player's name"
      v-model="player2Name"
    />

    <t-button class="mt-4 w-full" color="primary"> Start </t-button>
  </form>
</template>

<script>
import { mapState } from "vuex";
import { MODES } from "@/constants";
import TInput from "@/components/ui/TInput";
import TButton from "@/components/ui/TButton";

export default {
  name: "EnterName",
  components: { TButton, TInput },
  computed: {
    ...mapState(["mode"]),
    player1Name: {
      get() {
        return this.$store.state.player1Name;
      },
      set(value) {
        this.$store.commit("SET_PLAYER1_NAME", value);
      },
    },
    player2Name: {
      get() {
        return this.$store.state.player2Name;
      },
      set(value) {
        this.$store.commit("SET_PLAYER2_NAME", value);
      },
    },
    title() {
      if (this.mode === MODES.WITH_FRIEND) {
        return "Enter names";
      } else {
        return "Enter your name";
      }
    },
    placeholder() {
      if (this.mode === MODES.WITH_FRIEND) {
        return "First player's name";
      } else {
        return "Enter your name";
      }
    },
    showSecondInput() {
      return this.mode === MODES.WITH_FRIEND;
    },
    isInputsFilled() {
      if (this.mode === MODES.WITH_FRIEND) {
        return !!this.player1Name && !!this.player2Name;
      } else {
        return !!this.player1Name;
      }
    },
  },
  methods: {
    handleStart() {
      if (!this.isInputsFilled) {
        return;
      }

      if (this.mode === MODES.WITH_FRIEND) {
        this.$router.push({ name: "play-with-friend" });
      } else {
        this.$router.push({ name: "play-with-ai" });
      }
    },
  },
};
</script>

<style scoped></style>
