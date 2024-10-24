import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { INotesData, INoteData, IGroupData } from "@/entities";

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

  const groupNotes = computed((): Array<INoteData> | [] => {
    const group: INotesData | undefined = notes.value.find(
      (group: INotesData) => group.groupId === activeGroup.value.groupId
    );
    return group ? group.notes : [];
  });

  return {
    notes,
    activeGroup,
    setActiveGroup,
    orderedGroups,
    groupNotes,
  };
});
