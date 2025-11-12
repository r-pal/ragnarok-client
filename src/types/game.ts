
import { IScore } from "./shared";

export interface IGameScores {
  houseId: number;
  houseName?: string;
  score: IScore
}

// POST game: sends a game name and house scores - to be sent once a game or game round is completed.
export interface IPostGame {
  id?: number;
  name: string;
  scores: Array<IGameScores>;
  description?: string;
}

// GET games list - array of IGame - this is a record of all the games played - put in chronological order
export interface IGame {
  id: number;
  name: string;
  scores: Array<IGameScores>;
  description?: string;
}

//DELETE game: if scores were submitted erroneously, this can be used to delete that game entry.
export interface IDeleteGame {
  id: number;
}