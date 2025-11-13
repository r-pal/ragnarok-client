import { Humours } from "types/shared";

export type HumourProperty = "hot" | "cold" | "moist" | "dry";

export interface HumourConfig {
  key: Humours;
  label: string;
  emoji: string;
  color: string;
  borderColor: string;
  properties: HumourProperty[];
}

export const HUMOUR_CONFIG: Record<Humours, HumourConfig> = {
  phlegmatic: {
    key: "phlegmatic",
    label: "Phlegmatic",
    emoji: "🟢",
    color: "green",
    borderColor: "green",
    properties: ["cold", "moist"]
  },
  sanguine: {
    key: "sanguine",
    label: "Sanguine",
    emoji: "🔴",
    color: "crimson",
    borderColor: "crimson",
    properties: ["hot", "moist"]
  },
  choleric: {
    key: "choleric",
    label: "Choleric",
    emoji: "🟡",
    color: "goldenrod",
    borderColor: "yellow",
    properties: ["hot", "dry"]
  },
  melancholic: {
    key: "melancholic",
    label: "Melancholic",
    emoji: "⚫",
    color: "gray",
    borderColor: "linear-gradient(90deg, #ffffff 0%, #000000 100%)",
    properties: ["cold", "dry"]
  }
};

export const HUMOUR_ORDER: Humours[] = ["phlegmatic", "sanguine", "choleric", "melancholic"];
