import { IGroupData } from "@/entities";
import groupJsonData from "@/dataProvider/mocks/groupData.json";

const groupTsData = JSON.parse(JSON.stringify(groupJsonData));

export const mockGroupsData = (): IGroupData[] => {
  const groups: IGroupData[] = [];

  groupTsData.forEach((rubric: IGroupData) => groups.push(rubric));

  return groups;
};

// export const mockRubrics = (data: IRubricData[] = mockRubricsData()): IRubric[] => {
//   return data.map(item => new Rubric(item))
// }
