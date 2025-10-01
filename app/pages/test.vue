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
import AdminForm from "~/components/AdminForm.vue";

const arr = [1, 5, 5, 6, 4];
const sum = test(arr); // test here is a function auto-import from shared/utils/test.ts

let token = ref(null);

onMounted(() => {
  token = Cookies.get("token");
});

const logout = async () => {
  // use credentials: "include" will see token
  const res = await ifetch(userRoute.logOut, { credentials: "include" });
  if (res.status == 200) {
    return navigateTo("login");
  }
};
</script>
