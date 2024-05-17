import { describe, it, expect } from "vitest";

import { Api } from "@/api/group/in-memory/groupData";
import { GroupsService } from "@/services";
import type { IGroupData } from "@/entities";

const apiGroups = new Api();
const groupsData: IGroupData[] = await apiGroups.getAllGroups();

describe(">>> Groups Service", () => {
  const service = new GroupsService(new Api());

  describe(">> getAllGroups", () => {
    it("should return all groups", async () => {
      expect.assertions(1);
      try {
        const groups = await service.getAllGroups();

        expect([groupsData, []]).toContainEqual(groups);
      } catch (e) {
        expect(e).toMatch("Error message");
      }
    });
  });

  describe(">> createGroup", () => {
    it("should return error if doesn't pass validate (title is empty)", async () => {
      expect.assertions(1);
      try {
        await service.createGroup({ ...groupsData[0], title: "" });
      } catch (e) {
        expect(e).toMatch("GroupEntity is not valid");
      }
    });

    it("should add new group", async () => {
      expect.assertions(1);
      const groupsLengthBeforeAdd = (await service.getAllGroups()).length;

      await service.createGroup({ ...groupsData[0], title: "new title" });

      const groupsLengthAfterAdd = (await service.getAllGroups()).length;

      expect(groupsLengthBeforeAdd + 1).toBe(groupsLengthAfterAdd);
    });
  });
});
