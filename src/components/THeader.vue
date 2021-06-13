<template>
  <section class="mb-2 flex justify-between bg-white px-2 py-2 rounded">
    <div class="flex items-center font-bold">
      <span class="mx-1">{{ player1Name }}</span>
      <span class="mx-1">{{
        isTwoPlayerMode ? player1Score : playerScore
      }}</span>
      <span>-</span>
      <span class="mx-1">{{ isTwoPlayerMode ? player2Score : aiScore }}</span>
      <span class="mx-1">{{ isTwoPlayerMode ? player2Name : "AI" }}</span>
    </div>
    <div>
      <t-button variant="text" @click="$emit('restart')">
        <restart-icon />
      </t-button>
      <t-button variant="text" @click="handleMainMenu">
        <menu-icon />
      </t-button>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import TButton from "@/components/ui/TButton";
import MenuIcon from "@/assets/icons/menu.svg";
import RestartIcon from "@/assets/icons/restart.svg";
import { MODES } from "@/constants";

export default {
  name: "THeader",
  components: { MenuIcon, RestartIcon, TButton },
  computed: {
    ...mapState([
      "mode",
      "playerSide",
      "player1Name",
      "player2Name",
      "playerScore",
      "player1Score",
      "player2Score",
      "aiScore",
    ]),
    isTwoPlayerMode() {
      return this.mode === MODES.WITH_FRIEND;
    },
  },
  methods: {
    handleMainMenu() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped></style>
