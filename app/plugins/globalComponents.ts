// plugins/global-components.js
import { defineAsyncComponent } from "vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component(
    "AdminForm",
    defineAsyncComponent(() => import("../components/AdminForm.vue"))
  );
});
