<template>
  <div
    class="
      flex
      items-center
      justify-center
      bg-black bg-opacity-60
      text-white text-3xl
      uppercase
      tracking-widest
      rounded
    "
    v-bind="$attrs"
    v-on="$listeners"
  >
    {{ text }}
  </div>
</template>

<script>
import { mapState } from "vuex";
import { CELL_VALUE, MODES } from "@/constants";

export default {
  name: "ResultScreen",
  props: {
    result: {
      type: Number,
      default: undefined,
    },
  },
  computed: {
    ...mapState(["playerSide", "mode", "player1Name", "player2Name"]),
    isTwoPlayerMode() {
      return this.mode === MODES.WITH_FRIEND;
    },
    text() {
      if (this.isTwoPlayerMode) {
        return `${
          this.result === 10 ? this.player1Name : this.player2Name
        } won`;
      }
      switch (this.result) {
        case 10:
          if (this.playerSide === CELL_VALUE.X) {
            return "You won";
          } else {
            return "You lose";
          }
        case -10:
          if (this.playerSide === CELL_VALUE.O) {
            return "You won";
          } else {
            return "You lose";
          }
        case 0:
          return "Draw";
        default:
          return "";
      }
    },
  },
};
</script>
