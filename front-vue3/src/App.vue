<template>
  <n-space vertical size="large">
    <n-layout>
      <n-layout-header>
        <h2>Notes</h2>
      </n-layout-header>

      <n-layout has-sider>
        <n-layout-sider content-style="padding: 24px;">
          <groups-list />
        </n-layout-sider>

        <n-layout-content content-style="padding: 24px;">
          <notes-list />
        </n-layout-content>
      </n-layout>

      <n-layout-footer> by Grigory Volchok </n-layout-footer>
    </n-layout>
  </n-space>
</template>

<script setup lang="ts">
import GroupsList from "@/components/groups/GroupsList.vue";
import NotesList from "@/components/notes/NotesList.vue";
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
