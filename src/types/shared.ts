export type Humours = "choleric" | "phlegmatic" | "melancholic" | "sanguine"

export interface IScore {
  choleric: number;
  phlegmatic: number;
  melancholic: number;
  sanguine: number;
}

export interface IPoints {
  balance: number;
  total: number;
}