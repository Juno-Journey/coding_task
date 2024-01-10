import React, { useState } from "react";
import { NoteType } from "../../API/Types/Note";
import Popup from "reactjs-popup";

import TextField from '@mui/material/TextField';

import "./note.styles.css";

const Note = ({ _id, title, body }: NoteType) => {
  const [edit, setEdit] = useState(true);

  const NoteContent = () => {
    return (
      <div className="noteContainer">
        <div className="noteTitle">{title}</div>
        <div className="noteBody">
          {body.map(({ text, isChecked }) => (
            <div>{text}</div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Popup
      trigger={
        <button style={{border:'none',background: 'transparent', display:'flex'}}>

          <NoteContent />
        </button>
      }
      position="top center"
    >
      <NoteContent />
    </Popup>
  );
};

export default Note;
