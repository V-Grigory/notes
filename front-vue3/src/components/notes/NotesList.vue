<template>
  <div class="group-title">
    {{ groupTitle }}
  </div>

  <div v-for="(item, index) in items" :key="index" class="note">
    <div class="note-attributes">
      <div class="note-title">
        <b>{{ item.title }}</b>
      </div>
      <div class="note-value">
        {{ item.value }}
      </div>
      <div class="note-description">
        {{ item.description }}
      </div>
    </div>

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
import type { INoteData } from "@/entities";
import EditIcon from "@/components/ui/EditIcon.vue";

defineProps<{
  groupTitle: string;
  items: INoteData[] | [];
}>();

const emit = defineEmits<{
  (e: "editItem", formData: INoteData): void;
  (e: "addItem"): void;
}>();

const editItem = (item: INoteData): void => {
  emit("editItem", item);
};

const addItem = (): void => {
  emit("addItem");
};
</script>

<style scoped>
.group-title {
  margin-bottom: 5px;
  font-weight: bold;
}

.note {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 7px;
  padding: 5px 10px;
  border: 1px solid grey;
  border-radius: 5px;
}
.note-attributes {
}
.note-title {
}
.note-value {
}
.note-description {
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
