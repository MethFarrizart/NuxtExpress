<template>
  <div>
    <div class="main-content">
      <div class="container-fluid mt-[70px]">
        <div
          class="bg-white p-4 shadow-lg rounded-[15px] border-t-[3px] border-primary_color"
        >
          <div class="flex justify-between pt-3">
            <div class="flex gap-4">
              <div class="text-[1rem]">
                <!-- set Icon through sidebar module icon -->
                <Icon
                  :name="`${props.iconName}`"
                  class="text-[5rem] text-primary_color"
                ></Icon>
              </div>
              <p class="text-[1.25rem] font-bold">
                <!-- set title through sidebar module name -->
                {{ props.title }}
              </p>
            </div>
            <div class="flex gap-2">
              <!-- set button to add item -->
              <div v-if="props.setButtonAddItem">
                <button
                  class="flex main-btn gap-2 w-auto px-3 py-1"
                  @click="emit('addItem')"
                >
                  <Icon name=" bi-plus-circle"></Icon>
                  Add
                </button>
              </div>

              <!-- set refresh button to refresh item -->
              <div v-if="props.refreshButton">
                <button
                  class="main-btn flex w-auto gap-2 px-3 py-1"
                  @click="emit('refreshPage')"
                >
                  <Icon name="bi-arrow-clockwise"></Icon>
                  <span> {{ $t("refresh") }} </span>
                </button>
              </div>

              <!-- set filter collapse -->
              <div
                @click="toggleFilterCollapse"
                v-if="props.setFilterCollapse"
                class="text-lg border-0 cursor-pointer"
              >
                <Icon name="bi-filter" class="text-primary_color"></Icon>
              </div>
            </div>
          </div>

          <!-- Collapse filter -->
          <div v-if="setFilterCollapseIcon" class="mt-5">
            <div class="w-100 rounded-lg overflow-hidden border-[1px] shadow-md p-3">
              <slot name="filterData"></slot>

              <div align="right">
                <button
                  v-if="props.setFilterButton"
                  class="main-btn w-auto px-4 py-1"
                  @click="emit('getDataByFilter')"
                >
                  Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- table Data -->
      <div class="container-fluid mt-5">
        <div class="row">
          <div class="bg-white p-4 border shadow-lg rounded-[15px]">
            <div class="flex justify-between mt-2">
              <div class="flex gap-1">
                <!-- set pagination amount -->
                <div
                  class="relative inline-block text-left bg-primary_color rounded-[15px]"
                  ref="refPaginations"
                >
                  <div
                    @click="togglePagination"
                    class="flex hover:bg-hover_background w-full text-white gap-2 px-3 py-2 text-sm font-semibold rounded-[15px]"
                  >
                    <input
                      type="submit"
                      id="menu-button"
                      v-model="props.pagination.per_page"
                    />

                    <Icon name="ic:baseline-arrow-drop-down" class="-mt-1"></Icon>
                  </div>

                  <transition
                    enter-active-class="transition ease-out duration-200"
                    enter-from-class="opacity-0 scale-95"
                    enter-to-class="opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-150"
                    leave-from-class="opacity-100 scale-100"
                    leave-to-class="opacity-0 scale-95"
                  >
                    <div
                      v-if="paginationValue"
                      class="absolute left-0 z-10 w-40 mt-2 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                      tabindex="-1"
                    >
                      <div
                        class="py-1 px-2 hover:bg-gray-100 cursor-pointer"
                        role="none"
                        v-for="(pages, index) in pageOptions"
                        :key="index"
                        @click="
                          emit('showRowsByPage', pages);
                          handleDropItemClick();
                        "
                      >
                        <div class="p-2">{{ pages }}</div>
                      </div>
                    </div>
                  </transition>
                </div>

                <!-- set sort By label when sortable == true -->
                <div
                  class="relative inline-block text-left bg-primary_color rounded-[15px]"
                  ref="refSortBy"
                >
                  <div
                    @click="toggleSortable"
                    class="flex hover:bg-hover_background w-full text-white gap-2 px-1 py-2 text-sm font-semibold rounded-[15px]"
                  >
                    <input
                      type="submit"
                      id="menu-button"
                      v-if="props.enableSort"
                      v-model="props.sortBy"
                    />

                    <div class="cursor-default">
                      {{
                        props.sortBy == "" ? "Sort" : "Sort By" + " : " + `${sortByLabel}`
                      }}
                    </div>

                    <Icon name="ic:baseline-arrow-drop-down" class="-mt-1"></Icon>
                  </div>

                  <transition
                    enter-active-class="transition ease-out duration-200"
                    enter-from-class="opacity-0 scale-95"
                    enter-to-class="opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-150"
                    leave-from-class="opacity-100 scale-100"
                    leave-to-class="opacity-0 scale-95"
                  >
                    <div
                      v-if="sortableValue"
                      class="max-h-64 overflow-y-auto absolute left-0 z-10 w-52 mt-2 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                      tabindex="-1"
                    >
                      <div
                        class="py-1 px-2 hover:bg-gray-100 cursor-pointer"
                        role="none"
                        @click="
                          resetFilterSort();
                          handleDropItemClick();
                        "
                      >
                        <div class="p-2">Reset</div>
                      </div>

                      <div
                        class="hover:bg-gray-100 cursor-pointer py-1 px-2"
                        role="none"
                        v-for="(sortByOption, index) in sortByOptions"
                        :key="index"
                        @click="
                          clickSortByOption(sortByOption.key, sortByOption.label);
                          handleDropItemClick();
                        "
                      >
                        <div class="p-2">
                          {{ sortByOption.label }}
                        </div>
                      </div>
                    </div>
                  </transition>
                </div>

                <!-- set sort Type options ASC <=> DESC -->
                <div
                  class="relative inline-block text-left bg-primary_color rounded-[15px]"
                  ref="refSortType"
                >
                  <div
                    @click="toggleSortType"
                    class="flex hover:bg-hover_background w-full text-white gap-2 px-3 py-2 text-sm font-semibold rounded-[15px]"
                  >
                    <input
                      type="submit"
                      id="menu-button"
                      v-if="props.sortBy"
                      v-model="props.sortType"
                      class="cursor-pointer"
                    />

                    <div class="cursor-default">
                      {{ props.sortType == "asc" ? "Ascending" : "descending" }}
                    </div>

                    <Icon name="ic:baseline-arrow-drop-down" class="-mt-1"></Icon>
                  </div>

                  <transition
                    enter-active-class="transition ease-out duration-200"
                    enter-from-class="opacity-0 scale-95"
                    enter-to-class="opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-150"
                    leave-from-class="opacity-100 scale-100"
                    leave-to-class="opacity-0 scale-95"
                  >
                    <div
                      v-if="sortTypeValue"
                      class="max-h-64 overflow-y-auto absolute left-0 z-10 w-36 mt-2 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                      tabindex="-1"
                    >
                      <div
                        class="py-1 px-2 hover:bg-gray-100 cursor-pointer"
                        role="none"
                        @click="
                          clickChangeSortType('asc');
                          handleDropItemClick();
                        "
                      >
                        <div class="p-2">Ascending</div>
                      </div>

                      <div
                        class="py-1 px-2 hover:bg-gray-100 cursor-pointer"
                        role="none"
                        @click="
                          clickChangeSortType('desc');
                          handleDropItemClick();
                        "
                      >
                        <div class="p-2">Descending</div>
                      </div>
                    </div>
                  </transition>
                </div>
              </div>

              <div class="flex gap-2">
                <!-- set search box -->
                <div v-if="props.setSearchBox" class="relative">
                  <input
                    placeholder="Search"
                    type="text"
                    @input="emit('filterSearch')"
                    v-model="props.filter.search"
                    class="rounded-xl h-[30px] border-[1px] px-3 border-primary_color focus:outline-primary_color text-[13] shadow-none"
                  />
                  <!-- Search Icon -->
                  <div
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    <Icon name="bi-search" class="w-4 h-4"></Icon>
                  </div>
                </div>

                <!-- printPDF -->
                <div v-if="props.isSetprintPDF">
                  <b-button
                    class="main-btn px-4 py-1 flex gap-2"
                    @click="emit('printPDF')"
                  >
                    <i class="bi bi-printer"></i>
                    Print
                  </b-button>
                </div>
              </div>
            </div>

            <div class="overflow-x-scroll snap-x">
              <table class="rounded-t-[15px] mt-5 snap-end w-full">
                <thead class="leading-10 bg-primary_color text-white">
                  <tr>
                    <!-- table header -->
                    <th
                      v-for="header in props.tableHeader"
                      :key="header.key"
                      :class="[header.class]"
                      class="px-5"
                    >
                      {{ header.label }}
                    </th>
                  </tr>
                </thead>
                <tbody class="leading-[3rem]">
                  <!-- table data -->
                  <tr
                    v-for="item in props.tableData"
                    :key="item.id"
                    class="hover:bg-gray-200 border"
                  >
                    <td
                      v-for="header in props.tableHeader"
                      :class="header.class"
                      class="px-5"
                    >
                      <slot :name="`cell(${header.key})`" v-bind="{ ...header, item }">
                        {{ item[header.key] }}
                      </slot>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { Props, Emits } from "../composables/interface/type.ts";
