import type { IGroupData } from "@/entities";

export interface IApi {
  getAllGroups(): Promise<IGroupData[] | []>;
  createGroup(data: IGroupData): Promise<void>;
}
