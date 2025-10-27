export interface IHouse {
  id: number;
  name: string;
  motto: string;
  crestUrl?: string;
  strength: Humours;
  weakness: Humours;
  score: IScore;
  points: IPoints;
  ranking: number;
  // history: Array<History>;
}

export enum Humours {
  choleric = "choleric",
  phlegmatic = "phlegmatic",
  melancholic = "melancholic",
  sangine = "sangine"
}

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
  houseOrFactionName: string;
  score: IScore;
  points: IPoints;
  ranking: number;
}
