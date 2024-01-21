import { Box, Skeleton } from '@mui/material';

interface NoteSkeletonProps {
  numberOfSkeletons?: number;
}

const NoteSkeleton = ({ numberOfSkeletons = 8 }: NoteSkeletonProps) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '40px', width: '100%' }}>
      {Array.from({ length: numberOfSkeletons }).map((_, index) => (
        <Skeleton
          key={index}
          variant='rectangular'
          sx={{
            width: '240px',
            height: '240px',
            borderRadius: '8px',
            marginBottom: '16px',
          }}
        />
      ))}
    </Box>
  );
};

export default NoteSkeleton;
