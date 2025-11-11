import { IScoreboardItem } from "types/scoreboard";
import { getStandardDeviation } from "helpers/maths";

const calculateBalance = (choleric: number, phlegmatic: number, melancholic: number, sanguine: number) => {
  return getStandardDeviation([choleric, phlegmatic, melancholic, sanguine]);
};

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
      balance: calculateBalance(234, 345, 123, 612),
      total: 1150
    },
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
      balance: calculateBalance(600, 223, 534, 234),
      total: 1200
    },
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
      balance: calculateBalance(879, 623, 401, 401),
      total: 2150
    },
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
      balance: calculateBalance(178, 534, 267, 145),
      total: 1000
    },
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
      balance: calculateBalance(289, 156, 478, 234),
      total: 975
    },
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
      balance: calculateBalance(145, 89, 312, 567),
      total: 950
    },
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
      balance: calculateBalance(167, 298, 445, 189),
      total: 900
    },
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
      balance: calculateBalance(686, 46, 328, 468),
      total: 1600
    },
    houseIds: [2, 3]
  }
];
