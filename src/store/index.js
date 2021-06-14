import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { CELL_VALUE } from "@/constants";

// import { CELL_VALUE, MODES } from "@/constants";

Vue.use(Vuex);

const dataState = createPersistedState({
  key: "ticTacToe",
  paths: [
    "playerSide",
    "mode",
    "player1Name",
    "player2Name",
    "player1Score",
    "player2Score",
    "playerScore",
    "aiScore",
  ],
});

export default new Vuex.Store({
  state: {
    mode: undefined,
    playerSide: undefined,
    player1Name: "",
    player2Name: "",
    player1Score: 0,
    player2Score: 0,
    playerScore: 0,
    aiScore: 0,
  },
  getters: {
    aiSide(state) {
      return state.playerSide === CELL_VALUE.X ? CELL_VALUE.O : CELL_VALUE.X;
    },
  },
  mutations: {
    SET_MODE(state, value) {
      state.mode = value;
    },
    SET_PLAYER_SIDE(state, value) {
      state.playerSide = value;
    },
    SET_PLAYER1_NAME(state, value) {
      state.player1Name = value;
    },
    SET_PLAYER2_NAME(state, value) {
      state.player2Name = value;
    },
    INCREMENT_PLAYER1_SCORE(state) {
      state.player1Score += 1;
    },
    INCREMENT_PLAYER2_SCORE(state) {
      state.player2Score += 1;
    },
    INCREMENT_PLAYER_SCORE(state) {
      state.playerScore++;
    },
    INCREMENT_AI_SCORE(state) {
      state.aiScore += 1;
    },
  },
  actions: {},
  modules: {},
  plugins: [dataState],
});
