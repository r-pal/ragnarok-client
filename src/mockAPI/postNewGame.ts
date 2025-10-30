import { IPostGame } from "types/game";

export const postNewGame: IPostGame = 
{
  name: "onion dome",
  scores:
  [
  {
      houseId: 1,
      score: {
      choleric: 34,
      phlegmatic: 42,
      melancholic: 25,
      sanguine: 0
    }
  },
  {
      houseId: 2,
      score: {
      choleric: 76,
      phlegmatic: -97,
      melancholic: 6,
      sanguine: 23
    }
  }
]};
