import { useState, useCallback } from "react";

import PropTypes from "prop-types";

// @emotion
import { css } from "@emotion/css";

// framer-motion
import { motion } from "framer-motion";

// contexts
import { useLanguage } from "../../context/LanguageProvider";

// @mui icons
import InfoIcon from "@mui/icons-material/Info";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SettingsIcon from "@mui/icons-material/Settings";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// @mui components
import { Tooltip } from "@mui/material";

// own components
import RadialButton from "../RadialButton/RadialButton";

// style
import "./style.css";

const FabButtons = (props) => {
  const { onAdd, onSettings, onAbout } = props;
  const { languageState } = useLanguage();

  const [showFab, setShowFab] = useState(false);

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

  const toggleFab = () => setShowFab(!showFab);

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
        zIndex: 20,
      })}
    >
      <motion.div className={showFab ? "appear" : "hidden"}>
        <Tooltip
          title={languageState.texts.Tooltips.AddNoteBox}
          placement="left"
        >
          <RadialButton onClick={onAdd} icon={<AddBoxIcon />} />
        </Tooltip>
      </motion.div>
      <motion.div className={showFab ? "appear" : "hidden"}>
        <Tooltip title={languageState.texts.Tooltips.Settings} placement="left">
          <RadialButton onClick={onSettings} icon={<SettingsIcon />} />
        </Tooltip>
      </motion.div>
      <motion.div className={showFab ? "appear" : "hidden"}>
        <Tooltip title={languageState.texts.Tooltips.About} placement="left">
          <RadialButton onClick={onAbout} icon={<InfoIcon />} />
        </Tooltip>
      </motion.div>
      <motion.div variants={ulItem} viewport={{ once: true }}>
        <Tooltip
          title={
            !showFab
              ? languageState.texts.Tooltips.ExpandFab
              : languageState.texts.Tooltips.HideFab
          }
          placement="left"
        >
          <RadialButton
            onClick={toggleFab}
            icon={showFab ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          />
        </Tooltip>
      </motion.div>
    </motion.div>
  );
};

FabButtons.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired,
  onSettings: PropTypes.func.isRequired,
  onAbout: PropTypes.func.isRequired,
};

export default FabButtons;
