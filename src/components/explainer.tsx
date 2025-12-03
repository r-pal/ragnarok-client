import React, { useState } from "react";
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
  useMediaQuery,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getExplainerStyles } from "./styles";
import { CrestSearch } from "./shared/CrestSearch";

export const Explainer: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const styles = getExplainerStyles(isMobile);
  const [crestSearchOpen, setCrestSearchOpen] = useState(false);

  return (
    <Box sx={styles.container}>
      <Typography variant={isMobile ? "h4" : "h2"} gutterBottom sx={styles.mainTitle}>
        The Sacred Rules of Ascension
      </Typography>
      <Typography
        variant={isMobile ? "body2" : "body1"}
        sx={styles.subtitle}
      >
        Wherein the mysteries of humour, balance, and sacred affliction are made
        known
      </Typography>

            {/* Summary */}
      <Paper elevation={3} sx={{ p: isMobile ? 2 : 3, mb: isMobile ? 2 : 3 }} id="summary">
        <Typography variant={isMobile ? "h6" : "h4"} color="error" gutterBottom>
          <img src={`${process.env.PUBLIC_URL}/assets/images/alphabet/H.png`} alt="H"/>ere Speakes the Sacred Order
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          gap: 3,
          alignItems: isMobile ? 'center' : 'flex-start'
        }}>
          <Box sx={{ flex: 1 }}>
            <Typography paragraph sx={styles.paragraph}>
              The Festival of Humoural Ascension is a trial of cunning, covenant,
              and balance most holy.
            </Typography>
            <Typography paragraph sx={styles.paragraph}>
              Herein shall be revealed the sacred mysteries:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mt: 1, mb: 2 }}>
              <Typography component="li" sx={{ ...styles.paragraph, mb: 1 }}>
                How to consecrate thy noble house upon the doctrine of Ailment and Remedy
              </Typography>
              <Typography component="li" sx={{ ...styles.paragraph, mb: 1 }}>
                The nature of the four Humours Divine, and the flow of their Blessed Liquids through all Rites
              </Typography>
              <Typography component="li" sx={{ ...styles.paragraph, mb: 1 }}>
                The formation of factions and the power of alliance
              </Typography>
              <Typography component="li" sx={{ ...styles.paragraph, mb: 1 }}>
                The path to glory through power and balance
              </Typography>
            </Box>
            <Typography paragraph sx={styles.paragraph}>
              Master thy blessed fortitudes, shore up thy sacred afflictions through 
              wise alliance, and compete for glory across the four humours divine. Balance must be won ere the final 
              rite, or all is unmade in pus and glory. So come ye, and ascend!
            </Typography>
          </Box>
          <Box sx={{ 
            flexShrink: 0,
            width: isMobile ? '100%' : '300px',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <img 
              src={`${process.env.PUBLIC_URL}/assets/images/four-humours.jpg`} 
              alt="The Four Humours"
              style={{ width: '100%', maxWidth: '300px', height: 'auto' }}
            />
          </Box>
        </Box>
      </Paper>

      {/* Section A: Thy House & the Path to Glory */}
      <Paper elevation={3} sx={{ p: isMobile ? 2 : 3, mb: isMobile ? 2 : 3 }} id="thy-house-and-glory">
        <Typography variant={isMobile ? "h6" : "h4"} gutterBottom color="error">
          <img src={`${process.env.PUBLIC_URL}/assets/images/alphabet/C.png`} alt="C"/>onsecrating thy Noble House
        </Typography>
        <Divider sx={styles.divider} />
        
        <Typography paragraph sx={styles.paragraph}>
          The first thing to do is found or join a noble house. Each house bears a unique relationship to the four sacred humours, marked by divine blessing and holy burden. Through these fortitudes, thy house shall forge its path to ascension.
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
          Examples of Sacred Ailments & Their Remedies:
        </Typography>
        <Box sx={styles.paddedBox}>
          <Typography paragraph sx={styles.paragraph}>
            • <strong>Boils</strong> and their lancing
          </Typography>
          <Typography paragraph sx={styles.paragraph}>
            • <strong>Plague</strong> and quarantine
          </Typography>
          <Typography paragraph sx={styles.paragraph}>
            • <strong>Melancholy</strong> and phlebotomy
          </Typography>
          <Typography paragraph sx={styles.paragraph}>
            • <strong>Fever</strong> and cooling herbs
          </Typography>
        </Box>

        <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom sx={styles.sectionHeadingWithMargin}>
          The Cherished Requirements forto Thine House's Birth 
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
              secondary={
                <span>
                  A heraldic crest that depicts thy Ailment and Remedy in symbolic form—this shall be thy banner in all competitions. 
                  {' '}
                  <Link
                    component="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setCrestSearchOpen(true);
                    }}
                    sx={{
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      color: theme.palette.secondary.main,
                      '&:hover': { color: theme.palette.secondary.dark }
                    }}
                  >
                    Thine banner shall be reclaimed from the scrolls of auld
                  </Link>
                </span>
              }
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
          <ListItem sx={styles.listItem}>
            <ListItemText
              primary="Four Noble Souls"
              secondary="A house must be founded by at least four sworn members—for no house may stand with fewer than this number bestowed unto us by the Humours true and good"
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

        <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom sx={styles.sectionHeadingWithMargin}>
          Seek Ye the Priestly Scribe
        </Typography>
        <Typography paragraph sx={styles.paragraph}>
          On arrival at the manor, if thou hast all thy needs—thy name, motto, coat of arms, divine gift, holy burden, and four noble souls—seek the <strong>priestly scribe</strong> who shall consecrate thine house and inscribe its name upon the sacred scrolls of the Festival.
        </Typography>

        <img src={`${process.env.PUBLIC_URL}/assets/images/snailjoust.jpg`} width="100%" alt="Snail Joust"/>
      </Paper>

      {/* Section B: Humours & Rites */}
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
          How the Blessed Liquids shall flow into thine Reservoir
        </Typography>
        <Grid sx={styles.imageListGrid}>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px" }}>
            <img src={`${process.env.PUBLIC_URL}/assets/images/cupper.jpeg`} style={{ width: "120px", height: "auto" }}/>
          </Box>
        <Typography paragraph sx={styles.paragraph}>
          Let us proclaim the sanctity of the sacred humours through our Rites. Most Great Rites are dedicated to praising one humour only, though some honour all four in 
          equal measure, as seen below. Each Rite brimmeth with 16 fluid ounces of either blood, twice biles or mucus, to be drained into the cup of faithful houses. May ye
           fill unto the brim and evermore!
        </Typography>
        </Grid>

        <TableContainer component={Paper} elevation={1} sx={styles.tableContainer} id="rite-types-table">
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
              <TableRow sx={styles.phlegmaticRow}>
                <TableCell sx={styles.tableCellBold}>Ranarama</TableCell>
                <TableCell>Thu</TableCell>
                <TableCell>Phlegmatic</TableCell>
              </TableRow>
              <TableRow sx={styles.sanguineRow}>
                <TableCell sx={styles.tableCellBold}>Ranarama X</TableCell>
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
              <TableRow sx={styles.sanguineRow}>
                <TableCell sx={styles.gameshowCellLeftBottomBold}>Arranged marriage courtship</TableCell>
                <TableCell sx={styles.gameshowCellBottom}>Fri</TableCell>
                <TableCell sx={styles.gameshowCellRightBottom}>Sanguine</TableCell>
              </TableRow>
              <TableRow sx={styles.melancholicRow}>
                <TableCell sx={styles.tableCellBold}>Onion Dome</TableCell>
                <TableCell>Fri</TableCell>
                <TableCell>Melancholic</TableCell>
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

      {/* Crest Search Modal */}
      <Dialog
        open={crestSearchOpen}
        onClose={() => setCrestSearchOpen(false)}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          pb: 1
        }}>
          Browse Coat of Arms
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => setCrestSearchOpen(false)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent dividers>
          <CrestSearch 
            onSelectCrest={(url) => {
              // Just show the URL in an alert for browsing purposes
              alert(`Selected crest URL:\n\n${url}\n\nCopy this URL when creating your house!`);
              setCrestSearchOpen(false);
            }}
          />
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => setCrestSearchOpen(false)} variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
