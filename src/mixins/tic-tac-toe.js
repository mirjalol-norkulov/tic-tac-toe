import { CELL_VALUE } from "@/constants";

const TicTacToe = {
  methods: {
    cloneBoard(board) {
      return board.map((row) => [...row]);
    },
    isMovesLeft(board) {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === CELL_VALUE.EMPTY) {
            return true;
          }
        }
      }
      return false;
    },
    evaluate(board, maximizer = CELL_VALUE.X) {
      const minimizer =
        maximizer === CELL_VALUE.X ? CELL_VALUE.O : CELL_VALUE.X;
      // Checking for Rows for X or O victory.
      for (let row = 0; row < 3; row++) {
        if (
          board[row][0] === board[row][1] &&
          board[row][1] === board[row][2]
        ) {
          if (board[row][0] === maximizer) {
            return 10;
          }
          if (board[row][0] === minimizer) {
            return -10;
          }
        }
      }

      // Checking for Columns for X or O victory.
      for (let col = 0; col < 3; col++) {
        if (
          board[0][col] === board[1][col] &&
          board[1][col] === board[2][col]
        ) {
          if (board[0][col] === maximizer) {
            return 10;
          }
          if (board[0][col] === minimizer) {
            return -10;
          }
        }
      }

      // Checking for diagonals
      if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        if (board[0][0] === maximizer) {
          return 10;
        }
        if (board[0][0] === minimizer) {
          return -10;
        }
      }

      if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        if (board[0][2] === maximizer) {
          return 10;
        }
        if (board[0][2] === minimizer) {
          return -10;
        }
      }

      // Else if none of them have won then return 0
      return 0;
    },
  },
};

export default TicTacToe;