import { ref, computed, watch, defineProps, defineEmits } from "vue";
// const { t } = useI18n();

const props = withDefaults(defineProps<Props>(), {
  isSetprintPDF: false,
  setButtonAddItem: false,
  refreshButton: false,
  setFilterCollapse: false,
  enableSort: false,
  setButtonAction: false,
  setSearchBox: false,
  setFilterButton: false
});

// const props = defineProps<Props>();
const emit = defineEmits<Emits>();


// data
const setFilterCollapseIcon = ref<boolean>(false);
const paginationValue = ref<boolean>(false);
const sortableValue = ref<boolean>(false);
const sortTypeValue = ref<boolean>(false);
const sortByLabel = ref<string | null>(null);
const currentPage = ref<number>(props.pagination.current_page);
const totalPages = ref<number>(props.pagination.per_page);

const pageOptions = ref<[10, 20, 30, 40, 50, 100]>


// computed
const sortByOptions = computed(() => {
  return props.tableHeader.filter((arr) => arr.sortable == true);
});

// methods
const toggleFilterCollapse = () => {
  setFilterCollapseIcon.value = !setFilterCollapseIcon.value;
};

const togglePagination = () => {
  paginationValue.value = !paginationValue.value;
};

const toggleSortable = () => {
  sortableValue.value = !sortableValue.value;
};

const toggleSortType = () => {
  sortTypeValue.value = !sortTypeValue.value;
};

const clickSortByOption = (key: string, label: string) => {
  sortByLabel.value = label;
  emit("update:sortBy", key);
  emit("sortChange");
};

const clickChangeSortType = (type: string) => {
  emit("update:sortType", type);
  emit("sortChange");
};


const handleDropItemClick = () => {
  paginationValue.value = false;
  sortableValue.value = false;
  sortTypeValue.value = false;
};


const resetFilterSort = () => {
  sortByLabel.value = "";
  emit("update:sortBy", null);
  emit("update:sortType", "desc");
  emit("sortChange");
};
</script>

<style scoped>
:deep(.table.b-table > thead > tr > [aria-sort="none"]) {
  background-image: none;
}

:deep(.table.b-table > thead > tr > [aria-sort="ascending"]) {
  background-image: none;
}

:deep(.table.b-table > thead > tr > [aria-sort="descending"]) {
  background-image: none;
}
</style>
