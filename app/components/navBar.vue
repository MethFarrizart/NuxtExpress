<template>
    <div class="header border shadow flex flex-row justify-between p-3">
        <div class="flex flex-row align-middle">
            <div
                @click="toggleSideBar"
                class="text-primary_color cursor-pointer font-size-[1.5rem]"
            >
                click
            </div>

            <div class="pl-2">
                <a
                    class="langBtn p-1 cursor-pointer"
                    v-for="locale in availableLocales"
                    :key="locale.code"
                    :to="switchLocalePath(locale.code)"
                    @click.prevent.stop="$i18n.setLocale(locale.code)"
                    role="button"
                >
                    fagr
                    <img
                  :src="`/static/${locale.code}.png`"
                  class="w-[25px] h-[25px] object-cover"
                ></img>
                {{ locale.name }}
                </a>
            </div>
        </div>
    </div>
    <!-- <div>
 
    <div class="header border shadow d-flex justify-content-between p-3">
     
      <div class="d-flex align-items-center">
        <div class="d-flex justify-content-center align-items-center">
          <div class="d-flex align-items-center">
            <div
              @click="toggleSideBar"
              class="text-primary fw-bold pt-2 showBarIcon"
              style="cursor: pointer; font-size: 1.5rem"
            >
              <i class="bi bi-list"></i>
            </div>
          </div>
          <div class="pl-2">
            
            <div class="d-flex align-items-center">
              <a
                class="langBtn p-1"
                v-for="locale in availableLocales"
                :key="locale.code"
                :to="switchLocalePath(locale.code)"
                @click.prevent.stop="$i18n.setLocale(locale.code)"
                role="button"
                style="cursor: pointer; text-decoration: none"
              >
                <img
                  :src="`/static/${locale.code}.png`"
                  style="width: 25px; height: 25px; object-fit: cover"
                ></img>
                {{ locale.name }}
              </a>
            </div>
          </div>
        </div>
      </div>

       
      <div class="d-flex gap-2 image-margin">
        <b-img
          class="admin-profile-image object-fit-cover"
          src="/static/user_null_image.png"
        ></b-img>

        <div class="d-flex flex-column align-items-start">
          <div>
            <span style="color: #00826c; font-size: 13px; padding-left: 9px">
              fefgreg
            </span>
          </div>

          <b-dropdown
            size="sm"
            class="h-75 profile-username"
            variant="outline-muted"
            style="border: 0"
            no-caret
          >
            <template #button-content>
              <div>fawfgreg</div>
            </template>
            <b-dropdown-item type="button" @click="logout">
              <div class="d-flex gap-4">
                <i variant="danger" class="fa-solid fa-right-from-bracket"></i>
                {{ $t("log_out") }}
              </div>
            </b-dropdown-item>
            <b-dropdown-item type="button" @click="editProfile">
              <div class="d-flex gap-4">
                <i variant="danger" class="fa-solid fa-user-pen"></i>
                {{ $t("profile") }}
              </div>
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </div>
  </div> -->
</template>

<script setup>
    import { ref, reactive, computed } from "vue";

    const khmer = ref("khmer");
    const english = ref("english");
    const modalType = ref(0);

    const availableLocales = computed(() => {
        get: () => {
            return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale);
        };
    });

    const emit = defineEmits(["toggleSideBar"]);

    const logout = () => {};

    const editProfile = () => {};

    const toggleSideBar = () => {
        emit("toggleSideBar");
    };
</script>

<script>
    export default {};
</script>
