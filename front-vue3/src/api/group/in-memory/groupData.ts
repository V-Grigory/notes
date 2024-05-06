import type { IApi } from "@/api/api.types";
import type { IGroupData } from "@/entities";

import groupJsonData from "./groupData.json";
// import Utils from '../utils/utils';

const groups = JSON.parse(JSON.stringify(groupJsonData));

export class Api implements IApi {
  getAllGroups(): Promise<IGroupData[] | []> {
    return new Promise<IGroupData[]>((resolve, reject) => {
      return resolve(groups);
    });
  }

  createGroup(newGroupData: IGroupData): Promise<void> {
    return new Promise((resolve) => {
      groups.push(newGroupData);
      return resolve();
    });
  }
}
