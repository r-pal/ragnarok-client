import { IHouse } from "types";

export const housesDummy: Array<IHouse> = [
  {
      id: 1,
      name: "House of Boils",
      motto: "One's pus is another's salve",
      crestUrl: "https://upload.wikimedia.org/wikipedia/commons/9/96/Escut_dels_vescomtes_de_Cabrera.png",
      strength: "choleric",
      weakness: "melancholic",
    score: {
      choleric: 600,
      phlegmatic: 223,
      melancholic: 534,
      sanguine: 234
    },
    points: {
      balance: 1,
      total: 1200
    }
  },
{
    id: 2,
      name: "House of Miasma",
      motto: "From dust arise",
      crestUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Blason_Sceau_Raymond_B%C3%A9ranger_IV_Barcelone.svg/1280px-Blason_Sceau_Raymond_B%C3%A9ranger_IV_Barcelone.svg.png",
      strength: "choleric",
      weakness: "phlegmatic",
    score: {
      choleric: 600,
      phlegmatic: 23,
      melancholic: 94,
      sanguine: 234
    },
    points: {
      balance: 6,
      total: 800
    },
    factionId: 1
},
  {
    id: 3,
      name: "Plague Doctors",
      motto: "memento mori",
      crestUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Coat_of_Arms_of_the_Count_of_Flanders_%28Escutcheon%29_%28according_to_the_Gelre_Armorial%29.svg/1280px-Coat_of_Arms_of_the_Count_of_Flanders_%28Escutcheon%29_%28according_to_the_Gelre_Armorial%29.svg.png",
      strength: "melancholic",
      weakness: "sanguine",
    score: {
      choleric: 86,
      phlegmatic: 23,
      melancholic: 234,
      sanguine: 234
    },
    points: {
      balance: 5,
      total: 800
    },
    factionId: 1
  }
];
