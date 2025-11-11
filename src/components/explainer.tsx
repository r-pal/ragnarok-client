import {
  Box,
  Typography,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText
} from "@mui/material";

export const Explainer: React.FC = () => {
  return (
    <Box
      sx={{
        maxWidth: 900,
        mx: "auto",
        p: 4,
        overflowY: "auto"
      }}
    >
      <Typography variant="h3" gutterBottom sx={{ mb: 4, textAlign: "center" }}>
        How Ragnarök Works
      </Typography>

      {/* Section A: Points Calculation */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom color="primary">
          A. How Points Are Calculated
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          The Four Humours
        </Typography>
        <Typography paragraph>
          Each house earns points across four humours, representing different aspects of medieval medicine:
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="🟡 Choleric (Yellow Bile)"
              secondary="Fire, summer, hot and dry"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="🟢 Phlegmatic (Phlegm)"
              secondary="Water, winter, cold and moist"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="⚫ Melancholic (Black Bile)"
              secondary="Earth, autumn, cold and dry"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="🔴 Sanguine (Blood)"
              secondary="Air, spring, hot and moist"
            />
          </ListItem>
        </List>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Strength & Weakness Multipliers
        </Typography>
        <Typography paragraph>
          Every house has one <strong>strength</strong> and one <strong>weakness</strong>:
        </Typography>
        <Box sx={{ pl: 2, mb: 2 }}>
          <Typography paragraph>
            • <strong>Strength (×2):</strong> Points in your strength humour are doubled
          </Typography>
          <Typography paragraph>
            • <strong>Weakness (÷2):</strong> Points in your weakness humour are halved
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ fontStyle: "italic", bgcolor: "rgba(0,0,0,0.05)", p: 2, borderRadius: 1 }}>
          <strong>Example:</strong> House of Boils has strength in Choleric and weakness in Melancholic.
          <br />
          Raw scores: Choleric 600, Phlegmatic 223, Melancholic 534, Sanguine 234
          <br />
          Modified scores: Choleric 1200 (×2), Phlegmatic 223, Melancholic 267 (÷2), Sanguine 234
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          The Six Categories of Competition
        </Typography>
        <Typography paragraph>
          Houses and factions compete across <strong>six different categories</strong>:
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="1. Total Points ⭐"
              secondary="The sum of all four humour scores (most important)"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="2. Balance (σ) ⭐"
              secondary="Standard deviation of humours—lower is better (most important)"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="3. Choleric 🟡"
              secondary="Individual humour category"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="4. Phlegmatic 🟢"
              secondary="Individual humour category"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="5. Melancholic ⚫"
              secondary="Individual humour category"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="6. Sanguine 🔴"
              secondary="Individual humour category"
            />
          </ListItem>
        </List>

        <Typography variant="body2" sx={{ bgcolor: "rgba(255,215,0,0.1)", p: 2, borderRadius: 1, mt: 2, border: "1px solid rgba(255,215,0,0.3)" }}>
          <strong>⭐ Most Important:</strong> While you can rank #1 in any individual humour, 
          <strong> Total Points</strong> and <strong>Balance</strong> are the primary measures of success. 
          A house that excels in these two categories demonstrates both power and harmony—the ultimate goal of Ragnarök.
        </Typography>
      </Paper>

      {/* Section B: Factions */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom color="primary">
          B. Forming Factions
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Typography paragraph>
          Houses can unite to form <strong>factions</strong>, combining their strengths to compete more effectively.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          How to Form a Faction
        </Typography>
        <Typography paragraph>
          To form a faction, houses must seek out <strong>the priest</strong> who has the sacred power to conjoin houses. 
          The priest will bind the houses together, creating a unified faction that competes as one entity on the scoreboard.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Leaving a Faction
        </Typography>
        <Typography paragraph>
          Any house may leave a faction at any time <strong>without the consent of other houses</strong>. However, there are consequences:
        </Typography>
        <Box sx={{ pl: 2, mb: 2 }}>
          <Typography paragraph>
            • <strong>Two-house faction:</strong> If one house leaves, the faction dissolves and both houses return to competing individually
          </Typography>
          <Typography paragraph>
            • <strong>Multi-house faction (3+ houses):</strong> If any house leaves, the <strong>entire faction falls apart</strong> and all houses return to competing individually
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ fontStyle: "italic", bgcolor: "rgba(255,0,0,0.05)", p: 2, borderRadius: 1, border: "1px solid rgba(255,0,0,0.2)" }}>
          <strong>⚠️ Warning:</strong> Leaving a faction is a serious decision that affects all member houses. 
          Choose your allies wisely and maintain strong bonds to prevent dissolution.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          How Faction Scores Work
        </Typography>
        <Typography paragraph>
          When houses form a faction:
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="1. Individual Multipliers Apply First"
              secondary="Each house's strength and weakness multipliers are applied to their own scores"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="2. Scores Are Aggregated"
              secondary="All modified scores from member houses are summed together"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="3. Faction Competes as One"
              secondary="The faction appears on the scoreboard with combined totals"
            />
          </ListItem>
        </List>

        <Typography variant="body2" sx={{ fontStyle: "italic", bgcolor: "rgba(0,0,0,0.05)", p: 2, borderRadius: 1, mt: 2 }}>
          <strong>Example:</strong> "The Steel Alliance" faction
          <br />
          House of Whispers (strength: Phlegmatic, weakness: Choleric): 100.5, 978, 156, 278
          <br />
          House of Iron Will (strength: Choleric, weakness: Sanguine): 1356, 134, 245, 61.5
          <br />
          <strong>Faction Total:</strong> 1456.5, 1112, 401, 339.5
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Strategic Advantages
        </Typography>
        <Typography paragraph>
          • <strong>Complementary Strengths:</strong> Houses with different strengths create well-rounded factions
        </Typography>
        <Typography paragraph>
          • <strong>Higher Total Points:</strong> Combined scores often exceed individual houses
        </Typography>
        <Typography paragraph>
          • <strong>Better Balance:</strong> Diverse strengths can improve overall balance (lower σ)
        </Typography>
      </Paper>

      {/* Section C: Special Clemency */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom color="primary">
          C. Special Clemency
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Typography paragraph>
          Under rare circumstances, a house may be granted <strong>special clemency</strong> by the game masters.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          What Can Be Changed
        </Typography>
        <Typography paragraph>
          With special clemency, a house may alter their fundamental nature:
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Change Your Strength"
              secondary="Shift your ×2 multiplier to a different humour"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Change Your Weakness"
              secondary="Move your ÷2 penalty to a different humour"
            />
          </ListItem>
        </List>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Important Rules
        </Typography>
        <Box sx={{ pl: 2 }}>
          <Typography paragraph>
            • Your strength and weakness <strong>cannot be the same humour</strong>
          </Typography>
          <Typography paragraph>
            • Special clemency is <strong>rarely granted</strong> and must be earned through exceptional circumstances
          </Typography>
          <Typography paragraph>
            • Changes take effect immediately and apply to all future score calculations
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ fontStyle: "italic", bgcolor: "rgba(255,215,0,0.1)", p: 2, borderRadius: 1, mt: 2, border: "1px solid rgba(255,215,0,0.3)" }}>
          <strong>Note:</strong> This is a powerful ability that can dramatically shift the balance of power. Use it wisely!
        </Typography>
      </Paper>

      {/* Summary */}
      <Paper elevation={3} sx={{ p: 3, bgcolor: "rgba(0,0,0,0.02)" }}>
        <Typography variant="h6" gutterBottom>
          Summary
        </Typography>
        <Typography paragraph>
          Ragnarök is a game of strategy, alliances, and balance. Master your house's strengths, 
          shore up your weaknesses through clever faction formation, and compete for supremacy 
          across the four humours. May the most balanced house prevail!
        </Typography>
      </Paper>
    </Box>
  );
};
