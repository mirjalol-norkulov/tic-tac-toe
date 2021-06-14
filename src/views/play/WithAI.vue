<template>
  <div class="w-full pt-full relative">
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
            v-hammer:tap="() => handleCellClick(i, j)"
          />
        </template>
      </board>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";

import Board from "@/components/Board";
import Cell from "@/components/Cell";
import { CELL_VALUE } from "@/constants";
import ResultScreen from "@/components/ResultScreen";
import TicTacToe from "@/mixins/tic-tac-toe";
import THeader from "@/components/THeader";

export default {
  name: "WithAI",
  components: {
    THeader,
    ResultScreen,
    Board,
    Cell,
  },
  mixins: [TicTacToe],
  data() {
    return {
      turn: undefined,
      board: [
        [CELL_VALUE.EMPTY, CELL_VALUE.EMPTY, CELL_VALUE.EMPTY],
        [CELL_VALUE.EMPTY, CELL_VALUE.EMPTY, CELL_VALUE.EMPTY],
        [CELL_VALUE.EMPTY, CELL_VALUE.EMPTY, CELL_VALUE.EMPTY],
      ],
      result: null,
    };
  },
  computed: {
    ...mapState(["playerSide"]),
    ...mapGetters(["aiSide"]),
  },
  watch: {
    playerSide: {
      immediate: true,
      handler(value) {
        this.turn = value;
      },
    },
  },
  methods: {
    ...mapMutations({
      incrementPlayerScore: "INCREMENT_PLAYER_SCORE",
      incrementAIScore: "INCREMENT_AI_SCORE",
    }),
    handleRestart() {
      this.board = [
        [CELL_VALUE.EMPTY, CELL_VALUE.EMPTY, CELL_VALUE.EMPTY],
        [CELL_VALUE.EMPTY, CELL_VALUE.EMPTY, CELL_VALUE.EMPTY],
        [CELL_VALUE.EMPTY, CELL_VALUE.EMPTY, CELL_VALUE.EMPTY],
      ];
      this.turn = this.playerSide;
      this.result = null;
    },
    handleMainMenu() {
      this.$router.push("/");
    },
    handleCellClick(rowIndex, colIndex) {
      if (this.turn !== this.playerSide) {
        return;
      }

      const cellValue = this.board[rowIndex][colIndex];
      if (cellValue !== CELL_VALUE.EMPTY) {
        return;
      }

      const row = this.board[rowIndex];
      row[colIndex] = this.playerSide;
      this.$set(this.board, rowIndex, row);

      this.turn = this.aiSide;

      this.moveAI();

      const score = this.evaluate(this.board);
      const isMovesLeft = this.isMovesLeft(this.board);

      if (score === 10) {
        if (this.playerSide === CELL_VALUE.X) {
          this.incrementPlayerScore();
        } else {
          this.incrementAIScore();
        }
        this.result = score;
      }

      if (score === -10) {
        if (this.playerSide === CELL_VALUE.O) {
          this.incrementPlayerScore();
        } else {
          this.incrementAIScore();
        }
        this.result = score;
      }

      if (!isMovesLeft && score === 0) {
        this.result = score;
      }
    },
    moveAI() {
      const board = this.cloneBoard(this.board);
      const [i, j] = this.findBestMove(board);

      if (i !== -1 && j !== -1) {
        this.board[i][j] = this.aiSide;
        this.turn = this.playerSide;
      }
    },
    minimax(board, depth, isMax) {
      const score = this.evaluate(board, this.aiSide);

      if (score === 10) {
        return score - depth;
      }

      if (score === -10) {
        return score + depth;
      }

      if (!this.isMovesLeft(board)) {
        return 0;
      }

      if (isMax) {
        let best = -1000;

        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (board[i][j] === CELL_VALUE.EMPTY) {
              board[i][j] = this.aiSide;
              best = Math.max(
                best,
                this.minimax(this.cloneBoard(board), depth + 1, !isMax)
              );
              board[i][j] = CELL_VALUE.EMPTY;
            }
          }
        }

        return best;
      } else {
        let best = 1000;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            //Check if cell is empty
            if (board[i][j] === CELL_VALUE.EMPTY) {
              // Make the move
              board[i][j] = this.playerSide;

              // Call minimax recursively and choose
              // the minimum value
              best = Math.min(
                best,
                this.minimax(this.cloneBoard(board), depth + 1, !isMax)
              );

              // Undo the move
              board[i][j] = CELL_VALUE.EMPTY;
            }
          }
        }
        return best;
      }
    },
    findBestMove(board) {
      let bestVal = -1000;
      let bestMove = [-1, -1];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === CELL_VALUE.EMPTY) {
            board[i][j] = this.aiSide;
            let moveVal = this.minimax(this.cloneBoard(board), 0, false);
            console.log("moveVal: ", i, j, moveVal);
            board[i][j] = CELL_VALUE.EMPTY;

            if (moveVal > bestVal) {
              bestMove = [i, j];
              bestVal = moveVal;
            }
          }
        }
      }

      return bestMove;
    },
  },
};
</script>

<style scoped></style>
