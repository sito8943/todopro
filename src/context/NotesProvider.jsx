/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-no-constructed-context-values */
import * as React from "react";

// texts
import texts from "../lang/texts.json";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

const NotesContext = React.createContext();

const notesReducer = (notesState, action) => {
  switch (action.type) {
    case "add": {
      const { newNote } = action;
      const newNotes = { ...notesState };
      newNote[newNote.id] = newNote;
      return newNotes;
    }
    case "remove": {
      const { id } = action;
      const newNotes = { ...notesState };
      delete newNotes[id];
      return newNotes;
    }
    case "mark": {
      const { id, state } = action;
      const newNotes = { ...notesState };
      newNotes[id].state = state;
      return newNotes;
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const NotesProvider = ({ children }) => {
  const [notesState, setNotesState] = React.useReducer(notesReducer, {});

  const value = { notesState, setNotesState };
  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};

NotesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// hooks
const useNotes = () => {
  const context = React.useContext(NotesContext);
  if (context === undefined)
    throw new Error("notesContext must be used within a Provider");
  return context;
};

export { NotesProvider, useNotes };
