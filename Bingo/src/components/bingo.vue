<template>
  <div class="bingo">
    <h1>Bingo</h1>
    <table id="board"></table>
    <button
      @click="
        postUser('generate');
        getServerNum();
      "
      v-if="!disable"
    >
      遊戲開始<br />(自動生成亂數)
    </button>
    <button
      @click="
        postUser('playerchoice');
        getUserNum();
      "
      v-if="!disable"
    >
      遊戲開始<br />(玩家選擇號碼)
    </button>
    <div class="sendnum" v-if="disableInput">
      <input
        type="text"
        placeholder="輸入想要的數字"
        v-model.number="playerChiose"
        @keyup.enter="sendPlayerNum()"
      />
      <button @click="sendPlayerNum()">送出</button>
    </div>
    <div class="bingoNums">
      <div
        v-for="num in getNum"
        :key="num"
        :class="{ bingoNum: typeof getNum == 'object' }"
      >
        {{ `${num < 10 && typeof num == "number" ? "0" + num : num}` }}
      </div>
    </div>
    <div class="victory" v-if="checkConnect > 1" @click="winner()">CLICK</div>
    <input
      type="text"
      placeholder="請輸入使用者名稱"
      v-model.trim="username"
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
      disableInput: false,
      rows: 5,
      cols: 5,
      myNums: "",
      getNum: [],
      indices: [],
      checkConnect: 0,
      playerChiose: "",
      model: "",
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

    // 亂數模式
    async getServerNum() {
      if (
        this.username !== "" &&
        !this.getNum.includes("獲勝者") &&
        this.getNum.length < 50
      ) {
        await axios
          .post("http://localhost:3000/networknum",{
            clientArr: this.getNum
          })
          .then((res) => {
            this.getNum = res.data.array;
            console.log(res.data.status);
          })
          .catch((err) => console.log(err));
        await this.getServerNum();
      }
    },

    // 玩家選擇模式
    async getUserNum() {
      if (
        this.username !== "" &&
        !this.getNum.includes("獲勝者") &&
        this.getNum.length < 50
      ) {
        await axios
          .get("http://localhost:3000/playerchoice")
          .then((res) => {
            this.getNum = res.data.array;
            console.log(res.data.status);
          })
          .catch((err) => console.log(err));
        await this.getUserNum();
      }
    },

    // 傳送使用者資料
    postUser(model) {
      if (this.username !== "") {
        if (model == "playerchoice") {
          this.disableInput = true;
        }
        this.model = model;
        this.$emit("nowmodel", model);

        axios
          .post("http://localhost:3000/sendUser", {
            username: this.username,
            model: model,
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
            clickSquare(this);
          };
          cell.index = row * 5 + col;
        }
      }
    },

    // 玩家選擇號碼傳送&驗證
    sendPlayerNum() {
      axios
        .post("http://localhost:3000/checkround", {
          username: this.username,
          number: this.playerChiose,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    },

    // 有相符數字進行標記&確認是否連線
    clickSquare(square) {
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
        model: this.model,
      });
    },

    // 傳目前是什麼model到main.vue
    nowModel() {
      this.$emit("nowModel", this.model);
    },
  },
  created() {
    this.makeBoard();
    window.clickSquare = this.clickSquare;
  },
};
</script>

<style src="./bingo.css"></style>