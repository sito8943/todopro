import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

// @mui icons
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

// sito components
import SitoContainer from "sito-container";

// own components
import RadialButton from "../../components/RadialButton/RadialButton";

// contexts
import { useLanguage } from "../../context/LanguageProvider";

const Forgot = (props) => {
  const { toggleMode, mode } = props;

  const location = useLocation();

  const [forgeting, setForgeting] = useState("");

  useEffect(() => {
    const queryParams = location.search.substring(1);
    setForgeting(queryParams);
  }, [location]);

  return <SitoContainer></SitoContainer>;
};

Forgot.propTypes = {
  toggleMode: PropTypes.func.isRequired,
  mode: PropTypes.bool.isRequired,
};

export default Forgot;
