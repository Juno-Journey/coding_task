import React from 'react';

import { Box, Button } from '@mui/material';

import { useNotes } from '../../Context/useNotes';
import NoteEditor from './NoteEditor';
import { Note } from '../../API/Types/Note';

const NotePlaceholder = {
  _id: '',
  title: '',
  isCheckboxes: false,
  isPinned: false,
  body: [],
};

const CreateNote = () => {
  const [note, setNote] = React.useState<Note>(NotePlaceholder);
  const [isOpenNewNote, setIsOpenNewNote] = React.useState(false);

  const { upsertNote } = useNotes();

  const handleSubmit = (note: Note) => {
    let newNote = {
      ...note,
      _id: Date.now().toString(),
    };

    upsertNote({ id: newNote._id, note: newNote });
    setIsOpenNewNote(false);
  };

  if (!isOpenNewNote) {
    return (
      <Button
        sx={{
          width: '100%',
          maxWidth: 570,
          padding: '12px 16px',
          margin: 2,
          boxShadow: 3,
          borderRadius: 2,
          color: '#202124',
          textTransform: 'none',
          justifyContent: 'flex-start',
        }}
        onClick={() => setIsOpenNewNote(true)}
      >
        Take a note...
      </Button>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 570,
        padding: 2,
        margin: 2,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <NoteEditor note={note} updateNote={handleSubmit} />
    </Box>
  );
};

export default CreateNote;
