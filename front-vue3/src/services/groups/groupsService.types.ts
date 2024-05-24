import type { IGroupData } from "@/entities";

export interface IGroupsService {
  getAllGroups(): Promise<IGroupData[] | []>;
  createGroup(data: IGroupData): Promise<void>;
  getInitGroup(): IGroupData;
}
