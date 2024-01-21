import React from 'react';
import Masonry from '@mui/lab/Masonry';
import { Container, Typography } from '@mui/material';

import CreateNote from '../Components/Note/CreateNote';
import NoteCard from '../Components/Note/NoteCard';
import NoteSkeleton from '../Components/Skeleton/NoteSkeleton';

import { useNotes } from '../Context/useNotes';
import { Note } from '../API/Types/Note';

const NoteScreen = () => {
  const { notes, isFetchingNextPage, hasNextPage, fetchNextPage, isLoading } = useNotes();

  const observer = React.useRef<IntersectionObserver | null>(null);

  const allPinnedNotes = notes?.pages.flatMap((page) => page.filter((n) => n.isPinned)) || [];
  const allUnpinnedNotes = notes?.pages.flatMap((page) => page.filter((n) => !n.isPinned)) || [];

  const lastNoteRef = React.useCallback(
    (node: Element | null) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  const renderNotes = (title: string, notes: Note[]) => {
    if (notes.length === 0) return null;
    return (
      <React.Fragment>
        <Typography
          variant='body1'
          fontWeight={600}
          sx={{
            textTransform: 'uppercase',
            alignSelf: 'flex-start',
            fontSize: '12px',
            color: '#5f6368',
            margin: '10px 20px',
          }}
        >
          {title}
        </Typography>
        <Masonry columns={4} spacing={1}>
          {notes.map((note, index) => {
            let isLastNote = false;
            if (title === 'others') {
              isLastNote = index === notes.length - 1;
            }
            return (
              <div key={note._id} ref={isLastNote ? lastNoteRef : undefined}>
                <NoteCard note={note} />
              </div>
            );
          })}
        </Masonry>
      </React.Fragment>
    );
  };

  return (
    <Container
      disableGutters
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <CreateNote />
      {isLoading && <NoteSkeleton />}
      {renderNotes('pinned', allPinnedNotes)}
      {renderNotes('others', allUnpinnedNotes)}
      <div>{isFetchingNextPage && <NoteSkeleton />}</div>
    </Container>
  );
};

export default NoteScreen;
