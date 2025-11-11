
import { Humours, IPoints, IScore } from "./shared";

//POST new house and EDIT house:

export interface IPostHouse {
  name: string;
  motto: string;
  crestUrl?: string;
  strength?: Humours;
  weakness?: Humours;
}

//GET array of:
export interface IHouse {
  id: number;
  name: string;
  motto: string;
  crestUrl?: string;
  strength: Humours;
  weakness: Humours;
  score?: IScore;
  points?: IPoints;
  factionId?: number;
  factionName?: string;
  factionMotto?: string;
  // history: Array<History>; < low priority, would be cool for each house object to return a history 
}

//DELETE house:
export interface IDeleteHouse {
  id: number;
}