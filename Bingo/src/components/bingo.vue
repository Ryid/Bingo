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
      getNum: [1, 2, 3, 4, 5],
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
    clickSquare(e) {
      console.log(e.innerHTML);
      this.getNum.filter((num) => {
        if (num == e.innerHTML) {
          e.style.backgroundColor = "crimson";
          this.indices.push(e.index);
        }
      });
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