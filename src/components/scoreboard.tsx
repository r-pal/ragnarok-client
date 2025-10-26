import { Grid } from "@mui/material"
import { scoreboardDummy } from "inputs/scoreboardDummy"

interface Scoreboard {

}

export const Scoreboard: React.FC<Scoreboard> = () => {

const scores = scoreboardDummy.map(score => 
<Grid>
<Grid>
{score.ranking}
</Grid>
{score.houseOrFactionName}
</Grid>)

return (
        <Grid style={{ display: 'flexbox', flexDirection: 'column' }}>
            {scores}
        </Grid>
    )
}