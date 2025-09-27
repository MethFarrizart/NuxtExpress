<template>
  <div>
    <button class="bg-red-500" @click="logout">Log Out</button>
  </div>
</template>

<script setup>
import { userRoute } from "~/composables/routes/user";
import { ifetch } from "@/components/ifetch";
import Cookies from "js-cookie";
import { onMounted } from "vue";

const arr = [1, 5, 5, 6, 4];
const sum = test(arr); // test here is a function auto-import from shared/utils/test.ts

let cookie = ref(null);

onMounted(() => {
  cookie = Cookies.get("token");
  console.log(cookie);
});

const logout = async () => {
  await ifetch(userRoute.logOut, cookie);
};
</script>

<style lang="scss" scoped></style>
