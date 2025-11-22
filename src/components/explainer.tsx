import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography
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
      <Typography variant="h2" gutterBottom sx={{ mb: 2, textAlign: "center" }}>
        The Sacred Rules of Ascension
      </Typography>
      <Typography
        variant="body1"
        sx={{
          mb: 4,
          textAlign: "center",
          fontStyle: "italic",
          color: "text.secondary"
        }}
      >
        Wherein the mysteries of humour, balance, and sacred affliction are made
        known
      </Typography>

      {/* Section A: Pints Calculation */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom color="error">
        <img src={`${process.env.PUBLIC_URL}/assets/images/alphabet/O.png`} alt="O"/>ur Sacred Humours & Their Reckoning
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          The Four Humours Divine
        </Typography>
        <Typography paragraph>
          Each noble house accrues liquids of the four sacred humours—blood,
          yellow bile, phlegm, and black bile—each a divine essence governing
          body and fate:
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexWrap: "wrap",
            mb: 2
          }}
        >
          <Box
            sx={{
              // flex: "1 1 200px",
              textAlign: "center",
              p: 2,
              border: "1px solid rgba(0,0,0,0.1)",
              borderRadius: 1,
              bgcolor: "rgba(255,215,0,0.05)"
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              🟡 Choleric
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Yellow Bile
            </Typography>
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              Fire, summer, hot and dry
            </Typography>
          </Box>
          <Box
            sx={{
              // flex: "1 1 200px",
              textAlign: "center",
              p: 2,
              border: "1px solid rgba(0,0,0,0.1)",
              borderRadius: 1,
              bgcolor: "rgba(0,255,0,0.03)"
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              🟢 Phlegmatic
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Mucus
            </Typography>
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              Water, winter, cold and moist
            </Typography>
          </Box>
          <Box
            sx={{
              // flex: "1 1 200px",
              textAlign: "center",
              p: 2,
              border: "1px solid rgba(0,0,0,0.1)",
              borderRadius: 1,
              bgcolor: "rgba(0,0,0,0.03)"
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              ⚫ Melancholic
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Black Bile
            </Typography>
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              Earth, autumn, cold and dry
            </Typography>
          </Box>
          <Box
            sx={{
              // flex: "1 1 200px",
              textAlign: "center",
              p: 2,
              border: "1px solid rgba(0,0,0,0.1)",
              borderRadius: 1,
              bgcolor: "rgba(255,0,0,0.03)"
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              🔴 Sanguine
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Blood
            </Typography>
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              Air, spring, hot and moist
            </Typography>
          </Box>
        </Box>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Blessed Afflictions & Sacred Weaknesses
        </Typography>
        <Typography paragraph>
          Each house is born with one <strong>blessed affliction</strong> (a
          humour of strength) and one <strong>sacred weakness</strong> (a humour
          of frailty):
        </Typography>
        <Box sx={{ pl: 2, mb: 2 }}>
          <Typography paragraph>
            • <strong>Blessed Affliction (×2):</strong> Pints in thy strength
            humour are doubled—a divine gift
          </Typography>
          <Typography paragraph>
            • <strong>Sacred Weakness (÷2):</strong> Pints in thy weakness
            humour are halved—a holy burden
          </Typography>
        </Box>

        <Typography
          variant="body2"
          sx={{
            fontStyle: "italic",
            bgcolor: "rgba(0,0,0,0.05)",
            p: 2,
            borderRadius: 1
          }}
        >
          <strong>Example:</strong> House of Boils has strength in Choleric and
          weakness in Melancholic.
          <br />
          Raw scores: Choleric 600, Phlegmatic 223, Melancholic 534, Sanguine
          234
          <br />
          Modified scores: Choleric 1200 (×2), Phlegmatic 223, Melancholic 267
          (÷2), Sanguine 234
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          The Six Paths to Glory
        </Typography>
        <Typography paragraph>
          Houses and factions vie for supremacy across{" "}
          <strong>six sacred categories</strong>, each a path to ascension:
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="1. Balance ⚖️"
              secondary="The harmony of humours—lower is holier. Sacred imbalance brings glory, but balance brings ascension (most important)"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="2. Total Fliud Weight 🥂"
              secondary="The sum of all four humour scores (second most important)"
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

        <Typography
          variant="body2"
          sx={{
            bgcolor: "rgba(255,215,0,0.1)",
            p: 2,
            borderRadius: 1,
            mt: 2,
            border: "1px solid rgba(255,215,0,0.3)"
          }}
        >
          <strong>⭐ The Path to Ascension:</strong> Though ye may reign supreme
          in any single humour,
          <strong> Total Fluid Weight </strong> and <strong>Balance</strong> are
          the twin pillars of true glory. A house that masters both demonstrates
          power and harmony—the ultimate ascension ere the final rite.
        </Typography>
      </Paper>

      {/* Section B: Factions */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }} id="factions">
        <Typography variant="h4" gutterBottom color="error">
          <img src={`${process.env.PUBLIC_URL}/assets/images/alphabet/B.png`} alt="B"/>inding thine Houses 
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Typography paragraph>
          Noble houses may unite in sacred covenant to form{" "}
          <strong>factions</strong>—alliances bound by oath and affliction,
          combining their blessed strengths to ascend together.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          The Rite of Binding
        </Typography>
        <Typography paragraph>
          To forge a faction, houses must seek audience with{" "}
          <strong>the priest</strong>—keeper of sacred oaths and wielder of the
          binding rite. The priest alone possesses the divine authority to
          conjoin houses, creating a unified faction that shall compete as one
          flesh upon the scoreboard of ascension.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          The Breaking of Oaths
        </Typography>
        <Typography paragraph>
          Any house may sunder its sacred bond at any time{" "}
          <strong>without consent of its brethren</strong>. Yet beware—such
          betrayal carries dire consequence:
        </Typography>
        <Box sx={{ pl: 2, mb: 2 }}>
          <Typography paragraph>
            • <strong>Two-house covenant:</strong> Should one house forsake the
            bond, the faction dissolves utterly and both return to solitary
            struggle
          </Typography>
          <Typography paragraph>
            • <strong>Greater covenant (3+ houses):</strong> Should any house
            break faith, the <strong>entire faction crumbles to dust</strong>{" "}
            and all houses are cast back to individual strife
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            fontStyle: "italic",
            bgcolor: "rgba(255,0,0,0.05)",
            p: 2,
            borderRadius: 1,
            border: "1px solid rgba(255,0,0,0.2)"
          }}
        >
          <strong>⚠️ Heed This Warning:</strong> To break a sacred oath is to
          unmake all that was built. Choose thy allies with wisdom, lest
          betrayal bring ruin to all.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          The Reckoning of Bound Houses
        </Typography>
        <Typography paragraph>
          When houses unite in sacred covenant, their humours mingle thus:
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="1. Afflictions Remain True"
              secondary="Each house's blessed affliction and sacred weakness apply to their own humours first"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="2. Humours Commingle"
              secondary="All blessed and cursed humours from member houses flow together as one"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="3. United in Flesh"
              secondary="The faction ascends as a single body upon the sacred scoreboard"
            />
          </ListItem>
        </List>

        <Typography
          variant="body2"
          sx={{
            fontStyle: "italic",
            bgcolor: "rgba(0,0,0,0.05)",
            p: 2,
            borderRadius: 1,
            mt: 2
          }}
        >
          <strong>Example:</strong> "The Steel Alliance" faction
          <br />
          House of Whispers (strength: Phlegmatic, weakness: Choleric): 100.5,
          978, 156, 278
          <br />
          House of Iron Will (strength: Choleric, weakness: Sanguine): 1356,
          134, 245, 61.5
          <br />
          <strong>Faction Total:</strong> 1456.5, 1112, 401, 339.5
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Strategic Advantages
        </Typography>
        <Typography paragraph>
          • <strong>Complementary Strengths:</strong> Houses with different
          strengths create well-rounded factions
        </Typography>
        <Typography paragraph>
          • <strong>Higher Total Fluid Weight:</strong> Combined weights often
          exceed individual houses
        </Typography>
        <Typography paragraph>
          • <strong>Better Balance:</strong> Diverse strengths can improve
          overall balance (lower σ)
        </Typography>
      </Paper>

      {/* Section C: Special Clemency */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }} id="divine-clemency">
        <Typography variant="h4" gutterBottom color="error">
          <img src={`${process.env.PUBLIC_URL}/assets/images/alphabet/D.png`} alt="D" /> ivine Clemency
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Typography paragraph>
          In rarest circumstance, a house may receive{" "}
          <strong>divine clemency</strong> from the Sacred Order—through{" "}
          <strong>pardons, grants, miracles, or spells</strong>—a supernatural
          intervention that reshapes the very humours of one's being.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          The Nature of Strengths & Weaknesses
        </Typography>
        <Typography paragraph>
          Upon formation, each house is blessed with one <strong>humour strength</strong>{" "}
          and cursed with one <strong>humour weakness</strong>. These divine marks
          shape all competitions:
        </Typography>
        <Box sx={{ pl: 2, mb: 2 }}>
          <Typography paragraph>
            • <strong>Strength (×2):</strong> Points won in thy strong humour are doubled—a divine gift
          </Typography>
          <Typography paragraph>
            • <strong>Weakness (÷2):</strong> Points won in thy weak humour are halved—a holy burden
          </Typography>
        </Box>

        <Typography
          variant="body2"
          sx={{
            fontStyle: "italic",
            bgcolor: "rgba(0,0,0,0.05)",
            p: 2,
            borderRadius: 1,
            mb: 2
          }}
        >
          <strong>Example:</strong> The House of Miasma has weakness in Choleric and strength in Melancholic.
          <br />
          They compete in the Dancing Plague and win 20 fluid ounces of Yellow Bile.
          <br />
          As this is their weakness, only <strong>10 fluid ounces</strong> appear on their scoreboard (20 ÷ 2).
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Pardons, Grants, Miracles & Spells
        </Typography>
        <Typography paragraph>
          Through divine clemency, a house may shift the very essence of its humours.
          Each form of clemency works differently:
        </Typography>
        <Grid sx={{ display: "grid", alignItems: "center", gridTemplateColumns: "1fr 3fr" }}>
          <img src={`${process.env.PUBLIC_URL}/assets/images/yolande.jpg`}/>
        <List>
          <ListItem>
            <ListItemText
              primary="Pardon (Mercy Granted)"
              secondary="Thy weakness is forgiven—shift thy holy burden (÷2) to a different humour of thy choosing"
              />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Grant (Gift Bestowed)"
              secondary="Thy strength is enhanced—shift thy divine gift (×2) to a different humour of thy choosing"
              />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Miracle (Divine Intervention)"
              secondary="The Sacred Order intervenes—shift both thy strength and weakness to new humours of thy choosing"
              />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Spell (Bewitched Transmutation)"
              secondary="A curse is cast upon thee—thy weakness or strength is declared to be a specific humour, not of thy choosing"
              />
          </ListItem>
        </List>
      </Grid>
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          The Power of Retroactive Transformation
        </Typography>
        <Typography paragraph>
          When divine clemency strikes, <strong>all past scores are recalculated</strong>{" "}
          with the new strength and weakness applied. The transformation is absolute
          and immediate.
        </Typography>

        <Typography
          variant="body2"
          sx={{
            fontStyle: "italic",
            bgcolor: "rgba(138,43,226,0.05)",
            p: 2,
            borderRadius: 1,
            mb: 2,
            border: "1px solid rgba(138,43,226,0.2)"
          }}
        >
          <strong>Continuing the Example:</strong> If the House of Miasma receives
          a pardon to shift their weakness from Choleric to Sanguine:
          <br />
          • Their 10 fluid ounces of Yellow Bile from the Dancing Plague instantly become <strong>20 fluid ounces</strong>
          <br />
          • The weakness handicap is removed from Choleric
          <br />
          • Future Sanguine points will now be halved instead
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Sacred Edicts
        </Typography>
        <Box sx={{ pl: 2 }}>
          <Typography paragraph>
            • Thy strength and weakness{" "}
            <strong>cannot dwell in the same humour</strong>—such is forbidden
          </Typography>
          <Typography paragraph>
            • Divine clemency may be <strong>granted as reward</strong> or{" "}
            <strong>forced as curse</strong>—the Sacred Order giveth and taketh away
          </Typography>
          <Typography paragraph>
            • Transformation takes effect at once, <strong>reshaping all past
            and future reckonings</strong> of thy humours
          </Typography>
        </Box>

        <Typography
          variant="body2"
          sx={{
            fontStyle: "italic",
            bgcolor: "rgba(255,215,0,0.1)",
            p: 2,
            borderRadius: 1,
            mt: 2,
            border: "1px solid rgba(255,215,0,0.3)"
          }}
        >
          <strong>⚠️ Beware:</strong> This divine gift wields great power to shift
          the balance of all things. A well-timed clemency can elevate a house
          to glory—or a forced spell can bring ruin. Wield it with wisdom!
        </Typography>
      </Paper>

      {/* Summary */}
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" color="error" gutterBottom>
          <img src={`${process.env.PUBLIC_URL}/assets/images/alphabet/T.png`} alt="T"/>hus Spake the Sacred Order
        </Typography>
        <Typography paragraph>
          The Festival of Humoural Ascension is a trial of cunning, covenant,
          and balance most holy. Master thy blessed afflictions, shore up thy
          sacred weaknesses through wise alliance, and compete for glory across
          the four humours divine. Balance must be won ere the final rite, or
          all is unmade in pus and glory. So come ye, and ascend!
        </Typography>
      </Paper>
    </Box>
  );
};
