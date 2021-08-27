<template>
  <div class="user">
    <ul>
      <li v-for="user in userList" :key="user">{{user}}</li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userList: ["123","456"],
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
      // this.check();
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
}

@media screen and (max-width: 1024px) {
  .user {
    margin: 20px 0;
    bottom: -30%;
    width: 100%;
    height: 100px;
  }
}
</style>