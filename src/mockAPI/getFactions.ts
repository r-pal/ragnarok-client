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
  },
  {
    id: 3,
    name: "The Grand Coalition",
    motto: "Many houses, one destiny",
    houseIds: [1, 4, 7, 8, 9, 10]
  }
];
