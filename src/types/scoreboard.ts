import { IPoints, IScore } from "./shared";

// GET only. Returns a list of houses and factions. Any houses which are part of a faction aren't included in this list.
export interface IScoreboardItem {
  name: string;
  houseIds?: Array<number>
  score: IScore;
  points: IPoints;
}