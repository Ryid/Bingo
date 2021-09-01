<template>
  <div class="game">
    <!-- <div class="user"></div> -->
    <userlist :model="model" />
    <bingo @nowmodel="getmodel" />
  </div>
</template>

<script>
import userlist from "@/components/userlist.vue";
import bingo from "@/components/bingo.vue";
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      disable: false,
      model: "",
    };
  },
  methods: {
    getmodel(model) {
      this.model = model;
      console.log(this.model);
    },
  },
  components: {
    userlist,
    bingo,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
/* .game {
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
} */
</style>