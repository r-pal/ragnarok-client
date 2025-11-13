
import { Humours, IScore } from "./shared";

//POST new house and EDIT house:

export interface IPostHouse {
  name: string;
  motto: string;
  crestUrl?: string;
  strength?: Humours;
  weakness?: Humours;
  password: string;
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
  password: string;
}

//DELETE house:
export interface IDeleteHouse {
  id: number;
}