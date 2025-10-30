//POST new faction:
// this adds factionId, factionName and factionMotto to the relevent houses in GET houses (duplicated in each house of the faction)

export interface IFaction {
  name: string;
  motto: string;
  houseIds: Array<number>;
}

//DELETE faction
// This will remove the above from the relevent houses
export interface IDeleteFaction {
  id: number;
}