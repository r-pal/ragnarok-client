import { IScoreboardItem } from "types/scoreboard";

export const getScoreboard: Array<IScoreboardItem> = 
[
  {
    name: "House of Golden Dawn",
    score: {
      choleric: 234,
      phlegmatic: 345,
      melancholic: 123,
      sanguine: 612
    },
    points: {
      balance: 8,
      total: 1150
    },
    ranking: 1,
    houseIds: [8]
  },
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
    ranking: 2,
    houseIds: [1]
  },
  {
    name: "The Steel Alliance",
    score: {
      choleric: 879,
      phlegmatic: 623,
      melancholic: 401,
      sanguine: 401
    },
    points: {
      balance: 6,
      total: 2150
    },
    ranking: 3,
    houseIds: [5, 6]
  },
  {
    name: "House of Frost",
    score: {
      choleric: 178,
      phlegmatic: 534,
      melancholic: 267,
      sanguine: 145
    },
    points: {
      balance: 6,
      total: 1000
    },
    ranking: 4,
    houseIds: [9]
  },
  {
    name: "House of Verdant Roots",
    score: {
      choleric: 289,
      phlegmatic: 156,
      melancholic: 478,
      sanguine: 234
    },
    points: {
      balance: 5,
      total: 975
    },
    ranking: 5,
    houseIds: [10]
  },
  {
    name: "House of Crimson Tides",
    score: {
      choleric: 145,
      phlegmatic: 89,
      melancholic: 312,
      sanguine: 567
    },
    points: {
      balance: 3,
      total: 950
    },
    ranking: 6,
    houseIds: [4]
  },
  {
    name: "House of Twilight",
    score: {
      choleric: 167,
      phlegmatic: 298,
      melancholic: 445,
      sanguine: 189
    },
    points: {
      balance: 7,
      total: 900
    },
    ranking: 7,
    houseIds: [7]
  },
  {
    name: "Faction Balance",
    score: {
      choleric: 686,
      phlegmatic: 46,
      melancholic: 328,
      sanguine: 468
    },
    points: {
      balance: 11,
      total: 1600
    },
    ranking: 8,
    houseIds: [2, 3]
  }
];
