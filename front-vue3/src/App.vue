<template>
  <n-space vertical size="large">
    <n-layout>
      <n-layout-header>
        <h2>Notes</h2>
      </n-layout-header>

      <n-layout-content content-style="padding: 10px;">
        <n-message-provider placement="bottom-right">
          <groups-manager />
          <notes-manager />
        </n-message-provider>
      </n-layout-content>

      <n-layout-footer> by Grigory Volchok </n-layout-footer>
    </n-layout>
  </n-space>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useNoteStore } from "@/stores/note";

import GroupsManager from "@/components/groups/GroupsManager.vue";
import NotesManager from "@/components/notes/NotesManager.vue";

const store = useNoteStore();

const loadNotes = async (): Promise<void> => {
  try {
    await store.loadNotes();
  } catch (error) {
    console.error("Ошибка при получении заметок:", error);
    // Показать уведомление об ошибке пользователю
    // Можно использовать message API из naive-ui
  }
};

onMounted(() => loadNotes());
</script>

<style scoped>
h2 {
  margin: 0;
}

.n-layout-header,
.n-layout-footer {
  background: #b0c4de;
  padding: 10px;
}
</style>
