<template>
  <div class="user">
    <ul>
      <li v-for="user in userList" :key="user">
        <img src="../assets/user.svg" alt="" />
        {{ user }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userList: [],
    };
  },
  methods: {
    getUser() {
      axios
        .get("http://localhost:3000/getUser")
        .then((res) => (this.userList = res.data))
        .catch((err) => console.log(err));
    },
  },
  created() {
    this.timer = setInterval(() => {
      this.getUser();
    }, 5000);
  },
  unmounted() {
    clearInterval(this.timer);
  },
};
</script>

<style>
.game {
  position: relative;
}

.user {
  position: absolute;
  width: 200px;
  height: 400px;
  border: solid 1px;
  border-radius: 10px;
  margin: 10px 20px;
  display: flex;
  justify-content: center;
}
.user li {
  position: relative;
  display: flex;
  font-size: 20px;
  padding: 16px;
  align-items: center;
}
.user img {
  position: absolute;
  left: -20%;
  width: 22px;
  line-height: 8px;
}

@media screen and (max-width: 800px) {
  .user {
    position: relative;
    margin: 20px auto;
    /* width: 100%; */
    height: auto;
  }
}
</style>