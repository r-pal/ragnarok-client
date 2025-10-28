import { IScoreboardItem } from "types";

export const scoreboardDummy: Array<IScoreboardItem> = [
  {
    name: "House of Boils",
    score: {
      choleric: 600,
      phlegmatic: 223,
      melancholic: 534,
      sanguine: 234
    },
    points: {
      balance: 1,
      total: 1200
    },
    ranking: 6,
    houseIds: [1]

  },
  // {
  //   name: "House of Miasma",
  //   score: {
  //     choleric: 600,
  //     phlegmatic: 23,
  //     melancholic: 94,
  //     sanguine: 234
  //   },
  //   points: {
  //     balance: 6,
  //     total: 800
  //   },
  //   ranking: 2
  // },
  {
    name: "Faction Balance",
    score: {
      choleric: 600,
      phlegmatic: 23,
      melancholic: 94,
      sanguine: 234
    },
    points: {
      balance: 2,
      total: 8000
    },
    ranking: 1,
    houseIds: [3, 2]
  }
];
