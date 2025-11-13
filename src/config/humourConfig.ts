import { Humours } from "types/shared";

export interface HumourConfig {
  key: Humours;
  label: string;
  emoji: string;
  color: string;
  borderColor: string;
}

export const HUMOUR_CONFIG: Record<Humours, HumourConfig> = {
  phlegmatic: {
    key: "phlegmatic",
    label: "Phlegmatic",
    emoji: "🟢",
    color: "green",
    borderColor: "green"
  },
  sanguine: {
    key: "sanguine",
    label: "Sanguine",
    emoji: "🔴",
    color: "crimson",
    borderColor: "crimson"
  },
  choleric: {
    key: "choleric",
    label: "Choleric",
    emoji: "🟡",
    color: "goldenrod",
    borderColor: "yellow"
  },
  melancholic: {
    key: "melancholic",
    label: "Melancholic",
    emoji: "⚫",
    color: "gray",
    borderColor: "linear-gradient(90deg, #ffffff 0%, #000000 100%)"
  }
};

export const HUMOUR_ORDER: Humours[] = ["phlegmatic", "sanguine", "choleric", "melancholic"];
