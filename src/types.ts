export interface IHouse {
  id: number;
  name: string;
  motto: string;
  crestUrl?: string;
  strength: Humours;
  weakness: Humours;
  score: IScore;
  points: IPoints;
  factionId?: number
  // ranking: number;
  // history: Array<History>;
}

export type Humours = "choleric" | "phlegmatic" | "melancholic" | "sangine"

export interface IScore {
  choleric: number;
  phlegmatic: number;
  melancholic: number;
  sangine: number;
}

export interface IPoints {
  balance: number;
  total: number;
}

export interface IScoreboardItem {
  name: string;
  houseIds?: Array<number>
  score: IScore;
  points: IPoints;
  ranking: number;
}
