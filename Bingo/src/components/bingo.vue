<template>
  <div class="bingo">
    <h1>Bingo</h1>
    <table id="board"></table>
    <button @click="getServerNum()">測試按鈕</button>
    <div>{{ getNum }}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      rows: 5,
      cols: 5,
      myNums: "",
      getNum: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
        39, 40, 41, 42, 43, 44, 45,
      ],
      indices: [],
    };
  },
  methods: {
    async getMyNum() {
      try {
        let res = await axios.get("http://localhost:3000/generatenum");
        this.myNums = res.data;
      } catch (err) {
        console.log(err);
      }
    },
    async makeBoard() {
      await this.getMyNum();

      let board = document.getElementById("board");

      for (let row = 0; row < this.rows; row++) {
        let r = board.insertRow(row);
        for (let col = 0; col < this.cols; col++) {
          let cell = r.insertCell(col);
          cell.setAttribute("class", "square");
          cell.innerHTML = this.myNums[row * 5 + col];
          cell.onclick = function () {
            // console.log(this)
            clickSquare(this);
          };
          cell.index = row * 5 + col;
        }
      }
    },
    async getServerNum() {
      await axios
        .get("http://localhost:3000/networknum")
        .then((res) => (this.getNum = res.data))
        .catch((err) => console.log(err));
      await this.getServerNum();
    },
    clickSquare(square) {
      console.log(square.innerHTML);
      this.getNum.filter((num) => {
        if (num == square.innerHTML) {
          square.style.backgroundColor = "crimson";
          this.indices.push(square.index);
          this.checkWin();
        }
      });
    },
    checkArray(number, array) {
      // console.log("Checking array for" + number);
      for (let count = 0; count < array.length; count++) {
        if (array[count] == number) {
          return true;
        }
      }
      return false;
    },
    check5(i1, i2, i3, i4, i5) {
      return (
        this.checkArray(i1, this.indices) &&
        this.checkArray(i2, this.indices) &&
        this.checkArray(i3, this.indices) &&
        this.checkArray(i4, this.indices) &&
        this.checkArray(i5, this.indices)
      );
    },
    checkWin() {
      console.log(this.indices);
      if (this.check5(0, 1, 2, 3, 4)) {
        console.log("Bingo!");
      }
      if (this.check5(5, 6, 7, 8, 9)) {
        console.log("Bingo!");
      }
      if (this.check5(10, 11, 12, 13, 14)) {
        console.log("Bingo!");
      }
      if (this.check5(15, 16, 17, 18, 19)) {
        console.log("Bingo!");
      }
      if (this.check5(20, 21, 22, 23, 24)) {
        console.log("Bingo!");
      }
      if (this.check5(0, 5, 10, 15, 20)) {
        console.log("Bingo!");
      }
      if (this.check5(1, 6, 11, 16, 21)) {
        console.log("Bingo!");
      }
      if (this.check5(2, 7, 12, 17, 22)) {
        console.log("Bingo!");
      }
      if (this.check5(3, 8, 13, 18, 23)) {
        console.log("Bingo!");
      }
      if (this.check5(4, 9, 14, 19, 24)) {
        console.log("Bingo!");
      }
      if (this.check5(0, 6, 12, 18, 24)) {
        console.log("Bingo!");
      }
      if (this.check5(4, 8, 12, 16, 20)) {
        console.log("Bingo!");
      }
    },
  },
  computed: {},
  created() {
    this.makeBoard();
    window.clickSquare = this.clickSquare;
  },
};
</script>

<style>
body {
  text-align: center;
}

.square {
  width: 4em;
  height: 4em;
  border: 0.25em solid rgb(102, 0, 102);
}

table {
  margin: auto;
}
</style>