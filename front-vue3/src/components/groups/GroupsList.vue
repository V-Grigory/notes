<template>
  <div v-for="(item, index) in items" :key="index" class="list-item-wrapper">
    <n-button
      @click="setActiveItem(item)"
      strong
      secondary
      round
      class="select-list-item-button"
    >
      {{ item.groupTitle }}
    </n-button>

    <edit-icon @click="editItem(item)" class="edit-list-item-icon" />
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
import type { IGroupData } from "@/entities";
import EditIcon from "@/components/ui/EditIcon.vue";

defineProps<{
  items: IGroupData[] | [];
}>();

const emit = defineEmits<{
  (e: "setActiveGroup", item: IGroupData): void;
  (e: "editItem", formData: IGroupData): void;
  (e: "addItem"): void;
}>();

const setActiveItem = (item: IGroupData): void => {
  emit("setActiveGroup", item);
};

const editItem = (item: IGroupData): void => {
  emit("editItem", item);
};

const addItem = (): void => {
  emit("addItem");
};
</script>

<style scoped>
.list-item-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.select-list-item-button {
  text-wrap: initial;
  margin: 3px 0;
  width: 190px;
  min-height: 34px;
  height: auto;
  padding: 10px 15px;
}
.edit-list-item-icon {
  cursor: pointer;
}
.edit-list-item-icon:hover {
  color: grey;
}
.add-list-item-button {
  margin-top: 15px;
}
</style>
