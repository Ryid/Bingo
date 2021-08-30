<template>
  <div class="bingo">
    <h1>Bingo</h1>
    <table id="board"></table>
    <button
      @click="
        postUser();
        getServerNum();
      "
      v-if="!disable"
    >
      遊戲開始
    </button>
    <div class="bingoNums">
      <div v-for="num in getNum" :key="num" :class="{ bingoNum : typeof getNum=='object'}">
        {{ `${num < 10 && typeof num=='number' ? "0" + num : num}` }}
      </div>
    </div>
    <div class="victory" v-if="checkConnect > 1" @click="winner()">CLICK</div>
    <input
      type="text"
      placeholder="請輸入使用者名稱"
      v-model="username"
      :disabled="disable"
    />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      disable: false,
      rows: 5,
      cols: 5,
      myNums: "",
      getNum: [
        // 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        // 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
        // 39, 40, 41, 42, 43, 44, 45,
      ],
      indices: [],
      checkConnect: 0,
    };
  },
  methods: {
    // 取得我的賓果&遊戲生成賓果
    async getMyNum() {
      try {
        let res = await axios.get("http://localhost:3000/generatenum");
        this.myNums = res.data;
      } catch (err) {
        console.log(err);
      }
    },
    async getServerNum() {
      if (
        this.username !== "" &&
        !this.getNum.includes("獲勝者") &&
        this.getNum.length < 50
      ) {
        await axios
          .get("http://localhost:3000/networknum")
          .then((res) => (this.getNum = res.data))
          .catch((err) => console.log(err));
        await this.getServerNum();
      }
    },

    // 傳送使用者資料
    postUser() {
      if (this.username !== "") {
        axios
          .post("http://localhost:3000/sendUser", {
            username: this.username,
          })
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        this.disable = true;
      } else {
        alert("使用者名稱不得為空!");
        return false;
      }
    },

    // 建造我自己的賓果卡片
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

    // 有相符數字進行標記&確認是否連線
    clickSquare(square) {
      // console.log(square.innerHTML);
      this.getNum.filter((num) => {
        if (num == square.innerHTML) {
          square.style.backgroundColor = "crimson";
          this.indices.push(square.index);
          this.checkWin();
        }
      });
    },

    // 如果數字重復則重新渲染
    checkArray(number, array) {
      for (let count = 0; count < array.length; count++) {
        if (array[count] == number) {
          return true;
        }
      }
      return false;
    },

    // 檢查是否連線
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
      // console.log(this.indices);
      let connect = 0;
      if (this.check5(0, 1, 2, 3, 4)) {
        connect++;
      }
      if (this.check5(5, 6, 7, 8, 9)) {
        connect++;
      }
      if (this.check5(10, 11, 12, 13, 14)) {
        connect++;
      }
      if (this.check5(15, 16, 17, 18, 19)) {
        connect++;
      }
      if (this.check5(20, 21, 22, 23, 24)) {
        connect++;
      }
      if (this.check5(0, 5, 10, 15, 20)) {
        connect++;
      }
      if (this.check5(1, 6, 11, 16, 21)) {
        connect++;
      }
      if (this.check5(2, 7, 12, 17, 22)) {
        connect++;
      }
      if (this.check5(3, 8, 13, 18, 23)) {
        connect++;
      }
      if (this.check5(4, 9, 14, 19, 24)) {
        connect++;
      }
      if (this.check5(0, 6, 12, 18, 24)) {
        connect++;
      }
      if (this.check5(4, 8, 12, 16, 20)) {
        connect++;
      }
      this.checkConnect = connect;
    },

    // 獲勝
    winner() {
      // alert("winner!");
      axios.post("http://localhost:3000/check", {
        username: this.username,
        indices: this.indices,
      });
    },
  },
  created() {
    this.makeBoard();
    window.clickSquare = this.clickSquare;
  },
  computed: {
    
  },
};
</script>

<style src="./bingo.css"></style>