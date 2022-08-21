import PropTypes from "prop-types";

// own components
import SitoContainer from "sito-container";

// @mui icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// @mui components
import {
  Tooltip,
  Accordion as MUIAccordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Typography,
} from "@mui/material";

// contexts
import { useLanguage } from "../../context/LanguageProvider";

const Accordion = (props) => {
  const { jtem, j, onEditNote, onDeleteNote } = props;

  const { languageState } = useLanguage();

  return (
    <MUIAccordion
      elevation={3}
      key={jtem.id}
      sx={{
        width: "100%",
        marginTop: j > 0 ? "20px" : "0",
        padding: "20px",
        animation: jtem.deleted ? "remove 0.5s ease" : "scale 0.5s ease",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{ padding: 0, margin: 0, div: { margin: 0 } }}
      >
        <SitoContainer
          key={j}
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: "100%", margin: 0 }}
        >
          <Typography variant="h5">{jtem.title}</Typography>
          <SitoContainer>
            <Tooltip title={languageState.texts.Tooltips.EditNote}>
              <IconButton
                onClick={(e) => {
                  onEditNote(jtem.id);
                  e.preventDefault();
                }}
                id={`edit-${j}`}
                color="primary"
              >
                <EditIcon id={`svgEdit-${j}`} />
              </IconButton>
            </Tooltip>
            <Tooltip title={languageState.texts.Tooltips.DeleteNote}>
              <IconButton
                onClick={(e) => {
                  onDeleteNote(jtem.id);
                  e.preventDefault();
                }}
                id={`delete-${j}`}
                color="primary"
              >
                <DeleteIcon id={`svgDelete-${j}`} />
              </IconButton>
            </Tooltip>
          </SitoContainer>
        </SitoContainer>
      </AccordionSummary>
      <AccordionDetails>
        <SitoContainer
          flexDirection="column"
          sx={{
            width: "100%",
          }}
        >
          <Typography variant="body1">
            {jtem.content ? jtem.content : languageState.texts.NoContent}
          </Typography>
        </SitoContainer>
      </AccordionDetails>
    </MUIAccordion>
  );
};

Accordion.propTypes = {
  jtem: PropTypes.object.isRequired,
  j: PropTypes.number.isRequired,
  onEditNote: PropTypes.func.isRequired,
  onDeleteNote: PropTypes.func.isRequired,
};

export default Accordion;
