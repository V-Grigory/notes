import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { IGroupData } from "@/entities";

export const useGroupStore = defineStore("group", () => {
  const groups = ref<Array<IGroupData>>([]);

  // const doubleCount = computed(() => count.value * 2);

  // function increment() {
  //   count.value++;
  // }

  return { groups };
});
