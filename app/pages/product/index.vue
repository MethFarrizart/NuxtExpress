<template>
  <admin-form
    :title="'seller_requesting'"
    iconName="bi:diagram-3-fill"
    :tableHeader="headers"
    :tableData="items"
    :enableSort="true"
    :sortBy="sortBy"
    :sortType="sortType"
    @sortChange="get()"
    :setButtonAction="true"
    :refreshButton="true"
    :setFilterCollapse="true"
    @refreshPage="resetAll"
    :setSearchBox="true"
    @filterSearch="searchFilter"
    :filter="filter"
    :setFilterButton="true"
    :pagination="pagination"
    @showRowsByPage="showRowsByPage"
    @clickPagination="get()"
    @getDataByFilter="get()"
  >
    <template #cell(name)="row">
      <div class="text-red font-bold">{{ row.item.name }}</div>
    </template>

    <template #cell(price)="row">
      <div class="text-red font-bold">{{ row.item.price }}</div>
    </template>

    <template #cell(action)="row">
      <action-button
        :deleteAction="true"
        @deleteItem="onDeleteItem(row.item)"
        :confirm-action="true"
        @confirmItem="onConfirmItem(row.item)"
      ></action-button>
    </template>
  </admin-form>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from "vue";
// import { useDateTime } from "@/composables/useDateTime";
// import type { Pagination } from "~/interfaceExport/type";

// const { typingTimer, doneTypingInterval } = useDateTime();
// const { t } = useI18n();

const sortType = ref<string>("desc");
const sortBy = ref<string | null>(null);
const items = ref<any[]>([
  {
    id: 1,
    name: "fEF3",
    qty: 10,
    price: 10,
  },
]);
const modalType = ref<number>(0);

const pagination = ref<Pagination>({
  current_page: 1,
  per_page: 10,
  total_rows: 0,
  from: 0,
  to: 0,
});

interface Filter {
  search: string | null;
  status_id: number | null;
  location_id: number | null;
  approved_by: number | null;
  start_date: number | null;
  end_date: string | null;
}

const headers = reactive([
  {
    key: "name",
    label: "name",
    sortable: true,
    class: "left",
  },

  {
    key: "qty",
    label: "qty",
    sortable: true,
    class: "center",
  },

  {
    key: "price",
    label: "price",
    sortable: true,
    class: "center",
  },
]);

const filter = ref<Filter>({
  search: null,
  status_id: null,
  location_id: null,
  approved_by: null,
  start_date: null,
  end_date: null,
});

const get = async () => {};

const resetAll = () => {
  get();
};

const searchFilter = (query: string) => {
  // clearTimeout(typingTimer);
  // if (query !== null) {
  //   typingTimer = setTimeout(() => {
  //     filter.value.search = query.trim();
  //     get();
  //   }, doneTypingInterval);
  // }
};

const onDeleteItem = async (item: object) => {};

const onConfirmItem = async (item: object) => {};
</script>
