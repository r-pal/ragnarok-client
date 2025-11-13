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
  },
  {
    id: 4,
    name: "The Moonlit Trials",
    description: "A nocturnal competition testing endurance and wisdom under the pale moon.",
    scores: [
      {
        houseId: 11,
        houseName: "House of Silver Moon",
        score: {
          choleric: 67,
          phlegmatic: 234,
          melancholic: 123,
          sanguine: 89
        }
      },
      {
        houseId: 3,
        houseName: "Plague Doctors",
        score: {
          choleric: 52,
          phlegmatic: 12,
          melancholic: 78,
          sanguine: 156
        }
      },
      {
        houseId: 7,
        houseName: "House of Twilight",
        score: {
          choleric: 122,
          phlegmatic: 200,
          melancholic: 311,
          sanguine: 133
        }
      }
    ]
  },
  {
    id: 5,
    name: "The Inferno Gauntlet",
    description: "A test of raw power and fiery determination through trials of flame.",
    scores: [
      {
        houseId: 12,
        houseName: "House of Ember",
        score: {
          choleric: 378,
          phlegmatic: 56,
          melancholic: 89,
          sanguine: 167
        }
      },
      {
        houseId: 1,
        houseName: "House of Boils",
        score: {
          choleric: 450,
          phlegmatic: 178,
          melancholic: 414,
          sanguine: 167
        }
      },
      {
        houseId: 6,
        houseName: "House of Iron Will",
        score: {
          choleric: 444,
          phlegmatic: 89,
          melancholic: 156,
          sanguine: 27
        }
      }
    ]
  },
  {
    id: 6,
    name: "The Vigil of Shadows",
    description: "An ancient rite where houses prove their worth through contemplation and vigilance.",
    scores: [
      {
        houseId: 13,
        houseName: "House of Eternal Vigil",
        score: {
          choleric: 98,
          phlegmatic: 145,
          melancholic: 412,
          sanguine: 67
        }
      },
      {
        houseId: 5,
        houseName: "House of Whispers",
        score: {
          choleric: 123,
          phlegmatic: 322,
          melancholic: 100,
          sanguine: 189
        }
      },
      {
        houseId: 10,
        houseName: "House of Verdant Roots",
        score: {
          choleric: 177,
          phlegmatic: 89,
          melancholic: 300,
          sanguine: 145
        }
      },
      {
        houseId: 8,
        houseName: "House of Golden Dawn",
        score: {
          choleric: 167,
          phlegmatic: 222,
          melancholic: 78,
          sanguine: 378
        }
      }
    ]
  }
];
