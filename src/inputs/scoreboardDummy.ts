import { IScoreboardItem } from "types"

export const scoreboardDummy: Array<IScoreboardItem> = [
    {
        houseOrFactionName: 'House of Boils',
        score: {
            choleric: 600,
            phlegmatic: 223,
            melancholic: 534,
            sangine: 234
        },
        points: {
            balance: 1,
            total: 1200
        },
        ranking: 1
    },
    {
        houseOrFactionName: 'House of Miasma',
        score: {
            choleric: 600,
            phlegmatic: 23,
            melancholic: 94,
            sangine: 234
        },
        points: {
            balance: 6,
            total: 800
        },
        ranking: 2
    }
]