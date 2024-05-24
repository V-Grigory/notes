import type { IGroupsService } from "@/services";
import type { IGroupData } from "@/entities";
import { GroupEntity } from "@/entities";
import type { IGroupsApi } from "@/api/group/types";

export class GroupsService implements IGroupsService {
  constructor(private readonly api: IGroupsApi) {}

  getAllGroups(): Promise<IGroupData[] | []> {
    return this.api.getAllGroups();
  }

  createGroup(newGroupData: IGroupData): Promise<void> {
    const group = new GroupEntity(newGroupData);

    if (group.validate()) {
      return this.api.createGroup(newGroupData);
    }

    return Promise.reject("GroupEntity is not valid");
  }

  getInitGroup(): IGroupData {
    return { id: 0, title: "", order: 0 };
  }
}
