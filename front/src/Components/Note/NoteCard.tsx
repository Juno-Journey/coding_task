import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Typography,
  Divider,
  Modal,
  Box,
} from '@mui/material';

import NoteActions from './NoteActions';

import { Note } from '../../API/Types/Note';
import { useNotes } from '../../Context/useNotes';
import useOutsideClick from '../../Hooks/useOutsideClick';
import NoteEditor from './NoteEditor';
import { NoteBody } from '../../types/NoteTypes';

const NoteCard = ({ note }: { note: Note }) => {
  const [currentNote, setCurrentNote] = React.useState<Note>(note);
  const [checkedItems, setCheckedItems] = React.useState<NoteBody[]>([]);
  const [uncheckedItems, setUncheckedItems] = React.useState<NoteBody[]>([]);
  const [editNote, setEditNote] = React.useState(false);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const { upsertNote } = useNotes();

  const { title, body, isCheckboxes } = currentNote;

  React.useEffect(() => {
    if (!isCheckboxes) return;
    const checked = currentNote.body.filter((item) => item.isChecked);
    const unchecked = currentNote.body.filter((item) => !item.isChecked);

    currentNote.body.sort((a, b) => {
      if (a.isChecked && !b.isChecked) return 1;
      if (b.isChecked && !a.isChecked) return -1;
      return 0;
    });

    setCheckedItems(checked);
    setUncheckedItems(unchecked);
  }, [currentNote.body, isCheckboxes]);

  useOutsideClick(wrapperRef, () => {
    handleSaveNote(currentNote);
  });

  const toggleCheck = (text: string) => {
    let newCheckedItems = [...checkedItems];
    let newUncheckedItems = [...uncheckedItems];

    const isCurrentlyChecked = newCheckedItems.some((item) => item.text === text);

    if (isCurrentlyChecked) {
      newCheckedItems = newCheckedItems.filter((item) => item.text !== text);

      const movedItem = checkedItems.find((item) => item.text === text);
      if (movedItem) {
        newUncheckedItems = [...newUncheckedItems, { ...movedItem, isChecked: false }];
      }
    } else {
      newUncheckedItems = newUncheckedItems.filter((item) => item.text !== text);
      const movedItem = uncheckedItems.find((item) => item.text === text);
      if (movedItem) {
        newCheckedItems = [...newCheckedItems, { ...movedItem, isChecked: true }];
      }
    }

    const updatedNoteBody = [...newUncheckedItems, ...newCheckedItems];
    const updatedNote = { ...note, body: updatedNoteBody, isCheckboxes: true };

    setCurrentNote({ ...note, body: updatedNoteBody });
    setCheckedItems(newCheckedItems);
    setUncheckedItems(newUncheckedItems);
    upsertNote({ id: note._id, note: updatedNote });
  };

  const handleSaveNote = (updatedNote: Note) => {
    setCurrentNote(updatedNote);
    upsertNote({ id: note._id, note: updatedNote });
    setEditNote(false);
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
                toggleCheck(text);
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
    <>
      <Card
        variant='outlined'
        sx={{
          position: 'relative',
          maxWidth: '240px',
          width: '100%',
          borderRadius: '8px',
          '&:hover': {
            boxShadow: '0 1px 2px 0 #3c40434d, 0 1px 3px 1px #3c404326',

            '& .MuiCardActions-root': {
              visibility: 'visible',
              opacity: 1,
            },
          },
        }}
      >
        <CardContent
          onClick={() => setEditNote(true)}
          sx={{ maxHeight: '300px', overflow: 'hidden', position: 'relative' }}
        >
          <Typography variant='h6' fontWeight={600} noWrap sx={{ fontSize: '16px' }}>
            {title}
          </Typography>
          <Typography
            noWrap
            variant='body1'
            fontWeight={400}
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: `${isCheckboxes ? 8 : 10}`,
              WebkitBoxOrient: 'vertical',
              lineclamp: `${isCheckboxes ? 8 : 10}`,
              fontSize: '14px',
              lineHeight: 1.6,
            }}
          >
            <span>
              {isCheckboxes && (
                <span style={{ display: 'block' }}>
                  {renderCheckboxesList(uncheckedItems)}
                  <Divider
                    component={'span'}
                    variant='middle'
                    sx={{ margin: '10px 0', display: 'block' }}
                  />
                  {renderCheckboxesList(checkedItems)}
                </span>
              )}
              {!isCheckboxes &&
                body.map(({ text }, index) => (
                  <span style={{ display: 'block' }} key={index}>
                    <span>{text}</span>
                  </span>
                ))}
            </span>
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            visibility: 'hidden',
            opacity: 0,
            transition: 'visibility 0s, opacity 0.5s ease-in-out',
          }}
        >
          <NoteActions note={note} setNote={setCurrentNote} />
        </CardActions>
      </Card>
      <Modal
        sx={{ border: 'none' }}
        ref={wrapperRef}
        open={editNote}
        onClose={() => setEditNote(false)}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: '8px',
            border: 'none',
            boxShadow: 24,
            p: 1,
            maxHeight: '80vh',
            overflowY: 'auto',
          }}
        >
          <NoteEditor note={currentNote} updateNote={handleSaveNote} />
        </Box>
      </Modal>
    </>
  );
};

export default NoteCard;
