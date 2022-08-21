import PropTypes from "prop-types";

// @emotion
import { css } from "@emotion/css";

// framer-motion
import { motion } from "framer-motion";

// contexts
import { useLanguage } from "../../context/LanguageProvider";

// sito components
import SitoContainer from "sito-container";

// @mui icons
import InfoIcon from "@mui/icons-material/Info";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IosShareIcon from "@mui/icons-material/IosShare";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";

// @mui components
import { Button, Tooltip } from "@mui/material";

const FabButtons = (props) => {
  const { onAdd, onDelete, onShare, onSettings, onAbout } = props;
  const { languageState } = useLanguage();

  const radialButton = {
    minWidth: 0,
    minHeight: 0,
    width: 0,
    height: 0,
    padding: "20px",
    borderRadius: "100%",
    marginTop: "10px",
  };

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const ulItem = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={css({
        position: "fixed",
        bottom: "10px",
        right: "10px",
        display: "flex",
        flexDirection: "column",
      })}
    >
      <motion.div variants={ulItem} viewport={{ once: true }}>
        <Tooltip
          title={languageState.texts.Tooltips.AddNoteBox}
          placement="left"
        >
          <Button
            onClick={onAdd}
            variant="contained"
            color="primary"
            sx={radialButton}
          >
            <AddBoxIcon />
          </Button>
        </Tooltip>
      </motion.div>
      <motion.div variants={ulItem} viewport={{ once: true }}>
        <Tooltip
          title={languageState.texts.Tooltips.DeleteNoteBox}
          placement="left"
        >
          <Button
            onClick={onDelete}
            variant="contained"
            color="error"
            sx={radialButton}
          >
            <DeleteIcon />
          </Button>
        </Tooltip>
      </motion.div>
      <motion.div variants={ulItem} viewport={{ once: true }}>
        <Tooltip
          title={languageState.texts.Tooltips.ShareNoteBox}
          placement="left"
        >
          <Button
            onClick={onShare}
            variant="contained"
            color="primary"
            sx={radialButton}
          >
            <IosShareIcon />
          </Button>
        </Tooltip>
      </motion.div>
      <motion.div variants={ulItem} viewport={{ once: true }}>
        <Tooltip title={languageState.texts.Tooltips.Settings} placement="left">
          <Button
            onClick={onSettings}
            variant="contained"
            color="primary"
            sx={radialButton}
          >
            <SettingsIcon />
          </Button>
        </Tooltip>
      </motion.div>
      <motion.div variants={ulItem} viewport={{ once: true }}>
        <Tooltip title={languageState.texts.Tooltips.About} placement="left">
          <Button
            onClick={onAbout}
            variant="contained"
            color="info"
            sx={radialButton}
          >
            <InfoIcon color="secondary" />
          </Button>
        </Tooltip>
      </motion.div>
    </motion.div>
  );
};

FabButtons.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired,
  onSettings: PropTypes.func.isRequired,
  onAbout: PropTypes.func.isRequired,
};

export default FabButtons;
