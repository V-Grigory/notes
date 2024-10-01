<template>
  <n-space vertical size="large">
    <n-layout>
      <n-layout-header>
        <h2>Notes</h2>
      </n-layout-header>

      <n-layout has-sider>
        <n-message-provider placement="bottom-right">
          <n-layout-sider content-style="padding: 24px;">
            <groups-wrap @form-saved="onFormSaved" />
          </n-layout-sider>

          <n-layout-content content-style="padding: 24px;">
<!--            <notes-list />-->
          </n-layout-content>
        </n-message-provider>
      </n-layout>

      <n-layout-footer> by Grigory Volchok </n-layout-footer>
    </n-layout>
  </n-space>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

import { useNoteStore } from "@/stores/note";
import { serviceProvider } from "@/serviceProvider/serviceProvider";
import type { INotesData } from "@/entities";

import GroupsWrap from "@/components/groups/GroupsWrap.vue";

const store = useNoteStore();

onMounted(() => getNotes());

const getNotes = (): void => {
  serviceProvider.notes.getNotes().then((notes: INotesData[] | []) => {
    store.notes.length = 0;
    store.notes = [...notes];
  });
};

const onFormSaved = (): void => getNotes();
</script>

<style scoped>
h2 {
  margin: 0;
}
.n-layout-header,
.n-layout-footer {
  background: #b5c0d0;
  padding: 24px;
}
.n-layout-sider {
  background: rgba(128, 128, 128, 0.3);
}
.n-layout-content {
  background: rgba(128, 128, 128, 0.1);
}
</style>
