<template>
  <div v-show="isVisible">
    <div
      class="d-flex flex-column sidebar showSidebar overflow-y-scroll overflow-x-hidden"
    >
      <div class="container">
        <div class="mt-2" align="center">
          <img class="w-48 h-48" src="../static/sidebarLogo.jpg" alt="" />
        </div>

        <div class="flex flex-col mt-2 gap-3 link">
          <div v-for="(path, index) in links" :key="index">
            <nuxt-link :to="path.to">
              <div class="flex ps-4 pb-2 gap-4">
                <div class="text-white">
                  <Icon :name="`${path.icon}`"></Icon>
                </div>
                <div class="text-white font-bold">
                  <div>{{ $t(path.name) }}</div>
                </div>
              </div>
            </nuxt-link>
          </div>

          <!-- product management -->
          <div @click="toggleIcon1">
            <div class="flex ps-4 pb-2 gap-4 cursor-pointer">
              <div class="text-white">
                <Icon name="bi:stack"></Icon>
              </div>

              <div class="text-white font-bold flex align-baseline">
                <div>{{ $t("product_management") }}</div>
                <div class="px-2 mt-[-2px]">
                  <Icon v-if="!isCollapsed1" name="ic:baseline-arrow-right"></Icon>
                  <Icon v-else name="ic:baseline-arrow-drop-down"></Icon>
                </div>
              </div>
            </div>
          </div>

          <transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 scale-100"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-100"
          >
            <div v-if="isCollapsed1">
              <div class="flex flex-col gap-2 mx-12 mt-[-10px] cursor-pointer">
                <div v-for="(path, index) in product_sub_links" :key="index">
                  <nuxt-link :to="path.to">
                    <div class="flex gap-4">
                      <div class="mt-3 text-white">
                        <Icon :name="`${path.icon}`"></Icon>
                      </div>
                      <div class="pt-3 text-white font-bold">{{ $t(path.name) }}</div>
                    </div>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </transition>

          <!-- setting -->
          <div @click="toggleIcon2">
            <div class="flex ps-4 pb-2 gap-4 cursor-pointer">
              <div class="text-white">
                <Icon name="grommet-icons:settings-option"></Icon>
              </div>

              <div class="text-white font-bold flex align-baseline">
                <div>{{ $t("setting") }}</div>
                <div class="px-2 mt-[-2px]">
                  <Icon v-if="!isCollapsed2" name="ic:baseline-arrow-right"></Icon>
                  <Icon v-else name="ic:baseline-arrow-drop-down"></Icon>
                </div>
              </div>
            </div>
          </div>

          <div v-if="isCollapsed2">
            <div class="flex flex-col gap-2 mx-12 mt-[-10px] cursor-pointer">
              <div v-for="(path, index) in sub_links" :key="index">
                <nuxt-link :to="path.to">
                  <div class="flex gap-4">
                    <div class="mt-3 text-white">
                      <Icon :name="`${path.icon}`"></Icon>
                    </div>
                    <div class="pt-3 text-white font-bold">{{ $t(path.name) }}</div>
                  </div>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: true,
  },
});

const isCollapsed1 = ref(false);
const isCollapsed2 = ref(false);
const links = reactive([
  {
    to: "/seller_requesting",
    name: "seller_requesting",
    icon: "bi:diagram-3-fill",
  },
]);

const product_sub_links = reactive([
  {
    to: "/product_management/today_product_sale",
    name: "today_product_sale",
    icon: "bi:box",
  },
  {
    to: "/product_management/product_by_seller",
    name: "product_by_seller",
    icon: "bi:shop",
  },
  {
    to: "/product_management/category",
    name: "category",
    icon: "bi:pie-chart",
  },
  {
    to: "/product_management/unit_type",
    name: "unit_type",
    icon: "grommet-icons:apps",
  },
]);

const sub_links = reactive([
  {
    to: "/setting/register",
    name: "register",
    icon: "bi:clipboard2-check",
  },
  {
    to: "/setting/role",
    name: "role",
    icon: "bi:dice-5",
  },
  {
    to: "/setting/admin_list",
    name: "admin_list",
    icon: "bi:person-fill-check",
  },

  {
    to: "/setting/admin_deleted",
    name: "admin_deleted",
    icon: "bi:person-fill-x",
  },
]);

const toggleIcon1 = () => {
  isCollapsed1.value = !isCollapsed1.value;
};

const toggleIcon2 = () => {
  isCollapsed2.value = !isCollapsed2.value;
};
</script>

<style>
.sidebar-container {
  display: none;
}

@media (min-width: 992px) {
  .sidebar-container {
    display: block;
  }
}
</style>
