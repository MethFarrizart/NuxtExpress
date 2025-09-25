import Swal from "sweetalert2";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(async (nuxtApp) => {
  nuxtApp.provide("swal", Swal);
});
