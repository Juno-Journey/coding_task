import { Box, Button } from '@mui/material';

import IconWrapper from '../IconWrapper/IconWrapper';
import { Note } from '../../API/Types/Note';
import { useNotes } from '../../Context/useNotes';

interface NoteActionsProps {
  isNewNote?: boolean;
  onCloseNote?: (note: Note) => void;
  note: Note;
  setNote?: React.Dispatch<React.SetStateAction<Note>>;
}

const NoteActions = ({ note, setNote, isNewNote, onCloseNote }: NoteActionsProps) => {
  const { upsertNote } = useNotes();

  const changeCheckboxesStatus = () => {
    const updatedNote = { ...note, isCheckboxes: !note.isCheckboxes };
    setNote?.(updatedNote);
    upsertNote({ id: note._id, note: updatedNote });
  };

  const changeIsPinnedStatus = () => {
    const updatedNote = { ...note, isPinned: !note.isPinned };
    setNote?.(updatedNote);
    upsertNote({ id: note._id, note: updatedNote });
  };

  const handleCloseNote = () => {
    onCloseNote?.(note);
  };

  return (
    <Box maxWidth='100%' sx={{ display: 'flex', justifyContent: 'space-between', flexGrow: 1 }}>
      <IconWrapper
        type={note.isPinned ? 'pinFull' : 'pin'}
        onClick={changeIsPinnedStatus}
        sx={{ position: 'absolute', top: '5px', right: '3px' }}
      />
      <IconWrapper type='reminder' fontSize='small' />
      <IconWrapper type='collaborator' fontSize='small' />
      <IconWrapper type='colors' fontSize='small' />
      <IconWrapper type='image' fontSize='small' />
      <IconWrapper type='archive' fontSize='small' />
      <IconWrapper type='checkboxes' fontSize='small' onClick={changeCheckboxesStatus} />
      {isNewNote && (
        <>
          <IconWrapper type='redo' fontSize='small' />
          <IconWrapper type='undo' fontSize='small' />
          <Button onClick={handleCloseNote} sx={{ color: '#202124', fontWeight: 500 }}>
            Close
          </Button>
        </>
      )}
    </Box>
  );
};

export default NoteActions;
