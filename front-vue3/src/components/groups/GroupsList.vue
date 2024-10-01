<template>
  <div
    v-for="(itemList, index) in store.orderedGroups"
    :key="index"
    class="list-item-wrapper"
  >
    <n-button
      @click="setActiveItem(itemList)"
      strong
      secondary
      round
      class="select-list-item-button"
    >
      {{ itemList.groupTitle }}
    </n-button>

    <edit-icon @click="editItem(itemList)" />
  </div>

  <n-button
    @click="addItem"
    strong
    secondary
    block
    type="primary"
    class="add-list-item-button"
  >
    +
  </n-button>
</template>

<script setup lang="ts">
import { serviceProvider } from "@/serviceProvider/serviceProvider";
import { useNoteStore } from "@/stores/note";
import type { IGroupData } from "@/entities";
import EditIcon from "@/components/ui/EditIcon.vue";

const store = useNoteStore();

const emit = defineEmits<{
  (e: "openForm", formData: IGroupData): void;
}>();

const setActiveItem = (item: IGroupData): void => {
  store.setActiveGroup(item);
};

const editItem = (item: IGroupData): void => {
  emit("openForm", item);
};
const addItem = (): void => {
  emit("openForm", serviceProvider.notes.getInitGroup());
};
</script>

<style scoped>
.list-item-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.select-list-item-button {
  display: block;
  text-wrap: initial;
  margin: 3px 0;
}
.add-list-item-button {
  margin-top: 15px;
}
</style>
