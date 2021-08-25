<template>
    <!-- <userlist/> -->
    <div class="user">
        <!-- 123 -->
    </div>
    <bingo/>
</template>

<script>
import userlist from '@/components/userlist.vue'
import bingo from '@/components/bingo.vue'

export default {
  components: {
    userlist,
    bingo
  },
};
</script>

<style>
*{
    margin: 0;
    padding: 0;
    list-style: none;
}
html,body{
    height: 100%;
    display: flex;
    justify-content: center;
    /* align-items: center; */
}
/* .user{
    width: 400px;
    height: 400px;
    border: solid 1px;
    display: inline-block;
} */
</style>