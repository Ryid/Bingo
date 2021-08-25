<template>
  <div class="bingo">
    <h1>Bingo</h1>
    <table id="board"></table>
    <button @click="makeBoard()">測試按鈕</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      rows: 5,
      cols: 5,
      array: "",
    };
  },
  methods: {
    async getnum() {
      try {
        let res = await axios.get("http://localhost:3000/generatenum");
        this.array = res.data;
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    },
    async makeBoard() {
      await this.getnum();

      let board = document.getElementById("board");
      for (let row = 0; row < this.rows; row++) {
        let r = board.insertRow(row);
        for (let col = 0; col < this.cols; col++) {
          let cell = r.insertCell(col);
          cell.setAttribute("class", "square");
          cell.innerHTML = this.array[row * 5 + col];
          cell.index = row * 5 + col;
        }
      }
    },
  },
  created() {
    // this.makeBoard();
  },
  computed: {},
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