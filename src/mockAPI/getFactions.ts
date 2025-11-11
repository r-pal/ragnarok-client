import { IFaction } from "types/faction";

export const getFactions: Array<IFaction & { id: number }> = [
  {
    id: 1,
    name: "Faction Balance",
    motto: "United in equilibrium",
    houseIds: [2, 3]
  },
  {
    id: 2,
    name: "The Steel Alliance",
    motto: "Strength through unity",
    houseIds: [5, 6]
  }
];
