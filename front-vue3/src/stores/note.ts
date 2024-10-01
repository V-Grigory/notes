import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { INotesData, IGroupData } from "@/entities";

export const useNoteStore = defineStore("note", () => {
  const notes = ref<Array<INotesData>>([]);

  const activeGroup = ref<IGroupData>({
    groupId: 0,
    groupTitle: "",
    groupOrder: 0,
  });

  function setActiveGroup(group: IGroupData): void {
    activeGroup.value = group;
  }

  const orderedGroups = computed((): Array<IGroupData> | [] => {
    const groups: IGroupData[] = notes.value.map((note: INotesData) => ({
      groupId: note.groupId,
      groupTitle: note.groupTitle,
      groupOrder: note.groupOrder,
    }));

    return groups.sort((a, b) => a.groupOrder - b.groupOrder);
  });

  return {
    notes,
    activeGroup,
    setActiveGroup,
    orderedGroups,
  };
});
