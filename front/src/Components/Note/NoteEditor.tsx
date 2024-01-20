import React from 'react';
import { Box, Checkbox, TextField } from '@mui/material';
import NoteActions from './NoteActions';
import useOutsideClick from '../../Hooks/useOutsideClick';
import { Note } from '../../API/Types/Note';
import { NoteBody } from '../../types/NoteTypes';

interface NoteEditorProps {
  note: Note;
  updateNote: (note: Note) => void;
  toggleCheck?: (text: string) => void;
}

const NoteEditor = ({ note, updateNote, toggleCheck }: NoteEditorProps) => {
  const [noteTitle, setNoteTitle] = React.useState(note.title);
  const [noteContent, setNoteContent] = React.useState('');
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const contentString = note.body.map((item) => item.text).join('\n');
    setNoteContent(contentString);
  }, [note.body]);

  useOutsideClick(wrapperRef, () => {
    handleSaveNote();
  });

  const handleSaveNote = () => {
    let updatedNote = {
      ...note,
      title: noteTitle,
    };

    if (note.isCheckboxes) {
      updateNote(updatedNote);
      return;
    }

    const updatedBody = noteContent.split('\n').map((text) => {
      const isChecked = false;
      return { text, isChecked };
    });

    updatedNote.body = updatedBody;

    updateNote(updatedNote);
  };

  const renderCheckboxesList = (list: NoteBody[]) => {
    return (
      <span>
        {list.map(({ text, isChecked }, index) => (
          <span key={`${text}-${index}`} style={{ display: 'block' }}>
            <Checkbox
              checked={isChecked}
              size='small'
              onClick={(e) => {
                e.stopPropagation();
                toggleCheck?.(text);
              }}
              inputProps={{ 'aria-label': 'controlled' }}
              sx={{ padding: '5px 0px', marginRight: '5px' }}
            />
            {isChecked ? <s>{text}</s> : <>{text}</>}
          </span>
        ))}
      </span>
    );
  };

  return (
    <Box ref={wrapperRef}>
      <TextField
        fullWidth
        multiline
        placeholder='Title'
        value={noteTitle}
        variant='standard'
        InputProps={{
          disableUnderline: true,
          style: { fontWeight: 600 },
        }}
        onChange={(e) => setNoteTitle(e.target.value)}
      />
      {note.isCheckboxes ? (
        <Box>{renderCheckboxesList(note.body)}</Box>
      ) : (
        <TextField
          fullWidth
          placeholder='Take a note...'
          multiline
          value={noteContent}
          variant='standard'
          InputProps={{
            disableUnderline: true,
            style: { fontSize: '14px', lineHeight: 1.6 },
          }}
          onChange={(e) => setNoteContent(e.target.value)}
        />
      )}
      <Box>
        <NoteActions note={note} onCloseNote={handleSaveNote} isNewNote />
      </Box>
    </Box>
  );
};

export default NoteEditor;
