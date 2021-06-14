<template>
  <div class="w-full pt-full relative flex items-center justify-center">
    <div class="absolute inset-0">
      <t-header @restart="handleRestart" />
      <board class="relative">
        <transition
          enter-active-class="transition-all duration-300"
          enter-class="transform -translate-y-4 opacity-0"
          enter-to-class="transform translate-y-0 opacity-100"
        >
          <result-screen
            v-if="result !== null"
            class="absolute inset-0"
            :result="result"
          >
            Result
          </result-screen>
        </transition>
        <template v-for="(row, i) in board">
          <cell
            v-for="(cellValue, j) in row"
            :key="`${i}-${j}`"
            :value="cellValue"
            @click="handleCellClick(i, j)"
          />
        </template>
      </board>
    </div>
  </div>
</template>

<script>
import { CELL_VALUE } from "@/constants";
import TicTacToe from "@/mixins/tic-tac-toe";
import Board from "@/components/Board";
import Cell from "@/components/Cell";
import ResultScreen from "@/components/ResultScreen";
import THeader from "@/components/THeader";
import { mapMutations } from "vuex";
export default {
  name: "WithFriend",
  components: { THeader, Cell, Board, ResultScreen },
  mixins: [TicTacToe],
  data() {
    return {
      turn: CELL_VALUE.X,
      board: [
        [CELL_VALUE.EMPTY, CELL_VALUE.EMPTY, CELL_VALUE.EMPTY],
        [CELL_VALUE.EMPTY, CELL_VALUE.EMPTY, CELL_VALUE.EMPTY],
        [CELL_VALUE.EMPTY, CELL_VALUE.EMPTY, CELL_VALUE.EMPTY],
      ],
      result: null,
    };
  },
  methods: {
    ...mapMutations({
      incrementPlayer1Score: "INCREMENT_PLAYER1_SCORE",
      incrementPlayer2Score: "INCREMENT_PLAYER2_SCORE",
    }),
    handleRestart() {
      this.board = [
        [CELL_VALUE.EMPTY, CELL_VALUE.EMPTY, CELL_VALUE.EMPTY],
        [CELL_VALUE.EMPTY, CELL_VALUE.EMPTY, CELL_VALUE.EMPTY],
        [CELL_VALUE.EMPTY, CELL_VALUE.EMPTY, CELL_VALUE.EMPTY],
      ];
      this.result = null;
      this.turn = CELL_VALUE.X;
    },
    handleCellClick(i, j) {
      if (this.board[i][j] !== CELL_VALUE.EMPTY) {
        return;
      }

      let value;
      if (this.turn === CELL_VALUE.X) {
        value = CELL_VALUE.X;
        this.turn = CELL_VALUE.O;
      } else {
        value = CELL_VALUE.O;
        this.turn = CELL_VALUE.X;
      }

      const row = this.board[i];
      row[j] = value;
      this.$set(this.board, i, row);

      const score = this.evaluate(this.board);
      const isMovesLeft = this.isMovesLeft(this.board);

      if (score === 10 || score === -10 || (!isMovesLeft && score === 0)) {
        if (score === 10) {
          this.incrementPlayer1Score();
        } else {
          this.incrementPlayer2Score();
        }
        this.result = score;
      }
    },
  },
};
</script>

<style scoped></style>
