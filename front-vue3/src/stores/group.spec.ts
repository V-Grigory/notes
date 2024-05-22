import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useGroupStore } from "@/stores/group";
import { serviceProvider } from "@/serviceProvider/serviceProvider";
import type { IGroupData } from "@/entities";

describe("Group Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("sortedGroups", () => {
    const store = useGroupStore();

    serviceProvider.groups
      .getAllGroups()
      .then((groupsData: IGroupData[] | []) => {
        store.groups = groupsData;

        expect(store.sortedGroups).toEqual([
          {
            id: 1,
            title: "группа первая",
            order: 1,
          },
          {
            id: 2,
            title: "группа вторая",
            order: 2,
          },
          {
            id: 4,
            title: "группа четвертая",
            order: 4,
          },
          {
            id: 3,
            title: "группа третья",
            order: null,
          },
        ]);
      });
  });
});
