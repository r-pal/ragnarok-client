import { IGame } from "types/game";

export const getGames: Array<IGame> = [
  {
    id: 1,
    name: "The Great Tournament of 1453",
    description: "A grand tournament where houses competed in tests of strength, wisdom, and balance.",
    scores: [
      {
        houseId: 1,
        houseName: "House of Boils",
        score: {
          choleric: 150,
          phlegmatic: 45,
          melancholic: 120,
          sanguine: 67
        }
      },
      {
        houseId: 4,
        houseName: "House of Crimson Tides",
        score: {
          choleric: 89,
          phlegmatic: 23,
          melancholic: 78,
          sanguine: 145
        }
      },
      {
        houseId: 7,
        houseName: "House of Twilight",
        score: {
          choleric: 45,
          phlegmatic: 98,
          melancholic: 134,
          sanguine: 56
        }
      }
    ]
  },
  {
    id: 2,
    name: "Battle of the Four Humours",
    description: "An epic confrontation testing mastery of all four humours in a single day.",
    scores: [
      {
        houseId: 2,
        houseName: "House of Miasma",
        score: {
          choleric: 200,
          phlegmatic: 12,
          melancholic: 45,
          sanguine: 89
        }
      },
      {
        houseId: 3,
        houseName: "Plague Doctors",
        score: {
          choleric: 34,
          phlegmatic: 11,
          melancholic: 156,
          sanguine: 78
        }
      },
      {
        houseId: 8,
        houseName: "House of Golden Dawn",
        score: {
          choleric: 67,
          phlegmatic: 123,
          melancholic: 45,
          sanguine: 234
        }
      },
      {
        houseId: 9,
        houseName: "House of Frost",
        score: {
          choleric: 56,
          phlegmatic: 189,
          melancholic: 78,
          sanguine: 34
        }
      }
    ]
  },
  {
    id: 3,
    name: "The Equilibrium Challenge",
    scores: [
      {
        houseId: 5,
        houseName: "House of Whispers",
        score: {
          choleric: 78,
          phlegmatic: 167,
          melancholic: 56,
          sanguine: 89
        }
      },
      {
        houseId: 6,
        houseName: "House of Iron Will",
        score: {
          choleric: 234,
          phlegmatic: 45,
          melancholic: 89,
          sanguine: 34
        }
      },
      {
        houseId: 10,
        houseName: "House of Verdant Roots",
        score: {
          choleric: 112,
          phlegmatic: 67,
          melancholic: 178,
          sanguine: 89
        }
      }
    ]
  }
];
