<template>
  <SideBar :isVisible="isSidebarVisible" />
  <nav-bar @toggleSideBar="toggleSideBar"></nav-bar>
  <slot />
</template>

<script setup>
import cookie from "js-cookie";
import { defineAsyncComponent } from "vue";

const isSidebarVisible = ref(true);

const NavBar = defineAsyncComponent(() => import("../components/navBar.vue"));
const SideBar = defineAsyncComponent(() => import("../components/sideBar"));

const toggleSideBar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
};
</script>

<style>
.full-screen-overlay {
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  width: 100vw;
  max-height: 100%;
}

.position-absolute {
  position: fixed !important;
}
</style>
