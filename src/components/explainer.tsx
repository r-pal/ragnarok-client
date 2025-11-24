import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { getExplainerStyles } from "./styles";

export const Explainer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const styles = getExplainerStyles(isMobile);

  return (
    <Box sx={styles.container}>
      <Typography variant={isMobile ? "h4" : "h2"} gutterBottom sx={styles.mainTitle}>
        The Sacred Rules of Ascension
      </Typography>
      <Typography
        variant={isMobile ? "body2" : "body1"}
        sx={styles.subtitle}
      >
        Wherein the mysteries of humour, balance, and sacred fortitude are made
        known
      </Typography>

      {/* Section A: Pints Calculation */}
      <Paper elevation={3} sx={styles.paper}>
        <Typography variant={isMobile ? "h6" : "h4"} gutterBottom color="error">
        <img src={`${process.env.PUBLIC_URL}/assets/images/alphabet/H.png`} alt="H"/>umours most Sacred & their Rites
        </Typography>
        <Divider sx={styles.divider} />

        <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom sx={styles.sectionHeading}>
          The Four Humours Divine
        </Typography>
        <Typography paragraph sx={styles.paragraph}>
          From the Holy Rites herein, each noble house accrues Blessed Liquids of the four Sacred Humours—blood,
          yellow bile, phlegm, and black bile—each a divine essence governing
          body and fate:
        </Typography>
        <Box sx={styles.humoursContainer}>
          <Box sx={styles.cholericCardComplete}>
            <Typography variant={isMobile ? "body2" : "subtitle1"} fontWeight="bold">
              🟡 Choleric
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={styles.humourCaption}>
              Yellow Bile
            </Typography>
            <Typography variant="caption" display="block" sx={styles.humourCaptionBlock}>
              Fire, summer, hot and dry
            </Typography>
          </Box>
          <Box sx={styles.phlegmaticCardComplete}>
            <Typography variant={isMobile ? "body2" : "subtitle1"} fontWeight="bold">
              🟢 Phlegmatic
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={styles.humourCaption}>
              Mucus and Phlegm
            </Typography>
            <Typography variant="caption" display="block" sx={styles.humourCaptionBlock}>
              Water, winter, cold and moist
            </Typography>
          </Box>
          <Box sx={styles.melancholicCardComplete}>
            <Typography variant={isMobile ? "body2" : "subtitle1"} fontWeight="bold">
              ⚫ Melancholic
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={styles.humourCaption}>
              Black Bile
            </Typography>
            <Typography variant="caption" display="block" sx={styles.humourCaptionBlock}>
              Earth, autumn, cold and dry
            </Typography>
          </Box>
          <Box sx={styles.sanguineCardComplete}>
            <Typography variant={isMobile ? "body2" : "subtitle1"} fontWeight="bold">
              🔴 Sanguine
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={styles.humourCaption}>
              Blood
            </Typography>
            <Typography variant="caption" display="block" sx={styles.humourCaptionBlock}>
              Air, spring, hot and moist
            </Typography>
          </Box>
        </Box>

        <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom sx={styles.sectionHeadingWithMargin}>
          How the Blessed Liquids shall flow
        </Typography>
        <Typography paragraph sx={styles.paragraph}>
          Let us proclaim the sanctity of the sacred humours through our Rites. Most Great Rites are dedicated to praising one humour only, though some honour all four in 
          equal measure. Each hath one hundred humour-pints to be drained into the cup of victorious houses.
        </Typography>

        <TableContainer component={Paper} elevation={1} sx={styles.tableContainer}>
          <Table size={isMobile ? "small" : "medium"}>
            <TableHead>
              <TableRow sx={styles.tableHeaderRow}>
                <TableCell sx={styles.tableHeaderCell}>
                  Great Rite
                </TableCell>
                <TableCell sx={styles.tableHeaderCell}>
                  Holy Day
                </TableCell>
                <TableCell sx={styles.tableHeaderCell}>
                  Praising the Humour
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={styles.tableBody}>
              <TableRow sx={styles.melancholicRow}>
                <TableCell sx={styles.tableCellBold}>Coin Quest</TableCell>
                <TableCell>Thu</TableCell>
                <TableCell>Melancholic</TableCell>
              </TableRow>
              <TableRow sx={styles.sanguineRow}>
                <TableCell sx={styles.tableCellBold}>Jelly Baby Game</TableCell>
                <TableCell >Thu</TableCell>
                <TableCell >Sanguine</TableCell>
              </TableRow>
              <TableRow sx={styles.cholericRow}>
                <TableCell sx={styles.tableCellBold}>Dancing Plague</TableCell>
                <TableCell>Thu</TableCell>
                <TableCell>Choleric</TableCell>
              </TableRow>
              <TableRow sx={styles.phlegmaticRow}>
                <TableCell sx={styles.tableCellBold}>Measure Me This</TableCell>
                <TableCell>Thu</TableCell>
                <TableCell>Phlegmatic</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={styles.tableCellBold}>Antiques Roadshow</TableCell>
                <TableCell>Fri</TableCell>
                <TableCell>per antique</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={styles.tableCellBold}>Beauty Pageant</TableCell>
                <TableCell>Fri</TableCell>
                <TableCell>per beauty</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3} sx={styles.gameshowHeaderCellWithBorders}>
                  🎭 Fungasm Gameshow 🎭
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={styles.gameshowCellLeftBold}>Phrasewave</TableCell>
                <TableCell>Fri</TableCell>
                <TableCell sx={styles.gameshowCellRight}>per phrase</TableCell>
              </TableRow>
              <TableRow sx={styles.cholericRow}>
                <TableCell sx={styles.gameshowCellLeftBold}>Cuntdown</TableCell>
                <TableCell>Fri</TableCell>
                <TableCell sx={styles.gameshowCellRight}>Choleric</TableCell>
              </TableRow>
              <TableRow sx={styles.phlegmaticRow}>
                <TableCell sx={styles.gameshowCellLeftBold}>Re-nay-or-yay-ssance</TableCell>
                <TableCell>Fri</TableCell>
                <TableCell sx={styles.gameshowCellRight}>Phlegmatic</TableCell>
              </TableRow>
              <TableRow sx={styles.sanguineRow}>
                <TableCell sx={styles.gameshowCellLeftBottomBold}>Arranged marriage courtship</TableCell>
                <TableCell sx={styles.gameshowCellBottom}>Fri</TableCell>
                <TableCell sx={styles.gameshowCellRightBottom}>Sanguine</TableCell>
              </TableRow>
              <TableRow >
                <TableCell sx={styles.tableCellBold}>Onion Dome</TableCell>
                <TableCell>Fri</TableCell>
                <TableCell>on request of the house</TableCell>
              </TableRow>
              <TableRow sx={styles.melancholicRow}>
                <TableCell sx={styles.tableCellBold}>Plague</TableCell>
                <TableCell>Sat</TableCell>
                <TableCell>Melancholic</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom sx={styles.sectionHeadingWithMargin}>
          Lesser Rites
        </Typography>
        <Typography paragraph sx={styles.paragraph}>
        Lesser Rites will also be conducted by the Challenge Masters, who will take acharge of smaller vials of Blessed Liquids.
          </Typography>
      </Paper>

      {/* Section B: Thy House & the Path to Glory */}
      <Paper elevation={3} sx={{ p: isMobile ? 2 : 3, mb: isMobile ? 2 : 3 }} id="thy-house-and-glory">
        <Typography variant={isMobile ? "h6" : "h4"} gutterBottom color="error">
          <img src={`${process.env.PUBLIC_URL}/assets/images/alphabet/C.png`} alt="C"/>onsecrating thy House
        </Typography>
        <Divider sx={styles.divider} />
        
        <Typography paragraph sx={styles.paragraph}>
          Each house bears a unique relationship to the four sacred humours, marked by divine blessing and holy burden. Through these fortitudes, thy house shall forge its path to ascension.
        </Typography>

        <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom sx={styles.sectionHeadingWithMargin}>
          The Doctrine of Ailment & Remedy
        </Typography>
        <Typography
          variant="body2"
          sx={styles.exampleBox}
        >
          <strong>⚕️ The Sacred Foundation:</strong> Each house must celebrate a specific <strong>Ailment</strong> and its corresponding <strong>Remedy</strong>. 
          Thy house name, crest, and motto should reflect this sacred duality—the affliction that plagues humanity and the cure that brings salvation. 
          This is the cornerstone of thy house's identity and purpose.
        </Typography>
        <Typography paragraph sx={styles.paragraph}>
          <strong>Examples of Sacred Ailments & Their Remedies:</strong>
        </Typography>
        <Box sx={styles.paddedBox}>
          <Typography paragraph sx={styles.paragraph}>
            • <strong>Boils</strong> and their lancing
          </Typography>
          <Typography paragraph sx={styles.paragraph}>
            • <strong>Plague</strong> and quarantine
          </Typography>
          <Typography paragraph sx={styles.paragraph}>
            • <strong>Melancholy</strong> and bloodletting
          </Typography>
          <Typography paragraph sx={styles.paragraph}>
            • <strong>Fever</strong> and cooling herbs
          </Typography>
          <Typography paragraph sx={styles.paragraph}>
            • <strong>Madness</strong> and trepanation
          </Typography>
        </Box>

        <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom sx={styles.sectionHeadingWithMargin}>
          The Cherished Requirements of House Formation
        </Typography>
        <Typography paragraph sx={styles.paragraph}>
          To consecrate a new house and inscribe its name upon the sacred scrolls, thou must provide these holy elements:
        </Typography>
        <List sx={styles.list}>
          <ListItem sx={styles.listItem}>
            <ListItemText
              primary="Thy Name True and Proud"
              secondary="A noble title that proclaims thy sacred Ailment and its divine Remedy (e.g., 'House of Boils', 'House of the Bloody Flux')"
              primaryTypographyProps={styles.listItemPrimaryProps}
              secondaryTypographyProps={styles.listItemSecondaryProps}
            />
          </ListItem>
          <ListItem sx={styles.listItem}>
            <ListItemText
              primary="Thy Motto Profound"
              secondary="A sacred oath or proclamation that speaks to thy house's purpose and affliction"
              primaryTypographyProps={styles.listItemPrimaryProps}
              secondaryTypographyProps={styles.listItemSecondaryProps}
            />
          </ListItem>
          <ListItem sx={styles.listItem}>
            <ListItemText
              primary="Thy Coat of Arms"
              secondary="A heraldic crest that depicts thy Ailment and Remedy in symbolic form—this shall be thy banner in all competitions"
              primaryTypographyProps={styles.listItemPrimaryProps}
              secondaryTypographyProps={styles.listItemSecondaryProps}
            />
          </ListItem>
          <ListItem sx={styles.listItem}>
            <ListItemText
              primary="Divine Gift"
              secondary="Choose one humour wherein thy house shall excel (×2 multiplier)"
              primaryTypographyProps={styles.listItemPrimaryProps}
              secondaryTypographyProps={styles.listItemSecondaryProps}
            />
          </ListItem>
          <ListItem sx={styles.listItem}>
            <ListItemText
              primary="Holy Burden"
              secondary="Choose one humour wherein thy house shall suffer (÷2 multiplier)"
              primaryTypographyProps={styles.listItemPrimaryProps}
              secondaryTypographyProps={styles.listItemSecondaryProps}
            />
          </ListItem>
        </List>

        <Typography
          variant="body2"
          sx={styles.exampleBox}
        >
          <strong>Holy Example:</strong> House of Boils has divine gift in Choleric and
          holy burden in Melancholic.
          <br />
          Raw fluid weights: Choleric 600, Phlegmatic 223, Melancholic 534, Sanguine
          234
          <br />
          Modified fluid weights: Choleric 1200 (×2), Phlegmatic 223, Melancholic 267
          (÷2), Sanguine 234
        </Typography>

        <img src={`${process.env.PUBLIC_URL}/assets/images/snailjoust.jpg`} width="100%" alt="Snail Joust"/>

                <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom sx={styles.sectionHeadingWithMargin}>
          Filling unto thine cup
        </Typography>
        <Grid sx={styles.imageListGrid}>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img src={`${process.env.PUBLIC_URL}/assets/images/cupper.jpeg`} style={{ width: "140px", height: "auto" }}/>
          </Box>
          <Typography paragraph sx={styles.paragraph}>
            Each rite partaken swelleth thy house's reservoir of blessed liquids—the very measure by which thy standing in the Festival is judged.
            The amount to which the cup is swelled, and thy house's power and glory, depends on the courage, wit and wonder of thy house's members. 
          </Typography>
        </Grid>
      </Paper>

      {/* Section C: Factions */}
      <Paper elevation={3} sx={{ p: isMobile ? 2 : 3, mb: isMobile ? 2 : 3 }} id="factions">
        <Typography variant={isMobile ? "h6" : "h4"} gutterBottom color="error">
          <img src={`${process.env.PUBLIC_URL}/assets/images/alphabet/B.png`} alt="B"/>inding thine Houses 
        </Typography>
        <Divider sx={styles.divider} />

        <Typography paragraph sx={styles.paragraph}>
          Noble houses may unite in sacred covenant to form{" "}
          <strong>factions</strong>—alliances bound by oath and fortitude,
          combining their divine gifts to ascend together.
        </Typography>

        <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom sx={styles.sectionHeading}>
          The Rite of Binding
        </Typography>
        <Typography paragraph sx={styles.paragraph}>
          To forge a faction, houses must seek audience with{" "}
          <strong>the priest</strong>—keeper of sacred oaths and wielder of the
          binding rite. The priest alone possesses the divine authority to
          conjoin houses, creating a unified faction that shall compete as one
          flesh upon the scoreboard of ascension.
        </Typography>

                <img src={`${process.env.PUBLIC_URL}/assets/images/dancers.jpg`} width="100%"/>




        <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom sx={styles.sectionHeadingWithMargin}>
          The Reckoning of Bound Houses
        </Typography>
        <Typography paragraph sx={styles.paragraph}>
          When houses unite in sacred covenant, their humours mingle thus:
        </Typography>
        <List sx={styles.list}>
          <ListItem sx={styles.listItem}>
            <ListItemText
              primary="1. Fortitudes and Afflictions Remain True"
              secondary="Each house's blessed fortitude and sacred affliction apply to their own humours first"
              primaryTypographyProps={styles.listItemPrimaryProps}
              secondaryTypographyProps={styles.listItemSecondaryProps}
            />
          </ListItem>
          <ListItem sx={styles.listItem}>
            <ListItemText
              primary="2. Humours Commingle"
              secondary="All blessed and cursed humours from member houses flow together as one"
              primaryTypographyProps={styles.listItemPrimaryProps}
              secondaryTypographyProps={styles.listItemSecondaryProps}
            />
          </ListItem>
          <ListItem sx={styles.listItem}>
            <ListItemText
              primary="3. United in Flesh"
              secondary="The faction ascends as a single body upon the sacred scoreboard"
              primaryTypographyProps={styles.listItemPrimaryProps}
              secondaryTypographyProps={styles.listItemSecondaryProps}
            />
          </ListItem>
        </List>

        <Typography
          variant="body2"
          sx={styles.exampleBoxWithMargin}
        >
          <strong>Venerable Example:</strong> "The Steel Alliance" faction
          <br />
          House of Whispers (divine gift: Phlegmatic, holy burden: Choleric): 100.5,
          978, 156, 278
          <br />
          House of Iron Will (divine gift: Choleric, holy burden: Sanguine): 1356,
          134, 245, 61.5
          <br />
          <strong>Faction Total:</strong> 1456.5, 1112, 401, 339.5
        </Typography>

        <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom sx={styles.sectionHeadingWithMargin}>
          Strategic Advantages
        </Typography>
        <Typography paragraph sx={styles.paragraph}>
          • <strong>Complementary Gifts:</strong> Houses with different
          divine gifts create well-rounded factions
        </Typography>
        <Typography paragraph sx={styles.paragraph}>
          • <strong>Higher Total Fluid Weight:</strong> Combined weights often
          exceed individual houses
        </Typography>
        <Typography paragraph sx={styles.paragraph}>
          • <strong>Better Balance:</strong> Diverse divine gifts can improve
          overall balance (lower σ)
        </Typography>
                <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom sx={styles.sectionHeading}>
          Schisms
        </Typography>
        <Typography paragraph sx={styles.paragraph}>
          The Oath undertaken by all houses is not to be cast aspersions upon or 
          betrayed by any house. Should any house break faith, the priestly body shall 
          take action to sunder the consecrated bond everlast. All houses thereupon shall
        be cast back to individual strife.
        </Typography>
        <Typography
          variant="body2"
          sx={styles.warningBox}
        >
          <strong>⚠️ Heed This Warning:</strong> To break a sacred oath is to
          unmake all that was built. Choose thy allies with wisdom, lest
          betrayal bring ruin to all.
        </Typography>
      </Paper>

      {/* Section D: The Hallowed Paths to Glory */}
      <Paper elevation={3} sx={{ p: isMobile ? 2 : 3, mb: isMobile ? 2 : 3 }} id="paths-to-glory">
        <Typography variant={isMobile ? "h6" : "h4"} gutterBottom color="error">
          <img src={`${process.env.PUBLIC_URL}/assets/images/alphabet/A.png`} alt="A"/>scension & the Hallowed Paths to Glory
        </Typography>
        <Divider sx={styles.divider} />

        <Typography paragraph sx={styles.paragraph}>
          Houses and factions vie for supremacy across multiple sacred paths to ascension. Yet know this: <strong>true glory cannot be claimed by one path alone</strong>.
        </Typography>

        <Typography variant={isMobile ? "body1" : "h6"} gutterBottom sx={styles.pathsHeadingBold}>
          The Most Sublime Twin Path
        </Typography>
        <Typography paragraph sx={styles.paragraphItalicWithMargin}>
          These twin pillars must be mastered together—thou cannot have one without the other:
        </Typography>
        <List sx={styles.twinPathsListSpecial}>
          <ListItem sx={styles.listItem}>
            <ListItemText
              primary="1. Balance ⚖️"
              secondary="The harmony of humours—lower is holier. Balance must be won ere the final rite, or all is unmade"
              primaryTypographyProps={styles.listItemPrimaryProps}
              secondaryTypographyProps={styles.listItemSecondaryProps}
            />
          </ListItem>
          <ListItem sx={styles.listItem}>
            <ListItemText
              primary="2. Total Fluid Weight 🥂"
              secondary="The sum of all four humour fluid weights—the measure of thy house's accumulated power"
              primaryTypographyProps={styles.listItemPrimaryProps}
              secondaryTypographyProps={styles.listItemSecondaryProps}
            />
          </ListItem>
        </List>

        <Typography variant={isMobile ? "body1" : "h6"} gutterBottom sx={styles.sectionHeadingBoldLarge}>
          The Notable Paths
        </Typography>
        <Typography paragraph sx={styles.paragraphWithMargin}>
          These paths bring honour and recognition, yet they pale before the twin pillars of true ascension:
        </Typography>
        
        <Typography variant={isMobile ? "body2" : "body1"} gutterBottom sx={styles.pathsHeadingBold}>
          Venerable Path of the Single Humour
        </Typography>
        <List sx={styles.list}>
          <ListItem sx={styles.listItem}>
            <ListItemText
              primary="Choleric"
              secondary="Supremacy in fire and wrath"
              primaryTypographyProps={styles.listItemPrimaryProps}
              secondaryTypographyProps={styles.listItemSecondaryProps}
            />
          </ListItem>
          <ListItem sx={styles.listItem}>
            <ListItemText
              primary="Phlegmatic"
              secondary="Supremacy in water and calm"
              primaryTypographyProps={styles.listItemPrimaryProps}
              secondaryTypographyProps={styles.listItemSecondaryProps}
            />
          </ListItem>
          <ListItem sx={styles.listItem}>
            <ListItemText
              primary="Melancholic"
              secondary="Supremacy in earth and melancholy"
              primaryTypographyProps={styles.listItemPrimaryProps}
              secondaryTypographyProps={styles.listItemSecondaryProps}
            />
          </ListItem>
          <ListItem sx={styles.listItem}>
            <ListItemText
              primary="Sanguine"
              secondary="Supremacy in air and vitality"
              primaryTypographyProps={styles.listItemPrimaryProps}
              secondaryTypographyProps={styles.listItemSecondaryProps}
            />
          </ListItem>
        </List>

        <Typography variant={isMobile ? "body2" : "body1"} gutterBottom sx={styles.pathsHeadingBold}>
          Path of the Revered Quality
        </Typography>
        <List sx={styles.list}>
          <ListItem sx={styles.listItem}>
            <ListItemText
              primary="Hot (Choleric + Sanguine)"
              secondary="The combined essence of fire and air"
              primaryTypographyProps={styles.listItemPrimaryProps}
              secondaryTypographyProps={styles.listItemSecondaryProps}
            />
          </ListItem>
          <ListItem sx={styles.listItem}>
            <ListItemText
              primary="Cold (Phlegmatic + Melancholic)"
              secondary="The combined essence of water and earth"
              primaryTypographyProps={styles.listItemPrimaryProps}
              secondaryTypographyProps={styles.listItemSecondaryProps}
            />
          </ListItem>
          <ListItem sx={styles.listItem}>
            <ListItemText
              primary="Moist (Phlegmatic + Sanguine)"
              secondary="The combined essence of water and air"
              primaryTypographyProps={styles.listItemPrimaryProps}
              secondaryTypographyProps={styles.listItemSecondaryProps}
            />
          </ListItem>
          <ListItem sx={styles.listItem}>
            <ListItemText
              primary="Dry (Choleric + Melancholic)"
              secondary="The combined essence of fire and earth"
              primaryTypographyProps={styles.listItemPrimaryProps}
              secondaryTypographyProps={styles.listItemSecondaryProps}
            />
          </ListItem>
        </List>

        <Typography
          variant="body2"
          sx={styles.ascensionBoxAlt}
        >
          <strong>⭐ The Path to True Ascension:</strong> A house may reign supreme
          in a single humour or quality, earning honor and recognition. Yet <strong>Balance</strong> and <strong>Total Fluid Weight</strong> are
          the twin pillars that must be mastered together. Only a house that demonstrates both power and harmony shall achieve the ultimate ascension ere the final rite.
        </Typography>
      </Paper>

      {/* Section E: Divine Clemency */}
      <Paper elevation={3} sx={{ p: isMobile ? 2 : 3, mb: isMobile ? 2 : 3 }} id="divine-clemency">
        <Typography variant={isMobile ? "h6" : "h4"} gutterBottom color="error">
          <img src={`${process.env.PUBLIC_URL}/assets/images/alphabet/D.png`} alt="D" /> ivine Clemency
        </Typography>
        <Divider sx={styles.divider} />

        <Typography paragraph sx={styles.paragraph}>
          In rarest circumstance, a house may receive{" "}
          <strong>divine clemency</strong> from the Sacred Order—through{" "}
          <strong>pardons, grants, miracles, or spells</strong>—a supernatural
          intervention that reshapes the very humours of one's being.
        </Typography>

        <Typography
          variant="body2"
          sx={styles.clemencyExampleBox}
        >
          <strong>Revered Example:</strong> The House of Miasma has holy burden in Choleric and divine gift in Melancholic.
          <br />
          They compete in the Dancing Plague and win 20 fluid ounces of Yellow Bile.
          <br />
          As this is their holy burden, only <strong>10 fluid ounces</strong> appear on their scoreboard (20 ÷ 2).
        </Typography>

        <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom sx={styles.sectionHeadingWithMargin}>
          Pardons, Grants, Miracles & Spells
        </Typography>
        <Typography paragraph sx={styles.paragraph}>
          Through divine clemency, a house may shift the very essence of its humours.
          Each form of clemency works differently:
        </Typography>
        <Grid sx={styles.imageListGrid}>
          <img src={`${process.env.PUBLIC_URL}/assets/images/yolande.jpg`} style={{ width: "100%", height: "auto" }}/>
        <List sx={styles.list}>
          <ListItem sx={styles.listItem}>
            <ListItemText
              primary="Pardon (Mercy Granted)"
              secondary="Thy weakness is forgiven—shift thy holy burden (÷2) to a different humour of thy choosing"
              primaryTypographyProps={styles.listItemPrimaryProps}
              secondaryTypographyProps={styles.listItemSecondaryProps}
              />
          </ListItem>
          <ListItem sx={styles.listItem}>
            <ListItemText
              primary="Grant (Gift Bestowed)"
              secondary="Thy strength is enhanced—shift thy divine gift (×2) to a different humour of thy choosing"
              primaryTypographyProps={styles.listItemPrimaryProps}
              secondaryTypographyProps={styles.listItemSecondaryProps}
              />
          </ListItem>
          <ListItem sx={styles.listItem}>
            <ListItemText
              primary="Miracle (Divine Intervention)"
              secondary="The Sacred Order intervenes—shift both thy divine gift and holy burden to new humours of thy choosing"
              primaryTypographyProps={styles.listItemPrimaryProps}
              secondaryTypographyProps={styles.listItemSecondaryProps}
              />
          </ListItem>
          <ListItem sx={styles.listItem}>
            <ListItemText
              primary="Spell (Bewitched Transmutation)"
              secondary="A curse is cast upon thee—thy holy burden or divine gift is declared to be a specific humour, not of thy choosing"
              primaryTypographyProps={styles.listItemPrimaryProps}
              secondaryTypographyProps={styles.listItemSecondaryProps}
              />
          </ListItem>
        </List>
      </Grid>
        <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom sx={styles.sectionHeadingWithMargin}>
          Divine Clemency & Sacred Transformation
        </Typography>
        <Typography paragraph sx={styles.paragraph}>
          When divine clemency strikes, <strong>all past fluid weights are recalculated</strong>{" "}
          with the new divine gift and holy burden applied. The transformation is absolute
          and immediate.
        </Typography>

        <Typography
          variant="body2"
          sx={styles.miracleBox}
        >
          <strong>Revered Example Persevered:</strong> If the House of Miasma receives
          a pardon to shift their holy burden from Choleric to Sanguine:
          <br />
          • Their 10 fluid ounces of Yellow Bile from the Dancing Plague instantly become <strong>20 fluid ounces</strong>
          <br />
          • The holy burden handicap is removed from Choleric
          <br />
          • Future Sanguine fluid weights will now be halved instead
        </Typography>

        <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom sx={styles.sectionHeadingWithMargin}>
          Sacred Edicts
        </Typography>
        <Box sx={{ pl: isMobile ? 1 : 2 }}>
          <Typography paragraph sx={styles.paragraph}>
            • Thy divine gift and holy burden{" "}
            <strong>cannot dwell in the same humour</strong>—such is forbidden
          </Typography>
          <Typography paragraph sx={styles.paragraph}>
            • Divine clemency may be <strong>granted as reward</strong> or{" "}
            <strong>forced as curse</strong>—the Sacred Order giveth and taketh away
          </Typography>
          <Typography paragraph sx={styles.paragraph}>
            • Transformation takes effect at once, <strong>reshaping all past
            and future reckonings</strong> of thy humours
          </Typography>
        </Box>

        <Typography
          variant="body2"
          sx={styles.finalWarningBox}
        >
          <strong>⚠️ Beware:</strong> This divine gift wields great power to shift
          the balance of all things. A well-timed clemency can elevate a house
          to glory—or a forced spell can bring ruin. Wield it with wisdom!
        </Typography>
      </Paper>

      {/* Summary */}
      <Paper elevation={3} sx={{ p: isMobile ? 2 : 3 }}>
        <Typography variant={isMobile ? "h6" : "h4"} color="error" gutterBottom>
          <img src={`${process.env.PUBLIC_URL}/assets/images/alphabet/T.png`} alt="T"/>hus Spake the Sacred Order
        </Typography>
        <Typography paragraph sx={styles.paragraph}>
          The Festival of Humoural Ascension is a trial of cunning, covenant,
          and balance most holy. Master thy blessed fortitudes, shore up thy
          sacred afflictions through wise alliance, and compete for glory across
          the four humours divine. Balance must be won ere the final rite, or
          all is unmade in pus and glory. So come ye, and ascend!
        </Typography>
      </Paper>
    </Box>
  );
};
