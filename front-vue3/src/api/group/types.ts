import type { IGroupData } from "@/entities";

export interface IGroupsApi {
  getAllGroups(): Promise<IGroupData[] | []>;
  createGroup(data: IGroupData): Promise<void>;
}
